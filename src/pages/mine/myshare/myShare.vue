<template>
    <view class="main">
        <u-navbar
          title="我的分享"
          :safeAreaInsetTop="true"
          :placeholder="true"
          :fixed="true"
          :border="false"
          :bgColor="bgColor"
          titleStyle="color: #fff;"
        >
         <template #left>
           <view class="u-nav-slot" slot="left">
             <view class="flex">
                 <u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
             </view>
           </view>
         </template>
		 <template #right>
          <view slot="right" @click="shareClick">
              <view class="homestayView">分享</view>
          </view>
		  </template>
        </u-navbar>
		<view style="margin-left: 4%;width: 92%;height: 500px;margin-top: 30px;background-color: white;border-radius: 5px;">
			<view class="codeView">
				<view style="margin-top: 10px;width: 100%;font-size: 20px;height: 50px;display: flex;flex-direction: row;">
					<u-avatar style="margin-top: 10px;margin-left: 15px;"
					  :src="image"
					  number="30px"
					  
					></u-avatar>
					<view style="display: flex;flex-direction: column;margin-top: 10px;margin-left: 10px;">
						<view style="font-size: 13px;">{{name}}</view>
						<view style="font-size: 13px;margin-top: 5px;">{{phone}}</view>
					</view>
				</view>
				<view style="width: 100%;height: 1px;margin-top: 20px;background-color: lightgray;"></view>
				<view style="align-items: center;text-align: center;width: 100%;height: 300px;margin-top: 40px;">
					<canvas canvas-id="qrCanvas" style="width: 200px; height: 200px;margin-left: 80px;"></canvas>
				</view>
				
			</view>
			<view style="width: 100%;height: 30px;color: dimgray;font-size: 13px;text-align: center;margin-top: 10px;">扫码注册</view>
		</view>
</view>
</template>

<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import QRCode from 'qrcode-generator';
	import {MineShare}from '@/api/mine';
	import { getStorage, storage, storageKeys } from '@/utils/storage';
	import { onLoad } from '@dcloudio/uni-app';	
       
	// 背景颜色
	const bgColor  = ref("#2A9595");
	const qrText = ref('qrcode');
	const image = ref('');
	const name = ref('张明');
	const phone = ref('');

	onLoad(() => {
		image.value = storage.getAvatar();
		name.value = storage.getRealName();
		phone.value = storage.getPhone();
	});
	onMounted(() => {
	   init();
	});
            
	const init = async() => {
		
		try {
			
			let param = {
				
				userId:storage.getUserId(),
				
			};
			const res = await MineShare(param);
							
			console.log(res);
			qrText.value = res.result;
			const qr = QRCode(0, 'L')  // 纠错等级 L
			qr.addData(qrText.value)
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
		   
		}catch (error) {
			console.log(error)
		}
	};
	
	const goBack= () => {
		
		uni.navigateBack()
	};
	//分享
	const shareClick = () => {
		
	};
        
</script>

<style lang="scss" scoped>
	
    .main {
          min-height: 100vh;
        width: 100%;
		background-color: aliceblue;
        .flex{
            display: flex;
        }
        .homestayView{
              width: 100px;
              height: 30px;
              color: white;
              margin-right: 10px;
              margin-top: 11px;
              text-align: right;
             font-size: 13px;
		}
		.codeView{
			width: 100%;
			height: 400px;
			background-color: white;
			display: flex;
			flex-direction: column;
		}
    }
</style>