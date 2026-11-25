<template>
  <view>
    <u-navbar
      title="选择商品"
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
    <!-- v-for="(item, index) in contactList" -->
    <!-- :key="index" -->
    <view style="padding: 5px 15px">
      <view
        style="
          display: flex;
          flex-direction: row;
          margin: 5px 0;
          padding-right: 15px;
        "
      >
        <image
          v-if="!shop.checked"
          @click="selectAll()"
          style="width: 20px; height: 20px"
          src="@/static/login/choose_unselect.png"
        ></image>
        <image
          v-if="shop.checked"
          @click="removeAll()"
          style="width: 20px; height: 20px"
          src="@/static/login/choose_select.png"
        ></image>
        <view style="margin-left: 10px; margin-right: 10px">{{
          shop.shopName || "默认店铺"
        }}</view>
        <u-icon name="arrow-right" color="#333" size="20"></u-icon>
      </view>
      <view>
        <view v-for="(childitem, childindex) in list" :key="childindex">
          <u-line color="#f5f5f5"></u-line>
          <view
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              padding-top: 5px;
              padding-bottom: 5px;
            "
          >
            <image
              @click="selectContact(childindex)"
              v-if="!childitem.checked"
              style="width: 20px; height: 20px"
              src="@/static/login/choose_unselect.png"
            ></image>
            <image
              @click="removeContact(childindex)"
              v-if="childitem.checked"
              style="width: 20px; height: 20px"
              src="@/static/login/choose_select.png"
            ></image>
            <image
              style="width: 85px; height: 85px; margin-left: 10px"
              @click="toDetail(childitem)"
              :src="childitem.img"
            ></image>
            <view style="margin-left: 10px" @click="toDetail(childitem)">
              <view style="display: flex; justify-content: space-between">
                <view>
                  <view style="font-size: 15px">{{ childitem.name }}</view>
                  <view style="font-size: 13px">{{ childitem.spec }}</view>
                  <view style="font-size: 15px; color: #2a9598"
                    >{{ childitem.score }}分<text
                      v-if="childitem.cash && childitem.cash > 0"
                      >+¥ {{ childitem.cash }}</text
                    ></view
                  >
                  <!-- @change="valChange" -->
                  <u-number-box
                    v-model="childitem.quantity"
                    @change="(val) => valChange(val, childindex)"
                    buttonSize="21"
                    :min="1"
                  ></u-number-box>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    </view>

    <view
      style="
        position: fixed;
        display: flex;
        flex-direction: row;
        width: 100%;
        bottom: 0;
        background-color: antiquewhite;
        height: 50px;
      "
    >
      <view style="margin-top: 15px; margin-left: 15px; flex: 1">
        <image
          v-if="!shop.checked"
          @click="selectAll"
          style="width: 16px; height: 16px"
          src="@/static/login/choose_unselect.png"
        ></image>
        <image
          v-if="shop.checked"
          @click="removeAll"
          style="width: 16px; height: 16px"
          src="@/static/login/choose_select.png"
        ></image>
        <text style="font-size: 16px">全选</text>
      </view>

      <view style="height: 50px; margin-top: 5px">
        <view style="font-size: 14px"
          >合计：{{ allscore }}分<text v-if="cash && cash > 0"
            >+ {{ cash }}元</text
          ></view
        >
        <view style="font-size: 11px">不含运费</view>
      </view>
      <view
        style="
          background-color: #2a9598;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 15px;
          color: white;
          height: 30px;
          line-height: 30px;
          margin: 10px 20px;
        "
        @click="commitOrder"
        >提交订单</view
      >
    </view>
  </view>
</template>

<script setup lang="ts">
	import { GongFenProduct } from "@/api/mine";
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys,BaseImgURL } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';
    

      const id = ref('');
      const usepoint = ref('');
      const bgColor =ref("#2A9595");
      const value = ref(1);
      const list = ref([]);
      const shop = ref({});
      const allscore = ref(0);
      const cash = ref(0);
   
	  onLoad((o:any) => {
		id.value = decodeURIComponent(o.id);
		usepoint.value = decodeURIComponent(o.usepoint);
		init();
	  });

      const commitOrder = async() => {
		  const selectedItems = list.value.filter((item) => item.checked);
		  if (selectedItems.length === 0) {
			uni.showToast({
			  title: "请选择商品",
			  icon: "none",
			});
			return;
		  }
		  try {
			uni.setStorageSync("selectedPointProducts", selectedItems);
			uni.navigateTo({
			  url:
				"/pages/mine/myIntegral/pointConfirmOrderPage?" +
				"&usepoint=" +
				usepoint.value +
				"&shopCode=" +
				shop.value.shopCode +
				"&shopname=" +
				shop.value.shopName+"&manid="+shop.value.manId,
			});
		  } catch (e) {
			console.error("保存选中商品失败:", e);
			uni.showToast({
			  title: "操作失败",
			  icon: "none",
			});
		  }
    };
    const toDetail = (item:any) => {
      uni.navigateTo({
        url:`/pages/mine/myIntegral/pointProductDetailPage?id=${encodeURIComponent(item.sku)}`
      });
    };
    const init = async() => {
      let data = {
        id: id.value,
      };
      const res = await GongFenProduct(data);
        
		list.value = res.result.dataList[0].groupValues;
		 // 直接处理并赋值
		list.value = res.result.dataList[0].groupValues.map(item => ({
		      ...item,
		      img: item.img ? `${BaseImgURL}/${item.img.replace(/^\//, '')}` : '/default.jpg'
		}))
        shop.value = res.result.dataList[0].groupName;
        shop.value.checked = true;
        list.value.forEach((item) => {
          this.$set(item, "quantity", 1);
          this.$set(item, "checked", true);
        });
        getscoreAndprice();
        console.log(res);
      
    };
    const goBack = () => {
      uni.navigateBack();
    };
    const valChange = (e, index) => {
      list.value[index].num = e.value;
      this.$set(list.value[index], "quantity", e.value);
      console.log("当前值为: " + e.value);
    };
    const selectAll = () => {
     shop.value.checked = true;
     list.value.forEach((childitem) => {
        childitem.checked = true;
      });
      getscoreAndprice();
    };
    const removeAll = () => {
      shop.value.checked = false;
      list.value.forEach((childitem) => {
        childitem.checked = false;
      });
     getscoreAndprice();
    };
    const selectContact = (childindex) => {
      list.value[childindex].checked = true;
      getscoreAndprice();
      let num = 0;
      list.value.forEach((childitem) => {
        if (childitem.checked) {
          num++;
        }
      });

      if (num === list.value.length) {
        shop.value.checked = true;
      } else {
        shop.value.checked = false;
      }
    };
    const removeContact = (childindex) => {
      list.value[childindex].checked = false;
      getscoreAndprice();
      let num = 0;
      list.value.forEach((childitem) => {
        if (childitem.checked) {
          num++;
        }
      });

      if (num === list.value.length) {
        shop.value.checked = true;
      } else {
        shop.value.checked = false;
      }
    };
    const getscoreAndprice = () => {
      allscore.value = 0;
      cash.value = 0;
      const selectedItems = list.value.filter((item) => item.checked);
      selectedItems.forEach((childitem) => {
        allscore.value += (childitem.score || 0) * childitem.quantity;
        cash.value += (childitem.cash || 0) * childitem.quantity;
      });
    };
 
</script>

<style></style>
