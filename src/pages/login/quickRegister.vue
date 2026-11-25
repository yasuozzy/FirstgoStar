<template>
    <view class="main">
        <u-navbar
          title="快速注册"
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
		<view class="phoneView">
			<view style="margin-left: 15px;font-size: 14px;">联系电话</view>
			<input style="margin-left: 10px;font-size: 14px;" placeholder="填写手机号"></input>
		</view>
		<view style="margin-top: 20px;margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;"></view>
		<view class="codeView">
			<view style="margin-left: 15px;font-size: 14px;">短信验证</view>
			<input style="margin-left: 10px;font-size: 14px;width: 200px;" placeholder="填写验证码"></input>
			<view style="margin-right: 15px;color: #2A9595;font-size: 14px;">获取验证码</view>
		</view>
		<view style="margin-top: 20px;margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;"></view>
		<view class="codeView">
			<view style="margin-left: 15px;font-size: 14px;">设置密码</view>
			<input style="margin-left: 10px;font-size: 14px;" placeholder="填写密码"></input>
			
		</view>
		<view style="margin-top: 20px;margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;"></view>
		<view class="codeView">
			<view style="margin-left: 15px;font-size: 14px;">确认密码</view>
			<input style="margin-left: 10px;font-size: 14px;" placeholder="再次填写验证码"></input>
			
		</view>
		<view style="margin-top: 20px;margin-left: 3%;width: 94%;height: 1px;background-color: lightgray;"></view>
		<view class="protocalView">
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
			<image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
			<view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 13px;">《用户协议》</view>
			<view style="font-size: 12px;color: royalblue;margin-top: 13px;">《隐私政策》</view>
		</view>
		<view class="buttonView">注册</view>
</view>
</template>

<script>
    export default{
        data(){
            return{
                // 背景颜色
                bgColor: "#2A9595",
				selected:false,
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
			chooseselect(){
				this.selected = !this.selected
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
	 .phoneView{
		 display: flex;
		 flex-direction: row;
		 margin-top: 100px;
	 }
	 .codeView{
		 display: flex;
		 flex-direction: row;
		 margin-top: 20px;
	 }
	 .protocalView{
		 display: flex;
		 flex-direction: row;
		 width: 100%;
	 }
	 .buttonView{
	          
	         margin-top: 30px;
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