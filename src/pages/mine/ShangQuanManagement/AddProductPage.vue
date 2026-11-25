<template>
  <view class="page-container">
    <!-- ================= 1. 顶部自定义导航栏 ================= -->
    <u-navbar
      title="新增商品"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #ffffff; font-size: 17px; font-weight: 500;"
    >
      <template #left>
        <view class="nav-left" @click="handleBack">
          <u-icon name="arrow-left" size="20" color="#ffffff"></u-icon>
        </view>
      </template>
    </u-navbar>
    <!-- ================= 2. 主体表单内容区域 ================= -->
    <scroll-view scroll-y="true" class="form-scroll">
      <!-- 2.1 基础信息分组 -->
      <view class="section-group">
        <!-- 分组标题（带墨绿色指示小竖条） -->
        <view class="group-title">
          <text class="indicator-bar"></text>
          <text class="title-text">基础信息</text>
        </view>
        <!-- 表单项：*商品名称 -->
        <view class="form-item border-bottom">
          <view class="item-label">
            <text class="required">*</text>
            <text class="label-text">商品名称</text>
          </view>
          <view class="item-content">
            <input
              class="form-input"
              placeholder="限30字以内"
              placeholder-class="placeholder-style"
              maxlength="30"
              v-model="goodsName"
            />
          </view>
        </view>
        <!-- 表单项：*商品分类 -->
        <view class="form-item" @click="showCategorySheet = true">
          <view class="item-label">
            <text class="required">*</text>
            <text class="label-text">商品分类</text>
          </view>
          <view class="item-content right-arrow">
            <text class="select-val placeholder-style"
              :class="{ 'placeholder-style': !selectedCategoryName }"
            >{{ selectedCategoryName || '请选择商品分类' }}</text>
            <u-icon name="arrow-right" size="14" color="#999999"></u-icon>
          </view>
        </view>
      </view>
      <!-- 灰度隔离带 -->
      <view class="section-divider"></view>
      <!-- 2.2 添加商品规格单选项 -->
      <view class="section-group">
        <view class="form-item">
          <view class="item-label">
            <text class="label-text">添加商品规格</text>
          </view>
          <view class="radio-wrap">
            <!-- 选项：是 -->
            <view class="radio-option" @click="hasSpec = true">
              <view class="radio-circle" :class="{ checked: hasSpec }">
                <u-icon v-if="hasSpec" name="checkbox-mark" size="12" color="#ffffff"></u-icon>
              </view>
              <text class="radio-text">是</text>
            </view>
            <!-- 选项：否 -->
            <view class="radio-option" @click="hasSpec = false">
              <view class="radio-circle" :class="{ checked: !hasSpec }">
                <u-icon v-if="!hasSpec" name="checkbox-mark" size="12" color="#ffffff"></u-icon>
              </view>
              <text class="radio-text">否</text>
            </view>
          </view>
        </view>
      </view>
      <!-- 灰度隔离带 -->
      <view class="section-divider"></view>
      <!-- 2.3 价格、库存与上传图片卡片容器 -->
      <view class="section-group">
        <!-- 当“添加商品规格”选择“否”时，展示价格和库存输入项 -->
        <template v-if="!hasSpec">
          <!-- 表单项：*价格 -->
          <view class="form-item">
            <view class="item-label">
              <text class="required">*</text>
              <text class="label-text">价格</text>
            </view>
            <view class="item-content">
              <input
                class="form-input"
                type="digit"
                placeholder="请输入价格"
                placeholder-class="placeholder-style"
                v-model="specNoPrice"
              />
            </view>
          </view>
          <!-- 表单项：*库存 -->
          <view class="form-item">
            <view class="item-label">
              <text class="required">*</text>
              <text class="label-text">库存</text>
            </view>
            <view class="item-content">
              <input
                class="form-input"
                type="number"
                placeholder="请输入库存"
                placeholder-class="placeholder-style"
                v-model="specNoNums"
              />
            </view>
          </view>
        </template>

        <!-- 上传图片 -->
        <view class="upload-section">
          <view class="item-label">
            <text class="required">*</text>
            <text class="label-text">上传图片</text>
          </view>
          <!-- 虚线相机上传框 -->
          <view class="upload-dashed-box" @click="chooseClientPic">
           <block v-if="!previewArr.length">
            <u-icon  name="camera-fill" size="32" color="#999999"></u-icon>
         </block>
         <image v-else class="preview-img" :src="previewArr[0]" mode="aspectFill" ></image>
          <view v-if="previewArr.length" class="pic-item-close" @click.stop="delReportPic(0)">
           <image class="delete-icon" src="/static/mine/deleteImage.png" mode="aspectFit"></image>
          </view>
        </view>
        </view>
      </view>

      <!-- 2.4 商品规格入口条 (仅当“添加商品规格”选择“是”时展示) -->
      <template v-if="hasSpec">
        <!-- 灰度隔离带 -->
        <view class="section-divider"></view>
        <view class="section-group">
          <view class="form-item" @click="handleGoSpecManage">
            <view class="group-title inline-title">
              <text class="indicator-bar"></text>
              <text class="title-text">商品规格</text>
            </view>
            <view class="item-content right-arrow">
              <u-icon name="arrow-right" size="14" color="#999999"></u-icon>
            </view>
          </view>
        </view>
      </template>
      <!-- 灰度隔离带 -->
      <view class="section-divider"></view>
      <!-- 2.5 商品属性入口条 -->
      <view class="section-group">
        <view class="form-item" @click="handleGoProductAttr">
          <view class="group-title inline-title">
            <text class="indicator-bar"></text>
            <text class="title-text">商品属性</text>
          </view>
          <view class="item-content right-arrow">
            <u-icon name="arrow-right" size="14" color="#999999"></u-icon>
          </view>
        </view>
      </view>
      <!-- 灰度隔离带 -->
      <view class="section-divider"></view>
      <!-- 2.6 商品描述富文本输入区 -->
      <view class="section-group desc-section">
        <view class="desc-title">商品描述</view>
        <textarea
          class="desc-textarea"
          placeholder="介绍一下您的商品吧"
          placeholder-class="placeholder-style"
          maxlength="500"
          v-model="describe"
        />
      </view>
      <!-- 2.7 底部提交审核大按钮 -->
      <view class="submit-btn-box">
        <view class="submit-btn" @click="handleSubmit">提交审核</view>
      </view>
    </scroll-view>

    <!-- 商品分类选择弹窗（来自应急模块模版结构） -->
    <u-popup 
     @close="showCategorySheet = false"
     :show="showCategorySheet"
      mode="bottom" 
      bgColor="transparent"
    >
      <view class="custom-action-sheet">
        <view class="sheet-main-card">
          
          <block v-for="(item, index) in categoryList" :key="item.ID || index">
            <!-- 从第二项开始 -->
            <view class="sheet-divider" v-if="index > 0"></view>
            
            <view class="sheet-item" @click="handleSelectCategory(item)">
              {{ item.fName }}
            </view>
          </block>
          <!-- 兜底提示：若后台未配置分类，显示友好占位提示 -->
          <view class="sheet-item placeholder-style" v-if="categoryList.length === 0">
            暂无分类数据
          </view>
        </view>
        <view class="sheet-cancel-card" @click="showCategorySheet = false">
          取消
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { onUnload } from "@dcloudio/uni-app";
import { MineShangquanQuerySelfShopCatListForPage, MineShangquanAddGoods } from "@/api/mine";
import { storage, BaseURL } from "@/utils/storage";
import { userSubmitAidApply } from "@/api/work";

