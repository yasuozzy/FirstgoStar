<template>
    <view class="main">
        <view class="custom-navbar">
            <view class="navbar-content">
                <u-icon class="back-icon" name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
                <view class="navbar-search">
                    <u-search
                        v-model="searchContent"
                        :placeholder="searchPlaceholder"
                        :show-action="false"
                        shape="square"
                        bg-color="#f5f5f5"
                    ></u-search>
                </view>
                <view class="search-button" @click="loadData">搜索</view>
            </view>
        </view>

        <view v-if="pageTitle === '接收人'" class="receiver-list">
            <view class="comItemView" v-for="(item,index) in DataList" :key="index">
                <view class="group-header" @click="toggleExpand(index)">
                    <image
                        v-if="!item.allSelected"
                        class="group-check"
                        :src="choose_default"
                        @click.stop="selectAllInGroup(index)"
                    ></image>
                    <image
                        v-else
                        class="group-check"
                        :src="choose_selected"
                        @click.stop="selectAllInGroup(index)"
                    ></image>
                    <view class="group-title">{{ item.leaderName }}({{ item.leaderList.length }}人)</view>
                    <u-icon :name="item.expanded ? 'arrow-up' : 'arrow-down'" size="16" color="#999"></u-icon>
                </view>
                <view class="list-divider"></view>

                <view v-if="item.expanded">
                    <view
                        class="userItemView"
                        v-for="(peritem,perindex) in item.leaderList"
                        :key="perindex"
                        @click="selectContact(index,perindex)"
                    >
                        <view class="user-row">
                            <image
                                v-if="!peritem.select"
                                class="user-check"
                                :src="choose_default"
                            ></image>
                            <image
                                v-else
                                class="user-check"
                                :src="choose_selected"
                            ></image>
                            <u-image
                                class="user-avatar"
                                :src="peritem.headImage ? peritem.headImage : normalIcon"
                                width="24px"
                                height="24px"
                                shape="circle"
                            ></u-image>
                            <view class="user-name">{{ peritem.username }}</view>
                        </view>
                        <view class="list-divider"></view>
                    </view>
                </view>
            </view>
        </view>

        <view v-else class="approver-list">
            <view v-for="(item,index) in DataList" :key="index" class="listItem">
                <view class="approver-group-title">{{ item.leaderName }}({{ item.leaderList.length }}人)</view>
                <view v-for="(peritem,perindex) in item.leaderList" :key="perindex" class="personItem">
                    <view class="approver-row">
                        <image
                            v-if="!peritem.select"
                            class="group-check"
                            :src="choose_default"
                            @click="selectContact(index,perindex)"
                        ></image>
                        <image
                            v-else
                            class="group-check"
                            :src="choose_selected"
                            @click="selectContact(index,perindex)"
                        ></image>
                        <view class="approver-name">{{ peritem.username }}</view>
                    </view>
                </view>
            </view>
        </view>

        <view class="footer-container">
            <view class="footer-row">
                <view class="order-button" @click="saveClick()">保存</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import { getStorage, storage, storageKeys } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { MineComInsideDailyReportSetUpGetReceiver, MineComInsideQingKuanSelectShenPiPerson } from '@/api/mine';

	const bgColor = ref("#2A9595");
	const DataList = ref([]);
	const searchContent = ref('');
	const deptId = ref('');
	const eastId = ref('');
	const pageTitle = ref('选择审批人');
	const searchPlaceholder = ref('搜索审批人');
	const eventName = ref('person1');
	const choose_default = ref('/static/login/choose_unselect.png');
	const choose_selected = ref('/static/login/choose_select.png');
	const normalIcon = ref('/static/service/normalIcon.png');
	const LeaderList = ref([]);
        
    onLoad((options:any) => {
        deptId.value = decodeURIComponent(options.deptId) || storage.getDeptId();
        eastId.value = decodeURIComponent(options.eastId) || storage.getEstId();
        if (options.title) {
            pageTitle.value = decodeURIComponent(options.title);
        }
        if (options.eventName) {
            eventName.value = options.eventName;
        }
        searchPlaceholder.value = pageTitle.value === '接收人' ? '搜索接收人' : '搜索审批人';
        loadData();
    });
   
	const loadData = async() => {
		try {
			const selectedIds = LeaderList.value.map(item => item.bindId || item.leaderUserId || item.userId);

			if (pageTitle.value === '接收人') {
				const receiverParam = {
					userId: storage.getUserId(),
					index: searchContent.value,
				};
				const receiverRes = await MineComInsideDailyReportSetUpGetReceiver(receiverParam);
				const receiverResult = Array.isArray(receiverRes.result) ? receiverRes.result : [];
				DataList.value = formatCompanyReceiverList(receiverResult, selectedIds);
				updateSelectedList();
				
				return;
			}

			const param = {
				leaderName: searchContent.value,
				applyType: '2',
				userId: storage.getUserId(),
				deptId: deptId.value,
			};
			const res = await MineComInsideQingKuanSelectShenPiPerson(param);
			console.log(res);
			const result = Array.isArray(res.result) ? res.result : [];
			DataList.value = formatLeaderList(result, selectedIds);
			updateSelectedList();
			
		} catch (error) {
			console.log(error);
		}
	};
	const formatLeaderList = (result:any, selectedIds:any) => {
		
		return result.map(item => {
			return {
				...item,
				leaderList: item.leaderList && Array.isArray(item.leaderList)
					? item.leaderList.map(leader => {
						const currentUserId = leader.bindId || leader.leaderUserId || leader.userId;
						return {
							...leader,
							bindId: currentUserId,
							select: selectedIds.includes(currentUserId)
						};
					})
					: []
			};
		});
	};
	const formatReceiverList = (result:any, selectedIds:any) => {
		const groupMap = {};
		result.forEach(item => {
			const groupName = item.deptName || item.leaderName || item.identityName || pageTitle;
			if (!groupMap[groupName]) {
				groupMap[groupName] = [];
			}
			groupMap[groupName].push({
				...item,
				bindId: item.bindId || item.leaderUserId || item.userId,
				select: selectedIds.includes(item.bindId || item.leaderUserId || item.userId)
			});
		});
		return Object.keys(groupMap).map(name => {
			return {
				leaderName: name,
				leaderList: groupMap[name]
			};
		});
	};
	const formatCompanyReceiverList = (result:any, selectedIds:any) => {
		const groupList = [];
		result.forEach(company => {
			const deptList = Array.isArray(company.deptList) ? company.deptList : [];
			deptList.forEach(dept => {
				const userList = Array.isArray(dept.userList) ? dept.userList : [];
				const deptUsers = userList.map(user => {
					const currentUserId = user.bindId || user.leaderUserId || user.userId;
					return {
						...user,
						bindId: currentUserId,
						select: selectedIds.includes(currentUserId)
					};
				});
				if (deptUsers.length > 0) {
					groupList.push({
						leaderName: dept.deptName || company.companyName || pageTitle,
						leaderList: deptUsers,
						expanded: true,
						allSelected: deptUsers.every(u => u.select)
					});
				}
			});
		});
		return groupList;
	};
	const updateSelectedList = () => {
		const currentLeaderList = [];
		DataList.value.forEach(item => {
			if (item.leaderList && Array.isArray(item.leaderList)) {
				item.leaderList.forEach(leader => {
					if (leader.select) {
						currentLeaderList.push(leader);
					}
				});
			}
		});
		LeaderList.value = currentLeaderList;
	};
	const toggleExpand = (index:any) => {
		DataList.value[index].expanded = !DataList.value[index].expanded;
	};
	const selectAllInGroup = (index:any) => {
		const group = DataList.value[index];
		const newState = !group.allSelected;
		group.leaderList.forEach(user => {
			user.select = newState;
		});
		// $set(DataList[index], 'allSelected', newState);
		DataList.value[index].allSelected = newState;
		updateSelectedList();
	};
	const selectContact = (index:any, perindex:any) => {
		DataList.value[index].leaderList[perindex].select = !DataList.value[index].leaderList[perindex].select;
		const group = DataList[index];
		// $set(DataList[index], 'allSelected', group.leaderList.every(u => u.select));
		DataList[index].allSelected = group.leaderList.every(u => u.select);
		updateSelectedList();
	};
	const saveClick = () => {
		if (LeaderList.value.length === 0) {
			uni.showToast({
				title: pageTitle.value === '接收人' ? '请选择接收人' : '请选择审批人',
				icon: 'none',
			});
			return;
		}
		eventBus.emit(eventName.value, LeaderList);
		uni.navigateBack();
	};
    const goBack= () => {
            
		uni.navigateBack()
	};    
		
