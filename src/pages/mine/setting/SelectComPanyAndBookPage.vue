<template>
    <view class="main">
        <u-navbar
          title="切换身份"
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
		<view style="display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in typeList" :key="index" @click="changeClick(index)">
				<view style="display: flex;flex-direction: row;">
					<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 80%;">{{item.title}}</view>
					<u-image v-if="item.select == true" style="margin-top: 10px;margin-left: 10px;"
					  :src="image"
					  width="20px"
					  height="20px"
					></u-image>
				</view>
				
				<view style="width: 100%;height: 1px;margin-top: 15px;background-color: lightgray;"></view>
			</view>
		</view>
		<u-modal :show="show" @confirm="confirm" @cancel="cancel" showCancelButton  :title="title" >
			<view class="slot-content">
				<rich-text style="font-size: 13px;" :nodes="content"></rich-text>
			</view>
		</u-modal>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { onLoad } from '@dcloudio/uni-app';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	// image:'/static/mine/choosecompany.png',
	const image = ref('/static/mine/choosecompany.png');
	const company = ref<string>('');
	const typeList = ref([{title:'社区',select:false,loginType:1},
	{title:'写字楼',select:false,loginType:2},
	{title:'市场',select:false,loginType:3}]);
	const show = ref(false);
	const title = ref('提示');
	const content = ref('是否切换到所选身份下的房屋');
          
	onLoad((options:any) => {
		
		company.value = decodeURIComponent(options.company);
		console.log(company.value);
		for (var index = 0; index < typeList.value.length; index++) {
			var element = typeList.value[index];
			if (element.title === company.value) {
				element.select = true;
			}else
			{
				element.select = false;
			}
			
		};
		console.log(typeList.value);
	});
        
       
            
	const changeClick = (index:any) =>{
				
		// 先将所有项设为未选中
		typeList.value.forEach(item => {
			item.select = false
		})
		typeList.value[index].select = true;
		showmodel();
		
	};
	const showmodel = () => {
		show.value = true;
	};
	const confirm = () => {
		show.value = false;
		for (var index = 0; index < typeList.value.length; index++) {
			var element = typeList.value[index];
			if (element.select == true) {
				
				storage.saveLoginType(element.loginType);
				
			}
		}
		
	};
	const cancel = () => {
		show.value = false;
	};
    const goBack = () => {
                
		uni.navigateBack();
		
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
	 .listItem{
		 width: 100%;
		 height: 50px;
	 }
    }
</style>