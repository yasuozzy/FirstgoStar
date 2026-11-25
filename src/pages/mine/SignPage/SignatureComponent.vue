<template>
  <view class="signature-container">
    <!-- 画布区域 -->
    <canvas
      canvas-id="signatureCanvas"
      class="signature-canvas"
      disable-scroll="true"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    ></canvas>

    <!-- 操作按钮 -->
    <view class="button-group">
      <button @click="handleSave">确认</button>
      <button @click="handleReset">重置</button>
    </view>
  </view>
</template>
<script setup lang="ts">
	
	import { onLoad } from '@dcloudio/uni-app';
	import { ref, reactive,onMounted,getCurrentInstance } from 'vue';

	// 定义事件
	const emit = defineEmits(['save'])
	
	// 获取当前组件实例（用于 uni.createCanvasContext 的第二个参数）
	const instance = getCurrentInstance();
	
	const ctx = ref(null); // canvas 上下文
	const points = ref([]); // 存储绘制路径点
	const hasSigned = ref(false);
	const canvasWidth = ref(0); // 画布宽度
	const canvasHeight = ref(0); // 画布高度
	const tempFilePath = ref(''); // 临时文件路径
	const hasDrawn = ref(false); // 【新增】标记是否进行过绘制
    
	onMounted(() => {
		initCanvas();
	});
  
	// 初始化画布
	const initCanvas = () => {
	  const query = uni.createSelectorQuery().in(instance.proxy)
	  query
	    .select('.signature-canvas')
	    .boundingClientRect((rect) => {
	      if (rect) {
	        canvasWidth.value = rect.width
	        canvasHeight.value = rect.height
	        ctx.value = uni.createCanvasContext('signatureCanvas', instance.proxy)
	        ctx.value.lineWidth = 4
	        ctx.value.lineCap = 'round'
	        ctx.value.lineJoin = 'round'
	      }
	    })
	    .exec()
	};
	
	// 触摸开始
	const handleTouchStart = (e) => {
	  const startX = e.touches[0].x
	  const startY = e.touches[0].y
	  hasSigned.value = true
	  points.value.push({ x: startX, y: startY })
	  ctx.value.beginPath()
	  ctx.value.moveTo(startX, startY)
	  hasDrawn.value = true
	};
	
	// 触摸移动
	const handleTouchMove = (e) => {
	  const moveX = e.touches[0].x
	  const moveY = e.touches[0].y
	  points.value.push({ x: moveX, y: moveY })
	  if (points.value.length >= 2) {
	    const point1 = points.value[points.value.length - 2]
	    const point2 = points.value[points.value.length - 1]
	    ctx.value.moveTo(point1.x, point1.y)
	    ctx.value.lineTo(point2.x, point2.y)
	    ctx.value.stroke()
	    ctx.value.draw(true)
	  }
	};
	
	// 触摸结束
	const handleTouchEnd = () => {
	  points.value = []   // 清空缓存点（但保留绘制痕迹）
	  // 注意：不重置 hasDrawn，因为已经绘制过
	};
	
	// 重置画布
	const handleReset = () => {
	  if (ctx.value) {
	    ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value)
	    ctx.value.draw(true)
	  }
	  tempFilePath.value = ''
	  hasDrawn.value = false
	};
	
	// 保存签名
	const handleSave = () => {
	  if (!hasDrawn.value) {
	    uni.showToast({ title: '请先签名', icon: 'none' })
	    return
	  }
	  if (!ctx.value) {
	    uni.showToast({ title: '画布初始化失败', icon: 'none' })
	    return
	  }
	
	  uni.canvasToTempFilePath({
	    canvasId: 'signatureCanvas',
	    success: (res) => {
	      tempFilePath.value = res.tempFilePath
	      uni.showToast({ title: '保存成功', icon: 'success' })
	      emit('save', res.tempFilePath)   // 触发父组件事件
	    },
	    fail: (err) => {
	      console.error('保存失败', err)
	      uni.showToast({ title: '保存失败', icon: 'none' })
	    }
	  })
	};
	
	// 预览签名
	const handlePreview = () => {
	  if (!tempFilePath.value) {
	    uni.showToast({ title: '请先保存签名', icon: 'none' })
	    return
	  }
	  uni.previewImage({
	    urls: [tempFilePath.value]
	  })
	};

</script>
<style scoped>
.signature-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.signature-canvas {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.button-group {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

button {
  flex: 1;
  margin: 0 10px;
}
</style>
