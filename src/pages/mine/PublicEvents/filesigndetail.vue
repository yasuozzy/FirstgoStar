<template>
	<view class="main">
		<u-navbar title="详情" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
			:bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
			<template #left>
<view  @click="goBack">
				<u-icon name="arrow-left" size="20" color="#fff"></u-icon>
			</view>
</template>
			<template #right>
<view v-if="showPrintHistoryEntry"  @click="goToPrintHistory">
				<view class="homestayView">打印记录</view>
			</view>
</template>
		</u-navbar>
		<view class="summary-card">
			<view class="summary-main">
				<view class="summary-title">{{ dataDict.content }}</view>
				<view class="summary-time">{{ dataDict.submissionTime }}</view>
			</view>
			<view class="summary-side">
				<view class="status-text">{{ displayStatusName }}</view>
			</view>
		</view>
		<u-line color="#ececec"></u-line>
		<view class="detail-section">
			<view class="detail-row detail-row-top">
				<view class="detail-label">文件详情</view>
				<view class="detail-value">{{ dataDict.details }}</view>
			</view>
			<view v-if="showEmptyState" class="empty-state">详情加载中或暂无数据</view>
			<view class="detail-row detail-row-image">
				<view class="detail-label detail-label-media">图片</view>
				<view class="image-list-wrap media-content-wrap">
					<view class="picViewItem" v-for="(item, index) in picImgs" :key="index">
						<u-image class="detail-image" :src="item" width="72px" height="72px"></u-image>
					</view>
				</view>
			</view>
			<view class="detail-row detail-row-file">
				<view class="detail-label detail-label-media">附件</view>
				<view class="file-list-wrap media-content-wrap">
					<view
						class="file-row"
						v-for="(value, index) in filelist" :key="index">
						<view class="file-item-bg">
							<u-icon name="file-text" color="#666" size="32"></u-icon>
							<view class="file-name">{{ getFileName(value) }}</view>
							<view class="file-preview" @click="previewFile(value)">预览</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="section-gap"></view>
		<view v-if="showSenderBlock" class="section-title">发件人</view>
		<view v-if="showSenderBlock" class="actor-card">
				<view class="avatar-wrap">
				<u-image class="avatar-image" :src="senderInfo.avatar" width="62px" height="62px" :fade="false" @error="onSenderAvatarError"></u-image>
			</view>
			<view class="actor-body">
				<view class="actor-head">
					<view class="actor-name">{{ senderInfo.name }}</view>
					<view class="actor-time">{{ senderInfo.time }}</view>
				</view>
				<view v-if="senderInfo.identity" class="actor-desc">{{ senderInfo.identity }}</view>
				<view class="actor-sign-row">
					<view class="actor-sign-label">签名</view>
					<view class="actor-sign-box">
						<u-image v-if="senderInfo.signature" class="actor-sign-image" :src="senderInfo.signature" mode="aspectFit"
							width="108px" height="108px"></u-image>
					</view>
				</view>
			</view>
		</view>
		<view v-if="leaderList.length > 0" class="receiver-header" @click="toggleReceiverList">
			<view class="receiver-header-text">直属接收人（{{ confirmedCount }}/{{ leaderList.length }}）</view>
			<u-icon :name="receiverExpanded ? 'arrow-up' : 'arrow-down'" size="16" color="#999"></u-icon>
		</view>
		<view v-if="leaderList.length > 0 && receiverExpanded">
			<view v-for="(item, index) in leaderList" :key="index" class="receiver-card">
					<view class="receiver-avatar-wrap">
					<u-image class="receiver-avatar" :src="item.headImage || item.senderHeadImage || '/static/service/lawmyshenqing-image.png'" width="46px" height="46px" :fade="false"></u-image>
				</view>
				<view class="receiver-info">
					<view class="receiver-name">{{ getReceiverName(item) }}</view>
					<view class="receiver-dept">{{ getReceiverIdentity(item) }}</view>
				</view>
				<view :class="['receiver-status', getReceiverStatusClass(item)]">{{ getReceiverSimpleStatus(item) }}</view>
			</view>
		</view>
		<view v-if="showActionFooter" class="footer-placeholder"></view>
		<view v-if="showActionFooter" class="footer-container">
			<view class="footer-actions">
				<view v-if="showTransferButton" class="order-button-half" @click="transferClick">转发</view>
				<view
					v-if="showPrintButton"
					:class="['order-button-half', isPrintApplied(dataDict) ? 'order-button-disabled' : '']"
					@click="applyPrint"
				>{{ isPrintApplied(dataDict) ? '已打印' : '申请打印' }}</view>
				<view v-if="showConfirmButton" class="order-button-half" @click="approveCurrent">确认</view>
			</view>
		</view>
		<u-modal
			:show="showSignDialog"
			content="需前往审批页面签字"
			:show-cancel-button="true"
			cancel-text="取消"
			confirm-text="去签字"
			confirm-color="#2A9595"
			@confirm="goToSign"
			@cancel="cancelSign"
		></u-modal>
	</view>
