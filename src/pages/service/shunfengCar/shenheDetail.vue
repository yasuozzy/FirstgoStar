<template>
    <view class="main">
        <u-navbar
          title="审核详情"
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
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">姓名</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;color: gray;">{{dataDict.userName}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">手机号码</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;color: gray;">{{dataDict.phone}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">身份证号</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;color: gray;">{{dataDict.idcard}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">紧急联系人</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;color: gray;">{{dataDict.contactperson}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;">紧急联系人电话</view>
			<view style="font-size: 14px;margin-top: 15px;margin-left: 15px;color: gray;">{{dataDict.contactmobile}}</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;margin-top: 10px;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;width: 35%;">配送用车</view>
			<u-radio-group style="margin-top: 10px;"
			  v-model="Writevalue"
			  placement="row"
			 
			>
			  <u-radio
			    :customStyle="{ marginRight: '16px' }"
			    v-for="(item, index) in WriteOpinion"
			    :key="index"
			    :label="item.name"
			    :name="item.name"
				:disabled="true"
				active-color="#2A9595"
			  >
			  </u-radio>
			</u-radio-group>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<input v-if="is_fill == 1" :value="dataDict.carno" class="carIdInput" placeholder="输入车牌号" :disabled="true" type="text" />
		<input v-if="is_fill == 1" :value="dataDict.driverlicense" class="carIdInput" placeholder="输入驾照编号" :disabled="true" type="text" />
		<input v-if="is_fill == 1" :value="dataDict.vehiclelicense" class="carIdInput" placeholder="输入行驶证编号" :disabled="true" type="text" />
		<input v-if="is_fill == 0" :value="dataDict.carno" class="carIdInput" placeholder="输入车辆型号" :disabled="true" type="text" />
		<view style="height: 140px;align-items: center;margin-top: 20px;width: 100%;justify-content: center;display: flex;flex-direction: column;">
			<image style="width: 220px;height: 120px;margin-top: 15px;" :src="dataDict.carpic"></image>
		</view>
		<view v-if="is_fill == 1" style="height: 140px;align-items: center;margin-top: 20px;width: 100%;justify-content: center;display: flex;flex-direction: column;">
			<image style="width: 220px;height: 120px;margin-top: 15px;" :src="dataDict.driverpic"></image>
		</view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;">服务机构</view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: gray;">(以群苑物联网运营中心为中心)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;" >
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;width: 90%;">东服务站点</view>
			<image style="margin-top: 17px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>	
		<view  style="font-size: 14px;margin-top: 10px;margin-left: 4%;width: 92%;color: #2A9595;">{{eastTitle}}</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;width: 90%;">西服务站点</view>
			<image style="margin-top: 17px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>	
		<view  style="font-size: 14px;margin-top: 10px;margin-left: 4%;width: 92%;color: #2A9595;">{{westTitle}}</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;" >
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;width: 90%;">南服务站点</view>
			<image style="margin-top: 17px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>	
		<view  style="font-size: 14px;margin-top: 10px;margin-left: 4%;width: 92%;color: #2A9595;">{{southTitle}}</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;" >
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;width: 90%;">北服务站点</view>
			<image style="margin-top: 17px;width: 12px;height: 8px;" src="/src/static/home/downImage.png"></image>
		</view>	
		<view  style="font-size: 14px;margin-top: 10px;margin-left: 4%;width: 92%;color: #2A9595;">{{northTitle}}</view>
		<view style="width: 100%;display: flex;flex-direction: row;margin-top: 10px;">
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: black;">证件照</view>
			<view style="margin-top: 15px;margin-left: 10px;font-size: 14px;color: gray;">(身份证正反面以及手持身份证各一张)</view>
		</view>
		<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 15px;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view style="height: 140px;align-items: center;margin-top: 20px;width: 100%;justify-content: center;display: flex;flex-direction: column;" >
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="dataDict.idCardPicImgs[0]"></image>
				<view style="text-align: center;font-size: 11px;color: gray;margin-top: 5px;width: 100%;">点击上传身份证正面</view>
			</view>
			<view style="height: 140px;align-items: center;width: 100%;justify-content: center;display: flex;flex-direction: column;"   >
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="dataDict.idCardPicImgs[1]"></image>
				<view style="text-align: center;font-size: 11px;color: gray;margin-top: 5px;width: 100%;">点击上传身份证反面</view>
			</view>
			<view style="height: 140px;align-items: center;width:100%;justify-content: center;display: flex;flex-direction: column;" >
				
				<image style="width: 220px;height: 120px;margin-top: 5px;" :src="dataDict.idCardPicImgs[2]"></image>
				<view style="text-align: center;font-size: 11px;color: gray;margin-top: 5px;width: 100%;">手持身份证正面照</view>
			</view>
		</view>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {ServiceShunFengYueCardeliveryDetail,
	ServiceShunFengYueCarGetQueryOffice} from '@/api/service';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const dataDict = ref({});
	const deliveryId = ref('');
	const WriteOpinion = ref([
	  {
		name: "机动车",
		disabled: true,
	  },
	  {
		name: "非机动车",
		disabled: false,
	  },
	]);
	const Writevalue = ref("机动车");
	const is_fill = ref(1);
	const east = ref([]);
	const south = ref([]);
	const north = ref([]);
	const west = ref([]);
	const eastList = ref([]);
	const westList = ref([]);
	const southList = ref([]);
	const northList = ref([]);
	const eastTitle = ref('');
	const westTitle = ref('');
	const southTitle = ref('');
	const northTitle = ref('');
	
	onLoad((options:any) => {
		
		deliveryId.value = options.deliveryId;
		
	});
	onMounted(() => {
		loadData();
		getNetPoints();
	});
	const loadData = () => {
		try {
			let param = {
				userId: storage.getUserId(),
				id: deliveryId.value
			};
			ServiceShunFengYueCardeliveryDetail(param).then((res: any) => {
				console.log(res);
				dataDict.value = res.result;
				if(res.result.cartype == 1){
					
					Writevalue.value = '机动车';
					is_fill.value = 1;
					
				}else
				{
					Writevalue.value = '非机动车';
					is_fill.value = 0;
				}
				eastList.value = res.result.eastList;
				westList.value = res.result.westList;
				southList.value = res.result.southList;
				northList.value = res.result.northList;
				
			});
		} catch (error) {
			console.log(error);
		}
	};
	const getNetPoints = async() => {
		
		try {
			let param = {
			};
			ServiceShunFengYueCarGetQueryOffice(param).then((res: any) => {
				console.log(res);
				// dataList.value = res.result;
				east.value = res.result.east;
				let eastArr = [];
				for (var index = 0; index < east.value.length; index++) {
					var element = east.value[index];
					for (var j = 0; j < eastList.value.length; j++) {
						var jelement = eastList.value[j];
						if(jelement === element.manid){
							eastArr.push(element);
						}
					}
				}
				eastTitle.value = eastArr.map(item => `${item.name}：${item.address}`).join('，');
				west.value = res.result.west;
				let westArr = [];
				for (var index = 0; index < west.value.length; index++) {
					var element = west.value[index];
					for (var j = 0; j < westList.value.length; j++) {
						var jelement = westList.value[j];
						if(jelement === element.manid){
							westArr.push(element);
						}
					}
				}
				westTitle.value = westArr.map(item => `${item.name}：${item.address}`).join('，');
				south.value = res.result.south;
				let southArr = [];
				for (var index = 0; index < south.value.length; index++) {
					var element = south.value[index];
					for (var j = 0; j < southList.value.length; j++) {
						var jelement = southList.value[j];
						if(jelement === element.manid){
							southArr.push(element);
						}
					}
				}
				southTitle.value = southArr.map(item => `${item.name}：${item.address}`).join('，');
				north.value = res.result.north;
				let northArr = [];
				for (var index = 0; index < north.value.length; index++) {
					var element = north.value[index];
					for (var j = 0; j < northList.value.length; j++) {
						var jelement = northList.value[j];
						if(jelement === element.manid){
							northArr.push(element);
						}
					}
				}
				northTitle.value = northArr.map(item => `${item.name}：${item.address}`).join('，');
				
			});
		} catch (error) {
			console.log(error);
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
		  .carIdInput{
			margin-left: 4%;
			width: 92%;
			height: 30px;
			margin-top: 10px;
			border: 1px darkgray solid;
			font-size: 13px;
		  }
}
</style>