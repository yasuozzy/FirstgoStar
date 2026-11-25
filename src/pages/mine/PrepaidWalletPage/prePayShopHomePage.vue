<template>
  <view class="all">
    <view></view>
    <view class="search">
      <u-icon @click="goBack" name="arrow-left" size="20" color="#fff"></u-icon>
      <input
        class="weui-input"
        style="
          border: 2rpx solid #2a9595;
          border-radius: 8rpx;
          margin-left: 15rpx;
          margin-right: 15rpx;
          margin-top: 15rpx;
          padding-left: 10rpx;
          padding-right: 10rpx;
        "
        auto-focus
        placeholder="搜索店铺"
      />
      <image
        class="car"
        @click="toShoppingCart"
        src="@/static/mine/shopCartImage.png"
      ></image>
    </view>

    <view
      style="
        background-color: #2a9595;
        display: flex;
        flex-direction: row;
        height: 100px;
        line-height: 80px;
        padding: 0px 15px;
        color: white;
        justify-content: space-between;
      "
    >
      <view style="font-size: 14px">店铺：{{ name }}</view>
      <view style="font-size: 14px">预付余额：{{ amount }}</view>
    </view>

    <view style="background-color: #f3f4f8; width: 100%; height: 5px"></view>
    <view class="caregory">
      <scroll-view class="nav_left" scroll-y>
        <view v-for="(item, index) in navLeftItems" :key="index">
          <view
            :class="{
              nav_left_items: true,
              'nav_left_item-active': curIndex === index,
            }"
            @click="currentTabs(index)"
          >
            {{ item.catName }}
          </view>
        </view>
      </scroll-view>
      <scroll-view class="nav_right" scroll-y>
        <view class="grid-container">
          <view
            v-for="(item, rindex) in products"
            :key="rindex"
            class="grid-item"
            @click="todetail(item)"
          >
            <image
              style="width: 100%; height: 140px"
              :src="item.goodImg"
            ></image>
            <view
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                line-height: 1em;
                max-height: 3em;
                font-size: 14px;
				margin-left: 3px;
              "
              >{{ item.goodName }}</view
            >
            <view
              style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin: 4px 6px;
              "
            >
              <view style="color: red;font-size: 13px;"> ￥{{ item.goodPrice }} </view>
              <view style="display: flex; flex-direction: row">
                <view
                  @click.stop="dec(item)"
                  style="
                    border: 1px solid #666;
                    width: 16px;
                    text-align: center;
                    border-radius: 5px;
                    margin-right: 5px;
                  "
                  >-</view
                >
                <view>{{ item.nums }}</view>
                <view
                  @click.stop="add(item)"
                  style="
                    margin-left: 5px;
                    border: 1px solid #2a9595;
                    width: 16px;
                    border-radius: 5px;
                    color: white;
                    text-align: center;
                    background-color: #2a9595;
                  "
                  >+</view
                >
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view style="z-index: 10076" class="cont_bot" @click="showPop">
      <image
        style="width: 30px; height: 30px; margin-top: 10px; margin-left: 30px"
        src="@/static/mine/shopCartImage.png"
      ></image>
      <view
        style="
          height: 50px;
          line-height: 50px;
          color: white;
          margin-left: 30px;
          flex: 1;
        "
        >¥{{ cash }}</view
      >
      <view
        @click="submitOrder"
        style="
          background-color: orange;
          color: white;
          line-height: 50px;
          height: 50px;
          padding: 0px 20px;
          border-bottom-right-radius: 40px;
          border-top-right-radius: 40px;
        "
        >去结算</view
      >
    </view>
    <u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
      <view style="padding-bottom: 60px">
        <view
          v-for="(item, index) in CarList"
          :key="index"
          style="
            padding: 5px 15px;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #f5f5f5;
          "
        >
          <image
            style="width: 60px; height: 60px; margin-left: 10px"
            :src="BaseImgURL + item.img"
          ></image>
          <view style="margin-left: 10px; flex: 1">
            <view style="display: flex; justify-content: space-between">
              <view>
                <view style="font-size: 15px">{{ item.name }}</view>
                <view style="font-size: 13px">{{ item.specs }}</view>
                <view style="font-size: 15px; color: #2a9598"
                  >¥{{ item.price }}</view
                >
              </view>
              <view
                style="
                  display: flex;
                  flex-direction: row;
                  height: 25px;
                  margin-top: 35px;
                "
              >
                <view
                  @click.stop="cardec(item)"
                  style="
                    border: 1px solid #666;
                    width: 16px;
                    text-align: center;
                    border-radius: 5px;
                    margin-right: 5px;
                  "
                  >-</view
                >
                <view>{{ item.buyNums }}</view>
                <view
                  @click.stop="caradd(item)"
                  style="
                    margin-left: 5px;
                    border: 1px solid #2a9595;
                    width: 16px;
                    border-radius: 5px;
                    color: white;
                    text-align: center;
                    background-color: #2a9595;
                  "
                  >+</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { updateGoodsCarNum, getShopDetail, GoodsCarList, ShopCategoryList, getGoodsList, addCart } from "@/api/mine.ts";

