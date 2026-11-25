<template>
  <view class="page-container">
    <!-- ================= 1. 顶部自定义导航栏 ================= -->
    <u-navbar
      title="编辑规格"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      bgColor="#2A9595"
      titleStyle="color: #ffffff; font-size: 17px; font-weight: 500;"
    >
      <!-- 左侧返回箭头 -->
      <template #left>
        <view class="nav-left" @click="handleBack">
          <u-icon name="arrow-left" size="20" color="#ffffff"></u-icon>
        </view>
      </template>
      <!-- 右侧保存按钮 -->
      <template #right>
        <view class="nav-right" @click="handleSave">
          <text class="save-btn">保存</text>
        </view>
      </template>
    </u-navbar>

    <!-- ================= 2. 主体可滚动表单区域 ================= -->
    <scroll-view scroll-y="true" class="content-scroll">
      <view class="form-wrapper">
        <!-- 规格分组 1：规格 -->
        <view class="spec-group"
        v-for='(group,groupIndex) in specGroupList' :key="group.sid||groupIndex"
        >
          <view class="group-title">{{ group.name }}</view>
          <view class="tag-wrap">
            <view class="spec-tag" 
            v-for="(tag, tagIndex) in (group.valueList || [])" 
            @click="handleSelectTag(group,tag)"
             :class="{ active: group.selectedTagId === tag.valueId }"
             :key="tag.valueId || tagIndex"
            >{{ tag.value }}</view>
          </view>
        </view>


        <!-- 输入项 1：名称 -->
        <view class="input-group">
          <view class="input-title">名称</view>
          <view class="input-box">
            <input
              class="spec-input"
              placeholder="请输入名称"
              placeholder-class="placeholder-style"
              v-model="specName"
            />
          </view>
        </view>

        <!-- 输入项 2：价格 -->
        <view class="input-group">
          <view class="input-title">价格</view>
          <view class="input-box">
            <input
              class="spec-input"
              type="digit"
              placeholder="请输入价格"
              placeholder-class="placeholder-style"
              v-model="specPrice"
            />
          </view>
        </view>

        <!-- 输入项 3：库存 -->
        <view class="input-group">
          <view class="input-title">库存</view>
          <view class="input-box">
            <input
              class="spec-input"
              type="number"
              placeholder="请输入库存数"
              placeholder-class="placeholder-style"
              v-model="specStock"
            />
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { MineShangquanQuerySpec } from '@/api/mine'
import { storage } from '@/utils/storage'

// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 规格分组列表数据
const specGroupList = ref<any[]>([])

// 当前编辑的规格索引与原始数据（为 null 时代表新增）
const editIndex = ref<number | null>(null)
const editData = ref<any>(null)

// 表单输入项响应式变量
const specName = ref<string>('')
const specPrice = ref<string>('')
const specStock = ref<string>('')

// 匹配并回显已选中的规格标签
const initSelectedTags = () => {
  if (!editData.value?.tags?.length || !specGroupList.value.length) return
  specGroupList.value.forEach((group: any) => {
    (group.valueList || []).forEach((tag: any) => {
      // 通过 tagId 或 分组名+标签名 进行双向比对
      const isSelected = editData.value.tags.some((savedTag: any) => 
        savedTag.tagId === tag.valueId || (savedTag.groupName === group.name && savedTag.tagName === tag.value)
      )
      if (isSelected) {
        group.selectedTagId = tag.valueId
      }
    })
  })
}

// 查询规格配置列表
const getSpecList = () => {
  const userId = storage.getShopOwnerId() || storage.getUserId()
  const params = {
    userId: userId,
    name: '',
    page: '1',
    limit: '100'
  }

  MineShangquanQuerySpec(params)
    .then((res: any) => {
      if (res && res.result) {
        specGroupList.value = res.result
        // 规格列表获取成功后，触发选中标签回显
        initSelectedTags()
      }
    })
    .catch((err: any) => {
      console.error('获取规格列表失败：', err)
    })
}

// 页面加载生命周期：接收并解析路由传递的编辑参数
onLoad((options: any) => {
  if (options && options.specData) {
    try {
      // 解码并解析 JSON 规格数据
      const jsonString = decodeURIComponent(options.specData)
      const parsed = JSON.parse(jsonString)
      editData.value = parsed
      editIndex.value = options.editIndex !== undefined ? Number(options.editIndex) : null

      // 回填输入框数据
      specName.value = parsed.name || ''
      specPrice.value = parsed.price !== undefined ? String(parsed.price) : ''
      specStock.value = parsed.stock !== undefined ? String(parsed.stock) : ''

      // 若规格列表已提前加载完成，则立即执行回显
      initSelectedTags()
    } catch (error) {
      console.error('解析规格数据异常：', error)
    }
  }
})

