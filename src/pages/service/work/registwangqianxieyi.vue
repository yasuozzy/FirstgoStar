<template>
    <scroll-view style=" height: 85vh; overflow-y: auto; padding-bottom: 50px;" scroll-y>
        <view style=" display: flex;flex-direction: column;padding-bottom: 20px;">
            <view style="width: 100%;height: 10px;background-color: aliceblue;"></view>
            <view style="margin-top: 15px;margin-left: 15px;font-size: 13px; font-weight: bolder;">用工单位</view>
            <view style="margin-top: 15px;width: 100%;display: flex;flex-direction: row;" @click="choseworkClick()">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;width: 80%;">选择工作</view>
                <u-image style="margin-top: 17px;margin-left: 15px;" :src="arrowDown" width="15px"
                    height="8px"></u-image>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">单位名称</view>
                <u-input placeholder="请输入内容" border="surround" v-model="company"></u-input>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工时间</view>
                <u-input placeholder="请输入内容" border="surround" v-model="work_time"></u-input>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工地点</view>
                <u-input placeholder="请输入内容" border="surround" v-model="work_location"></u-input>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工工种</view>
                <u-input placeholder="请输入内容" border="surround" v-model="work_type"></u-input>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">用工人数</view>
                <u-input placeholder="请输入内容" border="surround" v-model="work_num"></u-input>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">工资薪酬</view>
                <u-input placeholder="请输入内容" border="surround" v-model="salary"></u-input>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">结算方式</view>
                <u-input placeholder="请输入内容" border="surround" v-model="pay_method"></u-input>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">联系电话</view>
                <u-input placeholder="请输入内容" border="surround" v-model="mobile"></u-input>
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">劳务人员</view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">姓名</view>
                <input class="searchlocation" v-model="user_name" placeholder="请填写" type="text" />
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">性别</view>
                <input class="searchlocation" v-model="user_sex" placeholder="请填写" type="text" />
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">联系电话</view>
                <input class="searchlocation" v-model="user_mobile" placeholder="请填写" type="text" />
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">中介公司</view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">公司名称</view>
                <input class="searchlocation" v-model="comname" placeholder="请填写" type="text" />
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">办公地点</view>
                <input class="searchlocation" v-model="comlocation" placeholder="请填写" type="text" />
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>
            <view style="margin-top: 10px;width: 100%;display: flex;flex-direction: row;">
                <view style="margin-top: 10px;margin-left: 15px;font-size: 13px;">联系电话</view>
                <input class="searchlocation" v-model="commobile" placeholder="请填写" type="text" />
            </view>
            <view style="width: 97%;height: 1px;background-color: lightgray;margin-left: 10px;margin-top: 15px;"></view>

            <view style="margin-top: 15px;margin-left: 15px;font-size: 13px;">中介盖章或签字</view>
            <view style="display: flex;width: 100%;height: 200px;">
                <u-image style="margin-top: 10px;margin-left: 15px;" :src="sign_pic_hsr" width="330px"
                    height="180px"></u-image>
            </view>
            <view style="display: flex;width: 100%;height: 200px;">
                <u-image style="margin-top: 10px;margin-left: 15px;" :src="baseImgURL + signPic" width="330px"
                    height="180px"></u-image>
            </view>
            <view class="protocalView">
                <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-if="selected === false"
                    src="/static/login/choose_unselect.png" @click="chooseselect"></image>
                <image style="margin-left: 15px;margin-top: 15px;width: 15px;height: 15px;" v-else
                    src="/static/login/choose_select.png" @click="chooseselect"></image>
                <view style="font-size: 12px;color: dimgray;margin-top: 13px;margin-left: 10px;">已阅读并同意</view>
                <view style="font-size: 12px;color: royalblue;margin-top: 13px;">《{{ agreement_name }}》</view>
            </view>
            <!-- <view>
                <checkbox value="cb" :checked="true" style="margin-left: 15px;" />阅读并同意<text
                    style="color: #2a9598;">《{{ agreement_name }}》</text>
            </view>   -->
            <view
                style="margin: 15px;background-color: #2a9598;color: white;text-align: center;border-radius: 4px;padding-top: 4px;padding-bottom: 4px;"
                @click="fasongClick()">提交
            </view>

        </view>
    </scroll-view>
</template>

<script setup lang="ts">
import { storage, BaseImgURL } from '@/utils/storage';

import { MineJiuYeQunYuanUseWorkerGetZhongJieSign, GetAgreemente, MineJiuYeQunYuanUseWorkerFaSong } from '@/api/mine.ts';

import { dayjobWorkTypeList } from '@/api/work.ts';

import { EventBus } from '@/utiles/event_bus.js';

import { eventBus } from "@/utiles/eventBus.js";

import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref } from "vue";

const bgColor = ref("#2A9595");

const myImage = ref('/static/service/myIconImage.png');

const arrowDown = ref('/static/home/downImage.png');

const company = ref('');

const work_time = ref('');

const work_location = ref('');

const work_type = ref('');

const work_num = ref('');

const salary = ref('');

const pay_method = ref('');

const mobile = ref('');

const hsr_mobile = ref('');

const coraddress = ref('');

const sign_pic_hsr = ref('');

const user_name = ref('');

const user_sex = ref('');

const user_mobile = ref('');

const agreement_name = ref('');

const agreement_content = ref('');

const selected = ref(false);

const comname = ref('');

const comlocation = ref('');

const commobile = ref('');

const signPic = ref('');

const baseImgURL = ref(BaseImgURL);

const buttonTitle = ref<any>();

