<template>
    <view class="main">
        <u-navbar
          title="物业报修"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
        <template #left>
          <view class="u-nav-slot" slot="left">
            <view class="flex">
                <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
            </view>
          </view>
        </template>
        <template #right>
              <view style="font-size: 14px;color: white;" slot="right" @click="historyClick()">
                  历史记录
              </view>
            </template>
        </u-navbar>
		<view class="form-row" @click="choosePublicEmergencytype">
		  <view class="row-left">
		    <text class="row-label">公共设施</text>
		    <text class="placeholder-text">{{publicemergencyType || '选择'}}</text>
		  </view>
		  <view class="dropdown-triangle"></view>
		</view>
		<!-- 所在房产 -->
		<view class="form-row" @click="chooseGuanLiChutype">
		  <view class="row-left">
		    <text class="row-label">所在管理处</text>
		    <text class="placeholder-text">{{guanlichuTitle || '选择'}}</text>
		  </view>
		  <view class="dropdown-triangle"></view>
		</view>
		<!-- 联系方式 -->
		<view class="form-row">
		  <view class="row-left">
		    <text class="row-label">联系方式</text>
		    <input class="row-input" v-model="indoorPhone" placeholder="填写联系方式" type="number" />
		  </view>
		</view>
		
		<!-- 上门时间 -->
		<view class="form-row" @click="showTimePicker = true">
		  <view class="row-left">
		    <text class="row-label">上门时间</text>
		    <text class="placeholder-text">{{ doorTime ||'选择' }}</text>
		  </view>
		  <view class="dropdown-triangle"></view>
		</view>
		<!-- 具体描述 -->
		<view class="form-row">
		  <view class="row-left">
		    <text class="row-label">具体描述</text>
		    <input 
			  v-model="publicDesc"
		      class="row-input" 
		      placeholder="必填" 
		      placeholder-class="placeholder-text" 
		      type="text" 
		    />
		  </view>
		</view>
		<view class="section-divider" ></view>
		<view class="urgent-section">
		  <view class="form-row no-border urgent-row">
		    <text class="row-label">是否加急</text>
		    <switch 
		      color="#2A9595" 
		      class="custom-switch"
		      :checked="publicis_anonymity"
			   @change="publicswitchChange"
		    />
		  </view>
		  <!-- 加急提示文本条 -->
		  <view class="urgent-tip-bar">
		    <text class="urgent-tip-text">办理加急收费高、效率高</text>
		  </view>
		</view>
		<view class="upload-section">
		  <view class="section-header">
		    <text class="section-title">上传图片</text>
		  </view>
		  
		  <view class="imagechooseView" @click="publicselectFile">
			  <view v-if="publictempFilePaths.length == 0" class="custom-upload-btn">
				<image :src="selectphoto" ></image>
			  </view>
			  <view v-if="publictempFilePaths.length > 0" class="ChoseenView">
				  <view class="imageItemV" v-for="(item,index) in publictempFilePaths" :key="index">
					  <image style="width: 80px;height: 80px;" :src="item" ></image>
				  </view>
			  </view>
		  </view>
		</view>
		<view class="voice-section">
		  <view class="section-header">
		    <text class="section-title">语音录入</text>
		  </view>
		  <view class="voice-content">
		    <!-- 虚线分割线 -->
		    <view class="dashed-divider"></view>
		
		    <!-- 麦克风录音按钮 -->
		    <view class="voice-record-wrap">
		      <view class="mic-circle-btn">
		        <u-icon name="mic" size="32" color="#2A9595"></u-icon>
		      </view>
		      <text class="mic-tip-text">按住说话</text>
		    </view>
		  </view>
		</view>
		<view class="submit-wrap">
		  <button class="submit-button" @click="publicTiJiao">提交</button>
		</view>
		<u-datetime-picker
		  title="选择上门时间"
		  :show="showTimePicker"
		  v-model="timeValue"
		  mode="datetime"
		  cancelColor="#888888"
		  confirmColor="#888888"
		  @confirm="onTimeConfirm"
		  @cancel="showTimePicker = false"
		  :formatter="formatter"
		></u-datetime-picker>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {serviceGetPingTaiRepairSheShi,
	MineWuYeBaoXiuGetGuanLiChuList,serviceGetPingTaiSetUp} from '@/api/service';
    import { getStorage, storage, storageKeys, uploadMultipleFiles } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const publicemergencyAllData = ref([]);
    const publicEmerGencyTypeList = ref([]);
    const publicemergencyType = ref();
    const publicemergencytypeId = ref();
    const publicHouseTitle = ref();
    const publichouseListAllData = ref([]);
    const publichouseListTitleList = ref([]);
    const publichseid = ref();
    const publicmanagerId = ref();
    const publicDesc = ref();
    const publicisUrgent = ref();
    const publictempFilePaths = ref([]);
    const publicfinalImgValue = ref('');
    const radiolist8 = ref([
      {
    	name: "物业公司",
    	disabled: true,
      },
      {
    	name: "平台",
    	disabled: false,
      },
    ]);
    const radiovalue8 = ref("物业公司");
    const publicOrderType = ref(1);
	const indoorPhone = ref('');
	const showTimePicker=ref(false);
	//  绑定的内部时间戳
	const timeValue=ref(Number(new Date()));
	// 最终展示的文字
	const doorTime = ref('');
	const guanlichuAllData = ref([]);
	const guanlichuTitleList = ref([]);
	const guanlichuTitle = ref('');
	const managerId = ref('');
	const publicis_anonymity = ref(true);
	const selectphoto = ref('/static/mine/selectphoto.png');
	
	
	onLoad(() => {
		
		indoorPhone.value = storage.getPhone();
		
	});
	onMounted(() => {
		
		getPublicType();
		getGuanLiChuData();
		
	});
	//获取公共设施类型
	const getPublicType = async() => {
		
		try {
			
			let param = {
				
				code:2
			};
			serviceGetPingTaiRepairSheShi(param).then((res) =>{
							
				console.log(res);
				publicemergencyAllData.value = res.result;
				publicEmerGencyTypeList.value = res.result.map(item => item.name);
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//获取公共设施类型
	const choosePublicEmergencytype = () => {
		uni.showActionSheet({
			itemList: publicEmerGencyTypeList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				publicemergencyType.value = publicEmerGencyTypeList.value[res.tapIndex];
				publicemergencytypeId.value = publicemergencyAllData.value[res.tapIndex].id;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	
	};
	//获取管理处信息
	const getGuanLiChuData = async() => {
		
		
		try {
			
			let param = {
				
				userId:storage.getUserId()
			};
			MineWuYeBaoXiuGetGuanLiChuList(param).then((res) =>{
							
				console.log(res);
				guanlichuAllData.value = res.result;
				guanlichuTitleList.value = res.result.map(item => item.name);
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	//获取管理处id，title
	const chooseGuanLiChutype = () => {
		uni.showActionSheet({
			itemList: guanlichuTitleList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				guanlichuTitle.value = guanlichuTitleList.value[res.tapIndex];
				managerId.value = guanlichuAllData.value[res.tapIndex].manid;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	
	};
	//点击弹窗确定按钮时触发的函数
	const onTimeConfirm=(e:any)=>{
	  doorTime.value = uni.$u.timeFormat(e.value,'yyyy-mm-dd hh:MM');
	  showTimePicker.value = false;
	};
	
	const formatter = (type: string, value: any) => {
	  if (type === 'year') return `${value}年`
	  if (type === 'month') return `${value}月`
	  if (type === 'day') return `${value}日`
	  if (type === 'hour') return `${value}时`
	  if (type === 'minute') return `${value}分`
	  return value;
	};
	const publicswitchChange = (e:any) => {
		
		console.log(e);
		publicis_anonymity.value = e.detail.value;
		if(publicis_anonymity.value === false){
			
			publicisUrgent.value = 1;
			
		}else if(publicis_anonymity.value === true){
			
			publicisUrgent.value = 2;
		}
	};
	const publicselectFile = () => {

		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				publictempFilePaths.value = res.tempFilePaths;
				publicuploadFileImage();
			}
		});
	};

	const publicuploadFileImage = async() => {
		const result = await uploadMultipleFiles([],publictempFilePaths.value,getStorage(storageKeys.token,''));
		console.log('=== 上传返回结果 ===', result);
		if (result && result.length > 0) {
			publicfinalImgValue.value = result.map((item: any) => item.data).join(',');
			console.log('=== publicfinalImgValue 赋值成功 ===', publicfinalImgValue.value);
		} else {
			console.error('=== 上传失败：返回结果为空 ===');
		}
	};
	//室内报修提交
	const publicTiJiao  = async() => {
		
		if(publicemergencyType.value.length === 0){
			
			uni.showToast({
				title: '请选择公共设施',
				icon: 'none'
			});
			return;
		}
		if(managerId.value.length === 0){
			
			uni.showToast({
				title: '请选择管理处',
				icon: 'none'
			});
			return;
		}
		if(indoorPhone.value.length === 0){
			
			uni.showToast({
				title: '请填写联系方式',
				icon: 'none'
			});
			return;
		}
		
		if(doorTime.value.length === 0){
			
			uni.showToast({
				title: '请选择上门时间',
				icon: 'none'
			});
			return;
		}
		if(publicDesc.value.length === 0){
			
			uni.showToast({
				title: '请填写具体描述',
				icon: 'none'
			});
			return;
		}
		if(publicfinalImgValue.value.length === 0){
			
			uni.showToast({
				title: '请上传图片',
				icon: 'none'
			});
			return;
		}
		
		try {
		
			let param = {
		
				maintainType:5,
				orderType:4,
				repairUId: getStorage(storageKeys.userId,''),
				repairPeople:storage.getRealName()?storage.getRealName():storage.getNickName(),
				repairNo:'',
				repairIndustry:guanlichuTitle.value,
				phone: storage.getPhone(),
				managerId:managerId.value,
				pic:publicfinalImgValue.value,
				voice:'',
				voiceDuration:'',
				visitTime:doorTime.value,
				reparirTypeId:publicemergencytypeId.value,
				isUrgent:publicisUrgent.value,
				repairContent:publicDesc.value,
				repairList:'',
				houseId:storage.getHseid()
				
				
			};
			const res = await serviceGetPingTaiSetUp(param);
			
			console.log(res);
			uni.showToast({
				title: res.message,
				icon: 'none'
			});
			
			if(res.success === true){
				
				uni.navigateBack();
			}
		
			
		} catch (error) {
			console.log(error)
		}
		
	};
	const historyClick = () => {
		
		uni.navigateTo({
			url:'/pages/mine/wuyeBaoXiu/baoxiuHistory'
		})
	};
    const goBack= () => {
        
        uni.navigateBack()
    };
</script>

<style lang="scss" scoped>
    .main {
          height: 100%;
          background: white;
          .flex{
              display: flex;
          }
		  /* ================= 通用分隔条 ================= */
		  .section-divider {
		    width: 100%;
		    height: 8px;
		    background-color: #F4F6F8;
		  }
		  
		  /* ================= 表单区域 ================= */
		  .form-card {
		    background-color: #ffffff;
		  }
		  
		  .form-row {
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    justify-content: space-between;
		    height: 72px;
		    padding: 0 16px;
		    border-bottom: 1px solid #F0F2F5;
		  
		    &.no-border {
		      border-bottom: none;
		    }
		  }
		  
		  .repair-worker-row {
		    height: auto;  
		    padding-top: 28px; 
		    padding-bottom: 36px;
		  }
		  .row-left {
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    flex: 1;
		  }
		  
		  .row-label {
		    font-size: 15px;
		    color: #868686;
		    width: 90px;
		    flex-shrink: 0;
		  }
		  
		  .row-input {
		    flex: 1;
		    font-size: 15px;
		    color: #333333;
		  }
		  
		  .placeholder-text {
		    font-size: 15px;
		    color: #868686;
		  }
		  
		  /* 下拉小三角 */
		  .dropdown-triangle {
		    width: 0;
		    height: 0;
		    border-left: 4.5px solid transparent;
		    border-right: 4.5px solid transparent;
		    border-top: 5.5px solid #2A9595;
		    margin-right: 4px;
		    flex-shrink: 0;
		  }
		  
		  /* 维修人员单选框 */
		  .radio-group {
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    gap: 24px;
		  }
		  
		  .radio-item {
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		  
		    .radio-circle {
		      width: 16px;
		      height: 16px;
		      border-radius: 50%;
		      border: 1.5px solid #C5C5C5;
		      margin-right: 10px;
		      display: flex;
		      align-items: center;
		      justify-content: center;
		      box-sizing: border-box;
		  
		      &.active {
		        border-color: #2A9595;
		        background-color: #2A9595;
		      }
		    }
		  
		    .radio-label {
		      font-size: 14px;
		      color: #444444;
		    }
		  }
		  
		  /* ================= 是否加急区域 ================= */
		  .urgent-section {
		    background-color: #ffffff;
		  }
		  
		  .urgent-row {
		    height: 64px;
		  }
		  
		  .custom-switch {
		    transform: scaleX(0.88) scaleY(0.66);
		    
		  }
		  .urgent-tip-bar {
		    width: 100%;
		    height: 40px;
		    background-color: #F4F6F8;
		    display: flex;
		    align-items: center;
		    padding: 0 16px;
		    box-sizing: border-box;
		  
		    .urgent-tip-text {
		      font-size: 13px;
		      color: #868686;
		    }
		  }
		  
		  /* ================= 通用标题行（上传图片 & 语音录入） ================= */
		  .section-header {
		    height: 52px;
		    display: flex;
		    align-items: center;
		    padding: 0 16px;
		    border-bottom: 1px solid #F0F2F5;
		  }
		  
		  .section-title {
		    font-size: 15px;
		    color: #868686;
		  }
		  
		  /* ================= 上传图片区域 ================= */
		  .upload-section {
		    background-color: #ffffff;
		  }
		  
		  .upload-content {
		    padding: 18px 16px;
		  }
		  
		  .upload-dashed-box {
		    width: 86px;
		    height: 86px;
		    border: 1.5px dashed #CCCCCC;
		    border-radius: 4px;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    background-color: #FAFAFA;
		    margin-left: 12px;
		  }
		  
		  /* ================= 语音录入区域 ================= */
		  .voice-section {
		    background-color: #ffffff;
		  }
		  
		  .voice-content {
		    padding: 0 16px 20px 16px;
		  }
		  
		  .dashed-divider {
		    width: 100%;
		    border-top: 1.5px dashed #E5E5E5;
		    margin: 18px 0 24px 0;
		  }
		  
		  .voice-record-wrap {
		    display: flex;
		    flex-direction: column;
		    align-items: center;
		    justify-content: center;
		  }
		  
		  .mic-circle-btn {
		    width: 56px;
		    height: 56px;
		    border-radius: 50%;
		    border: 2px solid #2A9595;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    background-color: #ffffff;
		  }
		  
		  .mic-tip-text {
		    font-size: 13px;
		    color: #868686;
		    margin-top: 8px;
		  }
		  
		  /* ================= 提交按钮 ================= */
		  .submit-wrap {
		    padding: 24px 16px 30px 16px;
		  }
		  
		  .submit-button {
		    width: 100%;
		    height: 46px;
		    line-height: 46px;
		    background-color: #2A9595;
		    color: #ffffff;
		    font-size: 16px;
		    border-radius: 6px;
		    border: none;
		    text-align: center;
		  
		    &::after {
		      border: none;
		    }
		  }
		  
		  /* ================= 居民点单：点单描述大文本框 ================= */
		  .order-desc-wrap {  
		    padding: 16px 16px 20px 16px;  
		    background-color: #ffffff;
		    border-bottom: 1px solid #F0F2F5;
		  }
		  
		  .desc-title {  
		    display: block;  
		    font-size: 15px;  
		    color: #868686;  
		    margin-bottom: 12px;
		  }
		  
		  .desc-textarea {  
		    width: 100%;  
		    height: 76px;  
		    border: 1px solid #D8D8D8;  
		    border-radius: 4px;  
		    padding: 4px 6px;  
		    box-sizing: border-box;  
		    font-size: 14px;  
		    color: #333333;
		  }
		  
		  :deep(.u-toolbar__title) {
		    font-size: 19px !important; 
		    font-weight: normal !important; 
		    color: #222222 !important;
		  }
		  
		  :deep(.u-toolbar__wrapper__cancel) {
		    font-size: 17px !important; 
		    font-weight: normal !important; 
		    color: #888888 !important;
		  }
		  
		  :deep(.u-toolbar__wrapper__confirm) {
		    font-size: 17px !important; 
		    font-weight: normal !important; 
		    color: #888888 !important;
		  }
		  
		  :deep(.u-picker__view__column__item),
		  :deep(.u-picker__view__column__item__text) {
		    font-size: 19px !important; 
		    font-weight: normal !important;
		    color: #222222 !important;
		  }
		  
		  
		  .custom-action-sheet {
		    padding: 0 10px 15px 10px;
		  }
		  
		  .sheet-main-card {
		    background-color: #ffffff;
		    border-radius: 12px;
		    overflow: hidden;
		    margin-bottom: 10px;
		  }
		  
		  .sheet-title {
		    text-align: center;
		    font-size: 15px;
		    color: #999999;
		    padding: 16px 0;
		  }
		  
		  .sheet-divider {
		    width: 100%;
		    height: 1px;
		    background-color: #F0F2F5;
		  }
		  
		  .sheet-item {
		    text-align: center;
		    font-size: 17px;
		    color: #333333;
		    padding: 16px 0;
		    
		    &:active {
		      background-color: #f7f7f7;
		    }
		  }
		  
		  .sheet-cancel-card {
		    background-color: #ffffff;
		    border-radius: 12px;
		    text-align: center;
		    font-size: 17px;
		    font-weight: 500;
		    color: #333333;
		    padding: 15px 0;
		    
		    &:active {
		      background-color: #f7f7f7;
		    }
		  }
		  
		  
		  .cascader-box {
		    display: flex;
		    flex-direction: row;
		    width: 240px;
		    height: 180px;
		    background-color: #ffffff;
		    border-radius: 0;
		    overflow: hidden;
		    margin-top: 198px;
		    margin-left: 106px;
		  }
		  
		  .cascader-left {
		    width: 120px;
		    height: 100%;
		    border-right: 1px solid #F0F2F5;
		    box-sizing: border-box;
		  }
		  
		  .cascader-left-item {
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    justify-content: space-between;
		    height: 45px;
		    padding: 0 12px 0 14px;
		    box-sizing: border-box;
		  
		    .item-text {
		      font-size: 15px;
		      color: #333333;
		    }
		  
		    .item-arrow {
		      font-size: 15px;
		      color: #333333;
		      font-weight: 400;
		    }
		  
		    &.active {
		      .item-text {
		        color: #2A9595;
		      }
		  
		      .item-arrow {
		        color: #2A9595;
		      }
		    }
		  
		    &:active {
		      background-color: #f9f9f9;
		    }
		  }
		  
		  .cascader-right {
		    width: 120px;
		    height: 100%;
		    box-sizing: border-box;
		  }
		  
		  .cascader-right-item {
		    display: flex;
		    flex-direction: row;
		    align-items: center;
		    height: 45px;
		    padding: 0 14px;
		    box-sizing: border-box;
		  
		    .item-text {
		      font-size: 15px;
		      color: #333333;
		    }
		  
		    &:active {
		      background-color: #f9f9f9;
		    }
		  }
		    .imagechooseView{
		              margin-top: 10px;
		              margin-left: 5%;
		              width: 90%;
		              margin-bottom: 20px;
		    }
		    .custom-upload-btn {
		               width: 64px;
		               height: 64px;
		               display: flex;
		               align-items: center;
		               justify-content: center;
		      }
		      .custom-upload-btn image {
		               width: 100%;
		               height: 100%;
		      }
		      .ChoseenView{
		                 
		                  display: grid;
		                   grid-template-columns: repeat(3, 1fr);
		                   gap: 10px;
		                   max-width: 900px;
		                   margin: 0 auto;
		                   // padding: 20px;
		                   align-items: left;
		      }
		      .imageItemV{
		                 
		                 
		                 width:80px;
		                 height: 80px;
		                 margin-top: 10px;
		                 box-sizing: border-box;
		      }
}
</style>