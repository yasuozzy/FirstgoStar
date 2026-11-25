<template>
	<view class="main">
		<u-navbar title="接收人" :safeAreaInsetTop="true" :placeholder="true" :fixed="true"
			:border="false" :bgColor="bgColor" titleStyle="color: #fff;">
			<template #left>
<view class="u-nav-slot" >
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			</view>
</template>
		</u-navbar>
		<view style="display: flex;with:100%;display: flex;flex-direction: column;">

			<view v-for="(peritem, perindex) in DataList" :key="perindex" class="personItem">
				<view style="margin-top: 10px;margin-left: 20px;display: flex;flex-direction: row;height: 50px;">
					<!-- <image @click="selectContact(perindex)" v-if="!peritem.select"
						style="width: 20px; height: 20px;margin-top: 10px;" :src="choose_default"></image>
					<image @click="selectContact(perindex)" v-if="peritem.select"
						style="width: 20px; height: 20px;margin-top: 10px;" :src="choose_selected"></image>
					<image style="width: 40px; height: 40px;margin-left: 10px;border-radius: 20px;margin-top: 5px;"
						src="@/static/service/lawmyshenqing-image.png"></image> -->
					<view style="font-size: 15px;margin-left: 10px;margin-top: 10px;">{{ peritem.identityName }}
					</view>
				</view>
				<view v-for="(item, index) in peritem.receiverList" :key="item.receiverUserId" class="personItem">
					<view style="margin-top: 10px;margin-left: 20px;display: flex;flex-direction: row;height: 50px;"
						@click="toggleSelect(item)">
						<!-- 点击整个行都可以触发选择，体验更好 -->
						<image v-if="!item.select" style="width: 20px; height: 20px;margin-top: 10px;"
							:src="choose_default"></image>
						<image v-if="item.select" style="width: 20px; height: 20px;margin-top: 10px;"
							:src="choose_selected"></image>
						<image style="width: 40px; height: 40px;margin-left: 10px;border-radius: 20px;margin-top: 5px;"
							src="@/static/service/lawmyshenqing-image.png"></image>
						<view style="font-size: 15px;margin-left: 10px;margin-top: 10px;">{{ item.receiverUsername }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer-container">
			<view style="display: flex;flex-direction: row;width: 100%;height: 70px;">
				<view class="order-button" @click="saveClick()">保存</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { queryReceiverList } from '@/api/service.ts';

import { storage } from '@/utils/storage';

import { eventBus } from "@/utiles/eventBus.js";

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const bgColor = ref("#2A9595");

const estId = ref('');

const DataList = ref([]);

const searchContent = ref('');

const choose_default = ref('/static/login/choose_unselect.png');

const choose_selected = ref('/static/login/choose_select.png');

const LeaderList = ref<any>();

const loadData = () => {
  try {
      let param = {
        userId: storage.getPlatId()
      };
      queryReceiverList(param).then(res => {
        if (res.result && Array.isArray(res.result)) {
          // 初始化数据，确保每个 receiver 都有 select 属性
		  console.log(res.result);
          DataList.value = res.result.map(group => {
            // 深拷贝或处理 receiverList，确保响应式
            const receivers = (group.receiverList || []).map(user => ({
              ...user,
              select: false // 默认未选中
            }));
            return {
              ...group,
              receiverList: receivers,
              select: false // 如果组也需要选中状态
            };
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
};

const toggleSelect = (item) => {
  // 直接修改源数据中的 select 状态
    item.select = !item.select;

    // 强制更新视图（通常不需要，但如果遇到视图不刷新可开启）
    // this.$forceUpdate();
};

const selectContact = (perindex) => {
  console.log(perindex);
    for (var j = 0; j < DataList.value.length; j++) {
      for (var k = 0; k < DataList.value[j].receiverList.length; k++) {
        var laederment = DataList.value[j].receiverList[k];
      }
      if (perindex == j) {
        laederment.select = !laederment.select;
      }
    }
    ;
    console.log(DataList.value);
    for (var j = 0; j < DataList.value.length; j++) {
      for (var k = 0; k < DataList.value[j].receiverList.length; k++) {
        var person = DataList.value[j].receiverList[k];
        if (person.select == true) {
          LeaderList.value.push(person);
          LeaderList.value = [...new Set(LeaderList.value)];
        } else if (person.select == false) {
          if (LeaderList.value.length > 0) {
            for (var l = 0; l < LeaderList.value.length; l++) {
              var leader = LeaderList.value[l];
              if (person.receiverUserId === leader.receiverUserId) {
                LeaderList.value.splice(l, 1);
              }
            }
          }
        }
      }
      ;
    }
    console.log(LeaderList.value);
};

const saveClick = () => {
  // 动态计算已选中的人员，保证数据绝对准确
    const selectedUsers = [];
    DataList.value.forEach(group => {
      if (group.receiverList) {
        group.receiverList.forEach(user => {
          if (user.select) {
            selectedUsers.push(user);
          }
        });
      }
    });
    if (selectedUsers.length === 0) {
      uni.showToast({
        title: '请选择接收人',
        icon: 'none'
      });
      return;
    }
    console.log("选中的接收人:", selectedUsers);

    // 发送事件
    eventBus.$emit("selecPerson", selectedUsers);

    // 返回
    uni.navigateBack();
};

const goBack = () => {
  uni.navigateBack();
};

onLoad((options) => {
  estId.value = options.estId;
    console.log(estId.value);
});

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.main {
	min-height: 100vh;
	width: 100%;
	background-color: aliceblue;

	.flex {
		display: flex;
	}

	.homestayView {
		width: 100px;
		height: 30px;
		color: white;
		margin-right: 10px;
		margin-top: 11px;
		text-align: right;
		font-size: 13px;
	}

	.footer-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 70px;
		background-color: white;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		z-index: 100;
		color: white;
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */

	}

	.order-button {

		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */
		height: 35px;
		/* 需要设置高度 */
		width: 92%;
		margin-right: 10px;
		font-size: 13px;
		color: white;
		background-color: #2A9595;
		border-radius: 6px;
		margin-left: 4%;
		margin-top: 15px;
	}

	.personItem {
		display: flex;
		color: black;
		width: 100%;
		background-color: white;
		flex-direction: column;
		margin-top: 10px;
	}
}
</style>