<template>
    <view class="main">
        <u-navbar
          title="地址管理"
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
		<view style="width: 100%;display: flex;flex-direction: column;margin-bottom: 100px;">
			<view class="address-item" v-for="(item,index) in addresslist" :key="item.id" @click="chooseAddress(item)">
				<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;">{{item.acceptName}}{{item.mobile}}</view>
				<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;">{{item.regionAddress}}</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view style="display: flex;flex-direction: row;margin-top: 10px;">
					<u-checkbox style="margin-left: 15px;" 
					:label-size="12" 
					:shape="circle" 
					:checked="item.isDefault" 
					:active-color="bgColor" 
					labelColor="#000000"   
					label="设为默认"
					@change="changeBox(item)"
					>
					</u-checkbox>
					<view style="font-size: 12px;margin-left: 230px;" @click="editAddress(item)">编辑</view>
				</view>
				<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
		</view>
		<view class="footer-container">
		    <view style="display: flex;width: 100%;height: 80px;">
		        <view class="order-button" @click="addAddress">添加新地址</view>
		    </view>     
		</view>

</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad} from '@dcloudio/uni-app';
	import {serviceReceiveMyGetInAddress,serviceReceiveAddressDefaut} from '@/api/service';
	import eventBus from '@/utils/eventBus';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const addresslist = ref([]);
	const type = ref();
           
	onLoad((options:any) => {
		
		if(options.type){
			
			type.value = options.type;
			console.log(type.value);
		}
		
	});
	
	onMounted(() => {
	  init();
	  eventBus.on('Addaddress', handleRefresh);
	});
   onUnmounted(() => {
	 // 组件卸载时，务必移除监听！
	 eventBus.off('Addaddress', handleRefresh);
   });
        
    const init = async() => {
				
		try {
				let param = {
					userId:storage.getUserId(),
				};			
				const res = await serviceReceiveMyGetInAddress(param);
								
				console.log(res);						
				addresslist.value = res.result;  
							  
				
			} catch (error) {
				console.log(error)
		}
	};
    const goBack= () => {
    		
    	uni.navigateBack()
    };
	const addAddress = () => {
		uni.navigateTo({
			url:'/pages/mine/addressManagement/addAddress'
		})
	};
	//设置默认
	const changeBox = async(item:any) => {
				
		console.log(item);
		try {
				let param = {
					userId:storage.getUserId(),
					id:item.id,
					isDefault:'true',
				};			
				const res = await serviceReceiveAddressDefaut(param);
								
					console.log(res);
					uni.showToast({
						title:'设置成功',
						icon:'none',
					})
					
					init();  
							  
			   
			} catch (error) {
				console.log(error)
		}
	};
	//选择地址，返回需要地址页面
	const chooseAddress = (item:any) => {
				
		//点击之后，只有前一个页面有需要才传值返回，其他页面如我的页面进入，点击不做操作（或者有其他操作需求）
		if (type.value && type.value !== '') {   //=== 'integral'
			
			eventBus.emit('refresh-address', item);
			uni.navigateBack()
		}
				
	};
	const handleRefresh = (data:{}) => {
		
		console.log(data);
		init();
	};
	const editAddress = (item:any) => {
		
		uni.navigateTo({
			url:`/pages/mine/addressManagement/EditAddress?detail=${JSON.stringify(item)}`
		})
	};

</script>

<style lang="scss" scoped>
    .main {
          height: auto;
          background: white;
		  width: 100%;
		  min-height: 100vh;
		  padding-bottom: 80px;        /* 等于 footer 的高度 */
		    box-sizing: border-box;      /* 让 padding 不撑宽，不影响宽度计算 */
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
	 .address-item{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 
	 }
	 .footer-container {
	       position: fixed;
	       bottom: 0;
	       left: 0;
	       right: 0;
	       height: 80px;
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
	         height: 40px;           /* 需要设置高度 */
	         width: 80%;
	         font-size: 13px;
	         color: white;
	         background-color: #2A9595;
	         border-radius: 6px;
	         margin-left: 10%;
	         margin-top: 20px;
	     }
    }
</style>