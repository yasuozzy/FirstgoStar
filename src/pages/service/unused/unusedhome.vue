<template>
  <view>
    <recycler
      v-if="value6 === 0"
      :message="parentData"
      :postid="id"
      @message="receiveMessage"
    ></recycler>
    <exchange
      v-if="value6 === 1"
      :message="parentData"
      :postid="id"
      @message="receiveMessage"
    ></exchange>
    <mine
      v-if="value6 === 2"
      :message="parentData"
      :postid="id"
      @message="receiveMessage"
    ></mine>
    <u-tabbar
      :value="value6"
      :border="true"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
      @change="(name) => (value6 = name)"
    >
      <u-tabbar-item text="回收">
        <template #active-icon>
          <image class="u-page__item__slot-icon" :src="recyclingSelected" mode="aspectFit"></image>
        </template>
        <template #inactive-icon>
          <image class="u-page__item__slot-icon" :src="recyclingDefault" mode="aspectFit"></image>
        </template>
      </u-tabbar-item>
      <u-tabbar-item text="置换">
        <template #active-icon>
          <image class="u-page__item__slot-icon" :src="replacementSelected" mode="aspectFit"></image>
        </template>
        <template #inactive-icon>
          <image class="u-page__item__slot-icon" :src="replacementDefault" mode="aspectFit"></image>
        </template>
      </u-tabbar-item>
      <u-tabbar-item text="我的">
        <template #active-icon>
          <image class="u-page__item__slot-icon" :src="mySelected" mode="aspectFit"></image>
        </template>
        <template #inactive-icon>
          <image class="u-page__item__slot-icon" :src="myDefault" mode="aspectFit"></image>
        </template>
      </u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script setup lang="ts">
import recycler from "./frag/recycler.vue";

import exchange from "./frag/exchange.vue";

import mine from "./frag/mine.vue";

import recyclingSelectedImg from "@/static/service/recycling_selected.png";

import recyclingDefaultImg from "@/static/service/recycling_default.png";

import replacementSelectedImg from "@/static/service/replacement_selected.png";

import replacementDefaultImg from "@/static/service/replacement_default.png";

import mySelectedImg from "@/static/service/my_selected.png";

import myDefaultImg from "@/static/service/my_default.png";

import { ref } from "vue";

const value6 = ref(0);

const parentData = ref("aaa");

const id = ref(1);

const recyclingSelected = ref(recyclingSelectedImg);

const recyclingDefault = ref(recyclingDefaultImg);

const replacementSelected = ref(replacementSelectedImg);

const replacementDefault = ref(replacementDefaultImg);

const mySelected = ref(mySelectedImg);

const myDefault = ref(myDefaultImg);

const receiveMessage = (data) => {
  console.log(data);
};
</script>

<style>
.u-page__item__slot-icon {
  width: 24px;
  height: 24px;
}
</style>