// 返回上一页
const handleBack = () => {
  uni.navigateBack();
};

// 存放从规格管理页同步过来的规格列表数据
const specGoodsList = ref<any[]>([]);

// 点击跳转到“商品规格管理”（携带已配置的规格列表以便回显）
const handleGoSpecManage = () => {
  const safeData = encodeURIComponent(JSON.stringify(specGoodsList.value));
  uni.navigateTo({
    url: `/pages/mine/ShangQuanManagement/SpecManagePage?initialList=${safeData}`
  });
};

// 存放录入好的商品属性（用于数据暂存与后续提交接口）
const attrName = ref<string>('');
const attrValue = ref<string>('');

// 点击跳转到“商品属性”页面（携带已录入的属性以便回显修改）
const handleGoProductAttr = () => {
  uni.navigateTo({
    url: `/pages/mine/ShangQuanManagement/ProductAttrPage?attrName=${encodeURIComponent(attrName.value)}&attrValue=${encodeURIComponent(attrValue.value)}`
  });
};

// 1. 存放商品名称
const goodsName = ref<string>('');
// 2. 存放无规格模式下的价格
const specNoPrice = ref<string>('');
// 3. 存放无规格模式下的库存数
const specNoNums = ref<string>('');
// 4. 存放商品描述
const describe = ref<string>('');

