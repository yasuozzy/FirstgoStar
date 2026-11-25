<template>
    <view class="main">
        <u-navbar
          title="接收人"
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
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="comItemView" v-for="(item,index) in dataList" :key="index">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 16px;">{{item.companyName}}</view>
				<view style="margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;margin-top: 10px;"></view>
				<view class="depItemView" v-for="(depitem,depindex) in item.deptList" :key="depindex">
					<view style="margin-top: 10px;margin-left: 40px;font-size: 16px;">{{depitem.deptName}}</view>
					<view style="margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;margin-top: 10px;"></view>
					<view class="userItemView" v-for="(useritem,userindex) in depitem.userList" :key="userindex" @click="selectUser(index,depindex,userindex)">
						<view style="display: flex;flex-direction: row;">
							<u-image v-if="useritem.checked == true" style="margin-top: 12px;margin-left: 55px;"
							  :src="choose_selected"
							  width="15px"
							  height="15px"
							></u-image>
							<u-image v-if="useritem.checked == false" style="margin-top: 12px;margin-left: 55px;"
							  :src="choose_default"
							  width="15px"
							  height="15px"
							></u-image>
							<u-image style="margin-top: 5px;margin-left: 10px;"
							  :src="useritem.headImage?useritem.headImage:normalIcon"
							  width="25px"
							  height="25px"
							></u-image>
							<view style="margin-top: 8px;margin-left: 15px;font-size: 16px;">{{useritem.username}}</view>
						</view>
						
						<view style="margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;margin-top: 10px;"></view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 70px;background-color: white;margin-top: 10px;"></view>
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
	import {MineComInsideDailyReportSetUpGetReceiver} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const sindex = ref(''); //搜索内容
	const dataList = ref([]);
	const choose_default = ref('/static/login/choose_unselect.png');
	const choose_selected = ref('/static/login/choose_select.png');
	const normalIcon = ref('/static/service/normalIcon.png');
	const personlist = ref([]);
           
	onMounted(() => {
	  loadData();
	});
       
    const loadData = async() => {
           	
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				index:sindex.value,
				
			};
			const res = await MineComInsideDailyReportSetUpGetReceiver(param);
							
			console.log(res);
			const datalist = res.result;
			for (var index = 0; index < datalist.length; index++) {
				var element = datalist[index];
				for (var j = 0; j < element.deptList.length; j++) {
					var Jelement = element.deptList[j];
					for (var k = 0; k < Jelement.userList.length; k++) {
						var kelement = Jelement.userList[k];
						kelement.checked = false;
					}
					
				}
				
			}
			dataList.value = datalist;
				
			
		}catch (error) {
			console.log(error)
		}
   };
   //选择接收人
   const selectUser = (index:any,depindex:any,userindex:any) => {
	   
	   for (var i = 0; i < dataList.value.length; i++) {
		var element = dataList.value[i];
			if (i == index) {
				
				for (var j = 0; j < element.deptList.length; j++) {
					var Jelement = element.deptList[j];
					if (j == depindex) {
						
						for (var k = 0; k < Jelement.userList.length; k++) {
							var Kelement = Jelement.userList[k];
							if (k == userindex) {
								
								Kelement.checked = !Kelement.checked;
							}
							
						}
					}
					
					
				}
			}
			
		};
		personlist.value = [];
		for (var i = 0; i < dataList.value.length; i++) {
			var element = dataList.value[i];
			for (var j = 0; j < element.deptList.length; j++) {
				var Jelement = element.deptList[j];
				for (var k = 0; k < Jelement.userList.length; k++) {
					var Kelement = Jelement.userList[k];
					if (Kelement.checked == true) {
						personlist.value.push(Kelement);
					}
				}
			}
		};
		console.log(personlist.value);
   };
	//保存
	const saveClick = () => {
		
		if (personlist.value.length == 0) {
			
			uni.showToast({
				title:'请选择选民',
				icon:'none'
			});
			return;
		}
		eventBus.emit('refreshPerson-data', personlist.value);
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
			 .comItemView{
				 margin-top: 10px;
				 width: 100%;
				 
			 }
			 .depItemView{
				 margin-top: 10px;
				 width: 100%;
				 
			 }
			 .userItemView{
				 
				 margin-top: 10px;
				 width: 100%;
				 
			 }
    }
</style>