</template>

<script setup lang="ts">
import { addfilehistoryDetail, approvereceivefile } from '@/api/service.ts';

import { storage } from '@/utils/storage';

import { eventBus } from '@/utiles/eventBus.js';

import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from "vue";

import { onLoad } from "@dcloudio/uni-app";

const proxy = getCurrentInstance()?.proxy as any;

const bgColor = ref("#2A9595");

const icon = ref('/static/home/homestay.png');

const subjectValue = ref('');

const picImgs = ref([]);

const filelist = ref([]);

const image = ref('/static/home/homestay.png');

const ItemData = ref({});

const extras = ref({});

const dataDict = ref({});

const faqiName = ref('');

const leaderList = ref([]);

const auditMap = ref({});

const recheckMap = ref({});

const tongzhiImage = ref('/static/mine/tongzhiImage.png');

const senderList = ref([]);
const idList=ref([]);
const idstring = ref('');

const approveId = ref('');

const cacheKey = ref('');

const cacheItem = ref({});

const loading = ref(false);

const listStatus = ref('');

const currentApproveId = ref('');

const signaturepic = ref('');

const currentPrintId = ref('');

const currentPrintSignature = ref('');

const showSignDialog = ref(false);

const printApplyMap = ref({});

const receiverExpanded = ref(true);

const showEmptyState = computed(() => {
  return !loading.value && !dataDict.value.content && !dataDict.value.details && picImgs.value.length === 0 && filelist.value.length === 0 && leaderList.value.length === 0;
});

const isLocalDraftDetail = computed(() => {
  return !!(cacheItem.value && cacheItem.value._localDraft);
});

const displayStatusName = computed(() => {
  const rawStatusName = String(dataDict.value.statusName || cacheItem.value.statusName || '').trim();
    if (isLocalDraftDetail && rawStatusName) {
      return rawStatusName;
    }
    if (listStatus.value === '0') {
      return '待确认';
    }
    if (listStatus.value === '1') {
      return '已确认';
    }
    if (rawStatusName.indexOf('全部确认') !== -1) {
      return '已确认';
    }
    if (rawStatusName.indexOf('待') !== -1) {
      return '待确认';
    }
    if (rawStatusName.indexOf('确认') !== -1 || rawStatusName.indexOf('同意') !== -1) {
      return '已确认';
    }
    return rawStatusName;
});

const senderInfo = computed(() => {
  const detailData = dataDict.value || {};
    const cachedData = cacheItem.value || {};
    return {
      avatar: detailData.headImage || detailData.applyHeadImage || detailData.senderHeadImage || cachedData.headImage || cachedData.applyHeadImage || cachedData.senderHeadImage || '/static/service/lawmyshenqing-image.png',
      name: detailData.applyUserName || detailData.username || detailData.senderName || faqiName.value || cachedData.applyUserName || cachedData.username || cachedData.senderName || storage.getRealName() || '暂无发件人',
      time: detailData.submissionTime || detailData.createTime || cachedData.submissionTime || cachedData.createTime || '',
      identity: detailData.identityName || detailData.applyDeptName || detailData.deptName || cachedData.identityName || cachedData.applyDeptName || cachedData.deptName || cachedData.reasons || '',
      signature: detailData.signaturepic || cachedData.signaturepic || ''
    };
});

