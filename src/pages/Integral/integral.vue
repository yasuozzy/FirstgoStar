<template>
  <view class="main">
    <!-- ============ 头部导航栏 ============ -->
    <u-navbar
      title="积分商城"
      @rightClick="rightClick"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
    >
      <!-- 【修改1】Vue3 插槽语法 -->
      <template #left>
        <view class="u-nav-slot"></view>
      </template>
    </u-navbar>

    <!-- ============ 滚动内容区域 ============ -->
    <!-- 【修改2】scroll-view 必须有明确高度才能滚动 -->
    <scroll-view scroll-y="true" style="flex: 1; height: calc(100vh - 44px);">
      <view>
        <!-- 搜索框 -->
        <view class="searchView">
          <input class="searchFeild" placeholder="输入关键词搜索更多商品" type="text" />
        </view>

        <!-- 滑动广告表头 -->
        <view class="swiper">
          <u-swiper :list="bannerList" :autoplay="true" :radius="0" height="160"></u-swiper>
        </view>

        <!-- 爆款排名 -->
        <view class="hotHeader">
          <u-image
            style="margin-top: 10px; margin-left: 15px"
            :src="hotImage"
            width="30px"
            height="30px"
          ></u-image>
          <view class="textView">爆款排名</view>
        </view>
        
        <view class="hotView">
          <view class="hotview_item" v-for="(item, index) in hotList" :key="index">
            <u-image style="border-radius: 4px" :src="item.img" width="80px" height="80px"></u-image>
            <view class="hot-item-name">{{ item.name }}</view>
            <view class="hot-item-sales">已有{{ item.sales }}人兑换</view>
            <view class="hot-exchange-btn" @click="exchangeClick(item)">立即兑换</view>
          </view>
        </view>

        <view style="background-color: lightgray; width: 100%; height: 5px; margin-top: 10px"></view>

        <!-- 分类 Tab -->
        <scroll-view scroll-x="true" class="tab-scroll">
          <!-- 【修改3】UniApp 中尽量用 view 代替 div -->
          <view class="tab-list">
            <view
              v-for="tab in tabs"
              :key="tab.categoryCode"
              :class="['tab', activeTab === tab.categoryCode ? 'active' : '']"
              @click="handleTabClick(tab)"
            >
              {{ tab.categoryName }}
              <view class="line" v-if="activeTab === tab.categoryCode"></view>
            </view>
          </view>
        </scroll-view>

        <!-- 商品列表 -->
        <view class="goodsView">
          <!-- 【修改4】补全 :key -->
          <view class="goods_item" v-for="(item, index) in goodsList" :key="item.sku || index">
            <view style="display: flex; flex-direction: row">
              <u-image
                style="border-radius: 4px; margin-top: 10px; margin-left: 15px"
                :src="item.img"
                width="100px"
                height="90px"
              ></u-image>
              <view style="display: flex; flex-direction: column; width: 60%">
                <view class="goods-name">{{ item.name }}</view>
                <view style="font-size: 12px; color: red; margin-top: 5px; margin-left: 5px">
                  积分{{ item.integral }}
                </view>
                <view class="buttonView" @click="exchangeClick(item)">立即兑换</view>
              </view>
            </view>
            <view class="goods-divider"></view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {
  integralGetHot,
  integralGetBanner,
  integralFirstLevel,
  integralGoodsList,
} from '@/api/integral'; 

// ================= 1. 状态定义 (替代 data) =================
const bgColor = ref('#2A9595');
const hotImage = ref('/static/home/hotimage.png');

const hotList = ref<any[]>([]);
const bannerList = ref<string[]>([]);
const tabs = ref<any[]>([]);
const activeTab = ref<string | number>('');
const goodsList = ref<any[]>([]);

// 请求参数
const firstParam = reactive({});
const gridParam = reactive({ levels: '1' });
const goodsParam = reactive({
  currentPage: 1,
  pageSize: 10,
  code: '00',
  Searchcontent: '',
  scoreType: '1', // 0充值积分，1普通积分
});

// ================= 2. 方法定义 (替代 methods) =================

const rightClick = () => {
  // 右上角点击事件预留
};

