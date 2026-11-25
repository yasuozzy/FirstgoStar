<template>
	<view>
		<u-navbar title="申诉" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
		  titleStyle="color: #fff;" leftIconColor="#fff">
		  <template #left>
		    <view @click="goBack">
		      <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
		    </view>
		  </template>
		</u-navbar>
		<up-textarea v-model="value1" placeholder="请输入内容" ></up-textarea>

		<uni-section style="margin-left: 15px" title="图片" type="line">
			<view class="example-body">
			  <uni-file-picker limit="9" v-model="imgvalue" fileMediatype="image" title="最多选择9张图片" @select="selectpic"
				@progress="progresspic" @success="successpic" @fail="failpic"></uni-file-picker>
			</view>
		</uni-section>
	</view>
</template>

<script setup>
	
	import { storage, uploadMultipleFiles } from "@/utils/storage";
	import { ref } from 'vue';  
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
