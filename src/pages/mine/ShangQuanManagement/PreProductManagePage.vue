<template>
  <view class="page-wrapper">
    <!-- ================= 1. 顶部自定义导航栏 ================= -->
    <u-navbar
      title="商品预付管理"
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
      <template #right>
        <view class="nav-right">
          <text class="nav-btn" @click="handleManage">{{ isManageMode ? '完成' : '管理' }}</text>
          <text class="nav-btn" @click="handleAddProduct">添加商品</text>
        </view>
      </template>
    </u-navbar>

    <!-- ================= 2. 主体左右分栏布局 ================= -->
    <view class="main-body">
      <!--  左侧分类侧边栏 -->
      <scroll-view class="sidebar" scroll-y="true">
        <view
          v-for="(item, index) in categoryList"
          :key="index"
          class="category-item"
          :class="{ active: currentCategoryIndex === index }"
          @click="handleCategoryClic(index)"
        >
          <!-- 只有当前激活项才显示左侧指示线 -->
          <view class="active-line" v-if="currentCategoryIndex === index"></view>
          <text class="category-name">{{ item.fName}}</text>
        </view>
      </scroll-view>

      <!--  右侧商品列表内容区 -->
      <scroll-view class="product-container" scroll-y="true">
        <!-- 当商品列表有数据时，动态循环渲染 -->
        <view class="product-list" v-if="goodsList && goodsList.length > 0">
          <view
            class="product-card"
            v-for="(item, index) in goodsList"
            :key="index"
          >
            <view class="product-main">
              <!-- 商品主图：有展示，无图片使用默认占位图 -->
              <image
                class="product-cover"
              :src="item.img ? (item.img.startsWith('http') ? item.img : BaseImgURL + item.img) : '/static/splash.png'"

              ></image>
              <!-- 商品信息 -->
              <view class="product-info">
                <view class="product-title">{{ item.goodsName || item.name || item.title || '商品名称' }}</view>
                <view class="product-meta">库存：{{ item.fengZhuang ?? item.stock ?? item.nums ?? 0 }}</view>
                <view class="product-meta">销量：{{ item.paySum ?? item.sales ?? item.saleNum ?? 0 }}</view>
                <view class="product-meta">个: {{ item.unit || 1 }}</view>
                <view class="product-price">¥{{ item.price || '0.00' }}</view>
              </view>
            </view>
            <!-- 底部操作按钮 -->
            <view class="product-actions">
              <view class="btn-outline" @click="handleEdit(item)">编辑</view>
              <view class="btn-outline" @click="handleToggleState(item)">{{ item.state == 3 ? '上架' : '下架' }}</view>
              <view class="btn-outline btn-delete" v-if="isManageMode" @click="handleDelete(item)">删除</view>
            </view>
          </view>

          <!-- 底部没有更多数据提示 -->
          <view class="no-more">没有更多数据</view>
        </view>

        <!-- 当分类下暂无商品数据时，显示空白兜底提示 -->
        <view class="empty-wrap" v-else>
          <view class="no-more">暂无商品数据</view>
        </view>
      </scroll-view>
    </view>

    <!-- ================= 3.商品编辑弹窗 ================= -->
    <view class="edit-modal-mask" v-if="showEditModal" @click="closeEditModal">
      <view class="edit-modal-box" @click.stop>
        <view class="modal-title">商品编辑</view>
        <view class="modal-body">
          <input
            class="modal-input"
            type="digit"
            v-model="editForm.price"
            placeholder="请输入价格"
          />
          <input
            class="modal-input"
            type="digit"
            v-model="editForm.fengzhuang"
            placeholder="请输入库存数量"
          />
        </view>
        <view class="modal-footer">
          <view class="modal-btn btn-cancel" @click="closeEditModal">取消</view>
          <view class="btn-divider"></view>
          <view class="modal-btn btn-confirm" @click="submitEdit">确定</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { 
    MineAdvancePayQuerySelfShopCatList, 
    MineAdvancePayQueryGoodsListForPage, 
    MineAdvancePayUpGoods,
    MineAdvancePayDelGoods
  } from '@/api/mine'; 
  import {storage , BaseImgURL} from '@/utils/storage';


  const handleBack = ()=>{
    uni.navigateBack()
  }

  // 管理模式切换（点击“管理”进入删除管理状态）
  const isManageMode = ref(false);
  const handleManage = () => {
    isManageMode.value = !isManageMode.value;
  }

  // 点击顶部“添加商品”
