<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<view style="display: flex;with:100%;display: flex;flex-direction: column;">
			
			<view v-for="(peritem,perindex) in DataList" :key="perindex" class="personItem">
				<view style="margin-top: 10px;margin-left: 20px;display: flex;flex-direction: row;height: 50px;">
					<image
					  @click="selectContact(perindex)"
					  v-if="!peritem.select"
					  style="width: 20px; height: 20px;margin-top: 10px;"
					  :src="choose_default"
					></image>
					<image
					  @click="selectContact(perindex)"
					  v-if="peritem.select"
					  style="width: 20px; height: 20px;margin-top: 10px;"
					  :src="choose_selected"
					></image>
					<image
					  style="width: 40px; height: 40px;margin-left: 10px;border-radius: 20px;margin-top: 5px;"
					  :src="peritem.headImage"
					></image>
					<view style="font-size: 15px;margin-left: 10px;margin-top: 10px;">{{peritem.username}}</view>
				</view>
			
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="saveClick()">保存</view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MineComInsideQingKuanSelectChaoSongPerson} from '@/api/mine';
	
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const eastId = ref('');
	const DataList = ref([]);
	const searchContent = ref('');
	const choose_default = ref('/static/login/choose_unselect.png');
	const choose_selected = ref('/static/login/choose_select.png');
	const LeaderList = ref([]);
           
	onLoad((options:any) => {
		eastId.value = decodeURIComponent(options.eastId);
	});
	onMounted(() => {
	  loadData();
	});
            
	const loadData = async() => {
		
		try {
			
			let param = {
				
				leaderName:searchContent.value,
				applyType:'2',
				userId:storage.getUserId(),
				eastId:eastId.value,
			};
			const res = await MineComInsideQingKuanSelectChaoSongPerson(param);
							
			console.log(res);
			const result = res.result;
			// 在获取数据的地方处理
			DataList.value = result.map(item => {
			  return {
				...item,
				select: false  // 默认值为false
			  }
			})
			console.log(DataList);
			
		}catch (error) {
			console.log(error)
		}
	};
	//选择人员
	const selectContact = (perindex:any) => {
				   
	   console.log(perindex);
		for (var j = 0; j < DataList.value.length; j++) {
			var laederment = DataList.value[j];
				
			if (perindex == j) {
				
				laederment.select = !laederment.select;
			}
	   
	   };
	   console.log(DataList.value);	  
		for (var j = 0; j < DataList.value.length; j++) {
			var person = DataList.value[j];
			if (person.select == true) {
				
				LeaderList.value.push(person);
				LeaderList.value = [...new Set(LeaderList.value)];
				
			}else if (person.select == false) {
				
				if (LeaderList.value.length > 0) {
					
					for (var l = 0; l < LeaderList.value.length; l++) {
						var leader = LeaderList.value[l];
						if (person.username === leader.username) {
							LeaderList.value.splice(l,1);
						}
					}
				}
			}
		};
				
		console.log(LeaderList.value);
	};
	const saveClick = () => {
				   
	   if (LeaderList.value.length == 0) {
			
			uni.showToast({
				title:'请选择抄送人',
				icon:'none',
			})
			return;
	   }
	   eventBus.emit("person2", LeaderList.value);
	   uni.navigateBack();
	};
           
    const goBack= () => {
            
		uni.navigateBack()
	};
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
                  width: 100%;
          background-color: aliceblue;
          .flex{
              display: flex;
          }
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
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
			 .personItem{
			 		 display: flex;
			 		 color: black;
			 		 width: 100%;
			 		background-color: white;
			 		 flex-direction: column;
			 		 margin-top: 10px;
			 }
    }
</style>