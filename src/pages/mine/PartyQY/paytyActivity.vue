<template>
    <view class="main">
        <u-navbar
          title="党群活动"
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
		<view class="specsView" @click="chooseOrderType">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">需求类型</view>
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;width: 65%;">{{style}}</view>
			<u--image style="margin-left: 15px;margin-top: 18px;"
			:src="icon"
			width="12px"
			height="8px"
			></u--image>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">姓名</view>
			<input style="font-size: 13px;margin-top: 15px;margin-left: 15px;" v-model="name" type='text' placeholder="请输入姓名"/>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">手机号</view>
			<input style="font-size: 13px;margin-top: 15px;margin-left: 15px;" v-model="phone" type='text' placeholder="请输入手机号"/>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView" @click="chooseAddress">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">联系地址</view>
			<view style="font-size: 13px;margin-left: 15px;width: 65%;height: 40px;color: black;display: flex;align-items: center;margin-top: 5px;">{{address}}</view>
			<u--image style="margin-left: 15px;margin-top: 18px;"
			:src="icon"
			width="12px"
			height="8px"
			></u--image>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">需求描述</view>
		</view>
		<textarea class="textAreaView" v-model="introduce" placeholder="输入点单描述内容...">
		        </textarea>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">上传图片</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
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
		<view style="width: 100%;height: 1px;background-color: aliceblue;margin-top: 10px;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">语音录入</view>
		</view>
		<view class="buttonView" @click="gotoRegister">提交</view>
		<uni-popup ref="popup" >
			
			<view  class="WhiteView">
				<view style="display: flex;flex-direction: column;width: 115px;height: 230px;background-color: aliceblue;">
					<view style="display: flex;flex-direction: column;" v-for="(item,index) in dataList" :key="index">
						<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;height: 30px;" @click="choseChildrenClick(item)">{{item.name}} ></view>
					</view>
				</view>
				<view style="display: flex;flex-direction: column;width: 115px;height: 230px;">
					<view style="display: flex;flex-direction: column;" v-for="(item,index) in childList" :key="index">
						<view style="margin-top: 11px;margin-left: 10px;font-size: 13px;height: 30px;" @click="normalClick(item)">{{item.name}}</view>
					</view>	
				</view>
						
			</view>
			
			
		</uni-popup>
</view>
</template>

