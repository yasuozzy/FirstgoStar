<template>
	<view>
		<u-navbar title="购物车" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
				<view @click="goBack">
					<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
				</view>
			</template>
		</u-navbar>
		<view style="padding: 5px 15px">
			<view style="
          display: flex;
          flex-direction: row;
          margin: 5px 0;
          padding-right: 15px;
        ">
				<image v-if="!shopinfo.checked" @click="selectAll()" style="width: 20px; height: 20px"
					:src="choose_default"></image>
				<image v-if="shopinfo.checked" @click="removeAll()" style="width: 20px; height: 20px"
					:src="choose_selected"></image>
				<view style="margin-left: 10px; margin-right: 10px">{{
          shopinfo.shopName
        }}</view>
				<u-icon name="arrow-right" color="#333" size="20"></u-icon>
			</view>
			<view>
				<view v-for="(childitem, childindex) in productList" :key="childindex">
					<u-line color="#f5f5f5"></u-line>
					<view style="
              display: flex;
              flex-direction: row;
              align-items: center;
              padding-top: 5px;
              padding-bottom: 5px;
            ">
						<image @click="selectContact(childindex)" v-if="!childitem.checked"
							style="width: 20px; height: 20px" :src="choose_default"></image>
						<image @click="removeContact(childindex)" v-if="childitem.checked"
							style="width: 20px; height: 20px" :src="choose_selected"></image>
						<image style="width: 85px; height: 85px; margin-left: 10px" :src="getImg(childitem.img)">
						</image>
						<view style="margin-left: 10px">
							<view style="display: flex; justify-content: space-between">
								<view>
									<view style="font-size: 15px">{{ childitem.name }}</view>
									<view style="font-size: 13px">{{ childitem.specs }}</view>
									<view style="font-size: 15px; color: #2a9598">¥{{ childitem.price }}</view>
									<view style="display: flex; flex-direction: row; height: 25px">
										<view @click.stop="cardec(childitem)" style="
                        border: 1px solid #666;
                        width: 16px;
                        text-align: center;
                        border-radius: 5px;
                        margin-right: 5px;
                      ">-</view>
										<view>{{ childitem.buyNums }}</view>
										<view @click.stop="caradd(childitem)" style="
                        margin-left: 5px;
                        border: 1px solid #2a9595;
                        width: 16px;
                        border-radius: 5px;
                        color: white;
                        text-align: center;
                        background-color: #2a9595;
                      ">+</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-gap height="10" bgColor="#f5f5f5"></u-gap>
		</view>
		<view style="
        position: fixed;
        display: flex;
        flex-direction: row;
        width: 100%;
        bottom: 0;
        background-color: antiquewhite;
        height: 50px;
      ">
			<view style="margin-top: 15px; margin-left: 15px; flex: 1">
				<image v-if="!shopinfo.checked" @click="selectAll" style="width: 16px; height: 16px"
					:src="choose_default"></image>
				<image v-if="shopinfo.checked" @click="removeAll" style="width: 16px; height: 16px"
					:src="choose_selected"></image>
				<text style="font-size: 16px">全选</text>
			</view>

			<view style="height: 50px; margin-top: 5px">
				<view style="font-size: 14px">合计：{{ cash }}元</view>
				<view style="font-size: 11px">不含运费</view>
			</view>
			<view style="
          background-color: #2a9598;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 15px;
          color: white;
          height: 30px;
          line-height: 30px;
          margin: 10px 20px;
        " @click="submitOrder">提交订单</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { getGoodsCarList, updateGoodsCarNum } from "@/api/service.ts";

	import { ref } from "vue";

	import { onLoad } from "@dcloudio/uni-app";

	import { BaseImgURL, storage } from "@/utils/storage";
	
	const providerCode = ref("");

	const bgColor = ref("#0080ff");

	const value = ref(1);

	const productList = ref([]);

	const shopinfo = ref({});
		
	const contactList = ref();

	const select = ref(false);

	const cash = ref(0);

	const choose_default = ref('/static/login/choose_unselect.png');

	const choose_selected = ref('/static/login/choose_select.png');

	const goBack = () => {
		uni.navigateBack();
	};

	function getImg(img?: string) {
	  if (!img) return "/static/default-image.png";
	  if (/^https?:\/\//.test(img) || img.startsWith("/static")) return img;
	  return `${BaseImgURL}${img.replace(/^\//, "")}`;
	}
	

	const getcartlist = () => {
		let param = {
			userId: storage.getUserId(),
			providerCode: providerCode.value,
			manageId: storage.getManid()
		};
		console.log(param);
		getGoodsCarList(param).then(res => {
			console.log(res);
			contactList.value = res.result;
			productList.value = res.result.dataList[0].groupValues||[];
			shopinfo.value = res.result.dataList[0].groupName||{};
			shopinfo.value.checked = res.result.dataList[0].groupName.checked;
			productList.value.forEach(item => {
				item["checked"] = true;
			});
			console.log(contactList.value);
			getscoreAndprice();
		});
	};

	const valChange = (e) => {
		console.log("当前值为: " + e.value);
		// 获取触发该事件的商品项索引或其他标识信息
		const index = e.index; // 如果组件提供了索引
		const cartId = productList.value[index].cartId; // 假设商品数据中有 cartId 字段

		// 调用更新方法，传入购买数量和购物车ID
		updatGoodsCarNum(e.value, cartId);
	};

	const adCart = (buynum, sku) => {
		let param = {
			userId: storage.getUserId(),
			sku: sku,
			nums: buynum + "",
			type: "0"
		};
		console.log(param);
		addCart(param).then(res => {
			console.log(res);
			getcartlist();
		});
	};

	const caradd = (item) => {
		console.log(item);
		item.buyNums++;
		if (item.buyNums == 1) {
			adCart(item.buyNums, item.sku);
		} else {
			updatGoodsCarNum(item.buyNums, item.cartId);
		}
	};

	const cardec = (item) => {
		if (item.buyNums === 0) {
			

			return;
		} else {
			console.log(item);
			item.buyNums--;
			updatGoodsCarNum(item.buyNums, item.cartId);
		}
	};

	const updatGoodsCarNum = (buynum, cartid) => {
		let param = {
			userId: storage.getUserId(),
			cartId: cartid,
			buyNums: buynum
		};
		console.log(param);
		updateGoodsCarNum(param).then(res => {
			console.log(res);
			getcartlist();
		});
	};

	const selectAll = () => {
		shopinfo.value.checked = true;
		productList.value.forEach(childitem => {
			childitem.checked = true;
		});
		getscoreAndprice();
	};

	const removeAll = () => {
		shopinfo.value.checked = false;
		productList.value.forEach(childitem => {
			childitem.checked = false;
		});
		getscoreAndprice();
	};

	const selectContact = (childindex) => {
		productList.value[childindex].checked = true;
		getscoreAndprice();
		let num = 0;
		productList.value.forEach(childitem => {
			if (childitem.checked) {
				num++;
			}
		});
		if (num === productList.value.length) {
			shopinfo.value.checked = true;
		} else {
			shopinfo.value.checked = false;
		}
	};

	const removeContact = (childindex) => {
		productList.value[childindex].checked = false;
		getscoreAndprice();
		let num = 0;
		productList.value.forEach(childitem => {
			if (childitem.checked) {
				num++;
			}
		});
		if (num === productList.value.length) {
			shopinfo.value.checked = true;
		} else {
			shopinfo.value.checked = false;
		}
	};

	const getscoreAndprice = () => {
		cash.value = 0;
		let selectedItems = productList.value.filter(item => item.checked);
		selectedItems.forEach(childitem => {
			cash.value += (childitem.price || 0) * childitem.buyNums;
		});
	};

	const submitOrder = () => {
		let orderCompleteParamList = [];
		let products = [];
		let allnums = 0;
		let totalmoney = 0;
		let orderCompleteParam = {};
		let selectedItems = productList.value.filter(item => item.checked);
		selectedItems.forEach(childitem => {
			let product = {};
			product.cartId = childitem.cartId;
			product.giftGoodsFlag = childitem.giftGoodsFlag;
			product.sku = childitem.sku;
			product.name = childitem.name;
			product.price = childitem.price;
			product.img = childitem.img;
			product.nums = childitem.buyNums;
			product.specs = childitem.specs;
			product.sums = childitem.buyNums * childitem.price;
			allnums = allnums + childitem.buyNums;
			if (childitem.skuActiveId) {
				totalmoney = totalmoney + product.sums;
			}
			products.push(product);
		});
		orderCompleteParam.productArray = products;
		orderCompleteParam.shopCode = shopinfo.value.shopCode;
		orderCompleteParam.shopName = shopinfo.value.shopName;
		orderCompleteParam.nums = allnums;
		orderCompleteParamList.push(orderCompleteParam);
		console.log(orderCompleteParamList);
		uni.setStorageSync("BussinessShopCarList", orderCompleteParamList);
		uni.navigateTo({
			url: "/pages/service/BussinessCircle/BussinessShopConfirmOrderPage"
		});
	};

	onLoad((e) => {
		console.log(e)
		providerCode.value = e.providerCode;
		getcartlist();
	});
</script>

<style></style>