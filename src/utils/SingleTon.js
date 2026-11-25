// const TokenKey = 'App-Token'
// //正式地址
// // export const BaseURL = 'http://wuye.qyp2c.com/app/'
// // export const BaseImgURL  = 'http://www.qyp2c.com/estate/'

// //测试地址
// export const BaseURL = 'http://36.138.20.28:9004/app/'
// export const BaseImgURL = 'http://36.138.20.61/estate/'
// export const uploadimg = 'http://36.138.20.28:9006/app/Announce/addUploadIms'



// export const  SDKAppID=1600138376; // 腾讯云 SDKAppID
// export const usersig = "eJwtjc0KgkAYRd9l1qHj-H0zQhsDEZIgMwhxM*lkk1iiEkL07pm6vOfcy-2gND45b9MhHxEHo82cbWmeg73ZGUsFiioMilFgQIxiBRh*VVRSTaX01k1f1rptbYl8T2DsTRbEYszY2s5MnHNOMMYLHWzzZwACOBFi7fa2mi6TjATxflfgA9e5m9YVf-S9HsMo47kbBfe0OarXJWCJjMLzFn1-2sc2vA__"; // 腾讯云 usersig
// // 获取Token
// export function getToken() {
// 	return uni.getStorageSync(TokenKey)
// }

// // 设置token
// export function setToken(token) {
// 	return uni.setStorageSync(TokenKey, token)
// }

// // 移除Token
// export function removeToken() {
// 	return uni.removeStorageSync(TokenKey)
// }


// export const storage = {

// 	saveToken(data) {
		
// 		uni.setStorageSync(TokenKey,data);
// 		console.log("token", data)
// 	},
	
// 	getToken() {
// 		const value = uni.getStorageSync(TokenKey);
// 		console.log("token", value)
// 		return value ? value : null;
// 	},
	
// 	removeToken() {
// 		uni.removeStorageSync("token"); 
// 	},
// 	saveloginType(data) {
// 		uni.setStorageSync("loginType", data);
// 		console.log("loginType", data)
// 	},
// 	getloginType() {
// 		const value = uni.getStorageSync("loginType");
// 		console.log("loginType", value)
// 		return value ? value : null;
// 	},
// 	removeLoginType() {
// 		uni.removeStorageSync("loginType"); 
// 	},
// 	saveUserId(data) {
// 		uni.setStorageSync("userId", data);
// 		console.log("userId", data)
// 	},
// 	getUserId() {
// 		const value = uni.getStorageSync("userId");
// 		console.log("userId", value)
// 		return value ? value : null;
// 	},
// 	removeUserId() {
// 		uni.removeStorageSync("userId"); 
// 	},

// 	saveRealType(data) {
// 		uni.setStorageSync("realType", data);
// 		console.log("realType", data)
// 	},
// 	getRealType() {
// 		const value = uni.getStorageSync("realType");
// 		console.log("realType", value)
// 		return value ? value : null;
// 	},
// 	removeRealType() {
// 		uni.removeStorageSync("realType");
// 	},

// 	savePlatId(data) {
// 		uni.setStorageSync("platId", data);
// 		console.log("platId", data)
// 	},
// 	getPlatId() {
// 		const value = uni.getStorageSync("platId");
// 		console.log("platId", value)
// 		return value ? value : null;
// 	},
// 	removePlatId() {
// 		uni.removeStorageSync("platId");
// 	},

// 	saveHostNo(data) {
// 		uni.setStorageSync("hostNo", data);
// 		console.log("hostNo", data)
// 	},
// 	getHostNo() {
// 		const value = uni.getStorageSync("hostNo");
// 		console.log("hostNo", value)
// 		return value ? value : null;
// 	},
// 	removeHostNo() {
// 		uni.removeStorageSync("hostNo");
// 	},
// 	saveCstType(data) {
// 		uni.setStorageSync("cstType", data);
// 		console.log("cstType", data)
// 	},
// 	getCstType() {
// 		const value = uni.getStorageSync("cstType");
// 		console.log("cstType", value)
// 		return value ? value : null;
// 	},
// 	removeCstType() {
// 		uni.removeStorageSync("cstType");
// 	},
// 	saveAvatar(data) {
// 		uni.setStorageSync("avatar", data);
// 		console.log("avatar", data)
// 	},
// 	getAvatar() {
		
