<template>
    <view class="main">
        <u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
            <template #left>
                <view @click="goBack">
                    <u-icon name="arrow-left" size="20" color="#fff"></u-icon>
                </view>
            </template>
        </u-navbar>
        <view>
            订单编号：{{ order_no }}
        </view>
        <view>
            收件人：{{ received_name }}
        </view>
        <view>
            收货地址：{{ received_adress }}
        </view>
    </view>
</template>

<script setup lang="ts">
import { serviceReceiveMyGetInDetail } from '@/api/service.ts';
import { storage } from '@/utils/storage';
import { onMounted, ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 背景颜色
const bgColor = ref("#2A9595");
const order_no = ref('');
const waybill_no = ref('');
const shipNo = ref('');
const dataDict = ref<any>({});
const received_name = ref('');
const received_adress = ref('');

const goBack = () => {
    uni.navigateBack();
};

const loadData = () => {
    try {
        const param = {
            OrderCode: order_no.value,
            LogisticCode: waybill_no.value,
            ShipperCode: shipNo.value,
        };
        serviceReceiveMyGetInDetail(param).then((res) => {
            console.log(res);
            dataDict.value = res.result;
        });
    } catch (error) {
        console.log(error);
    }
};

onLoad((options: any) => {
    order_no.value = options.order_no;
    waybill_no.value = options.waybill_no;
    shipNo.value = options.shipNo;
    received_name.value = options.received_name;
    received_adress.value = options.received_adress;
});

onMounted(() => {
    loadData();
});
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
    background: white;

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
}
</style>
