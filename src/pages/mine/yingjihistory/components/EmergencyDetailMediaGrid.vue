<template>
  <view class="media-section">
    <view class="divider" />
    <text class="section-title">{{ title }}</text>
    <view v-if="images.length" class="image-grid">
      <image
        v-for="(image, index) in images"
        :key="`${image}-${index}`"
        class="image-item"
        :src="image"
        mode="aspectFill"
        @click="preview(index)"
      />
    </view>
    <text v-else class="empty">暂无</text>
  </view>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    images?: string[];
  }>(),
  {
    title: '图片描述：',
    images: () => [],
  },
);

const preview = (index: number) => {
  uni.previewImage({
    current: index,
    urls: props.images,
  });
};
</script>

<style lang="scss" scoped>
.divider {
  height: 1px;
  margin: 29px 19px 0;
  background: #f0f8ff;
}

.section-title {
  display: block;
  margin: 19px 19px 0;
  color: #333;
  font-size: 13px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 10px;
  padding: 19px;
}

.image-item {
  width: 100px;
  height: 100px;
  background: #f6f6f6;
}

.empty {
  display: block;
  padding: 14px 19px;
  color: #999;
  font-size: 13px;
}
</style>
