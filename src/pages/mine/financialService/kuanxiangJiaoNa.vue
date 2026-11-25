<template>
    <view class="main">
        <u-navbar
          title="待付款"
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
          <view slot="right" @click="historyClick">
              <view class="homestayView">历史记录</view>
          </view>
        </u-navbar>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="itemlist" v-for="(item,index) in dataList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
					<image style="margin-left: 15px;margin-top: 10px;width: 15px;height: 15px;" v-if="selected===false" src="/static/login/choose_unselect.png" @click="chooseselect"></image>
					<image style="margin-left: 15px;margin-top: 10px;width: 15px;height: 15px;" v-else src="/static/login/choose_select.png" @click="chooseselect"></image>
					<view style="font-size: 12px;margin-top: 10px;width: 80%;margin-left: 10px;">{{item.title}}</view>
					<view style="font-size: 12px;margin-top: 10px;color: #2A9595;">￥{{item.money}}</view>
				</view>
				<view style="font-size: 12px;margin-top: 10px;width: 100%;height: 20px;margin-left: 15px;">收款方:{{item.address}}</view>
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
				dataList:[
					{title:'土地租金',address:'山东省潍坊市昌邑市都昌街道渔埠',money:'5'},
					{title:'土地租金',address:'山东省潍坊市昌邑市都昌街道渔埠',money:'5'},
					{title:'土地租金',address:'山东省潍坊市昌邑市都昌街道渔埠',money:'5'},
				],
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
			historyClick(){
				
				uni.navigateTo({
					url:'/pages/mine/financialService/jiaonaHistory'
				})
				
			},
			chooseselect(){
			    this.selected = !this.selected
			},
        }
    }
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
          width: 100%;
          background-color: aliceblue;
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
			}
	 .itemlist{
		 margin-top: 10px;
		 margin-left: 4%;
		 width: 92%;
		 height: 70px;
		 display: flex;
		 flex-direction: column;
		 border-radius: 5px;
		 background-color: white;
	 }
    }
</style>