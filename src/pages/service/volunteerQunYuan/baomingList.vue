<template>
    <view class="main">
        <u-navbar
          title="已报名志愿者"
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
		<view class="listView">
			<view class="list_item" v-for="(item,index) in baomingList" :key="index">
				<view style="display: flex;flex-direction: row;">
					<u-avatar style="margin-left: 15px;margin-top: 10px;"
					  :src="item.head_img"
					  number="30px"
					></u-avatar>
					<view style="font-size: 13px;margin-top: 18px;margin-left: 10px;width: 40%;">{{item.name}}</view>
					<view style="font-size: 12px;margin-top: 20px;margin-left: 10px;width: 35%;color: gray;text-align: right;">{{item.join_time}}</view>
				</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { serviceFindActivityDetailVolunteer } from '@/api/service';

const bgColor = ref("#2A9595");
const baomingList = ref<any[]>([]);
const idstring = ref('');

onLoad((options: any) => {
	idstring.value = options.id || '';
});

onMounted(() => {
	getbaoMingData();
});

const getbaoMingData = () => {
	try {
		let param = { act_id: idstring.value };
		serviceFindActivityDetailVolunteer(param).then((res: any) => {
			console.log(res);
			baomingList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};
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
	 .listView{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 .list_item{
			 display: flex;
			 flex-direction: column;
			 width: 100%;
		 }
	 }
    }
</style>