// 控制商品分类弹窗的显示与隐藏
const showCategorySheet = ref<boolean>(false);
// 存放当前选中的分类名字
const selectedCategoryName = ref<string>('');
// 存放所有分类数据的数组（从服务器拿到的真实列表）
const categoryList = ref<any[]>([]);
// 存放当前选中的分类 ID（用于最后提交商品接口）
const selectedCategoryId = ref<string>('');

const getCategoryData = () => {
  const userId = storage.getShopOwnerId() || storage.getUserId();
  const params = {
    userId: userId,
    id: '',
    page: '1',
    limit: '1000',
  };
  MineShangquanQuerySelfShopCatListForPage(params).then((res: any) => {
    if (res && res.result) {
      categoryList.value = res.result;
    }
  });
};

// 用户选中某一分类
const handleSelectCategory = (item: any) => {
  selectedCategoryName.value = item.fName;
  selectedCategoryId.value = item.ID;
  showCategorySheet.value = false;
};

onMounted(() => {
  getCategoryData();

  // 监听商品属性保存成功事件，更新本地暂存数据
  uni.$on('saveAttrSuccess', (data: any) => {
    attrName.value = data.attrName || '';
    attrValue.value = data.attrValue || '';
  });

  // 监听商品规格列表更新事件，更新本地规格数据
  uni.$on('updateSpecList', (list: any[]) => {
    specGoodsList.value = list || [];
  });
});

// 页面卸载时注销事件监听
onUnload(() => {
  uni.$off('saveAttrSuccess');
  uni.$off('updateSpecList');
});

// 是否添加商品规格
const hasSpec = ref<boolean>(true);

