<template>
  <view class="container">
      <input class="nameInput" v-model="loginForm.userName" placeholder="请输入账号" />
	  <view class="divider-line"></view>
	  <view class="passView">
		<input class="passInput" :type="inputType" v-model="loginForm.userPassword" placeholder="请输入账号" />
		<u-icon  top="10"
		  :name="inputType === 'password' ? 'eye' : 'eye-off'" 
		  color="#4C9393" 
		  size="28"
		  @click="handleChangeType"
		></u-icon>
	  </view>
	  <view class="divider-line"></view>
	  <view class="buttonView" @click="handleLogin">登 录</view>
      <u-row customStyle="margin-top: 16px;margin-left:15px">
        <u-col span="7">
          <view class="bg-purple">
            <u-checkbox-group v-model="checkboxValue1" placement="column" @change="checkboxChange">
              <u-checkbox 
                v-for="(item, index) in hidename" 
                :key="index"
                labelColor="#000000" 
                activeColor="#2A9595" 
                :label="item.name" 
                :name="item.name" 
                :disabled="item.disabled"
              >
              </u-checkbox>
            </u-checkbox-group>
          </view>
        </u-col>
        <u-col span="2.6">
          <u-text text="忘记密码 |" @click="forgetpass"></u-text>
        </u-col>
        <u-col span="2.6">
          <u-text text="快速注册" color="#4C9393" @click="quickregister"></u-text>
        </u-col>
      </u-row>
    </view> 
</template>

<script setup lang="ts">

import { ref, reactive } from 'vue';
import { qunyuanLogin } from '@/api/integral'; // 请确保路径正确
import rsaEncrypt from '@/utils/encryp';   // 引入之前转换的 TS 加密工具
import { storage } from '@/utils/storage'; // 引入之前转换的 TS storage 工具
import { genTestUserSig } from '@/uni_modules/tuikit-atomic-x/debug/GenerateTestUserSig'; 

import { useLoginState } from '@/uni_modules/tuikit-atomic-x/state/LoginState';
const { login, setSelfInfo } = useLoginState();
// ================= 1. 类型定义 =================
interface LoginForm {
  userName: string;
  userPassword: string;
  loginType: string;
}

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

// ================= 2. 响应式数据 =================
const uForm = ref(); // 表单 ref

const sdkAppId = 1600138376; // SDKAppID
const userId = ref(''); // userID
const secretKey = '02e16e75016c580a5cd06eea6d8192457897596513604302337039b1ffed9ace'; // SecretKey

const loginForm = reactive<LoginForm>({
  userName: '15689288001',
  userPassword: '12345678',
  loginType: '1',
});

const rules = reactive({
  userName: {
    type: 'string',
    required: true,
    message: '请填写账号',
    trigger: ['blur', 'change'],
  },
  userPassword: {
    type: 'string',
    required: true,
    message: '请填写密码',
    trigger: ['blur', 'change'],
  },
});

const inputType = ref<'password' | 'text'>('password');
const hidename = ref([{ name: '记住密码', disabled: false }]);
const checkboxValue1 = ref<string[]>([]);

// ================= 3. 生命周期 =================
// Vue3 中 setup 顶层代码相当于 created
const init = () => {
  // 页面初始化逻辑
};
init();

// ================= 4. 方法定义 =================

// 切换密码显示隐藏
const handleChangeType = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};

// 登录处理
const handleLogin = async () => {
  // 基础校验
  if (!loginForm.userName) {
    return uni.showToast({ title: '请输入账号', icon: 'none' });
  }
  if (!loginForm.userPassword) {
    return uni.showToast({ title: '请输入密码', icon: 'none' });
  }

  // 如果需要启用 uView 的表单校验，可以解开下面的注释
  // try {
  //   await uForm.value.validate();
  // } catch (error) {
  //   return; // 校验失败会抛出异常，直接 return
  // }

  try {
    // 1. 加密数据
    const jsonString = JSON.stringify(loginForm);
    const encrypted = rsaEncrypt.encrypt(jsonString);
    
    if (!encrypted) {
      return uni.showToast({ title: '数据加密失败', icon: 'none' });
    }

    // 2. 调用登录接口
    const res = await qunyuanLogin({ loginParam: encrypted }) as unknown as LoginResponse;
    const result = res.result;
   
    if (!result) {
      return uni.showToast({ title: '登录失败，无返回数据', icon: 'none' });
    }else{
      console.log('登录成功:', result);
	  userId.value=result.userId;
	  // tklogin(result.userId, {
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

  } catch (error) {
    console.error('登录异常:', error);
    uni.showToast({ title: '登录失败，请重试', icon: 'none' });
  }
};

/**
 * 辅助方法：动态调用 storage.saveXxx
 * 利用之前封装的 Proxy 对象，自动匹配 save 方法
 */
const callStorageSave = (key: string, value: any) => {
  // 将首字母大写，拼接 save 前缀，例如: token -> saveToken
  const methodName = `save${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof typeof storage;
  if (typeof storage[methodName] === 'function') {
    (storage[methodName] as Function)(value);
  }
};

// 获取验证码 (原代码中未使用，保留并转为 TS)
const getVerificationCode = () => {
  // let FAPTimestamp = Number(new Date().getTime());
  // let data = { FAPView: "STREAM", FAPTimestamp };
  // getVerificationCodeImg(data).then((res) => console.log(res));
};

// 快速注册
const quickregister = () => {
  uni.navigateTo({ url: '/pages/login/quickRegister' });
};

// 忘记密码
const forgetpass = () => {
  uni.navigateTo({ url: '/pages/login/forgetPassword' });
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

// 记住密码复选框变化
const checkboxChange = (n: string[]) => {
  if (n.length > 0) {
    console.log('选中记住密码');
  } else {
    console.log('未选中记住密码');
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 80%;
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  .nameInput{
	  
	  margin-top: 200px;
	  margin-left: 30px;
	  width: 345px;
	  font-size: 16px;
	  height: 40px;
  }
  .divider-line {
    height: 1px; /* 线的高度 */
    background-color: #e5e5e5; /* 灰色，可根据设计稿调整，如 #dcdfe6 */
    width: 95%; /* 宽度撑满 */
    
    /* 如果希望线条左右有一点缩进（不顶格），可以加上 margin */
    margin: 10px 10px 10px 10px; 
  }
  .passView{
	  display: flex;
	  flex-direction: row;
	  width: 100%;
  }
  .passInput{
	  margin-top: 20px;
	  margin-left: 30px;
	  width: 300px;
	  font-size: 16px;
	  height: 40px;
  }
}

.bg-purple {
  padding-top: 8px;
}
 .buttonView{
              
	 margin-top: 30px;
	 background-color: #2A9595;
	 border-radius: 5px;
	 color: white;
	 font-size: 14px;
	 margin-left: 5%; 
	 display: flex;
	 justify-content: center; /* 水平居中 */
	 align-items: center;     /* 垂直居中 */
	 height: 40px;           /* 需要设置高度 */
	 width: 90%;             /* 需要设置宽度 */
}

</style>