const showSenderBlock = computed(() => {
  if (isLocalDraftDetail) return false;
    if (listStatus.value !== '0' && listStatus.value !== '1') return false;
    return !!(senderInfo.name || senderInfo.time || senderInfo.signature || senderInfo.identity);
});

const hasPrintHistory = computed(() => {
  const currentItemId = String(getCurrentItemId() || '');
    if (isPrintApplied(dataDict.value)) {
      return true;
    }
    if (!currentItemId) {
      return false;
    }
    const currentPrintRecord = printApplyMap.value[currentItemId];
    return !!(currentPrintRecord && (currentPrintRecord === true || currentPrintRecord.applied));
});

const showPrintHistoryEntry = computed(() => {
  return listStatus.value === '1' || hasPrintHistory;
});

const showTransferButton = computed(() => {
  return listStatus.value === '1';
});

const showPrintButton = computed(() => {
  return listStatus.value === '1';
});

const showConfirmButton = computed(() => {
  return listStatus.value === '0' && !!getCurrentApproveId();
});

const showActionFooter = computed(() => {
  return showTransferButton || showPrintButton || showConfirmButton;
});

const confirmedCount = computed(() => {
  return leaderList.value.filter(item => String(item.status) === '1').length;
});

const normalizeImageList = (value) => {
  if (Array.isArray(value)) {
      return value.filter(item => !!item);
    }
    if (typeof value === 'string' && value) {
      return value.split(',').map(item => item.trim()).filter(item => !!item);
    }
    return [];
};

const normalizeFileList = (value) => {
  if (Array.isArray(value)) {
      return value;
    }
    return [];
};

const getPrintStorageKey = () => {
  return `public_events_print_apply_${storage.getPlatId() || ''}`;
};

const loadPrintApplyMap = () => {
  const cachedMap = uni.getStorageSync(getPrintStorageKey());
    printApplyMap.value = cachedMap && typeof cachedMap === 'object' ? cachedMap : {};
};

const savePrintApplyMap = () => {
  uni.setStorageSync(getPrintStorageKey(), printApplyMap.value);
};

const getCurrentApproveId = () => {
  return approveId.value || dataDict.value.approvalId || dataDict.value.id || cacheItem.value.approvalId || cacheItem.value.id || '';
};

const getCurrentItemId = () => {
  return getCurrentApproveId() || dataDict.value.documentId || cacheItem.value.documentId || idstring.value || '';
};

const getCurrentDetailId = () => {
  return idstring.value || dataDict.value.documentId || dataDict.value.documentMessageId || dataDict.value.messageId || cacheItem.value.documentId || cacheItem.value.documentMessageId || cacheItem.value.messageId || cacheItem.value.id || '';
};

const isPrintedFieldValue = (value) => {
  if (value === true) {
      return true;
    }
    if (value === false || value === null || value === undefined || value === '') {
      return false;
    }
    const normalizedValue = String(value).trim();
    return normalizedValue === '1' || normalizedValue === '2' || normalizedValue.toLowerCase() === 'true' || normalizedValue.indexOf('已打') !== -1 || normalizedValue.indexOf('已申请') !== -1 || normalizedValue.indexOf('打印完成') !== -1;
};

const hasServerPrintApplied = (item) => {
  if (!item || typeof item !== 'object') {
      return false;
    }
    const booleanKeys = ['printed', 'isPrinted', 'hasPrinted', 'printApplied', 'isPrintApplied'];
    if (booleanKeys.some(key => isPrintedFieldValue(item[key]))) {
      return true;
    }
    const statusKeys = ['printStatus', 'printState', 'printingStatus', 'filePrintStatus', 'printFlag'];
    return statusKeys.some(key => isPrintedFieldValue(item[key]));
};

