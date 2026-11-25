<template>
    <view class="main">
        <u-navbar
          title="审批"
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
          <view slot="right" @click="searchClick">
              <u--image
                :src="image"
                width="25px"
                height="25px"
              ></u--image>
          </view>
        </u-navbar>
		<view class="specsView">
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 13px;">待我审批</view>
				<view v-else style="color: black;font-size: 13px;">待我审批</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment2Click">
				<view v-if="type === '2'" style="color: #2A9595;font-size: 13px;">我已审批</view>
				<view v-else style="color: black;font-size: 13px;">我已审批</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			<view style="width: 33.33%;display: flex;flex-direction:column;text-align: center;margin-top: 10px;" @click="segment3Click">
				<view v-if="type === '3'" style="color: #2A9595;font-size: 13px;">抄送我的</view>
				<view v-else style="color: black;font-size: 13px;">抄送我的</view>
				<view class="whiteLine" v-if="type === '3'"></view>
			</view>
		</view>
		<view class="contentView" v-if="type  === '1'">
			<view class="item-list" v-for="(item,index) in mineshenpiList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;height: 25px;margin-top: 5px;">
					<u--image style="margin-top: 5px;margin-left: 15px;"
					  :src="item.icon"
					  width="20px"
					  height="20px"
					></u--image>
					<view style="margin-top: 5px;margin-left: 10px;width: 50%;font-size: 12px;">{{item.name}}提交的审批</view>
					<view style="margin-top: 5px;font-size: 11px;color: gray;text-align: right;width: 30%;">{{item.time}}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 45px;font-size: 12px;">审批内容:{{item.content}}</view>
				<view style="margin-top: 10px;margin-left: 45px;font-size: 12px;">审批详情:{{item.detail}}</view>
				<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
				<view style="width: 100%;height: 30px;display: flex;flex-direction: row;margin-top: 10px;">
					<view class="refuseButton">拒绝</view>
					<view class="agreeButton">同意</view>
				</view>
				<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
		</view>
		<view class="contentView" v-if="type  === '2'">
			<view class="item-list" v-for="(item,index) in alreadyshenpiList" :key="index" @click="detailClick">
				<view style="display: flex;flex-direction: row;width: 100%;height: 25px;margin-top: 5px;">
					<u--image style="margin-top: 5px;margin-left: 15px;"
					  :src="item.icon"
					  width="20px"
					  height="20px"
					></u--image>
					<view style="margin-top: 5px;margin-left: 10px;width: 50%;font-size: 12px;">{{item.name}}提交的审批</view>
					<view style="margin-top: 5px;font-size: 11px;color: gray;text-align: right;width: 30%;">{{item.time}}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 45px;font-size: 12px;">审批内容:{{item.content}}</view>
				<view style="margin-top: 10px;margin-left: 45px;font-size: 12px;">审批详情:{{item.detail}}</view>
				<view style="margin-top: 10px;margin-left: 45px;font-size: 12px;color: #2A9595;">{{item.status}}</view>
				<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
			</view>
		</view>
		<view class="contentView" v-if="type  === '3'">
			<view class="item-list" v-for="(item,index) in chaosongList" :key="index" @click="detailClick">
				<view style="display: flex;flex-direction: row;width: 100%;height: 25px;margin-top: 5px;">
					<u--image style="margin-top: 5px;margin-left: 15px;"
					  :src="item.icon"
					  width="20px"
					  height="20px"
					></u--image>
					<view style="margin-top: 5px;margin-left: 10px;width: 50%;font-size: 12px;">{{item.name}}提交的审批</view>
					<view style="margin-top: 5px;font-size: 11px;color: gray;text-align: right;width: 30%;">{{item.time}}</view>
				</view>
				<view style="margin-top: 10px;margin-left: 45px;font-size: 12px;">审批内容:{{item.content}}</view>
				<view style="margin-top: 10px;margin-left: 45px;font-size: 12px;">审批详情:{{item.detail}}</view>
				<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
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
				image: "/static/mine/searchImage.png",
				type:'1',
				mineshenpiList:[
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',},
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',},
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',},
				],
				alreadyshenpiList:[
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',status:'审批通过'},
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',status:'审批拒绝'},
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',status:'审批通过'},
				],
				chaosongList:[
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',status:'审批通过'},
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',status:'审批拒绝'},
					{icon:'/static/home/homestay.png',name:'王敏',time:'03-20 10:23',content:'款项申请',detail:'土地返祖款',status:'审批通过'},
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
			searchClick(){
				
			},
			//切换segment
			segment1Click(){
				
				this.type = "1";
				
			},
			segment2Click(){
				
				this.type = "2";
				
			},
			segment3Click(){
				
				this.type = "3";
				
			},
			detailClick(){
				
				uni.navigateTo({
					url:'/pages/mine/financialService/shenpiDetail'
				})
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
	 .specsView{
	 		 width: 100%;
	 		 height: 40px;
	 		 display: flex;
	 		 flex-direction: row;
	 		 
	 		 background-color: white;
	 		 margin-top: 10px;
	 }
	 .whiteLine{
	 		 margin-left: 20%;
	 		 margin-top: 7px;
	 		 width: 60%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .contentView{
		 width: 100%;
		 display: flex;
		 flex-direction: column;
	 }
	 .item-list{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 150px;
		 
	 }
	 .refuseButton{
		 margin-top: 5px;
		                 background-color:white;
		                 border-radius: 8px;
		                 color: #2A9595;
		                 font-size: 12px;
		                 margin-left: 150px; 
		                 display: flex;
						 border: #2A9595 1px solid;
		                 justify-content: center; /* 水平居中 */
		                 align-items: center;     /* 垂直居中 */
		                 height: 25px;           /* 需要设置高度 */
		                 width: 90px;  
	 }
	 .agreeButton{
		 margin-top: 5px;
		                 background-color:#2A9595;
		                 border-radius: 8px;
		                 color: white;
		                 font-size: 12px;
		                 margin-left: 15px; 
		                 display: flex;
		 						 border: #2A9595 1px solid;
		                 justify-content: center; /* 水平居中 */
		                 align-items: center;     /* 垂直居中 */
		                 height: 25px;           /* 需要设置高度 */
		                 width: 90px;  
	 }
    }
</style>