// 		const value = uni.getStorageSync("avatar");
// 		console.log("avatar", value)
// 		return value ? value : '/static/service/myIconImage.png';
// 	},
// 	removeAvatar() {
// 		uni.removeStorageSync("avatar");
// 	},
// 	saveNickName(data) {
// 		uni.setStorageSync("nickName", data);
// 		console.log("nickName", data)
// 	},
// 	getNickName() {
		
// 		const value = uni.getStorageSync("nickName");
// 		console.log("nickName", value)
// 		return value ? value : null;
// 	},
// 	removeNickName() {
// 		uni.removeStorageSync("nickName");
// 	},
// 	saveRealName(data) {
// 		uni.setStorageSync("realName", data);
// 		console.log("realName", data)
// 	},
// 	getRealName() {
		
// 		const value = uni.getStorageSync("realName");
// 		console.log("realName", value)
// 		return value ? value : null;
// 	},
// 	removeRealName() {
// 		uni.removeStorageSync("realName");
// 	},
// 	savePhone(data) {
// 		uni.setStorageSync("phone", data);
// 		console.log("phone", data)
// 	},
// 	getPhone() {
// 		const value = uni.getStorageSync("phone");
// 		console.log("phone", value)
// 		return value ? value : null;
// 	},
// 	removePhone() {
// 		uni.removeStorageSync("phone");
// 	},
// 	saveSex(data) {
// 		uni.setStorageSync("sex", data);
// 		console.log("sex", data)
// 	},
// 	getSex() {
		
// 		const value = uni.getStorageSync("sex");
// 		console.log("sex", value)
// 		return value ? value : null;
// 	},
// 	removeSex() {
// 		uni.removeStorageSync("sex");
// 	},
// 	saveBirthday(data) {
// 		uni.setStorageSync("birthday", data);
// 		console.log("birthday", data)
// 	},
// 	getBirthday() {
		
// 		const value = uni.getStorageSync("birthday");
// 		console.log("birthday", value)
// 		return value ? value : null;
// 	},
// 	removeBirthday() {
// 		uni.removeStorageSync("birthday");
// 	},
// 	saveFinLoginName(data) {
// 		uni.setStorageSync("finLoginName", data);
// 		console.log("finLoginName", data)
// 	},
// 	getFinLoginName() {
		
// 		const value = uni.getStorageSync("finLoginName");
// 		console.log("finLoginName", value)
// 		return value ? value : null;
// 	},
// 	removeFinLoginName() {
// 		uni.removeStorageSync("finLoginName");
// 	},
// 	saveFinSysSessionId(data) {
// 		uni.setStorageSync("finSysSessionId", data);
// 		console.log("finSysSessionId", data)
// 	},
// 	getFinSysSessionId() {
		
// 		const value = uni.getStorageSync("finSysSessionId");
// 		console.log("finSysSessionId", value)
// 		return value ? value : null;
// 	},
// 	removeFinSysSessionId() {
// 		uni.removeStorageSync("finSysSessionId");
// 	},
// 	saveBookId(data) {
// 		uni.setStorageSync("bookId", data);
// 		console.log("bookId", data)
// 	},
// 	getBookId() {
		
// 		const value = uni.getStorageSync("bookId");
// 		console.log("bookId", value)
// 		return value ? value : null;
// 	},
// 	removeBookId() {
// 		uni.removeStorageSync("bookId");
// 	},
// 	saveFinancialCompanyName(data) {
// 		uni.setStorageSync("financialCompanyName", data);
// 		console.log("financialCompanyName", data)
// 	},
// 	getFinancialCompanyName() {
		
