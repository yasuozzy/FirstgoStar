<template>
	<view class="x-coupon" :style="[couponStyle]" @click="handleClick">
		<!-- 左侧面值区域 -->
		<view class="x-coupon__left">
			<view class="x-coupon__value-box">
				<text class="x-coupon__currency" v-if="type === 'money'">{{ currency }}</text>
				<text class="x-coupon__value">{{ value }}</text>
				<text class="x-coupon__currency" v-if="type === 'discount'">折</text>
			</view>
			<view class="x-coupon__condition" v-if="condition">{{ condition }}</view>
		</view>

		<!-- 中间分割线 -->
		<view class="x-coupon__divider">
			<view class="x-coupon__divider-line"></view>
		</view>

		<!-- 右侧信息区域 -->
		<view class="x-coupon__right">
			<view class="x-coupon__info">
				<view class="x-coupon__title">{{ title }}</view>
				<view class="x-coupon__desc" v-if="desc">{{ desc }}</view>
				<view class="x-coupon__validity" v-if="validity">{{ validity }}</view>
			</view>
			<view class="x-coupon__action">
				<slot name="action">
					<view class="x-coupon__btn" :class="{'x-coupon__btn--disabled': disabled}" v-if="showBtn">
						{{ btnText }}
					</view>
				</slot>
			</view>
			
			<!-- 状态角标（可选） -->
			<view class="x-coupon__stamp" v-if="status !== 'available'">
				<text>{{ statusText }}</text>
			</view>
		</view>

		<!-- 上下半圆缺口 -->
		<view class="x-coupon__cutout x-coupon__cutout--top" :style="{ backgroundColor: cutoutColor }"></view>
		<view class="x-coupon__cutout x-coupon__cutout--bottom" :style="{ backgroundColor: cutoutColor }"></view>
	</view>
</template>

<script>
	export default {
		name: "x-coupon",
		props: {
			// money 金额券 | discount 折扣券
			type: {
				type: String,
				default: 'money'
			},
			value: {
				type: [Number, String],
				required: true
			},
			currency: {
				type: String,
				default: '¥'
			},
			condition: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '优惠券'
			},
			desc: {
				type: String,
				default: ''
			},
			validity: {
				type: String,
				default: ''
			},
			// 主题色
			color: {
				type: String,
				default: '#ff5a5f'
			},
			// 卡券背景色
			backgroundColor: {
				type: String,
				default: '#ffffff'
			},
			// 缺口圆的背景色（通常与页面背景一致；要透明可传 transparent）
			cutoutColor: {
				type: String,
				default: '#f5f5f5'
			},
			disabled: {
				type: Boolean,
				default: false
			},
			status: {
				type: String,
				default: 'available' // available 可用 | used 已使用 | expired 已过期
			},
			btnText: {
				type: String,
				default: '立即使用'
			},
			showBtn: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			couponStyle() {
				return {
					'--theme-color': this.disabled ? '#cccccc' : this.color,
					'--bg-color': this.backgroundColor
				}
			},
			statusText() {
				const map = {
					'used': '已使用',
					'expired': '已过期',
					'available': ''
				}
				return map[this.status] || ''
			}
		},
		methods: {
			handleClick() {
				if (this.disabled || this.status !== 'available') return;
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.x-coupon {
		position: relative;
		display: flex;
		align-items: stretch;
		width: 100%;
		height: 200rpx; // 固定高度（可按需调整）
		background-color: var(--bg-color);
		border-radius: 16rpx;
		overflow: hidden; // 需要裁切内部溢出
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
		margin-bottom: 24rpx;
		transition: all 0.3s;

		&--disabled {
			opacity: 0.8;
		}

		&__left {
			width: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background: linear-gradient(135deg, var(--theme-color), lighten(#000, 20%)); // 降级方案
			background: var(--theme-color);
			color: #fff;
			position: relative;
			padding: 20rpx;
			box-sizing: border-box;
			flex-shrink: 0;

			// 增加轻微质感（可按需调整）
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(0,0,0,0.1));
				pointer-events: none;
			}
		}

		&__value-box {
			display: flex;
			align-items: baseline;
		}

		&__currency {
			font-size: 24rpx;
			margin-right: 4rpx;
		}

		&__value {
			font-size: 56rpx;
			font-weight: bold;
			line-height: 1;
		}

		&__condition {
			font-size: 20rpx;
			margin-top: 12rpx;
			opacity: 0.9;
			text-align: center;
		}

		&__divider {
			width: 0;
			position: relative;
			border-left: 2rpx dashed #eee;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
			z-index: 1;
		}
		
		&__right {
			flex: 1;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			padding: 24rpx 30rpx 24rpx 40rpx; // 左侧预留缺口区域
			position: relative;
			box-sizing: border-box;
		}

		&__info {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			overflow: hidden;
		}

		&__title {
			font-size: 30rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 8rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__desc {
			font-size: 22rpx;
			color: #999;
			margin-bottom: 4rpx;
		}

		&__validity {
			font-size: 20rpx;
			color: #aaa;
		}

		&__action {
			margin-left: 20rpx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
		}

		&__btn {
			font-size: 24rpx;
			padding: 8rpx 24rpx;
			border-radius: 50rpx;
			background-color: var(--theme-color);
			color: #fff;
			text-align: center;
			
			&--disabled {
				background-color: #ccc;
			}
		}

		&__cutout {
			position: absolute;
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			z-index: 2;
			left: 185rpx; // 200rpx（左侧宽度）- 15rpx（半径）
		}

		&__cutout--top {
			top: -15rpx;
		}

		&__cutout--bottom {
			bottom: -15rpx;
		}
		
		&__stamp {
			position: absolute;
			right: 0;
			top: 0;
			width: 120rpx;
			height: 120rpx;
			overflow: hidden;
			opacity: 0.6;
			pointer-events: none;
			
			text {
				display: block;
				width: 200rpx;
				height: 40rpx;
				line-height: 40rpx;
				text-align: center;
				background-color: #ccc;
				color: #fff;
				font-size: 20rpx;
				transform: rotate(45deg) translate(20rpx, -20rpx);
				transform-origin: center;
				position: absolute;
				top: 20rpx;
				right: -50rpx;
			}
		}
	}
</style>