import { storage, BaseImgURL as baseImgURLValue } from "@/utils/storage";

import { computed, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const detail = ref({
        coverImg: "@/static/logo.png",
        shopName: "预付店铺",
        shopScore: [1, 2, 3, 4, 5],
      });

const show = ref(false);

const value = ref(1);

const providerCode = ref("");

const attentionFlag = ref(false);

const totalPrice = ref(0);

const list = ref([1, 2, 3]);

const navLeftItems = ref(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);

const products = ref([]);

const curIndex = ref(0);

const cartlist = ref({});

const shopid = ref("");

const amount = ref("");

const name = ref("");

const pcode = ref("");

const CategoryList = ref([]);

const carinfo = ref({});

const CarList = ref([]);

const catid = ref("");

const shopHomeInfoBean = ref({});

const cash = ref(0);

const BaseImgURL = computed(() => {
  return baseImgURLValue;
});

const getImg = (img) => {
  return storage.baseImgURL + img;
};

const getShopCategoryList = () => {
  ShopCategoryList({
      userId: storage.getUserId(),
      shopId: shopid.value
    }).then(res => {
      navLeftItems.value = res.result;
      console.log(navLeftItems.value);
      catid.value = navLeftItems.value[0].catId;
      geGoodsList("1", navLeftItems.value[0].catId);
    });
};

const getGoodsCarList = () => {
  let param = {
      userId: storage.getUserId(),
      manageId: storage.getManid(),
      providerCode: pcode.value
    };
    console.log(param);
    GoodsCarList(param).then(res => {
		console.log(res)
		if(res.result.dataList){
			carinfo.value = res.result;
			CarList.value = res.result.dataList[0].groupValues;
			getscoreAndprice();
			console.log(CarList.value);
		}else{
			cash.value = 0;
		}
      
    });
};

const getscoreAndprice = () => {
  cash.value = 0;
  if(CarList){
	  CarList.value.forEach(childitem => {
	    cash.value += (childitem.price || 0) * childitem.buyNums;
	  });
  }
    
};

const getShopDetailinfo = () => {
  let param = {
      userId: storage.getUserId(),
      manageId: storage.getManid(),
      shortInfo: "1",
      shopId: shopid.value,
      providerCode: pcode.value
    };
    console.log(param);
    GoodsCarList(param).then(res => {
      shopHomeInfoBean.value = res.result;
      console.log(CarList.value);
    });
};

const updatGoodsCarNum = (buynum, cartid) => {
  let param = {
      userId: storage.getUserId(),
      cartId: cartid,
      buyNums: buynum
    };
    console.log(param);
    updateGoodsCarNum(param).then(res => {
      console.log(res);
      getGoodsCarList();
      geGoodsList("1", catid.value);
    });
};

const adCart = (buynum, sku) => {
  let param = {
      userId: storage.getUserId(),
      sku: sku,
      nums: buynum + "",
      type: "0"
    };
    console.log(param);
    addCart(param).then(res => {
      console.log(res);
      getGoodsCarList();
      geGoodsList("1", catid.value);
    });
};

const geGoodsList = (sorttype, catid) => {
  getGoodsList({
      userId: storage.getUserId(),
      page: "1",
      shopId: shopid.value,
      catId: catid,
      sort: sorttype,
      size: "150"
    }).then(res => {
      console.log(res);
      products.value = res.result;
    });
};

const goBack = () => {
  uni.navigateBack();
};

const currentTabs = (index) => {
  curIndex.value = index;
    catid.value = navLeftItems.value[index].catId;
    geGoodsList("1", navLeftItems.value[index].catId);
};

const todetail = (item) => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/shopProductDetailPage?sku=" + item.sku
    });
};

const toShoppingCart = () => {
  uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/prePayShopCartPage?providerCode=" + pcode.value
    });
};

