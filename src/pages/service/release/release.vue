<template>
    <view class="main">
        <u-navbar
          title="发布"
          @rightClick="rightClick"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
          <template #left>
            <view class="u-nav-slot">
              <view class="flex">
                  <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
              </view>
            </view>
          </template>
          <template #right>
            <view style="display: flex; flex-direction: row; align-items: center;">
              <view style="margin-left: 10px;" @click="open()">
                  <u-image
                    :src="image"
                    width="20px"
                    height="20px"
                  ></u-image>
              </view>
              <view style="margin-left: 20px;" @click="myclick">
                  <u-image
                    :src="personImage"
                    width="20px"
                    height="20px"
                  ></u-image>
              </view>
            </view>
          </template>
        </u-navbar>
		<view class="greenHeaderView">
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment1Click">
				<view v-if="type === '1'" style="color: #2A9595;font-size: 15px;">推荐</view>
				<view v-else style="color: black;font-size: 15px;">推荐</view>
				<view class="whiteLine" v-if="type === '1'"></view>
			</view>
			<view style="width: 50%;display: flex;flex-direction:column;text-align: center;margin-top: 15px;" @click="segment2Click">
				<view  v-if="type === '2'" style="color: #2A9595;font-size: 15px;">关注</view>
				<view  v-else style="color: black;font-size: 15px;">关注</view>
				<view class="whiteLine" v-if="type === '2'"></view>
			</view>
		</view>
		<view style="display: flex;flex-direction: column;width: 100%;">
			<view class="listItem" v-for="(item,index) in datalist" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 15px;"
					  :src="item.userpicture"
					  width="30px"
					  height="30px"
					></u-image>
					<view style="display: flex;flex-direction: column;width: 75%;">
						<view style="margin-top: 8px;margin-left: 10px;font-size: 13px;">{{item.username}}</view>
						<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;color: darkgray;">{{item.createTime}}</view>
					</view>
					<view @tap.stop>
						<u-image v-if="item.iscollection === true" style="margin-top: 15px;margin-left: 15px;" 
						:src="collectStar"
						width="20px"
						height="20px"
						@click="cancelCollectClick(item)"
						></u-image>
						<u-image v-if="item.iscollection === false" style="margin-top: 15px;margin-left: 15px;"
						  :src="collectdefault"
						  width="20px"
						  height="20px"
						  @click="cellectClick(item)"
						></u-image>
					</view>
				</view>
				<view style="margin-top: 10px;margin-left: 4%;width: 92%;font-size: 13px;">{{item.bbsContent}}</view>
				<view style="margin-top: 10px;width: 100%;height: 30px;display: flex;flex-direction: row;">
					<u-image style="margin-top: 5px;margin-left: 15px;border-radius: 15px;"
					  :src="comments"
					  width="20px"
					  height="20px"
					></u-image>
					<view style="margin-left: 3px;margin-top: 5px;font-size: 13px;">{{item.reviewCount}}</view>
					<view @tap.stop>
						<u-image v-if="item.isgive === false" style="margin-top: 5px;margin-left: 40px;border-radius: 15px;"
						:src="like_default"
						width="20px"
						height="20px"
						@click="giveClcik(item)"
						></u-image>
						<u-image v-if="item.isgive === true" style="margin-top: 5px;margin-left: 40px;border-radius: 15px;"
						:src="like_selected"
						width="20px"
						height="20px"
						@click="givecancelClcik(item)"
						></u-image>
					</view>
					<view style="margin-left: 3px;margin-top: 5px;font-size: 13px;width: 55%;">{{item.likerCount}}</view>
					<u-image style="margin-top: 5px;margin-left: 20px;border-radius: 15px;"
					  :src="more"
					  width="20px"
					  height="20px"
					></u-image>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" :mask-click="false" >
			<view  style="background-color: darkslategray;margin-top: 50px;margin-left: 220px;width: 120px;height: 85px;display: flex;flex-direction: column;border-radius: 4px;">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 15px;margin-left: 15px;"
					  :src="normalImage"
					  width="15px"
					  height="15px"
					></u-image>
					<view style="margin-top: 11px;margin-left: 10px;font-size: 14px;color: white;" @click="normalClick">普通帖子</view>
				</view>
				<view style="margin-left: 10px;margin-top: 10px;width: 90%;background-color: lightgray;height: 1px;"></view>
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 15px;margin-left: 15px;"
					  :src="otherImage"
					  width="15px"
					  height="15px"
					></u-image>
					<view style="margin-top: 11px;margin-left: 10px;font-size: 14px;color: white;"  @click="otherclick">其他帖子</view>
				</view>
			</view>
		</uni-popup>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { serviceRelese, serviceReleseCollect, serviceReleseCancelCollect, serviceReleseDianZan, serviceReleseCancelDianZan } from '@/api/service';

