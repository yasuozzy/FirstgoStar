<template>
    <view class="history-page">
        <u-navbar :title="pageTitle" :safeAreaInsetTop="true" :placeholder="true" :fixed="true" :border="false"
            :bgColor="bgColor" titleStyle="color: #fff;" leftIconColor="#fff">
             <template #left>
			  <view class="u-nav-slot">
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			  </view>
			</template>
			<template #right>
				<view @click="toggleSearch">
					<u-icon name="search" size="20" color="#fff" style="margin-right: 15px;"></u-icon>
				</view>
			</template>
        </u-navbar>
        <view v-if="showSearch" class="history-search-bar">
            <input v-model="searchKeyword" placeholder="搜索文件" type="text" confirm-type="search" @confirm="doSearch" class="history-search-input" />
            <view @click="doSearch" class="history-search-action history-search-action-primary">搜索</view>
            <view @click="cancelSearch" class="history-search-action history-search-action-muted">取消</view>
        </view>
        <view v-for="(item, index) in list" @click="todetail(item)" :key="index" class="history-card">
            <view class="history-card-head">
                <view class="history-card-title">{{ item.content }}</view>
                <view class="history-card-status">
                    <text v-if="item.statusName === '待提交'">{{ item.statusName }}</text>
                    <text v-else-if="mode === 'print'">{{ item.statusName }}</text>
                    <text v-else>{{ item.statusName }}:{{item.count }}</text>
                </view>
            </view>
            <view class="history-divider"></view>
            <view class="history-card-body">
                <view class="history-meta-row">文件详情：{{ item.details }}</view>
                <view class="history-meta-row">{{ mode === 'print' ? '打印时间' : '发送时间' }}：{{ mode === 'print' ? (item.applyTime || item.submissionTime) : item.submissionTime }}</view>
            </view>
            <view v-if="item.statusName === '待提交'" class="history-card-actions">
                <view class="history-edit-btn" @click.stop="editItem(item)">编辑</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted,computed } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { addfilehistory } from "@/api/service";

	const bgColor = ref("#2A9595");
	const list = ref([]);
	const showSearch = ref(false);
	const searchKeyword = ref('');
	const mode = ref('');
	const itemId = ref('');
        
    onLoad((options:any) => {
        mode.value = options.mode || '';
        itemId.value = options.itemId ? decodeURIComponent(options.itemId) : '';
    });
    onShow(() => {
        getdata();
    });
    const pageTitle = computed(() => {
      return mode.value === 'print' ? '打印记录' : '文件列表';
    });
    
	const goBack= () => {
			
		uni.navigateBack()
	};
        const getDetailCacheKey = (item:any) => {
            return 'public_events_detail_' + String(item && (item.id || item.documentId || item.documentMessageId || item.messageId) || '');
        };
        const cacheDetailItem = (item:any) => {
            const cacheKey = getDetailCacheKey(item);
            const cachedItem = Object.assign({}, item || {}, {
                _localPrintApplied: !!(item && item._localPrintApplied),
            });
            uni.setStorageSync(cacheKey, cachedItem);
            return cacheKey;
        };
        const getDraftHistoryKey = () => {
            return `public_events_history_${storage.getPlatId() || ''}`;
        };
        const getPrintHistoryKey = () => {
            return `public_events_print_apply_${storage.getPlatId() || ''}`;
        };
        const getDraftHistoryList = () => {
            const cachedList = uni.getStorageSync(getDraftHistoryKey());
            return Array.isArray(cachedList) ? cachedList : [];
        };
        const getPrintHistoryList = () => {
            const cachedMap = uni.getStorageSync(getPrintHistoryKey());
            const printMap = cachedMap && typeof cachedMap === 'object' ? cachedMap : {};
            return Object.keys(printMap).map((key) => {
                const item = printMap[key];
                if (item && typeof item === 'object') {
                    return Object.assign({ id: key }, item);
                }
                return {
                    id: key,
                    applied: !!item,
                    statusName: '已打印',
                };
            }).filter((item) => {
                if (!itemId.value) {
                    return true;
                }
                return String(item && item.id || '') === String(itemId.value);
            }).sort((a, b) => String(b.applyTime || '').localeCompare(String(a.applyTime || '')));
        };
        const mergeLocalDrafts = (serverList:any) => {
			
            const remoteList = Array.isArray(serverList) ? serverList : [];
            const localList = getDraftHistoryList().filter((item) => {
                if (!searchKeyword.value) {
                    return true;
                }
                const keyword = String(searchKeyword.value || '').trim();
                return String(item && item.content || '').includes(keyword) || String(item && item.details || '').includes(keyword);
            });
            const remoteIds = remoteList.map((item) => String(item && item.id || ''));
            const uniqueLocalList = localList.filter((item) => !remoteIds.includes(String(item && item.id || '')));
            return [...uniqueLocalList, ...remoteList];
        };
        const filterPrintRecords = (list:any) => {
			
            const printList = Array.isArray(list) ? list : [];
            if (!searchKeyword.value) {
                return printList;
            }
            const keyword = String(searchKeyword.value || '').trim();
            return printList.filter((item) => {
                return String(item && item.content || '').includes(keyword)
                    || String(item && item.details || '').includes(keyword)
                    || String(item && item.applyTime || '').includes(keyword);
            });
        };
        const toggleSearch = () =>  {
            showSearch.value = !showSearch.value;
            if (!showSearch.value) {
                searchKeyword.value = '';
                getdata();
            }
        };
        const doSearch = () =>  {
            getdata();
        };
        const cancelSearch = () => {
            showSearch.value = false;
            searchKeyword.value = '';
            getdata();
        };
        const getdata = async() => {
            // if (mode === 'print') {
            //     list = filterPrintRecords(getPrintHistoryList());
            //     return;
            // }
			try{
            let data = {
                content: searchKeyword.value || '',
                userId: storage.getPlatId(),
                page: 1,
                size: 50,
            };
            const res = await addfilehistory(data);
			console.log(res);
			list.value = res.result;
            }catch(error){
                console.log(error);
            }
        };
        const todetail = (item:any) => {
            // if (mode.value === 'print') {
            //     const detailId = item && (item.detailId || item.id || '');
            //     if (!detailId) {
            //         return;
            //     }
            //     uni.navigateTo({
            //         url: `/pages/mine/PublicEvents/filesigndetail?id=${encodeURIComponent(detailId)}&approveId=${encodeURIComponent((item.id || ''))}&listStatus=${1}`
            //     })
            //     return;
            // }
            // if (item && item._localDraft) {
            //     const cacheKey = cacheDetailItem(item);
            //     uni.navigateTo({
            //         url: `/pages/mine/PublicEvents/filesigndetail?cacheKey=${encodeURIComponent(cacheKey)}`
            //     })
            //     return;
            // }
            uni.navigateTo({
                url:
                    `/pages/mine/PublicEvents/filedetail?id=${encodeURIComponent(item.id)}`
            })
        };
        const editItem = (item:any) => {
            if (item ) {
                uni.navigateTo({
                    url: `/pages/mine/PublicEvents/filesSign?id=${encodeURIComponent(item.id)}`
                })
                return;
            }
            // todetail(item)
        };
    
