<template>
	<view style="background-color: #fafafa;">
		<!-- <text>{{ message }}</text> -->
		<!-- <text>{{ postid }}</text> -->
		<!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
		<scroll-view :style="{ height: swiperHeight + 'px' }" scroll-y="true" refresher-enabled="true"
			:refresher-triggered="triggered" :refresher-threshold="50" refresher-background="#fafafa"
			@refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore"
			@refresherabort="onAbort">
			<u-grid @scrolltolower="scrolltolower" :border="false" col="2">
				<u-grid-item v-for="(item, index) in loaddata" :key="index" style="padding: 3px;">
					<view style="
					    width: 100%;
					    display: flex;
					    flex-direction: column;
					    justify-content: center;
						background-color: white;
						border-radius: 15px;
					    padding: 3px;
					  " @click="todetail(item.id)">
						<image style="width: 100%; height: 140px" :src="
					      item.imgs && item.imgs.length > 0
					        ? item.imgs[0]
					        : '/static/default-image.png'
					    " mode="scaleToFill"></image>
						<view style="
					      overflow: hidden;
					      text-overflow: ellipsis;
					      display: -webkit-box;
					      -webkit-box-orient: vertical;
					      -webkit-line-clamp: 2;
						  margin-top: 5px;
						  margin-left: 5px;
					      line-height: 1em;
					      max-height: 3em;
					      font-size: 12px;
					    ">{{ item.recycleTitle }}
						</view>
						<view style="
					      display: flex;
					      flex-direction: row;
					      justify-content: space-between;
					      margin: 4px 6px;
						  font-size: 14px;
					    ">
							<view style="color: black; font-size: 13px">
								¥{{ item.recyclePrice }}
							</view>
							<u-icon name="phone" size="20"></u-icon>
						</view>
					</view>
				</u-grid-item>
			</u-grid>
		</scroll-view>
	</view>
</template>

<script setup lang="ts">
import { getRecyclerList } from "@/api/service";

import { storage } from "@/utils/auth";

import { onActivated, onDeactivated, onMounted, ref } from "vue";

defineOptions({ name: "FragPage" });

const props = defineProps(["message", "postid"]);

const emit = defineEmits(["message"]);

const loaddata = ref([]);

const urls = ref([

				]);

const swiperHeight = ref(500);

const isRefreshing = ref(false);

const triggered = ref(false);

const _freshing = ref<any>();

const init = () => {
  let data1 = {
      estId: props.message,
      page: 1,
      size: 50
    };
    getRecyclerList(data1).then(res => {
      console.log(res);
      loaddata.value = res.result;
    });
};

const sendDataToParent = () => {
  emit("message", "Hello from Child");
};

const scrolltolower = () => {
  console.log("scrolltolower");
    loadmore();
};

const loadmore = () => {
  // for (let i = 0; i < 10; i++) {
    // this.loaddata.push("https://uviewui.com/album/" + i + ".jpg");
    // }
};

const onPulling = (e) => {
  console.log("onpulling", e);
};

const onRefresh = () => {
  if (_freshing.value) return;
    _freshing.value = true;
    init();
    setTimeout(() => {
      init();
      triggered.value = false;
      _freshing.value = false;
    }, 1000);
};

const onRestore = () => {
  triggered.value = "restore"; // 需要重置
    console.log("onRestore");
};

const onAbort = () => {
  console.log("onAbort");
};

const todetail = (id) => {
  uni.navigateTo({
      url: '/pages/service/unused/recyclerproductdetailpage?id=' + id
    });
};

onMounted(() => {
  console.log("首页组件被创建了");
    loaddata.value = urls.value;
    uni.getSystemInfo({
      success: res => {
        swiperHeight.value = res.windowHeight - 104;
        console.log("height", swiperHeight.value);
      }
    });
    _freshing.value = false;
    setTimeout(() => {
      triggered.value = true;
    }, 100);
    init();
    // 这里可以发起网络请求初始化数据
});

onActivated(() => {
  console.log("首页组件被激活了");
});

onDeactivated(() => {
  console.log("首页组件被停用了");
});
</script>
<style scoped></style>
