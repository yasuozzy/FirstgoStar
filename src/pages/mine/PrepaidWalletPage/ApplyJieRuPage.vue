<template>
  <view>
    <u-navbar
      title="申请记录"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
<view  @click="goBack">
        <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
      </view>
</template>
    </u-navbar>
    <u-textarea v-model="value1" placeholder="请输入申诉内容"></u-textarea>

    <uni-section title="图片" type="line">
      <view class="example-body">
        <uni-file-picker
          limit="9"
          v-model="imgvalue"
          fileMediatype="image"
          title="最多选择9张图片"
          @select="selectpic"
          @progress="progresspic"
          @success="successpic"
          @fail="failpic"
        ></uni-file-picker>
      </view>
    </uni-section>

    <view
      style="
        width: 90%;
        margin-left: 5%;
        background-color: #2a9598;
        display: flex;
        justify-content: center;
        color: white;
        padding: 10px 0px;
        border-radius: 5px;
        margin-top: 30px;
        margin-bottom: 30px;
      "
      @click="commit()"
      >提交</view
    >
  </view>
</template>

<script setup lang="ts">
import { PreApplyPlatFollow } from "@/api/mine.ts";

import { storage, BaseImgURL, uploadMultipleFiles } from "@/utils/storage";

import { ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#007AFF");

const apply_id = ref("");

const apply_no = ref("");

const order_no = ref("");

const order_id = ref("");

const value1 = ref("");

const imgvalue = ref([]);

const commit = () => {
  if (value1.value.length > 1) {
      let data = {
        userId: storage.getUserId(),
        content: value1.value,
        applyId: apply_id.value,
        applyNo: apply_no.value,
        orderNo: order_no.value,
        orderId: order_id.value,
        imgstr: Array.isArray(imgvalue.value) && imgvalue.value.length > 0 ? imgvalue.value.join(",") : ""
      };
      console.log(data);
      PreApplyPlatFollow(data).then(res => {
        console.log(res);
        uni.navigateBack();
      });
    }
};

const selectpic = (e) => {
  console.log("选择文件：", e);
    // console.log(uploadimg);
    let tempFilePaths = e.tempFilePaths;
    uploadMultipleFiles("", tempFilePaths, storage.getToken()).then(results => {
      console.log("所有文件上传成功:", results);
      let netimgs = [];
      results.forEach(item => {
        netimgs.push(item.data);
      });
      imgvalue.value = netimgs;
      console.log(imgvalue.value);
    }).catch(error => {
      console.error("文件上传失败:", error);
    });
    // this.commitPic(this.picfile);
};

const progresspic = (e) => {
  console.log("选择文件：", e);
};

const successpic = (e) => {
  console.log("选择文件：", e);
};

const failpic = (e) => {
  console.log("选择文件：", e);
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((e) => {
  apply_id.value = e.applyId;
    apply_no.value = e.applyNo;
    order_no.value = e.orderNo;
    order_id.value = e.orderId;
});
</script>

<style></style>