</script>

<style lang="scss" scoped>
.history-page {
	min-height: 100vh;
	background-color: #f7f7f7;
}

.history-search-bar {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 14px 14px 10px;
	background-color: #fff;
}

.history-search-input {
	flex: 1;
	height: 38px;
	border: 1px solid #ddd;
	border-radius: 19px;
	padding: 0 14px;
	font-size: 14px;
	background-color: #fff;
	box-sizing: border-box;
}

.history-search-action {
	margin-left: 12px;
	font-size: 14px;
	line-height: 20px;
}

.history-search-action-primary {
	color: #2A9595;
}

.history-search-action-muted {
	color: #999;
}

.history-card {
	margin: 12px 0 0;
	background-color: #fff;
	border-radius: 0;
	overflow: hidden;
}

.history-card-head {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
	padding: 18px 18px 16px;
	column-gap: 16px;
}

.history-card-title {
	flex: 1;
	font-size: 14px;
	line-height: 22px;
	color: #525252;
	word-break: break-all;
}

.history-card-status {
	flex-shrink: 0;
	font-size: 15px;
	line-height: 24px;
	color: #289497;
	padding-top: 2px;
}

.history-divider {
	height: 1px;
	background-color: #efefef;
	margin: 0 18px;
}

.history-card-body {
	padding: 16px 18px 0;
}

.history-meta-row {
	font-size: 13px;
	line-height: 22px;
	color: #666;
	word-break: break-all;
}

.history-meta-row + .history-meta-row {
	margin-top: 8px;
}

.history-card-actions {
	display: flex;
	justify-content: flex-end;
	padding: 18px 18px 20px;
}

.history-edit-btn {
	min-width: 92px;
	height: 38px;
	padding: 0 22px;
	border-radius: 19px;
	background-color: #289497;
	color: #fff;
	font-size: 15px;
	line-height: 38px;
	text-align: center;
	box-sizing: border-box;
}
</style>
