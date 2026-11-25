<template>
  <view class="main-container">
    <!-- 1. 顶部导航栏  -->
    <u-navbar
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
    >
      <template #left>
        <view class="nav-left">
          <u-icon name="arrow-left" size="20" color="#ffffff" @click="goBack"></u-icon>
        </view>
      </template>
      <template #center>
        <text class="nav-title">应急</text>
      </template>
      <template #right>
        <view class="nav-right">
          <text class="history-text">历史记录</text>
        </view>
      </template>
    </u-navbar>

    <!-- 2. 顶部分类 Tab 栏 -->
    <view class="tab-bar">
      <!-- 应急 Tab (当前激活状态) -->
      <view class="tab-item" 
      :class="{active:currentTab === 0}"
      @click="changeTab(0)">
        <text class="tab-text">应急</text>
        <view class="tab-active-line" v-if="currentTab === 0"></view>
      </view>

      <!-- 室内报修 Tab -->
      <view class="tab-item" @click="changeTab(1)" :class="{active:currentTab === 1}">
        <text class="tab-text">室内报修</text>
        <view class="tab-active-line" v-if="currentTab === 1"></view>
      </view>

      <!-- 公共设施 Tab -->
      <view class="tab-item" @click="changeTab(2)" :class="{active:currentTab === 2}">
        <text class="tab-text">公共设施</text>
        <view class="tab-active-line" v-if="currentTab === 2"></view>
      </view>

      <!-- 居民点单 Tab -->
      <view class="tab-item" @click="changeTab(3)" :class="{active:currentTab === 3}">
        <text class="tab-text">居民点单</text>
        <view class="tab-active-line" v-if="currentTab === 3"></view>
      </view>
    </view>

    <!-- 灰色分隔条 -->
    <view class="section-divider"></view>

    <!-- 3. 表单区域 -->
    <view class="form-card">
      <!-- ================= 应急表单 (currentTab === 0) ================= -->
      <template v-if="currentTab === 0">
        <!-- 应急类型 -->
        <view class="form-row" @click="chooseEmergencytype">
          <view class="row-left">
            <text class="row-label">应急类型</text>
            <text class="placeholder-text">{{ emergencyType || '选择' }}</text>
          </view>
          <view class="dropdown-triangle"></view>
        </view>

        <!-- 所在房产 -->
        <view class="form-row" @click="chooseHouseType">
          <view class="row-left">
            <text class="row-label">所在房产</text>
            <text class="placeholder-text">{{ houseTitle || '选择'}}</text>
          </view>
          <view class="dropdown-triangle"></view>
        </view>

        <!-- 具体描述 -->
        <view class="form-row">
          <view class="row-left">
            <text class="row-label">具体描述</text>
            <input 
			  v-model="repairContent"
              class="row-input" 
              placeholder="必填" 
              placeholder-class="placeholder-text" 
              type="text" 
            />
          </view>
        </view>

        <!-- 维修人员 -->
        <view class="form-row no-border repair-worker-row">
          <text class="row-label">维修人员</text>
		  <u-radio-group style="margin-top: 10px;margin-left: 80px;"
		    v-model="radiovalue6"
		    placement="row"
		    @change="groupChange"
		  >
		    <u-radio
		      :customStyle="{ marginRight: '16px' }"
		      v-for="(item, index) in radiolist6"
		      :key="index"
		      :label="item.name"
		      :name="item.name"
		  	active-color="#2A9595"
		    >
		    </u-radio>
		  </u-radio-group>
        </view>
		<view class="section-divider"></view>
		<view class="urgent-section">
		  <view class="form-row no-border urgent-row">
		    <text class="row-label">是否加急</text>
		    <switch 
		      color="#2A9595" 
		      class="custom-switch"
		      :checked="yingjiis_anonymity"
			   @change="yingjiswitchChange"
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
		  
		  <view class="imagechooseView" @click="selectFile">
			  <view v-if="tempFilePaths.length == 0" class="custom-upload-btn">
				<image :src="selectphoto" ></image>
			  </view>
			  <view v-if="tempFilePaths.length > 0" class="ChoseenView">
				  <view class="imageItemV" v-for="(item,index) in tempFilePaths" :key="index">
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
		  <button class="submit-button" @click="yingjiTiJiao">提交</button>
		</view>
	  </template>

      <!-- ================= 室内报修表单  ================= -->
      <template v-if="currentTab === 1">
        <!-- 业主信息 -->
        <view class="form-row">
          <view class="row-left">
            <text class="row-label">业主信息</text>
            <text class="row-value" style="font-size: 15px; color: #333333;">{{houseKeeper}}</text>
          </view>
        </view>

        <!-- 报修房产 -->
        <view class="form-row" @click="chooseIndoorHouseType">
          <view class="row-left">
            <text class="row-label">报修房产</text>
            <text class="placeholder-text">{{indoorHouseTitle || '选择'}}</text>
          </view>
          <view class="dropdown-triangle"></view>
        </view>

        <!-- 联系方式 -->
        <view class="form-row">
          <view class="row-left">
            <text class="row-label">联系方式</text>
            <input class="row-input" v-model="indoorPhone" type="number" />
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

        <!-- 报修类型 -->
        <view class="form-row" @click="chooseInDoorEmergencytype">
          <view class="row-left">
            <text class="row-label">报修类型</text>
            <text class="placeholder-text">{{indooremergencyType || '选择'}}</text>
          </view>
          <view class="dropdown-triangle"></view>
        </view>

        <!-- 具体描述 -->
        <view class="form-row">
          <view class="row-left">
            <text class="row-label">具体描述</text>
            <input class="row-input" v-model="indoorDesc" placeholder="必填" placeholder-class="placeholder-text" type="text" />
          </view>
        </view>

        <!-- 维修人员 -->
        <view class="form-row no-border repair-worker-row">
          <text class="row-label">维修人员</text>
			<u-radio-group style="margin-top: 10px;margin-left: 80px;"
			v-model="radiovalue7"
			placement="row"
			@change="indoorgroupChange"
			>
			<u-radio
             :customStyle="{ marginRight: '16px' }"
             v-for="(item, index) in radiolist7"
             :key="index"
             :label="item.name"
             :name="item.name"
         	active-color="#2A9595"
           >
           </u-radio>
         </u-radio-group>
        </view>
		<view class="section-divider" ></view>
		<view class="urgent-section">
		  <view class="form-row no-border urgent-row">
		    <text class="row-label">是否加急</text>
		    <switch 
		      color="#2A9595" 
		      class="custom-switch"
		      :checked="indooris_anonymity"
			   @change="indoorswitchChange"
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
		  
		  <view class="imagechooseView" @click="indoorselectFile">
			  <view v-if="indoortempFilePaths.length == 0" class="custom-upload-btn">
				<image :src="selectphoto" ></image>
			  </view>
			  <view v-if="indoortempFilePaths.length > 0" class="ChoseenView">
				  <view class="imageItemV" v-for="(item,index) in indoortempFilePaths" :key="index">
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
		  <button class="submit-button" @click="indoorTiJiao">提交</button>
		</view>
      </template>

      <template v-if="currentTab === 2">
        <!-- 公共设施 -->
        <view class="form-row" @click="choosePublicEmergencytype">
          <view class="row-left">
            <text class="row-label">公共设施</text>
            <text class="placeholder-text">{{publicemergencyType || '选择'}}</text>
          </view>
          <view class="dropdown-triangle"></view>
        </view>
        <!-- 所在房产 -->
        <view class="form-row" @click="choosePublicHouseType">
          <view class="row-left">
            <text class="row-label">所在房产</text>
            <text class="placeholder-text">{{publicHouseTitle || '选择'}}</text>
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

        <!-- 维修人员 -->
        <view class="form-row no-border repair-worker-row">
          <text class="row-label">维修人员</text>
          
		  <u-radio-group style="margin-top: 10px;margin-left: 80px;"
		  			v-model="radiovalue8"
		  			placement="row"
		  			@change="publicgroupChange"
		  			>
		  			<u-radio
		      :customStyle="{ marginRight: '16px' }"
		      v-for="(item, index) in radiolist8"
		      :key="index"
		      :label="item.name"
		      :name="item.name"
		  	active-color="#2A9595"
		    >
		    </u-radio>
		  </u-radio-group>
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
       </template>

       <!-- ================= 居民点单表单 ================= -->
       <template v-if="currentTab === 3">
        <!-- 点单类型 -->
        <view class="form-row" @click="showOrderTypePopup = true">
          <view class="row-left">
            <text class="row-label">点单类型</text>
            <text class="placeholder-text">{{ diandanType || '选择' }}</text>
          </view>
          <view class="dropdown-triangle"></view>
        </view>
        <!-- 姓名 -->
        <view class="form-row">
          <view class="row-left">
            <text class="row-label">姓名</text>
            <input class="row-input" v-model="danName" placeholder="请填写姓名"  />
          </view>
        </view>
        <!-- 手机号 -->
        <view class="form-row">
          <view class="row-left">
            <text class="row-label">手机号</text>
            <input class="row-input" v-model="danPhone" placeholder="请填写手机号" type="number" />
          </view>
        </view>
        <!-- 联系地址 -->
        <view class="form-row" @click="chooseAddress">
          <view class="row-left">
            <text class="row-label">联系地址</text>
            <text class="placeholder-text">{{danAddress || '选择'}}</text>
          </view>
        </view>
        <!-- 点单描述 (大文本框区域) -->
        <view class="order-desc-wrap">
          <text class="row-label desc-title">点单描述</text>
          <textarea 
		    v-model="danDesc"
            class="desc-textarea" 
            placeholder="必填" 
            placeholder-class="placeholder-text"
            maxlength="200"
          />
        </view>
		<view class="upload-section">
		  <view class="section-header">
		    <text class="section-title">上传图片</text>
		  </view>
		  
		  <view class="imagechooseView" @click="diandanselectFile">
			  <view v-if="diandantempFilePaths.length == 0" class="custom-upload-btn">
				<image :src="selectphoto" ></image>
			  </view>
			  <view v-if="diandantempFilePaths.length > 0" class="ChoseenView">
				  <view class="imageItemV" v-for="(item,index) in diandantempFilePaths" :key="index">
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
		  <button class="submit-button" @click="diandanTiJiao">提交</button>
		</view>
       </template>
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

    
    <!-- 居民点单 - 点单类型 二级联动弹窗 -->
    <u-popup 
      :show="showOrderTypePopup" 
      mode="top" 
      bgColor="transparent" 
      @close="showOrderTypePopup = false"
    >
      <view class="cascader-box">
        <!-- 左侧：一级主分类 -->
        <scroll-view scroll-y class="cascader-left">
          <view 
            v-for="(item, index) in orderTypeList" 
            :key="index"
            class="cascader-left-item"
            :class="{ active: currentParentIndex === index }"
            @click="currentParentIndex = index"
          >
            <text class="item-text">{{ item.name }}</text>
            <text class="item-arrow">&gt;</text>
          </view>
        </scroll-view>

        <!-- 右侧：二级子分类 -->
        <scroll-view scroll-y class="cascader-right">
          <view 
            v-for="(subItem, subIndex) in orderTypeList[currentParentIndex].childList" 
            :key="subIndex"
            class="cascader-right-item"
            @click="onSelectOrderType(subItem)"
          >
            <text class="item-text">{{ subItem.name }}</text>
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
	import { ref,onMounted } from 'vue';
	import {serviceGetPingTaiRepairSheShi,serviceChangeHouseType,serviceGetPingTaiSetUp,
	serviceSheChaungOrder,serviceSheChaungOrderSetUp} from '@/api/service';
	import { getStorage, storage, storageKeys,BaseURL,uploadMultipleFiles } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
	import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
		
	//选中的 Tab 序号
	const currentTab = ref(0);
	//上门时间选择器
	const showTimePicker=ref(false);
	//  绑定的内部时间戳
	const timeValue=ref(Number(new Date()));
	// 最终展示的文字
	const doorTime = ref('');
	// 应急类型选择器逻辑
	const showEmergencySheet = ref(false);
	const emergencyType = ref('');
	//制弹窗是否显示
	const showOrderTypePopup = ref(false);
	const currentParentIndex = ref(0);
	const orderType = ref(1);
	const emergencyAllData = ref([]);
	const EmerGencyTypeList = ref([]);
	const emergencytypeId = ref();
	const houseListAllData = ref([]);
	const houseListTitleList = ref([]);
	const houseTitle = ref('');
	const hseid = ref('');
	const repairContent = ref('');
	const radiolist6 = ref([
	  {
		name: "物业公司",
		disabled: true,
	  },
	  {
		name: "平台",
		disabled: false,
	  },
	]);
	const radiovalue6 = ref("物业公司");
	const radiolist7 = ref([
	  {
		name: "物业公司",
		disabled: true,
	  },
	  {
		name: "平台",
		disabled: false,
	  },
	]);
	const radiovalue7 = ref("物业公司");
	const indoorOrderType = ref(1);
	const yingjiis_anonymity = ref(true);
	const indooris_anonymity = ref(true);
	const publicis_anonymity = ref(true);
	const selectphoto = ref('/static/mine/selectphoto.png');
	const tempFilePaths = ref([]);
	const finalImgValue = ref('');
	const managerId = ref('');
	const isUrgent = ref('');
	const houseKeeper = ref('');
	const indoorHouseTitle = ref('');
	const indoorhouseListAllData = ref([]);
	const indoorhouseListTitleList = ref([]);
	const indoorhseid = ref('');
	const indooremergencyAllData = ref([]);
	const indoorEmerGencyTypeList = ref([]);
	const indooremergencyType = ref('');
	const indooremergencytypeId = ref('');
	const indoormanagerId = ref('');
	const indoorPhone = ref('');
	const indoorDesc = ref('');
	const indoorisUrgent = ref('');
	const indoortempFilePaths = ref([]);
	const indoorfinalImgValue = ref('');
	const publicemergencyAllData = ref([]);
	const publicEmerGencyTypeList = ref([]);
	const publicemergencyType = ref('');
	const publicemergencytypeId = ref('');
	const publicHouseTitle = ref('');
	const publichouseListAllData = ref([]);
	const publichouseListTitleList = ref([]);
	const publichseid = ref('');
	const publicmanagerId = ref('');
	const publicDesc = ref('');
	const publicisUrgent = ref('');
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
	const orderTypeList = ref([]);
	const diandanType = ref('');
	const danName = ref('');
	const danPhone = ref('');
	const firstType = ref('');
	const secondType = ref('');
	const danAddress = ref('');
	const diandantempFilePaths = ref([]);
	const diandanfinalImgValue = ref('');
	const danDesc = ref('');
	const type_id = ref('');
	const latitude = ref('');
	const longitude = ref('');
	
	onLoad(() => {
		
		houseKeeper.value = storage.getRealName();
		indoorPhone.value = storage.getPhone();
		
	});
	onMounted(() => {
		getIndoorEmerGencyType();
		getHouseList();
		getPublicType();
		getEmerGencyType();
		getDianDanTypeList();
	});
	//获取点单类型
	const getDianDanTypeList = async() => {
		
		try {
			
			let param = {
			};
			serviceSheChaungOrder(param).then((res) =>{
							
				console.log(res);
				orderTypeList.value = res.result;
				
				
			});
		}catch (error) {
			console.log(error)
		}
		
	};
	//获取室内报修类型
	const getIndoorEmerGencyType = async() => {
		try {
			
			let param = {
				
				code:1
			};
			serviceGetPingTaiRepairSheShi(param).then((res) =>{
							
				console.log(res);
				indooremergencyAllData.value = res.result;
				indoorEmerGencyTypeList.value = res.result.map(item => item.name);
				
			});
		}catch (error) {
			console.log(error)
		}
	};
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
	//获取应急类型
	const getEmerGencyType = async() => {
		try {
			
			let param = {
				
				code:3
				
			};
			serviceGetPingTaiRepairSheShi(param).then((res) =>{
							
				console.log(res);
				emergencyAllData.value = res.result;
				EmerGencyTypeList.value = res.result.map(item => item.name);
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	const chooseEmergencytype = () => {
		uni.showActionSheet({
			itemList: EmerGencyTypeList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				emergencyType.value = EmerGencyTypeList.value[res.tapIndex];
				emergencytypeId.value = emergencyAllData.value[res.tapIndex].id;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});

	};
	//获取所在房产
	const getHouseList = () => {
		
		try {
			
			let param = {
				
				userid:storage.getUserId(),
				mainhouse:2,
				flag:2
				
			};
			serviceChangeHouseType(param).then((res) =>{
							
				console.log(res);
				houseListAllData.value = res.result;
				houseListTitleList.value = res.result.map(item => item.address);
				indoorhouseListAllData.value = res.result;
				indoorhouseListTitleList.value = res.result.map(item => item.address);
				publichouseListAllData.value = res.result;
				publichouseListTitleList.value = res.result.map(item => item.address);
				
			});
		}catch (error) {
			console.log(error)
		}
	};
	const chooseHouseType = () => {
		
		uni.showActionSheet({
			itemList: houseListTitleList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				houseTitle.value = houseListTitleList.value[res.tapIndex];
				hseid.value = houseListAllData.value[res.tapIndex].hseid;
				managerId.value = houseListAllData.value[res.tapIndex].manid;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const choosePublicHouseType = () => {
		
		uni.showActionSheet({
			itemList: publichouseListTitleList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				publicHouseTitle.value = publichouseListTitleList.value[res.tapIndex];
				publichseid.value = publichouseListAllData.value[res.tapIndex].hseid;
				publicmanagerId.value = publichouseListAllData.value[res.tapIndex].manid;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	const groupChange = (e:any) => {
				
		console.log(e);
		if (e === '物业公司') {
			
			 orderType.value = 1;
			
		}else if(e === '平台'){
			
			 orderType.value = 2;
			
		}
	};
	const indoorgroupChange = (e:any) => {
				
		console.log(e);
		if (e === '物业公司') {
			
			 indoorOrderType.value = 1;
			
		}else if(e === '平台'){
			
			 indoorOrderType.value = 2;
			
		}
	};
	const publicgroupChange = (e:any) => {
		console.log(e);
		if (e === '物业公司') {
			
			 publicOrderType.value = 1;
			
		}else if(e === '平台'){
			
			 publicOrderType.value = 2;
			
		}
	};
	const yingjiswitchChange = (e:any) => {
	        
		console.log(e);
		yingjiis_anonymity.value = e.detail.value;
		if(yingjiis_anonymity.value === false){
			
			isUrgent.value = 1;
			
		}else if(yingjiis_anonymity.value === true){
			
			isUrgent.value = 2;
		}
	};
	const indoorswitchChange = (e:any) => {
	        
		console.log(e);
		indooris_anonymity.value = e.detail.value;
		if(indooris_anonymity.value === false){
			
			indoorisUrgent.value = 1;
			
		}else if(indooris_anonymity.value === true){
			
			indoorisUrgent.value = 2;
		}
		
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
	const selectFile = () => {
	        
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				tempFilePaths.value = res.tempFilePaths;
				uploadFileImage();
			}
		});
	};
	
	const uploadFileImage = async() => {
		const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		finalImgValue.value = result.map(item => item.data).join(',');

	};
	//应急提交
	const yingjiTiJiao  = async() => {
		
		if(emergencyType.value.length === 0){
			
			uni.showToast({
				title: '请选择应急类型',
				icon: 'none'
			});
			return;
		}
		if(hseid.value.length === 0){
			
			uni.showToast({
				title: '请选择所在房产',
				icon: 'none'
			});
			return;
		}
		if(repairContent.value.length === 0){
			
			uni.showToast({
				title: '请填写具体描述',
				icon: 'none'
			});
			return;
		}
		if(finalImgValue.value.length === 0){
			
			uni.showToast({
				title: '请上传图片',
				icon: 'none'
			});
			return;
		}
		
		try {
		
			let param = {
		
				maintainType:1,
				repairUId: getStorage(storageKeys.userId,''),
				repairPeople:storage.getRealName()?storage.getRealName():storage.getNickName(),
				repairNo:hseid.value,
				repairIndustry:houseTitle.value,
				phone: storage.getPhone(),
				managerId:managerId.value,
				pic:finalImgValue.value,
				voice:'',
				voiceDuration:'',
				reparirTypeId:emergencytypeId.value,
				isUrgent:isUrgent.value,
				repairContent:repairContent.value,
				repairList:'',
				houseId:storage.getHseid(),
				orderType:orderType.value
				
			};
			const res = await serviceGetPingTaiSetUp(param);
		
			console.log(res);
			if(res.success == true){
				
				uni.showToast({
					title: '提交成功',
					icon: 'none'
				});
				uni.navigateBack();

			}else
			{
				uni.showToast({
					title: res.message,
					icon: 'none'
				});
				
			}
		
			
		} catch (error) {
			console.log(error)
		}
		
	};
	const indoorselectFile = () => {
	        
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				indoortempFilePaths.value = res.tempFilePaths;
				indooruploadFileImage();
			}
		});
	};
	
	const indooruploadFileImage = async() => {
		const result = await uploadMultipleFiles([],indoortempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		indoorfinalImgValue.value = result.map(item => item.data).join(',');
	
	};
	//室内报修提交
	const indoorTiJiao  = async() => {
		
		
		if(indoorhseid.value.length === 0){
			
			uni.showToast({
				title: '请选择报修房产',
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
		if(indooremergencyType.value.length === 0){
			
			uni.showToast({
				title: '请选择报修类型',
				icon: 'none'
			});
			return;
		}
		if(indoorDesc.value.length === 0){
			
			uni.showToast({
				title: '请填写具体描述',
				icon: 'none'
			});
			return;
		}
		if(indoorfinalImgValue.value.length === 0){
			
			uni.showToast({
				title: '请上传图片',
				icon: 'none'
			});
			return;
		}
		
		try {
		
			let param = {
		
				maintainType:2,
				repairUId: getStorage(storageKeys.userId,''),
				repairPeople:storage.getRealName()?storage.getRealName():storage.getNickName(),
				repairNo:indoorhseid.value,
				repairIndustry:indoorHouseTitle.value,
				phone: storage.getPhone(),
				managerId:indoormanagerId.value,
				pic:indoorfinalImgValue.value,
				voice:'',
				voiceDuration:'',
				visitTime:doorTime.value,
				reparirTypeId:indooremergencytypeId.value,
				isUrgent:indoorisUrgent.value,
				repairContent:indoorDesc.value,
				repairList:'',
				houseId:storage.getHseid(),
				orderType:indoorOrderType.value
				
			};
			const res = await serviceGetPingTaiSetUp(param);
		
			console.log(res);
			if(res.success == true){
				
				uni.showToast({
					title: '提交成功',
					icon: 'none'
				});
				uni.navigateBack();
			
			}else
			{
				uni.showToast({
					title: res.message,
					icon: 'none'
				});
				
			}
		
			
		} catch (error) {
			console.log(error)
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
		console.log(result);
		publicfinalImgValue.value = result.map(item => item.data).join(',');
	
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
		if(publichseid.value.length === 0){
			
			uni.showToast({
				title: '请选择所在房产',
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
		
				maintainType:3,
				repairUId: getStorage(storageKeys.userId,''),
				repairPeople:storage.getRealName()?storage.getRealName():storage.getNickName(),
				repairNo:publichseid.value,
				repairIndustry:publicHouseTitle.value,
				phone: storage.getPhone(),
				managerId:publicmanagerId.value,
				pic:publicfinalImgValue.value,
				voice:'',
				voiceDuration:'',
				reparirTypeId:publicemergencytypeId.value,
				isUrgent:publicisUrgent.value,
				repairContent:publicDesc.value,
				repairList:'',
				houseId:storage.getHseid(),
				orderType:publicOrderType.value
				
			};
			const res = await serviceGetPingTaiSetUp(param);
		
			console.log(res);
			if(res.success == true){
				
				uni.showToast({
					title: '提交成功',
					icon: 'none'
				});
				uni.navigateBack();
			
			}else
			{
				uni.showToast({
					title: res.message,
					icon: 'none'
				});
				
			}
		
			
		} catch (error) {
			console.log(error)
		}
		
	};
	const diandanselectFile = () => {
	        
		uni.chooseImage({
			count: 9, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function (res) {
				console.log(res.tempFilePaths);
				diandantempFilePaths.value = res.tempFilePaths;
				publicuploadFileImage();
			}
		});
	};
	
	const diandanuploadFileImage = async() => {
		const result = await uploadMultipleFiles([],diandantempFilePaths.value,getStorage(storageKeys.token,''));
		console.log(result);
		diandanfinalImgValue.value = result.map(item => item.data).join(',');
	
	};
	//居民点单提交
	const diandanTiJiao  = async() => {
		
		if(diandanType.value.length === 0){
			
			uni.showToast({
				title: '请选择点单类型',
				icon: 'none'
			});
			return;
		}
		if(danName.value.length === 0){
			
			uni.showToast({
				title: '请填写姓名',
				icon: 'none'
			});
			return;
		}
		
		if(danPhone.value.length === 0){
			
			uni.showToast({
				title: '请填写手机号',
				icon: 'none'
			});
			return;
		}
		if(danAddress.value.length === 0){
			
			uni.showToast({
				title: '请选择联系地址',
				icon: 'none'
			});
			return;
		}
		if(danDesc.value.length === 0){
			
			uni.showToast({
				title: '请填写点单描述',
				icon: 'none'
			});
			return;
		}
		if(diandanfinalImgValue.value.length === 0){
			
			uni.showToast({
				title: '请上传图片',
				icon: 'none'
			});
			return;
		}
		
		try {
		
			let param = {
		
				
				userId: getStorage(storageKeys.userId,''),
				firstType:firstType.value,
				type_id:type_id.value,
				secondType:secondType.value,
				name:danName.value,
				mobile: danPhone.value,
				address:danAddress.value,
				pic:publicfinalImgValue.value,
				voice:'',
				voiceDuration:'',
				latitude:latitude.value,
				longitude:longitude.value,
				content:danDesc.value,
				
				
			};
			const res = await serviceSheChaungOrderSetUp(param);
		
			console.log(res);
			
			if(res.success == true){
				
				uni.showToast({
					title: '提交成功',
					icon: 'none'
				});
				uni.navigateBack();
			
			}else
			{
				uni.showToast({
					title: res.message,
					icon: 'none'
				});
				
			}
		
			
		} catch (error) {
			console.log(error)
		}
		
	};
	const changeTab = (index: number) => {
	   currentTab.value = index;
	   
	}
	
	
	const chooseInDoorEmergencytype = () => {
		uni.showActionSheet({
			itemList: indoorEmerGencyTypeList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				indooremergencyType.value = indoorEmerGencyTypeList.value[res.tapIndex];
				indooremergencytypeId.value = indooremergencyAllData.value[res.tapIndex].id;
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	
	};
	
	const chooseIndoorHouseType = () => {
		
		uni.showActionSheet({
			itemList: indoorhouseListTitleList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log(this.itemList[res.tapIndex])
				indoorHouseTitle.value = indoorhouseListTitleList.value[res.tapIndex];
				indoorhseid.value = indoorhouseListAllData.value[res.tapIndex].hseid;
				indoormanagerId.value = indoorhouseListAllData.value[res.tapIndex].manid;
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
	}

	const formatter = (type: string, value: any) => {
	  if (type === 'year') return `${value}年`
	  if (type === 'month') return `${value}月`
	  if (type === 'day') return `${value}日`
	  if (type === 'hour') return `${value}时`
	  if (type === 'minute') return `${value}分`
	  return value;
	}

	const onSelectType = (typeName: string) => {
	  emergencyType.value = typeName;
	  showEmergencySheet.value = false;
	}

	const onSelectOrderType = (subItem:any)=>{
	   const parentName = orderTypeList.value[currentParentIndex.value].name
	   diandanType.value = `${parentName} ${subItem.name}`;
	   firstType.value = parentName;
	   secondType.value = subItem.name;
	   type_id.value = subItem.id;
	   showOrderTypePopup.value = false;
	}
	//选择地址
	
	const chooseAddress = () => {
		
		uni.chooseLocation({
			
			success: function (res) {
					console.log('位置名称：' + res.name);
					console.log('详细地址：' + res.address);
					console.log('纬度：' + res.latitude);
					console.log('经度：' + res.longitude);
					danAddress.value = res.address;
					latitude.value= res.latitude;
					longitude.value = res.longitude;
					console.log(danAddress.value);
			},
			fail() {
				uni.showToast({
					title:'获取位置信息失败',
					icon:'none',
				})
			}
		})
	}
	const goBack = () => {
	        
		uni.navigateBack()
	}
	
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100vh;
  background-color: #ffffff;
  padding-bottom: 20px;
}

/* ================= 导航栏样式 ================= */
.nav-left {
  display: flex;
  align-items: center;
  padding-left: 4px;
}

.nav-title {
  color: #ffffff;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.nav-right {
  display: flex;
  align-items: center;
  padding-right: 12px;
}

.history-text {
  color: #ffffff;
  font-size: 14px;
}

/* ================= 顶部分类 Tab 栏 ================= */
.tab-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 48px;
  background-color: #ffffff;
}

.tab-item {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;

  .tab-text {
    font-size: 15px;
    color: #333333;
  }

  &.active {
    .tab-text {
      color: #2A9595;
      font-weight: 500;
    }

    .tab-active-line {
      position: absolute;
      bottom: 2px;
      width: 32px;
      height: 3px;
      background-color: #2A9595;
      border-radius: 2px;
    }
  }
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

</style>
