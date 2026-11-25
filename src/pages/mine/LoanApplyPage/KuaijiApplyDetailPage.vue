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
      <u-line color="#f5f5f5"></u-line>
      <view
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <view class="infocell">审批内容:{{ detail.content }}</view>
        <view style="color: #2a9598; margin-right: 15px; font-size: 14px">{{
          detail.statusName
        }}</view>
      </view>
      <view class="infocell">审批事由:{{ detail.details }}</view>
      <view class="infocell">审批金额:{{ detail.total }}</view>
      <view class="infocell">审批科目:{{ subject }}</view>
      <view class="infocell"
        >审批类型:<text v-if="detail.paymentApprovalType == 1">收款</text
        ><text v-else>拨款</text></view
      >
      <view
        @click="toApproveCreat"
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        <view class="infocell">款项明细</view>
        <text>></text>
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
          <view style="font-size: 13px; color: #333"
            >{{ detail.applyUserName }}发起申请</view
          >
          <view style="display: flex; align-items: center; margin-top: 10px">
            <view style="font-size: 13px; color: #333">签名：</view>
            <image
              style="width: 100px; height: 60px"
              :src="detail.signaturepic"
            >
            </image>
          </view>
        </view>
        <view
          style="font-size: 13px; color: #333; float: right; margin-right: 15px"
          >{{ detail.submissionTime }}</view
        >
      </view>
      <view v-for="(item, index) in detail.leaderList" :key="index">
        <view style="display: flex; flex-direction: row; margin: 8px 0">
          <view>
            <image
              src="@/static/mine/wenjian.png"
              style="width: 30px; height: 30px; margin: 5px 15px"
            ></image>
            <!-- <u-line
              color="#000"
              direction="col"
              style="margin-left: 20px; height: 80px"
            ></u-line> -->
          </view>

          <view style="margin-right: auto">
            <view style="color: black; font-size: 13px"
              >{{ item.username }}<text v-if="item.status == 0">（待审核）</text
              ><text v-if="item.status == 1">（同意）</text
              ><text v-if="item.status == 2">（拒绝）</text></view
            >
            <!-- <view style="font-size: 13px; color: #333">{{
              detail.applyUserName
            }}</view> -->
            <view style="display: flex; align-items: center; margin-top: 10px">
              <view style="font-size: 13px; color: #333">签名：</view>
              <image
                style="width: 100px; height: 60px"
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

      <!-- <view
        hidden
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
      </view> -->
      <view style="height: 20px"></view>
    </view>
    <!-- <view>
      <view class="infocell">审批内容</view>
      <view class="infocell">姓名/公司名称:{{ info }}</view>
      <view class="infocell">注册手机号:{{ info }}</view>
      <view class="infocell">银行卡号:{{ info }}</view>
      <view class="infocell">开户行:{{ info }}</view>
      <view style="height: 30px"></view>
    </view> -->
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { KuaijiShenpiHistoryDetail } from "@/api/mine";
	

    const id = ref('');
    const info = ref("2014-04-25");
    const bgColor = ref("#0080ff");
    const images = ref([1, 2, 3, 4, 5]);
    const detail = ref({});
    const subject = ref('');
    const applytype = ref('');
   
	onLoad((e:any) => {
		id.value = decodeURIComponent(e.id);
		withdralist(id, "");
	});
 
    const toApproveCreat = () => {
      uni.navigateTo({
        url:
          `/pages/mine/LoanApplyPage/MingXiPreviewPage?id=${encodeURIComponent(id.value)}`
      });
    };
    const withdralist = async(oedertype:any, searindex:any) => {
      
	  const res = await KuaijiShenpiHistoryDetail({
        userId: storage.getPlatId(),
        id: id,
      });
        detail.value = res.result;
        detail.value.subjectList.forEach((element) => {
          subject.value =
            subject.value + element.subject + ":" + element.amount + ";";
        

        console.log(res);
      });
    };
    const goBack= () => {
            
        uni.navigateBack()
    };
</script>

<style>
.infocell {
  margin: 5px 15px;
  font-size: 14px;
  color: #666;
}

.grid-container {
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
}

.grid-item {
  width: 25%;
  margin: 5px;
  aspect-ratio: 1/1;
}

.grid-item image {
  width: 100%;
  height: 100%;
}
</style>
