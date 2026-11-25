<template>
    <view class="main">
        <u-navbar
          title="记录"
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
		<view style="display: flex;width: 100%;">
			<view class="listItem" v-for="(item,index) in orderList" :key="index">
				<view style="margin-top: 10px;margin-left: 15px;">{{item.name}}{{item.userMobile}}</view>
				<view style="margin-top: 10px;margin-left: 15px;">转入时间：{{item.createTime}}</view>
				<view style="margin-top: 10px;margin-left: 15px;">关系转入：{{item.transUnit}}</view>
			</view>
		</view>
</view>
</template>

<script>
	import {MineJoinPartyShenQingRelationGetInNotes} from '@/api/mine.js';
	import { storage } from '@/utils/storage';
	
    export default{
        data(){
            return{
                // 背景颜色
                bgColor: "#2A9595",
				orderList:[],
            };
        },
        created() {
          this.init();
        },
        methods:{
            
            init() {
				
				try {
				    
					let param = {
						userId:storage.getUserId(),
					};
				    MineJoinPartyShenQingRelationGetInNotes(param).then((res) =>{
				                    
				        console.log(res);                         
						this.orderList = res.result;
						
				    });
				}catch (error) {
				    console.log(error)
				}finally {
				    wx.stopPullDownRefresh()
				}
            },
            goBack(){
                
                uni.navigateBack()
            },
        }
    }
</script>

<style lang="scss" scoped>
    .main {
         min-height: 100vh;
         width: 100%;
         background-color: aliceblue;
          .flex{
              display: flex;
          }
            .listItem{
              width: 92%;
              background-color: white;
              margin-top: 10px;
              margin-left: 4%;
              border-radius: 5px;
             font-size: 14px;
			 display: flex;
			 flex-direction: column;
     }
    }
</style>