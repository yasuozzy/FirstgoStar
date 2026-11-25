<template>
    <view class="main">
        <u-navbar
          title="财务服务"
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
		<view class="oamanageView">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">财务服务</view>
			<view style="background-color: lightgray;margin-top: 10px;width: 100%;height: 1px;"></view>
			<view class="itemview">
				<view
				  class="situation_item"
				  v-for="(item, index) in toolsList"
				  :key="index" @click="financialClick(item.title)"
				>
				  <u-image
				    :src="item.image"
				    width="30px"
				    height="30px"
				  ></u-image>
				  <view class="item_text">{{ item.title }}</view>
				</view>
			</view>
			
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';

   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const toolsList = ref([
		{image:'/static/mine/kuanxiangShenQing.png',title:'款项申请'},
		{image:'/static/mine/kuanxiangShenPi.png',title:'款项审批'},
		{image:'/static/mine/kuanxiangJiaoNa.jpg',title:'款项缴纳'},
		{image:'/static/mine/tuikuanService.jpg',title:'退款服务'},
		{image:'/static/mine/zhuangzhangService.jpg',title:'转账服务'},
		{image:'/static/mine/jiesuanPay.jpg',title:'结算支付'},
		{image:'/static/mine/jiesuanShenHe.jpg',title:'结算审核'},
		{image:'/static/mine/qingkuanBaoXiao.jpg',title:'请款报销'},
		
	]);
           
      
    const goBack= () => {
                    
        uni.navigateBack()
    };
	const financialClick = (type:any) => {
				
		if (type === '款项申请') {
			
			uni.navigateTo({
				url:'/pages/mine/LoanApplyPage/LoanApplyPage'
			})
		}else if(type === '款项审批'){
			
			if (storage.getPlatId()) {
				
				uni.navigateTo({
					url:'/pages/mine/LoanApprovePage/LoanApprovePage'
				})
			}else
			{
				uni.showToast({
					title:'暂无权限',
					icon:'none'
				})
			}
			
		}else if(type === '款项缴纳'){
			
			// uni.navigateTo({
			// 	url:'/pages/mine/financialService/kuanxiangJiaoNa'
			// })
			uni.navigateTo({
				url:'/pages/mine/MoneyPayPage/MoneyPayPage'
			})
		}else if(type === '退款服务'){
			
			uni.navigateTo({
				url:'/pages/mine/financialService/backMoneyService'
			})
		}else if(type === '转账服务'){
			
			uni.navigateTo({
				url:'/pages/mine/financialService/zhuanzhangService'
			})
		}else if(type === '结算支付'){
			
			uni.navigateTo({
				url:'/pages/mine/financialService/jiesuaqnSalaty'
			})
		}else if(type === '结算审核'){
			
			uni.navigateTo({
				url:'/pages/mine/financialService/jiesuanShenHe'
			})
		}else if(type === '请款报销'){
			
			uni.navigateTo({
				url:'/pages/mine/financialService/qingkuanBaoXiao'
			})
		}
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
	 .oamanageView{
	 	  display: flex;
	 	  
	 	  flex-direction: column;
	 	  margin-left: 4%;
	 	  width: 92%;
	 	  margin-top: 10px;
	 	  background-color: white;
	 	  border-radius: 8px;
	 	  .itemview{
	 	  	display: flex;
	 	  	flex-direction: row;
	 	  	flex-wrap: wrap; /* 允许换行 */
	 	  	margin-bottom: 10px;
	 	  	.situation_item {
	 	  	  width: 25%;
	 	  	  font-size: 12px;
	 	  	  color: #000;
	 	  	  margin-top: 15px;
	 	  	  box-sizing: border-box;
	 	  	  display: flex;
	 	  	  flex-direction: column;
	 	  	  align-items: center;
	 	  	  height: 65upx;
	 	  			margin-bottom: 30px;
	 	  			.item_text{
	 	  				margin-top: 8px;
	 	  			}
	 	  	}
	 	  }
	 }
    }
</style>