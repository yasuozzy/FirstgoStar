<template>
  <view class="page"></view>
</template>

<script setup lang="ts">
import { onLoad } from "@dcloudio/uni-app";
import { storage } from '@/utils/storage'; 
import { freshToken } from "@/api/home";
import { onMounted, reactive, ref } from "vue";
import { genTestUserSig } from '@/uni_modules/tuikit-atomic-x/debug/GenerateTestUserSig'; 
import { useLoginState } from '@/uni_modules/tuikit-atomic-x/state/LoginState';
const { login, setSelfInfo } = useLoginState();
const sdkAppId = 1600138376; // SDKAppID
const userId = ref(''); // userID
const secretKey = '02e16e75016c580a5cd06eea6d8192457897596513604302337039b1ffed9ace'; // SecretKey
interface HouseMap {
  address?: string;
  bldgid?: string;
  bldgname?: string;
  hcpid?: string;
  hseid?: string;
  hsename?: string;
  hsenum?: string;
  mainhouse?: string;
  manid?: string;
  manname?: string;
  type?: string;
}

interface UserInfo {
  token: string;
  userId: string;
  realType: string;
  platId: string;
  hostNo: string;
  cstType: string;
  avatar: string;
  nickName: string;
  realName: string;
  phone: string;
  sex: string;
  birthday: string;
  finLoginName: string;
  finSysSessionId: string;
  usersig: string;
  deliveryId: string;
  deliveryName: string;
  isWhetherDelivery: string;
  deliveryManagerId: string;
  deliveryTakeOrder: string;
  deliveryAuditStatus: string;
  temporayId: string;
  temporayName: string;
  isWhetherTemporay: string;
  temporayManagerId: string;
  temporayTakeOrder: string;
  temporayAuditStatus: string;
  shopOwnerId: string;
  houseMap?: HouseMap;
  sendList?: any[];
  identityList?: any[];
  [key: string]: any; // 允许其他未知字段
}

interface LoginResponse {
  result: UserInfo;
}

function fresh() {
	let param={
    authorToken: storage.getToken(),
	loginType:"1"
  };
  console.log(param);
  freshToken(param).then((res) => {
    console.log(res);
		if (res.success) {
		   const result = res.result;
	   
		if (!result) {
		  return uni.showToast({ title: '登录失败，无返回数据', icon: 'none' });
		  
		}else{
		  console.log('登录成功:', result);
		  userId.value=result.userId;
		//   tklogin(result.userId, {
		//   realName: result.realName,
		//   avatar: result.avatar
		// });
		  uni.setStorageSync("App-Token", result.token)
		}
		
		// 3. 批量存储用户信息 (利用 TS 和 Proxy 特性，将原本 50 行代码优化为循环遍历)
		for (const [key, value] of Object.entries(result)) {
		  if (value === undefined || value === null) continue;

		  // 处理 houseMap 嵌套对象
		  if (key === 'houseMap' && typeof value === 'object') {
			for (const [hKey, hValue] of Object.entries(value as HouseMap)) {
			  callStorageSave(hKey, hValue);
			}
		  } 
		  // 处理数组类型
		  else if ((key === 'sendList' || key === 'identityList') && Array.isArray(value)) {
			if (value.length > 0) callStorageSave(key, value);
		  } 
		  // 处理普通字段
		  else {
			callStorageSave(key, value);
		  }
		}

		// 强制保存 loginType
		storage.saveLoginType(1);

		// 4. 跳转首页
	   uni.switchTab({
		 url: '/pages/home/newHome',
	   });
		  return;
		}else{
		uni.reLaunch({
		  url: "/pages/login/index",
		});
	} 
    uni.showToast({
      title: res.message,
      icon: "none",
    });
  });
}
const callStorageSave = (key: string, value: any) => {
  // 将首字母大写，拼接 save 前缀，例如: token -> saveToken
  const methodName = `save${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof typeof storage;
  if (typeof storage[methodName] === 'function') {
    (storage[methodName] as Function)(value);
  }
};

const tklogin = async (userId: string, profile: Pick<UserInfo, 'realName' | 'avatar'>) => {
    try {
        const userSigResult = genTestUserSig({
            SDKAppID: sdkAppId,
            userID: userId,
            secretKey: secretKey
        });
        const userSig = userSigResult.userSig;
        console.log('腾讯登录参数:', {
            sdkAppID: sdkAppId,
            userID: userId,
            userSigLength: userSig?.length
        });
        login({
            sdkAppID: sdkAppId,
            userID: userId,
            userSig: userSig,
            success: () => {
                console.log('腾讯服务登录成功');
                setSelfInfo({
                  userProfile: {
                    userID: userId,
                    nickname: profile.realName || userId,
                    avatarURL: profile.avatar || ''
                  },
                  success: () => {},
                  fail: (code: number, msg: string) => {
                    console.error('腾讯服务资料设置失败:', code, msg);
                  }
                });
                uni.showToast({
                    title: '登录成功',
                    icon: 'none'
                });

            },
            fail: (code: number, msg: string) => {
                console.error(
                    '腾讯服务登录失败:',
                    code,
                    msg
                );
                uni.showToast({
                    title: msg || `腾讯登录失败(${code})`,
                    icon: 'none'
                });
            }
        });
    } catch (error) {
        console.error('生成 UserSig 或腾讯登录失败:', error);
        uni.showToast({
            title: '腾讯服务登录失败',
            icon: 'none'
        });
    }
};

onLoad(() => {
  if (storage.getToken()) {
   
    fresh();
    return;
  }

  uni.reLaunch({
    url: "/pages/login/index",
  });
});
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  background-image: url("/static/splash.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}
</style>
