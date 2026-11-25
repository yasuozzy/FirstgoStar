<template>
    <view class="main">
        <u-navbar
          title="公示记录"
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
			<view class="listItem" v-for="(item,index) in gongshiList" :key="index">
				<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">{{item.title}}</view>
				<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">公示日期：{{item.pub_date}}</view>
				
				<view  style="display: flex;flex-direction: row;width: 100%;">
					<view class="buttonView" @click="detailClick(item)">查看详情</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;margin-bottom: 10px;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { getStorage, storage, storageKeys,uploadMultipleFiles,BaseImgURL } from '@/utils/storage';
	import {MinePartyPublicJusticeXuanJuGongShiNoteList} from '@/api/mine';
	import { onLoad ,onPullDownRefresh, onReachBottom} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const gongshiList = ref([]);
	const hasMore = ref(true);     // 是否还有更多数据
	const noMore = ref(false);      // 是否没有更多数据了
	const page = ref(1);
           
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
		
		if (! hasMore.value) {
			
			return
		}
		 page.value += 1;
		 loadData();
	});
    const loadData = async() => {
            	
		try {
			
			let param = {
				user_id:storage.getUserId(),
				page: page.value,
				size:20,
				
									  
			};
			const res = await MinePartyPublicJusticeXuanJuGongShiNoteList(param);
							
			console.log(res);
			if (page.value === 1) {
													
				gongshiList.value = res.result;
			}else
			{
				// 正确的数组合并方式
				gongshiList.value.push(...res.result);
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
			wx.stopPullDownRefresh()
		}
	};
	const detailClick = (item:any) => {
				
		uni.navigateTo({
			url:`/pages/mine/PartyQY/publicJustice/xuanjuGongShiDetail?id=${encodeURIComponent(item.id)}`
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
            .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
     }
	 .buttonView{
	            
	 	 margin-top: 14px;
	 	  background-color:#2A9595;
	 	  border-radius: 8px;
	 	  color: white;
	 	  font-size: 12px;
	 	  margin-left: 280px; 
	 	  display: flex;
	 	  justify-content: center; /* 水平居中 */
	 	  align-items: center;     /* 垂直居中 */
	 	  height: 30px;           /* 需要设置高度 */
	 	  width: 80px;             /* 需要设置宽度 */
	 }
	 .listItem{
	 		  
		  width: 100%;
		  display: flex;
		  flex-direction: column;
	 }
    }
</style>