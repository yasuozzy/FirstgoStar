<template>
    <view class="main">
        <u-navbar
          :title="navTitle"
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
          <template #right>
            <view @click="tijiaoClick()">
                <view class="homestayView">提交</view>
            </view>
          </template>
        </u-navbar>
		<input class="searchlocation" v-model="changeDatas" placeholder="请输入修改内容" type="text" />
</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import eventBus from '@/utils/eventBus';

const bgColor = ref("#2A9595");
const navTitle = ref('');
const type = ref('');
const changeDatas = ref('');

onLoad((options: any) => {
	type.value = options.type || '';
	console.log(type.value);
	if (type.value === '1') {
		navTitle.value = '昵称';
	} else if (type.value === '2') {
		navTitle.value = '公益宣言';
	} else if (type.value === '3') {
		navTitle.value = 'QQ号码';
	}
});

const tijiaoClick = () => {
	if (changeDatas.value.length === 0) {
		uni.showToast({ title: '请输入修改内容', icon: 'none' });
		return;
	}
	eventBus.emit('refresh-Actdata', changeDatas.value);
	uni.navigateBack();
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
	 .searchlocation{
	          margin-left: 4%;
	          width: 92%;
	          height: 35px;
	          margin-top: 10px;
	          border: 1px darkgray solid;
	          border-radius: 5px;
	          font-size: 13px;
	      }
    }
</style>