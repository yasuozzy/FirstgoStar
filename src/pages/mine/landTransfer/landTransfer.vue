<template>
  <view class="main">
    <!-- 顶部导航栏 -->
    <u-navbar
      title="待流转土地"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff; font-size: 17px; font-weight: 500;"
    >
      <template #left>
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
        </view>
      </template>
      <template #right>
        <view class="u-nav-slot" slot="right" @click="toHistory">
          <text class="history-btn" style="font-size: 14px;" @click="toHistory">历史记录</text>
        </view>
      </template>
    </u-navbar>

    <!-- 搜索栏 -->
    <view class="search-container">
      <view class="search-box">
        <u-icon name="search" size="18" color="#999"></u-icon>
        <input
			v-model="content"
          class="search-input"
          type="text"
          placeholder="搜索"
          placeholder-style="color: #999; font-size: 14px;"
        />
      </view>
    </view>

    <!-- 土地列表区域 -->
    <view class="list-container">
      <view class="card-item" v-for="(item, index) in landList" :key="index">
        <view class="card-title">{{ item.location }}土地流转</view>
        
        <view class="card-body">
          <view class="info-row">
            <text class="label">联系人姓名：</text>
            <text class="value">{{ item.name }}</text>
          </view>
          <view class="info-row">
            <text class="label">联系人电话：</text>
            <text class="value">{{ item.mobile }}</text>
          </view>
          <view class="info-row">
            <text class="label">土地面积：</text>
            <text class="value">{{ item.area }}</text>
          </view>
          <view class="info-row">
            <text class="label">议价费用：</text>
            <text class="value">{{ item.rent }}</text>
          </view>
        </view>

        <!-- 卡片底部按钮 -->
        <view class="card-footer">
          <view class="detail-btn" @click="toDetail(item)">查看详情</view>
        </view>
      </view>
    </view>

    <!-- 土地流转类型选择弹窗结构 -->
    <view class="modal-mask" v-if="showModal">
      <view class="modal-box">
        <!-- 弹窗标题 -->
        <view class="modal-title">请选择土地流转类型</view>

        <!-- 单选选项区域 -->
        <view class="modal-content">
          <!-- 个人选项（默认选中） -->
          <view class="radio-item" @click="selectType('personal')">
            <!-- radio-icon(基础圆圈样式)，:class 会根据 selectedType(记录当前选中项) 自动添加 checked(选中样式) 或 unchecked(未选中样式) -->
            <view class="radio-icon" :class="selectedType == 'personal'? 'checked' : 'unchecked' ">
              <u-icon name="checkbox-mark" size="9" color="#ffffff" v-if="selectedType == 'personal'"></u-icon>
            </view>
            <text class="radio-label">个人</text>
          </view>

          <!-- 公司选项（未选中） -->
          <view class="radio-item" @click="selectType('company')">
            <!-- 同理，这里只保留 radio-icon(基础圆圈样式)，避免和动态样式打架 -->
            <view class="radio-icon" :class="selectedType == 'company'? 'checked' : 'unchecked' ">
              <u-icon name="checkbox-mark" size="6" color="#ffffff" v-if="selectedType == 'company'"></u-icon>
            </view>
            <text class="radio-label">公司</text>
          </view>
        </view>

        <!-- 底部按钮区域 -->
        <view class="modal-footer">
          <view class="footer-btn cancel-btn" @click="closeModal()">取消</view>
          <view class="footer-divider"></view>
          <view class="footer-btn confirm-btn" @click="confirmType()">确认</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	import { onTabItemTap } from '@dcloudio/uni-app';
	import { ref,onMounted } from 'vue';
	import {MineLandrentGetLandWaitList,
	MineLandrentGetLandWaitListGetUserYnSubmitComInfo} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

	// 导航栏主题背景色
	const bgColor = ref("#2A9595");
	const landList = ref([]);
	const hasMore = ref(true);       // 是否还有更多数据
	const noMore = ref(false);       // 是否没有更多数据了
	const page = ref(1);
	const content = ref();
	const detailItem = ref({});
	// 控制弹窗显示
	const showModal = ref(false);
	//控制弹窗出现默认选人(默认个人)
	const selectedType = ref('personal');
	
	
	onMounted(() => {
	  loadData();
	});
	//下拉刷新
	onPullDownRefresh(() => {
			
		 // 重置状态
		page.value = 1;
		hasMore.value = true;
		noMore.value = false;
		loadData();
	});
	//上拉刷新
	onReachBottom(() => {
			
		if (!hasMore.value) {
			
			return
		}
		page.value += 1;
		loadData();
	});
	       
	        
	const loadData = async() => {
	        	
		try {
			
			let param = {
				user_id:storage.getUserId(),
				currentPage:page.value,
				size:10,
				index:content.value?content.value:''
	
			};
			const res = await MineLandrentGetLandWaitList(param);
							
			console.log(res);
			if (page.value === 1) {
										
				landList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				res.result.forEach(item => {
					landList.value.push(item)
				});
			}
			
			if (res.result.length === 0) {
				// 没有更多数据了
				hasMore.value = false
				noMore.value = true
				uni.showToast({
					title:'没有更多数据',
					icon:'none'
				})
				return
			}
			 // 如果返回的数据少于每页数量，说明是最后一页
			if (res.result.length < 10) {
				hasMore.value = false
				noMore.value = true
			}
				
				
		}catch (error) {
			console.log(error)
		}finally {
			uni.stopPullDownRefresh()
		}
	};
	// 导航返回
	const goBack = () => {
	  uni.navigateBack();
	};
	

	// 点击卡片“查看详情”，打开选择流转类型的弹窗
	const  toDetail =(item:any)=>{
		 showModal.value = true;
		 detailItem.value = item;
	}

	// 点击“取消”按钮，关闭弹窗
	const closeModal=()=>{
		showModal.value= false
	}

	// 点击切换流转类型（传入 'personal' 为个人，传入 'company' 为公司）
	const selectType = (type:string)=>{
		   selectedType.value=type
	}

	// 点击“确认”按钮，关闭弹窗并完成选择
	const confirmType =()=>{
		showModal.value = false;

		//判断是个人还是公司
		if(selectedType.value =='personal'){
		  uni.navigateTo({
			url:`/pages/mine/landTransfer/personalTransfer?land_id=${detailItem.value.land_id}`
		  })
		}else{
			//公司
			submitInfo();
		}
	}
	const submitInfo = async() => {
		
		//
		try {
			
			let param = {
				
				user_id:storage.getUserId(),
				mobile:storage.getPhone()
				
			};
			const res = await MineLandrentGetLandWaitListGetUserYnSubmitComInfo(param);
							
			console.log(res);
			const resultData = res.result;
			if(resultData.status === '0'){
				
				//0审核中
				uni.navigateTo({
					url:'/pages/mine/landTransfer/companyInfoInShenhe'
				})
				
			}else if(resultData.status === '1'){
				
				//返回值为1时直接跳转签订协议页面，走查询公司信息接口，将公司信息显示在页面中不可修改，
				uni.navigateTo({
					url:'/pages/mine/landTransfer/conpanySetUpMessage'
				})
			}else
			{
				//-1未提交过和2被拒绝，跳转提交公司信息页面
				uni.navigateTo({
					url:'/pages/mine/landTransfer/addCompanyInfomation'
				})
			}
			
		}catch (error) {
			console.log(error)
		}
	};
	// 历史记录跳转
	const toHistory = ()=>{
		uni.navigateTo({
			url:'/pages/mine/landTransfer/transferHistory'
		})
	}
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  background-color: #f2f4f7;
  padding-bottom: 20px;
}

