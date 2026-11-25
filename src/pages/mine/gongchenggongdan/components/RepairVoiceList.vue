<template>
  <view class="voice-section">
    <view class="divider" />
    <text class="section-title">语音描述：</text>
    <view v-if="voices.length" class="voice-list">
      <view
        v-for="(voice, index) in voices"
        :key="`${voice}-${index}`"
        class="voice-row"
        @click="toggleVoice(voice, index)"
      >
        <view class="voice-bubble" :class="{ playing: currentIndex === index }">
          <image class="voice-icon" :src="voiceIcon" mode="aspectFit" />
          <text class="voice-time">{{ Math.trunc(Number(durations[index] || 0)) }}&quot;</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { REPAIR_ASSETS } from '../config/repairState';

const props = withDefaults(
  defineProps<{
    voices?: string[];
    durations?: Array<string | number>;
  }>(),
  {
    voices: () => [],
    durations: () => [],
  },
);

const voiceIcon = REPAIR_ASSETS.voice;
const currentIndex = ref(-1);
let audioContext: any = null;

const stopVoice = () => {
  if (audioContext) {
    audioContext.stop();
    audioContext.destroy();
    audioContext = null;
  }
  currentIndex.value = -1;
};

const toggleVoice = (voice: string, index: number) => {
  if (!voice) {
    uni.showToast({ title: '语音地址为空', icon: 'none' });
    return;
  }

  if (currentIndex.value === index) {
    stopVoice();
    return;
  }

  stopVoice();
  audioContext = uni.createInnerAudioContext();
  audioContext.src = voice;
  audioContext.onEnded(stopVoice);
  audioContext.onError(() => {
    uni.showToast({ title: '语音播放失败', icon: 'none' });
    stopVoice();
  });
  currentIndex.value = index;
  audioContext.play();
};

watch(
  () => props.voices,
  () => stopVoice(),
);

onUnmounted(stopVoice);

defineExpose({
  stopVoice,
});
</script>

<style lang="scss" scoped>
.divider {
  height: 1px;
  margin: 0 19px;
  background: #f0f0f0;
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

.voice-row {
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

.voice-bubble.playing {
  background: #e8f5f5;
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

</style>
