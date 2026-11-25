<template>
    <view class="main">
        <u-navbar
          
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
          <view slot="right" ></view>
        </u-navbar>
		<view class="titleView">忘记密码</view>
		<view class="phoneView">
			
			<input style="margin-left: 15px;font-size: 14px;" placeholder="填写绑定手机号码"></input>
		</view>
		<view style="margin-top: 20px;margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;"></view>
		<view class="codeView">
			
			<input style="margin-left: 15px;font-size: 14px;width: 250px;" placeholder="填写验证码"></input>
			<view style="margin-right: 15px;color: #2A9595;font-size: 14px;">获取验证码</view>
		</view>
		<view style="margin-top: 20px;margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;"></view>
		<view class="buttonView">下一步</view>
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
			
        }
    }
</script>

<style lang="scss" scoped>
    .main {
		width: 100%;
          height: 100vh;
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
	 .titleView{
		 display: flex;
		 margin-top: 30px;
		 font-size: 20px;
		 margin-left: 15px;
	 }
	 .phoneView{
		 display: flex;
		 flex-direction: row;
		 margin-top: 50px;
	 }
	 .codeView{
		 display: flex;
		 flex-direction: row;
		 margin-top: 20px;
	 }
	 
	 .buttonView{
	          
	         margin-top: 40px;
	         background-color: #2A9595;
	         border-radius: 5px;
	         color: white;
	         font-size: 14px;
	         margin-left: 5%; 
	         display: flex;
	         justify-content: center; /* 水平居中 */
	         align-items: center;     /* 垂直居中 */
	         height: 40px;           /* 需要设置高度 */
	         width: 90%;             /* 需要设置宽度 */
	}
	 
    }
</style>