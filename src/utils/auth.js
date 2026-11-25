const TokenKey = 'App-Token'

// 获取Token
export function getToken() {
	return uni.getStorageSync(TokenKey)
}

// 设置token
export function setToken(token) {
	return uni.setStorageSync(TokenKey, token)
}

// 移除Token
export function removeToken() {
	return uni.removeStorageSync(TokenKey)
}

export const storage = {
	saveLoginName(data) {
		uni.setStorageSync("FinUserName", data);
		console.log("ssssss", data)
	},
	getLoginName() {
		const value = uni.getStorageSync("FinUserName")
		console.log("ssssss", value)
		return value ? value : null;
	},
	removeLoginName() {
		uni.removeStorageSync("FinUserName");
	},

	saveBookName(data) {
		uni.setStorageSync("BookName", data);
		console.log("ssssss", data)
	},
	getBookName() {
		const value = uni.getStorageSync("BookName")
		console.log("ssssss", value)
		return value ? value : null;
	},
	removeBookName() {
		uni.removeStorageSync("BookName");
	},

	saveBookId(data) {
		uni.setStorageSync("BookId", data);
		console.log("ssssss", data)
	},
	getBookId() {
		const value = uni.getStorageSync("BookId")
		console.log("ssssss", value)
		return value ? value : null;
	},
	removeBookId() {
		uni.removeStorageSync("BookId");
	},

	saveCompany(data) {
		uni.setStorageSync("Company", data);
		console.log("ssssss", data)
	},
	getCompany() {
		const value = uni.getStorageSync("Company")
		console.log("ssssss", value)
		return value ? value : null;
	},
	removeCompany() {
		uni.removeStorageSync("Company");
	},

	saveExSearchHistory(data) {
		uni.setStorageSync("ExSearchHistory", data);
		console.log("ssssss", data)
	},
	getExSearchHistory() {
		const value = uni.getStorageSync("ExSearchHistory")
		console.log("ssssss", value)
		return value ? value : null;
	},
	removeExSearchHistory() {
		uni.removeStorageSync("ExSearchHistory");
	},

	saveReSearchHistory(data) {
		uni.setStorageSync("ReSearchHistory", data);
		console.log("ssssss", data)
	},
	getReSearchHistory() {
		const value = uni.getStorageSync("ReSearchHistory")
		console.log("ssssss", value)
		return value ? value : null;
	},
	removeReSearchHistory() {
		uni.removeStorageSync("ReSearchHistory");
	},
};
