<template>
  <view class="content">
    <!-- uView Tabs 组件 -->
    <u-navbar
      title="审批"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
<view  @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
</template>
      <template #right>
<view  @click="toggleSearch">
        <u-icon name="search" size="20" color="#fff" style="margin-right: 15px;"></u-icon>
      </view>
</template>
    </u-navbar>
    <view v-if="showSearch" class="search-bar">
      <input
        v-model="searchKeyword"
        placeholder="搜索文件"
        type="text"
        confirm-type="search"
        @confirm="doSearch"
        class="search-input"
      />
      <view @click="doSearch" class="search-action search-action-primary">搜索</view>
      <view @click="cancelSearch" class="search-action">取消</view>
    </view>
    <view class="tabs-wrapper">
      <u-tabs
        :list="tabList"
        :current="currentTab"
        @click="clickTab"
        :scrollable="false"
        active-color="#2A9595"
        inactive-color="#606266"
      ></u-tabs>
    </view>
    <swiper
      class="content-swiper"
      :current="currentTab"
      @change="onSwiperChange"
      :style="{ height: swiperHeight + 'px' }"
    >
      <swiper-item v-for="(item, index) in tabList" :key="index">
        <FragPage
          :message="types[index]"
          :postid="types[index]"
          :keyword="searchKeyword"
          :refreshKey="refreshKey"
          @message="receiveMessage"
          @loaded="handleListLoaded"
          @updated="handleUpdated"
        ></FragPage>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import FragPage from "./fragpage.vue";

import { receivefilecount } from "@/api/service.ts";

import { storage } from "@/utils/storage";

import { ref } from "vue";

import { onLoad, onShow } from "@dcloudio/uni-app";

const bgColor = ref("#2A9595");

const parentData = ref("Hello from Parent");

const id = ref("11111111");

const tabList = ref([{ name: "待确认" }, { name: "已确认" }]);

const types = ref(["0", "1"]);

const currentTab = ref(0);

const swiperHeight = ref(500);

const showSearch = ref(false);

const searchKeyword = ref("");

const refreshKey = ref(0);

const localCounts = ref({
        0: 0,
        1: 0,
      });

const serverCounts = ref({
        0: null,
        1: null,
      });

const updateSwiperHeight = () => {
  uni.getSystemInfo({
      success: res => {
        const extraHeight = showSearch.value ? 48 : 0;
        const nextHeight = res.windowHeight - 104 - extraHeight;
        swiperHeight.value = nextHeight > 200 ? nextHeight : 200;
      }
    });
};

const updateTabList = () => {
  const waitCount = serverCounts.value[0] !== null ? serverCounts.value[0] : localCounts.value[0];
    const doneCount = serverCounts.value[1] !== null ? serverCounts.value[1] : localCounts.value[1];
    tabList.value = [{
      name: waitCount ? `待确认(${waitCount})` : "待确认"
    }, {
      name: doneCount ? `已确认(${doneCount})` : "已确认"
    }];
};

const parseCounts = (result) => {
  let waitCount = null;
    let doneCount = null;
    if (Array.isArray(result)) {
      result.forEach(item => {
        const status = String(item.status ?? item.type ?? item.key ?? "");
        const name = item.name || item.statusName || "";
        const count = Number(item.count ?? item.num ?? item.total ?? 0);
        if (status === "0" || name.indexOf("待") !== -1) {
          waitCount = count;
        }
        if (status === "1" || name.indexOf("已") !== -1) {
          doneCount = count;
        }
      });
    } else if (result && typeof result === "object") {
      const waitKeys = ["waitConfirmCount", "pendingCount", "toBeConfirmedCount", "unConfirmCount", "waitCount", "count0", "status0"];
      const doneKeys = ["confirmedCount", "finishCount", "doneCount", "confirmCount", "count1", "status1", "alreadyConfirmCount"];
      waitKeys.some(key => {
        if (typeof result[key] !== "undefined" && result[key] !== null) {
          waitCount = Number(result[key] || 0);
          return true;
        }
        return false;
      });
      doneKeys.some(key => {
        if (typeof result[key] !== "undefined" && result[key] !== null) {
          doneCount = Number(result[key] || 0);
          return true;
        }
        return false;
      });
    }
    return {
      waitCount,
      doneCount
    };
};

const loadCounts = () => {
  receivefilecount({
      userId: storage.getPlatId()
    }).then(res => {
      const {
        waitCount,
        doneCount
      } = parseCounts(res && res.result);
      serverCounts.value[0] = waitCount;
      serverCounts.value[1] = doneCount;
      updateTabList();
    }).catch(error => {
      console.log(error);
      serverCounts.value[0] = null;
      serverCounts.value[1] = null;
      updateTabList();
    });
};

const clickTab = (item) => {
  console.log("item", item);
    currentTab.value = item.index;
};

const onSwiperChange = (e) => {
  currentTab.value = e.detail.current;
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
    if (!showSearch.value) {
      searchKeyword.value = "";
      refreshKey.value += 1;
    }
    updateSwiperHeight();
};

const doSearch = () => {
  refreshKey.value += 1;
};

const cancelSearch = () => {
  showSearch.value = false;
    searchKeyword.value = "";
    refreshKey.value += 1;
    updateSwiperHeight();
};

const receiveMessage = (message) => {
  console.log("Received message:", message);
    parentData.value = message;
};

const handleListLoaded = (payload) => {
  if (!payload) {
      return;
    }
    const status = String(payload.status);
    if (Object.prototype.hasOwnProperty.call(localCounts.value, status)) {
      localCounts.value[status] = Number(payload.count || 0);
      updateTabList();
    }
};

const handleUpdated = () => {
  refreshKey.value += 1;
    loadCounts();
};

const goBack = () => {
  uni.navigateBack();
};

onLoad(() => {
  updateSwiperHeight();
    loadCounts();
});

onShow(() => {
  refreshKey.value += 1;
    loadCounts();
});
</script>

<style scoped>
.content {
  height: 100vh;
  background-color: #fafafa;
  overflow: hidden;
}

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 10px;
  background-color: #fff;
}

.search-input {
  flex: 1;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 0 12px;
  font-size: 13px;
}

.search-action {
  margin-left: 8px;
  color: #999;
  font-size: 14px;
}

.search-action-primary {
  color: #2A9595;
}

.tabs-wrapper {
  background-color: #fff;
}

.content-swiper {
  background-color: #f5f5f5;
}
</style>
