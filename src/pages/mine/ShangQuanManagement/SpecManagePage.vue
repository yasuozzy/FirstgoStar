<template>
  <view class="page-container">
    <!-- ================= 1. 顶部自定义导航栏 ================= -->
    <u-navbar
      title="商品规格管理"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #ffffff; font-size: 17px; font-weight: 500;"
    >
      <!-- 左侧返回图标 -->
      <template #left>
        <view class="nav-left" @click="handleBack">
          <u-icon name="arrow-left" size="20" color="#ffffff"></u-icon>
        </view>
      </template>
      <!-- 右侧垃圾桶图标 -->
      <template #right>
        <view class="nav-right"  @click="toggleDeleteMode">
             <text v-if="isDeleteMode" class="cancel-btn">取消</text>
          <u-icon v-else name="trash" size="22" color="#ffffff"></u-icon>
        </view>
      </template>
    </u-navbar>

    <!-- ================= 2. 中间规格列表内容区域 ================= -->
    <scroll-view scroll-y="true" class="content-scroll">
      <!-- 规格列表容器 -->
      <view class="spec-list-wrapper">
        <!-- 规格卡片-->
        <view class="spec-card"
        v-for='(item,index) in specList' :key="index"
        >
          <!-- 顶部标题行-->
          <view class="spec-card-header">
            <view class="header-left">
              <!-- 删除模式下展示的勾选圈 -->
              <view
                v-if="isDeleteMode"
                class="checkbox-circle"
                :class="{ checked: item.checked }"
                @click="toggleCheck(item)"
              >
                <!-- 勾选时显示的白色小对勾 -->
                <u-icon v-if="item.checked" name="checkmark" size="12" color="#ffffff"></u-icon>
              </view>
              <text class="header-title">规格 {{ index + 1 }}</text>
            </view>
            <text class="header-edit" v-if="!isDeleteMode" @click="handleEditSpec(item,index)" >编辑</text>
          </view>

          <!-- 中间属性列表 -->
          <view class="spec-card-body">
            <view class="spec-info-row"
            v-for="tag in item.tags" :key="tag.tagId"
            >
              <text class="info-text">{{ tag.groupName }}：{{ tag.tagName}}</text>
            </view>
             <view class="spec-info-row">
              <text class="info-text">价格：{{ item.price }}</text>
            </view>
          </view>

          <!-- 卡片底部的灰色分隔条（与截图完全一致） -->
          <view class="spec-card-divider"></view>
        </view>
      </view>
    </scroll-view>

    <!-- ================= 3. 底部“添加规格”按钮 ================= -->
    <view class="bottom-action-bar">
      <view class="add-spec-btn" @click="handleBottomClick">
       {{ isDeleteMode?'删除':'添加规格' }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { ref } from 'vue'

 // 返回上一页并把规格列表交接给新增商品页
 const handleBack = () => {
    uni.$emit('updateSpecList', specList.value)
    uni.navigateBack()
 }
//点击底部按钮，跳转到“编辑规格”
const handleAddSpec=()=>{
    uni.navigateTo({
        url: '/pages/mine/ShangQuanManagement/EditSpecPage'
    })
}

// 规格列表数据
const specList = ref<any[]>([])

onLoad((options: any) => {
  // 接收从新增商品页传入的已有规格列表数据
  if (options && options.initialList) {
    try {
      const decoded = decodeURIComponent(options.initialList)
      specList.value = JSON.parse(decoded) || []
    } catch (error) {
      console.error('解析初始规格列表失败：', error)
    }
  }

  // 监听新增规格事件
  uni.$on('addSpecSuccess', (receivedSpec) => {
    specList.value.push(receivedSpec)
  })

  // 监听编辑更新规格事件
  uni.$on('editSpecSuccess', ({ index, spec }: any) => {
    if (index !== null && index !== undefined && specList.value[index]) {
      specList.value[index] = spec
    }
  })
})

onUnload(() => {
  uni.$off('addSpecSuccess')
  uni.$off('editSpecSuccess')
})

//控制是否进入批量删除
const isDeleteMode  =ref(false)
// 点击右上角图标/文字触发的
const toggleDeleteMode = () => {
  isDeleteMode.value = !isDeleteMode.value
}

// 点击小圆圈，切换勾选状态
const toggleCheck = (item: any) => {
    item.checked  = !item.checked
}
 
// 底部按钮
const handleBottomClick = () => {
  if (isDeleteMode.value) {
       // 如果当前处于删除模式，执行真正的删除动作
        handleDeleteSpec()
  }else{
       handleAddSpec()
  }
}

//执行删除
const handleDeleteSpec = () => {
  const hasSelected =specList.value.some((item:any)=>item.checked)
  if(!hasSelected){
     uni.showToast({
         title:'请选择要删除的规格',
         icon:'none',
     })
     return
  }
  
  //true留下 false删掉
  specList.value =specList.value.filter((item:any)=>!item.checked)
 
  //弹窗
  uni.showToast({
  title: '删除成功',
  icon: 'success'
})
// 删完后自动退出删除模式，变回正常模式
isDeleteMode.value = false

}

// 点击编辑规格项
const handleEditSpec = (item: any, index: number) => {
  // 序列化规格数据并进行 URL 编码
  const specString = JSON.stringify(item)
  const safeData = encodeURIComponent(specString)
  
  // 跳转至编辑页并携带索引与规格数据
  uni.navigateTo({
    url: `/pages/mine/ShangQuanManagement/EditSpecPage?editIndex=${index}&specData=${safeData}`
  })
}


</script>

<style lang="scss" scoped>
/* 整个页面纯白底色，撑满屏幕 */
.page-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  overflow: hidden;
}

