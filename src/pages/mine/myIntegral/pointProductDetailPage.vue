<template>
  <view class="container">
    <u-navbar
      title=""
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
	<template #left>
      <view slot="left" @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
	</template>
    </u-navbar>
    <u-swiper
      :list="goodsInfo.imgAry"
      indicator
      indicatorMode="line"
      circular
    ></u-swiper>
    <view style="margin: 10px">{{ goodsInfo.goodsName }}</view>
    <view
      style="
        margin: 1px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      "
    >
      <view style="font-size: 16px; color: red; font-weight: bolder"
        >￥{{ goodsInfo.price }}</view
      >
      <image
        src="@/static/logo.png"
        style="width: 20px; height: 20px; margin-left: 10px"
        mode="aspectFill"
      ></image>
    </view>
    <u-gap bgColor="#f5f5f5" height="10"></u-gap>
    <view
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 15px;
      "
      @click="showspec"
    >
      <view> 规格：数量1份；1件 </view>
      <view> > </view>
    </view>
    <u-gap bgColor="#f5f5f5" height="10"></u-gap>
    详情
    <u-parse :content="goodsInfo.details"></u-parse>

    <u-popup :show="show" mode="bottom" @close="close" @open="open">
      <view style="padding: 10px">
        <view style="display: flex; flex-direction: row">
          <image
            src="@/static/logo.png"
            style="width: 70px; height: 70px"
          ></image>
          <view>
            <view>2000</view>
            <view>库存：300</view>
            <view>已选"10包"</view>
          </view>
        </view>
        <view v-for="(item, index) in goodsInfo.param" :key="index">
          <view>{{ item.name }}</view>
          <view class="u-demo-block__content">
            <view
              style="margin-right: 15px; display: flex; flex-direction: row"
              v-for="(citem, cindex) in item.attr"
              :key="cindex"
            >
              <u-tag
                :text="citem.value"
                :plain="!citem.checked"
                type="warning"
                size="medium"
                :name="cindex"
                @click="radioClick"
              >
              </u-tag>
            </view>
          </view>
        </view>
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          "
        >
          购买数量 <u-number-box :min="1" :max="100"></u-number-box>
        </view>
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 10px;
          "
        >
          <view
            style="
              background-color: #2a9595;
              flex: 1;
              color: white;
              text-align: center;
              padding: 10px 0px;
              border-radius: 5px;
              margin-right: 15px;
            "
            >加入购物车</view
          >
          <view
            style="
              background-color: #2a9595;
              flex: 1;
              color: white;
              text-align: center;
              padding: 10px 0px;
              border-radius: 5px;
              margin-left: 15px;
            "
            >立即购买</view
          >
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">

	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
    const id = ref('');
    const  show = ref(false);
    const  bgColor =  ref("#2a9595");
    const  goodsInfo = ref({
        is_pre: 0,
        realManageId: "605141ca365e4edb92fd4f30a6a0683a",
        kindCode: "1f6df672-d3f8-4045-abf0-47df4da36d1a",
        providerCode: "a09ce1a089784782947303987cbdc871",
        is_ord_pre: 1,
        cartGoodsNum: 2,
        goodsPublicId: "72258321-d416-4626-bde4-3a28353b0b34",
        specs: [
          {
            showName: "包: 10包",
            pname: "包: 10包",
            checked: false,
            pId: "937ec657b8244e9f953578fe048278ca",
            id: "c6e122fddd7c4688b5bf88fdde6a6460",
            value: "10包",
          },
          {
            showName: "片: 200片",
            pname: "片: 200片",
            checked: false,
            pId: "f769a5ad2ff748a1933ce3123a73b55a",
            id: "8f468b4b71ef4294bbfed448e7acdacc",
            value: "200片",
          },
        ],
        param: [
          {
            name: "包",
            id: "937ec657b8244e9f953578fe048278ca",
            attr: [
              {
                id: "52de25f3f7d0490da24f0ec598e37fa0",
                pId: "937ec657b8244e9f953578fe048278ca",
                value: "1包",
                showName: "包-1包",
                checked: false,
              },
              {
                id: "7c85a62960e24b4b866b8ac8a4672648",
                pId: "937ec657b8244e9f953578fe048278ca",
                value: "5包",
                showName: "包-5包",
                checked: false,
              },
              {
                id: "c6e122fddd7c4688b5bf88fdde6a6460",
                pId: "937ec657b8244e9f953578fe048278ca",
                value: "10包",
                showName: "包-10包",
                checked: false,
              },
            ],
          },
          {
            name: "片",
            id: "f769a5ad2ff748a1933ce3123a73b55a",
            attr: [
              {
                id: "7970669bd3f946848d6919d7ce87ff04",
                pId: "f769a5ad2ff748a1933ce3123a73b55a",
                value: "100片",
                showName: "片-100片",
                checked: false,
              },
              {
                id: "8f468b4b71ef4294bbfed448e7acdacc",
                pId: "f769a5ad2ff748a1933ce3123a73b55a",
                value: "200片",
                showName: "片-200片",
                checked: false,
              },
            ],
          },
        ],
        price: 200.0,
        imgAry: [
          {
            goodImg:
              "https://hps.qyp2c.com/estate/a09ce1a089784782947303987cbdc871/20250311/d5d5428e-1727-4bf2-9dc3-e8372edcc9c5.jpg",
          },
        ],
        details:
          '<p><img src="http://36.138.20.61/estate/a09ce1a089784782947303987cbdc871/20250311/d5d5428e-1727-4bf2-9dc3-e8372edcc9c5.jpg"/></p>',
        shopId: "763de0bf0f7d41a0a57fa071c5665713",
        sku: "fb507214-0b9a-4a66-b097-ee9861d76d3a",
        goodsName: "车",
        nums: 13.0,
      });
  

	  onLoad((options:any) => {
		id.value = decodeURIComponent(options.id);
		init();
	  });

  
    const init = async() => {
      let data = {
        sku: id.value,
        userId: getStorage(storageKeys.userId,''),
        manageId: getStorage(storageKeys.manid,''),
      };
      
      const res = await GongFenProductDetail(data);
        goodsInfo.value = res.result;
        console.log(res);
      
    };

    const goBack = () => {
      uni.navigateBack();
    };
    const showspec = () => {
      show.value = true;
    };
    const open = () => {
      // console.log('open');
    };
    const close = ()=> {
     show.value = false;
      // console.log('close');
    };
    const radioClick = (name:any) => {
      goodsInfo.value.param[0].attr.map((item, index) => {
        item.checked = index === name ? true : false;
      });
    };
  
</script>

<style>
.u-demo-block__content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
</style>