// 页面挂载时请求规格列表
onMounted(() => {
  getSpecList()
})

// 切换选择规格标签
const handleSelectTag = (group: any, tag: any) => {
  if (group.selectedTagId === tag.valueId) {
    group.selectedTagId = null
  } else {
    group.selectedTagId = tag.valueId
  }
}

// 保存规格数据
const handleSave = () => {
  // 表单校验
  if (!specName.value.trim()) {
    uni.showToast({
      title: '请输入名称',
      icon: 'none'
    })
    return
  }

  if (!specPrice.value.trim()) {
    uni.showToast({
      title: '请输入价格',
      icon: 'none'
    })
    return
  }

  if (!specStock.value.trim()) {
    uni.showToast({
      title: '请输入库存数',
      icon: 'none'
    })
    return
  }

  // 收集当前选中的标签
  const selectedTags: any[] = []
  specGroupList.value.forEach((group: any) => {
    if (group.selectedTagId) {
      const chosenTag = (group.valueList || []).find((tag: any) => tag.valueId === group.selectedTagId)
      if (chosenTag) {
        selectedTags.push({
          groupName: group.name,
          tagName: chosenTag.value,
          tagId: chosenTag.valueId
        })
      }
    }
  })

  if (selectedTags.length === 0) {
    uni.showToast({
      title: '请至少选择一个规格',
      icon: 'none'
    })
    return
  }

  // 构造规格对象
  const newSpec = {
    name: specName.value,
    price: specPrice.value,
    stock: specStock.value,
    tags: selectedTags
  }

  // 判断为编辑模式或新增模式并通知上一页
  if (editIndex.value !== null && editIndex.value !== undefined) {
    uni.$emit('editSpecSuccess', { index: editIndex.value, spec: newSpec })
  } else {
    uni.$emit('addSpecSuccess', newSpec)
  }

  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })

  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
</script>

<style lang="scss" scoped>
/* 整个页面纯白底色，撑满全屏 */
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

/* 导航栏右侧保存文字按钮 */
.nav-right {
  display: flex;
  align-items: center;
  padding-right: 14px;
  .save-btn {
    font-size: 16px;
    color: #ffffff;
    font-weight: 400;
  }
}

/* 中间滚动内容区 */
.content-scroll {
  flex: 1;
  height: 0;
  background-color: #ffffff;
}

.form-wrapper {
  padding: 20px 16px 30px 16px; }

/* 规格分组容器 */
.spec-group {
  margin-bottom: 22px;

  .group-title {
    font-size: 15px;
    color: #333333;
    margin-bottom: 12px;
  }

  .tag-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    .spec-tag {
      min-width: 66px;
      height: 32px; 
      background-color: #f0f2f5;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 14px;
      font-size: 14.5px;
      color: #333333;
      box-sizing: border-box;

      &:active {
        background-color: #e4e7ed;
      }
    }
  }
}

/* 下方输入框项 */
.input-group {
  margin-bottom: 34px; 

  &:last-child {
    margin-bottom: 0; 
  }

  .input-title {
    font-size: 15px;
    color: #333333;
    margin-bottom: 10px;
  }

  .input-box {
    width: 100%;
    height: 44px;
    border: 1px solid #797979;
    border-radius: 4px;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background-color: #ffffff;

    .spec-input {
      width: 100%;
      height: 100%;
      font-size: 15px; 
      color: #333333;
    }
  }
}

/* 占位符灰色提示 */
.placeholder-style {
  color: #999999;
  font-size: 15px; 
}
  .spec-tag {
      min-width: 66px;
      height: 32px;
      background-color: #f0f2f5;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 14px;
      font-size: 14.5px;
      color: #333333;
      box-sizing: border-box;
      
      
      border: 1px solid transparent; 
      transition: all 0.2s; 
    
      &.active {
        background-color: #b4e3df; 
        border: 1px solid #2a9595;
        color: #2a9595;      
      }
      &:active {
        opacity: 0.8;
      }
    }
</style>