/* 导航栏左侧返回 */
.nav-left {
  display: flex;
  align-items: center;
  padding-left: 8px;
}

/* 导航栏右侧垃圾桶 */
.nav-right {
  display: flex;
  align-items: center;
  padding-right: 14px;
}

/* 中间滚动列表区 */
.content-scroll {
  flex: 1;
  height: 0;
  background-color: #ffffff;
}

.spec-list-wrapper {
  width: 100%;
}

/* 单个规格卡片 */
.spec-card {
  width: 100%;
  background-color: #ffffff;

  /* 头部：规格1 + 编辑 */
  .spec-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid #f2f3f5;

    /* 让圆圈和文字排成一排 */
    .header-left {
      display: flex;
      align-items: center;
    }

    /* 画出那个圆圈 */
    .checkbox-circle {
      width: 18px;
      height: 18px;
      border: 1.5px solid #c0c4cc; 
      border-radius: 50%;         
      margin-right: 8px;           
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;

      /* 选中态：墨绿色背景与边框 */
      &.checked {
        background-color: #2A9595;
        border-color: #2A9595;
      }
    }

    .header-title {
      font-size: 15px;
      font-weight: 500;
      color: #2A9595;
    }

    .header-edit {
      font-size: 14px;
      color: #2A9595;
    }
  }

  /* 内容区域 */
  .spec-card-body {
    padding: 12px 16px 14px 16px;

    .spec-info-row {
      font-size: 14px;
      color: #333333;
      line-height: 28px;

      .info-text {
        letter-spacing: 0.2px;
      }
    }
  }

  /* 底部分隔条（通栏浅灰底色） */
  .spec-card-divider {
    width: 100%;
    height: 10px;
    background-color: #f4f5f7;
  }
}

/* 底部固定操作栏（适配全面屏安全区） */
.bottom-action-bar {
  padding: 16px 16px 20px 16px;
  padding-bottom: calc(20px + constant(safe-area-inset-bottom));
  padding-bottom: calc(20px + env(safe-area-inset-bottom));
  background-color: #ffffff;

  .add-spec-btn {
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


</style>
