<template>
    <view class="main">
        <u-navbar
          title="信息"
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
		<view style="width: 100%;display: flex;flex-direction: row;" @click="getCityClick()">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60px;">市级</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60%;">{{site_name}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;"
			  :src="downImage"
			  width="15px"
			  height="10px"
			></u-image>
		</view>
		<view style="margin-left: 3%;width: 94%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="getStreetClick()">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60px;">街道</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60%;">{{est_name}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;"
			  :src="downImage"
			  width="15px"
			  height="10px"
			></u-image>
		</view>
		<view style="margin-left: 3%;width: 94%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="getRegionManClick()">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60px;">社区</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60%;">{{man_name}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;"
			  :src="downImage"
			  width="15px"
			  height="10px"
			></u-image>
		</view>
		<view style="margin-left: 3%;width: 94%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="getWanggeClick()">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60px;">网格</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60%;">{{bldg_name}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;"
			  :src="downImage"
			  width="15px"
			  height="10px"
			></u-image>
		</view>
		<view style="margin-left: 3%;width: 94%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;" @click="getSecondWanggeClick()">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60px;">二级网格</view>
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60%;">{{hse_num}}</view>
			<u-image style="margin-top: 15px;margin-left: 15px;"
			  :src="downImage"
			  width="15px"
			  height="10px"
			></u-image>
		</view>
		<view style="margin-left: 3%;width: 94%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60px;">姓名</view>
			<input class="searchlocation" :value="name" type="text" />
		</view>
		<view style="margin-left: 3%;width: 94%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		<view style="width: 100%;display: flex;flex-direction: row;">
			<view style="margin-top: 15px;margin-left: 15px;font-size: 15px;width: 60px;">联系电话</view>
			<input class="searchlocation" :value="phone" type="text" />
		</view>
		<view style="margin-left: 3%;width: 94%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
		 <view class="buttonView" @click="openClick()">打开学习强国</view>
</view>
</template>

<script setup lang="ts">
	
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {MinePartyPublicLearnToStrongCountry,
	MinePartyPublicLearnToStrongCountryGetCity,
	MinePartyPublicLearnToStrongCountryGetStreet,
	MinePartyPublicLearnToStrongCountryGetRegionMan,
	MinePartyPublicLearnToStrongCountryGetWangge,
	MinePartyPublicLearnToStrongCountryGetSecondWangge,
	MinePartyPublicLearnToStrongCountryOpenClick,
	MinePartyPublicLearnToStrongCountryTongJi} from '@/api/mine';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const site_name = ref('');
	const site_id = ref('');
	const est_name = ref('');
	const est_id = ref('');
	const man_name = ref('');
	const man_id = ref('');
	const bldg_name = ref('');
	const bld_id = ref('');
	const hse_num = ref('');
	const hse_id = ref('');
	const name = ref('');
	const phone = ref('');
	const downImage = ref('/static/home/downImage.png');
	const resultDict = ref({});
	const cityList = ref([]);
	const cityTitleList = ref([]);
	const streetList = ref([]);
	const streetTitleList = ref([]);
	const regionList = ref([]);
	const regionTitleList = ref([]);
	const wanggeList = ref([]);
	const wanggeTitleList = ref([]);
	const secondList = ref([]);
	const secondTitleList = ref([]);
           
	onMounted(() => {
		
		phone.value = storage.getPhone();
		init();
	});
            
            const init = async() => {
				
				try {
				    
					let param = {
						
						userId:storage.getUserId(),
					};
				    MinePartyPublicLearnToStrongCountry(param).then((res) =>{
				                    
				        console.log(res);
						resultDict.value = res.result;
						site_name.value = res.result.site_name;
						site_id.value = res.result.site_id;
						est_name.value = res.result.est_name;
						est_id.value = res.result.est_id;
						man_name.value = res.result.man_name;
						man_id.value = res.result.man_id;
						bldg_name.value = res.result.bldg_name;
						bld_id.value = res.result.bld_id;
						hse_num.value = res.result.hse_num;
						hse_id.value = res.result.hse_id;
						name.value = res.result.name;
				    });
				} catch (error) {
				    console.log(error)
				}
            };
			const getCityClick = async() => {
				
				try {
				    
					let param = {
						
					};
				    MinePartyPublicLearnToStrongCountryGetCity(param).then((res) =>{
				                    
				        console.log(res);
						cityList.value = res.result;
						
						const result = res.result;               
						cityTitleList.value = result.map(item => item.name);
						if (cityTitleList.value.length > 0) {
							
							uni.showActionSheet({
								itemList: cityTitleList.value,
								success: (res) => {
									// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
									// console.log(itemList[res.tapIndex])
									site_name.value = cityTitleList.value[res.tapIndex];
									site_id.value = cityList.value[res.tapIndex].id;
									
								},
								fail: (res) => {
									console.log(res.errMsg);
								}
							});
						}else
						{
							uni.showToast({
								title:'暂无市级分类信息',
								icon:'none'
							})
						}
				    });
				} catch (error) {
				    console.log(error)
				}
			};
			const getStreetClick = async() => {
				
				if (site_id.value.length == 0) {
					
					uni.showToast({
						title:'请先选择市级',
						icon:'none'
					});
					return;
					
				}else{
					
					try {
					    
						let param = {
							id:site_id.value,
						};
					    MinePartyPublicLearnToStrongCountryGetStreet(param).then((res) =>{
					                    
					        console.log(res);
							streetList.value = res.result;
							
							const result = res.result;               
							streetTitleList.value = result.map(item => item.name);
							if (streetTitleList.value.length > 0) {
								
								uni.showActionSheet({
									itemList: streetTitleList.value,
									success: (res) => {
										// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
										// console.log(itemList[res.tapIndex])
										est_name.value = streetTitleList.value[res.tapIndex];
										est_id.value = streetList.value[res.tapIndex].id;
										
									},
									fail: (res) => {
										console.log(res.errMsg);
									}
								});
							}else
							{
								uni.showToast({
									title:'暂无街道分类信息',
									icon:'none'
								})
							}
					    });
					} catch (error) {
					    console.log(error)
					}
				}
			};
			const getRegionManClick = async() => {
				
				if (est_id.value.length == 0) {
					
					uni.showToast({
						title:'请先选择街道',
						icon:'none'
					});
					return;
					
				}else{
					
					try {
					    
						let param = {
							id:est_id.value,
						};
					    MinePartyPublicLearnToStrongCountryGetRegionMan(param).then((res) =>{
					                    
					        console.log(res);
							regionList.value = res.result;
							
							const result = res.result;               
							regionTitleList.value = result.map(item => item.name);
							if (regionTitleList.value.length > 0) {
								
								uni.showActionSheet({
									itemList: regionTitleList.value,
									success: (res) => {
										// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
										// console.log(itemList[res.tapIndex])
										man_name.value = regionTitleList.value[res.tapIndex];
										man_id.value = regionList.value[res.tapIndex].id;
										
									},
									fail: (res) => {
										console.log(res.errMsg);
									}
								});
							}else
							{
								uni.showToast({
									title:'暂无社区分类信息',
									icon:'none'
								})
							}
					    });
					} catch (error) {
					    console.log(error)
					}
				}
			};
			const getWanggeClick = async() => {
				
				if (man_id.value.length == 0) {
					
					uni.showToast({
						title:'请先选择社区',
						icon:'none'
					});
					return;
					
				}else{
					
					try {
					    
						let param = {
							id:man_id.value,
						};
					    MinePartyPublicLearnToStrongCountryGetWangge(param).then((res) =>{
					                    
					        console.log(res);
							wanggeList.value = res.result;
							
							const result = res.result;               
							wanggeTitleList.value = result.map(item => item.name);
							if (regionTitleList.value.length > 0) {
								
								uni.showActionSheet({
									itemList: wanggeTitleList.value,
									success: (res) => {
										// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
										// console.log(itemList[res.tapIndex])
										bldg_name.value = wanggeTitleList.value[res.tapIndex];
										bld_id.value = wanggeList.value[res.tapIndex].id;
										
									},
									fail: (res) => {
										console.log(res.errMsg);
									}
								});
							}else
							{
								uni.showToast({
									title:'暂无网格分类信息',
									icon:'none'
								})
							}
					    });
					} catch (error) {
					    console.log(error)
					}
				}
			};
			const getSecondWanggeClick = async() => {
				
				if (bld_id.value.length == 0) {
					
					uni.showToast({
						title:'请先选择网格',
						icon:'none'
					});
					return;
					
				}else{
					
					try {
					    
						let param = {
							id:bld_id.value,
						};
					    MinePartyPublicLearnToStrongCountryGetSecondWangge(param).then((res) =>{
					                    
					        console.log(res);
							secondList.value = res.result;
							
							const result = res.result;               
							secondTitleList.value = result.map(item => item.name);
							if (regionTitleList.value.length > 0) {
								
								uni.showActionSheet({
									itemList: secondTitleList.value,
									success: (res) => {
										// console.log('选中了第' + (res.tapIndex + 1) + '个按钮')
										// console.log(itemList[res.tapIndex])
										hse_num.value = secondTitleList.value[res.tapIndex];
										hse_id.value = secondList.value[res.tapIndex].id;
										
									},
									fail: (res) => {
										console.log(res.errMsg);
									}
								});
							}else
							{
								uni.showToast({
									title:'暂无二级网格分类信息',
									icon:'none'
								})
							}
					    });
					} catch (error) {
					    console.log(error)
					}
				}
			};
			//打开学习强国
			const openClick = async() => {
				
				if (site_id.value.length == 0) {
					
					uni.showToast({
						title:'请选择市级信息',
						icon:'none'
					});
					return;
					
				}else if (name.value.length == 0) {
					
					uni.showToast({
						title:'请填写姓名',
						icon:'none'
					});
					return;
				}
				else{
					
					try {
					    
						let param = {
							
							userId:storage.getUserId(),
							site_id:site_id.value?site_id.value:"",
							est_id:est_id.value?est_id.value:"",
							man_id:man_id.value?man_id.value:"",
							bld_id:bld_id.value?bld_id.value:"",
							hse_id:hse_id.value?hse_id.value:"",
							name:name.value,
							mobile:phone.value,
						};
					    MinePartyPublicLearnToStrongCountryOpenClick(param).then((res) =>{
					                    
					        console.log(res);
							//跳转学习强国之前，统计点击次数
							tongjiClick();
					    });
					} catch (error) {
					    console.log(error)
					}
				}
			};
			const tongjiClick = async() => {
				
				try {
					    
						let param = {
							
							userId:storage.getUserId(),
						};
					    MinePartyPublicLearnToStrongCountryTongJi(param).then((res) =>{
					                    
					        console.log(res);
							const url = 'dtxuexi://';
							
							window.location.href = url;
							
					    });
					} catch (error) {
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .searchlocation{
	          margin-left: 15px;
	          width: 280px;
	          height: 35px;
	          margin-top: 10px;
	         background-color: aliceblue;
	          border-radius: 5px;
	          font-size: 13px;
	}
	 .buttonView{
	              
	             margin-top: 30px;
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

    }
</style>