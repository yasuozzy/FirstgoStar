<template>
  <view class="page-container">
    <!-- ================= 1. 顶部自定义导航栏 ================= -->
    <u-navbar
      title="商品属性"
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

    <!-- 顶部灰色隔离间隙 -->
    <view class="top-divider"></view>

    <!-- ================= 2. 表单内容区域 ================= -->
    <view class="form-container">
      <!-- 属性名称 -->
      <view class="form-row">
        <view class="label-box">
          <text class="required">*</text>
          <text class="label-text">属性名称</text>
        </view>
        <view class="input-box">
          <input
            class="attr-input"
            type="text"
            placeholder="如热度、辣度"
            placeholder-class="placeholder-style"
            v-model="attrName"
          />
        </view>
      </view>

      <!-- 属性标签 -->
      <view class="form-row">
        <view class="label-box">
          <text class="required">*</text>
          <text class="label-text">属性标签</text>
        </view>
        <view class="input-box">
          <input
            class="attr-input"
            type="text"
            placeholder="如微辣、中辣"
            placeholder-class="placeholder-style"
            v-model="attrValue"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 属性名称与属性标签
const attrName = ref('')
const attrValue = ref('')

// 页面加载生命周期：接收上级页面传入的历史属性参数
onLoad((options: any) => {
  if (options) {
    if (options.attrName) {
      attrName.value = decodeURIComponent(options.attrName)
    }
    if (options.attrValue) {
      attrValue.value = decodeURIComponent(options.attrValue)
    }
  }
})

// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 保存按钮点击事件
const handleSave = () => {
  // 表单校验：检查属性名称是否为空
  if (!attrName.value.trim()) {
    uni.showToast({
      title: '请输入属性名称',
      icon: 'none'
    })
    return
  }

  // 表单校验：检查属性标签是否为空
  if (!attrValue.value.trim()) {
    uni.showToast({
      title: '请输入属性标签',
      icon: 'none'
    })
    return
  }

  // 通知上级页面更新属性数据
  uni.$emit('saveAttrSuccess', {
    attrName: attrName.value.trim(),
    attrValue: attrValue.value.trim()
  })

  // 提示保存成功
  uni.showToast({
    title: '保存成功',
    icon: 'none'
  })

  // 延时返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
</script>

<style lang="scss" scoped>
.page-container {
  min-height: 100vh;
  background-color: #ffffff;
}

/* 顶部导航栏左右操作区域 */
.nav-left {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-right: 8px;

  .save-btn {
    font-size: 16px;
    color: #ffffff;
    font-weight: 400;
  }
}

/* 顶部与导航栏之间的浅灰微隔离带 */
.top-divider {
  width: 100%;
  height: 10px;
  background-color: #f7f8fa;
}

/* 表单主体容器 */
.form-container {
  width: 100%;
  background-color: #ffffff;
  padding: 0 16px;
  box-sizing: border-box;
}

/* 每一行输入条目 */
.form-row {
  display: flex;
  align-items: center;
  height: 52px;
  border-bottom: 1px solid #f0f0f0;

  .label-box {
    display: flex;
    align-items: center;
    width: 86px;
    flex-shrink: 0;

    .required {
      color: #ff4d4f;
      font-size: 15px;
      margin-right: 2px;
      line-height: 1;
    }

    .label-text {
      font-size: 15px;
      color: #333333;
    }
  }

  .input-box {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;

    .attr-input {
      width: 100%;
      height: 100%;
      font-size: 15px;
      color: #333333;
    }
  }
}

/* 提示占位符颜色 */
.placeholder-style {
  color: #999999;
  font-size: 15px;
}
</style>