// 爆款商品
const getHotData = async () => {
  try {
    const res = await integralGetHot(firstParam);
    console.log(res);
    const result = res.result || [];
    hotList.value = result.slice(0, 3);
  } catch (error) {
    console.error('获取爆款商品失败:', error);
  }
};

// 轮播图
const getBannerData = async () => {
  try {
    const res = await integralGetBanner(firstParam);
    console.log(res);
    const result = res.result || [];
    bannerList.value = result.map((item: any) => item.imgUrl);
  } catch (error) {
    console.error('获取轮播图失败:', error);
  }
};

// 分类标签
const getGridLabel = async () => {
  try {
    const res = await integralFirstLevel(gridParam);
    console.log(res);
    const result = res.result || [];
    tabs.value = result;
    
    // 默认点击第一个
    if (result.length > 0) {
      activeTab.value = result[0].categoryCode;
      await getGoodsList(activeTab.value);
    }
  } catch (error) {
    console.error('获取分类标签失败:', error);
  }
};

// 分类标签下的商品列表
const getGoodsList = async (categoryCode: string | number) => {
  try {
    goodsParam.Searchcontent = String(categoryCode);
    const res = await integralGoodsList(goodsParam);
    console.log(res);
    goodsList.value = res.result || [];
  } catch (error) {
    console.error('获取商品列表失败:', error);
  }
};

// 点击 Tab
const handleTabClick = (tab: any) => {
  console.log(tab);
  activeTab.value = tab.categoryCode;
  getGoodsList(activeTab.value);
};

// 立即兑换
const exchangeClick = (item: any) => {
  uni.navigateTo({
    url: `/pages/Integral/confirmOrder?sku=${item.sku}`,
  });
};

// ================= 3. 生命周期 (替代 created) =================
onMounted(() => {
  getHotData();
  getBannerData();
  getGridLabel();
});
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column; /* 配合 scroll-view 的 flex: 1 */

  .searchView {
    width: 100%;
    height: 45px;
    background-color: #2a9595;
  }
  .searchFeild {
    margin-left: 3%;
    width: 94%;
    height: 35px;
    background-color: #f1f4f9;
    border-radius: 5px;
    font-size: 13px;
  }

  .hotHeader {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: white;
    height: 50px;
  }
  .textView {
    margin-left: 10px;
    margin-top: 10px;
    color: firebrick;
  }
  
  .hotView {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    width: 100%;
    .hotview_item {
      display: flex;
      flex-direction: column;
      width: 33.33%;
      align-items: center;
      
      .hot-item-name {
        font-size: 13px;
        margin-top: 10px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-left: 6%;
        width: 88%;
      }
      .hot-item-sales {
        font-size: 13px;
        margin-top: 10px;
        color: dimgray;
        text-align: center;
      }
      .hot-exchange-btn {
        margin-top: 10px;
        background-color: red;
        border-radius: 8px;
        color: white;
        font-size: 12px;
        width: 60%;
        height: 20px;
        text-align: center;
        line-height: 20px; /* 让文字垂直居中 */
      }
    }
  }

  .tab-scroll {
    width: 100%;
    white-space: nowrap; /* 确保横向滚动生效 */
  }
  .tab-list {
    display: inline-flex;
    padding: 20rpx;
  }
  .tab {
    position: relative;
    padding: 20rpx 40rpx;
    color: #333;
    font-size: 16px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .tab.active {
    color: #2a9595;
    font-weight: bold;
  }
  .line {
    position: absolute;
    bottom: -20rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 50rpx;
    height: 4rpx;
    background: #2a9595;
    border-radius: 2rpx;
  }

  .goodsView {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 10px;
  }
  .goods_item {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    
    .goods-name {
      font-size: 14px;
      margin-top: 10px;
      margin-left: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 80%;
    }
    .goods-divider {
      margin-top: 15px;
      margin-left: 3%;
      width: 94%;
      height: 1px;
      background-color: lightgray;
    }
  }
  .buttonView {
    margin-top: 10px;
    background-color: red;
    border-radius: 8px;
    color: white;
    font-size: 12px;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 80%;
  }
}
</style>