// 		const value = uni.getStorageSync("financialCompanyName");
// 		console.log("financialCompanyName", value)
// 		return value ? value : null;
// 	},
// 	removeFinancialCompanyName() {
// 		uni.removeStorageSync("financialCompanyName");
// 	},
// 	saveUsersig(data) {
// 		uni.setStorageSync("usersig", data);
// 		console.log("usersig", data)
// 	},
// 	getUsersig() {
		
// 		const value = uni.getStorageSync("usersig");
// 		console.log("usersig", value)
// 		return value ? value : null;
// 	},
// 	removeUsersig() {
// 		uni.removeStorageSync("usersig");
// 	},
// 	saveDeliveryId(data) {
// 		uni.setStorageSync("deliveryId", data);
// 		console.log("deliveryId", data)
// 	},
// 	getDeliveryId() {
		
// 		const value = uni.getStorageSync("deliveryId");
// 		console.log("deliveryId", value)
// 		return value ? value : null;
// 	},
// 	removeDeliveryId() {
// 		uni.removeStorageSync("deliveryId");
// 	},
// 	saveDeliveryName(data) {
// 		uni.setStorageSync("deliveryName", data);
// 		console.log("deliveryName", data)
// 	},
// 	getDeliveryName() {
		
// 		const value = uni.getStorageSync("deliveryName");
// 		console.log("deliveryName", value)
// 		return value ? value : null;
// 	},
// 	removeDeliveryName() {
// 		uni.removeStorageSync("deliveryName");
// 	},
// 	saveIsWhetherDelivery(data) {
// 		uni.setStorageSync("isWhetherDelivery", data);
// 		console.log("isWhetherDelivery", data)
// 	},
// 	getIsWhetherDelivery() {
		
// 		const value = uni.getStorageSync("isWhetherDelivery");
// 		console.log("isWhetherDelivery", value)
// 		return value ? value : null;
// 	},
// 	removeIsWhetherDelivery() {
// 		uni.removeStorageSync("isWhetherDelivery");
// 	},
// 	saveDeliveryManagerId(data) {
// 		uni.setStorageSync("deliveryManagerId", data);
// 		console.log("deliveryManagerId", data)
// 	},
// 	getDeliveryManagerId() {
		
// 		const value = uni.getStorageSync("deliveryManagerId");
// 		console.log("deliveryManagerId", value)
// 		return value ? value : null;
// 	},
// 	removeDeliveryManagerId() {
// 		uni.removeStorageSync("deliveryManagerId");
// 	},
// 	saveDeliveryTakeOrder(data) {
// 		uni.setStorageSync("deliveryTakeOrder", data);
// 		console.log("deliveryTakeOrder", data)
// 	},
// 	getDeliveryTakeOrder() {
		
// 		const value = uni.getStorageSync("deliveryTakeOrder");
// 		console.log("deliveryTakeOrder", value)
// 		return value ? value : null;
// 	},
// 	removeDeliveryTakeOrder() {
// 		uni.removeStorageSync("deliveryTakeOrder");
// 	},
// 	saveDeliveryAuditStatus(data) {
// 		uni.setStorageSync("deliveryAuditStatus", data);
// 		console.log("deliveryAuditStatus", data)
// 	},
// 	getDeliveryAuditStatus() {
		
// 		const value = uni.getStorageSync("deliveryAuditStatus");
// 		console.log("deliveryAuditStatus", value)
// 		return value ? value : null;
// 	},
// 	removeDeliveryAuditStatus() {
// 		uni.removeStorageSync("deliveryAuditStatus");
// 	},
// 	saveTemporayId(data) {
// 		uni.setStorageSync("temporayId", data);
// 		console.log("temporayId", data)
// 	},
// 	getTemporayId() {
		
// 		const value = uni.getStorageSync("temporayId");
// 		console.log("temporayId", value)
// 		return value ? value : null;
// 	},
// 	removeTemporayId() {
// 		uni.removeStorageSync("temporayId");
// 	},
// 	saveTemporayName(data) {
// 		uni.setStorageSync("temporayName", data);
// 		console.log("temporayName", data)
// 	},
// 	getTemporayName() {
		
