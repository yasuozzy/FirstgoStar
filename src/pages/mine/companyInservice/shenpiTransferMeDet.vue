<template>
    <view class="main">
        <u-navbar
          title="转发详情"
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
        </u-navbar>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 12px;"
			  :src="dataDict.headImage"
			  width="35px"
			  height="35px"
			></u-image>
			<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;">转发人:{{dataDict.username}}</view>
			
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 4%;margin-top: 5px;width: 92%;font-size: 12px;color: gray;">{{dataDict.problem}}</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">所属公司</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;;">{{dataDict.eastName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">所属部门</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.deptName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">申请人</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.applyUserName ? dataDict.applyUserName:realName}}</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
			<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批类型</view>
			<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;">{{dataDict.applyTypeName}}</view>
		</view>
		<view v-if="applyType == 4 || applyType === '4'">
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假类型</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 63%;">{{dataDict.leaveTypeName}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">开始时间</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.startTime}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">结束时间</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.endTime}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假天数</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.dayNum}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">请假事由</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.content}}</view>
			</view>
		</view>
		<view v-else>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批内容</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 63%;">{{dataDict.content}}</view>
			</view>
			<view style="display: flex;flex-direction: row;width: 100%;height: 30px;margin-top: 10px;">
				<view style="margin-left: 15px;margin-top: 10px;font-size: 12px;">审批详情</view>
				<view style="margin-left: 10px;margin-top: 10px;font-size: 12px;width: 60%;">{{dataDict.details}}</view>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 60px;margin-top: 10px;">
			<view style="margin-top: 10px;margin-left: 35px;font-size: 12px;color: dimgray;">图片</view>
			<view style="margin-top: 10px;margin-left: 15px;font-size: 12px;width: 70%;display: flex;flex-direction: row;">
				<view class="picViewItem" v-for="(item,index) in picImgs" :key="index">
					<u-image style="margin-top: 10px;"
					  :src="item"
					  width="40px"
					  height="40px"
					></u-image>
				</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {CompanyInserviceNormalShenPiTransferMeDetail} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
	const idstring = ref('');
	const dataDict = ref({});
	const fileList = ref([]);
	const picImgs = ref([]);
	const realName = ref('');
	const applyType = ref();
	
	onLoad((options:any) => {
		
		realName.value =storage.getRealName();
		idstring.value = options.id;
		applyType.value = options.applyType;
	});
	onMounted(() => {
		loadData();
	});
	const loadData = async() => {
		
		try {
			
			let param = {
				
				id:idstring.value,
				userId:storage.getUserId(),
				
			};
			const res = await CompanyInserviceNormalShenPiTransferMeDetail(param);
							
			console.log(res);
			dataDict.value = res.result;
			
			picImgs.value = res.result.picImgs;
			
			fileList.value = res.result.enclosureList;
			
		   
		}catch (error) {
			console.log(error)
		}
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
		  .picViewItem{
		  		 display: flex;
		  		 flex-direction: row;
		  }
}
</style>