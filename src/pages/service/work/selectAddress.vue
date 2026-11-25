<template>
    <view class="page">
        <u-navbar title="选择地址" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view  @click="goBack">
                <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
            </view>
</template>
        </u-navbar>

        <!-- 搜索框 -->
        <view class="search-bar">
            <view class="search-inner">
                <image class="search-icon" src="/static/mine/searchImage.png" mode="aspectFit" />
                <input
                    class="search-input"
                    placeholder="搜索地点"
                    placeholder-style="color:#bbb;font-size:28rpx;"
                    v-model="keyword"
                    confirm-type="search"
                    @input="onSearchInput"
                    @confirm="doSearch"
                />
                <view v-if="keyword" class="search-clear" @tap="clearSearch">
                    <text class="clear-icon">✕</text>
                </view>
            </view>
        </view>

        <!-- 地图 -->
        <map
            class="map-view"
            :latitude="latitude"
            :longitude="longitude"
            :markers="markers"
            :scale="15"
            show-location
            @markertap="onMarkerTap"
        ></map>

        <!-- POI 列表 -->
        <scroll-view class="poi-list" scroll-y>
            <view v-if="loading" class="poi-loading">
                <text class="poi-loading-text">加载中...</text>
            </view>
            <view v-else-if="poiList.length === 0" class="poi-empty">
                <text>暂无附近地点</text>
            </view>
            <block v-else>
                <view
                    v-for="(item, index) in poiList"
                    :key="index"
                    class="poi-item"
                    @tap="selectPoi(item, index)"
                >
                    <view class="poi-name">{{ item.title }}</view>
                    <view class="poi-addr">{{ item.address }}</view>
                </view>
            </block>
        </scroll-view>
    </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const QQMAP_KEY = ref('LEABZ-6ZI6A-N2JKY-CFLQT-VLE66-TLFFX');
import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref('#2A9598');

const latitude = ref(39.9087);

const longitude = ref(116.3975);

const keyword = ref('');

const poiList = ref([]);

const markers = ref([]);

const selectedIndex = ref(-1);

const loading = ref(false);

const searchTimer = ref(null);

const goBack = () => {
  uni.navigateBack();
};

const getLocation = () => {
  uni.getLocation({
      type: 'gcj02',
      success: res => {
        latitude.value = res.latitude;
        longitude.value = res.longitude;
        searchNearby(res.latitude, res.longitude, '');
      },
      fail: () => {
        searchNearby(latitude.value, longitude.value, '');
      }
    });
};

const searchNearby = (lat, lng, keyword) => {
  if (keyword) {
      searchSuggestion(keyword);
    } else {
      searchAround(lat, lng);
    }
};

const searchSuggestion = (keyword) => {
  loading.value = true;
    const url = `https://apis.map.qq.com/ws/place/v1/suggestion?keyword=${encodeURIComponent(keyword)}&page_size=20&key=${QQMAP_KEY}`;
    uni.request({
      url,
      success: res => {
        const data = res.data;
        if (data && data.status === 0 && data.data && data.data.length) {
          poiList.value = data.data;
          markers.value = data.data.filter(item => item.location).map((item, index) => ({
            id: index,
            latitude: item.location.lat,
            longitude: item.location.lng,
            title: item.title,
            width: 30,
            height: 30
          }));
          const first = data.data.find(item => item.location);
          if (first) {
            latitude.value = first.location.lat;
            longitude.value = first.location.lng;
          }
        } else {
          poiList.value = [];
          markers.value = [];
        }
      },
      fail: () => {
        poiList.value = [];
        markers.value = [];
      },
      complete: () => {
        loading.value = false;
      }
    });
};

const searchAround = (lat, lng) => {
  loading.value = true;
    const url = `https://apis.map.qq.com/ws/place/v1/search?keyword=附近&boundary=nearby(${lat},${lng},1000)&page_size=20&key=${QQMAP_KEY}`;
    uni.request({
      url,
      success: res => {
        const data = res.data;
        if (data && data.status === 0 && data.data) {
          poiList.value = data.data;
          markers.value = data.data.map((item, index) => ({
            id: index,
            latitude: item.location.lat,
            longitude: item.location.lng,
            title: item.title,
            width: 30,
            height: 30
          }));
        } else {
          poiList.value = [];
          markers.value = [];
        }
      },
      fail: () => {
        poiList.value = [];
        markers.value = [];
      },
      complete: () => {
        loading.value = false;
      }
    });
};

const onSearchInput = () => {
  clearTimeout(searchTimer.value);
    searchTimer.value = setTimeout(() => {
      if (keyword.value.trim()) {
        searchNearby(latitude.value, longitude.value, keyword.value.trim());
      } else {
        searchNearby(latitude.value, longitude.value, '');
      }
    }, 500);
};

const doSearch = () => {
  clearTimeout(searchTimer.value);
    if (keyword.value.trim()) {
      searchNearby(latitude.value, longitude.value, keyword.value.trim());
    }
};

const clearSearch = () => {
  keyword.value = '';
    searchNearby(latitude.value, longitude.value, '');
};

const selectPoi = (item) => {
  returnAddress(item);
};

const onMarkerTap = (e) => {
  const id = e.markerId !== undefined ? e.markerId : e.detail && e.detail.markerId;
    if (id !== undefined && id >= 0 && id < poiList.value.length) {
      returnAddress(poiList.value[id]);
    }
};

const returnAddress = (poi) => {
  const address = poi.title + (poi.address ? ' ' + poi.address : '');
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    if (prevPage) {
      prevPage.$vm.addressstring = address;
      prevPage.$vm.addressstitle = poi.title;
    }
    uni.navigateBack();
};

onLoad(() => {
  getLocation();
});
</script>

<style scoped>
.page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
}

/* 搜索框 */
.search-bar {
    padding: 20rpx 24rpx;
    background-color: #fff;
}

.search-inner {
    display: flex;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 40rpx;
    padding: 0 28rpx;
    height: 72rpx;
    border: 1rpx solid #eee;
}

.search-icon {
    width: 32rpx;
    height: 32rpx;
    flex-shrink: 0;
    opacity: 0.45;
}

.search-input {
    flex: 1;
    height: 72rpx;
    font-size: 28rpx;
    margin-left: 14rpx;
    background-color: transparent;
    color: #333;
}

.search-clear {
    padding: 8rpx 0 8rpx 16rpx;
}

.clear-icon {
    font-size: 24rpx;
    color: #bbb;
}

/* 地图 */
.map-view {
    width: 100%;
    height: 420rpx;
    flex-shrink: 0;
}

/* POI 列表 */
.poi-list {
    flex: 1;
    background-color: #fff;
}

.poi-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60rpx 0;
}

.poi-loading-text {
    font-size: 28rpx;
    color: #999;
}

.poi-empty {
    text-align: center;
    padding: 80rpx 0;
    font-size: 28rpx;
    color: #bbb;
}

.poi-item {
    padding: 30rpx 30rpx 28rpx;
    border-bottom: 1rpx solid #f0f0f0;
    background-color: #fff;
}

.poi-name {
    font-size: 30rpx;
    color: #222;
    line-height: 1.4;
}

.poi-addr {
    font-size: 24rpx;
    color: #999;
    margin-top: 8rpx;
    line-height: 1.4;
}
</style>