// 提交审核
const handleSubmit = () => {
  // 1. 基础表单非空校验
  if (!goodsName.value.trim()) {
    uni.showToast({ title: '请输入商品名称', icon: 'none' });
    return;
  }

  if (!selectedCategoryId.value) {
    uni.showToast({ title: '请选择商品分类', icon: 'none' });
    return;
  }

  // 2. 根据是否添加规格，分别进行必填校验
  if (hasSpec.value) {
    if (specGoodsList.value.length === 0) {
      uni.showToast({ title: '请至少添加一个商品规格', icon: 'none' });
      return;
    }
  } else {
    if (!specNoPrice.value.trim()) {
      uni.showToast({ title: '请输入商品价格', icon: 'none' });
      return;
    }
    if (!specNoNums.value.trim()) {
      uni.showToast({ title: '请输入商品库存', icon: 'none' });
      return;
    }
  }

  // 3. 获取商户与用户信息
  const userId = storage.getShopOwnerId() || storage.getUserId() || '';
  const userName = storage.getRealName?.() || storage.getUserName?.() || '';
  const shopName = storage.getCompanyName?.() || '';

  // 4. 构建规格商品列表 对应接口文档中 specGoodsListBean 组装
  const imgBeans = uploadBackFile.value.map((url:any)=>({imgSrc:url}))
  const specGoodsListBeans: any[] = [];

  if (hasSpec.value) {
    specGoodsList.value.forEach((item: any) => {
      const paramValues = (item.tags || []).map((tag: any) => ({
        pId: tag.groupId || tag.groupName,
        pname: tag.groupName,
        id: tag.tagId,
        name: tag.tagName,
        value: tag.tagName
      }));

      specGoodsListBeans.push({
        deliver_fee: '0',
        goodsImgs: imgBeans,
        name: goodsName.value,
        fengZhuang: item.stock,
        price: item.price,
        paramValue: paramValues,
        attrs: attrName.value,
        attrSearch: attrValue.value
      });
    });
  } else {
    specGoodsListBeans.push({
      deliver_fee: '0',
      goodsImgs: imgBeans,
      name: goodsName.value,
      fengZhuang: specNoNums.value,
      price: specNoPrice.value,
      paramValue: [],
      attrs: attrName.value,
      attrSearch: attrValue.value
    });
  }

  // 5. 文档组装 addGoodsParam 对象
  const addGoodsParam = {
    catalogCode: selectedCategoryId.value,
    catalogName: selectedCategoryName.value,
    detailsContent: describe.value,
    name: goodsName.value,
    goodsPublicInfoImg: imgBeans,
    userName: userName,
    providerName: shopName,
    userId: userId,
    providerCode: userId,
    specGoodsList: specGoodsListBeans,
    goodsPublicInfoSkuSpecs: [],
    goodsPublicInfoParam: []
  };

  // 6. 格式包装为 paraMap
  const params = {
    paraMap: JSON.stringify(addGoodsParam)
  };

  uni.showLoading({ title: '正在提交...', mask: true });

  // 7. 发起网络请求
  MineShangquanAddGoods(params)
    .then((res: any) => {
      uni.hideLoading();
      uni.showToast({
        title: '提交成功',
        icon: 'success'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1000);
    })
    .catch((err: any) => {
      uni.hideLoading();
      uni.showToast({
        title: err?.message || '提交失败',
        icon: 'none'
      });
    });
};


//存放用于界面展示的图片路径（界面回显用）
const previewArr =ref<string[]>([])
// 存放服务器返回的真实网络图片地址（提交给后台接口用）
const uploadBackFile = ref<string[]>([]);

// 点击虚线框：调起手机相册或相机选图
const chooseClientPic = () => {
  uni.chooseImage({
    count:1,
    sizeType:['original','compressed'],
    sourceType:['album', 'camera'],
    //选择成功之后执行的函数
    success(res: any) {
        previewArr.value = [res.tempFiles[0].path]
        uploadProductImage(res.tempFiles[0].path)
    }
  })
}


// 点击右上角叉号：删除已选中的图片
const delReportPic = (index:number)=>{
       previewArr.value.splice(index,1)
       uploadBackFile.value.splice(index,1)
}

// 将本地选中的商品临时图片，真正上传到后台服务器
const uploadProductImage = (filePathgo: string) => {
   //  获取登录令牌
   const token = storage.getToken();
  
   uni.showLoading({
    title: '上传中',
    mask: true
   })

   //调用上传接口
  uni.uploadFile({
    url:BaseURL+'AppWorkOrder/addUploadIms',
         filePath:filePathgo,
         name:'multipartFile',
         formData:{type:'jpg'},
        header:token?{Authorization : token}:{},
       
        //成功回调
        success:(uploadRes: any)=>{
          let result:any={}
          try{
                 result = JSON.parse(uploadRes.data||'{}')
          }
          catch(err){
            uni.showToast({title:'服务器内部错误',icon:'none'})
            return
          }
          const remoteUrl= result.data|| result.url||''
          if( uploadRes.statusCode===200&&remoteUrl){
             uploadBackFile.value= [remoteUrl]
              uni.showToast({ title: '上传成功', icon: 'success' });
          }else{
              uni.showToast({ title: result.msg || result.message || '上传失败', icon: 'none' });
          }
        },
        fail:(err:any)=>{
              uni.showToast({ title: '上传失败', icon: 'none' });
        },
        complete:()=>{
          uni.hideLoading();
        }
  })

}
</script>
<style lang="scss" scoped>
/* 整个页面底色 */
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f4f5f7;
  overflow: hidden;
}
/* 导航栏左侧返回 */
.nav-left {
  display: flex;
  align-items: center;
  padding-left: 8px;
}
/* 滚动区域 */
.form-scroll {
  flex: 1;
  height: 0;
}
/* 卡片分组白底容器 */
.section-group {
  background-color: #ffffff;
}
/* 浅灰隔离带 */
.section-divider {
  height: 10px;
  background-color: #f4f5f7;
}
/* 分组标题（如：基础信息、商品规格、商品属性） */
.group-title {
  display: flex;
  align-items: center;
  padding: 14px 16px 10px 16px;
  .indicator-bar {
    width: 3px;
    height: 14px;
    background-color: #2A9595;
    border-radius: 2px;
    margin-right: 6px;
  }
  .title-text {
    font-size: 15px;
    color: #2A9595;
    font-weight: 500;
  }
  &.inline-title {
    padding: 0;
  }
}
/* 标准表单行 */
.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  min-height: 52px;
  box-sizing: border-box;
  &.border-bottom {
    border-bottom: 1px solid #f0f0f0;
  }
  .item-label {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #333333;
    .required {
      color: #ff4d4f;
      margin-right: 3px;
      font-size: 15px;
    }
  }
  .item-content {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 20px;
    .form-input {
      width: 100%;
      text-align: right;
      font-size: 15px;
      color: #333333;
    }
    &.right-arrow {
      gap: 4px;
    }
    .select-val {
      font-size: 15px;
      color: #333333;
    }
  }
}
/* 统一输入框占位符提示色 */
.placeholder-style {
  color: #999999;
  font-size: 15px;
}
/* 是否添加规格单选框 */
.radio-wrap {
  display: flex;
  align-items: center;
  gap: 28px;
  .radio-option {
    display: flex;
    align-items: center;
    gap: 8px;
    .radio-circle {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 1px solid #c0c4cc;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      &.checked {
        background-color: #2A9595;
        border-color: #2A9595;
      }
    }
    .radio-text {
      font-size: 15px;
      color: #333333;
    }
  }
}
/* 上传图片区域 */
.upload-section {
  padding: 16px;
  .item-label {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #333333;
    .required {
      color: #ff4d4f;
      margin-right: 3px;
      font-size: 15px;
    }
  }
  .upload-dashed-box {
    width: 80px;
    height: 80px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    background-color: #ffffff;
  }
}
/* 商品描述输入区 */
.desc-section {
  padding: 16px;
  .desc-title {
    font-size: 15px;
    color: #333333;
    margin-bottom: 12px;
  }
  .desc-textarea {
    width: 100%;
    min-height: 120px;
    font-size: 14px;
    color: #333333;
    line-height: 20px;
    box-sizing: border-box;
  }
}
/* 底部提交按钮区域 */
.submit-btn-box {
  padding: 24px 16px 40px 16px;
  padding-bottom: calc(40px + constant(safe-area-inset-bottom));
  padding-bottom: calc(40px + env(safe-area-inset-bottom));

  .submit-btn {
    width: 100%;
    height: 46px;
    background-color: #2A9595;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
  }
}

