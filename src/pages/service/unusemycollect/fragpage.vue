<template>
  <view>
    <!-- <text>{{ message }}</text> -->
    <!-- <text>{{ postid }}</text> -->
    <!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
    <scroll-view
      :style="{ height: swiperHeight + 'px' }"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="50"
      refresher-background="white"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
    >
      <u-list @scrolltolower="scrolltolower">
        <u-list-item v-for="(item, index) in loaddata" :key="index">
          <view>
            <view style="display: flex; flex-direction: row">
              <image
                style="
                  width: 60px;
                  height: 60px;
                  background-color: bisque;
                  margin: 10px;
                "
                :src="item.imgs[0]"
              ></image>
              <view
                v-if="message === '回收'"
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  padding: 10px 0;
                "
                ><view style="color: #333">{{ item.recycleTitle }} </view
                ><view style="color: #333"> {{ item.recyclePrice }} </view>
              </view>
              <view
                v-else
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  padding: 10px 0;
                "
                ><view style="color: #333">{{ item.itemTitle }} </view
                ><view style="color: #333"> {{ item.username }} </view>
              </view>
            </view>
            <u-line style="margin: 5px 0"></u-line>
            <view
              style="
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin-bottom: 5px;
              "
            >
              <view
                style="
                  border-radius: 8px;
                  justify-content: flex-end;
                  color: #2a9598;
                  border: solid 1px #2a9598;
                  padding: 2px 15px;
                  text-align: right;
                  margin-right: 10px;
                  font-size: 12px;
                "
                @click.stop="deletecoll(item.id)"
                >删除</view
              >
            </view>
          </view>
        </u-list-item>
      </u-list>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import {
  exchangeCololecList,
  recycleCololecList,
  cancelExchangeCollect,
  cancelRecycleCollect,
} from "@/api/service";
import {
  storage
} from "@/utils/storage";
import { onActivated, onDeactivated, onMounted, ref } from "vue";

const props = defineProps<{
  message: string
  postid: string
}>();

const emit = defineEmits<{
  (e: "message", value: string): void
}>();

const loaddata = ref<any[]>([]);
const urls = ref<string[]>(["https://uviewui.com/album/1.jpg"]);
const swiperHeight = ref(500);
const isRefreshing = ref(false);
const triggered = ref(false);
let _freshing = false;

const getMetadata = () => {
  if (props.message === "回收") {
    const data = {
      userId: storage.getUserId(),
      page: 1,
      size: 50,
    };
    recycleCololecList(data).then((res) => {
      console.log(res);
      loaddata.value = res.result;
    });
  } else {
    const data = {
      userId: storage.getUserId(),
      page: 1,
      size: 50,
    };
    exchangeCololecList(data).then((res) => {
      console.log(res);
      loaddata.value = res.result;
    });
  }
};

const deletecoll = (id: any) => {
  uni.showModal({
    title: "提示",
    content: "确定要取消收藏吗？",
    success: (res) => {
      if (res.confirm) {
        if (props.message === "回收") {
          const data = {
            userId: storage.getUserId(),
            recycleIds: id,
          };
          cancelRecycleCollect(data).then((res) => {
            console.log(res);
            if (res.resultCode === 200) {
              uni.showToast({
                title: "取消收藏成功",
                icon: "success",
              });
              getMetadata();
            } else {
              uni.showToast({
                title: res.message || "取消收藏失败",
                icon: "none",
              });
            }
          }).catch((err) => {
            console.error("取消收藏失败:", err);
            uni.showToast({
              title: "操作失败",
              icon: "none",
            });
          });
        } else {
          const data = {
            userId: storage.getUserId(),
            exchangeIds: id,
          };
          cancelExchangeCollect(data).then((res) => {
            console.log(res);
            if (res.resultCode === 200) {
              uni.showToast({
                title: "取消收藏成功",
                icon: "success",
              });
              getMetadata();
            } else {
              uni.showToast({
                title: res.message || "取消收藏失败",
                icon: "none",
              });
            }
          }).catch((err) => {
            console.error("取消收藏失败:", err);
            uni.showToast({
              title: "操作失败",
              icon: "none",
            });
          });
        }
      }
    },
  });
};

// 这里存放方法
const sendDataToParent = () => {
  emit("message", "Hello from Child");
};

const scrolltolower = () => {
  console.log("scrolltolower");
  loadmore();
};

const loadmore = () => {
  for (let i = 0; i < 10; i++) {
    loaddata.value.push("https://uviewui.com/album/" + i + ".jpg" as any);
  }
};

const onPulling = (e: any) => {
  console.log("onpulling", e);
};

const onRefresh = () => {
  if (_freshing) return;
  _freshing = true;
  setTimeout(() => {
    getMetadata();
    triggered.value = false;
    _freshing = false;
  }, 1000);
};

const onRestore = () => {
  triggered.value = "restore" as any; // 需要重置
  console.log("onRestore");
};

const onAbort = () => {
  console.log("onAbort");
};

onMounted(() => {
  console.log("首页组件被创建了");
  loaddata.value = urls.value as any;
  uni.getSystemInfo({
    success: (res) => {
      swiperHeight.value = res.windowHeight - 104;
      console.log("height", swiperHeight.value);
    },
  });
  _freshing = false;
  setTimeout(() => {
    triggered.value = true;
  }, 100);
  // 这里可以发起网络请求初始化数据
  getMetadata();
});

// 可以使用 keep-alive 相关的生命周期
onActivated(() => {
  console.log("首页组件被激活了");
});

onDeactivated(() => {
  console.log("首页组件被停用了");
});
</script>
<style scoped></style>
