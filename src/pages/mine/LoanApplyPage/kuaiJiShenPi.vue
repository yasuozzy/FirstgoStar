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
        v-model="title"
        @change="change"
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
      <view style="flex: 1">审批详情</view>
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
      <view style="flex: 1">审批总额</view>
      <u-input
        placeholder="请输入内容"
        border="surround"
        v-model="amount"
        @change="change"
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
    <u-gap height="10" bg-color="#f5f5f5"></u-gap>
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
          <text
            style="color: red; font-size: 14; margin-left: 15px"
            @click="deletesub(index)"
            >X</text
          ></view
        >
      </view>
    </view>
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
      <view style="flex: 1">明细预览</view>
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
    <view
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px 15px;
      "
    >
      <view style="display: flex; flex-direction: row">
        <view style="font-size: 18px; color: #999">·</view>
        <view>审批人</view>
      </view>
      <view
        style="
          border: 1px dashed #999;
          border-radius: 90px;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
        "
        @click="selectContact(1)"
      >
        +
      </view>
    </view>
    <view style="display: flex; flex-wrap: wrap; margin-left: 30px">
      <view v-for="(item, index) in approveContact" :key="index">
        <view
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 10px;
            margin-right: 10px;
          "
        >
          <image
            src="@/static/logo.png"
            style="width: 30px; height: 30px"
          ></image>
          <view style="font-size: 9px">{{ item.username }}</view>
        </view>
      </view>
    </view>
    <view
      style="
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px 15px;
      "
    >
      <view style="display: flex; flex-direction: row">
        <view style="font-size: 18px; color: #999">·</view>
        <view>审批人</view>
      </view>
      <view
        style="
          border: 1px dashed #999;
          border-radius: 90px;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
        "
        @click="selectContact(2)"
      >
        +
      </view>
    </view>
    <view style="display: flex; flex-wrap: wrap; margin-left: 30px">
      <view v-for="(item, index) in chaoSongContact" :key="index">
        <view
          style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 10px;
            margin-right: 10px;
          "
        >
          <image
            src="@/static/logo.png"
            style="width: 30px; height: 30px"
          ></image>
          <view style="font-size: 9px">{{ item.username }}</view>
        </view>
      </view>
    </view>
    <view>
      <view v-if="signpic">
        <view class="infocell" style="margin-left: 10px">签名</view>
        <image class="signimg" :src="BaseImgURL + signpic"></image>
      </view>
    </view>
    <view
      @click="commit"
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
	import { CommitKuanXiang, KuaijiShenpiMingXi } from "@/api/mine";
	import { getStorage, storage, storageKeys,BaseImgURL,uploadMultipleFiles } from '@/utils/storage';
	import eventBus from '@/utils/eventBus';

	  const imgvalue = ref([]);
	  const filevalue = ref([]);
	  const id = ref('');
	  const info = ref("2014-04-25");
	  const bgColor = ref("#0080ff");
	  const list = ref([]);
	  const approveContact = ref([]);
	  const chaoSongContact = ref([]);
	  const subjectlist = ref([]);
	  const subname = ref('');
	  const subamount = ref('');
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
	  const show = ref(false);
	  const title = ref('');
	  const detail = ref('');
	  const amount = ref('');
	  const kuaijimingxi = ref([]);
	  const signpic = ref('');
   
   
	  onMounted(() => {
		getMingxi();
		eventBus.on("oaperson1", handleUpdateData1);
		eventBus.on("oaperson2", handleUpdateData2);
		eventBus.on("sign_netimg", handleUpdateData);
	  });
	  onLoad((e:any) => {
		id.value = e.id;
		getMingxi();
	  });

  
	  onUnmounted(() => {
		eventBus.off("oaperson1", handleUpdateData1);
		eventBus.off("oaperson2", handleUpdateData2);
		eventBus.off("sign_netimg", handleUpdateData);
	  });
  
	const handleUpdateData = (data:any) => {
      console.log("接收到回传的数据:", data);
      if (data) {
        signpic.value = data[0];
        // sign = true;
        // console.log(sign + ":::" + signpic);
      }
    };
    const handleUpdateData1 = (data:any) => {
      console.log("接收到回传的数据:", data);
      approveContact.value = data;
    };
    const handleUpdateData2 = (data:any) => {
      console.log("接收到回传的数据:", data);
      chaoSongContact.value = data;
    };
    const getMingxi = async() => {
		
      const res = await KuaijiShenpiMingXi({
        id: id,
        userId: storage.getPlatId(),
        size: "50",
        page: 1,
      });
        console.log(res);
        kuaijimingxi.value = res.result;
      
    };
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
    const selectContact = (type:any) => {
      uni.navigateTo({
        url:
          `/pages/mine/OaContactChoosePage/OaContactChoosePage?type=${encodeURIComponent(type)}`
      });
    };

    const commit = async() => {
		
      if (title.value === "" || detail.value === "" || amount.value === "") {
        uni.showToast({ title: "请填写完整信息", icon: "none" });
        return;
      }
      let subjectTotal = 0;
      subjectlist.value.forEach((item) => {
        subjectTotal += parseFloat(item.amount) || 0;
      });
      const totalAmount = parseFloat(amount.value) || 0;
      console.log(subjectlist.value);
      if (Math.abs(totalAmount - subjectTotal) > 0.01) {
        uni.showToast({
          title: "审批总额与审批科目总额不同,请检查",
          icon: "none",
        });
        return;
      }
      if (kuaijimingxi.value.length < 1) {
        uni.showToast({
          title: "请设置明细",
          icon: "none",
        });
        return;
      }
      if (!signpic.value || signpic.value.length < 1) {
        uni.showToast({
          title: "请先签名",
          icon: "none",
        });
        uni.navigateTo({
          url: "/pages/mine/SignPage/SignPage",
        });
        return;
      }
      let param = {
        id: null,
        oldId: "",
        applyUserId: storage.getPlatId(),
        applyUserName: storage.getUserName(),
        content: title.value,
        details: detail.value,
        status: null,
        statusName: null,
        submitFlag: 1,
        total: amount.value,
        subject: JSON.stringify(subjectlist.value),
        leader: JSON.stringify(approveContact.value),
        sender: JSON.stringify(chaoSongContact.value),
        image:
          Array.isArray(imgvalue.value) && imgvalue.value.length > 0
            ? imgvalue.value.join(",")
            : "",
        enclosure: JSON.stringify(filevalue.value),
        signaturepic: signpic.value,
        paymentApprovalType: paymentApprovalType.value,
      };

      const res = await CommitKuanXiang(param);
        console.log(res);
      
    };

    const toApproveCreat = () => {
      getMingxi();
      uni.navigateTo({
        url: "/pages/mine/LoanApplyPage/MingXiPreviewPage",
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
    };

    const deletesub = (index:any) => {
      uni.showModal({
        title: "提示",
        content: "确定要删除这条审批科目吗？",
        success: (res) => {
          if (res.confirm) {
            subjectlist.value.splice(index, 1);
            uni.showToast({
              title: "删除成功",
              icon: "success",
            });
          }
        },
      });
    };

    const change = (e:any) => {
      console.log("change", e);
    };
    const close = () => {
      show.value = false;
    };
    const showpop = () => {
      show.value = true;
    };
    const open = () => {
      show.value = true;
    };

    const progresspic = (e:any) => {
      console.log("选择文件：", e);
    };
    const successpic = (e:any) => {
      console.log("选择文件：", e);
    };
    const failpic = (e:any) => {
      console.log("选择文件：", e);
    }
    const selectfile = (e:any) => {
      console.log("选择文件：", e);
    };
    const progressfile = (e:any) =>  {
      console.log("选择文件：", e);
    };
    const successfile = (e:any) => {
      console.log("选择文件：", e);
    };
    const failfile = (e:any) => {
      console.log("选择文件：", e);
    };
  
</script>

<style>
.signimg {
  width: 80%;
  height: 100px;
  margin: 10px 30px;
}
</style>