/* 商品分类动作面板 */
.custom-action-sheet {
  padding: 0 10px 15px 10px;
}

.sheet-main-card {
  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 10px;
}

.sheet-title {
  text-align: center;
  font-size: 15px;
  color: #999999;
  padding: 16px 0;
}

.sheet-divider {
  width: 100%;
  height: 1px;
  background-color: #F0F2F5;
}

.sheet-item {
  text-align: center;
  font-size: 17px;
  color: #333333;
  padding: 16px 0;
  
  &:active {
    background-color: #f7f7f7;
  }
}

.sheet-cancel-card {
  background-color: #ffffff;
  border-radius: 12px;
  text-align: center;
  font-size: 17px;
  font-weight: 500;
  color: #333333;
  padding: 15px 0;
  
  &:active {
    background-color: #f7f7f7;
  }
}


:deep(.u-popup) {
  flex: none !important;
}

 .upload-dashed-box {
    position: relative; 
    width: 80px;
    height: 80px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 14px;
    background-color: #ffffff;
    /* 选图后的图片充满整个正方形框框 */
    .preview-img {
      width: 100%;
      height: 100%;
      border-radius: 4px;
    }
    /* 右上角小叉叉圆圈 */
    .pic-item-close {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 20px;
      height: 20px;
      background-color: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      .delete-icon {
        width: 18px;
        height: 18px;
      }
    }
  }

</style>