<template>
    <view class="main">
        <u-navbar
          title="医疗卫生"
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
		<view class="goodsView">
			<view class="goods_item" v-for="(item,index) in goodsList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="border-radius: 4px;margin-top: 10px;margin-left: 15px;"
					  :src="item.img"
					  width="70px"
					  height="70px"
					></u-image>
					<view style="display: flex;flex-direction: column;width: 75%;">
						<view style="font-size: 14px;margin-top: 10px;margin-left: 5px;">{{item.vendor_name}}</view>
						<view style="margin-top: 5px;width: 40%;height: 20px;display: flex;flex-direction: row;">
							<view class="starView" v-for="n in item.point" :key="n">
								<u-image style="margin-top: 5px;margin-left: 5px;"
								  :src="starimage"
								  width="12px"
								  height="12px"
								></u-image>
							</view>
						</view>
						<view style="font-size: 12px;margin-top: 5px;margin-left: 5px;color: dimgray;">{{item.address}}</view>
					</view>
				</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;background-color: lightgray;height: 1px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceSmartFeedOlderMedical } from '@/api/service';
import { storage } from '@/utils/storage';

const bgColor = ref("#2A9595");
const goodsList = ref<any[]>([]);
const starlist = ref<any[]>([]);
const starimage = ref("/static/service/starselected.png");
const idstring = ref('');

onLoad((options: any) => {
	idstring.value = options.id || '';
});

onMounted(() => {
	loadData();
});

const loadData = () => {
	try {
		let param = {
			manId: storage.getManid(),
			shop_kind: idstring.value,
		};
		serviceSmartFeedOlderMedical(param).then((res: any) => {
			console.log(res);
			goodsList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const detailClick = (item: any) => {
	uni.navigateTo({
		url: '/pages/service/smartFeedOlder/medicalDetail?id=' + item.id + '&vendorsCode=' + item.vendorsCode
	});
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
	 .goodsView{
	 		  display: flex;
	 		  flex-direction: column;
	 		  width: 100%;
	 }
	 .goods_item{
	 		  display: flex;
	 		  flex-direction: column;
	 		  margin-top: 10px;
	 }
	 .starView{
	 		display: flex;
	 		flex-direction: row;
	 		width: 50%;
	 		height: 20px;
	 }
    }
</style>