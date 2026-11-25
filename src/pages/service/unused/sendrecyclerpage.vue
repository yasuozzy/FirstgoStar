<template>
  <view>
    <u-navbar title="发布回收" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false" :bgColor="bgColor"
      titleStyle="color: #fff;" leftIconColor="#fff">
      <template #left>
        <view @click="goBack">
          <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
        </view>
      </template>
    </u-navbar>
      <view style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      ">
        物品分类
        <view style="flex: 1; margin-left: 20px" @click="getAddressInfo()">{{
          selecttype ? selecttype : "请选择物品分类"
          }}</view>
      </view>
      <view style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      ">
        物品名称
        <input v-model="pname" style="margin-left: 10px" placeholder="请输入物品名称" placeholder-style="color: #999" />
      </view>
      <view style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      ">
        出售价格
        <input v-model="pprice" style="margin-left: 10px" placeholder="请输入出售价格（元）" placeholder-style="color: #999" />
      </view>

      <view style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      ">
        运费价格
        <input v-model="yunfei" style="margin-left: 10px" placeholder="请输入运费价格（元）" placeholder-style="color: #999" />
      </view>
      <view style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #e0e0e0;
      ">
        物品描述
        <input v-model="miaoshu" style="margin-left: 10px" placeholder="请输入物品描述" placeholder-style="color: #999" />
      </view>
      <u-gap bgColor="#f5f5f5" height="10"></u-gap>
      <uni-section style="margin-left: 15px" title="图片" type="line">
        <view class="example-body">
          <uni-file-picker limit="9" v-model="imgvalue" fileMediatype="image" title="最多选择9张图片" @select="selectpic"
            @progress="progresspic" @success="successpic" @fail="failpic"></uni-file-picker>
        </view>
      </uni-section>
      <u-gap bgColor="#f5f5f5" height="10"></u-gap>
      <view style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      ">
        可退换
        <u-switch v-model="cantuihua" @change="change"></u-switch>
      </view>
      <u-gap bgColor="#f5f5f5" height="10"></u-gap>
      <view style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      ">
        是否同意公益回收
        <u-switch v-model="canrecycle" @change="change"></u-switch>
      </view>
      <u-gap bgColor="#f5f5f5" height="10"></u-gap>
      <view style="
        padding: 10px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      ">
        回收物品展示期为7天详情请看<text style="color: #0080ff">《公益回收规则》</text>
      </view>
      <view @click="addAddress" style="
        padding-top: 10px;
        padding-bottom: 10px;
        margin-bottom: 0px;
        background-color: #2a9598;
        color: white;
        text-align: center;
        width: 80%;
        margin-top: 30px;
        border-radius: 5px;
        margin-left: 10%;
      ">
        确定发布
      </view>

    <u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" mode="bottom" :show="showModal" :round="10"
      :overlay="true" :closeable="true" :closeOnClickOverlay="true" :customStyle="{ height: '50vh' }" @close="close"
      @open="open">
      <view style="height: 50vh; padding-bottom: 10px">
        <scroll-view class="scroll-content" scroll-y="true">
          <view style="
              height: 30px;
              line-height: 30px;
              font-size: 17px;
              padding-left: 30px;
            " v-for="(item, index) in tabList" :key="index" @click="selecttab(item)">{{ item.idle_item_type_name }}
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { getRecyclerExchangeTab, RecycleAProductDetail, recycleProductupdate, recycleProductcommit } from "@/api/service";

import { storage, uploadMultipleFiles } from "@/utils/storage";

import { onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const id = ref("");

const bgColor = ref("#0080ff");

const showModal = ref(false);

const pname = ref("");

const pprice = ref("");

const yunfei = ref("");

const miaoshu = ref("");

const cantuihua = ref(false);

const canrecycle = ref(false);

const items = ref([]);

const selecttype = ref("");

const selecttabid = ref("");

const tabList = ref([]);

const imgvalue = ref([]);

const detail = ref({});

const tablist = ref<any>();

const isdefault = ref<any>();

const isgoodRecovery = ref<any>();

const init = () => {
  let data1 = {};
    getRecyclerExchangeTab(data1).then(res => {
      console.log(res);
      tabList.value = res.result;
      console.log(tablist.value);
    });
};

const goBack = () => {
  uni.navigateBack();
};

const change = (e) => {
  console.log("change", e);
    isdefault.value = e;
};

const close = () => {
  showModal.value = false;
};

const open = () => {

};

const selecttab = (item) => {
  selecttype.value = item.idle_item_type_name;
    selecttabid.value = item.id;
    showModal.value = false;
};

const getAddressInfo = () => {
  showModal.value = true;
};

const selectpic = (e) => {
  console.log("选择文件：", e);
    let tempFilePaths = e.tempFilePaths;
    uploadMultipleFiles("", tempFilePaths, storage.getToken()).then(results => {
      console.log("所有文件上传成功:", results);
      let netimgs = [];
      results.forEach(item => {
        netimgs.push(item.data);
      });
      imgvalue.value = netimgs;
    }).catch(error => {
      console.error("文件上传失败:", error);
    });
    // this.commitPic(this.picfile);
};

const getdetail = () => {
  let data = {
      userId: storage.getUserId(),
      RecycleId: id.value
    };
    RecycleAProductDetail(data).then(res => {
      console.log(res);
      detail.value = res.result.RecycleEntity;
      selecttabid.value = detail.value.estId;
      pname.value = detail.value.recycleTitle;
      miaoshu.value = detail.value.recycleContent;
      pprice.value = detail.value.recyclePrice;
      yunfei.value = detail.value.freightPrice;
      selecttype.value = detail.value.idleItemTypeName;
      cantuihua.value = detail.value.isRefund === "1" ? true : false;
    });
};

const addAddress = () => {
  if (id.value) {
      let data = {
        managementId: storage.getManid(),
        userId: storage.getUserId(),
        estId: selecttabid.value,
        recycleTitle: pname.value,
        id: id.value,
        recycleContent: miaoshu.value,
        recycleContentImgs: Array.isArray(imgvalue.value) && imgvalue.value.length > 0 ? imgvalue.value.join(",") : "",
        recyclePrice: pprice.value,
        freightPrice: yunfei.value,
        isRefund: cantuihua.value ? "1" : "2",
        isgoodRecovery: isgoodRecovery.value ? "1" : "2",
        hostNo: storage.getHostNo(),
        cstType: storage.getCstType(),
        mobile: storage.getPhone()
      };
      recycleProductupdate(data).then(res => {
        console.log(res);
        uni.navigateBack();
      });
    } else {
      // map.put("managementId", App.getManageId());
      // map.put("userId", App.getUid());
      // map.put("estId", mTypeid);
      // map.put("recycleTitle", mGoodTitle);
      // map.put("recycleContent", mGoodDescribe);
      // map.put("recycleContentImgs", TextUtils.isEmpty(mImageurl) ? "" : mImageurl);
      // map.put("recyclePrice", Double.valueOf(mGoodPrice).toString());
      // map.put("freightPrice", Double.valueOf(mTrafficPrice).toString());
      // map.put("isRefund", mIsReplace ? "1" : "2");
      // map.put("isgoodRecovery", mIsRecovery ? "1" : "2");
      // map.put("hostNo", App.getHostNo());
      // map.put("cstType", App.getCstType());
      // map.put("mobile", App.getPhone());

      let data = {
        managementId: storage.getManid(),
        userId: storage.getUserId(),
        estId: selecttabid.value,
        recycleTitle: pname.value,
        recycleContent: miaoshu.value,
        recycleContentImgs: Array.isArray(imgvalue.value) && imgvalue.value.length > 0 ? imgvalue.value.join(",") : "",
        recyclePrice: pprice.value,
        freightPrice: yunfei.value,
        isRefund: cantuihua.value ? "1" : "2",
        isgoodRecovery: isgoodRecovery.value ? "1" : "2",
        hostNo: storage.getHostNo(),
        cstType: storage.getCstType(),
        mobile: storage.getPhone()
      };
      recycleProductcommit(data).then(res => {
        console.log(res);
        uni.navigateBack();
      });
    }
};

const progresspic = (e) => {
  console.log("选择文件：", e);
};

const successpic = (e) => {
  console.log("选择文件：", e);
};

const failpic = (e) => {
  console.log("选择文件：", e);
};

onMounted(() => {

});

onLoad((e) => {
  id.value = e.id;
    init();
    if (id.value) {
      getdetail();
    }
});
</script>

<style>
.scroll-content {
  height: 100%;
  /* 填满modal-content的高度 */
  overflow-y: auto;
  /* 允许垂直滚动 */
}
</style>