const handleAddProduct = () => {
  uni.navigateTo({
    url: '/pages/mine/ShangQuanManagement/AddPreProductPage'
  });
}

  // 删除商品逻辑 
  const handleDelete = (item: any) => {
    uni.showModal({
      title: '提示',
      content: `确定要删除商品【${item.goodsName || item.name || ''}】吗？`,
      confirmColor: '#E53935',
      success: (res) => {
        if (res.confirm) {
          const params = {
            id: item.id || item.ID,
            publicId: item.pubkicId || item.pubkicid || item.publicId || ''
          };
          uni.showLoading({ title: '正在删除...' });
          MineAdvancePayDelGoods(params).then(() => {
            uni.hideLoading();
            uni.showToast({ title: '删除成功', icon: 'success' });
            const currentCatId = categoryList.value[currentCategoryIndex.value]?.catId || categoryList.value[currentCategoryIndex.value]?.id || categoryList.value[currentCategoryIndex.value]?.ID;
            if (currentCatId) {
              getGoodsData(currentCatId);
            }
          }).catch(() => {
            uni.hideLoading();
            uni.showToast({ title: '删除失败', icon: 'none' });
          });
        }
      }
    });
  }

  //记录当前选中的分类下标
const currentCategoryIndex = ref(0);
const categoryList = ref<any[]>([]);
//右侧的商品列表记录
const goodsList = ref<any[]>([]);

onMounted(()=>{
	getCategoryData()
})
//定义获取左侧分类
const getCategoryData = ()=>{
	const userId = storage.getShopOwnerId() || storage.getUserId();
	const params ={
		userId:userId,
		id: "",
		page: "1",
		limit: "1000"
	}

	//发给服务器，并等待结果
	MineAdvancePayQuerySelfShopCatList(params)
	.then((res:any)=>{
		if(res && res.result){
			categoryList.value = res.result

			if(categoryList.value.length > 0){
				const firstCatId = categoryList.value[0].catId || categoryList.value[0].id || categoryList.value[0].ID;
				getGoodsData(firstCatId);
			}
		}
	})
}


//获取右侧商品列表
const getGoodsData = (catId:string)=>{
  const userId = storage.getShopOwnerId()||storage.getUserId();
	const params = {
	  userId: userId,
	  state: "5", 
    applyContent: "",    
    catalogCode: catId,  
    page: "1",
    limit: "20"
  }
 
  MineAdvancePayQueryGoodsListForPage(params)
  .then((res:any)=>{
    if(res && res.result){
      goodsList.value = res.result;
    }
  })
}

//点击左侧分类时触发的函数
const handleCategoryClic = (index: number) => {
	currentCategoryIndex.value = index;
	const catId = categoryList.value[index].catId || categoryList.value[index].id || categoryList.value[index].ID;
	getGoodsData(catId);
};

// 编辑弹窗相关逻辑
const showEditModal = ref(false);
const currentEditItem = ref<any>(null);
const editForm = ref({
  price: '',
  fengzhuang: ''
});

// 点击“编辑”按钮打开弹窗并回显数据
const handleEdit = (item: any) => {
  currentEditItem.value = item;
  editForm.value = {
    price: item.price !== undefined ? String(item.price) : '',
    fengzhuang: item.fengZhuang !== undefined ? String(item.fengZhuang) : (item.stock !== undefined ? String(item.stock) : '')
  };
  showEditModal.value = true;
};

// 关闭弹窗
const closeEditModal = () => {
  showEditModal.value = false;
  currentEditItem.value = null;
};

// 提交编辑保存
const submitEdit = () => {
  if (!currentEditItem.value) return;
  if (!editForm.value.price) {
    uni.showToast({ title: '请输入价格', icon: 'none' });
    return;
  }
  if (!editForm.value.fengzhuang) {
    uni.showToast({ title: '请输入库存数量', icon: 'none' });
    return;
  }

  const params = {
    id: currentEditItem.value.id || currentEditItem.value.ID,
    price: editForm.value.price,
    fengzhuang: editForm.value.fengzhuang,
    state: "",
    publicId: currentEditItem.value.pubkicId || currentEditItem.value.publicId || currentEditItem.value.pubkicid || ''
  };

  uni.showLoading({ title: '保存中...' });
  MineAdvancePayUpGoods(params).then((res: any) => {
    uni.hideLoading();
    uni.showToast({ title: '修改成功', icon: 'success' });
    closeEditModal();
    const currentCatId = categoryList.value[currentCategoryIndex.value]?.catId || categoryList.value[currentCategoryIndex.value]?.id || categoryList.value[currentCategoryIndex.value]?.ID;
    if (currentCatId) {
      getGoodsData(currentCatId);
    }
  }).catch(() => {
    uni.hideLoading();
    uni.showToast({ title: '保存失败', icon: 'none' });
  });
};

