<template>
    <view class="main">
        <u-navbar
          title="招聘登记审核"
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
		<image
		  style="width: 92%; height: 250px;margin-left: 4%;margin-top: 20px;"
		  :src="passImage"
		>
		</image>
		<view style="width: 100%;height: 50px;margin-top: 30px;font-size: 15px;color: black;text-align: center;">{{subtitle}}</view>
		<view class="buttonView" @click="buttonClick()">{{buttonTitle}}</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const passImage = ref('/static/mine/passImage.png');
	const title = ref('');
	const subtitle = ref('');
	const buttonTitle = ref('');
            
	onMounted(() => {
	  init();
	});
        
    const init = async() => {
				
		try {
			let param = {
				userId:storage.getUserId(),
			};
			MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo(param).then((res) =>{
				
				console.log(res);
				subtitle.value = res.message;
				if (res.result === '-1') {
					
					title.value = '招聘登记未申请';
					buttonTitle.value = '申请招聘登记';
					
					
				}else if (res.result === '0') {
					
					title.value = '招聘登记待审核';
					buttonTitle.value = '查看招聘登记详情';
					
				}else if (res.result === '1') {
					
					title.value = '招聘登记审核通过';
					buttonTitle.value = '查看招聘登记详情';
					
				}else if (res.result === '2') {
					
					title.value = '招聘登记未通过';
					buttonTitle.value = '重新申请';
					
				}
				
			});
		} catch (error) {
			console.log(error)
		} 
	};
	const buttonClick = () => {
		
		if (buttonTitle.value === '查看招聘登记详情') {
			
			uni.navigateTo({
				url:'/pages/mine/LingGongOrder/zhaopinDengJiDetail'
			})
			
		}else if (buttonTitle.value === '申请招聘登记' || buttonTitle.value === '重新申请') {
			
			uni.navigateTo({
				url:'/pages/mine/LingGongOrder/zhaopinDengJi?isEdit=' + 1
			})
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
            .buttonView{
                         
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
    }
</style>