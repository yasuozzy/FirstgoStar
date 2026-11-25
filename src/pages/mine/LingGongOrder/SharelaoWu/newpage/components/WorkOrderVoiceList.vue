<template>
  <view class="voice-section">
    <view class="divider" />
    <text class="section-title">语音描述：</text>
    <view v-if="voices.length" class="voice-list">
      <view v-for="(voice, index) in voices" :key="`${voice}-${index}`" class="voice-item" @click="playVoice">
        <view class="voice-bubble">
          <image class="voice-icon" :src="voiceIcon" mode="aspectFit" />
          <text class="voice-time">{{ durations[index] || 0 }}''</text>
        </view>
      </view>
    </view>
    <text v-else class="empty">暂无</text>
  </view>
</template>

<script setup lang="ts">
import { DETAIL_ASSETS } from '../config/workerOrderDetailAssets';

withDefaults(
  defineProps<{
    voices?: string[];
    durations?: Array<string | number>;
  }>(),
  {
    voices: () => [],
    durations: () => [],
  },
);

const voiceIcon = DETAIL_ASSETS.voice;

const playVoice = () => {
  uni.showToast({ title: '语音播放后期添加', icon: 'none' });
};
</script>

<style lang="scss" scoped>
.divider {
  height: 1px;
  margin: 0 19px;
  background: #f0f8ff;
}

.section-title {
  display: block;
  margin: 19px 19px 0;
  color: #333;
  font-size: 13px;
}

.voice-list {
  padding: 14px 19px;
}

.voice-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.voice-bubble {
  display: flex;
  align-items: center;
  min-width: 92px;
  padding: 9px;
  background: #f7f7f7;
  border-radius: 5px;
}

.voice-icon {
  width: 18px;
  height: 18px;
}

.voice-time {
  margin-left: 12px;
  color: #666;
  font-size: 13px;
}

.empty {
  display: block;
  padding: 14px 19px;
  color: #999;
  font-size: 13px;
}
</style>