const init = () => {
  try {
      let param = {};
      MineJiuYeQunYuanUseWorkerGetZhongJieSign(param).then(res => {
        console.log(res);
        commobile.value = res.result.hsr_mobile;
        comname.value = res.result.corname;
        comlocation.value = res.result.coraddress;
        sign_pic_hsr.value = res.result.sign_pic_hsr;
      });
      dayjobWorkTypeList(param).then(res => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
};

const choseworkClick = () => {
  uni.navigateTo({
      url: '/pages/mine/LingGongOrder/chooseWork'
    });
};

const handleRefresh = (data) => {
  console.log('收到刷新事件:', data);
    company.value = data.company;
    work_time.value = data.work_time;
    work_location.value = data.work_location;
    work_type.value = data.work_type;
    work_num.value = data.work_num;
    salary.value = data.salary;
    pay_method.value = data.pay_method;
    mobile.value = data.mobile;
};

const getAgreement = () => {
  try {
      let param = {
        type: '18'
      };
      GetAgreemente(param).then(res => {
        console.log(res);
        agreement_name.value = res.result.agreement_name;
        agreement_content.value = res.result.agreement_content;
      });
    } catch (error) {
      console.log(error);
    }
};

const chooseselect = () => {
  selected.value = !selected.value;
};

const fasongClick = () => {
  if (company.value.length == 0) {
      uni.showToast({
        title: '请填写单位',
        icon: 'none'
      });
      return;
    } else if (work_time.value.length == 0) {
      uni.showToast({
        title: '请填写用工时间',
        icon: 'none'
      });
      return;
    } else if (work_location.value.length == 0) {
      uni.showToast({
        title: '请填写用工地点',
        icon: 'none'
      });
      return;
    } else if (work_type.value.length == 0) {
      uni.showToast({
        title: '请填写用工工种',
        icon: 'none'
      });
      return;
    } else if (work_num.value.length == 0) {
      uni.showToast({
        title: '请填写用工人数',
        icon: 'none'
      });
      return;
    } else if (salary.value.length == 0) {
      uni.showToast({
        title: '请填写工作薪酬',
        icon: 'none'
      });
      return;
    } else if (pay_method.value.length == 0) {
      uni.showToast({
        title: '请填写结算方式',
        icon: 'none'
      });
      return;
    } else if (mobile.value.length == 0) {
      uni.showToast({
        title: '请填写联系电话',
        icon: 'none'
      });
      return;
    } else if (user_name.value.length == 0) {
      uni.showToast({
        title: '请填写劳务人员姓名',
        icon: 'none'
      });
      return;
    } else if (user_sex.value.length == 0) {
      uni.showToast({
        title: '请填写劳务人员性别',
        icon: 'none'
      });
      return;
    } else if (user_mobile.value.length == 0) {
      uni.showToast({
        title: '请填写劳务人员联系电话',
        icon: 'none'
      });
      return;
    } else if (selected.value == false) {
      uni.showToast({
        title: '请同意劳务协议',
        icon: 'none'
      });
      return;
    } else {
      if (!signPic.value) {
        uni.navigateTo({
          url: "/pages/mine/SignPage/SignPage"
        });
        return;
      }
      try {
        let param = {
          userId: storage.getUserId(),
          company: company.value,
          work_time: work_time.value,
          work_location: work_location.value,
          work_type: work_type.value,
          work_num: work_num.value,
          salary: salary.value,
          pay_method: pay_method.value,
          mobile: mobile.value,
          user_name: user_name.value,
          user_sex: user_sex.value,
          user_mobile: user_mobile.value,
          sign_pic_com: signPic.value
        };
        MineJiuYeQunYuanUseWorkerFaSong(param).then(res => {
          console.log(res);
          uni.showToast({
            title: '发送成功',
            icon: 'none'
          });
          personalClick();
        });
      } catch (error) {
        console.log(error);
      }
    }
};

const handleUpdateData = (data) => {
  console.log("接收到回传的数据:", data);
    if (data) {
      signPic.value = data[0];
      console.log(signPic.value);
    }
    ;
    buttonTitle.value = '确认发送';
};

const personalClick = () => {
  // uni.navigateTo({
    //     url: '/pages/mine/LingGongOrder/myProtocal?userType=' + 0
    // })
};

onMounted(() => {
  init();
    getAgreement();
    eventBus.$on("sign_netimg", handleUpdateData);
});

onBeforeUnmount(() => {
  eventBus.$off("sign_netimg", handleUpdateData);
});

onMounted(() => {
  // this.loadData()
    // 监听刷新事件
    EventBus.$on('chosework-data', handleRefresh);
    // EventBus.$on("sign_netimg", this.handleUpdateData);
});

onBeforeUnmount(() => {
  // 清除事件监听
    EventBus.$off('chosework-data', handleRefresh);
    // EventBus.$off("sign_netimg", this.handleUpdateData);
});

onActivated(() => {
  // keep-alive 激活时检查
    EventBus.$on('chosework-data', handleRefresh);
    // EventBus.$on("sign_netimg", this.handleUpdateData);
});

onDeactivated(() => {
  EventBus.$off('chosework-data', handleRefresh);
    // EventBus.$off("sign_netimg", this.handleUpdateData);
});
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
}

.searchlocation {
    margin-left: 4%;
    width: 250px;
    height: 25px;
    margin-top: 8px;
    font-size: 13px;
}

.protocalView {
    display: flex;
    flex-direction: row;
    width: 100%;
}

.buttonView {

    margin-top: 30px;
    background-color: #2A9595;
    border-radius: 5px;
    color: white;
    font-size: 14px;
    margin-left: 5%;
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 40px;
    /* 需要设置高度 */
    width: 90%;
    /* 需要设置宽度 */
}
</style>