<template>
    <view class="main">
        <u-navbar
          title="我的签到"
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
		<view>
			<!-- <uni-calendar 
			:insert="true"
			:lunar="true" 
			:start-date="'2019-3-2'"
			:end-date="'2019-5-20'"
			@change="change"
			 /> -->
			 <u-calendar showLunar :show="show" @confirm="confirm" confirm-text="点击签到"></u-calendar>
		</view>
		<!-- <view class="buttonView" @click="qiandaoClick()">点击签到</view> -->
</view>
</template>

<script setup lang="ts">
	
	import { ref, reactive, onMounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import {MinePartyPublicMyQianDaoClickQianDao,MinePartyPublicMyQianDaoHaveQianDaoList} from '@/api/mine';
	import { onLoad } from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#FF0000");
	const info = ref({
		lunar: true,
		range: true,
		insert: false,
		selected: []
	});
    const show = ref(true);
	
	onMounted(() => {
	  loadData();
	});
    
	const loadData = async() => {
				
		try {
			
			let param = {};
			const res = await MinePartyPublicMyQianDaoHaveQianDaoList(param);
							
			console.log(res);
				
			
			
		}catch (error) {
			console.log(error)
		}
	};
    const qiandaoClick = async() => {
				
		try {
			
			let param = {
				
				
				userId:storage.getUserId(),
				
			};
			const res = await MinePartyPublicMyQianDaoClickQianDao(param);
							
			console.log(res);
			this.loadData();
			
			
		}catch (error) {
			console.log(error)
		}
	};
	const confirm = (e:any) => {
		console.log(e);
		qiandaoClick();
		show.value = false;
	};
	const change = (e:any) => {
		console.log('change 返回:', e)
		
	};
	const goBack = () => {
		
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
				background-color: red;
				border-radius: 5px;
				color: white;
				font-size: 14px;
				margin-left: 20%; 
				display: flex;
				justify-content: center; /* 水平居中 */
				align-items: center;     /* 垂直居中 */
				height: 40px;           /* 需要设置高度 */
				width: 60%;             /* 需要设置宽度 */
	   }

    }
</style>