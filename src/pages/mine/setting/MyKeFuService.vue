<template>
    <view class="main">
        <u-navbar
          title="我的客服"
          
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
          	<view slot="left" @click="goBack">
          		<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
          	</view>
          </template>
		  <template #right>
			  <view slot="right" @click="kefuClick">
				  <u-image
					:src="kefuImage"
					width="20px"
					height="20px"
				  ></u-image>
			  </view>
		  </template>
        </u-navbar>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue';
    // 背景颜色
    const bgColor = ref("#2A9595");
	const kefuImage = ref('/static/mine/kefubaise.png');
           
	onMounted(() => {
	  init();
	});
   
	const init = () =>  {};
	const goBack = () => {
		uni.navigateBack();
	};
	const kefuClick = () => {};
        
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
    }
</style>