// 商品上下架逻辑 
const handleToggleState = (item: any) => {
  const isOffShelf = item.state == 3;
  const targetState = isOffShelf ? '2' : '3';
  const params = {
    id: item.id || item.ID,
    price: "",
    fengzhuang: "",
    state: targetState,
    publicId: item.pubkicId || item.publicId || item.pubkicid || ''
  };

  uni.showLoading({ title: isOffShelf ? '正在上架...' : '正在下架...' });
  MineAdvancePayUpGoods(params).then((res: any) => {
    uni.hideLoading();
    uni.showToast({ title: isOffShelf ? '商品已上架' : '商品已下架', icon: 'success' });
    const currentCatId = categoryList.value[currentCategoryIndex.value]?.catId || categoryList.value[currentCategoryIndex.value]?.id || categoryList.value[currentCategoryIndex.value]?.ID;
    if (currentCatId) {
      getGoodsData(currentCatId);
    }
  }).catch(() => {
    uni.hideLoading();
    uni.showToast({ title: '操作失败', icon: 'none' });
  });
};


</script>

<style lang="scss" scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}

/* 导航栏插槽 */
.nav-left {
  display: flex;
  align-items: center;
  padding-left: 8px;
}
.nav-right {
  display: flex;
  align-items: center;
  padding-right: 12px;
  gap: 12px;

  .nav-btn {
    font-size: 15px;
    color: #ffffff;
    font-weight: 400;
  }
}

/* 主体左右布局 */
.main-body {
  display: flex;
  flex-direction: row;
  flex: 1;
  height: calc(100vh - var(--status-bar-height) - 44px);
  overflow: hidden;
}

/* 左侧分类栏 */
.sidebar {
  width: 90px;
  height: 100%;
  background-color: #EEEEEE;
  flex-shrink: 0;

  .category-item {
    position: relative;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EEEEEE;

    .category-name {
      font-size: 15px;
      color: #666666;
      text-align: center;
    }

    /* 激活态高亮 */
    &.active {
      background-color: #FFFFFF;

      .category-name {
        color: #333333;
        font-weight: 500;
      }

      .active-line {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 22px;
        background-color: #2A9595;
        border-radius: 0 2px 2px 0;
      }
    }
  }
}

/* 右侧商品内容区 */
.product-container {
  flex: 1;
  height: 100%;
  background-color: #FFFFFF;
  box-sizing: border-box;
}

.product-list {
  padding: 0 14px;
}

/* 单个商品卡片 */
.product-card {
  padding: 14px 0 16px 0;
  border-bottom: 1px solid #F0F0F0;

  .product-main {
    display: flex;
    flex-direction: row;

    .product-cover {
      width: 92px;
      height: 92px;
      border-radius: 6px;
      background-color: #f7f7f7;
      flex-shrink: 0;
    }

    .product-info {
      margin-left: 12px;
      flex: 1;
      display: flex;
      flex-direction: column;

      .product-title {
        font-size: 15px;
        font-weight: 500;
        color: #333333;
        line-height: 20px;
      }

      .product-meta {
        font-size: 12px;
        color: #888888;
        margin-top: 3px;
      }

      .product-price {
        font-size: 16px;
        font-weight: bold;
        color: #E53935;
        margin-top: 4px;
      }
    }
  }

  /* 操作按钮区域 */
  .product-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 8px;

    .btn-outline {
      width: 52px;
      height: 24px;
      border: 1px solid #2A9595;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #2A9595;
      background-color: #FFFFFF;

      &.btn-delete {
        border-color: #E53935;
        color: #E53935;
      }
    }
  }
}

/* 没有更多数据 */
.no-more {
  text-align: center;
  font-size: 13px;
  color: #999999;
  padding: 24px 0 32px 0;
}


.edit-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.edit-modal-box {
  width: 280px;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  padding: 24px 20px 0;
  box-sizing: border-box;
}

.modal-title {
  font-size: 17px;
  font-weight: 600;
  color: #333333;
  text-align: center;
  margin-bottom: 20px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
}

.modal-input {
  height: 44px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 15px;
  color: #333333;
  box-sizing: border-box;
}

.modal-footer {
  display: flex;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  height: 48px;
  margin: 0 -20px;
}

.modal-btn {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}

.btn-cancel {
  color: #666666;
}

.btn-divider {
  width: 1px;
  height: 24px;
  background-color: #f0f0f0;
}

.btn-confirm {
  color: #2A9595;
  font-weight: 500;
}
</style>
