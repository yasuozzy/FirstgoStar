<template>
	<view class="container">
	  <!-- ============ 区域一 ============ -->
	  
	  <u-navbar
	    title="设施政策"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
	    <template #left>
	      <view class="u-nav-slot" slot="left">
	        <view class="flex">
	            <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
	        </view>
	      </view>
	    </template>
		</u-navbar>
		<view style="font-size: 16px;margin-top: 10px;margin-left: 15px;width: 100%;">{{hotel}}</view>
		<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 100%;">开业时间：{{openTime}}</view>
		<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 100%;">房间数量：{{houseNum}}</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 12px;">酒店等级：</view>
			<u-image style="margin-top: 3px;"
			:src="image"
			width="12px"
			height="12px"
			></u-image>
			<u-image style="margin-top: 3px;margin-left: 2px;"
			:src="image"
			width="12px"
			height="12px"
			></u-image>
		</view>
		<view style="font-size: 12px;margin-top: 10px;margin-left: 15px;width: 100%;">酒店电话：{{hotelphone}}</view>
		<view style="font-size: 16px;margin-top: 10px;margin-left: 15px;width: 100%;">设施服务</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">娱乐设施</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in politicList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">交通服务</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-left: 20px;">接站服务</view>
			<view style="font-size: 11px;background-color: lightgray;">收费</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">接送方式：专车</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">车型品牌：本田</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">营业时间：[周一-周日]07：00-23：00</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">预约信息：需要提前预约。请提前至少一小时联系酒店预约</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">收费信息：每车￥100</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-left: 20px;">送站服务</view>
			<view style="font-size: 11px;background-color: lightgray;">收费</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">接送方式：专车</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">车型品牌：本田</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">营业时间：[周一-周日]07：00-23：00</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">收费信息：每车￥100，300</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-left: 20px;">私人停车场</view>
			<view style="font-size: 11px;background-color: aliceblue;color: royalblue;margin-top: 2px;">免费</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">所处位置：酒店附近停车场</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">预约信息：不需要提前预约。</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-left: 20px;">叫车服务</view>
			<view style="font-size: 13px;margin-left: 100px;">租车服务</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">亲子设施</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in childrenList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">餐饮服务</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;color: royalblue;">’酒店的饭菜很好吃‘</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">餐厅</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">餐厅菜系：中餐</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in foodList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">滑雪</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in skipingList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">前台服务</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in tableList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">商务服务</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<view style="font-size: 13px;margin-left: 20px;">会议厅</view>
			<view style="font-size: 11px;background-color: aliceblue;color: royalblue;">收费</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 100%;">收费信息：每小时￥100</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in businessList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">公共区</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in publicList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">清洁服务</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in cleanList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">安全与安保</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in securityList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="font-size: 16px;margin-top: 10px;margin-left: 15px;width: 100%;">订房必读</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">景区要求</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">酒店位于景区内，进入酒店需购买景区门票，请提前联系酒店确认景区营业时间及门票购买事宜。</view>
		<view style="margin-top: 10px;width: 100%;height: 10px;background-color: aliceblue;"></view>
		<view style="font-size: 16px;margin-top: 10px;margin-left: 15px;width: 100%;">酒店政策</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">入离时间</view>
		</view>
		<view class="approval_list">
			<view class="politic_item" v-for="(item,index) in inoutList" :key="index">
				<view style="margin-top: 5px;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">押金</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">押金收取方式：固定收取￥100。</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">可接待人群</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">进接待持有中国内地、香港、澳门或者台湾签发的有限证件。</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">儿童入住及加床政策</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">欢迎携带儿童入住。</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">所有房型不可加床、不提供婴儿床。</view>
		<view class="headerV">
			<view style="margin-left: 5%;width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">年龄</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center; ">床铺</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">费用</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 0 0 6px 0;">17岁及以下</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center; ">使用现有床铺</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 30%;height: 25px;background-color: aliceblue;font-size: 12px;color: royalblue;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 0 6px 0;">免费</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">儿童早餐</view>
		</view>
		<view class="headerV">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 6px 0 0 0;">年龄</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 6px 0 0;">费用</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;">3岁及以下</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: royalblue;align-items: center;text-align: center;display: flex; justify-content: center;">免费</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;">4-12岁</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;align-items: center;text-align: center;display: flex; justify-content: center;">￥5/人</view>
		</view>
		<view class="contentView">
			<view style="margin-left: 5%;width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;color: black;align-items: center;text-align: center;display: flex; justify-content: center;border-radius: 0 0 6px 0;">13-17岁</view>
			<view style="width: 1px;height: 25px;background-color: lightgray"></view>
			<view style="width: 45%;height: 25px;background-color: aliceblue;font-size: 12px;align-items: center;text-align: center;display: flex; justify-content: center;border-radius:0 0 6px 0;">￥10/人</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">年龄限制</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">入住办理人需年满18周岁。</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">前台服务</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">前台营业时间：24小时营业。</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">早餐</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">餐食类型：中餐。</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">餐食形式：固定套餐，￥10/人。</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">营业时间：每天7：30-8：30开放。</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">宠物</view>
			<view style="font-size: 11px;background-color: aliceblue;color: royalblue;margin-top: 2px;">免费</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">允许携带宠物。</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">预定提示</view>
		</view>
		<view style="font-size: 11px;margin-top: 10px;margin-left: 35px;width: 90%;">订单需等酒店或供应商确认后生效，订单确认结果以平台短信、邮件或app通知为准。</view>
		<view style="margin-top: 10px;margin-left: 15px;width: 100%;display: flex;flex-direction: row;">
			<u-image style="margin-top: 3px;"
			:src="image"
			width="15px"
			height="15px"
			></u-image>
			<view style="font-size: 14px;margin-left: 5px;">住宿可用支付方式</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
	
	// 背景颜色
	const bgColor = ref("#2A9595");
	const hotel = ref('九宫山大饭店(铜山九宫山风景区云中胡店)');
	const openTime = ref('2021年');
	const houseNum = ref('50间');
	const image = ref("/static/home/homestay.png");
	const hotelphone = ref('15689288001');
	const politicList = ref([
					  {icon:"/static/home/homestay.png",name:"茶室"},
					  {icon:"/static/home/homestay.png",name:"家庭影院"},
					  {icon:"/static/home/homestay.png",name:"棋牌室"},
					  
	]);
	const childrenList = ref([
					  {icon:"/static/home/homestay.png",name:"儿童牙刷"},
					  {icon:"/static/home/homestay.png",name:"儿童拖鞋"},
					  
	]);
	const foodList = ref([
					  {icon:"/static/home/homestay.png",name:"大堂吧"},
					  {icon:"/static/home/homestay.png",name:"送餐服务"},
					  
	]);
	const skipingList = ref([
					  {icon:"/static/home/homestay.png",name:"滑雪用具寄存"},			  
	]);
	const tableList = ref([
		  {icon:"/static/home/homestay.png",name:"行李寄存"},
		  {icon:"/static/home/homestay.png",name:"电子身份证入住"},
		  {icon:"/static/home/homestay.png",name:"储物柜"},
		  {icon:"/static/home/homestay.png",name:"快速入住退房"},
		  {icon:"/static/home/homestay.png",name:"旅游票务服务"},
		  {icon:"/static/home/homestay.png",name:"前台贵重物品保险柜"},
		  {icon:"/static/home/homestay.png",name:"24小时前台"},
					  
	]);
	const businessList = ref([
		  {icon:"/static/home/homestay.png",name:"多媒体演示系统"},
		  {icon:"/static/home/homestay.png",name:"商务服务"},
		  {icon:"/static/home/homestay.png",name:"传真/复印"},
					  
	]);
	const publicList = ref([
		  {icon:"/static/home/homestay.png",name:"公用区WiFi"},
		  {icon:"/static/home/homestay.png",name:"公共音箱系统"},
		  {icon:"/static/home/homestay.png",name:"电梯"},
		  {icon:"/static/home/homestay.png",name:"吸烟区"},
		  {icon:"/static/home/homestay.png",name:"公共区域禁烟"},
					  
					  
	]);
	const cleanList = ref([
		  {icon:"/static/home/homestay.png",name:"洗涤用具"},
		  {icon:"/static/home/homestay.png",name:"洗衣房"},
		  {icon:"/static/home/homestay.png",name:"外送洗衣服务"},
					  
	]);
	const securityList = ref([
		  {icon:"/static/home/homestay.png",name:"火灾报警器"},
		  {icon:"/static/home/homestay.png",name:"门禁系统"},
		  {icon:"/static/home/homestay.png",name:"安保人员"},
		  {icon:"/static/home/homestay.png",name:"安全报警器"},
		  {icon:"/static/home/homestay.png",name:"公共区域监控"},
		  {icon:"/static/home/homestay.png",name:"灭火器"},
		  {icon:"/static/home/homestay.png",name:"烟雾报警器"},
					  
	]);
	const inoutList = ref([
		  {icon:"/static/home/homestay.png",name:"入住时间：14：00后"},
		  {icon:"/static/home/homestay.png",name:"退房时间：12：00前"},
					  
	]);		
		
	//返回
	const goBack= () => {
			
		uni.navigateBack()
	};	
	
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		background-color: white;
	 }
	 .flex{
	 	display: flex;
	 }
	 .approval_list{
	 	  display: flex;
	 	  background-color: white;
		  margin-left: 7%;
	 	  width: 86%;
	 	  flex-wrap: wrap; /* 允许换行 */
	 	  margin-top: 5px;
	 }
	 .politic_item{
	 	  display: flex;
	 	  flex-direction: row;
	 	  box-sizing: border-box;
	 	  width: 50%;
	 	  height: 20px;
	 	  
	 }
	 .headerV{
	 		 display: flex;
	 		 flex-direction: row;
			 margin-left: 5%;
	 		 width: 90%;
	 		 height: 25px;
	 		 margin-top: 10px;
	 }
	 .contentView{
		 display: flex;
		 flex-direction: row;
		 margin-left: 5%;
		 width: 90%;
		 height: 25px;
		 
	 }
</style>