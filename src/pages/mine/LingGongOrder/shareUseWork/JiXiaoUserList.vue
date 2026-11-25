<template>
    <view class="main">
        <u-navbar
          title="派遣人员"
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
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in OrderList" :key="index">
				<view style="display: flex;flex-direction: row;width: 100%;">
					<image style="margin-top: 15px;margin-left: 15px;width: 15px;height: 15px;" src="/static/mine/squreselect.png"></image>
					<view style="margin-top: 12px;margin-left: 5px;font-size: 13px;width: 30%;">{{item.worker_name}}</view>
					<!-- <view v-if="item.is_eva == 0" class="buttonView" @click="gopingjia(item)">去评价</view> -->
					<view v-if="item.is_eva == 1" class="buttonView" @click="checkjixiao(item)">查看《绩效考核结果通知书》</view>
				</view>
				<view style="width: 100%;height: 1px;background-color: lightgray;margin-top: 10px;"></view>
			</view>
		</view>
		<uni-popup ref="popupRef" type="center">
			<view class="popView">
				<view style="margin-top: 10px;width: 100%;color: blue;font-size: 18px;text-align: center;" @click="jixiaoShowClick()">《绩效目标确认单》</view>
				<view class="scroll-view" v-if="viewhidden == 1" >
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">派遣人员:{{worker_name}}</view>
					<textarea class="textView" disabled="true" :value="eva_content"></textarea>
					<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 1px;background-color: lightgray;"></view>
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">图片描述</view>
					<view style="width: 100%;margin-top: 15px;height: 100px;display: flex;flex-direction: row;">
						<view style="margin-left: 15px;width: 60px;height: 80px;" v-for="(item,index) in eva_picArr"  @click="open(index)">
							<u-image
							  :src="item"
							  width="60px"
							  height="80px"
							></u-image>
						</view>
					</view>
					<view style="width: 100%;height: 10px;background-color: lightgray;margin-top: 10px;"></view>
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">满意程度</view>
						<view style="margin-top: 15px;margin-left: 15px;">
							<u-rate :count="count" v-model="satisfy_score" size="22" active-color="#FFFF00" readonly="true"></u-rate>
						</view>
					</view>
					<view style="display: flex;flex-direction: row;width: 100%;">
						<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">技术水平</view>
						<view style="margin-top: 15px;margin-left: 15px;">
							<u-rate :count="count" v-model="skill_score" size="22" active-color="#FFFF00" readonly="true"></u-rate>
						</view>
					</view>
				</view>
				<view class="backButton" @click="backClick()">返回</view>
			</view>   
		</uni-popup>
		<!-- 查看器 -->
		<div v-if="show" class="overlay" @click="close">
		  <div 
			class="swipe-container"
			@touchstart="touchStart"
			@touchmove="touchMove"
			@touchend="touchEnd"
		  >
			<div class="slides" :style="slideStyle">
			  <img v-for="img in eva_picArr" :key="img" :src="img" class="slide">
			</div>
		  </div>
		  <div class="counter">{{ current + 1 }} / {{ eva_picArr.length }}</div>
		</div>
