<template>
    <view class="main">
        <view class="custom-navbar">
          <view class="navbar-content">
            <u-icon style="margin-top: calc(var(--status-bar-height));" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            <view class="search-container">
              <u-search 
                placeholder="搜索审批事由" 
                v-model="keyword" 
                :show-action="false"
                shape="square"
                bg-color="#f5f5f5"
              ></u-search>
            </view>
          </view>
        </view>
		<view style="display: flex;flex-direction: column;">
			<view class="data-item" v-for="(item,index) in dataList" :key="index" @click="detailClick">
				<view style="display: flex;flex-direction: row;width: 100%;height: 20px;margin-top: 10px;">
					<view style="font-size: 13px;margin-left: 15px;width: 60px;">审批是由</view>
					<view style="font-size: 13px;margin-left: 5px;width: 60%;">{{item.reason}}</view>
					<view style="margin-left: 15px;color: #2A9595;font-size: 13px;">{{item.status}}</view>
				</view>
				<view style="margin-top: 10px;width: 100%;height: 20px;font-size: 13px;margin-left: 15px;">申请时间 {{item.time}}</view>
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
					{reason:'土地返祖款、传承劳务费、居民生活补助',time:'09-20 10:20',status:'已受理'},
					{reason:'土地返祖款、传承劳务费、居民生活补助',time:'09-20 10:20',status:'已驳回'},
					{reason:'土地返祖款、传承劳务费、居民生活补助',time:'09-20 10:20',status:'已受理'},
				],
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
			detailClick(){
				uni.navigateTo({
					url:'/pages/mine/financialService/askDetail'
				})
			},
        }
    }
</script>

<style lang="scss" scoped>
    .main {
          min-height: 100vh;
                  width: 100%;
          background-color: aliceblue;
          .custom-navbar {
            height: calc(var(--status-bar-height) + 44px); /* 标准导航栏高度 */
            position: relative;
            width: 100%;
            background-color: #2A9595;
          }
          
          .navbar-content {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 15px; /* 整体左右边距 */
          }
          
          .back-icon {
            margin-right: 10px; /* 返回键与搜索框间距 */
          }
          
          .search-container {
            flex: 1;
            margin-left: 10px;
            margin-top: calc(var(--status-bar-height));
            
          }
		  .data-item{
			  display: flex;
			  flex-direction: column;
			  width: 100%;
			  height: 70px;
			  margin-top: 10px;
			  background-color: white;
		  }
    }
</style>