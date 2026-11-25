<template>
  <view class="container" style="background-color: #fafafa; height: 100vh">
    <!-- ============ 区域一 ============ -->
    <!-- padding: 10px 0px;  -->
    <view class="center">
      <image
        src="@/static/service/myIconImage.png"
        style="width: 40px; height: 40px;background-color: lightgray;border-radius: 20px;"
        mode="aspectFit"
      ></image>
      <view
        style="
          margin-top: 15px;
		  margin-left: 10px;
          color: #fff;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          width: 200px;
		  height: 50px;
        "
      >
        <view>{{ name }}</view>
        <view style="margin-top: 10px;">{{ phone }}</view>
      </view>
      <view
        @click="toDetail"
        style="color: white; margin: 20px 15px; font-size: 14px"
      >
        积分明细
      </view>
    </view>
    <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    <view>
      <view
        class="item"
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 8px 15px;
        "
      >
        <view
          style="
            display: flex;
            flex-direction: row;
            height: 25px;
            line-height: 25px;
          "
        >
          <image
            src="@/static/mine/chongzhiImage.png"
            style="width: 20px; height: 20px;margin-top: 3px;"
            mode="aspectFill"
          ></image>
          <view style="margin-left: 10px;" class="areaTop_title"> 充值积分 </view>
        </view>
        <view class="areaTop_title"> {{chongzhiJiFen}} </view>
        <view
          style="
            display: flex;
            flex-direction: row;
            height: 25px;
            line-height: 25px;
          "
        >
          <image
            src="@/static/mine/chargeQuan.jpg"
            style="width: 20px; height: 20px;margin-top: 3px;"
            mode="aspectFill"
          ></image>
          <view @click="exchange(0)"  class="areaTop_title"> 去兑换 </view>
        </view>
      </view>
    </view>
    <view>
      <view
        class="item"
        style="
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 8px 15px;
        "
      >
        <view
          style="
            display: flex;
            flex-direction: row;
            height: 25px;
            line-height: 25px;
          "
        >
          <image
            src="@/static/mine/normalJiFen.jpg"
            style="width: 20px; height: 20px;margin-top: 3px;"
            mode="aspectFill"
          ></image>
          <view style="margin-left: 10px;" class="areaTop_title"> 普通积分 </view>
        </view>
        <view class="areaTop_title"> {{putongjifen}} </view>
        <view
          style="
            display: flex;
            flex-direction: row;
            height: 25px;
            line-height: 25px;
          "
        >
          <image
            src="@/static/mine/chargeQuan.jpg"
            style="width: 20px; height: 20px;margin-top: 3px;"
            mode="aspectFill"
          ></image>
          <view @click="exchange(1)" class="areaTop_title"> 去兑换 </view>
        </view>
      </view>
    </view>
    <view style="width: 100%;height: 50px;background-color: #8B0000;margin-top: 10px;">
		<view style="width: 100px;height: 1px;"></view>
		<view style="width: 100%;color: white;margin-top: 10px;text-align: center;display: flex;justify-content: center;align-items: center;">公益捐赠</view>
	</view>
    
    <!-- ============ 区域二 ============ -->
  </view>
</template>

<script setup lang="ts">
	import { mineGetMyIntegral,mineIntegralJuanZeng } from "@/api/mine";
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';

      // 背景颜色
      const bgColor = ref("#0080ff");
      const name = ref("");
      const phone =  ref("");
      const putongjifen = ref("0");
      const chongzhiJiFen = ref("0");
	  const juanzengList = ref<any[]>([]);
      const evenSortItems =  ref([
        {
          name: "2023-10-01",
          endMoney: "1000.00",
          yearStartMoney: "注册",
          style: 0,
        },
        {
          name: "2023-10-01",
          endMoney: "1000.00",
          yearStartMoney: "注册",
          style: 0,
        },
        {
          name: "2023-10-01",
          endMoney: "1000.00",
          yearStartMoney: "注册",
          style: 0,
        },
        {
          name: "2023-10-01",
          endMoney: "1000.00",
          yearStartMoney: "注册",
          style: 0,
        },
        {
          name: "2023-10-01",
          endMoney: "1000.00",
          yearStartMoney: "注册",
          style: 0,
        },
      ]);
   
	  onMounted(() => {
		  
		name.value = getStorage(storageKeys.realName,'');
		phone.value = getStorage(storageKeys.phone,'');
		init();
		getJuanZengList();
	  });
 
		const init = async() => {
			try {
				
				let data1 = {
				  userId: getStorage(storageKeys.userId,''),
				};
				const res = await mineGetMyIntegral(data1);
				console.log(res);
				putongjifen.value = res.result.ordIntegral;
				chongzhiJiFen.value = res.result.chaIntegral;
				
				
			} catch (error) {
				console.log(error)
			}
		  
		};
		//捐赠列表
		const getJuanZengList = async() => {
			
			try {
				
				let data1 = {};
				const res = await mineIntegralJuanZeng(data1);
					
				console.log(res);
				juanzengList.value = res.result;
				
			} catch (error) {
				console.log(error)
			}
			
		};
		const toDetail = () => {
		  uni.navigateTo({
			url: "/pages/mine/myIntegral/InInvoiceListPage",
		  });
		};
		const exchange = (type:any) => {
		  uni.navigateTo({
			url:"/pages/mine/myIntegral/IntegralCity?type=" + type  
		  });
		};
  
</script>
<style lang="scss" scoped>
.center {
  height: 120px;
  background-color: #0080ff;
  display: flex;
  flex-direction: row;
  image {
    margin-top: 20px;
    margin-left: 20px;
  }
}
.table_row {
  display: flex;
  font-size: 14px;
  margin: 0 3px;
  height: 40px;
  border-bottom: 1px solid #e0e0e0;
  .table-cell {
    flex: 1;
    text-align: center;
    border-right: none;
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
.table_header {
  display: flex;
  font-size: 14px;
  margin: 0 3px;
  height: 60px;
  border-bottom: 1px solid #e0e0e0;
  .table-cell {
    flex: 1;
    text-align: center;
    border-right: none;
    border-bottom: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .bgc {
    color: #333;
  }
  .table-cell1 {
    border: 1px solid #e0e0e0;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
