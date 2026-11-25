<template>
    <view class="main">
        <u-navbar
          title="新增选民"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot" slot="left">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
        </u-navbar>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in opinionList" @click="selectUser(index)">
				<u-image v-if="item.checked == true" style="margin-top: 19px;margin-left: 20px;"
				  :src="choose_selected"
				  width="15px"
				  height="15px"
				></u-image>
				<u-image v-if="item.checked == false" style="margin-top: 19px;margin-left: 20px;"
				  :src="choose_default"
				  width="15px"
				  height="15px"
				></u-image>
				
				<view style="margin-top: 15px;margin-left: 15px;font-size: 16px;">{{item.user_name}}</view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="saveClick()">确认</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import {MinePartyPublicJusticeXuanMinDengJiJieGuo} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const opinionList = ref<any[]>([]);
	const hasMore = ref(true);      // 是否还有更多数据
	const noMore = ref(false);     // 是否没有更多数据了
	const page = ref(1);
	const idstring = ref('0');
	const choose_default = ref('/static/login/choose_unselect.png');
	const choose_selected = ref('/static/login/choose_select.png');
	const personlist = ref([]);
            
	onLoad((options) => {
		
		idstring.value = decodeURIComponent(options.id);
		loadData();
	});
	
	//下拉刷新
	onPullDownRefresh(() => {
		
		 // 重置状态
		 page.value = 1;
		 hasMore.value = true;
		 noMore.value = false;
		 loadData();
		 
	});
   
	const loadData = async() => {
			
		try {
			
			let param = {
				id: idstring.value,
				page: page.value,
				size:100,
			};
			const res = await MinePartyPublicJusticeXuanMinDengJiJieGuo(param);
							
			console.log(res);
										 
			const datalist = <any[]>res.result;
			if(datalist.length >0){
				opinionList.value = datalist.map(item => ({
					  ...item,
					  checked: false
				}));
			}
			
			console.log( opinionList);
			
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	const selectUser = (i:any) => {
				
		for (var index = 0; index <  opinionList.value.length; index++) {
			var element =  opinionList.value[index];
			if ( index == i) {
				element.checked = !element.checked;
			}
			
		}
		console.log( opinionList.value);
		personlist.value = [];
		for (var index = 0; index <  opinionList.value.length; index++) {
			var element =  opinionList.value[index];
			if (element.checked == true) {
				
				 personlist.value.push(element);
			}
		}
		console.log( personlist);
	};
	const saveClick = () => {
			                
		if ( personlist.value.length == 0) {
			
			uni.showToast({
				title:'请选择接收人',
				icon:'none'
			});
			return;
		}
		eventBus.emit('refresh-XuanMin',<[]>personlist.value);
		uni.navigateBack();
		
	};
	const goBack= () => {
			
		uni.navigateBack()
	};
        
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
		.listItem{
		  width: 100%;
		  display: flex;
		  flex-direction: row;
		}
		.footer-container {
		          position: fixed;
		          bottom: 0;
		          left: 0;
		          right: 0;
		          height: 70px;
		          background-color: white;
		          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		          z-index: 100;
		          color: white;
		          display: flex;
		          justify-content: center; /* 水平居中 */
		          align-items: center;     /* 垂直居中 */
		          
		        }
		        .order-button {
		                     
		            display: flex;
		            justify-content: center; /* 水平居中 */
		            align-items: center;     /* 垂直居中 */
		            height: 35px;           /* 需要设置高度 */
		            width: 92%;
		            margin-right: 10px;
		            font-size: 13px;
		            color: white;
		            background-color: #2A9595;
		            border-radius: 6px;
		            margin-left: 4%;
		            margin-top: 15px;
		        }
    }
</style>