const isPrintApplied = (item) => {
  if (item && item._localPrintApplied) {
      return true;
    }
    if (hasServerPrintApplied(item)) {
      return true;
    }
    const itemId = String(getCurrentItemId() || '');
    const cachedValue = itemId ? printApplyMap.value[itemId] : '';
    return !!(cachedValue && (cachedValue === true || cachedValue.applied));
};

const getReceiverName = (item) => {
  return item.receiverUsername || item.username || item.senderName || '暂无姓名';
};

const getReceiverIdentity = (item) => {
  return item.identityName || item.reasons || '';
};

const getReceiverStatusText = (item) => {
  const username = item.username || item.receiverUsername || '';
    if (String(item.status) === '0') {
      return `${username}(待确认)`;
    }
    if (String(item.status) === '1') {
      return `${username}(已确认)`;
    }
    if (String(item.status) === '2') {
      return `${username}(拒绝)`;
    }
    return username;
};

const getReceiverSimpleStatus = (item) => {
  if (String(item.status) === '0') return '待确认';
    if (String(item.status) === '1') return '已确认';
    if (String(item.status) === '2') return '已拒绝';
    return '';
};

const getReceiverStatusClass = (item) => {
  if (String(item.status) === '0') return 'status-pending';
    if (String(item.status) === '1') return 'status-confirmed';
    if (String(item.status) === '2') return 'status-rejected';
    return '';
};

const toggleReceiverList = () => {
  receiverExpanded.value = !receiverExpanded.value;
};

const onSenderAvatarError = () => {
  // avatar load failed, keep default green avatar shown via CSS background
};

const getFileName = (fileItem) => {
  return fileItem.enclosureName || fileItem.name || fileItem.fileName || '未命名附件';
};

const getFileUrl = (fileItem) => {
  // fileItem 可能是字符串（直接 URL）
    if (typeof fileItem === 'string') {
      return fileItem;
    }
    if (!fileItem || typeof fileItem !== 'object') {
      return '';
    }
    // 尝试匹配后端可能返回的各种 URL 字段名
    return fileItem.url || fileItem.enclosureUrl || fileItem.enclosurePath || fileItem.enclosure || fileItem.path || fileItem.filePath || fileItem.fileUrl || fileItem.fileLink || fileItem.href || fileItem.src || fileItem.link || fileItem.accessUrl || fileItem.downloadUrl || fileItem.previewUrl || '';
};

const previewFile = (fileItem) => {
  console.log('预览附件 fileItem:', JSON.stringify(fileItem));
    const fileUrl = getFileUrl(fileItem);
    const fileName = getFileName(fileItem);
    if (!fileUrl) {
      // 如果拿不到 URL，遍历 fileItem 所有字段尝试找到 URL
      if (fileItem && typeof fileItem === 'object') {
        const keys = Object.keys(fileItem);
        for (let i = 0; i < keys.length; i++) {
          const val = fileItem[keys[i]];
          if (typeof val === 'string' && /^https?:\/\//i.test(val)) {
            console.log('从字段 ' + keys[i] + ' 找到 URL:', val);
            doPreviewUrl(val, fileName);
            return;
          }
        }
      }
      uni.showToast({
        title: '暂无可预览附件',
        icon: 'none'
      });
      return;
    }
    doPreviewUrl(fileUrl, fileName);
};

const doPreviewUrl = (fileUrl, fileName) => {
  if (/^https?:\/\//i.test(fileUrl)) {
      uni.downloadFile({
        url: fileUrl,
        success: res => {
          if (res.statusCode !== 200 || !res.tempFilePath) {
            uni.showToast({
              title: '附件预览失败',
              icon: 'none'
            });
            return;
          }
          uni.openDocument({
            filePath: res.tempFilePath,
            showMenu: true,
            fail: err => {
              console.log('openDocument 失败:', err);
              uni.showToast({
                title: '附件预览失败',
                icon: 'none'
              });
            }
          });
        },
        fail: err => {
          console.log('downloadFile 失败:', err);
          uni.showToast({
            title: '附件下载失败',
            icon: 'none'
          });
        }
      });
      return;
    }
    uni.openDocument({
      filePath: fileUrl,
      showMenu: true,
      fail: err => {
        console.log('openDocument 失败:', err);
        uni.showToast({
          title: '附件预览失败',
          icon: 'none'
        });
      }
    });
};

