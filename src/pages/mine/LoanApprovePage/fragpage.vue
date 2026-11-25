<template>
  <view>
    <!-- <text>{{ message }}</text> -->
    <!-- <text>{{ postid }}</text> -->
    <!-- <button @click="sendDataToParent">Send Data to Parent</button> -->
    <scroll-view
      :style="{ height: swiperHeight + 'px' }"
      scroll-y="true"
      refresher-enabled="true"
      :refresher-triggered="triggered"
      :refresher-threshold="50"
      refresher-background="white"
      @refresherpulling="onPulling"
      @refresherrefresh="onRefresh"
      @refresherrestore="onRestore"
      @refresherabort="onAbort"
    >
      <u-list @scrolltolower="scrolltolower">
        <u-list-item v-for="(item, index) in loaddata" :key="index">
          <view :key="index">
            <view
              @click="todetail(item)"
              style="display: flex; flex-direction: row; margin-top: 10px"
            >
              <image
                src="@/static/mine/wenjian.png"
                style="width: 40px; height: 40px; margin: 5px 15px"
              ></image>
              <view>
                <view
                  style="
                    display: flex;
                    flex-direction: row;
                    flex: 1;
                    justify-content: space-between;
                  "
                >
                  <view
                    style="color: black; font-size: 13px; font-weight: bold"
                    >{{ item.applyUserName }}</view
                  >
                  <view
                    style="color: #999; font-size: 11px; margin-left: 30px"
                    >{{ item.submissionTime.substring(5, 16) }}</view
                  >
                </view>
                <view style="font-size: 11px; color: #333"
                  >审批内容：{{ item.content }}</view
                >
                <view style="font-size: 11px; color: #333"
                  >审批详情：{{ item.details }}</view
                >
                <view style="font-size: 11px; color: #2a9598"
                  >审批详情：{{ item.statusName }}</view
                >
              </view>
            </view>
            <u-line color="#f5f5f5" style="margin-top: 5px"></u-line>
            <view
              style="
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin: 5px 15px;
              "
            >
              <view
                v-if="postid == 0 && item.buttonFlag == 1"
                style="display: flex; flex-direction: row"
              >
                <view
                  style="
                    border: 1px solid #0080ff;
                    border-radius: 5px;
                    padding: 0 20px;
                    margin-right: 15px;
                  "
                  @click="reject(item)"
                  >拒绝
                </view>
                <view
                  style="
                    border: 1px solid #0080ff;
                    border-radius: 5px;
                    padding: 0 20px;
                    background-color: #0080ff;
                    color: white;
                  "
                  @click="approve(item)"
                >
                  同意</view
                >
              </view>
              <view
                v-if="postid == 0 && item.buttonFlag == 2"
                style="
                  border: 1px solid #0080ff;
                  border-radius: 5px;
                  padding: 0 20px;
                  background-color: #0080ff;
                  color: white;
                "
                @click="topay(item)"
              >
                确认拨款</view
              >
            </view>

            <u-gap height="10" bgColor="#f5f5f5"></u-gap>
          </view>
        </u-list-item>
      </u-list>
    </scroll-view>

    <u-popup
      :show="show"
      @close="close"
      @open="open"
      mode="center"
      :round="10"
      :closeOnClickOverlay="false"
    >
      <view style="width: 40vh">
        <view style="padding: 5px 10px; font-size: 14px; color: #333">
          退款事由:
        </view>
        <u-textarea
          style="border: 1px solid #e4e7ed; margin: 0px 10px; font-size: 14px"
          v-model="value1"
          placeholder="请输入内容"
          border="surround"
        ></u-textarea>
        <view
          style="
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            margin-bottom: 8px;
            padding-bottom: 20px;
          "
        >
          <view
            style="
              font-size: 14px;
              width: 90px;
              border-radius: 5px;
              text-align: center;
              border: 1px solid #999;
            "
            @click="close"
            >取消</view
          >
          <view
            @click="commit"
            style="
              font-size: 14px;
              width: 90px;
              border: 1px solid #f5f5f5;
              background-color: #007aff;
              color: white;
              border-radius: 5px;
              text-align: center;
            "
            >确定</view
          >
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import {
	  LeaderApprovalList,
	  leaderAppropriationpay,
	  leaderApproval,
	} from "@/api/mine";

	defineOptions({
	  name: "FragPage"
	});
	
	// 2. 接收 props（同时声明 postid 和遗漏的 message）
	const props = defineProps({
	  postid: {
	    type: Number, // 根据你传入的 index 推断为 Number，可自行调整
	    required: true
	  },
	  message: {
	    type: String, // 根据 parentData 的类型调整
	    default: ''
	  }
	});
	// 3. 定义可触发的事件（替代 $emit）
	const emit = defineEmits(['message']);
	
      const loaddata = ref([]);
      const urls = ref([]);
      const swiperHeight = ref(500);
      const isRefreshing = ref(false);
      const triggered = ref(false);
      const show = ref(false);
      const value1 = ref('');
      const signaturepic = ref('');
      const currantid = ref('');
      const backdata = ref({});
      const reason = ref('');
	  
	  
	 
	  onMounted(() => {
		getdata();
		uni.getSystemInfo({
		  success: (res) => {
		    swiperHeight.value = res.windowHeight - 104;
		    console.log("height", swiperHeight);
		  },
		});
		eventBus.on("sign_netimg", handleUpdateData);
	  });
	  onUnmounted(() => {
		eventBus.off("sign_netimg", handleUpdateData);
	  });
  
    const handleUpdateData = (data:any) => {
      console.log("接收到回传的数据:", data);
      backdata.value = data;
      signaturepic.value = backdata.value.img;
      reason.value = backdata.value.reason;
      leaderapproval(1, reason.value);
    };
    const getdata = async() => {
      let data = {
        status: postid,
        userId: storage.getPlatId(),
        page: 1,
        size: 50,
      };
      const res = await LeaderApprovalList(data);
        isRefreshing.value = false;
          triggered.value = false;
        if (res.success && res.resultCode == 200) {
          
          console.log(res);
          loaddata.value = res.result;
        } else {
          console.log(res);
          uni.showToast({
            title: res.message,
            icon: "error",
          });
        }
      
    };

    const leaderapproval = async(status:any, reason:any) => {
      let data = {
        status: status,
        userId: storage.getPlatId(),
        id: currantid.value,
        reason: reason,
        signaturepic: signaturepic.value,
      };
      const res = await leaderApproval(data);
        if (res.success && res.resultCode == 200) {
          getdata();
        } else {
          uni.showToast({
            title: res.message,
            icon: "error",
          });
        }
      
    };

    const topay = async(item:any) => {
      let data = {
        id: item.id,
        userId: storage.getPlatId(),
      };
      const res = await leaderAppropriationpay(data);
        if (res.success && res.resultCode == 200) {
          const encodedUrl = encodeURIComponent(res.result.payUrl);
          uni.navigateTo({
            url: `/pages/mine/WebViewPage/WebPayPage?title=拨款&url=${encodedUrl}`
          });
        } else {
          uni.showToast({
            title: res.message,
            icon: "error",
          });
        }
      
    };
    const todetail = (item:any) => {
      console.log(item);
      uni.navigateTo({
        url:
          `/pages/mine/LoanApprovePage/LoanApproveDetailPage?which=2&id=${encodeURIComponent(item.id)}&ordertype=${encodeURIComponent(postid.value)}`
           
      });
    };
    const close = () => {
       show.value = false;
    };
    const open = () => {};
    const commit = () => {
      if (value1.value) {
        leaderapproval(2, value1);
      } else {
        uni.showToast({
          title: "请输入拒绝理由",
          icon: "error",
        });
      }
    };
    const reject = (item:any) => {
      currantid.value = item.id;
      show.value = true;
    };
    const approve = (item:any) => {
      currantid.value = item.id;
      uni.navigateTo({
        url: "/pages/mine/SignPage/SignPage?needreason=true",
      });
    };
    // 这里存放方法
    const sendDataToParent = () => {
      // $emit("message", "Hello from Child");
    };

    const scrolltolower = () => {
      console.log("scrolltolower");
      loadmore();
    };
    const loadmore = () => {
      for (let i = 0; i < 10; i++) {
        loaddata.value.push("https://uviewui.com/album/" + i + ".jpg");
      }
    };

    const onPulling = (e:any) => {
      console.log("onpulling", e);
    };
    const onRefresh = () => {

      if (isRefreshing.value) return;
      isRefreshing.value = true;
      setTimeout(() => {
      getdata();
        triggered.value = false;
        isRefreshing.value = false;
      }, 1000);
    };
    const onRestore = () => {
      triggered.value = false; // 需要重置
      console.log("onRestore");
    };
    const onAbort = () => {
      console.log("onAbort");
    };
  

	function defineEmits(arg0: string[]) {
		throw new Error('Function not implemented.');
	}

	function defineProps(arg0: {
		postid: {
			type: NumberConstructor; // 根据你传入的 index 推断为 Number，可自行调整
			required: boolean;
		}; message: {
			type: StringConstructor; // 根据 parentData 的类型调整
			default: string;
		};
	}) {
		throw new Error('Function not implemented.');
	}

	function defineOptions(arg0: { name: string; }) {
		throw new Error('Function not implemented.');
	}
</script>
<style scoped></style>
