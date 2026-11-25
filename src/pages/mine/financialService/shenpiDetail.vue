<template>
    <view class="main">
        <u-navbar
          title="审批详情"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <view class="u-nav-slot" slot="left">
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
        </u-navbar>
		<view style="display: flex;flex-direction: row;width: 100%;height: 25px;margin-top: 5px;">
			<u--image style="margin-top: 5px;margin-left: 15px;"
			:src="icon"
			width="20px"
			height="20px"
			></u--image>
			<view style="margin-top: 5px;margin-left: 10px;width: 80%;font-size: 12px;">{{name}}提交的审批</view>
			
		</view>
		<view style="margin-top: 10px;margin-left: 45px;font-size: 12px;color: #2A9595;">{{status}}</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批内容</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;;">{{content}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批详情</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{detail}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批总额</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{money}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批科目</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{subject}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 60px;">
			<view style="margin-top: 10px;margin-left: 35px;font-size: 12px;color: dimgray;">图片</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 70%;">
				<u--image style="margin-top: 10px;"
				  :src="image"
				  width="40px"
				  height="40px"
				></u--image>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 120px;">
			<view style="margin-top: 10px;margin-left: 35px;font-size: 12px;color: dimgray;">附件</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 70%;">
				<view v-for="(item,index) in infoList" :key="index">
					<view style="background-color: aliceblue;width: 100%;height: 30px;display: flex;flex-direction: row;margin-top: 10px;">
						<u--image style="margin-top: 5px;margin-left: 10px;"
						  :src="item.image"
						  width="20px"
						  height="20px"
						></u--image>
						<view style="margin-left: 10px;margin-top: 5px;font-size: 13px;width: 60%;">{{item.title}}</view>
						<view style="margin-top: 5px;margin-left: 15px;font-size: 13px;color: #2A9595;">预览</view>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 20px;"></view>
		<view style="width: 100%;height: 90px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				<u--image style="margin-top: 10px;margin-left: 13px;"
				  :src="faqiInfo.icon"
				  width="15px"
				  height="15px"
				></u--image>
				<view style="margin-left: 20px;width: 1px;height: 65px;background-color: lightgray;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;margin-top: 5px;">
					<view style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 60%;">发起申请</view>
					<view style="margin-left: 30px;margin-top: 5px;font-size: 13px;text-align: right;">{{faqiInfo.time}}</view>
				</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{faqiInfo.actor}}</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-top: 10px;margin-left: 10px;">签名</view>
					<u--image style="margin-top: 5px;margin-left: 10px;"
					  :src="faqiInfo.signImg"
					  width="200px"
					  height="30px"
					></u--image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 80px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				<u--image style="margin-top: 10px;margin-left: 13px;"
				  :src="shenpiInfo.icon"
				  width="15px"
				  height="15px"
				></u--image>
				<view style="margin-left: 20px;width: 1px;height: 80px;background-color: lightgray;"></view>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;margin-top: 5px;">
					<view style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 60%;">{{shenpiInfo.name}}</view>
					<view style="margin-left: 30px;margin-top: 5px;font-size: 13px;text-align: right;">{{shenpiInfo.time}}</view>
				</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{shenpiInfo.actor}}</view>
				<view style="display: flex;flex-direction: row;">
					<view style="font-size: 12px;margin-top: 10px;margin-left: 10px;">签名</view>
					<u--image style="margin-top: 5px;margin-left: 10px;"
					  :src="shenpiInfo.signImg"
					  width="200px"
					  height="30px"
					></u--image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 50px;display: flex;flex-direction: row;">
			<view style="display: flex;width: 30px;flex-direction: column;">
				<u--image style="margin-top: 10px;margin-left: 13px;"
				  :src="mineInfo.icon"
				  width="15px"
				  height="15px"
				></u--image>
			</view>
			<view style="display: flex;flex-direction: column;width: 80%;height: 100px;">
				<view style="display: flex;flex-direction: row;margin-top: 5px;">
					<view style="font-size: 12px;margin-top: 5px;margin-left: 10px;font-size: 12px;width: 60%;">{{mineInfo.name}}</view>
					<view style="margin-left: 30px;margin-top: 5px;font-size: 13px;text-align: right;">{{mineInfo.time}}</view>
				</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;">{{shenpiInfo.actor}}</view>
				
			</view>
		</view>
</view>
</template>

<script>
    export default{
        data(){
            return{
                // 背景颜色
                bgColor: "#2A9595",
				icon:'/static/home/homestay.png',
				name:'王敏',
				time:'03-20 10:23',
				content:'款项申请',
				detail:'土地返祖款',
				status:'审批通过',
				subject:'土地返祖款',
				money:'6000.00',
				image:'/static/home/homestay.png',
				infoList:[
					{image:'/static/home/homestay.png',title:'款项审批.docx'},
					{image:'/static/home/homestay.png',title:'款项审批.excel'},
					{image:'/static/home/homestay.png',title:'款项审批.ppt'},
				],
				faqiInfo:{
					icon:'/static/home/homestay.png',
					actor:'会计',
					time:'03-20 10:23',
					signImg:'/static/home/homestay.png',
				},
				shenpiInfo:{
					name:'支部书记(已同意)',
					icon:'/static/home/homestay.png',
					actor:'',
					time:'03-20 10:23',
					signImg:'/static/home/homestay.png',
				},
				mineInfo:{
					name:'我(已同意)',
					icon:'/static/home/homestay.png',
					actor:'',
					time:'03-20 10:23',
					signImg:'/static/home/homestay.png',
				},
            };
        },
        created() {
          this.init();
        },
        methods:{
            
            init() {
            },
            goBack(){
                
                uni.navigateBack()
            },
        }
    }
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