// 		const value = uni.getStorageSync("temporayName");
// 		console.log("temporayName", value)
// 		return value ? value : null;
// 	},
// 	removeTemporayName() {
// 		uni.removeStorageSync("temporayName");
// 	},
// 	saveIsWhetherTemporay(data) {
// 		uni.setStorageSync("isWhetherTemporay", data);
// 		console.log("isWhetherTemporay", data)
// 	},
// 	getIsWhetherTemporay() {
		
// 		const value = uni.getStorageSync("isWhetherTemporay");
// 		console.log("isWhetherTemporay", value)
// 		return value ? value : null;
// 	},
// 	removeIsWhetherTemporay() {
// 		uni.removeStorageSync("isWhetherTemporay");
// 	},
// 	saveTemporayManagerId(data) {
// 		uni.setStorageSync("temporayManagerId", data);
// 		console.log("temporayManagerId", data)
// 	},
// 	getTemporayManagerId() {
		
// 		const value = uni.getStorageSync("temporayManagerId");
// 		console.log("temporayManagerId", value)
// 		return value ? value : null;
// 	},
// 	removeTemporayManagerId() {
// 		uni.removeStorageSync("temporayManagerId");
// 	},
// 	saveTemporayTakeOrder(data) {
// 		uni.setStorageSync("temporayTakeOrder", data);
// 		console.log("temporayTakeOrder", data)
// 	},
// 	getTemporayTakeOrder() {
		
// 		const value = uni.getStorageSync("temporayTakeOrder");
// 		console.log("temporayTakeOrder", value)
// 		return value ? value : null;
// 	},
// 	removeTemporayTakeOrder() {
// 		uni.removeStorageSync("temporayTakeOrder");
// 	},
// 	saveTemporayAuditStatus(data) {
// 		uni.setStorageSync("temporayAuditStatus", data);
// 		console.log("temporayAuditStatus", data)
// 	},
// 	getTemporayAuditStatus() {
		
// 		const value = uni.getStorageSync("temporayAuditStatus");
// 		console.log("temporayAuditStatus", value)
// 		return value ? value : null;
// 	},
// 	removeTemporayAuditStatus() {
// 		uni.removeStorageSync("temporayAuditStatus");
// 	},
// 	saveShopOwnerId(data) {
// 		uni.setStorageSync("shopOwnerId", data);
// 		console.log("shopOwnerId", data)
// 	},
// 	getShopOwnerId() {
		
// 		const value = uni.getStorageSync("shopOwnerId");
// 		console.log("shopOwnerId", value)
// 		return value ? value : null;
// 	},
// 	removeShopOwnerId() {
// 		uni.removeStorageSync("shopOwnerId");
// 	},
// 	saveAddress(data) {
// 		uni.setStorageSync("address", data);
// 		console.log("address", data)
// 	},
// 	getAddress() {
		
// 		const value = uni.getStorageSync("address");
// 		console.log("address", value)
// 		return value ? value : null;
// 	},
// 	removeAddress() {
// 		uni.removeStorageSync("address");
// 	},
// 	saveBldgid(data) {
// 		uni.setStorageSync("bldgid", data);
// 		console.log("bldgid", data)
// 	},
// 	getBldgid() {
		
// 		const value = uni.getStorageSync("bldgid");
// 		console.log("bldgid", value)
// 		return value ? value : null;
// 	},
// 	removeBldgid() {
// 		uni.removeStorageSync("bldgid");
// 	},
// 	saveBldgname(data) {
// 		uni.setStorageSync("bldgname", data);
// 		console.log("bldgname", data)
// 	},
// 	getBldgname() {
		
// 		const value = uni.getStorageSync("bldgname");
// 		console.log("bldgname", value)
// 		return value ? value : null;
// 	},
// 	removeBldgname() {
// 		uni.removeStorageSync("bldgname");
// 	},
// 	saveHcpid(data) {
// 		uni.setStorageSync("hcpid", data);
// 		console.log("hcpid", data)
// 	},
// 	getHcpid() {
		