/* 导航栏右侧历史记录文字 */
.history-btn {
  color: #ffffff;
  font-size: 17px;
  font-weight: 500;
  margin-right: 6px;
}

/* 搜索框外部容器 */
.search-container {
  padding: 10px 14px;
}

/* 搜索框主体 */
.search-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #2A9595;
  border-radius: 6px;
  height: 33px;
  padding: 0 10px;
}

/* 搜索输入框 */
.search-input {
  flex: 1;
  margin-left: 8px;
  font-size: 14px;
  color: #333333;

}

/* 列表容器 */
.list-container {
  display: flex;
  flex-direction: column;
  padding: 0 14px;
}

/* 卡片样式 */
.card-item {
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

/* 卡片标题（机动地 / 华海大厦用地 / 人名广场） */
.card-title {
  font-size: 17px;
  font-weight: 400;
  color: #333333;
  padding: 14px 14px 10px 14px;
}

/* 卡片中间信息内容 */
.card-body {
  padding: 0 14px 12px 14px;
}

/* 每一行信息 */
.info-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  line-height: 1.4;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    color: #333333;
    min-width: 95px;
    display: inline-block;
  }

  .value {
    color: #7f7f7f;
    flex: 1;
  }
}

/* 卡片底部操作栏 */
.card-footer {
  border-top: 1px solid #f0f0f0;
  padding: 10px 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* 查看详情按钮 */
.detail-btn {
  background-color: white;
  color: #2A9595;
  font-size: 13px;
  padding: 6px 16px;
  border-radius: 4px;
  text-align: center;
  border: 1px #2A9595 solid;
}

/* ================= 弹窗样式 ================= */

/* 弹窗半透明遮罩背景 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* 弹窗主体卡片 */
.modal-box {
  width: 90%;
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
}

/* 弹窗标题 */
.modal-title {
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: #333333;
  padding: 28px 20px 18px 20px;
}

/* 单选项内容区（加大上下间距，更宽敞） */
.modal-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 0 46px 0;
}

/* 单个单选选项 */
.radio-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 28px;
}

/* 单选圆圈图标通用（调小到精细的 16px） */
.radio-icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}

/* 选中状态（绿色实心 + 白色对勾） */
.radio-icon.checked {
  background-color: #2A9595;
  border: 1px solid #2A9595;
}

/* 未选中状态（灰色空心圆） */
.radio-icon.unchecked {
  border: 1.5px solid #cccccc;
  background-color: transparent;
}

/* 选项文字（#757575 颜色） */
.radio-label {
  font-size: 15px;
  color: #757575;
}

/* 弹窗底部操作栏 */
.modal-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  height: 52px;
}

/* 底部按钮通用样式 */
.footer-btn {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}

/* 取消按钮 */
.cancel-btn {
  color: #999999;
}

/* 中间分割线 */
.footer-divider {
  width: 1px;
  height: 24px;
  background-color: #eeeeee;
}

/* 确认按钮 */
.confirm-btn {
  color: #2979ff;
}
</style>
