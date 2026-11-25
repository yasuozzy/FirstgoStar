<template>
    <view class="main">
        <u-navbar
          title="编辑商品规格"
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
              <view slot="right" @click="saveClick()">
                  <view style="font-size: 14px;color: white;">保存</view>
              </view>
            </template>
        </u-navbar>
		<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;">规格名称</view>
		<input class="nameInput" v-model="mySpecName" placeholder="请输入" type="text" />
		<view style="margin-top: 30px;margin-left: 15px;font-size: 14px;">规格值</view>
		<view style="width: 100%;display: flex;flex-direction: row;" v-for="(item,index) in descGroupList" :key="item.valueId">
			<view style="margin-top: 15px;margin-left: 15px;" @click="deleteClick(item,index)">
				<image style="width: 18px;height: 18px;" :src="deleteGreen"></image>
			</view>
			<input class="searchlocation" v-model="item.value" placeholder="请输入" :disabled="item.valueId.length > 0" type="text" />
		</view>
		<view style="width: 92%;margin-top: 15px;margin-left: 4%;text-align: right;color: #2A9595;font-size: 14px;" @click="addClick">+继续添加</view>
		<u-modal :show="show" @confirm="confirm" confirmText="删除"  :title="title" @cancel="cancel" showCancelButton>
			<view style="width: 100%;text-align: center;">
				<view style="font-size: 14px;">{{content}}</view>
			</view>
		</u-modal>
   </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {MineShangquanManageMentProductDescEditSpec,
	MineShangquanManageMentProductDescDelSpecDetail} from '@/api/mine';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';

    // 背景颜色
    const bgColor = ref("#2A9595");
    const addimage = ref('/static/mine/addItemImage.png');
	const descGroupList = ref(['']);
	const mySpecName = ref('');
	const specs = ref({});
	const deleteGreen = ref('/static/mine/deleteGreen.png');
	const title = ref('提示');
	const content = ref('');
	const show = ref(false);
	const deleteIndex = ref();
	const deleteItem = ref({});
	
	onLoad((options:any) => {
		
		specs.value = JSON.parse(options.specs);
		console.log(specs.value);
		mySpecName.value = specs.value.name;
		descGroupList.value = specs.value.valueList;
		const dict = { valueId: "",
            value: ""};
		descGroupList.value.push(dict);
		
	});
	const addClick = () => {
		const list = descGroupList.value;
		const lastIndex = list.length - 1;
		
		if (list[lastIndex].value.length === 0) {
		  uni.showToast({
		    title: '最后一行未输入',
		    icon: 'none'
		  });
		  return;
		}
		const dict = { valueId: "",
		    value: ""};
		descGroupList.value.push(dict);
	};
	const saveClick = async() => {
		
		if(mySpecName.value.length == 0){
			
			uni.showToast({
			  title: '请输入规格名称',
			  icon: 'none'
			});
			return;
		}
		const list = descGroupList.value;
		const lastIndex = list.length - 1;
		if(list.length === 1 && list[lastIndex].value.length === 0){
			
			uni.showToast({
			  title: '至少提交一个规格',
			  icon: 'none'
			});
			return;
		}
		
		console.log(descGroupList.value);
		try {
			
			let param = {
				
				userId:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				userid:storage.getShopOwnerId()?storage.getShopOwnerId():storage.getUserId(),
				name:mySpecName.value,
				note:'',
				sort:'',
				id:specs.value.sid
				
			};
			// 筛选出新增且非空的规格
			const newSpecs = descGroupList.value.filter(
			  item => !item.valueId && item.value && item.value.trim() !== ''
			);
			
			// 1. 添加 detailCount（新增的数量）
			param.detailCount = newSpecs.length;
			
			// 2. 动态生成 detail_value1, detail_value2, ...（只针对新增项）
			newSpecs.forEach((item, index) => {
			  param[`detail_value${index + 1}`] = item.value;
			});

			console.log(param);
			const res = await MineShangquanManageMentProductDescEditSpec(param);
							
			console.log(res);
			uni.showToast({
				title:res.message,
				icon:'none'
			})
			if(res.success == true){
				
				uni.navigateBack();
				
			}
				
			
		}catch (error) {
			console.log(error)
		}
		
	};
	const deleteClick = (item:any,index:any) => {
		
		if(descGroupList.value.length === 1){
			uni.showToast({
			  title: '最后一个啦~',
			  icon: 'none'
			});
			return;
		}
		
		deleteIndex.value = index;
		deleteItem.value = item;
		if(deleteItem.value.valueId){
			
			content.value = '是否删除这个规格:' + mySpecName.value + deleteItem.value.value + '?';
		}else
		{
			content.value = '是否删除这个规格?';
		}
		
		show.value = true;
		
	};
	const confirm = async() => {
		
		show.value = false;
		descGroupList.value.splice(deleteIndex.value, 1);
		//
		if(deleteItem.value.valueId){
			
			try {
				
				let param = {
					
					id:deleteItem.value.valueId
					
				};
				const res = await MineShangquanManageMentProductDescDelSpecDetail(param);
								
				console.log(res);
				uni.showToast({
					title:res.message,
					icon:'none'
				})
				
			}catch (error) {
				console.log(error)
			}
		}
	};
	const cancel = () => {
		show.value = false;
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
		  .nameInput{
		  			   margin-left: 4%;
		  			   width: 92%;
		  			   height: 30px;
		  			   margin-top: 10px;
		  			   border: 1px lightgray solid;
		  			   border-radius: 5px;
		  			   font-size: 13px;
		   }
		  .searchlocation{
			   margin-left: 4%;
			   width: 83%;
			   height: 30px;
			   margin-top: 10px;
			   border: 1px lightgray solid;
			   border-radius: 5px;
			   font-size: 13px;
		   }
}
</style>