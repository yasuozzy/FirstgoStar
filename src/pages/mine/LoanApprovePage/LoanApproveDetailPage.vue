<template>
  <view>
    <u-navbar
      title="详情"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
		<view class="u-nav-slot" slot="left">
		  <view class="flex">
			  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		  </view>
		</view>
	  </template>
    </u-navbar>
    <view>
      <view style="display: flex; flex-direction: row; margin: 8px 0">
        <image
          src="@/static/mine/wenjian.png"
          style="width: 40px; height: 40px; margin: 5px 15px"
        ></image>
        <view>
          <view style="color: black; font-weight: bold">{{
            detail.applyUserName
          }}</view>
          <view style="font-size: 14px; color: #2a9598">{{
            detail.statusName
          }}</view>
        </view>
      </view>
      <u-line color="#f5f5f5"></u-line>
      <view class="infocell">审批内容:{{ detail.content }}</view>
      <view class="infocell">审批详情:{{ detail.details }}</view>
      <view class="infocell">审批总额:{{ detail.total }}</view>
      <view class="infocell">审批科目:{{ project }}</view>
      <view class="infocell"
        >审批类型:<text v-if="detail.paymentApprovalType === '1'">收款</text
        ><text v-if="detail.paymentApprovalType === '2'">拨款</text></view
      >
      <view
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-right: 20px;
        "
      >
        <view class="infocell">款项明细:</view>
        >
      </view>
      <view class="infocell">图片</view>
      <view class="grid-container">
        <view
          v-for="(img, index) in detail.picImgs"
          :key="index"
          class="grid-item"
        >
          <image :src="img" mode="widthFix"></image>
        </view>
      </view>
      <view class="infocell">附件</view>
      <view v-for="(img, index) in detail.enclosureList" :key="index">
        <view
          style="
            background-color: #f5f5f5;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 3px 15px;
          "
        >
          <view class="infocell">{{ img.enclosureName }}</view>
          <view class="infocell">预览</view>
        </view>
      </view>
      <u-gap height="10" bg-color="#f5f5f5"></u-gap>
      <view v-for="(item, index) in detail.leaderList" :key="index">
        <view style="display: flex; flex-direction: row; margin: 8px 0">
          <view>
            <image
              src="@/static/mine/wenjian.png"
              style="width: 30px; height: 30px; margin: 5px 15px"
            ></image>
            <u-line
              color="#000"
              direction="col"
              style="margin-left: 20px; height: 80px"
            ></u-line>
          </view>

          <view style="margin-right: auto">
            <view style="color: black; font-size: 13px">{{
              item.username
            }}</view>

            <view style="font-size: 11px; color: #333">{{ item.reasons }}</view>
            <view style="display: flex; align-items: center; margin-top: 10px">
              <view style="font-size: 13px; color: #333">签名：</view>
              <image
                style="
                  width: 100px;
                  height: 60px;
                  background-color: antiquewhite;
                "
                :src="item.signaturepic"
              >
              </image>
            </view>
          </view>
          <view
            style="
              font-size: 13px;
              color: #333;
              float: right;
              margin-right: 15px;
            "
            >{{ item.approvalTime }}</view
          >
        </view>
      </view>

      <view
        style="
          display: flex;
          flex-direction: row;
          justify-content: center;
          margin: 20px 0;
        "
      >
        <view
          style="
            border: 1px solid #0080ff;
            border-radius: 5px;
            padding: 7px 50px;
            margin-right: 15px;
            color: #0080ff;
          "
        >
          拒绝
        </view>
        <view
          style="
            border: 1px solid #0080ff;
            border-radius: 5px;
            padding: 7px 50px;
            background-color: #0080ff;
            color: white;
          "
        >
          同意</view
        >
      </view>
      <view style="height: 20px"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {
	  KuaijiShenpiLeaderDetail,
	  KuaijiShenpiHistoryDetail,
	} from "@/api/mine";

      const id = ref('');
      const which = ref(2);
      const ordertype = ref(0);
      const info = ref("2014-04-25");
      const bgColor = ref("#0080ff");
      const images = ref([1, 2, 3, 4, 5]);
      const detail = ref({});
      const project = ref('');
    
	
	onLoad((e:any) => {
		id.value = e.id;
		which.value = e.which;
		ordertype.value = e.ordertype;
		init();
	});
 
	const goBack= () => {
           
	   uni.navigateBack()
	};
    const init = () => {
      if (which.value === 1) {
        getdata();
      } else {
        getleaderdata();
      }
    };
    const getdata = async() => {
      let data = {
        id: id.value,
        userId: storage.getPlatId(),
      };
    const res = await KuaijiShenpiHistoryDetail(data);
        console.log(res);
        detail.value = res.result;
        detail.value.subjectList.array.forEach((element) => {
          project.value =
            project.value + element.subject + ":" + element.amount + ";";
        });
      
    };
    const getleaderdata = async() => {
      let data = {
        id: id.value,
        userId: storage.getPlatId(),
      };
      const res = await KuaijiShenpiLeaderDetail(data);
        console.log(res);
        detail.value = res.result;
        detail.value.subjectList.array.forEach((element) => {
          project.value =
            project.value + element.subject + ":" + element.amount + ";";
        });
      
    };
  
</script>

<style>
.infocell {
  margin: 5px 15px;
  font-size: 14px;
  color: #666;
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
}

.grid-item {
  width: 30%;
  /* 3列布局 */
  aspect-ratio: 1/1;
  /* 保持正方形 */
}

.grid-item image {
  width: 100%;
  height: 100%;
}
</style>
