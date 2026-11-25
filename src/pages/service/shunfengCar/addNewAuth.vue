<template>
    <view class="main">
        <u-navbar
          title="新增授权"
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
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 15px;">
			<view style="margin-left: 15px;font-size: 14px;">姓名</view>
			<input class="searchlocation" v-model="userName" placeholder="请输入用户名" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 15px;">
			<view style="margin-left: 15px;font-size: 14px;">手机号码</view>
			<input class="searchlocation" v-model="phone" placeholder="请输入手机号" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 15px;">
			<view style="margin-left: 15px;font-size: 14px;">身份证号</view>
			<input class="searchlocation" v-model="idcard" placeholder="请输入身份证号" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="tijiaobuttonView" @click="tijiaoClick()">提交</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCarEmpowerDeliveryCar} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const userName = ref('');
	const phone = ref('');
	const idcard = ref('');
	const deliveryId = ref('');
	
	
	onLoad((options:any) => {
		
		deliveryId.value = options.deliveryId;
		
	});
	const tijiaoClick = async() => {
		
		if (userName.value.length === 0) {
			
			uni.showToast({
				title:'请输入用户名',
				icon:'none',
			})
			return;
		}
		if (phone.value.length === 0) {
			
			uni.showToast({
				title:'请输入手机号',
				icon:'none',
			})
			return;
		}
		
		if (idcard.value.length === 0) {
			
			uni.showToast({
				title:'请输入身份证号',
				icon:'none',
			})
			return;
		}
		
		try {
			let param = {
				
				userId:storage.getUserId(),
				userName:userName.value,
				phone:phone.value,
				idcard:idcard.value,
				deliveryId:deliveryId.value,
				
			};
			
			ServiceShunFengYueCarEmpowerDeliveryCar(param).then((res) =>{
				
				console.log(res);
				if(res.success == true){
					
					uni.navigateBack()
				}
				uni.showToast({
					title:res.message,
					icon:'none',
				})
			
			});
		} catch (error) {
			console.log(error)
		}
		
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
		  .searchlocation{
			   margin-left: 15px;
			   width: 200px;
			   height: 30px;
			   margin-top: 15px;
			   font-size: 13px;
		   }
		   .tijiaobuttonView{
		   		  
		   		 margin-top: 50px;
		   		 background-color: #2A9595;
		   		 border-radius: 5px;
		   		 color: white;
		   		 font-size: 14px;
		   		 margin-left: 5%; 
		   		 display: flex;
		   		 justify-content: center; /* 水平居中 */
		   		 align-items: center;     /* 垂直居中 */
		   		 height: 40px;           /* 需要设置高度 */
		   		 width: 90%;             /* 需要设置宽度 */
		   }
}
</style>