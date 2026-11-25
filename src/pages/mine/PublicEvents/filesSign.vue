<template>
	<view class="main">
		<u-navbar title="" :safeAreaInsetTop="true" :placeholder="true" :fixed="true"
			:border="false" :bgColor="bgColor" titleStyle="color: #fff;">
			 <template #left>
			  <view class="u-nav-slot">
				<view class="flex">
					<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
				</view>
			  </view>
			</template>
			<template #right>
				<view @click="homestayClick">
					<view class="homestayView">历史记录</view>
				</view>
			</template>
		</u-navbar>
		<view class="section-gap"></view>
		<view class="form-row">
			<view class="required-mark">*</view>
			<view class="form-label">申请内容</view>
			<input class="form-input" v-model="content" placeholder="填写申请内容" type="text" />
		</view>
		<view class="section-gap"></view>
		<view class="form-row">
			<view class="required-mark">*</view>
			<view class="form-label">审批详情</view>
		</view>
		<textarea class="form-textarea" v-model="details" placeholder="请填写审批详情"></textarea>
		<view style="width: 100%;height: 5px;background-color: lightgray;margin-top: 10px;"></view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">图片</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<view class="imagechooseView" @click="selectFile">
			<view v-if="tempFilePaths.length == 0" class="custom-upload-btn">
			  <image :src="selectphoto" ></image>
			</view>
			<view v-if="tempFilePaths.length > 0" class="ChoseenView">
				<view class="imageItemV" v-for="(item,index) in tempFilePaths" :key="index">
					<image style="width: 80px;height: 80px;" :src="item" ></image>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="margin-left: 15px;margin-top: 10px;font-size: 14px;width: 90%;">附件</view>
		<view style="width: 92%;height: 1px;background-color: lightgray;margin-top: 10px;margin-left: 4%;"></view>
		<!-- <view class="attachment-area">
			<view class="attachment-add-btn" @click="chooseAttachment">
				<view class="attachment-add-inner">
					<u-icon name="plus" size="22" color="#bbb"></u-icon>
				</view>
			</view>
			<view class="attachment-file-list">
				<view v-for="(file, fi) in attachmentFiles" :key="fi" class="attachment-file-item">
					<u-icon name="file-text" size="16" color="#2A9595"></u-icon>
					<view class="attachment-file-name">{{ file.name }}</view>
					<!-- <u-icon name="close" size="14" color="#999" @click.stop="removeAttachment(fi)" style="padding: 4px;"></u-icon>
					  -->
					<!-- <view class="attachment-remove-btn" @tap.stop="removeAttachment(fi)">
						<u-icon name="close" size="14" color="#999"></u-icon>
					</view>
				</view>
			</view>
		</view> -->
		<view class="imagechooseView">
			<x-native-uploader v-if="enclosureName.length == 0"
			name="multipartFile" 
			fileType="all"
			:header="{}"
			:limit="1"
			:url="loadFileUrl"
			:formData="{ key: 'multipartFile' }"
			
			@success="onUploadSuccess"
			@fail="onUploadFail"></x-native-uploader>
			<view v-if="enclosureName.length > 0" style="display: flex;flex-direction: row;">
				<image style="margin-top: 10px;margin-left: 15px;width: 25px;height: 25px;" src="/src/static/mine/wenjian.png"></image>
				<text style="margin-top: 10px;margin-left: 10px;">{{ enclosureName }}</text>
			</view>
		</view>
		<view style="width: 100%;height: 5px;background-color: lightgray;"></view>
		<view style="display: flex;flex-direction: row;width: 100%;height: 44px;align-items: center;"
			@click="chooseReceiver">
			<view style="margin-left: 15px;color: red;font-size: 14px;">*</view>
			<view style="margin-left: 4px;font-size: 14px;flex: 1;">接收人</view>
			<view style="font-size: 13px;color: #666;margin-right: 5px;">{{ chaoSongContact.length }}人</view>
			<u-image style="margin-right: 15px;" :src="arrowImg" width="8px" height="15px"></u-image>
		</view>
		<view class="footer-container">
			<view
				style="display: flex;flex-direction: row;width: 100%;height: 70px;padding: 0 4%;box-sizing: border-box;">
				<view class="order-button-half" @click="sendClick">发送</view>
				<view class="order-button-half" style="margin-left: 4%;" @click="saveClick">保存</view>
			</view>
		</view>

		<!-- 附件来源选择弹窗 -->
		<view v-if="showFileSourcePicker" class="fs-overlay" @click.self="showFileSourcePicker = false">
			<view class="fs-popup">
				<view class="fs-close" @click="showFileSourcePicker = false">×</view>
				<view class="fs-item" @click="pickFile('wechat')">微信文件</view>
				<view class="fs-divider"></view>
				<view class="fs-item" @click="pickFile('qq')">QQ文件</view>
				<view class="fs-divider"></view>
				<view class="fs-item" @click="pickFile('dingtalk')">钉钉文件</view>
				<view class="fs-divider"></view>
				<view class="fs-item" @click="pickFile('phone')">手机文件</view>
			</view>
		</view>
		<u-modal :show="showSignDialog" content="需前往审批页面签字" :show-cancel-button="true" cancel-text="取消"
			confirm-text="去签字" confirm-color="#2A9595" @confirm="goToSign" @cancel="showSignDialog = false"></u-modal>
	</view>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted,onUnmounted } from 'vue';
    import {} from '@/api/mine';
     import {} from '@/api/service';
    import { getStorage, storage, storageKeys,BaseURL, uploadMultipleFiles } from '@/utils/storage';
    import eventBus from '@/utils/eventBus';
    import { onLoad,onPullDownRefresh,onReachBottom,onShow} from '@dcloudio/uni-app';
	import { addfilehistoryDetail, addfilesign } from '@/api/service';
	import { MineComInsideNolmalSHGetHouse, MineComInsideQingKuanHeader } from '@/api/mine';
	import xNativeUploader from '@/components/x-native-uploader/x-native-uploader.vue';
	// 背景颜色
	const bgColor = ref("#2A9595");
	const department = ref('三楼服务中心');
	const image = ref("/static/home/homestay.png");
	const downImage = ref('/static/mine/arrowDown.png');
	const arrowImg = ref('/static/service/my_arrow.png');
	const checkboxItems = ref([
		{ name: '收款', value: '否', checked: 'true' },
		{ name: '拨款', value: '是' }
	]);
	const current = ref(0);
	const arrowimage = ref('/static/service/my_arrow.png');
	const imageStyles = ref({
		width: 64,
		height: 64,
		border: {
			color: "lightgray",
			width: 2,
			style: 'dashed',
			radius: '2px'
		}
	});
	const company = ref('数字科技有限公司');
	const content = ref('');
	const details = ref('');
	const sourceId = ref('');
	const mode = ref('');
	const receivers = ref([]);
	const estId = ref('');
	const deptId = ref('');
	const chaoSongContact = ref([]);
	const tempFilePaths = ref([]);
	const uploadedCount = ref(0);
	const finalImgValue = ref('');
	const imageValue = ref([]);
	const attachmentFiles = ref([]);
	const finalEnclosureValue = ref('');
	const showFileSourcePicker = ref(false);
	const showSignDialog = ref(false);
	const signaturepic = ref('');
	const currentDraftKey = ref('');
	const currentDraftId = ref('');
	const id = ref('');
	const personPicUrl = ref('');
	const selectphoto = ref('/static/mine/selectphoto.png');
	const accessoryPath = ref('');
	const enclosureName = ref('');
	const loadFileUrl = BaseURL + 'Announce/addUploadIms';
	const enclosureList = ref([]);	
	onLoad((options:any) => {
		
		sourceId.value = options.sourceId || '';
		mode.value = options.mode || '';
		currentDraftKey.value = options.draftKey ? decodeURIComponent(options.draftKey) : '';
		// if (currentDraftKey.value) {
			// loadLocalDraft();
		// }
		if (sourceId.value) {
			loadSourceDetail();
		}
		if (mode.value === 'edit' && sourceId.value) {
			loadSourceDetail();
		}
		id.value = options.id || '';
		if (id.value) {
			loadSourceDetail();
		}

	});

	onMounted(() => {
		init();
		eventBus.on('selecPerson', getPersonList);
		eventBus.on('sign_netimg', handleSignResult);
	});
	onUnmounted(() => {
		eventBus.off('selecPerson', getPersonList);
		eventBus.off('sign_netimg', handleSignResult);
	});
	
	const init = async() => {
		estId.value = storage.getEstId() || '';
		deptId.value = storage.getDeptId() || '';
		if (estId.value) {
			loadDeptInfo();
			return;
		}
		try {
			let param = {
				userId: storage.getUserId(),
			};
			const res = await MineComInsideNolmalSHGetHouse(param);
				const result = Array.isArray(res.result) ? res.result : [];
				if (result.length > 0) {
					estId.value = result[0].estId;
					storage.saveCompanyName(result[0].companyName);
					storage.saveCompanyImage(result[0].companyImage);
					storage.saveEstId(result[0].estId);
					loadDeptInfo();
				}
			
		} catch (error) {
			console.log(error)
		}
	};
	const loadDeptInfo = async() => {
		if (deptId.value || !estId.value) {
			return;
		}
		try {
			let param = {
				estId: estId.value,
				userId: storage.getUserId(),
			};
			const res = await MineComInsideQingKuanHeader(param);
				const result = Array.isArray(res.result) ? res.result : [];
				if (result.length > 0) {
					deptId.value = result[0].deptId;
					storage.saveDeptName(result[0].deptName);
					storage.saveDeptId(result[0].deptId);
				}
			
		} catch (error) {
			console.log(error)
		}
	};
		const loadSourceDetail = async() => {
			try {
				let param = {
					id: id.value,
					userId: storage.getPlatId(),
				};
				const res = await addfilehistoryDetail(param);
					console.log(res);
					content.value = res.result.content;
					details.value = res.result.details;
					id.value=id.value;
					finalImgValue.value=res.result.picImgs;
					tempFilePaths.value=res.result.picImgs;
					enclosureList.value=res.result.enclosureList;
					enclosureName.value=res.result.enclosureList[0].enclosureName;
					receivers.value=res.result.receiverList;
					chaoSongContact.value=res.result.receiverList;
// id: id.value || '',
					// applyUserId: storage.getPlatId(),
					// applyUserName: storage.getRealName(),
					// content: content.value,
					// details: details.value,
					// image: finalImgValue.value,
					// enclosure: JSON.stringify(enclosureList.value),
					// signaturepic: signaturepic.value,
					// reason: '',
					// receivers: JSON.stringify(receivers.value, null,),
					// submitFlag: submitFlag,


			} catch (error) {
				console.log(error)
			}
		};
		const goBack= () => {
		        
			uni.navigateBack()
		};
		const homestayClick = () => {

			uni.navigateTo({
				url: '/pages/mine/PublicEvents/filesignhistory'
			})
		};
		const chooseReceiver = () => {
			if (!content.value || !content.value.trim()) {
				uni.showToast({
					title: '申请内容不能为空',
					icon: 'none',
				});
				return;
			}
			if (!details.value || !details.value.trim()) {
				uni.showToast({
					title: '审批详情不能为空',
					icon: 'none',
				});
				return;
			}
			if (!estId.value || !deptId.value) {
				uni.showToast({
					title: '接收人数据加载中',
					icon: 'none',
				});

				init();
				return;
			}
			uni.navigateTo({
				url: `/pages/mine/PublicEvents/fileselectperson?estId=${encodeURIComponent((estId.value || ''))}`
			})
		};
		const getPersonList = (data:any) => {
			console.log('接收到回传的数据:', data);
			const list = Array.isArray(data) ? data : [];
			receivers.value.push(list);
			chaoSongContact.value = list;
		};
		const getDraftHistoryKey = () => {
			return `public_events_history_${storage.getPlatId() || ''}`;
		};
		const getDraftHistoryList = () => {
			const cachedList = uni.getStorageSync(getDraftHistoryKey());
			return Array.isArray(cachedList) ? cachedList : [];
		};
		// const loadLocalDraft = () => {
		// 	const draftItem = getDraftHistoryList().find((item) => String(item && item.id || '') === String(currentDraftKey.value || ''));
		// 	if (!draftItem) {
		// 		return;
		// 	}
		// 	currentDraftId.value = draftItem.id || '';
		// 	content.value = draftItem.content || '';
		// 	details.value = draftItem.details || '';
		// 	receivers.value = draftItem.receivers || '';
		// 	estId.value = draftItem.estId || estId.value;
		// 	deptId.value = draftItem.deptId || deptId.value;
		// 	chaoSongContact.value = Array.isArray(draftItem.chaoSongContact) ? draftItem.chaoSongContact : (Array.isArray(draftItem.receiverList) ? draftItem.receiverList : []);
		// 	tempFilePaths.value = Array.isArray(draftItem.tempFilePaths) ? draftItem.tempFilePaths : [];
		// 	attachmentFiles.value = Array.isArray(draftItem.attachmentFiles) ? draftItem.attachmentFiles : [];
		// 	finalImgValue.value = draftItem.finalImgValue || '';
		// 	finalEnclosureValue.value = draftItem.finalEnclosureValue || '';
		// 	imageValue.value = finalImgValue.value ? finalImgValue.value.split(',').filter((item) => !!item).map((item) => ({ url: item, name: String(item).split('/').pop() })) : [];
		// };
		const saveLocalDraftHistory = (res:any) => {
			const result = res && res.result && typeof res.result === 'object' ? res.result : {};
			const draftId = String(currentDraftId.value || result.id || result.documentId || result.documentMessageId || (`local_${Date.now()}`));
			const nowText = new Date().toISOString().slice(0, 19).replace('T', ' ');
			const draftItem = {
				...result,
				id: draftId,
				content: content.value,
				details: details.value,
				receivers: receivers.value,
				estId: estId.value,
				deptId: deptId.value,
				chaoSongContact: chaoSongContact.value,
				receiverList: chaoSongContact.value,
				leaderList: chaoSongContact.value,
				tempFilePaths: tempFilePaths.value,
				attachmentFiles: attachmentFiles.value,
				filesList: attachmentFiles.value,
				enclosureList: attachmentFiles.value,
				finalImgValue: finalImgValue.value,
				image: finalImgValue.value,
				finalEnclosureValue: finalEnclosureValue.value,
				submissionTime: result.submissionTime || result.createTime || nowText,
				createTime: result.createTime || result.submissionTime || nowText,
				statusName: '待提交',
				applyUserName: storage.getRealName() || '',
				headImage: storage.getAvatar() || '',
				_localDraft: true,
			};
			const draftList = getDraftHistoryList();
			const targetIndex = draftList.findIndex((item) => String(item && item.id || '') === draftId);
			if (targetIndex > -1) {
				draftList.splice(targetIndex, 1, draftItem);
			} else {
				draftList.unshift(draftItem);
			}
			uni.setStorageSync(getDraftHistoryKey(), draftList);
			currentDraftId.value = draftId;
			currentDraftKey.value = draftId;
		};
		const removeLocalDraftHistory = () => {
			const targetId = String(currentDraftId.value || currentDraftKey.value || '');
			if (!targetId) {
				return;
			}
			const nextList = getDraftHistoryList().filter((item) => String(item && item.id || '') !== targetId);
			uni.setStorageSync(getDraftHistoryKey(), nextList);
		};
		const onUploadSuccess = (res:any) => {
			console.log('上传成功', res);
			// 假设返回结构为 { data: '文件路径', ... }
			const response = JSON.parse(res.response);
			if (response.result == true) {
				accessoryPath.value = response.data;
				enclosureName.value = res.file.name;
				console.log(accessoryPath.value,enclosureName.value);
				var dict = {};
				dict.accessoryPath = accessoryPath.value;
				dict.enclosureName = enclosureName.value;
				enclosureList.value.push(dict);
				console.log(enclosureList.value);
				uni.showToast({
					title:'文件上传成功',
					icon:'none'
				});
			}
		};
		
		const onUploadFail = (err:any) => {
		  console.error('上传失败', err)
		};
		const sendClick = () => {
			console.log(chaoSongContact, 'chaoSongContact');
			if (!chaoSongContact.value || chaoSongContact.value.length === 0) {
				uni.showToast({
					title: '请选择接收人',
					icon: 'none',
				});
				return;
			}
			showSignDialog.value = true;
		};
		const saveClick = () => {
			postClick('0');
		};
		const handleSignResult = (data:any) => {
			signaturepic.value = Array.isArray(data) ? data.join(',') : (data || '');
			postClick('1');
		};
		const goToSign = () => {
			showSignDialog.value = false;
			uni.navigateTo({
				url: '/pages/mine/SignPage/SignPage'
			})
		};
		const chooseAttachment = () => {
			showFileSourcePicker.value = true;
		};
		const pickFile = () => {
			showFileSourcePicker.value = false;
			uni.chooseMessageFile({
				count: 9,
				type: 'file',
				success: (res) => {
					const tempFiles = Array.isArray(res.tempFiles) ? res.tempFiles : [];
					const nextFiles = tempFiles.map((file) => ({
						name: file.name || '',
						path: file.path || '',
						url: file.path || '',
						filePath: file.path || '',
					}));
					attachmentFiles.value = [...attachmentFiles.value, ...nextFiles];
					finalEnclosureValue.value = attachmentFiles.value.map((item) => item.path || item.filePath || item.url || '').filter((item) => !!item).join(',');
				}
			})
		};
		const removeAttachment = (index:any) => {
			attachmentFiles.value.splice(index, 1);
			finalEnclosureValue.value = attachmentFiles.value.map((item) => item.path || item.filePath || item.url || '').filter((item) => !!item).join(',');
		};
		const progress = () => {
		};
		const success = (e:any) => {
			const tempFiles = e && Array.isArray(e.tempFiles) ? e.tempFiles : [];
			const paths = tempFiles.map((item) => item.url || item.path || '').filter((item) => !!item);
			tempFilePaths.value = paths;
			finalImgValue.value = paths.join(',');
			imageValue.value = paths.map((item) => ({ url: item, name: String(item).split('/').pop() }));
		};
		const fail = (error:any) => {
			console.log(error);
		};
		const selectFile = () => {
		        
			uni.chooseImage({
				count: 9, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function (res) {
					console.log(res.tempFilePaths);
					tempFilePaths.value = res.tempFilePaths;
					uploadFileImage();
				}
			});
		};
		
		const uploadFileImage = async() => {
			const result = await uploadMultipleFiles([],tempFilePaths.value,getStorage(storageKeys.token,''));
			console.log(result);
			finalImgValue.value = result.map(item => item.data).join(',');
		};
		
		const postClick = async(submitFlag:any) => {
			try {
				let param = {
					id: id.value || '',
					applyUserId: storage.getPlatId(),
					applyUserName: storage.getRealName(),
					content: content.value,
					details: details.value,
					image: finalImgValue.value,
					enclosure: JSON.stringify(enclosureList.value),
					signaturepic: signaturepic.value,
					reason: '',
					receivers: JSON.stringify(receivers.value, null,),
					submitFlag: submitFlag,
				};
				const res = await addfilesign(param);
					console.log(res);
					const isSuccess = res && (res.FAPStatus === 0 || res.success === true || res.resultCode === 200 || res.code === 200);

					if (!isSuccess) {
						const errorTitle = (res && (res.FAPErrorMessage || res.message)) || (submitFlag === '1' ? '发送失败' : '保存失败');
						uni.showToast({ title: errorTitle, icon: 'none' });
						return;
					}
					if (submitFlag === '0') {
						saveLocalDraftHistory(res);
					} else {
						removeLocalDraftHistory();
					}
					const title = submitFlag === '1' ? '发送成功' : '保存成功';
					uni.showToast({ title: title, icon: 'none' });
					if (submitFlag === '1' || submitFlag === '0') {
						uni.navigateTo({
							url: '/pages/mine/PublicEvents/filesignhistory'
						});

					}
				
					uni.showToast({ title: submitFlag === '1' ? '发送失败' : '保存失败', icon: 'none' });
			
			} catch (error) {
				console.log(error);
			}
		};
	
