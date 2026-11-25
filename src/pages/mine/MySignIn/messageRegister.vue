<template>
    <view class="main">
        <u-navbar
          title="信息登记"
          
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
		<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;">房屋信息</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">信息查询</view>
			<input class="searchlocation" v-model="checkString" placeholder="请填写" type="text" />
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;" @click="checkClick()">查询 ></view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">省级站点</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseAreaData(0)">{{province_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">市级站点</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseAreaData(1)">{{city_Name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">县(市)区站点</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseAreaData(2)">{{district_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">镇街站点</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseAreaData(3)">{{street_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">社区物业</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseAreaData(4)">{{region_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">村居物业</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseAreaData(5)">{{grid_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">区域网格</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseAreaData(6)">{{area_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">楼宇(小组)</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseAreaData(7)">{{build_name}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">房屋编号</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchInputView" v-model="house_num" placeholder="请填写" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">网格员</view>
			<input class="searchInputView" v-model="grid_man" placeholder="请填写" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">楼长</view>
			<input class="searchInputView" v-model="build_manager" placeholder="请填写" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">居住人数</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchInputView" v-model="house_user_amount" placeholder="请填写" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">房间用途</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<!-- <input class="searchInputView" v-model="house_application" placeholder="请填写" type="text" /> -->
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;color: dimgray;" @click="chooseApplication()">{{house_application}}</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">户型</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchInputView" v-model="house_type" placeholder="请填写" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">房屋产权人</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchInputView" v-model="house_property" placeholder="请填写" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">联系电话</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="searchInputView" v-model="mobile" placeholder="请填写" type="text" />
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">建筑面积</view>
			<view style="color: red;margin-top: 15px;">*</view>
			<input class="AreaInputView" v-model="area" placeholder="请填写" type="text" />
			<view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">平方米</view>
		</view>
		<view style="margin-top: 15px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
		<view class="buttonView" @click="tijiaoClick()">提交</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted } from 'vue';
	import {MinePartyWangGeMessageChooseProviceInfo,MinePartyWangGeMessageSubmitHouseInfo} from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const checkString = ref('');
	const province_name = ref('请选择');
	const province_id = ref('');
	const city_Name = ref('请选择');
	const city_id = ref('');
	const district_name = ref('请选择');
	const district_id = ref('');
	const street_name = ref('请选择');
	const street_id = ref('');
	const region_name = ref('请选择');
	const region_id = ref('');
	const grid_name = ref('请选择');
	const grid_id = ref('');
	const area_name = ref('请选择');
	const area_id = ref('');
	const build_name = ref('请选择');
	const build_id = ref('');
	const house_num = ref('');
	const grid_man = ref('');
	const build_manager = ref('');
	const house_user_amount = ref('');
	const applicationList = ref(['自住','出租','待租','空置']);
	const house_application = ref('请选择');
	const house_type = ref('');
	const house_property = ref('');
	const mobile = ref('');
	const area = ref('');
	const quyu_id = ref('');
	const shengArray = ref([]);
	const shengTitleList = ref([]);
	const shiArray = ref([]);
	const shiTitleList = ref([]);
	const quArray = ref([]);
	const quTitleList = ref([]);
	const jiedaoArray = ref([]);
	const jiedaoTitleList = ref([]);
	const shequArray = ref([]);
	const shequTitleList = ref([]);
	const cunjuArray = ref([]);
	const cunjuTitleList = ref([]);
	const wanggeArray = ref([]);
	const wanggeTitleList = ref([]);
	const louyuArray = ref([]);
	const louyuTitleList = ref([]);
		
	onMounted(() => {
	  // 监听事件
	  eventBus.on('refresh-address', handleRefresh);
	});
	onUnmounted(() => {
	  // 组件卸载时，务必移除监听！
	  eventBus.off('refresh-address', handleRefresh);
	});
	const checkClick = () => {
			
		if (checkString.value.length == 0) {
			
			uni.showToast({
				title:'请输入查询内容',
				icon:'none'
			});
			return;
		}
		uni.navigateTo({
			url:`/pages/mine/PartyQY/chexkMessage?checkString=${encodeURIComponent(checkString.value)}`
		})
	};
	const handleRefresh = (data:{}) => {
		
		console.log('收到刷新事件:', data);
		province_name.value = data.province_name;
		province_id.value = data.province_id;
		city_Name.value = data.city_Name;
		city_id.value = data.city_id;
		district_name.value = data.district_name;
		district_id.value = data.district_id;
		street_name.value = data.street_name;
		street_id.value = data.street_id;
		region_name.value = data.region_name;
		region_id.value = data.region_id;
		grid_name.value = data.grid_name;
		grid_id.value = data.grid_id;
	};
	const chooseAreaData = (type:any) => {
				
		if (type == 0) {
			
			 loadAreaData(type,0);
			
		}else if (type == 1) {
			
			 loadAreaData(type, province_id);
			
		}else if (type == 2) {
			
			 loadAreaData(type, city_id);
			
		}else if (type == 3) {
			
			 loadAreaData(type, district_id);
			
		}else if (type == 4) {
			
			 loadAreaData(type, street_id);
			
		}else if (type == 5) {
			
			 loadAreaData(type, region_id);
			
		}else if (type == 6) {
			
			 loadAreaData(type, grid_id);
			
		}else if (type == 7) {
			
			 loadAreaData(type, area_id);
			
		}
	};
	const loadAreaData = async(type:any,up_id:any) => {
		try {
			
			let param = {
				
				type:type,
				up_id:up_id,
			};
			const res = await MinePartyWangGeMessageChooseProviceInfo(param);
							
				console.log(res);
				
				if (type == 0) {
					
					 shengArray.value = res.result;
					 shengTitleList.value =  shengArray.value.map(item => item.name);
					uni.showActionSheet({
						itemList:  shengTitleList.value,
						success: (res) => {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
							// console.log( itemList[res.tapIndex])
							 province_name.value =  shengTitleList.value[res.tapIndex];
							 province_id.value =  shengArray.value[res.tapIndex].id;
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
					
				}else if(type == 1){
					
					 shiArray.value = res.result;
					 shiTitleList.value =  shiArray.value.map(item => item.name);
					uni.showActionSheet({
						itemList:  shiTitleList.value,
						success: (res) => {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
							// console.log( itemList[res.tapIndex])
							 city_Name.value =  shiTitleList.value[res.tapIndex];
							 city_id.value =  shiArray.value[res.tapIndex].id;
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
					
				}else if(type == 2){
					
					 quArray.value = res.result;
					 quTitleList.value =  quArray.value.map(item => item.name);
					uni.showActionSheet({
						itemList:  quTitleList.value,
						success: (res) => {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
							// console.log( itemList[res.tapIndex])
							 district_name.value =  quTitleList.value[res.tapIndex];
							 district_id.value =  quArray.value[res.tapIndex].id;
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
					
				}else if(type == 3){
					
					 jiedaoArray.value = res.result;
					 jiedaoTitleList.value =  jiedaoArray.value.map(item => item.name);
					uni.showActionSheet({
						itemList:  jiedaoTitleList.value,
						success: (res) => {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
							// console.log( itemList[res.tapIndex])
							 street_name.value =  jiedaoTitleList.value[res.tapIndex];
							 street_id.value =  jiedaoArray.value[res.tapIndex].id;
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
					
				}else if(type == 4){
					
					 shequArray.value = res.result;
					 shequTitleList.value =  shequArray.value.map(item => item.name);
					uni.showActionSheet({
						itemList:  shequTitleList.value,
						success: (res) => {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
							// console.log( itemList[res.tapIndex])
							 region_name.value =  shequTitleList.value[res.tapIndex];
							 region_id.value =  shequArray.value[res.tapIndex].id;
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
					
				}else if(type == 5){
					
					 cunjuArray.value = res.result;
					 cunjuTitleList.value =  cunjuArray.value.map(item => item.name);
					uni.showActionSheet({
						itemList:  cunjuTitleList.value,
						success: (res) => {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
							// console.log( itemList[res.tapIndex])
							 grid_name.value =  cunjuTitleList.value[res.tapIndex];
							 grid_id.value =  cunjuArray.value[res.tapIndex].id;
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
					
				}else if(type == 6){
					
					 wanggeArray.value = res.result;
					 wanggeTitleList.value =  wanggeArray.value.map(item => item.name);
					uni.showActionSheet({
						itemList:  wanggeTitleList.value,
						success: (res) => {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
							// console.log( itemList[res.tapIndex])
							 area_name.value =  wanggeTitleList.value[res.tapIndex];
							 area_id.value =  wanggeArray.value[res.tapIndex].id;
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
					
				}else if(type == 7){
					
					 louyuArray.value = res.result;
					 louyuTitleList.value =  louyuArray.value.map(item => item.name);
					uni.showActionSheet({
						itemList:  louyuTitleList,
						success: (res) => {
							// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
							// console.log( itemList[res.tapIndex])
							 build_name.value =  louyuTitleList.value[res.tapIndex];
							 build_id.value =  louyuArray.value[res.tapIndex].id;
						},
						fail: (res) => {
							console.log(res.errMsg);
						}
					});
				}
				
			
		}catch (error) {
			console.log(error)
		}
	};
	//选择用途
	const chooseApplication = () => {
				
		uni.showActionSheet({
			itemList:  applicationList.value,
			success: (res) => {
				// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
				// console.log( itemList[res.tapIndex])
				 house_application.value =  applicationList.value[res.tapIndex];
				
			},
			fail: (res) => {
				console.log(res.errMsg);
			}
		});
	};
	//提交
	const tijiaoClick = async() => {
				
				if ( province_id.value.length == 0) {
					
					uni.showToast({
						title:'请选择省级站点',
						icon:'none'
					});
					return;
				}
				if ( city_id.value.length == 0) {
					
					uni.showToast({
						title:'请选择市级站点',
						icon:'none'
					});
					return;
				}
				if ( district_id.value.length == 0) {
					
					uni.showToast({
						title:'请选择县(市)区级站点',
						icon:'none'
					});
					return;
				}
				if ( street_id.value.length == 0) {
					
					uni.showToast({
						title:'请选择镇街级站点',
						icon:'none'
					});
					return;
				}
				if ( region_id.value.length == 0) {
					
					uni.showToast({
						title:'请输入社区名称',
						icon:'none'
					});
					return;
				}
				if ( grid_id.value.length == 0) {
					
					uni.showToast({
						title:'请输入村居物业名称',
						icon:'none'
					});
					return;
				}
				if ( area_id.value.length == 0) {
					
					uni.showToast({
						title:'请选择区域网格',
						icon:'none'
					});
					return;
				}
				if ( build_id.value.length == 0) {
					
					uni.showToast({
						title:'请选择楼宇(小组)',
						icon:'none'
					});
					return;
				}
				if ( house_num.value.length == 0) {
					
					uni.showToast({
						title:'请输入房屋编号',
						icon:'none'
					});
					return;
				}
				if ( house_user_amount.value.length == 0) {
					
					uni.showToast({
						title:'请填写居住人数',
						icon:'none'
					});
					return;
				}
				if ( house_application.value === '请选择') {
					
					uni.showToast({
						title:'请选择房屋用途',
						icon:'none'
					});
					return;
				}
				if ( house_type.value.length == 0) {
					
					uni.showToast({
						title:'请填写户型',
						icon:'none'
					});
					return;
				}
				if ( house_property.value.length == 0) {
					
					uni.showToast({
						title:'请填写房屋产权人',
						icon:'none'
					});
					return;
				}
				if ( mobile.value.length == 0) {
					
					uni.showToast({
						title:'请填写联系电话',
						icon:'none'
					});
					return;
				}
				if ( area.value.length == 0) {
					
					uni.showToast({
						title:'请填写建筑面积',
						icon:'none'
					});
					return;
				}
				try {
				    
					let param = {
						
						userId:getStorage(storageKeys.userId,''),
						type:0,
						province_name: province_name.value,
						province_id: province_id.value,
						city_name: city_Name.value,
						city_id: city_id.value,
						district_name: district_name.value,
						district_id: district_id.value,
						street_name: street_name.value,
						street_id: street_id.value,
						region_name: region_name.value,
						region_id: region_id.value,
						grid_name: grid_name.value,
						grid_id: grid_id.value,
						area_name: area_name.value,
						area_id: area_id.value,
						build_name: build_name.value,
						build_id: build_id.value,
						grid_man: grid_man.value,
						build_manager: build_manager.value,
						house_num: house_num.value,
						house_user_amount: house_user_amount.value,
						house_application: house_application.value,
						house_type: house_type.value,
						house_property: house_property.value,
						mobile: mobile.value,
						area: area.value,
					};
				    const res = await MinePartyWangGeMessageSubmitHouseInfo(param);
				                    
				        console.log(res);
						uni.navigateTo({
							url:'/pages/mine/PartyQY/messageRegistList'
						});
				    
				}catch (error) {
				    console.log(error)
				}
			};
            const goBack = () => {
                
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
           .searchlocation{
			margin-left: 15px;
			width: 230px;
			height: 30px;
			margin-top: 10px;
			font-size: 13px;
		}
		.formView{
		     display: flex;
			 flex-direction: row;
			 width: 100%;
			 height: 40px;
			 background-color: white;
			 margin-top: 10px;
			 
		}
		.searchInputView{
		         margin-left: 15px;
		         width: 230px;
		         height: 30px;
		         margin-top: 10px;
		         font-size: 13px;
		}
		.AreaInputView{
			
			margin-left: 15px;
			width: 100px;
			height: 30px;
			margin-top: 10px;
			font-size: 13px;
		}
		.buttonView{
		             
			margin-top: 40px;
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
			margin-bottom: 30px;
		}
		
    }
</style>