<template>
    <view class="main">
        <u-navbar
          title="位置"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
        </u-navbar>
		<view>
				<view class="page-body">
					<view class="page-section page-section-gap">
						<map style="width: 375px; height: 800px;" :latitude="latitude" :longitude="longitude" :show-compass="true" :markers="covers">
						</map>
					</view>
				</view>
			</view>
</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';

	// 背景颜色
	const bgColor = ref("#2A9595");
	const latitude = ref<number | string>('');
	const longitude = ref<number | string>('');
	const id = ref(0);
	const title = ref('map');
	
	const covers = ref([
		{
			id: 1,
			latitude: 39.909,
			longitude: 116.39742,
			iconPath: '../../../static/location.png'
		}, 
		{
			id: 2,
			latitude: 39.90,
			longitude: 116.39,
			iconPath: '../../../static/location.png'
		}
	]);

	const rightClick = () => {};

	const goBack = () => {
		uni.navigateBack();
	};

	onLoad((options: any) => {
		if (options.latitude) {
			latitude.value = Number(options.latitude);
		}
		if (options.longitude) {
			longitude.value = Number(options.longitude);
		}
		
		if(latitude.value && longitude.value) {
			covers.value = [{
				id: 0,
				latitude: Number(latitude.value),
				longitude: Number(longitude.value),
				iconPath: '../../../static/location.png'
			}];
		}
	});
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
    }
</style>