const bgColor = ref("#2A9595");
const image = ref("/static/mine/addItemImage.png");
const normalImage = ref('/static/service/publishpost.png');
const otherImage = ref('/static/service/publishother.png');
const personImage = ref('/static/service/myIconImage.png');
const comments = ref('/static/service/comments.png');
const like_default = ref('/static/service/like_default.png');
const like_selected = ref('/static/service/like_selected.png');
const more = ref('/static/service/more.png');
const type = ref("1");
const collectStar = ref('/static/service/collect_selected.png');
const collectdefault = ref('/static/service/collect_default.png');
const showMenu = ref(false);
const datalist = ref<any[]>([]);
const popup = ref<any>(null);

const DataParam = ref<any>({
	managementId: "68a490a123f94b0eabe3a1cf34e29678",
	page: 1,
	userId: "a09ce1a089784782947303987cbdc871",
	size: 10,
	type: '1'
});

const collectParam = ref<any>({
	AnnounceId: '',
	userId: "a09ce1a089784782947303987cbdc871"
});

onMounted(() => {
	init();
});

const init = () => {
	try {
		DataParam.value.type = type.value;
		serviceRelese(DataParam.value).then((res: any) => {
			console.log(res);
			datalist.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const segment1Click = () => {
	type.value = "1";
	init();
};

const segment2Click = () => {
	type.value = "2";
	init();
};

const myclick = () => {
	uni.navigateTo({
		url: '/pages/service/release/releasemine'
	});
};

const open = () => {
	if (popup.value) {
		popup.value.open('top');
	}
};

const normalClick = () => {
	if (popup.value) popup.value.close();
	uni.navigateTo({
		url: '/pages/service/release/ordinarypost'
	});
};

const otherclick = () => {
	if (popup.value) popup.value.close();
	uni.navigateTo({
		url: '/pages/service/release/otherpost'
	});
};

const detailClick = (item: any) => {
	uni.navigateTo({
		url: '/pages/service/release/releaseDetail?AnnounceId=' + item.id
	});
};

const cellectClick = (item: any) => {
	try {
		collectParam.value.AnnounceId = item.id;
		serviceReleseCollect(collectParam.value).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
};

const cancelCollectClick = (item: any) => {
	try {
		collectParam.value.AnnounceId = item.id;
		serviceReleseCancelCollect(collectParam.value).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
};

const giveClcik = (item: any) => {
	try {
		collectParam.value.AnnounceId = item.id;
		serviceReleseDianZan(collectParam.value).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
};

const givecancelClcik = (item: any) => {
	try {
		collectParam.value.AnnounceId = item.id;
		serviceReleseCancelDianZan(collectParam.value).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
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
	 .greenHeaderView{
	 	display: flex;
	 	flex-direction: row;
	 	background-color: white;
	 	width: 100%;
	 	height: 50px;
	 }
	 .whiteLine{
	 		 margin-left: 40%;
	 		 margin-top: 5px;
	 		 width: 20%;
	 		 height: 2px;
	 		 background-color: #2A9595;
	 }
	 .listItem{
		 width: 100%;
		 border: 1px lightgray solid;
		 display: flex;
		 flex-direction: column;
	 }
    }
</style>