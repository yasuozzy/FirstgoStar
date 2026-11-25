<template>
    <view class="main">
        <u-navbar
          title="网格长推选"
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
            <view @click="homestayClick">
                <view class="homestayView">当前位置:铜山</view>
            </view>
          </template>
        </u-navbar>
</view>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { onLoad } from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");

    const init = () => {
    };

    const rightClick = () => {};

    const homestayClick = () => {};

    const goBack = () => {
        uni.navigateBack();
    };

    onLoad(() => {
        init();
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
