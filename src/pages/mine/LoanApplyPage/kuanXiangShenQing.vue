<template>
  <view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 3px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="color: red">*</view>
      <view style="flex: 1">申请内容</view>
      <u-input
        placeholder="请输入内容"
        border="surround"
        v-model="content"
        style="flex: 3"
      ></u-input>
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 3px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="color: red">*</view>
      <view style="flex: 1">申请详情</view>
    </view>
    <u-textarea
      v-model="detail"
      height="100"
      style="margin: 3px 15px"
      placeholder="请输入内容"
    ></u-textarea>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 3px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="color: red">*</view>
      <view style="flex: 1">申请总额</view>
      <u-input
        placeholder="请输入内容"
        border="surround"
        v-model="amount"
        style="flex: 3"
      ></u-input>
      <view>元</view>
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 10px 15px;
        flex-direction: row;
        justify-content: space-between;
      "
    >
      <view>审批科目</view>
      <view style="color: #2a9598" @click="showpop">创建</view>
    </view>
    <view v-for="(item, index) in subjectlist" :key="index">
      <view
        style="
          margin: 0px 15px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        "
      >
        {{ item.subject }}
        <view style="display: flex; flex-direction: row">
          {{ item.amount }}
          <u-image style="margin-top: 5px;margin-left: 5px;" @click="deletesub(index)"
            :src="deleteImage"
            width="15px"
            height="15px"
          ></u-image>
          ></view
        >
      </view>
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      style="
        display: flex;
        padding: 13px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="flex: 1">审批类型</view>

      <u-radio-group
        v-model="radiovalue6"
        placement="row"
        @change="groupChange"
      >
        <u-radio
          :customStyle="{ marginRight: '16px' }"
          v-for="(item, index) in radiolist6"
          :key="index"
          :label="item.name"
          :name="item.name"
        >
        </u-radio>
      </u-radio-group>
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <view
      @click="toApproveCreat"
      style="
        display: flex;
        padding: 13px 15px;
        flex-direction: row;
        align-items: center;
      "
    >
      <view style="color: red">*</view>
      <view style="flex: 1">审批内容</view>
      >
    </view>
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
    <uni-section style="margin-left: 15px" title="图片" type="line">
      <view class="example-body">
        <uni-file-picker
          limit="9"
          v-model="imgvalue"
          fileMediatype="image"
          title="最多选择9张图片"
          @select="selectpic"
          @progress="progresspic"
          @success="successpic"
          @fail="failpic"
        ></uni-file-picker>
      </view>
    </uni-section>
    <!-- :image-styles="imageStyles" -->
    <uni-section style="margin-left: 15px" title="文件" type="line">
      <view class="example-body">
        <uni-file-picker
          limit="5"
          v-model="filevalue"
          file-mediatype="all"
          title="最多选择5个文件"
          @select="selectfile"
          @progress="progressfile"
          @success="successfile"
          @fail="failfile"
        ></uni-file-picker>
      </view>
    </uni-section>
    <!-- :list-styles="listStyles" -->
    <view
      style="
        width: 90%;
        margin-left: 5%;
        background-color: #2a9598;
        display: flex;
        justify-content: center;
        color: white;
        padding: 10px 0px;
        border-radius: 5px;
        margin-top: 30px;
        margin-bottom: 30px;
      "
      @click="commit"
      >提交</view
    >
    <u-popup :show="show" @close="close" @open="open" :round="10" mode="center">
      <view>
        <view style="text-align: center; margin: 8px 0px">新增审批科目</view>
        <view
          style="margin: 6px 20px; border: 1px solid #999; border-radius: 5px"
        >
          <u-input
            placeholder="请输入科目名称"
            border="surround"
            v-model="subname"
          ></u-input>
        </view>
        <view
          style="margin: 6px 20px; border: 1px solid #999; border-radius: 5px"
        >
          <u-input
            placeholder="请输入审批数额"
            border="surround"
            v-model="subamount"
          ></u-input>
        </view>
        <u-line color="#999"></u-line>
        <view
          style="color: #2a9598; text-align: center; margin: 5px 0px"
          @click="saveSubject()"
          >确认</view
        >
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive ,onMounted,onUnmounted} from 'vue';
	import {
	  KuaijiShenpiLeaderDetail,
	  KuaijiShenpiHistoryDetail,
	  CommitKuanXiang,
	} from "@/api/mine";
	import { getStorage, storage, storageKeys,BaseImgURL,uploadMultipleFiles } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';

      
      const picfile = ref([]);
      const imgvalue = ref([]);
      const filevalue = ref([]);
      const id = ref("");
      const info = ref("2014-04-25");
      const bgColor = ref("#0080ff");
      const subjectlist = ref([]);
      const content = ref("");
      const detail = ref("");
      const amount = ref("");
      const show = ref(false);
      const value = ref("");
      const LoanCom = ref({});
      const subname = ref("");
	const subamount = ref("");
      //横向排列形式数据
      const radiolist6 = ref([
        {
          name: "收款",
          disabled: false,
        },
        {
          name: "拨款",
          disabled: false,
        },
      ]);
      // u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
      const radiovalue6 = ref("收款");
      const paymentApprovalType = ref(1);
	  const deleteImage = ref('/static/mine/delete.png');
    

	  onMounted(() => {
		eventBus.on("LoanCom", handleUpdateData);
	  });
	  onUnmounted(() => {
		eventBus.off("LoanCom", handleUpdateData);
	  });

  
    const groupChange = (n:any) => {
      console.log("groupChange", n);
      if (n === "收款") {
        paymentApprovalType.value = 1;
      } else {
        paymentApprovalType.value = 2;
      }
    };
    const saveSubject = () => {
      if (subname.value === "" || subamount.value === "") {
        uni.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      } else {
        let subinfo = {};
        subinfo.subject = subname;
        subinfo.amount = subamount;
        subjectlist.value.push(subinfo);
        console.log(subjectlist.value);
        show.value = false;
      }
    };

    const commit = async() => {
      if (content.value === "" || detail.value === "" || amount.value === "") {
        uni.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      let param = {
        applyUserId: storage.getUserId(),
        applyUserName: storage.getRealName(),
        content: content.value,
        details: detail.value,
        status: "",
        statusName: "",
        submitFlag: "1",
        total: amount.value,
        subject: JSON.stringify(subjectlist.value),
        image: JSON.stringify(imgvalue.value)
          .replace("[", "")
          .replace("]", "")
          .replace('"', ""),
        userComName: LoanCom.value.userComName,
        registMobile: LoanCom.value.registMobile,
        bankCard: LoanCom.value.bankCard,
        bankName: LoanCom.value.bankName,
        enclosure: JSON.stringify(filevalue.value),
        paymentApprovalType: paymentApprovalType.value,
        headImage:
          Array.isArray(imgvalue.value) && imgvalue.value.length > 0
            ? imgvalue.value.join(",")
            : "",
      };
      console.log(param);
      const res = await CommitKuanXiang(param);
        console.log(res);
      
    };
    const deletesub = (index:any) => {
      subjectlist.value.splice(index, 1);
    };
    const handleUpdateData = (data:any)  =>{
      console.log("接收到回传的数据:", data);
      LoanCom.value = data;
    };

    const close = () => {
      show.value = false;
    }
    const showpop = () => {
      show.value= true;
    }
    const open = () => {
      show.value = true;
    };
    const toApproveCreat = () => {
      uni.navigateTo({
        url:
          "/pages/mine/LoanApplyCreatComPage/LoanApplyCreatComPage?LoanCom=" +
          JSON.stringify(LoanCom),
      });
    };
    const ChooseFile = () => {
      uni.chooseFile({
        count: 1,
        success: (res) => {
          console.log("选择的文件", res);
          // FileList.push(res.tempFiles.map((item) => item.tempFiles));
          const file = res.tempFiles[0];
          commitFile(file);
        },
        fail: (err) => {
          console.error("选择文件失败", err);
        },
      });
    };
    const selectpic = (e:any) => {
      console.log("选择文件：", e);
      // console.log(uploadimg);
      let tempFilePaths = e.tempFilePaths;
      uploadMultipleFiles([], tempFilePaths, storage.getToken())
        .then((results) => {
          console.log("所有文件上传成功:", results);
          let netimgs = [];
          results.forEach((item) => {
            netimgs.push(item.data);
          });
          imgvalue.value = netimgs;
        })
        .catch((error) => {
          console.error("文件上传失败:", error);
        });
      // commitPic(picfile);
    };

    const commitPic = (picfile:any) => {
      let tempFilePaths = picfile.tempFilePaths;
      uploadMultipleFiles([], tempFilePaths, storage.getToken())
        .then((results) => {
          console.log("所有文件上传成功:", results);
          let netimgs = [];
          results.forEach((item) => {
            netimgs.push(item.data);
          });
          imgvalue.value = netimgs;
        })
        .catch((error) => {
          console.error("文件上传失败:", error);
        });
    };
    const progresspic = (e:any) => {
      console.log("选择文件：", e);
    };
    const successpic = (e:any) => {
      console.log("选择文件：", e);
    };
    const failpic = (e:any) => {
      console.log("选择文件：", e);
    };
    const selectfile = (e:any) => {
      console.log("选择文件：", e);
    };
    const progressfile = (e:any) => {
      console.log("选择文件：", e);
    }
    const successfile = (e:any) => {
      console.log("选择文件：", e);
    };
    const failfile = (e:any) => {
      console.log("选择文件：", e);
    };
  
</script>

<style></style>
