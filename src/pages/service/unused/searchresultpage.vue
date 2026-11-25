<template>
  <view style="background-color: #fff">
    <u-navbar title="闲置" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>
    <u-grid @scrolltolower="scrolltolower" :border="false" col="2">
      <u-grid-item v-for="(item, index) in loaddata" :key="index" style="padding: 3px;">
        <view style="
					    width: 100%;
					    display: flex;
					    flex-direction: column;
					    justify-content: center;
					    padding: 3px;
					  " @click="todetail(item.id)">
          <image style="width: 100%; height: 140px" :src="item.imgs && item.imgs.length > 0
            ? item.imgs[0]
            : '/static/default-image.png'
            " mode="scaleToFill"></image>
          <view style="
					      overflow: hidden;
					      text-overflow: ellipsis;
					      display: -webkit-box;
					      -webkit-box-orient: vertical;
					      -webkit-line-clamp: 2;
					      line-height: 1em;
					      max-height: 3em;
					      font-size: 14px;
					    ">{{ item.recycleTitle }}
          </view>
          <view style="
					      display: flex;
					      flex-direction: row;
					      justify-content: space-between;
					      margin: 4px 6px;
					    ">
            <view style="color: red; font-size: 13px">
              ¥{{ item.recyclePrice }}
            </view>
            <u-icon name="phone" size="20"></u-icon>
          </view>
        </view>
      </u-grid-item>
    </u-grid>
  </view>
</template>

<script setup lang="ts">
import { getExChangeList, getRecyclerList } from "@/api/service";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const searchinfo = ref("");

const type = ref("");

const loaddata = ref([

      ]);

const tablist = ref<any>();

const ids = ref<any>();

const goBack = () => {
  uni.navigateBack();
};

const todetail = (id) => {
  if (type.value === 1) {
      uni.navigateTo({
        url: '/pages/service/unused/exchangeproductdetailpage?id=' + id
      });
    } else {
      uni.navigateTo({
        url: '/pages/service/unused/recyclerproductdetailpage?id=' + id
      });
    }
};

const scrolltolower = () => {

};

const init = () => {
  if (type.value === 1) {
      let data1 = {
        itemTitle: searchinfo.value,
        estId: "",
        page: 1,
        size: 50
      };
      getExChangeList(data1).then(res => {
        console.log(res);
        loaddata.value = res.result;
        console.log(tablist.value);
        console.log(ids.value);
      });
    } else {
      let data1 = {
        recycleTitle: searchinfo.value,
        estId: "",
        page: 1,
        size: 50
      };
      getRecyclerList(data1).then(res => {
        console.log(res);
        loaddata.value = res.result;
        console.log(tablist.value);
        console.log(ids.value);
      });
    }
};

onLoad((option) => {
  searchinfo.value = option.searchinfo;
    type.value = option.type;
    console.log(searchinfo.value + ":" + type.value);
    init();
});
</script>

<style scoped lang="scss"></style>
