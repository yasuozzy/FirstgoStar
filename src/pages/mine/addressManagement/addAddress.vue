<template>
    <view class="main">
        <u-navbar
          title="添加新地址"
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
		    <view slot="right" @click="addAddressClick()">
				<view class="homestayView">保存</view>
			</view>
		</template> 
        </u-navbar>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">姓名</view>
			<input style="font-size: 13px;margin-top: 15px;margin-left: 15px;" v-model="username" type='text' placeholder="填写姓名"/>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view class="specsView">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">联系电话</view>
			<input style="font-size: 13px;margin-top: 15px;margin-left: 15px;" v-model="phone" type='text' placeholder="填写联系电话"/>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view class="specsView" @click="getAddressInfo('')">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">所在地区</view>
			<view style="font-size: 13px;margin-left: 15px;margin-top: 15px;width: 65%;">{{addressText}}</view>
			<u-image style="margin-top: 20px;margin-left: 15px;"
			  :src="downimage"
			  width="10px"
			  height="6px"
			></u-image>
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 100px;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;">详细地址</view>
			<textarea style="margin-top: 15px;margin-left: 10px;width: 70%;height: 100px;font-size: 13px;" v-model="detailAddress" placeholder="请填写详细地址">
			        </textarea>
		</view>
		<view style="width: 100%;height: 5px;margin-top: 10px;background-color: lightgray;"></view>
		<view style="width: 100%;height: 40px;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-top: 15px;margin-left: 15px;color: gray;">设为默认地址</view>
			<switch :checked="isdefault" style="transform:scale(0.6);align-items: right;margin-left: 200px;margin-top: 5px;" @change="change" />
		</view>
		<view style="width: 100%;height: 1px;margin-top: 10px;background-color: lightgray;"></view>
		<u-popup
		  :safeAreaInsetBottom="true"
		  :safeAreaInsetTop="true"
		  mode="bottom"
		  :show="showModal"
		  :round="10"
		  :overlay="true"
		  :closeable="true"
		  :closeOnClickOverlay="true"
		  :customStyle="{ height: '50vh' }"
		  @close="close"
		  @open="open"
		>
		  <view style="height: 50vh; padding-bottom: 10px">
		    <scroll-view class="scroll-content" scroll-y="true">
		      <view
		        style="
		          height: 30px;
		          line-height: 30px;
		          font-size: 17px;
		          padding-left: 30px;
		        "
		        v-for="(item, index) in items"
		        :key="index"
		        @click="getAddressInfo(item)"
		        >{{ item.area }}</view
		      >
		    </scroll-view>
		  </view>
		</u-popup>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { scoreGetAddress, scoreSaveAddress } from "@/api/service";
	import eventBus from '@/utils/eventBus';
   
	// 背景颜色
	const bgColor = ref("#2A9595");
	const location = ref('选择');
	const downimage = ref('/static/home/downImage.png');
	const showModal = ref(false);
	const value = ref(true) ;
	const pid = ref('');
	const items = ref([]);
	const username = ref('');
	const phone = ref('');
	const detailAddress = ref('');
	
	const sheng = ref('');
	const shengid = ref('');
	const shi = ref('');
	const shiid = ref('');
	const qu = ref('');
	const quid = ref('');
	const zhen = ref('');
	const zhenid = ref('');
	const clicknums = ref(1);
	const isdefault = ref(true) ;
		
	const addressText = computed(() => {
	 
		// 如果没有选择任何地区，显示"选择"
		if (!sheng.value) {
		  return "选择";
		}
		console.log(
		  shengid.value + "=" + shiid.value + "=" + quid.value + "=" + zhenid.value
		);
		// 否则显示已选择的地区拼接
		return `${sheng.value}${shi.value}${qu.value}${zhen.value}`;
	  
	});
        
    const getAddressInfo = async(item:any) => {
			
		  if (!item) {
			clicknums.value = 1;
		  } else {
			clicknums.value ++;
		  }
		  console.log(clicknums.value);
		  if (clicknums.value == 2) {
			sheng.value = item.area;
			shengid.value = item.areaid;
			console.log(item.area);
		  } else if (clicknums.value == 3) {
			shi.value = item.area;
			shiid.value = item.areaid;
			console.log(item.area);
		  } else if (clicknums.value == 4) {
			qu.value = item.area;
			quid.value = item.areaid;
			console.log(item.area);
		  } else if (clicknums.value == 5) {
			zhen.value = item.area;
			zhenid.value = item.areaid;
			console.log(item.area);
		  }
		const res = await scoreGetAddress({
				pId: item ? item.areaid : "",});
			  
		if (res.success && res.resultCode == 200) {
		  console.log(res);
		  items.value = res.result;
		  showModal.value = true;
		} else {
		  showModal.value = false;
		}
		  
	};
    const addAddressClick = async() => {
				
		console.log('保存');
		if (
			username.value.length == 0 ||
			phone.value.length == 0 ||
			detailAddress.value.length == 0 ||
			sheng.value.length == 0
		) {
			uni.showToast({ title: "请输入完整信息", icon:"none" });
			return;
		}
		try {
		
			  let param = {
				userId: storage.getUserId(),
				acceptName:  username.value,
				mobile:  phone.value,
				provinceId:  shengid.value,
				provinceName:  sheng.value,
				cityId:  shiid.value,
				cityName:  shi.value,
				areaId:  quid.value,
				areaName:  qu.value,
				streetId:  zhenid.value,
				streetName:  zhen.value,
				address:  detailAddress.value,
				isDefault:  isdefault.value,
			  };
			  const res = await scoreSaveAddress(param);
			  console.log(res);
			  
			  eventBus.emit('Addaddress',res.result);
			  uni.navigateBack();
		  
	  }catch (error) {
		  console.log(error)
	  }
	};
	const change = (e:any) => {
		console.log("change", e);
	   isdefault.value = e;
	};
	
	const goBack= () => {
			
		uni.navigateBack()
	};
	function close() {
		showModal.value = false;
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
    }
</style>