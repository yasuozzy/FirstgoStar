<template>
  <view style="height: 100vh; background-color: #42babb">
    <u-navbar
      title="二维码收款"
      :safeAreaInsetTop="true"
      :placeholder="true"
      :fixed="true"
      :border="false"
      :bgColor="bgColor"
      titleStyle="color: #fff;"
      leftIconColor="#fff"
    >
      <template #left>
      	<view slot="left" >
      		<view class="flex">
      			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
      		</view>
      	</view>
      </template>
    </u-navbar>
    <view>
      <view
        style="
          position: absolute;
          background: #fff;
          height: 450px;
          box-sizing: border-box;
          width: 350px;
          top: 110px;
          left: calc(50% - 175px);
          border-radius: 10px;
        "
      >
        <view
          style="
            height: 50px;
            background-color: #f2f4f7;
            border-radius: 10px 10px 0px 0px;
          "
        >
          <view style="color: #42babb; padding: 10px 10px"> 二维码收款 </view>
        </view>

        <view
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 90%;
          "
        >
          <view style="color: #42babb; font-size: 16px; margin-bottom: 20px">
            扫二维码向我付款
          </view>
		  <view style="width: 200px; height: 200px;background-color: red;">
		    <!-- <up-qrcode v-if="qrcode" :value="qrcode" :size="200" /> -->
			<canvas canvas-id="qrCanvas" style="width: 200px; height: 200px;"></canvas>
		  </view>
		  
          <view
            @click="download"
            style="color: #42babb; font-size: 16px; margin: 30px 0px"
          >
            保存二维码
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import QRCode from 'qrcode-generator';
	
    const bgColor = ref('#2A9595');
    const text = ref('');
	const qrCanvas = ref(null);
	const qrDataUrl = ref('');
    const fileType = ref("png"); // 可选值：png, jpg, jpeg
    
	onMounted(()=>{
		const rcvCstno = getStorage(storageKeys.hostNo,'');
		const notifyurl = 'http://36.138.20.28:9004/app/users/QRCodeCollectionNotice';//提交新版本时，服务器接口需要修改为正式服务器
		const urlstr = `http://hhdev.minpay.cc:8800/dkhhpay/web/100000001/payment.html?rcvCstno=${rcvCstno}&type=0&notifyurl=${encodeURIComponent(notifyurl)}`;
			
		text.value = urlstr;
		// // 🔍 调试：务必在控制台打印检查最终 URL 是否正确
		// 创建一个 QR Code 实例
		const qr = QRCode(0, 'L')  // 纠错等级 L
		qr.addData(text.value)
		qr.make()
		
		// uni-app 特有的 Canvas 上下文
		const ctx = uni.createCanvasContext('qrCanvas') // 传入 canvas-id
		const size = 200
		const cellSize = size / qr.getModuleCount()
	  
		// 绘制二维码
		for (let row = 0; row < qr.getModuleCount(); row++) {
		  for (let col = 0; col < qr.getModuleCount(); col++) {
			ctx.setFillStyle(qr.isDark(row, col) ? '#000000' : '#ffffff')
			ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
		  }
		}
		ctx.draw() // 必须调用 draw 才会渲染
		
	});
    const goBack = () => {
      uni.navigateBack();
    };
    const download = () => {
		
      // 1. 先将 Canvas 导出为临时图片
        uni.canvasToTempFilePath({
          canvasId: 'qrCanvas', // 与 canvas-id 保持一致[reference:5]
          success: (res) => {
            // res.tempFilePath 就是临时图片路径[reference:6]
            // 2. 保存到相册
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                uni.showToast({ title: '保存成功！' })
              },
              fail: (err) => {
                console.error('保存失败:', err)
                uni.showToast({ title: '保存失败，请检查权限', icon: 'none' })
              }
            })
          },
          fail: (err) => {
            console.error('导出图片失败:', err)
            uni.showToast({ title: '生成图片失败', icon: 'none' })
          }
        })
	};
    
</script>

<style></style>
