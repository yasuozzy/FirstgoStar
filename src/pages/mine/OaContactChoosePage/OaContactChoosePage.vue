<template>
  <view>
    <u-navbar
      :title="title"
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
	  <template #right>
		<view slot="right" @click="confirm" style="color: white"> 确定 </view>
	  </template>
    </u-navbar>
    <view
      v-for="(item, index) in contactList"
      :key="index"
      style="padding: 5px 15px"
    >
      <view
        style="
          display: flex;
          flex-direction: row;
          margin: 5px 0;
          padding-right: 15px;
        "
      >
        <image
          v-if="!item.select"
          @click="selectAll(index)"
          style="width: 20px; height: 20px"
          :src="choose_default"
        ></image>
        <image
          v-if="item.select"
          @click="removeAll(index)"
          style="width: 20px; height: 20px"
          :src="choose_selected"
        ></image>
        <view style="flex: 1; margin-left: 10px">{{ item.leaderName }}</view>
        <u-icon
          v-if="item.col"
          name="arrow-down"
          color="#666"
          size="28"
          @click="item.col = !item.col"
        ></u-icon>
        <u-icon
          v-if="!item.col"
          name="arrow-up"
          color="#666"
          size="28"
          @click="item.col = !item.col"
        ></u-icon>
      </view>
      <view v-if="item.col">
        <view
          v-for="(childitem, childindex) in item.leaderList"
          :key="childindex"
        >
          <u-line color="#f5f5f5"></u-line>
          <view
            style="
              display: flex;
              flex-direction: row;
              height: 40px;
              align-items: center;
            "
          >
            <image
              @click="selectContact(index, childindex)"
              v-if="!childitem.select"
              style="width: 20px; height: 20px"
              :src="choose_default"
            ></image>
            <image
              @click="removeContact(index, childindex)"
              v-if="childitem.select"
              style="width: 20px; height: 20px"
              :src="choose_selected"
            ></image>
            <view style="margin-left: 10px">{{ childitem.username }}</view>
          </view>
        </view>
      </view>
      <u-gap height="10" bgColor="#f5f5f5"></u-gap>
    </view>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { KuaijiShenpiContact } from "@/api/mine";

    const title = ref("选择联系人");
    const bgColor = ref("#007AFF");
	const choose_default = ref('/static/login/choose_unselect.png');
	const choose_selected = ref('/static/login/choose_select.png');
    const contactList = ref([
        {
          id: "394d44dd-fbe7-4b4b-a672-31d5baec0577",
          leaderName: "社区书记",
          level: "2",
          showFlag: "1",
          leaderList: [
            {
              leaderUserId: "87a566c383094efd8fee76bab2d57c58",
              username: "社区书记测试新",
              status: "",
              reasons: "",
              signaturepic: "",
              approvalTime: null,
              level: null,
              levelId: "394d44dd-fbe7-4b4b-a672-31d5baec0577",
              bindId: "85216747-7a5d-4961-ae56-bb171184c0b1",
              readflag: null,
              select: true,
            },
          ],
          col: true,
          select: true,
        },
        {
          id: "5aa9c736-2303-471a-a064-9d4eb00ab1cc",
          leaderName: "1",
          level: "2",
          showFlag: "0",
          leaderList: [
            {
              leaderUserId: "ae6fb48db46b4cbe8f421a8804ca224e",
              username: "岩山社区书记",
              status: "",
              reasons: "",
              signaturepic: "",
              approvalTime: null,
              level: null,
              levelId: "5aa9c736-2303-471a-a064-9d4eb00ab1cc",
              bindId: "5c9de6ae-46a0-4842-a653-35a92fddd319",
              readflag: null,
              select: false,
            },
            {
              leaderUserId: "c1455534dd9b48e2814d35f07b94caf8",
              username: "双台社区书记",
              status: "",
              reasons: "",
              signaturepic: "",
              approvalTime: null,
              level: null,
              levelId: "5aa9c736-2303-471a-a064-9d4eb00ab1cc",
              bindId: "b9155345-2cc7-44a1-a96d-3d3df557f3a0",
              readflag: null,
              select: false,
            },
          ],
          col: false,
          select: false,
        },
        {
          id: "6be21602-7bdb-4950-a376-a1caf012b0c6",
          leaderName: "经管站",
          level: "3",
          showFlag: "1",
          leaderList: [
            {
              leaderUserId: "c8599ebb67af403e9b99916982cf834d",
              username: "经管站.",
              status: "",
              reasons: "",
              signaturepic: "",
              approvalTime: null,
              level: null,
              levelId: "6be21602-7bdb-4950-a376-a1caf012b0c6",
              bindId: "c508253a-07ef-4bbb-ba9b-35be777a962d",
              readflag: null,
              select: false,
            },
            {
              leaderUserId: "70612815a0ab4dd58efac4e3f6ecc3da",
              username: "经管站",
              status: "",
              reasons: "",
              signaturepic: "",
              approvalTime: null,
              level: null,
              levelId: "6be21602-7bdb-4950-a376-a1caf012b0c6",
              bindId: "c54f1e26-ffbd-41b6-ad62-c13fbe6f959a",
              readflag: null,
              select: false,
            },
          ],
          col: false,
          select: false,
        },
        {
          id: "0a132f30-2cfc-497f-a325-0c018bb98df1",
          leaderName: "分管领导",
          level: "4",
          showFlag: "1",
          leaderList: [
            {
              leaderUserId: "3585d4b948884190893ed11c4d99b7bf",
              username: "分管领导",
              status: "",
              reasons: "",
              signaturepic: "",
              approvalTime: null,
              level: null,
              levelId: "0a132f30-2cfc-497f-a325-0c018bb98df1",
              bindId: "0cd5cf39-d10f-491c-b332-302df6e81a9d",
              readflag: null,
              select: false,
            },
          ],
          col: false,
          select: false,
        },
      ]);
      const peopleList = ref([]);
      const type = ref(1);
    

	  onMounted(() => {
		init();
	  });
	  onLoad((e:any) => {
		type.value = e.type;
	  });

  
    const init = async() => {
      contactList.value.forEach((childitem) => {
        childitem.col = true;
      });
      const res = await KuaijiShenpiContact({
        leaderUserId: storage.getPlatId(),
        leaderName: "",
      });
        contactList.value = res.result.map((item) => {
          return {
            ...item,
            col: true,
            select: false,
            leaderList: item.leaderList
              ? item.leaderList.map((child) => {
                  return {
                    ...child,
                    select: false,
                  };
                })
              : [],
          };
        });
        console.log(contactList);
      
    };
    const goBack= () => {
            
		uni.navigateBack()
	};
    const selectAll = (index:any) => {
      contactList.value[index].select = true;
      contactList.value[index].leaderList.forEach((childitem) => {
        childitem.select = true;
      });
    };
    const removeAll = (index:any) => {
      contactList.value[index].select = false;
      contactList.value[index].leaderList.forEach((childitem) => {
        childitem.select = false;
      });
    };
    const selectContact = (index:any, childindex:any) => {
      contactList.value[index].leaderList[childindex].select = true;
      let num = 0;
      contactList.value[index].leaderList.forEach((childitem) => {
        if (childitem.select) {
          num++;
        }
      });
      if (num === contactList.value[index].leaderList.length) {
        contactList.value[index].select = true;
      } else {
        contactList.value[index].select = false;
      }
    };
    const removeContact = (index:any, childindex:any) => {
      let num = 0;
      contactList.value[index].leaderList[childindex].select = false;
      contactList.value[index].leaderList.forEach((childitem) => {
        if (childitem.select) {
          num++;
        }
      });
      if (num === contactList.value[index].leaderList.length) {
        contactList.value[index].select = true;
      } else {
        contactList.value[index].select = false;
      }
    };
    const confirm = () => {
      let cheched = [];
      let num = 0;
      contactList.value.forEach((item) => {
        num = 0;
        item.leaderList.forEach((childitem) => {
          if (childitem.select) {
            num++;
            cheched.push(childitem);
          }
        });
        if (num === 0) {
          uni.showToast({
            title: "请选择审批人",
            icon: "error",
          });
          return;
        }
      });
      if (type.value == 1) {
        eventBus.emit("oaperson1", cheched);
      } else {
        eventBus.emit("oaperson2", cheched);
      }
      uni.navigateBack({});
    };
    // showToast(params) {
    //   $refs.uToast.show({
    //     title: params,
    //     // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
    //     type: "success",
    //     // 如果不需要图标，请设置为false
    //     // icon: false
    //   });
    // },
 
</script>

<style></style>