const goToPrintHistory = () => {
  const currentItemId = String(getCurrentItemId() || '');
    uni.navigateTo({
      url: '/pages/mine/PublicEvents/filesignhistory?mode=print&itemId=' + encodeURIComponent(currentItemId)
    });
};

const transferClick = () => {
  const detailId = getCurrentDetailId();
    if (!detailId) {
      return;
    }
    uni.navigateTo({
      url: '/pages/mine/PublicEvents/filesSign?sourceId=' + detailId + '&mode=forward'
    });
};

const applyPrint = () => {
  const itemId = String(getCurrentItemId() || '');
    if (!itemId || isPrintApplied(dataDict.value)) {
      return;
    }
    currentPrintId.value = itemId;
    currentApproveId.value = '';
    currentPrintSignature.value = '';
    showSignDialog.value = true;
};

const submitPrintApply = () => {
  if (!currentPrintId.value || !currentPrintSignature.value) {
      return;
    }
    printApplyMap.value[currentPrintId.value] = {
      applied: true,
      signaturepic: currentPrintSignature.value,
      applyTime: new Date().toISOString(),
      id: currentPrintId.value,
      detailId: getCurrentDetailId(),
      content: dataDict.value.content || cacheItem.value.content || '',
      details: dataDict.value.details || cacheItem.value.details || '',
      submissionTime: dataDict.value.submissionTime || cacheItem.value.submissionTime || '',
      statusName: '已打印'
    };
    dataDict.value['_localPrintApplied'] = true;
    savePrintApplyMap();
    currentPrintId.value = '';
    currentPrintSignature.value = '';
    uni.showToast({
      title: '申请成功',
      icon: 'none'
    });
};

const cancelSign = () => {
  showSignDialog.value = false;
    currentApproveId.value = '';
    signaturepic.value = '';
    currentPrintId.value = '';
    currentPrintSignature.value = '';
};

const goToSign = () => {
  showSignDialog.value = false;
    uni.navigateTo({
      url: '/pages/mine/SignPage/SignPage'
    });
};

const handleSignResult = (data) => {
  if (currentPrintId.value) {
      currentPrintSignature.value = Array.isArray(data) ? data.join(',') : data || '';
      submitPrintApply();
      return;
    }
    if (!currentApproveId.value) {
      return;
    }
    signaturepic.value = Array.isArray(data) ? data.join(',') : data || '';
    confirmApprove();
};

const approveCurrent = () => {
  const itemId = getCurrentApproveId();
    if (!itemId) {
      return;
    }
    currentApproveId.value = itemId;
    currentPrintId.value = '';
    currentPrintSignature.value = '';
    showSignDialog.value = true;
};

const applyDisplayData = (result) => {
  const detailResult = result && typeof result === 'object' ? result : {};
    dataDict.value = Object.assign({}, dataDict.value, detailResult);
    picImgs.value = normalizeImageList(detailResult.picImgs || detailResult.image || picImgs.value);
    leaderList.value = Array.isArray(detailResult.receiverList) ? detailResult.receiverList : Array.isArray(detailResult.leaderList) ? detailResult.leaderList : Array.isArray(detailResult.chaoSongContact) ? detailResult.chaoSongContact : leaderList.value;
    filelist.value = normalizeFileList(detailResult.enclosureList || detailResult.filesList || filelist.value);
    auditMap.value = detailResult.auditMap || auditMap.value;
    recheckMap.value = detailResult.recheckMap || recheckMap.value;
    senderList.value = Array.isArray(detailResult.senderList) ? detailResult.senderList : senderList.value;
    faqiName.value = detailResult.applyUserName || detailResult.username || detailResult.senderName || faqiName.value;
    if (isPrintApplied(detailResult)) {
      dataDict.value['_localPrintApplied'] = true;
    }
};



