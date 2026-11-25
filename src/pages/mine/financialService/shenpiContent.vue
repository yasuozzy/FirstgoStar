<template>
    <view class="main">
        <u-navbar
          title="审批内容"
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
          <view slot="right" @click="saveClick">
              <view class="homestayView">保存</view>
          </view>
        </u-navbar>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">姓名/公司名称</view>
			<input class="searchlocation" placeholder="填写姓名/公司名称" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">注册手机号</view>
			<input class="searchlocation" placeholder="填写注册手机号" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">银行卡号</view>
			<input class="searchlocation" placeholder="填写银行卡号" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
			<view style="margin-top: 10px;font-size: 14px;">开户行</view>
			<input class="searchlocation" placeholder="填写开户行" type="text" />
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
</view>
</template>

<script>
    export default{
        data(){
            return{
                // 背景颜色
                bgColor: "#2A9595",
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
			//保存
			saveClick(){
				
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
	 .searchlocation{
	           margin-left: 15px;
	           width: 200px;
	           height: 20px;
	           font-size: 14px;
	 		  margin-top: 10px;
	 }
    }
</style>