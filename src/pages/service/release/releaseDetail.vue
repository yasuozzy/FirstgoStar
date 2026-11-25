<template>
    <view class="main">
        <u-navbar
          title="发布详情"
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
        </u-navbar>
		<view style="display: flex;flex-direction: row;">
			<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 15px;"
			  :src="dataDict.userpicture"
			  width="30px"
			  height="30px"
			></u-image>
			<view style="display: flex;flex-direction: column;width: 75%;">
				<view style="margin-top: 8px;margin-left: 10px;font-size: 13px;">{{dataDict.username}}</view>
				<view style="margin-top: 5px;margin-left: 10px;font-size: 12px;color: darkgray;">{{dataDict.createTime}}</view>
			</view>
			<view @tap.stop>
				<u-image v-if="dataDict.iscollection === true" style="margin-top: 15px;margin-left: 15px;"
				:src="collectStar"
				width="20px"
				height="20px"
				@click="cancelCollectClick()"
				></u-image>
				<u-image v-if="dataDict.iscollection === false" style="margin-top: 15px;margin-left: 15px;"
				:src="collectdefault"
				width="20px"
				height="20px"
				@click="cellectClick()"
				></u-image>
			</view>
		</view>
		<view style="margin-top: 10px;margin-left: 4%;width: 92%;font-size: 13px;">{{dataDict.bbsContent}}</view>
		<view style="margin-top: 10px;width: 100%;height: 30px;display: flex;flex-direction: row;">
			<u-image style="margin-top: 5px;margin-left: 15px;border-radius: 15px;"
			  :src="comments"
			  width="20px"
			  height="20px"
			></u-image>
			<view style="margin-left: 3px;margin-top: 5px;font-size: 13px;">{{dataDict.reviewCount}}</view>
			<view @tap.stop>
				<u-image v-if="dataDict.isgive === false" style="margin-top: 5px;margin-left: 40px;border-radius: 15px;"
				:src="like_default"
				width="20px"
				height="20px"
				@click="giveClcik()"
				></u-image>
				<u-image v-if="dataDict.isgive === true" style="margin-top: 5px;margin-left: 40px;border-radius: 15px;"
				:src="like_selected"
				width="20px"
				height="20px"
				@click="givecancelClcik()"
				></u-image>
			</view>
			<view style="margin-left: 3px;margin-top: 5px;font-size: 13px;width: 55%;">{{dataDict.likerCount}}</view>
			<u-image style="margin-top: 5px;margin-left: 20px;border-radius: 15px;"
			  :src="more"
			  width="20px"
			  height="20px"
			></u-image>
		</view>
		<view style="margin-top: 10px;height: 5px;background-color: aliceblue;width: 100%;"></view>
		<view style="width: 100%;display: flex;flex-direction: column;">
			<view class="listItem" v-for="(item,index) in commentList" :key="index" @click="detailClick(item)">
				<view style="display: flex;flex-direction: row;">
					<u-image style="margin-top: 10px;margin-left: 15px;border-radius: 15px;"
					  :src="item.sendUserPicture ? item.sendUserPicture : normalIcon"
					  width="25px"
					  height="25px"
					></u-image>
					<view style="display: flex;flex-direction: row;width: 75%;">
						<view style="margin-top: 10px;margin-left: 10px;font-size: 13px;width: 50%;">{{item.sendUserName}}</view>
						<view style="margin-top: 10px;font-size: 12px;color: darkgray;width: 50%;text-align: right;">{{item.replyTime}}</view>
					</view>
				</view>
				<view style="margin-top: 10px;margin-left: 10%;width: 86%;display: flex;flex-direction: row;">
					<view style="margin-top: 10px;width: 85%;font-size: 13px;">{{item.replyContent}}</view>
					<view style="color: darkgray;font-size: 12px;">回复</view>
				</view>
				<view style="margin-top: 10px;width: 100%;height: 1px;background-color: lightgray;"></view>
			</view>
		</view>
</view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import {
	serviceReleseDet,
	serviceReleseDetComment,
	serviceReleseCollect,
	serviceReleseCancelCollect,
	serviceReleseDianZan,
	serviceReleseCancelDianZan
} from '@/api/service';

const bgColor = ref("#2A9595");
const collectStar = ref('/static/service/collect_selected.png');
const collectdefault = ref('/static/service/collect_default.png');
const comments = ref('/static/service/comments.png');
const like_default = ref('/static/service/like_default.png');
const like_selected = ref('/static/service/like_selected.png');
const more = ref('/static/service/more.png');
const normalIcon = ref('/static/service/normalIcon.png');
const AnnounceId = ref('');
const DataParam = ref<any>({
	AnnounceId: "",
	userId: "a09ce1a089784782947303987cbdc871",
});
const dataDict = ref<any>({});
const conmentParam = ref<any>({
	AnnounceId: "",
	page: 1,
	size: 10,
});
const commentList = ref<any[]>([]);
const collectParam = ref<any>({
	AnnounceId: '',
	userId: "a09ce1a089784782947303987cbdc871"
});

onLoad((options: any) => {
	console.log(options.AnnounceId);
	AnnounceId.value = options.AnnounceId || '';
	DataParam.value.AnnounceId = options.AnnounceId || '';
	conmentParam.value.AnnounceId = options.AnnounceId || '';
});

onMounted(() => {
	init();
	loadCommentData();
});

const init = () => {
	try {
		serviceReleseDet(DataParam.value).then((res: any) => {
			console.log(res);
			dataDict.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const loadCommentData = () => {
	try {
		serviceReleseDetComment(conmentParam.value).then((res: any) => {
			console.log(res);
			commentList.value = res.result;
		});
	} catch (error) {
		console.log(error);
	}
};

const goBack = () => {
	uni.navigateBack();
};

const rightClick = () => {};

const cellectClick = () => {
	try {
		collectParam.value.AnnounceId = AnnounceId.value;
		serviceReleseCollect(collectParam.value).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
};

const cancelCollectClick = () => {
	try {
		collectParam.value.AnnounceId = AnnounceId.value;
		serviceReleseCancelCollect(collectParam.value).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
};

const givecancelClcik = () => {
	try {
		collectParam.value.AnnounceId = AnnounceId.value;
		serviceReleseCancelDianZan(collectParam.value).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
};

const giveClcik = () => {
	try {
		collectParam.value.AnnounceId = AnnounceId.value;
		serviceReleseDianZan(collectParam.value).then((res: any) => {
			console.log(res);
			init();
		});
	} catch (error) {
		console.log(error);
	}
};

const detailClick = (item: any) => {};
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
    }
</style>