<template>
  <view class="container">
    <!-- ============ 区域一 ============ -->
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
      <view slot="left" @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
    </u-navbar>
    <u-tabs
      :list="list"
      :current="current"
      @change="change"
      :scrollable="false"
    ></u-tabs>
    <view class="uni-padding-wrap uni-common-mt">
      <uni-segmented-control
        :current="current"
        :values="items"
        :style-type="styleType"
        @clickItem="onClickItem"
      />
    </view>
    <view class="content">
      <view v-if="current === 0">
        <!-- 列表1的内容 -->
        <view
          v-for="(item, index) in list1"
          :key="index"
          @click="todetail(item)"
        >
          <view style="display: flex; flex-direction: row; margin-top: 10px">
            <image
              src="@/static/icon_logo.png"
              style="width: 40px; height: 40px; margin: 5px 15px"
            ></image>
            <view>
              <view style="color: black; font-weight: bold">张三的申请</view>
              <view style="font-size: 14px; color: #333">申请时间</view>
              <view style="font-size: 14px; color: #333">申请内容</view>
            </view>
          </view>
          <u-line color="#f5f5f5" style="margin-top: 5px"></u-line>
          <view
            style="
              display: flex;
              flex-direction: row;
              justify-content: right;
              margin: 5px 15px;
            "
          >
            <view
              style="
                border: 1px solid #0080ff;
                border-radius: 5px;
                padding: 0 20px;
                margin-right: 15px;
              "
              >拒绝
            </view>
            <view
              style="
                border: 1px solid #0080ff;
                border-radius: 5px;
                padding: 0 20px;
                background-color: #0080ff;
                color: white;
              "
            >
              同意</view
            >
          </view>

          <u-gap height="10" bgColor="#f5f5f5"></u-gap>
        </view>
      </view>
      <view v-if="current === 1">
        <!-- 列表2的内容 -->
        <view
          v-for="(item, index) in list2"
          :key="index"
          @click="todetail(item)"
        >
          <view style="display: flex; flex-direction: row; margin-top: 10px">
            <image
              src="@/static/icon_logo.png"
              style="width: 40px; height: 40px; margin: 5px 15px"
            ></image>
            <view>
              <view style="color: black; font-weight: bold">张三的申请</view>
              <view style="font-size: 14px; color: #333">申请时间</view>
              <view style="font-size: 14px; color: #333">申请内容</view>
            </view>
          </view>
          <u-line color="#f5f5f5" style="margin-top: 5px"></u-line>
          <view
            style="
              display: flex;
              flex-direction: row;
              justify-content: right;
              margin: 5px 15px;
            "
          >
            <view
              style="
                border: 1px solid #0080ff;
                border-radius: 5px;
                padding: 0 20px;
                margin-right: 15px;
              "
              >拒绝
            </view>
            <view
              style="
                border: 1px solid #0080ff;
                border-radius: 5px;
                padding: 0 20px;
                background-color: #0080ff;
                color: white;
              "
            >
              同意</view
            >
          </view>

          <u-gap height="10" bgColor="#f5f5f5"></u-gap>
        </view>
      </view>
      <view v-if="current === 2">
        <!-- 列表2的内容 -->
        <view
          v-for="(item, index) in list3"
          :key="index"
          @click="todetail(item)"
        >
          <view style="display: flex; flex-direction: row; margin-top: 10px">
            <image
              src="@/static/icon_logo.png"
              style="width: 40px; height: 40px; margin: 5px 15px"
            ></image>
            <view>
              <view style="color: black; font-weight: bold">张三的申请</view>
              <view style="font-size: 14px; color: #333">申请时间</view>
              <view style="font-size: 14px; color: #333">申请内容</view>
            </view>
          </view>
          <u-line color="#f5f5f5" style="margin-top: 5px"></u-line>
          <view
            style="
              display: flex;
              flex-direction: row;
              justify-content: right;
              margin: 5px 15px;
            "
          >
            <view
              style="
                border: 1px solid #0080ff;
                border-radius: 5px;
                padding: 0 20px;
                margin-right: 15px;
              "
              >拒绝
            </view>
            <view
              style="
                border: 1px solid #0080ff;
                border-radius: 5px;
                padding: 0 20px;
                background-color: #0080ff;
                color: white;
              "
            >
              同意</view
            >
          </view>

          <u-gap height="10" bgColor="#f5f5f5"></u-gap>
        </view>
      </view>
    </view>

    <!-- ============ 区域二 ============ -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      // 背景颜色
      bgColor: "#0080ff",
      show: false,
      items: ["待我审批0", "我已审批0", "抄送我的0"],
      styleType: "text",
      current: 0,

      list: [
        {
          name: "消息",
          // 基础徽标配置
          badge: {
            value: this.current,
            bgColor: "#fff", // 背景色
            color: "#333", // 文字颜色
            size: 19, // 字号（px）
            radius: 9, // 圆角（px）
            offset: [15, -5], // 位置偏移 [x, y]
          },
        },
        {
          name: "通知",
          badge: {
            value: this.current, // 0值自动隐藏
            bgColor: "#07c160",
          },
        },
        {
          name: "待办",
          badge: {
            value: this.current, // 0值自动隐藏
            max: 99, // 最大值（超过显示99+）
            bgColor: "#2979ff",
          },
        },
      ],

      list1: ["待审批项1", "待审批项2", "待审批项3"],
      list2: ["已审批项1", "已审批项2"],
      list3: ["抄送项1"],
    };
  },
  created() {
    this.init();
  },
  methods: {
    /* ======================= 页面初始化 ======================== */
    init() {},
    /* ======================= 页面操作项 ======================== */
    //返回
    goBack() {
      uni.navigateBack();
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    changenum() {
      this.list1[0] = "已审批项1";
      this.list[0].badge.value = 16;
      setTimeout(() => {
        this.list[0].badge.value = 18; // 动态更新第一个标签的徽标数
      }, 2000);
    },
    todetail(item) {
      uni.navigateTo({
        url: "/pages/mine/LoanApprovePage/LoanApproveDetailPage",
      });
    },

    /* ======================= 辅助方法项 ======================== */
  },
};
</script>
<style lang="scss" scoped></style>
