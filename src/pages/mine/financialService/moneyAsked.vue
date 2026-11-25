<template>
    <view class="main">
        <u-navbar
          title=""
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
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 15px;">款项申请</view>
				<view v-else style="color: black;font-size: 15px;">款项申请</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === '2'" style="color: #2A9595;font-size: 15px;">会计审批</view>
				<view  v-else style="color: black;font-size: 15px;">会计审批</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
			
		</view>
		<view v-if="type === '1'">
			<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
				<view style="margin-top: 10px;font-size: 14px;">申请内容</view>
				<input class="searchlocation" placeholder="填写申请内容" type="text" />
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
				<view style="margin-top: 10px;font-size: 14px;">审批事由</view>
			</view>
			<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 80px;font-size: 13px;" placeholder="请填写审批是由">
			</textarea>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
				<view style="margin-top: 10px;font-size: 14px;">审批总额</view>
				<input class="searchlocation" placeholder="输入审批数额" type="text" />
				<view style="font-size: 14px;margin-top: 10px;margin-left: 20px;">元</view>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 80%;">审批科目</view>
				<view style="font-size: 14px;margin-top: 10px;margin-left: 10px;color: #2A9595;">创建</view>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 80%;">审批类型</view>
				<radio-group style="display: flex;flex-direction: row;" @change="radioChange">
					<view class="radioView" v-for="(item, index) in checkboxItems" :key="item.value">
						
						<view style="display: flex;flex-direction: row;">
							<radio activeBackgroundColor="#2A9595" activeBorderColor="#2A9595" style="transform:scale(0.7)" :value="item.value" :checked="index === current" />
							<view>{{item.name}}</view>
						</view>
						
					</view>
				</radio-group>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;" @click="conyentClick">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">审批内容</view>
				<u--image style="margin-top: 15px;"
				  :src="arrowimage"
				  width="10px"
				  height="15px"
				></u--image>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">图片</view>
			<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
			<view class="imagechooseView">
			            <uni-file-picker 
			            v-model="imageValue"  
			            file-mediatype="image"
			            mode="grid"
			            file-extname="png,jpg"
			            :image-styles="imageStyles"
			            @progress="progress" 
			            @success="success" 
			            @fail="fail" 
			            @select="select" 
			            limit="9" ></uni-file-picker>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">附件</view>
			<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
			<view class="imagechooseView">
			            <uni-file-picker 
			            v-model="imageValue"  
			            file-mediatype="image"
			            mode="grid"
			            file-extname="png,jpg"
			            :image-styles="imageStyles"
			            @progress="progress" 
			            @success="success" 
			            @fail="fail" 
			            @select="select" 
			            limit="9" ></uni-file-picker>
			</view>
			<view class="footer-container">
			    <view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
			        <view class="order-button" @click="postClick">提交</view>
			    </view>
			            
			</view>
		</view>
		<view v-if="type === '2'">
			<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
				<view style="margin-top: 10px;font-size: 14px;">申请内容</view>
				<input class="searchlocation" placeholder="填写申请内容" type="text" />
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
				<view style="margin-top: 10px;font-size: 14px;">审批详情</view>
			</view>
			<textarea style="margin-top: 10px;margin-left: 4%;width: 92%;height: 80px;font-size: 13px;" placeholder="请填写审批详情">
			</textarea>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 13px;color: red;">*</view>
				<view style="margin-top: 10px;font-size: 14px;">审批总额</view>
				<input class="searchlocation" placeholder="输入审批数额" type="text" />
				<view style="font-size: 14px;margin-top: 10px;margin-left: 20px;">元</view>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 80%;">审批科目</view>
				<view style="font-size: 14px;margin-top: 10px;margin-left: 10px;color: #2A9595;">创建</view>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 80%;">审批类型</view>
				<radio-group style="display: flex;flex-direction: row;" @change="radioChange">
					<view class="radioView" v-for="(item, index) in checkboxItems" :key="item.value">
						
						<view style="display: flex;flex-direction: row;">
							<radio activeBackgroundColor="#2A9595" activeBorderColor="#2A9595" style="transform:scale(0.7)" :value="item.value" :checked="index === current" />
							<view>{{item.name}}</view>
						</view>
						
					</view>
				</radio-group>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;" @click="detailReview">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">明细预览</view>
				<u--image style="margin-top: 15px;"
				  :src="arrowimage"
				  width="10px"
				  height="15px"
				></u--image>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">图片</view>
			<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
			<view class="imagechooseView">
			            <uni-file-picker 
			            v-model="imageValue"  
			            file-mediatype="image"
			            mode="grid"
			            file-extname="png,jpg"
			            :image-styles="imageStyles"
			            @progress="progress" 
			            @success="success" 
			            @fail="fail" 
			            @select="select" 
			            limit="9" ></uni-file-picker>
			</view>
			<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
			<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">附件</view>
			<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
			<view class="imagechooseView">
			            <uni-file-picker 
			            v-model="imageValue"  
			            file-mediatype="image"
			            mode="grid"
			            file-extname="png,jpg"
			            :image-styles="imageStyles"
			            @progress="progress" 
			            @success="success" 
			            @fail="fail" 
			            @select="select" 
			            limit="9" ></uni-file-picker>
			</view>
			<view class="footer-container">
			    <view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
			        <view class="order-button" @click="postClick">提交</view>
			    </view>
			            
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
				type:'1',
				checkboxItems: [
				      {name: '收款', value: '否', checked: 'true'},
				      {name: '拨款', value: '是'}
				    ],
				current:0,
				arrowimage:'/static/service/my_arrow.png',
				imageStyles:{
					    width:64,
					    height:64,
					    border:{
					        color:"lightgray",
					        width:2,
					        style:'dashed',
					        radius:'2px'
					    }
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
			//历史记录
			historyClick(){
				
				uni.navigateTo({
					url:'/pages/mine/financialService/moneyAskHistory'
				})
				
			},
			//切换segment
			segment1Click(){
				
				this.type = "1";
				
			},
			segment2Click(){
				
				this.type = "2";
				
			},
			//收款拨款
			radioChange(evt) {
				for (let i = 0; i < this.checkboxItems.length; i++) {
					if (this.checkboxItems[i].value === evt.detail.value) {
						this.current = i;
						break;
					}
				}
			},
			//提交
			postClick(){
				
			},
			conyentClick(){
				uni.navigateTo({
					
					url:'/pages/mine/financialService/shenpiContent'
				})
			},
			detailReview(){
				
				uni.navigateTo({
					url:'/pages/mine/financialService/detailReview'
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
	 .greenHeaderView{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	height: 50px;
	 	
	 }
	 .whiteLine{
	 		 margin-left: 35%;
	 		 margin-top: 5px;
	 		 width: 30%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .searchlocation{
	           margin-left: 15px;
	           width: 200px;
	           height: 20px;
	           font-size: 14px;
	 		  margin-top: 10px;
	 }
	 .radioView{
		 display: flex;
		 flex-direction: row;
		 font-size: 13px;
		 width: 100px;
		 margin-left: 30px;
		 
		 margin-top: 10px;
	 }
	 .imagechooseView{
	         margin-top: 10px;
	         margin-left: 5%;
	         width: 90%;
	         height: 100px;
	}
	.footer-container {
	      position: fixed;
	      bottom: 0;
	      left: 0;
	      right: 0;
	      height: 70px;
	      background-color: white;
	      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	      z-index: 100;
	      color: white;
	      display: flex;
	      justify-content: center; /* 水平居中 */
	      align-items: center;     /* 垂直居中 */
	      
	    }
	    .order-button {
	                 
	        display: flex;
	        justify-content: center; /* 水平居中 */
	        align-items: center;     /* 垂直居中 */
	        height: 35px;           /* 需要设置高度 */
	        width: 92%;
	        margin-right: 10px;
	        font-size: 13px;
	        color: white;
	        background-color: #2A9595;
	        border-radius: 6px;
	        margin-left: 4%;
	        margin-top: 15px;
	    }
    }
</style>