const submitOrder = () => {
  let orderCompleteParamList = [];
    carinfo.value.dataList.forEach(item => {
      let orderCompleteParam = {};
      let products = [];
      let totalMoney = 0;
      let allNums = 0;
      item.groupValues.forEach(childitem => {
        let product = {};
        product.cartId = childitem.cartId;
        product.giftGoodsFlag = childitem.giftGoodsFlag;
        product.sku = childitem.sku;
        product.name = childitem.name;
        product.price = childitem.price;
        product.img = childitem.img;
        product.nums = childitem.buyNums;
        product.specs = childitem.specs;
        product.sums = childitem.buyNums * childitem.price;
        allNums = allNums + childitem.buyNums;
        if (childitem.skuActiveId) {
          totalmoney = totalmoney + product.sums;
        }
        products.push(product);
      });
      if (products.length > 0) {
        orderCompleteParam.productArray = products;
        orderCompleteParam.shopCode = item.groupName.shopCode;
        orderCompleteParam.shopName = item.groupName.shopName;
        orderCompleteParam.nums = allNums;
      }
      if (orderCompleteParam.productArray.length > 0) {
        orderCompleteParamList.push(orderCompleteParam);
      }
    });
    uni.setStorageSync("prepaycarlist", orderCompleteParamList);
    uni.navigateTo({
      url: "/pages/mine/PrepaidWalletPage/ConfirmOrderPage"
    });
};

const btn_submit_order = () => {
  // 提交订单逻辑
    uni.showToast({
      title: "提交订单成功",
      icon: "success"
    });
};

const showPop = () => {
  show.value = !show.value;
};

const open = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

const caradd = (item) => {
  console.log(item);
    item.buyNums++;
    if (item.buyNums == 1) {
      adCart(item.buyNums, item.sku);
    } else {
      updatGoodsCarNum(item.buyNums, item.cartId);
    }
};

const add = (item) => {
  console.log(item);
    item.nums++;
    if (item.nums == 1) {
      adCart(item.nums, item.sku);
    } else {
      updatGoodsCarNum(item.nums, item.cartId);
    }
};

const cardec = (item) => {
  if (item.buyNums === 0) {
      // uni.showToast({ title: "请先签名", icon: "none" });

      return;
    } else {
      console.log(item);
      item.buyNums--;
      updatGoodsCarNum(item.buyNums, item.cartId);
    }
};

const dec = (item) => {
  if (item.nums === 0) {
      // uni.showToast({ title: "请先签名", icon: "none" });

      return;
    } else {
      console.log(item);
      item.nums--;
      updatGoodsCarNum(item.nums, item.cartId);
    }
};

onMounted(() => {
  getShopCategoryList();
    getGoodsCarList();
    getShopDetailinfo();
});

onLoad((option) => {
  if (option.shopid != null) {
      console.log(option);
      // {shopid: "763de0bf0f7d41a0a57fa071c5665713", amount: "766.1", name: "五一劳动节庆有限公司2", pcode: "a09ce1a089784782947303987cbdc871"}

      shopid.value = option.shopid;
      amount.value = option.amount;
      name.value = option.name;
      pcode.value = option.pcode;
    }
});
</script>

<style>
.all {
  display: flex;
  flex-direction: column;
}
.search {
  background-color: #2a9598;
  display: flex;
  flex-direction: row;
  padding-top: 25px;
}

.car {
  width: 40rpx;
  height: 40rpx;
  margin-top: 18rpx;
  margin-right: 15rpx;
}
.search .weui-input {
  width: 90%;
  background-color: white;
}
.zhanshi-item {
  background-color: #2a9598;
  display: flex;
  flex-direction: row;
  padding: 15rpx;
  width: 100%;
}
.caregory {
  display: flex;
  flex-direction: row;
  height: 80%;
  position: absolute;
  top: 110px;
  bottom: 0;
  left: 0;
  width: 100%;
}
.nav_left {
  background: #f8f8f8;
  width: 24%;
  height: 100%;
  white-space: nowrap;
}
.nav_right {
  background: #fff;
  width: 76%;
  height: 100%;
}

.nav_left_items {
  font-size: 28rpx;
  color: #333;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
}
.nav_left_item-active {
  background-color: #fff;
  color: #e93b3d;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 关键：两列 */
  gap: 20rpx; /* 项目间距 */
  padding: 10rpx;
}

.grid-item {
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.cont_bot {
  position: fixed;
  display: flex;
  flex-direction: row;
  bottom: 10px;
  width: 90%;
  margin-left: 5%;
  border-radius: 40px;
  height: 50px;
  line-height: 50px;
  background: #2a9598;
}
</style>