<script>
	import {serviceSheChaungOrder,serviceSheChaungOrderSetUp} from '@/api/service.js';
	import { storage,BaseURL } from '@/utils/storage';
    export default{
        data(){
            return{
                // 背景颜色
                bgColor: "#2A9595",
				style:'请选择需求类型',
				icon:'/static/home/downImage.png',
				imageValue:[],
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
				address:'选择地址',
				latitude:'',
				longitude:'',
				name:'',
				phone:'',
				introduce:'',
				dataList:[],
				childList:[],
				firstyType:'',
				secondType:'',
				type_id:'',
				tempFilePaths:[],
				uploadedCount:0,
				finalImgValue:'',
            };
        },
        created() {
          this.init();
        },
        methods:{
            
            init() {
            	try {
            		
            		
            		serviceSheChaungOrder({}).then((res) =>{
            			
            			console.log(res);
            			this.dataList = res.result;
            			this.childList = res.result[0].childList;
            			this.firstyType = this.dataList[0].name;
            		});
            	} catch (error) {
            		console.log(error)
            	}
            },
			choseChildrenClick(item){
				
				console.log(item.name);
				this.firstyType = item.name;
				this.childList = item.childList;
				
			},
			chooseOrderType(){
				this.$refs.popup.open('top');
			},
			normalClick(item){
				
				console.log(item.name);
				this.secondType = item.name;
				this.type_id = item.id;
				this.style = this.firstyType + this.secondType;
				this.$refs.popup.close();
			},
			chooseAddress(){
				const that = this
				uni.chooseLocation({
					
					success: function (res) {
							console.log('位置名称：' + res.name);
							console.log('详细地址：' + res.address);
							console.log('纬度：' + res.latitude);
							console.log('经度：' + res.longitude);
							that.address = res.address;
							that.latitude = res.latitude;
							that.longitude = res.longitude;
							console.log(that.address);
					},
					fail() {
						uni.showToast({
							title:'获取位置信息失败',
							icon:'none',
						})
					}
				})
			},
			select(e){
				console.log('选择文件：',e);
				this.tempFilePaths = e.tempFilePaths;
			},
			gotoRegister(){
				
				if (this.style === '请选择需求类型') {
					
					uni.showToast({
					  title: '请选择需求类型',
					  icon: "none",
					})
					return;
				}
				if (this.name.length == 0) {
					
					// 状态错误处理
					uni.showToast({
					  title: '请输入姓名',
					  icon: "none",
					})
					return;
				}
				if (this.phone.length == 0) {
					
					// 状态错误处理
					uni.showToast({
					  title: '请输入手机号',
					  icon: "none",
					})
					return;
				}
				if (this.address == '选择地址') {
					
					// 状态错误处理
					uni.showToast({
					  title: '请选择地址',
					  icon: "none",
					})
					return;
				}
				if (this.introduce.length == 0) {
					
					// 状态错误处理
					uni.showToast({
					  title: '请输入需求描述',
					  icon: "none",
					})
					return;
					
					
				}else {
					
					if (this.tempFilePaths.length > 0) {
						
						console.log(this.tempFilePaths);
						this.tempFilePaths.forEach((filePath,index) =>{
							
							uni.uploadFile({
										url: BaseURL +  'AppWorkOrder/addUploadIms', 
										filePath: filePath,
										name: 'multipartFile',
										formData: {
											type:"jpg",
										},
										success: (uploadFileRes) => {
											console.log(uploadFileRes.data);
											this.uploadedCount++;
											const responseData = JSON.parse(uploadFileRes.data);
											console.log(responseData);
											this.appendToImgValue(responseData.data, index);
											// this.imageValue = responseData.data;
											// this.uploadAllData();
											// this.pushData();
											 // 检查是否是最后一张图片
											if (this.uploadedCount === this.tempFilePaths.length) {
											    this.pushData()
											}
										}
									});
							
						});
						
						
					}else
					{
						//提交数据
						this.pushData();
					}
					
					
				}
				
			},
			pushData(){
				
				try {
					
					let param = {
						userId:storage.getUserId(),
						type_id:this.type_id,
						firstType:this.firstyType,
						secondType:this.secondType,
						name:this.name,
						mobile:this.phone,
						address:this.address,
						latitude:this.latitude,
						longitude:this.longitude,
						pic:this.finalImgValue,
						voice:"",
						voice_duration:"",
						content:this.introduce,
					};			
				    serviceSheChaungOrderSetUp(param).then((res) =>{
				                        
				        console.log(res);
						uni.showToast({
							title:'提交成功',
							icon:'none',
						});
				        uni.navigateBack();
				    });
				} catch (error) {
				    console.log(error)
				}
				
			},
			// 拼接图片地址到 finalImgValue
			appendToImgValue(imageUrl, currentIndex) {
			      if (this.finalImgValue === '') {
			        // 第一张图片，直接赋值
			        this.finalImgValue = imageUrl
			      } else {
			        // 后续图片，用逗号拼接
			        this.finalImgValue += ',' + imageUrl
			    }
			},
            goBack(){
                
                uni.navigateBack()
            },
			//历史记录
			historyClick(){
				
				uni.navigateTo({
					url:'/pages/service/volunteerQunYuan/volenteerHisList'
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
	 }
	 .imagechooseView{
	         margin-top: 15px;
	         margin-left: 5%;
	         width: 90%;
	         height: 100px;
	 }
	  .buttonView{
	               
	              margin-top: 50px;
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
		 .textAreaView{
			 margin-top: 10px;
			 margin-left: 4%;
			 width: 92%;
			 height: 100px;
			 border: lightgray 1px solid;
			 font-size: 13px;
		 }
		 .WhiteView{
			 background-color: white;
			 margin-top: calc(var(--status-bar-height) + 95px);
			 margin-left: 140px;
			 margin-right: 5px;
			 width: 230px;
			 height: 230px;
			 display: flex;
			 flex-direction: row;
			 border-radius: 4px;
		 }
		 

    }
</style>