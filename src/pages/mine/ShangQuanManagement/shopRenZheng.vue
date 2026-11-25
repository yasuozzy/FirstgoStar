<template>
    <view class="main">
        <u-navbar
          title="商家认证"
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
		<view style="display: flex; flex-direction: column; width: 100%; height: 270px; align-items: center;">
		  <!-- 相对定位容器：宽高与图片一致，作为定位基准 -->
		  <view style="position: relative; width: 90%; height: 250px; border-radius: 8px; overflow: hidden; margin-top: 20px;">
		    <!-- 图片填满容器 -->
		    <image style="width: 100%; height: 100%;" :src="passImage"></image>
		    <!-- 文本绝对定位，距离底部50px，水平居中 -->
		    <view style="position: absolute; bottom: 50px; left: 0; width: 100%; text-align: center; font-size: 18px; color: #fff; text-shadow: 0 2px 8px rgba(0,0,0,0.6);">
		      {{authStatus}}
		    </view>
		  </view>
		</view>
		<view v-if="discountStatus == 0" style="display: flex;flex-direction: column;width: 100%;margin-top: 30px;">
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 75%;">政府提现折扣：</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: #2A9595;width: 10%;text-align: right;">{{discount}}折</view>
			</view>
			<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 55%;">是否同意：</view>
				<u-radio-group style="margin-top: 10px;"
				  v-model="Writevalue"
				  placement="row"
				  @change="writeChange"
				>
				  <u-radio
				    :customStyle="{ marginRight: '16px' }"
				    v-for="(item, index) in WriteOpinion"
				    :key="index"
				    :label="item.name"
				    :name="item.name"
					active-color="#2A9595"
				  >
				  </u-radio>
				</u-radio-group>
			</view>
			<view class="sureButtonView" @click="sureClick">确认</view>
		</view>
		<view v-if="discountStatus == 1" style="display: flex;flex-direction: column;width: 100%;margin-top: 30;">
			<view style="width: 100%;display: flex;flex-direction: row;">
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;width: 75%;">政府提现折扣：</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;color: #2A9595;width: 10%;text-align: right;">{{discount}}折</view>
			</view>
			<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 55%;">是否同意：</view>
				<u-radio-group style="margin-top: 10px;"
				  v-model="disablevalue"
				  placement="row"
				  
				>
				  <u-radio
				    :customStyle="{ marginRight: '16px' }"
				    v-for="(item, index) in disableOpinion"
				    :key="index"
				    :label="item.name"
				    :name="item.name"
					:disabled="true"
					active-color="#2A9595"
				  >
				  </u-radio>
				</u-radio-group>
			</view>
		</view>
		<view v-if="ifyishenqing == 0 || ifyishenqing == 1" class="buttonView" @click="checkDetailClick">查看预付店铺申请</view>
		<view v-if="ifyishenqing == 2" class="buttonView" @click="reshenqing">重新申请</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentYufuStoreGetDisSetInfo,
	MineShangquanManageMentYufuStoreShopUserConfirmDis} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const passImage = ref('/static/mine/passImage.png');
	const ifyishenqing = ref();
	const authStatus = ref();
	const discountStatus = ref();
	const discount = ref();
	const idstring = ref();
	const WriteOpinion = ref([
	  {
		name: "是",
		disabled: true,
	  },
	  {
		name: "否",
		disabled: false,
	  },
	]);
	const Writevalue = ref("是");
	const is_fill = ref(1);
	const disableOpinion = ref([
	  {
		name: "是",
		disabled: true,
	  },
	  {
		name: "否",
		disabled: false,
	  },
	]);
	const disablevalue = ref("是");
	
	onLoad((options:any) => {
		
		ifyishenqing.value = options.ifyishenqing;
		console.log(ifyishenqing.value);
		if(ifyishenqing.value === 0 || ifyishenqing.value === '0'){
			
			authStatus.value = '认证待审核中';
			
		}else if(ifyishenqing.value === 1 || ifyishenqing.value === '1'){
			
			authStatus.value = '认证已通过';
			
		}else if(ifyishenqing.value === 2 || ifyishenqing.value === '2'){
			
			authStatus.value = '认证未通过';
		}
	});
	onMounted(() => {
		
		getdiscount();
	});
	const getdiscount = async() => {
		
		try {
			let param = {
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
			};
			const res = await MineShangquanManageMentYufuStoreGetDisSetInfo(param);
				
			console.log(res);
			discount.value = res.result.discount;
			discountStatus.value = res.result.status;
			idstring.value = res.result.id;
			
		} catch (error) {
			console.log(error)
		} 
	};
	const writeChange = (e:any) => {
				
		console.log(e);
		if (e === '是') {
			
			 is_fill.value = 1;
			
		}else if (e == '否') {
			
			 is_fill.value = 2;
		}
	};
	const sureClick = async() => {
		
		
		try {
			let param = {
				id:idstring.value,
				type:is_fill.value
			};
			const res = await MineShangquanManageMentYufuStoreShopUserConfirmDis(param);
				
			console.log(res);
			if(res.success == true){
				getdiscount();
			}
			uni.showToast({
				title:res.message,
				icon:'none'
			})
			
		} catch (error) {
			console.log(error)
		} 
	};
	//查看预付店铺申请
	const checkDetailClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/ShangQuanManagement/yufuStoreDetail'
		})
	};
	//重新申请
	const reshenqing = () => {
		uni.navigateTo({
			url:'/pages/mine/ShangQuanManagement/yufuStoreShenQing'
		})
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
		  .sureButtonView{
			  
			  margin-top: 30px;
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
		   .buttonView{
		                
			   margin-top: 40px;
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