<template>
    <view class="main">
        <u-navbar
          title="详情"
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
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px;">订单编号：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.orderNumber}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">支付状态：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.status}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">入住时间：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.intime}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">离开时间：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.outtime}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">房型：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.housetype}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">数量(间)：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.num}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">早餐：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.breakfirst}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">联系人信息</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">联系人：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.lianxiperson}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">联系电话：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.lianxiphone}}</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">订单信息</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">订单编号：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.orderNumber}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">下单时间：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.orderTime}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">订单总额：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.ordertotal}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">优惠抵折扣：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.discount}}</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">实付金额：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;">{{detailinfo.actualpay}}</view>
			</view>
			
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;">
				<view style="font-size: 13px;margin-top: 10px;width: 80px;color: red;">换房信息</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;" @click="chooseClick">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">房型：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: royalblue;">请选择</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;" @click="chooseClick">
				<view style="font-size: 13px;margin-top: 10px;width: 100px">酒店市场价格：</view>
				<view style="font-size: 13px;margin-left: 20px;margin-top: 10px;color: royalblue;">请选择</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;" @click="chooseClick">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">我出价：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: royalblue;">请选择</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="formView">
			<view style="display: flex;flex-direction: row;margin-top: 10px;margin-left: 15px;" @click="chooseClick">
				<view style="font-size: 13px;margin-top: 10px;width: 80px">数量：</view>
				<view style="font-size: 13px;margin-left: 30px;margin-top: 10px;color: royalblue;">请选择</view>
			</view>
			<view style="margin-left: 3%;width: 94%;margin-top: 15px;background-color: lightgray;height: 1px;"></view>
		</view>
		<view class="addPriceView" @click="changeHouse">更改房型</view>
		<view>
				<u-popup :show="kuangshow" @close="close" @open="open">
		            <view style="display: flex;flex-direction: column;">
		                <view style="margin-top: 10px; color: black;width: 100%;display: flex;flex-direction: row;"> 
								
							<view style="width: 93%;font-size: 14px;text-align: center;margin-top: 10px;">房型/价格/我出价</view>
							<view style="margin-top: 10px; color: black;font-size: 20px;width: 3%;" @click="doneClick">x</view>
						</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">房型(单选)</view>
						<view class="housetypeChoose">
							
							<u-checkbox
								:customStyle="{marginBottom: '8px'}"
								v-for="(item, index) in housetypeList"
								:key="index"
								shape="circle"
								:checked="selectedValue === item.value"
								 @change="handleChange(item.value)"
								:label="item.name"
								
								
								            >
							</u-checkbox>
							
						</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">酒店市场价格(单选)</view>
						<view class="housepriceChoose">
							
							<u-checkbox
								:customStyle="{marginBottom: '8px'}"
								v-for="(item, index) in housepriceList"
								:key="index"
								shape="circle"
								:checked="priceValue === item.value"
								 @change="handlepriceChange(item.value)"
								:label="item.name"
								
								
								            >
							</u-checkbox>
							
						</view>
						<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">请出价(AI建议75-85元)</view>
						<input class="searchlocation" placeholder="请输入价格" type="text" />
						<view style="margin-top: 15px;margin-left: 15px;font-size: 14px;display: flex;flex-direction: row;">
							<view>房间数量</view>
							<view style="width: 20px;height: 20px;border: blue solid 1px;color: black;text-align: center;margin-left: 160px;display: flex;justify-content: center;" @click="minushouse">-</view>
							<view style="margin-top: 2px;color: black;font-size: 14px;margin-left: 10px;width: 40px;text-align: center;">{{housenumber}}</view>
							<view style="width: 20px;height: 20px;border: blue solid 1px;color: black;text-align: center;margin-left: 15px;display: flex;justify-content: center;" @click="addhouse">+</view>
						</view>
						<view style="margin-top: 20px;margin-left: 3%;width: 96%;background-color: royalblue;border-radius: 5px;border: blue solid 1px;height: 40px;margin-bottom: 30px;color: white;align-items: center;text-align: center; justify-content: center;display: flex;" @click="doneClick">完成</view>
		            </view>
				</u-popup>
				
			</view>
			<u-modal :show="show" @confirm="confirm" :title="title" >
				<view style="width: 100%;font-size: 14px;text-align: center;">{{content}}</view>
			</u-modal>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const detailinfo = ref({
		orderNumber:'202578954125632',
		status:'已取消',
		paystatus:'未支付',
		intime:'2025-07-26',
		outtime:'2025-07-30',
		housetype:'大床房',
		num:'1',
		price:'85',
		breakfirst:'有',
		lianxiperson:'王明',
		lianxiphone:'15689288056',
		orderTime:'2025-07-26 09:00',
		ordertotal:'138',
		discount:'53',
		actualpay:'85',
	});
	const kuangshow = ref(false);
	// 酒店类型
	const housetypeList = ref([{
						name: '大床房',
						value: 'option1'
					},
					{
						name: '双床房',
						value: 'option2'
					},
					{
						name: '套房',
						value: 'option3' 
					},
					{
						name: '多床房',
						value: 'option4'
					}
	 ]);
	const selectedValue = ref(null);// 当前选中的值
	  // 酒店类型
	const housepriceList = ref([
		  {
			  name: '100-150',
			  value: 'option1'
		  },
		  {
			  name: '130-200',
			  value: 'option2'
		  },
		  {
			  name: '160-260',
			  value: 'option3' 
		  },
		  {
			  name: '200-300',
			  value: 'option4'
		  },
		  {
			  name: '250-380',
			  value: 'option5'
		  },
		  {
			  name: '300-450',
			  value: 'option6'
		  },
		  {
			  name: '400-600',
			  value: 'option7' 
		  },
		  {
			  name: '500-800',
			  value: 'option8'
		  },
		  {
			  name: '700-1000',
			  value: 'option9'
		  }
	]);
	const priceValue = ref(null); // 当前选中的值
	const breakfast = ref(true);
	const show = ref(false);
	const title = ref('提示');
	const content = ref('提交换房成功');
	const housenumber = ref(1);
          
    const goBack= () => {
               
        uni.navigateBack()
    };
	const doneClick = () => {
		kuangshow.value = false
	};
	const open = () => {
			  // console.log('open');
	 };
	 
	const close = () =>  {
		 kuangshow.value = false
	  // console.log('close');
	};
	//底部弹出框
	const chooseClick = () => {
		kuangshow.value = true
	};
	const handleChange = (value) =>  {
		selectedValue.value = value;
	};
	const handlepriceChange = (value) => {
		 priceValue.value = value;
	};
	//更改房型
	const changeHouse = () => {
		show.value = true;
	};
	const confirm = () => {
		show.value = false;
	};
	
	//减少间数
	const minushouse = () => {
		if (housenumber.value === 0) {
			return;
		} else{
			housenumber.value --;
		}
	};
	const addhouse = () => {
		
		housenumber.value ++;
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
	 .formView{
		 display: flex;
		 flex-direction: column;
		 width: 100%;
		 height: 55px;
	 }
	 .searchlocation{
	          margin-left: 20px;
	          width: 200px;
	          height: 35px;
	          font-size: 13px;
	 }
	 .addPriceView{
		 
		margin-top: 20px;
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
		margin-bottom: 10px;
	 }
	 .housetypeChoose{
	 			display: grid;
	 			grid-template-columns: repeat(2, 1fr); /* 两列 */
	 			grid-gap: 10px; /* 间距 */
	 			margin-left: 15px;
	 			margin-top: 15px;
	 			
	 		}
	 		.housepriceChoose{
	 			display: grid;
	 			grid-template-columns: repeat(3, 1fr); /* 两列 */
	 			grid-gap: 10px; /* 间距 */
	 			margin-left: 15px;
	 			margin-top: 15px;
	 		}
	 		.searchlocation{
	 		 margin-left: 4%;
	 		 width: 92%;
	 		 height: 35px;
	 		 margin-top: 10px;
	 		 border: 1px royalblue solid;
	 		 border-radius: 5px;
	 		 font-size: 13px;
	 }
    }
</style>