const getRequestIds = () => {
  const idList = [idstring.value, approveId.value, cacheItem.value.documentId, cacheItem.value.documentMessageId, cacheItem.value.messageId, cacheItem.value.bizId, cacheItem.value.id];
    return idList.filter((item, index) => !!item && idList.indexOf(item) === index);
};

const hasDetailContent = (result) => {
  const detailResult = result && typeof result === 'object' ? result : {};
    return !!(detailResult.content || detailResult.details || detailResult.statusName || Array.isArray(detailResult.receiverList) && detailResult.receiverList.length || Array.isArray(detailResult.leaderList) && detailResult.leaderList.length || Array.isArray(detailResult.enclosureList) && detailResult.enclosureList.length || Array.isArray(detailResult.picImgs) && detailResult.picImgs.length);
};

const tryLoadDetail = (idList, index) => {
  if (index >= idList.length) {
      loading.value = false;
      return;
    }
    let param = {
      id: idList[index],
      userId: storage.getPlatId()
    };
    addfilehistoryDetail(param).then(res => {
      const result = res && res.result ? res.result : {};
      if (hasDetailContent(result)) {
        applyDisplayData(result);
        loading.value = false;
        return;
      }
      tryLoadDetail(idList, index + 1);
    }).catch(() => {
      tryLoadDetail(idList, index + 1);
    });
};