</script>

<style lang="scss" scoped>
.main {
	min-height: 100vh;
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

	.searchlocation {
		margin-left: 15px;
		width: 200px;
		height: 20px;
		font-size: 13px;
		margin-top: 10px;
	}

	.section-gap {
		width: 100%;
		height: 8px;
		background-color: #f5f5f5;
	}

	.form-row {
		display: flex;
		flex-direction: row;
		width: 100%;
		min-height: 56px;
		align-items: center;
		padding: 16px 0 8px;
	}

	.required-mark {
		margin-left: 20px;
		color: red;
		font-size: 16px;
		display: flex;
		align-items: center;
		padding-top: 6px;
	}

	.form-label {
		font-size: 15px;
		color: #333;
		margin-left: 6px;
		min-width: 70px;
	}

	.form-input {
		flex: 1;
		margin-left: 20px;
		margin-right: 20px;
		font-size: 15px;
		color: #333;
		height: 24px;
	}

	.form-textarea {
		margin: 0 20px 16px;
		width: calc(100% - 40px);
		min-height: 120px;
		font-size: 15px;
		color: #333;
		padding: 12px;
		box-sizing: border-box;
	}

	.radioView {
		display: flex;
		flex-direction: row;
		font-size: 13px;
		width: 100px;
		margin-left: 30px;

		margin-top: 10px;
	}

	.imagechooseView {
		margin-top: 10px;
		margin-left: 5%;
		width: 90%;
		height: 100px;
		margin-bottom: 20px;
	  }
	.custom-upload-btn {
		 width: 64px;
		 height: 64px;
		 display: flex;
		 align-items: center;
		 justify-content: center;
	    }
	    .custom-upload-btn image {
	             width: 100%;
	             height: 100%;
	    }
	    .ChoseenView{
	               
	                display: grid;
	                 grid-template-columns: repeat(3, 1fr);
	                 gap: 10px;
	                 max-width: 900px;
	                 margin: 0 auto;
	                 // padding: 20px;
	                 align-items: left;
	    }
	    .imageItemV{
	               
	               
	               width:80px;
	               height: 80px;
	               margin-top: 10px;
	               box-sizing: border-box;
	    }

	.attachment-area {
		margin-top: 10px;
		margin-left: 5%;
		width: 90%;
		padding-bottom: 10px;
	}

	.attachment-add-btn {
		display: inline-block;
	}

	.attachment-add-inner {
		width: 64px;
		height: 64px;
		border: 2px dashed lightgray;
		border-radius: 2px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.attachment-file-list {
		margin-top: 8px;
	}

	.attachment-file-item {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 6px 0;
		border-bottom: 1px solid #f0f0f0;
	}

	.attachment-file-name {
		flex: 1;
		font-size: 13px;
		color: #333;
		margin-left: 6px;
		margin-right: 6px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.attachment-remove-btn {
		width: 23px;
		height: 23px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
	}

	.footer-container {
		width: 100%;
		padding: 10px 0 20px;
		background-color: white;
		color: white;
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中 */

	}

	.order-button-half {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 55px;
		flex: 1;
		font-size: 13px;
		color: white;
		background-color: #2A9595;
		border-radius: 6px;
		margin-top: 15px;
	}

	.fs-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.45);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fs-popup {
		background-color: #fff;
		border-radius: 10px;
		width: 70%;
		overflow: hidden;
		position: relative;
	}

	.fs-close {
		position: absolute;
		top: 10px;
		right: 16px;
		font-size: 20px;
		color: #999;
		line-height: 1;
	}

	.fs-item {
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #333;
	}

	.fs-divider {
		height: 1px;
		background-color: #e5e5e5;
		margin: 0 5%;
	}
}
</style>
