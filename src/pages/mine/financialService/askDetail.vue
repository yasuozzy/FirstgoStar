<template>
    <view class="main">
        <u-navbar
          title="审批申请"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
			<view class="u-nav-slot" slot="left">
			  <view class="flex">
				  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
			  </view>
			</view>
		  </template>
        </u-navbar>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">审批内容</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 60%;">{{content}}</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: #2A9595;">{{status}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">审批事由</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{reason}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">审批总额</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{totalMoney}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">审批科目</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{subject}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">审批类型</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{type}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 60px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">图片</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">
				<u-image style="margin-top: 10px;"
				  :src="image"
				  width="40px"
				  height="40px"
				></u-image>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 120px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">附件</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">
				<view v-for="(item,index) in infoList" :key="index">
					<view style="background-color: aliceblue;width: 100%;height: 30px;display: flex;flex-direction: row;margin-top: 10px;">
						<u-image style="margin-top: 5px;margin-left: 10px;"
						  :src="item.image"
						  width="20px"
						  height="20px"
						></u-image>
						<view style="margin-left: 10px;margin-top: 5px;font-size: 13px;width: 60%;">{{item.title}}</view>
						<view style="margin-top: 5px;margin-left: 15px;font-size: 13px;color: #2A9595;">预览</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 20px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">审批内容</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">姓名/公司名称</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{companyName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">注册手机号</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{registerPhone}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">银行卡号</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{bankCard}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;color: dimgray;">开户行</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">{{bankname}}</view>
		</view>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
                // 背景颜色
	const bgColor = ref("#2A9595");
	const content = ref('款项申请');
	const status = ref('已受理');
	const reason = ref('土地返祖款,创城劳务费');
	const totalMoney = ref('12000');
	const subject = ref('土地返祖款，6000、创城费，4000、居民生活补助，2000');
	const type = ref('拨款');
	const image = ref('/static/home/homestay.png');
	const infoList = ref([
		{image:'/static/home/homestay.png',title:'款项审批.docx'},
		{image:'/static/home/homestay.png',title:'款项审批.excel'},
		{image:'/static/home/homestay.png',title:'款项审批.ppt'},
	]);
	const companyName = ref('花园物业公司');
	const registerPhone = ref('15689288001');
	const bankCard = ref('62285715874569623147821');
	const bankname = ref('潍坊银行');
           
    const goBack= () => {
            
        uni.navigateBack()
    };  
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