// 		const value = uni.getStorageSync("hcpid");
// 		console.log("hcpid", value)
// 		return value ? value : null;
// 	},
// 	removeHcpid() {
// 		uni.removeStorageSync("hcpid");
// 	},
// 	saveHseid(data) {
// 		uni.setStorageSync("hseid", data);
// 		console.log("hseid", data)
// 	},
// 	getHseid() {
		
// 		const value = uni.getStorageSync("hseid");
// 		console.log("hseid", value)
// 		return value ? value : null;
// 	},
// 	removeHseid() {
// 		uni.removeStorageSync("hseid");
// 	},
// 	saveHsename(data) {
// 		uni.setStorageSync("hsename", data);
// 		console.log("hsename", data)
// 	},
// 	getHsename() {
		
// 		const value = uni.getStorageSync("hsename");
// 		console.log("hsename", value)
// 		return value ? value : null;
// 	},
// 	removeHsename() {
// 		uni.removeStorageSync("hsename");
// 	},
// 	saveHsenum(data) {
// 		uni.setStorageSync("hsenum", data);
// 		console.log("hsenum", data)
// 	},
// 	getHsenum() {
		
// 		const value = uni.getStorageSync("hsenum");
// 		console.log("hsenum", value)
// 		return value ? value : null;
// 	},
// 	removeHsenum() {
// 		uni.removeStorageSync("hsenum");
// 	},
// 	saveMainhouse(data) {
// 		uni.setStorageSync("mainhouse", data);
// 		console.log("mainhouse", data)
// 	},
// 	getMainhouse() {
		
// 		const value = uni.getStorageSync("mainhouse");
// 		console.log("mainhouse", value)
// 		return value ? value : null;
// 	},
// 	removeMainhouse() {
// 		uni.removeStorageSync("mainhouse");
// 	},
// 	saveManid(data) {
// 		uni.setStorageSync("manid", data);
// 		console.log("manid", data)
// 	},
// 	getManid() {
		
// 		const value = uni.getStorageSync("manid");
// 		console.log("manid", value)
// 		return value ? value : null;
// 	},
// 	removeManid() {
// 		uni.removeStorageSync("manid");
// 	},
// 	saveManname(data) {
// 		uni.setStorageSync("manname", data);
// 		console.log("manname", data)
// 	},
// 	getManname() {
		
// 		const value = uni.getStorageSync("manname");
// 		console.log("manname", value)
// 		return value ? value : null;
// 	},
// 	removeManname() {
// 		uni.removeStorageSync("manname");
// 	},
// 	saveType(data) {
// 		uni.setStorageSync("type", data);
// 		console.log("type", data)
// 	},
// 	getType() {
		
// 		const value = uni.getStorageSync("type");
// 		console.log("type", value)
// 		return value ? value : null;
// 	},
// 	removeType() {
// 		uni.removeStorageSync("type");
// 	},
	
// 	saveCompanyName(data) {
// 		uni.setStorageSync("companyName", data);
// 		console.log("companyName", data)
// 	},
// 	getCompanyName() {
		
// 		const value = uni.getStorageSync("companyName");
// 		console.log("companyName", value)
// 		return value ? value : null;
// 	},
// 	removeCompanyName() {
// 		uni.removeStorageSync("companyName");
// 	},
	
// 	saveCompanyImage(data) {
// 		uni.setStorageSync("companyImage", data);
// 		console.log("companyImage", data)
// 	},
// 	getCompanyImage() {
		
// 		const value = uni.getStorageSync("companyImage");
// 		console.log("companyImage", value)
// 		return value ? value : null;
// 	},
// 	removeCompanyImage() {
// 		uni.removeStorageSync("companyImage");
// 	},
	
// 	saveEstId(data) {
// 		uni.setStorageSync("estId", data);
// 		console.log("estId", data)
// 	},
// 	getEstId() {
		
