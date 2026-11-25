<template>
 <u-navbar title="评价" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>
	<up-textarea v-model="value1" placeholder="请输入内容" ></up-textarea>
<view style="display: flex;flex-direction: row;">  
满意程度
<up-rate activeIcon="heart-fill" inactiveIcon="heart"></up-rate>
</view>
<view style="display: flex;flex-direction: row;">  
技术娴熟
<up-rate activeIcon="heart-fill" inactiveIcon="heart"></up-rate>
</view>
  <uni-section style="margin-left: 15px" title="图片" type="line">
	<view class="example-body">
	  <uni-file-picker limit="9" v-model="imgvalue" fileMediatype="image" title="最多选择9张图片" @select="selectpic"
		@progress="progresspic" @success="successpic" @fail="failpic"></uni-file-picker>
	</view>
  </uni-section>
  <view @click="addAddress" style="
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 25px;
        background-color: #2a9598;
        color: white;
        text-align: center;
        width: 80%;
        margin-top: 50px;
        border-radius: 5px;
        margin-left: 10%;
      ">
        发表评价
      </view>
</template>
<script setup lang="ts">
	
import { storage, uploadMultipleFiles } from "@/utils/storage";
const value1 = ref('');
const imgvalue = ref([]);

const selectpic = (e) => {
    let tempFilePaths = e.tempFilePaths;
    uploadMultipleFiles("", tempFilePaths, storage.getToken()).then(results => {
      let netimgs = [];
      results.forEach(item => {
        netimgs.push(item.data);
      });
      imgvalue.value = netimgs;
    }).catch(error => {
      console.error("文件上传失败:", error);
    });
    // this.commitPic(this.picfile);
};

const progresspic = (e) => {
};

const successpic = (e) => {
};

const failpic = (e) => {
};

</script>

<style>

</style>
