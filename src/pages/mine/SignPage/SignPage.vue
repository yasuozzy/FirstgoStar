<template>
  <view>
    <u-navbar
      title="签字"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
      	<view slot="left" >
      		<view class="flex">
      			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
      		</view>
      	</view>
      </template>
    </u-navbar>

    <view>
      <u-textarea v-model="value1" placeholder="请输入内容"></u-textarea>
    </view>

    <signature-component @save="handleSave"></signature-component>
  </view>
</template>

<script setup lang="ts">
	
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted,onUnmounted } from 'vue';
	import { getStorage, storage, storageKeys,BaseImgURL,uploadMultipleFiles } from '@/utils/storage';
	import SignatureComponent from "./SignatureComponent.vue";
	
	import eventBus from '@/utils/eventBus';
	// import modelCom from "@/component/modelCom.vue";
	
	const bgColor = ref("#2A9595");
	const value1 = ref('');
	const needreason = ref(false);
	const backdata = ref({});
		

	onLoad((e:any) => {
		needreason.value = e.needreason;
	});

 
    const goBack= () => {
            
        uni.navigateBack()
    };
    const handleSave = (tempFilePath:any) => {
		
      if (needreason.value) {
        if (value1.value) {
          selectpic(tempFilePath);
        } else {
          uni.showToast({
            title: "请填写理由",
            icon: "none",
          });
        }
      } else {
        selectpic(tempFilePath);
      }

      console.log("签名图片路径:", tempFilePath);
      // 可以将路径上传至服务器或进行其他处理
    };

    const selectpic = async(tempFilePath:any) => {
      // console.log("选择文件：", e);
      // // console.log(uploadimg);
      let tempFilePaths = [];
      tempFilePaths.push(tempFilePath);
      const results = await uploadMultipleFiles([], tempFilePaths, storage.getToken());
          console.log("所有文件上传成功:", results);
          let netimgs = [];
          results.forEach((item) => {
            netimgs.push(item.data);
          });
          if (needreason.value) {
            backdata.value.img = netimgs;
            backdata.value.reason = value1;
            console.log("所有文件上传成功:", backdata.value);
            eventBus.emit("sign_netimg", backdata.value);
          } else {
            console.log("所有文件上传成功:", netimgs);
            eventBus.emit("sign_netimg", netimgs);
          }

          uni.navigateBack();
    
    };
  
</script>

<style lang="scss" scoped></style>

<!-- import { eventBus } from "@/utiles/eventBus.js"; -->
<!-- created() {
    eventBus.$on("sign_netimg", handleUpdateData);
  },
  beforeDestroy() {
    eventBus.$off("sign_netimg", handleUpdateData);
  }, -->
<!-- handleUpdateData(data) {
      console.log("接收到回传的数据:", data);
      sign_netimg = data;
    }, -->