// 		const value = uni.getStorageSync("estId");
// 		console.log("estId", value)
// 		return value ? value : null;
// 	},
// 	removeEstId() {
// 		uni.removeStorageSync("estId");
// 	},
	
// 	saveDeptName(data) {
// 		uni.setStorageSync("deptName", data);
// 		console.log("deptName", data)
// 	},
// 	getDeptName() {
		
// 		const value = uni.getStorageSync("deptName");
// 		console.log("deptName", value)
// 		return value ? value : null;
// 	},
// 	removeDeptName() {
// 		uni.removeStorageSync("deptName");
// 	},
	
// 	saveDeptId(data) {
// 		uni.setStorageSync("deptId", data);
// 		console.log("deptId", data)
// 	},
// 	getDeptId() {
		
// 		const value = uni.getStorageSync("deptId");
// 		console.log("deptId", value)
// 		return value ? value : null;
// 	},
// 	removeDeptId() {
// 		uni.removeStorageSync("deptId");
// 	},
// 	saveSendList(data) {
// 		uni.setStorageSync("sendList", data);
// 		console.log("sendList", data)
// 	},
// 	getSendList() {
		
// 		const value = uni.getStorageSync("sendList");
// 		console.log("sendList", value)
// 		return value ? value : [];
// 	},
// 	removeSendList() {
// 		uni.removeStorageSync("sendList");
// 	},
// 	saveIdentityList(data) {
// 		uni.setStorageSync("identityList", data);
// 		console.log("identityList", data)
// 	},
// 	getIdentityList() {
		
// 		const value = uni.getStorageSync("identityList");
// 		console.log("identityList", value)
// 		return value ? value : [];
// 	},
// 	removeIdentityList() {
// 		uni.removeStorageSync("identityList");
// 	},
// 	getUserName() {
// 		return uni.getStorageSync("UserName");
// 	},
	
// 	setUserName(data) {
// 		return uni.setStorageSync("UserName", data);
// 	},
	
// 	saveBalance(data) {
// 		uni.setStorageSync("balance", data);
// 		console.log("balance", data)
// 	},
// 	getBalance() {
		
// 		const value = uni.getStorageSync("balance");
// 		console.log("balance", value)
// 		return value ? value : null;
// 	},
// 	removeBalance() {
// 		uni.removeStorageSync("balance");
// 	},
// 	saveTotalScore(data) {
// 		uni.setStorageSync("totalScore", data);
// 		console.log("totalScore", data)
// 	},
// 	getTotalScore() {
		
// 		const value = uni.getStorageSync("totalScore");
// 		console.log("totalScore", value)
// 		return value ? value : null;
// 	},
// 	removeTotalScore() {
// 		uni.removeStorageSync("totalScore");
// 	},
// 	saveMemberScore(data) {
// 		uni.setStorageSync("memberScore", data);
// 		console.log("memberScore", data)
// 	},
// 	getMemberScore() {
		
// 		const value = uni.getStorageSync("memberScore");
// 		console.log("memberScore", value)
// 		return value ? value : null;
// 	},
// 	removeMemberScore() {
// 		uni.removeStorageSync("memberScore");
// 	},

// };

// export function uploadMultipleFiles(parameter, signpics, authorToken) {
// 	const uploadPromises = signpics.map((filePath) => {
// 		return new Promise((resolve, reject) => {
// 			uni.uploadFile({
// 				url: uploadimg,
// 				filePath: filePath,
// 				name: "multipartFile",
// 				formData: {
// 					...parameter,
// 					authorToken: authorToken || App.getToken()
// 				},
// 				success: (res) => {
// 					if (res.statusCode === 200) {
// 						resolve(JSON.parse(res.data));
// 					} else {
// 						reject(new Error('Upload failed with status: ' + res.statusCode));
// 					}
// 				},
// 				fail: (err) => {
// 					reject(err);
// 				}
// 			});
// 		});
// 	});

// 	return Promise.all(uploadPromises);
// }