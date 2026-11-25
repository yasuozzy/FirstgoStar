<template>
    <view>
        <view style="">
            <u-tabs style="
          position: fixed;
          top: 0px;
          z-index: 1000;
          height: 40px;
          width: 100%;
        " :list="tabList" :current="currentTab" @click="clickTab" :scrollable="false" active-color="#007aff"
                inactive-color="#606266"></u-tabs>
        </view>
        <swiper style="margin-top: 40px" :current="currentTab" @change="onSwiperChange"
            :style="{ height: swiperHeight + 'px' }">
            <swiper-item>
                <yonggonggongxiang :message="types[0]" :postid="types[0]" @message="receiveMessage"></yonggonggongxiang>
            </swiper-item>
            <swiper-item>
                <paigonggongxiang :message="types[1]" :postid="types[1]" @message="receiveMessage"></paigonggongxiang>
            </swiper-item>
        </swiper>

    </view>
</template>

<script setup lang="ts">
import yonggonggongxiang from "./YongGongGongXiangFrag.vue";

import paigonggongxiang from "./PaiGongGongXiangFrag.vue";

import { onActivated, onDeactivated, ref } from "vue";

defineOptions({ name: "FragPage" });

const props = defineProps(["message", "postid"]);

const tabList = ref([
                { name: "用工共享" },
                { name: "派工共享" },
            ]);

const types = ref(["", "2", "3", "4"]);

const currentTab = ref(0);

const swiperHeight = ref(500);

const onSwiperChange = (e) => {
  currentTab.value = e.detail.current;
};

const clickTab = (item) => {
  currentTab.value = item.index;
};

onActivated(() => {
  console.log("首页组件被激活了");
});

onDeactivated(() => {
  console.log("首页组件被停用了");
});
</script>
<style scoped></style>