</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app'; 
	import {MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoPingJiaList,
	MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoCheckPingJia} from '@/api/mine';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const OrderList = ref([]);
	const idstring = ref('');
	const viewhidden = ref(0);
	const worker_name = ref('');
	const eva_content = ref('');
	const satisfy_score = ref('');
	const skill_score = ref('');
	const eva_picArr = ref([]);
	const show = ref(false);
	const current = ref(0);
	const startX = ref(0);
	const moveX = ref(0);
    const popupRef = ref(null);   
			
	const slideStyle = computed(() => {
		return {
			transform: `translateX(-${current.value * 100}%)`
		};
	});

	const open = (index:any) => {
		current.value = index;
		show.value = true;
	};
	const close = () => {
		show.value = false;
	};    
	const touchStart = (e:any) => {
		startX.value = e.touches[0].clientX;
	};
		
	const touchMove = (e:any) => {
		moveX.value = e.touches[0].clientX;
	};
		
	const touchEnd = () => {
		
		const diff = startX.value - moveX.value
		  
		if (Math.abs(diff) > 50) { // 滑动距离阈值
			if (diff > 0 && current.value < eva_picArr.value.length - 1) {
			  current.value ++ // 向左滑，下一张
			} else if (diff < 0 && current.value > 0) {
			  current.value -- // 向右滑，上一张
			}
		}
	};
	onLoad((options:any) => {
		
		idstring.value = options.id;
	});
	onMounted(() => {
		
	  init();
	  
	});
       
            
            const init = async() => {
				
				try {
				    
					let param = {
						
						id:idstring.value
						
					};
				    MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoPingJiaList(param).then((res) =>{
				                    
				        console.log(res);
						OrderList.value = res.result;
						
				    });
				}catch (error) {
				    console.log(error)
				}
            };
			const checkjixiao = async(item:any) => {
				
				try {
				    
					let param = {
						
						recId:item.recId
						
					};
				    MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoCheckPingJia(param).then((res) =>{
				                    
				        console.log(res);
						worker_name.value = item.worker_name;
						eva_content.value = res.result.eva_content;
						satisfy_score.value = res.result.satisfy_score;
						skill_score.value = res.result.skill_score;
						const pics = res.result.eva_pic;
						eva_picArr.value = pics.split(',');
						// $refs.popup.open('center');
						popupRef.value?.open();
				    });
				}catch (error) {
				    console.log(error)
				}
				
				
			};
			const jixiaoShowClick = () => {
				
				viewhidden.value = 1;
			};
			const backClick = () => {
				
				// $refs.popup.close();
				 popupRef.value?.close();
				viewhidden.value = 0;
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
            .listItem{
				 display: flex;
				 flex-direction: column;
				 width: 100%;
            }
            .buttonView{
			  margin-top: 10px;
			  background-color: #2A9595;
			  border-radius: 5px;
			  color: white;
			  font-size: 13px;
			  margin-left: 15px; 
			  display: flex;
			  justify-content: center; /* 水平居中 */
			  align-items: center;     /* 垂直居中 */
			  height: 25px;           /* 需要设置高度 */
			  width: 200px;             /* 需要设置宽度 */
            }
			.popView{
						 
						 width: calc(100vw - 60px);
						   max-height: calc(100vh - 200px);
						   background-color: #fff;
						   border-radius: 16px;
						   overflow: hidden;
						   margin: 0 30px;
						 
			}
			.scroll-view {
						 
			  width: 100%;
			   max-height: calc(100vh - 230px);
			   overflow-y: auto;  /* 关键：允许垂直滚动 */
			   -webkit-overflow-scrolling: touch;  /* iOS平滑滚动 */
			   padding: 30rpx;
			   box-sizing: border-box;
			}
			.backButton{
						 
				margin-left: 6%;
				margin-bottom: 10px;
				margin-top: 10px;
				width: 88%;
				height: 30px;
				color: blue;
				font-size: 18px;
				border: blue solid 1px;
				border-radius: 5px;
				display: flex;
				justify-content: center;
				text-align: center;
				align-items: center;
			}
			.overlay {
			       position: fixed;
			       top: 0;
			       left: 0;
			       width: 100%;
			       height: 100%;
			       background: black;
			       z-index: 9999;
			     }
			     
			     .swipe-container {
			       width: 100%;
			       height: 100%;
			       overflow: hidden;
			     }
			     
			     .slides {
			       display: flex;
			       width: 100%;
			       height: 100%;
			       transition: transform 0.3s ease;
			     }
			     
			     .slide {
			       width: 100%;
			       height: 100%;
			       object-fit: contain;
			       flex-shrink: 0;
			     }
			     
			     .counter {
			       position: absolute;
			       bottom: 50rpx;
			       left: 50%;
			       transform: translateX(-50%);
			       color: white;
			     }
				 .textView{
					 margin-top: 10px;
					 margin-left: 4%;
					 width: 92%;
					 height: 100px;
					 font-size: 13px;
					 border: 1px lightgray solid;
					 border-radius: 5px;
				 }
    }
</style>