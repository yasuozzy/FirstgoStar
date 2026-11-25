<template>
  <view class="main">
    <!-- ================= 1. 顶部导航栏 ================= -->
    <u-navbar
      title="服务详情"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #fff; font-size: 16px; font-weight: 500;"
    >
      <!-- 左侧返回箭头 -->
      <template #left>
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>
    </u-navbar>
    <!-- ================= 2. 详情内容区域 ================= -->
    <view class="detail-container">
      <!-- 文本信息区域 -->
      <view class="info-group">
        <view class="info-item">
          <text class="label">服务名称：</text>
          <text class="value">{{detailData.title}}</text>
        </view>
        <view class="info-item">
          <text class="label">服务价格：</text>
          <text class="value">¥{{detailData.price}}</text>
        </view>
        <view class="info-item">
          <text class="label">服务描述：</text>
          <text class="value">{{detailData.desc}}</text>
        </view>
      </view>
      <!-- 中间浅灰色细分割线 -->
      <view class="divider"></view>
      <!-- 图片描述区域 -->
      <view class="image-section">
        <view class="section-title">图片描述</view>
        <image
          class="detail-image"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
          mode="widthFix"
        ></image>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
    const goBack =()=>{
        uni.navigateBack({delta:1})
    }
      const detailData = ref({
      title: '',
      price: '',
      desc: ''
      })
    onLoad((options: any)=>{
        detailData.value.title = options?.title || ''
        detailData.value.price = options?.price || ''
        detailData.value.desc = options?.desc || ''
    })
</script>


<style scoped lang="scss">
/* 页面背景为纯白 */
.main {
  min-height: 100vh;
  background-color: #ffffff;
}
/* 详情内容容器 */
.detail-container {
  padding: 24px 16px;
  box-sizing: border-box;
}
/* 文本信息组 */
.info-group {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 每行之间的垂直间距 */
  .info-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    line-height: 1.4;
    .label {
      color: #333333;
      font-weight: 400;
    }
    .value {
      color: #333333;
      font-weight: 400;
    }
  }
}
/* 中间细分割线 */
.divider {
  height: 1px;
  background-color: #e5e5e5;
  margin: 24px 0 20px 0;
}
/* 图片描述区域 */
.image-section {
  .section-title {
    font-size: 16px;
    color: #333333;
    margin-bottom: 16px;
  }
  .detail-image {
    width: 100%;
    border-radius: 4px;
    display: block;
    background-color: #f8f8f8;
  }
}
</style>