</script>

<style lang="scss" scoped>
.main {
    min-height: 100vh;
    padding-bottom: 88px;
    background: white;
}

.receiver-list,
.approver-list {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.listItem,
.personItem,
.comItemView,
.userItemView {
    width: 100%;
}

.custom-navbar {
    background-color: #2A9595;
    padding: 10px 0 14px;
}

.navbar-content {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 12px;
    box-sizing: border-box;
}

.back-icon {
    margin-top: calc(var(--status-bar-height));
    flex-shrink: 0;
}

.navbar-search {
    flex: 1;
    margin: calc(var(--status-bar-height)) 14px 0 10px;
}

.search-button {
    width: 58px;
    margin-top: calc(var(--status-bar-height));
    color: #fff;
    font-size: 14px;
    text-align: center;
    flex-shrink: 0;
}

.group-header {
    display: flex;
    align-items: center;
    min-height: 88px;
    padding: 0 14px 0 18px;
    box-sizing: border-box;
}

.group-check {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
}

.group-title {
    flex: 1;
    margin-left: 18px;
    font-size: 17px;
    color: #333;
    line-height: 1.4;
}

.user-row {
    display: flex;
    align-items: center;
    min-height: 70px;
    padding: 0 14px 0 60px;
    box-sizing: border-box;
}

.user-check {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
}

.user-avatar {
    margin-left: 14px;
    flex-shrink: 0;
}

.user-name {
    margin-left: 16px;
    font-size: 16px;
    color: #333;
    line-height: 1.4;
}

.list-divider {
    width: 92%;
    height: 1px;
    margin-left: 4%;
    background-color: #e5e5e5;
}

.approver-group-title {
    margin: 12px 0 0 15px;
    font-size: 15px;
    color: #333;
}

.approver-row {
    display: flex;
    align-items: center;
    margin: 10px 0 0 30px;
}

.approver-name {
    margin-left: 10px;
    font-size: 15px;
    color: #333;
}

.footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 78px;
    background-color: white;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer-row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70px;
}

.order-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 48px);
    height: 50px;
    margin: 10px 24px 0;
    font-size: 15px;
    color: white;
    background-color: #2A9595;
    border-radius: 8px;
}
</style>
