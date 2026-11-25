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
      <view class="infocell">审批详情:{{ detail.details }}</view>
      <view class="infocell">审批总额:{{ detail.total }}元</view>
      <view class="infocell">审批科目:{{ getproject() }}</view>
      <view class="infocell">审批类型:{{ gettype() }}</view>
      <view class="infocell">图片</view>
      <view class="grid-container">
        <view v-for="imgurl in detail.picImgs" :key="imgurl" class="grid-item">
          <image :src="imgurl" mode="widthFix"></image>
        </view>
      </view>
      <view class="infocell">附件</view>
      <view v-for="item in detail.enclosureList" :key="item.enclosureName">
        <view
          style="
            background-color: #f5f5f5;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: 3px 15px;
          "
        >
          <view class="infocell">{{ item.enclosureName }}</view>
          <view class="infocell">预览</view>
        </view>
      </view>
      <u-gap height="10" bg-color="#f5f5f5"></u-gap>
      <view v-for="(item, index) in images" :key="index" hidden>
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
            <view style="color: black; font-size: 13px">张三的申请</view>
            <view style="font-size: 13px; color: #333">申请时间</view>
            <view style="display: flex; align-items: center; margin-top: 10px">
              <view style="font-size: 13px; color: #333">签名：</view>
              <image
                style="
                  width: 100px;
                  height: 60px;
                  background-color: antiquewhite;
                "
                src="@/static/logo.png"
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
            >申请时间</view
          >
        </view>
      </view>

      <!-- <view
        hidden="true"
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
    <view>
      <view class="infocell">审批内容</view>
      <view class="infocell">姓名/公司名称:{{ detail.userComName }}</view>
      <view class="infocell">注册手机号:{{ detail.registMobile }}</view>
      <view class="infocell">银行卡号:{{ detail.bankCard }}</view>
      <view class="infocell">开户行:{{ detail.bankName }}</view>
      <view style="height: 30px"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { LoanShenpiHistoryDetail } from "@/api/mine";

      const id = ref("");
      const info = ref("2014-04-25");
      const bgColor = ref("#0080ff");
      const images = ref([1, 2, 3, 4, 5]);
      const detail = ref({});
    
	  onLoad((e:any) => {
		id.value = decodeURIComponent(e.id);
		withdralist(id);
	  });
 
    const getproject = () => {
      let content = "";
      if (detail.value.subjectList && Array.isArray(detail.value.subjectList)) {
        detail.value.subjectList.forEach((item) => {
          content += item.subject + ":" + item.amount + "元;";
        });
      }
      return content;
    };
    const gettype = () => {
      if (detail.value.paymentApprovalType == 1) {
        return "收款";
      } else {
        return "拨款";
      }
    };

    const withdralist = async(oedertype:any) => {
      
	  const res = await LoanShenpiHistoryDetail({
        userId: storage.getUserId(),
        id: oedertype,
      });
        detail.value = res.result;
        console.log(res);
      
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
  display: flex;
  flex-wrap: wrap;
}

.grid-item {
  width: 25%;
  margin: 5px;
  /* 3列布局 */
  aspect-ratio: 1/1;
  /* 保持正方形 */
}

.grid-item image {
  width: 100%;
  height: 100%;
}
</style>
