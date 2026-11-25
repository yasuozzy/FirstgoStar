<template>
	<view>
		<u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
		</u-navbar>
		<view style="display: flex;flex-direction: row;padding-left: 15px;padding-right: 15px;">
			<image :src="loaddata.userpicture" style="width: 40px; height: 40px;margin-top: 15px;" mode="aspectFill">
			</image>
			<view style="
          padding: 15px 10px;
          color: #333;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
        ">
				<view> {{ loaddata.username }} </view>
				<view> {{ loaddata.addTime }} </view>
			</view>
		</view>
		<view style="
        padding: 15px 15px;
        color: #333;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
      ">
			<view style="color: red;"> {{ loaddata.recyclePrice }} </view>
			<view style="color: black;"> {{ loaddata.recycleTitle }} </view>
			<view> {{ loaddata.recycleContent }} </view>
		</view>
		<view style="padding: 10px 15px;" v-for="(item, index) in loaddata.imgs"
			:key="'img-' + (item.id || item || index)">
			<image :src="item" style="width: 100%" mode="aspectFill"></image>
		</view>
		<u-gap height="5" bgColor="#f5f5f5"></u-gap>
		<view style="margin: 8px 15px"> 留言 </view>
		<u-gap height="1" bgColor="#f5f5f5"></u-gap>
		<view style="margin-bottom: 30px;">
			<view style="padding: 15px;" v-for="(item, index) in commantlist" :key="'comment-' + (item.id || index)">
				<view style="display: flex; flex-direction: row">
					<image :src="item.sendUserPicture" style="width: 20px; height: 20px; margin-right: 10px"
						mode="aspectFill"></image>
					<view style="flex: 1"> {{ item.sendUserName }} </view>
					<view> {{ item.replyTime }} </view>
				</view>
				<view style="display: flex; flex-direction: row">
					<view style="flex: 1; margin-left: 35px">
						{{ item.replyContent }}
					</view>
					<!-- <view>回复</view> -->
				</view>
			</view>
		</view>

		<view class="bottom-bar">
			<view class="bottom-item" @click="toggleCollect">
				<u-icon :name="loaddata.collect ? 'star-fill' : 'star'" size="20"
					:color="loaddata.collect ? '#FF6347' : '#999'"></u-icon>
				<text v-if="loaddata.collect" style="margin-top: 4px; font-size: 12px">取消收藏</text>
				<text v-else style="margin-top: 4px; font-size: 12px">收藏</text>
			</view>
			<view class="bottom-item" @click="liuyan">
				<u-icon name="chat" size="20" color="#999"></u-icon>
				<text style="margin-top: 4px; font-size: 12px">留言</text>
			</view>

			<view class="bottom-btn">
				<text style="color: #fff; font-size: 14px" @click="buy">立即购买</text>
			</view>
		</view>
		<u-popup :show="show" @close="close" @open="open" mode="center">
			<view>
				<textarea style="border: 1px solid #333;border-radius: 5px;margin: 5px;" placeholder="请输入内容"
					v-model="textarea" class="textarea"></textarea>
				<view style="display: flex; flex-direction: row;width: 100%;justify-content: space-around;">
					<text class="text" @click="close">取消</text>
					<text class="text" @click="send">发送</text>
				</view>

			</view>
		</u-popup>
		<u-modal :show="showBuyConfirm" title="温馨提示" content="该商品为不支持退换货，请确认是否继续下单" :show-cancel-button="true"
			cancel-text="再想想" confirm-text="确认下单" @confirm="confirmBuy" @cancel="showBuyConfirm = false"></u-modal>
	</view>
</template>
<script setup lang="ts">
import { RecyclerProductCollect, cancelRecycleCollec, RecycleAProductCommentList, RecycleAProductDetail, addRecycleReply } from "@/api/service";

import { storage } from "@/utils/storage";

import { computed, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#0080ff");

const id = ref("");

const loaddata = ref({});

const commantlist = ref([]);

const textarea = ref("");

const show = ref(false);

const showBuyConfirm = ref(false);

const sheng = ref<any>();

const shi = ref<any>();

const qu = ref<any>();

const zhen = ref<any>();

const addressText = computed(() => {
  // 如果没有选择任何地区，显示"选择"
    if (!sheng.value) {
      return "选择";
    }

    // 否则显示已选择的地区拼接
    return `${sheng.value}${shi.value}${qu.value}${zhen.value}`;
});

const liuyan = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
};

const open = () => {
  show.value = true;
};

const send = () => {
  show.value = false;
    let data1 = {
      sendUserId: storage.getUserId(),
      recycleId: id.value,
      replyContent: textarea.value
    };
    addRecycleReply(data1).then(res => {
      console.log(res);
      show.value = false;
      textarea.value = "";
      getdetail();
    });
};

const goBack = () => {
  uni.navigateBack();
};

const getdetail = () => {
  let data1 = {
      RecycleId: id.value,
      userId: storage.getUserId()
    };
    RecycleAProductDetail(data1).then(res => {
      console.log(res);
      loaddata.value = res.result.RecycleEntity;
    });
    RecycleAProductCommentList(data1).then(res => {
      console.log(res);
      commantlist.value = res.result;
    });
};

const buy = () => {
  if (!id.value) {
      uni.showToast({
        title: '商品信息异常',
        icon: 'none'
      });
      return;
    }
    showBuyConfirm.value = true;
};

const confirmBuy = () => {
  showBuyConfirm.value = false;
    console.log("开始下单");
    uni.navigateTo({
      url: "/pages/service/unused/recyclerconfirmorder?id=" + id.value
    });
};

const toggleCollect = () => {
  if (!loaddata.value.id) return;
    const collectAction = loaddata.value.collect ? cancelRecycleCollec : RecyclerProductCollect;
    const data = {
      recycleId: loaddata.value.id,
      userId: storage.getUserId()
    };
    collectAction(data).then(res => {
      if (res.resultCode === 200) {
        loaddata.value.collect = !loaddata.value.collect;
        uni.showToast({
          title: loaddata.value.collect ? "收藏成功" : "取消收藏",
          icon: "none"
        });
        getdetail();
      } else {
        uni.showToast({
          title: res.message || "操作失败",
          icon: "none"
        });
      }
    }).catch(err => {
      console.error("收藏操作失败:", err);
      uni.showToast({
        title: "操作失败",
        icon: "none"
      });
    });
};

onLoad((e) => {
  id.value = e.id;
    getdetail(id.value);
});
</script>

<style>
.bottom-bar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100rpx;
	background-color: #fff;
	display: flex;
	align-items: center;
	border-top: 1px solid #eee;
	padding: 0 20rpx;
	box-sizing: border-box;
	z-index: 999;
}

.bottom-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	cursor: pointer;
}

.bottom-btn {
	flex: 2;
	height: 70rpx;
	background-color: #0080ff;
	border-radius: 35rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 20rpx;
	cursor: pointer;
}
</style>
