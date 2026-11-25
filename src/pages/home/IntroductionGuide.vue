<template>
    <view class="main">
        <u-navbar
          title="简介攻略"
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
		<view style="display: flex;flex-direction: row;width: 100%;height: 40px;">
			<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">开放时间</view>
			<view style="color: limegreen;font-size: 12px;margin-top: 12px;background-color: palegreen;border-radius: 4px;height: 15px;">开园中</view>
		</view>
		<view style="margin-left: 15px;font-size: 13px;color: dimgray;">建议时长约1天</view>
		<view style="margin-left: 4%;color: dimgray;background-color: aliceblue;width: 92%;border-radius: 4px;height: 30px;margin-top: 10px;display: flex;align-items: center;">
			<view style="margin-left: 10px;font-size: 13px;">全年</view>
		</view>
		<view style="margin-left: 4%;color: dimgray;width: 92%;border-radius: 4px;height: 30px;display: flex;align-items: center;border: 1px aliceblue solid;">
			<view style="margin-left: 10px;font-size: 13px;">8:30-17:30开放</view>
		</view>
		<view style="margin-left: 4%;color: dimgray;background-color: aliceblue;width: 92%;border-radius: 4px;height: 30px;margin-top: 10px;display: flex;align-items: center;">
			<view style="margin-left: 10px;font-size: 13px;">17：30后请在景区线下补票窗口取票入园</view>
		</view>
		<view style="margin-left: 15px;font-size: 9px;color: dimgray;margin-top: 10px;">*以上信息为当地时间，仅供参考，具体以当日公示为准</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">门票&预约时间</view>
		<view style="margin-left: 4%;color: dimgray;background-color: aliceblue;width: 92%;border-radius: 4px;height: 30px;margin-top: 10px;display: flex;align-items: center;">
			<view style="margin-left: 10px;font-size: 13px;">门票</view>
		</view>
		<view style="margin-left: 4%;color: dimgray;width: 92%;border-radius: 4px;height: 30px;display: flex;align-items: center;border: 1px aliceblue solid;">
			<view style="margin-left: 10px;font-size: 13px;">门市价￥60起</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">门市价格实拍图</view>
		<view style="margin-top: 10px;margin-right: 4%;width: 92%;height: 200px;border-radius: 6px;">
			<u-image style="margin-left: 15px;"
			  :src="image"
			  width="345px"
			  height="200px"
			></u-image>
		</view>
		<view style="margin-left: 15px;font-size: 9px;color: dimgray;margin-top: 10px;">*图片更新时间：2022年6月23日</view>
		<view style="margin-left: 15px;font-size: 9px;color: dimgray;margin-top: 5px;">*以上信息仅供参考，具体以景点当日实际公示信息为准</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">优待政策</view>
		<view style="margin-left: 4%;margin-top: 10px;width: 92%;height: 40px;display: flex;flex-direction: row;border-radius: 5px 5px 0 0;">
			<view style="width: 30%;background-color: aliceblue;height: 40px;font-size: 13px;display: flex;justify-content: center;align-items: center;border-radius: 5px 0 0 0;">适用人群</view>
			<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
			<view style="width: 40%;background-color: aliceblue;height: 40px;font-size: 13px;display: flex;justify-content: center;align-items: center;">适用条件</view>
			<view style="width: 1px;height: 40px;background-color: lightgray;"></view>
			<view style="width: 30%;background-color: aliceblue;height: 40px;font-size: 13px;display: flex;justify-content: center;align-items: center;border-radius: 0 5px 0 0;">优待政策</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 120px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 120px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">援鄂医疗队元</view>
			<view style="width: 40%;height: 120px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">{{helpcontent}}</view>
			<view style="width: 30%;height: 120px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">免费</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 320px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 320px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">儿童</view>
			<view style="width: 40%;height: 320px;display: flex;flex-direction: column;">
				<view class="contentView" v-for="(item,index) in childrenList" :key="index">
					{{item.title}}
				</view>
			</view>
			<view style="width: 30%;height: 320px;display: flex;flex-direction: column;">
				<view class="contentView" v-for="(item,index) in childrenList" :key="index">
					{{item.policy}}
				</view>
			</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 160px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 160px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">老人</view>
			<view style="width: 40%;height: 160px;display: flex;flex-direction: column;">
				<view class="contentView" v-for="(item,index) in olderList" :key="index">
					{{item.title}}
				</view>
			</view>
			<view style="width: 30%;height: 160px;display: flex;flex-direction: column;">
				<view class="contentView" v-for="(item,index) in olderList" :key="index">
					{{item.policy}}
				</view>
			</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 80px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">残疾人</view>
			<view style="width: 40%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">{{canjicontent}}</view>
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">九宫山大门票免费</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 80px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">军人</view>
			<view style="width: 40%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">{{solgercontent}}</view>
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">九宫山大门票免费</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 80px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">记者</view>
			<view style="width: 40%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">{{jizhecontent}}</view>
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">九宫山大门票免费</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 80px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">烈士家属</view>
			<view style="width: 40%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">{{homecontent}}</view>
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">九宫山大门票免费</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 80px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">导游</view>
			<view style="width: 40%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">{{guidercontent}}</view>
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">九宫山大门票免费</view>
		</view>
		<view style="margin-left: 4%;width: 92%;height: 80px;display: flex;flex-direction: row;">
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">学生</view>
			<view style="width: 40%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">{{studentcontent}}</view>
			<view style="width: 30%;height: 80px;font-size: 12px;display: flex;justify-content: center;align-items: center;border: 0.5px lightgray solid;">九宫山大门票免费</view>
		</view>
		<view style="margin-left: 4%;color: dimgray;background-color: aliceblue;width: 92%;border-radius: 4px;height: 50px;margin-top: 10px;display: flex;align-items: center;">
			<view style="margin-left: 10px;font-size: 13px;">{{attention}}</view>
		</view>
		<view style="margin-left: 15px;font-size: 9px;color: dimgray;margin-top: 5px;">*以上信息仅供参考，具体以景点当日实际公告信息为</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 14px;">信息介绍</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">图文详情</view>
		<view style="margin-left: 4%;width: 92%;height: 120px;font-size: 12px;margin-top: 10px;">{{specinfo}}</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">服务设施</view>
		<view style="margin-left: 4%;width: 92%;height: 60px;display: flex;flex-direction: row;">
			<view style="border: 1px solid royalblue;width: 60px;height: 40px;border-radius: 5px;display: flex;flex-direction: column;align-items: center;justify-content: center;margin-top: 10px;background-color: aliceblue;">
				<u-image 
				  :src="image"
				  width="12px"
				  height="12px"
				></u-image>
				<view style="font-size: 12px;">停车场</view>
			</view>
			<view style="border: 1px solid black;width: 60px;height: 40px;border-radius: 5px;display: flex;flex-direction: column;align-items: center;justify-content: center;margin-top: 10px;margin-left: 10px;">
				<u-image 
				  :src="image"
				  width="12px"
				  height="12px"
				></u-image>
				<view style="font-size: 12px;">园内交通</view>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">停车场</view>
		<view style="margin-left: 4%;color: dimgray;background-color: aliceblue;width: 92%;border-radius: 4px;height: 30px;margin-top: 10px;display: flex;align-items: center;">
			<view style="margin-left: 10px;font-size: 13px;color: dimgray;">九宫山停车场</view>
		</view>
		<view style="margin-left: 4%;color: dimgray;width: 92%;border-radius: 4px;height: 60px;display: flex;border: 1px lightgray solid;flex-direction: column;">
			<view style="margin-left: 10px;font-size: 12px;">参考价格：￥0/小时</view>
			<view style="margin-left: 10px;font-size: 12px;">地址：湖北省咸宁市通山县九宫山停车场</view>
			<view style="margin-left: 10px;font-size: 12px;">库位：3000</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 16px;">温馨提示</view>
		<view style="margin-left: 4%;color: dimgray;width: 92%;height: 300px;margin-top: 10px;">
			<view style="font-size: 13px;">{{tipsone}}</view>
			<view style="font-size: 13px;">{{tipstwo}}</view>
			<view style="font-size: 13px;">{{tipsthree}}</view>
			<view style="font-size: 13px;">{{tipfour}}</view>
			<view style="font-size: 13px;">{{tipsfive}}</view>
			<view style="font-size: 13px;">{{tipssix}}</view>
		</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 15px;font-size: 16px;">实用攻略</view>
		<view style="display: flex;flex-direction: row;width: 92%;margin-left: 4%;height: 40px;">
			<view style="margin-top: 10px;margin-left: 5px; font-size: 13px;width: 75%;">景区出入口</view>
			<view style="display: flex;flex-direction: row;border: 1px royalblue solid;border-radius: 4px;width: 80px;height: 20px;margin-top: 10px;align-items: center;justify-content: center;">
				<u-image
				  :src="image"
				  width="10px"
				  height="10px"
				></u-image>
				<view style="font-size: 12px;color: royalblue;">查看地图</view>
			</view>
		</view>
		<view style="margin-left: 15px; font-size: 13px;width: 75%;">·九宫山·北门</view>
		<view style="width: 100%;height: 10px;background-color: aliceblue;margin-top: 10px;"></view>
		<view style="margin-top: 10px;margin-left: 4%;width: 92%;height: 150px;display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;"
			  :src="image"
			  width="60px"
			  height="60px"
			></u-image>
			<view style="margin-left: 10px;display: flex;flex-direction: column;">
				<view style="font-size: 15px;margin-top: 10px;">通山</view>
				<view style="font-size: 12px;margin-top: 5px;">所属目的地</view>
			</view>
		</view>
		<view class="footer-container">
		     <view class="order-button" @click="checkProduct">查看商品</view>     
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
    
	// 背景颜色
	const bgColor = ref("#2A9595");
	const image = ref("/static/home/swiper.png");
	const helpcontent = ref('对援鄂医疗队员颁发“灵秀湖北感恩卡”，凭卡可携带亲属一名，5年内不限次免门票(首道大门票);免费时间:开园至2024年12月31日。');
	const childrenList = ref([
		{title:'有监护人陪同，6周岁(含6周岁)以下或身高1.2米(含1.2米)以下的儿童。',policy:'九宫山大门票免费'},
		{title:'有监护人陪同，持本人有效证件身高在1.2米(不含)至1.4米(含)的儿章。',policy:'九宫山大门票优惠'},
		{title:'有监护人陪同，6周岁(含6周岁)以下或身高1.2米(含1.2米)以下的儿童。',policy:'云中湖索道免费'},
		{title:'有监护人陪同，持本人有效证件身高在1.2米(不含)至1.4米(含)的儿童。',policy:'云中湖索道优惠'},
		
	]);
	const olderList = ref([
		{title:'有监护人陪同，持本人有效证件年满60且不满70周岁老人周岁以上老年人。',policy:'九宫山大门票优惠'},
		{title:'有监护人陪同，持本人有效证件年满65周岁以上老年人。',policy:'云中湖索道优惠'},
	]);
	const canjicontent = ref('持本人《残疾证》者。');
	const solgercontent = ref('持本人《军官证》、《士兵证》的现役军人和军队离休，退休干部。');
	const jizhecontent = ref('持国家新闻出版署颁发的《记者证》的媒体记者。');
	const homecontent = ref('持《烈士证明书》的烈士家属。');
	const guidercontent = ref('持《旅行社经理资格证》和身份证的旅行社经理，持《国家导游证》的导游。');
	const studentcontent = ref('全国在读大学生免首通门票(凭有效证件)，免票时间:2023年9月29日-2024年9月29日');
	const attention = ref('1、以上信息仅供参考，具体信息以景区为准。 2、优惠票价格以景区窗口公示价格为准，仅限线下购买。');
	const specinfo = ref('九宫山风景区，位于咸宁市通山县境内，距离武汉市区约200公里，景区内奇峰耸立，幽谷纵横，有奇松怪石、云海温泉和瀑布，其中最重要的景点是闯王陵(李自成墓)，闯王陵位于九宫山西麓牛迹岭小月山上(也叫黄株包)，主体建筑有门楼、墓冢、陈列馆。景区内还有真君石殿、石龙峡、周家大屋、十八潭、滑雪场等分景区或景点。');
	const tipsone = ref('①预订门票: 九宫山大门票为九宫山景区游览门票包含免费景点迎客松、胜似桃园、陶姚仙踪、铜鼓包拨云亭、云中湖、泉崖喷雪;石龙峡门票为石龙峡景区游览门票;景区索道(往返)为九宫山云中湖到石龙峡景区往返门票;套票为九宫山景区门票+石龙峡景区门票+景区索道(往返)的门票(在取票后未使用均为有效期，注意淡季票不可以在旺季期间使用，淡季9.1~5.31旺季为6.1-8.31)。');
	const tipstwo = ref('②另付费项目:餐饮，住宿等需另付费。');
	const tipsthree = ref('③门票当天有效，出园需入园，请再次购票');
	const tipfour = ref('④为保证入园顺利，预订时请务必填写真实姓名、手机号码等信息。');
	const tipsfive = ref('⑤索道为户外项目，受天气等不可抗力因素影响较大!建议您出行前查看当地天气预报。');
	const tipssix = ref('6(景点有宾馆，可选择住宿)当天预定需至少提前2小时下订单，游客不得在景区门口进行网上订票，不支持立即取票。紧急事件处理请致电短信中电话');
        
	const goBack = () => {
		
		uni.navigateBack()
	};
	const checkProduct = () => {
		uni.navigateTo({
			url:'/pages/home/viewsDetail'
		})
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
	 .contentView{
		 width: 100%;
		 height: 80px;
		 font-size: 12px;
		 display: flex;
		 justify-content: center;
		 align-items: center;
		 border: 0.5px lightgray solid;
	 }
	 .footer-container {
	       position: fixed;
	       bottom: 0;
	       left: 0;
	       right: 0;
	       height: 50px;
	       background-color: white;
	       box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
	       z-index: 100;
	       color: white;
	       display: flex;
	       justify-content: center; /* 水平居中 */
	       align-items: center;     /* 垂直居中 */
	       
	     }
	     .order-button {
	                  
	         display: flex;
	         justify-content: center; /* 水平居中 */
	         align-items: center;     /* 垂直居中 */
	         height: 30px;           /* 需要设置高度 */
	         width: 92%;
	         font-size: 13px;
	         color: white;
	         background-color: darkorange;
	         border-radius: 6px;
	         margin-left: 4%;
	         margin-top: 5px;
	     }
    }
</style>