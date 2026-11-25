<template>
    <view>
        <u-navbar title="用工登记" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
<view >
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
</template>
            <template #right>
<view >
                <view style="display: flex;flex-direction: row;">
                    <u-image src="/static/service/shenhe.png" style="margin-right: 10px;" width="20" height="20"
                        @click="shenhe" mode="widthFix"></u-image>
                    <u-image src="/static/service/icon_my.png" style="margin-right: 10px;" width="25" height="25"
                        @click="yonggongdengjilist" mode="widthFix"></u-image>
                </view>

            </view>
</template>
        </u-navbar>
        <view style="">
            <u-tabs style="
          position: fixed;
          top: 64px;
          z-index: 1000;
          height: 40px;
          width: 100%;
          background-color: white;
        " :list="tabList" :current="currentTab" @click="clickTab" :scrollable="false" active-color="#007aff"
                inactive-color="#606266"></u-tabs>
        </view>
        <swiper style="margin-top: 40px" :current="currentTab" @change="onSwiperChange"
            :style="{ height: swiperHeight }">
            <swiper-item>
                <registgerenyonggong :message="types[0]" :postid="types[0]" @message="receiveMessage">
                </registgerenyonggong>
            </swiper-item>
            <swiper-item>
                <registqiyeyonggong :message="types[1]" :postid="types[1]" @message="receiveMessage">
                </registqiyeyonggong>
            </swiper-item>
            <swiper-item>
                <registwangqianxieyi :message="types[2]" :postid="types[2]" @message="receiveMessage">
                </registwangqianxieyi>
            </swiper-item>
        </swiper>
        <u-modal :show="show" :title="title" :content='content' showCancelButton="true"></u-modal>
    </view>


</template>

<script setup lang="ts">
import registgerenyonggong from "./registgerenyonggong.vue";

import registqiyeyonggong from "./registqiyeyonggong.vue";

import registwangqianxieyi from "./registwangqianxieyi.vue";

import { storage } from '@/utils/storage';

import { MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo } from '@/api/mine.ts';

import { computed, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007aff");

const type = ref("1");

const tabList = ref([
                { name: "个人用工" },
                { name: "企业用工" },
                { name: "网签协议" },
            ]);

const types = ref(["", "2", "3",]);

const currentTab = ref(0);

const windowHeight = ref(0);

const show = ref(false);

const title = ref('');

const content = ref('');

const rstatus = ref('');

const towhich = ref('');

const swiperHeight = computed(() => {
  const navigationBarHeight = 64 + 40; // 固定导航栏高度
    return `calc(100vh - ${navigationBarHeight}px)`;
    // return 1400
});

const loadData = () => {

};

const goBack = () => {
  uni.navigateBack();
};

const onSwiperChange = (e) => {
  currentTab.value = e.detail.current;
};

const getcomregiststatus = () => {
  let param = {
      userId: storage.getUserId()
    };
    MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo(param).then(res => {
      console.log(res);
      rstatus.value = res.result;
      // if (res.result === '1') {
      //     uni.navigateTo({
      //         url: '/pages/mine/LingGongOrder/zhaopinPass'
      //     })
      // } else if (res.result === '-1') {
      //     uni.navigateTo({
      //         url: '/pages/mine/LingGongOrder/zhaopinDengJi'
      //     })
      // }
    });
};

const confirm = () => {
  show.value = false;
    if (towhich.value == "1") {
      uni.navigateTo({
        url: '/pages/mine/LingGongOrder/zhaopinDengJi'
      });
    } else if (towhich.value == "2") {
      // uni.navigateTo({
      //     url: '/pages/mine/LingGongOrder/zhaopinPass'
      // })
    } else if (towhich.value == "3") {
      uni.navigateTo({
        url: '/pages/mine/LingGongOrder/zhaopinDengJi'
      });
    }
};

const clickTab = (item) => {
  if (item.index == 1 && rstatus.value == '-1') {
      uni.navigateTo({
        url: '/pages/mine/LingGongOrder/zhaopinDengJi'
      });
    } else {
      currentTab.value = item.index;
    }

    // this.currentTab = item.index;
    // if (this.currentTab == 1) {
    //     if (this.rstatus == '-1') {
    //         this.show = true;
    //         this.title = '企业用工登记';
    //         this.content = '去登记企业信息';
    //         this.towhich = "1";
    //         return;
    //     } else if (this.rstatus == '1') {
    //         this.currentTab = item.index;
    //     } else if (this.rstatus == '0') {
    //         this.show = true;
    //         this.title = '企业用工登记';
    //         this.content = '资料审核中，请耐心等待';
    //         this.towhich = "2";
    //         return;
    //     } else if (this.rstatus == '2') {
    //         this.show = true;
    //         this.title = '企业用工登记';
    //         this.content = '资料未通过，重新提交信息';
    //         this.towhich = "3";
    //         return;
    //     }
    // }
};

const shenhe = () => {
  if (rstatus.value == '-1') {
      uni.navigateTo({
        url: '/pages/mine/LingGongOrder/zhaopinDengJi'
      });
    }
    if (rstatus.value == '0') {
      uni.navigateTo({
        url: '/pages/mine/LingGongOrder/zhaopinPass'
      });
    }
    if (rstatus.value == '1') {
      uni.navigateTo({
        url: '/pages/mine/LingGongOrder/zhaopinPass'
      });
    }
    if (rstatus.value == '2') {
      uni.navigateTo({
        url: '/pages/mine/LingGongOrder/zhaopinPass'
      });
    }
};

const yonggongdengjilist = () => {
  uni.navigateTo({
      url: '/pages/service/work/yonggongdengjilist'
    });
};

onMounted(() => {
  loadData();
});

onLoad(() => {
  uni.getSystemInfo({
      success: res => {
        windowHeight.value = res.windowHeight;
        console.log("Window Height:", windowHeight.value);
      }
    });
    getcomregiststatus();
});
</script>

<style></style>