const loadDetailData = () => {
  try {
      const requestIds = getRequestIds();
      if (!requestIds.length) {
        return;
      }
      loading.value = true;
      tryLoadDetail(requestIds, 0);
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
};

const confirmApprove = () => {
  let data = {
      id: currentApproveId.value,
      reason: '',
      signaturepic: signaturepic.value,
      userId: storage.getPlatId()
    };
    approvereceivefile(data).then(res => {
      const isSuccess = res && (res.FAPStatus === 0 || res.success === true || res.resultCode === 200 || res.code === 200);
      if (!isSuccess) {
        currentApproveId.value = '';
        signaturepic.value = '';
        const errorTitle = res && (res.FAPErrorMessage || res.message) || '确认失败';
        uni.showToast({
          title: errorTitle,
          icon: 'none'
        });
        return;
      }
      currentApproveId.value = '';
      signaturepic.value = '';
      showSignDialog.value = false;
      listStatus.value = '1';
      uni.showToast({
        title: '确认成功',
        icon: 'none'
      });
      loadDetailData();
    }).catch(() => {
      currentApproveId.value = '';
      signaturepic.value = '';
      showSignDialog.value = false;
      uni.showToast({
        title: '确认失败',
        icon: 'none'
      });
    });
};

const RebackClick = () => {
  const that = proxy;
    uni.showModal({
      cancelText: '取消',
      confirmText: '撤销',
      confirmColor: '#2A9595',
      title: '提示',
      content: '确认撤销吗？',
      success(e) {
        console.log(e);
        if (e.confirm === true) {
          console.log('撤销');
          that.confirmCheXiao();
        } else {
          console.log('取消');
        }
      }
    });
};

const confirmCheXiao = () => {
  console.log('撤销');
    try {
      let param = {
        id: idstring.value,
        userId: storage.getUserId()
      };
      MineComInsideNolmalSHDetailCancel(param).then(res => {
        console.log(res);
        uni.showToast({
          title: '已撤销',
          icon: 'none'
        });
        loadDetailData();
      });
    } catch (error) {
      console.log(error);
    }
};

const downloadClick = () => {

};

const restartClick = () => {
  const that = proxy;
    uni.showModal({
      cancelText: '取消',
      confirmText: '重新发起',
      confirmColor: '#2A9595',
      title: '提示',
      content: '重新发起吗？',
      success(e) {
        console.log(e);
        if (e.confirm === true) {
          console.log('重新发起');
          that.chongxinFaQi();
        } else {
          console.log('取消');
        }
      }
    });
};

const chongxinFaQi = () => {

};

const goBack = () => {
  uni.navigateBack();
};

onLoad((options) => {
  idstring.value = options.id || '';
    approveId.value = options.approveId || '';
    listStatus.value = options.listStatus ? String(options.listStatus) : '';
    cacheKey.value = options.cacheKey ? decodeURIComponent(options.cacheKey) : '';
    // loadPrintApplyMap();
    // loadDetailData();
	 let param = {
      id: idList[index],
      userId: storage.getPlatId()
    };
    addfilehistoryDetail(param).then(res => {
      const result = res && res.result ? res.result : {};
      if (hasDetailContent(result)) {
        applyDisplayData(result);
        loading.value = false;
        return;
      }
      tryLoadDetail(idList, index + 1);
    }).catch(() => {
      tryLoadDetail(idList, index + 1);
    });
});

onMounted(() => {
  eventBus.$on('sign_netimg', handleSignResult);
});

onBeforeUnmount(() => {
  eventBus.$off('sign_netimg', handleSignResult);
});
</script>

<style lang="scss" scoped>
.main {
	min-height: 100%;
	background: #f5f6f8;

	.flex {
		display: flex;
	}

	.homestayView {
		width: 110px;
		height: 30px;
		color: white;
		margin-right: 14px;
		margin-top: 11px;
		text-align: right;
		font-size: 14px;
	}

	.summary-card {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		padding: 28px 28px 22px;
		background: #fff;
		margin-bottom: 2px;
	}

	.summary-main {
		flex: 1;
		padding-right: 16px;
	}

	.summary-side {
		padding-top: 2px;
	}

	.summary-title {
		font-size: 18px;
		line-height: 28px;
		color: #222;
		font-weight: 500;
		word-break: break-all;
	}

	.summary-time {
		margin-top: 10px;
		font-size: 13px;
		color: #999;
	}

	.detail-section {
		padding: 24px 28px 16px;
		background: #fff;
	}

	.detail-row {
		display: flex;
		align-items: flex-start;
		padding: 18px 0;
	}

	.detail-row-top {
		padding-top: 8px;
		padding-bottom: 22px;
	}

	.detail-row-image {
		padding-top: 18px;
		padding-bottom: 8px;
	}

	.detail-row-file {
		padding-top: 26px;
		padding-bottom: 12px;
	}

	.detail-label {
		width: 76px;
		flex-shrink: 0;
		font-size: 15px;
		line-height: 24px;
		color: #999;
	}

	.detail-label-media {
		width: 64px;
		padding-left: 28px;
		padding-top: 0;
	}

	.detail-value {
		flex: 1;
		font-size: 15px;
		line-height: 24px;
		color: #333;
		word-break: break-all;
	}

	.empty-state {
		padding: 6px 0 4px 72px;
		font-size: 12px;
		color: #999;
	}

	.image-list-wrap {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}

	.media-content-wrap {
		margin-left: 0;
		flex: 1;
	}

	.picViewItem {
		display: flex;
		flex-direction: row;
	}

	.detail-image {
		border-radius: 4px;
		background-color: #f5f5f5;
	}

	.file-list-wrap {
		flex: 1;
	}

	.itemview {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		/* 允许换行 */
		margin-bottom: 10px;

		.situation_item {
			width: 25%;
			font-size: 12px;
			color: #000;
			margin-top: 15px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 65upx;
			margin-bottom: 30px;

			.item_text {
				margin-top: 8px;
				font-size: 11px;
				color: gray;
			}
		}
	}

	.status-text {
		display: flex;
		flex-direction: row;
		color: #2A9595;
		font-size: 15px;
		line-height: 22px;
		white-space: nowrap;
		padding-top: 2px;
	}

	.file-row {
		display: flex;
		flex-direction: row;
		align-items: center;
		min-height: 56px;
		padding: 8px 0;
	}

	.file-item-bg {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
		background-color: #f8f9fa;
		border-radius: 6px;
		padding: 14px 16px;
	}

	.file-name {
		flex: 1;
		margin-left: 12px;
		font-size: 15px;
		color: #333;
		padding-right: 16px;
		word-break: break-all;
	}

	.file-preview {
		font-size: 14px;
		color: #2A9595;
		white-space: nowrap;
		cursor: pointer;
	}

	.section-gap {
		height: 10px;
		background-color: #f3f4f6;
		margin-top: 0;
	}

	.section-title {
		margin: 0;
		padding: 26px 24px 24px;
		font-size: 16px;
		color: #333;
		font-weight: 500;
		background: #fff;
		border-bottom: 1px solid #f0f0f0;
	}

	.actor-card {
		display: flex;
		flex-direction: row;
		padding: 24px 24px 0;
		align-items: flex-start;
		background: #fff;
	}

	.avatar-wrap {
		flex-shrink: 0;
		width: 62px;
		height: 62px;
		border-radius: 31px;
		background-color: #e8e8e8;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.avatar-image {
		flex-shrink: 0;
		border-radius: 31px;
		background-color: transparent;
	}

	.actor-body {
		flex: 1;
		margin-left: 18px;
		padding-bottom: 24px;
		border-bottom: 1px solid #f0f0f0;
		min-height: 100px;
	}

	.actor-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-start;
	}

	.actor-name {
		font-size: 12px;
		line-height: 24px;
		color: #696969;
		flex: 1;
	}

	.actor-time {
		font-size: 12px;
		line-height: 20px;
		color: #696969;
		margin-left: 16px;
		padding-top: 2px;
	}

	.actor-desc {
		font-size: 12px;
		line-height: 18px;
		color: #888;
		margin-top: 10px;
	}

	.actor-sign-row {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		margin-top: 18px;
		min-height: 108px;
	}

	.actor-sign-label {
		font-size: 14px;
		line-height: 20px;
		color: #666;
		padding-bottom: 0;
		margin-right: 60px;
	}

	.actor-sign-box {
		width: 108px;
		height: 108px;
		margin-left: 18px;
		background: #f6f6f6;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.actor-sign-image {
		flex-shrink: 0;
	}

	.receiver-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 22px 24px;
		background: #fff;
		border-bottom: 1px solid #f0f0f0;
	}

	.receiver-header-text {
		font-size: 15px;
		color: #333;
		font-weight: 500;
	}

	.receiver-card {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 16px 24px;
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
	}

	.receiver-avatar-wrap {
		flex-shrink: 0;
		width: 46px;
		height: 46px;
		border-radius: 23px;
		background-color: #e8e8e8;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.receiver-avatar {
		flex-shrink: 0;
		border-radius: 23px;
		background-color: transparent;
	}

	.receiver-info {
		flex: 1;
		margin-left: 14px;
	}

	.receiver-name {
		font-size: 14px;
		line-height: 22px;
		color: #333;
	}

	.receiver-dept {
		font-size: 12px;
		line-height: 18px;
		color: #999;
		margin-top: 2px;
	}

	.receiver-status {
		flex-shrink: 0;
		font-size: 13px;
		margin-left: 12px;
		white-space: nowrap;
	}

	.receiver-status.status-pending {
		color: #ff6b6b;
	}

	.receiver-status.status-confirmed {
		color: #2A9595;
	}

	.receiver-status.status-rejected {
		color: #999;
	}

	.footer-placeholder {
		width: 100%;
		height: 98px;
	}

	.footer-container {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 86px;
		background-color: white;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		z-index: 100;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer-actions {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 86px;
		padding: 0 24px;
		box-sizing: border-box;
		align-items: center;
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

	.order-button-half {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 44px;
		font-size: 16px;
		color: white;
		background-color: #2A9595;
		border-radius: 8px;
		margin-right: 12px;
		box-shadow: 0 4px 10px rgba(42, 149, 149, 0.12);
	}

	.order-button-half:last-child {
		margin-right: 0;
	}

	.order-button-disabled {
		background-color: #c8c8c8;
		box-shadow: none;
	}
}
</style>
