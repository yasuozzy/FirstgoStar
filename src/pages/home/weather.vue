<template>
  <view class="weather-container">
	  
	  <u-navbar
	    title="天气"
	    :safeAreaInsetTop="true"
	    :placeholder="true"
	    :fixed="true"
	    :border="false"
	    :bgColor="bgColor"
	    titleStyle="color: #fff;"
	    leftIconColor="#fff"
	  >
	<template #left>
	  <view class="u-nav-slot" slot="left">
		<view class="flex">
			<u-icon name="arrow-left" size="20" color="#fff" @click="goBack"></u-icon>
		</view>
	  </view>
	</template>
	  			
	  		</u-navbar>
    <!-- 定位和刷新 -->
    <view class="header">
      <text class="city">{{ city }}</text>
      <text class="refresh" @click="getWeatherData">🔄 刷新</text>
    </view>
    
    <!-- 主要天气信息 -->
    <view class="current-weather">
      <image :src="weatherIcon" class="weather-icon"></image>
      <text class="temperature">{{ temperature }}°</text>
      <text class="weather-desc">{{ weather }}</text>
    </view>
    
    <!-- 天气详情 -->
    <view class="weather-details">
      <view class="detail-item">
        <text>湿度</text>
        <text>{{ humidity }}%</text>
      </view>
      <view class="detail-item">
        <text>风力</text>
        <text>{{ windPower }}级</text>
      </view>
      <view class="detail-item">
        <text>风向</text>
        <text>{{ windDirection }}</text>
      </view>
    </view>
    
    <!-- 预报信息 -->
    <view class="forecast">
      <view class="forecast-item" v-for="(item, index) in forecasts" :key="index">
        <text>{{ item.date }}</text>
        <image :src="getWeatherIcon(item.dayWeather)" class="forecast-icon"></image>
        <text>{{ item.dayTemp }}° / {{ item.nightTemp }}°</text>
      </view>
    </view>
    
    <!-- 加载状态 -->
    <view v-if="loading" class="loading-mask">
      <view class="loading-content">
        <!-- <activity-indicator size="large"></activity-indicator> -->
        <text>获取天气数据中...</text>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
	import { ref, reactive, onMounted,computed } from 'vue';
	import { onLoad} from '@dcloudio/uni-app';
	// 高德API Key - 实际项目中应该从配置或后端获取
	const AMAP_KEY = 'd260afe2d72e1b4e78147fdd1b1c79d7';


	// 背景颜色
	const bgColor = ref("#2A9595");
	const loading = ref(false);
	const city = ref('潍坊');
	const adcode = ref('370700'); // 城市编码
	const weather = ref('');
	const temperature = ref('');
	const humidity = ref('');
	const windPower = ref('');
	const windDirection = ref('');
	const weatherIcon = ref('');
	const forecasts = ref([]);
    
	onLoad(() => {
		initLocation();
	});
  
    // 初始化定位
    const initLocation = () => {
      loading.value = true;
      
      // 先获取当前位置
      uni.getLocation({
        type: 'gcj02', // 高德地图坐标系
        success: (res) => {
			
			console.log(res.latitude,res.longitude);
          getCityByLocation(res.longitude, res.latitude);
        },
        fail: (err) => {
          console.error('获取位置失败:', err);
          
          getWeatherData();
        }
      });
    };
    
    // 根据经纬度获取城市信息
    const getCityByLocation = (longitude:any, latitude:any) => {
      uni.request({
        url: `https://restapi.amap.com/v3/geocode/regeo?key=${AMAP_KEY}&location=${longitude},${latitude}`,
        success: (res) => {
          if (res.data.status === '1') {
            city.value = res.data.regeocode.addressComponent.city || 
                        res.data.regeocode.addressComponent.province;
            adcode.value = res.data.regeocode.addressComponent.adcode;
			console.log(city.value,adcode.value);
            getWeatherData();
          }
        },
        fail: (err) => {
          console.error('获取城市信息失败:', err);
          loading.value = false;
        }
      });
    };
    
    // 获取天气数据
    const getWeatherData = () => {
      if (!adcode.value) return;
      
      loading.value = true;
      
      // 获取实时天气
      uni.request({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${adcode.value}`,
        success: (res) => {
          if (res.data.status === '1' && res.data.lives.length > 0) {
            const live = res.data.lives[0];
             weather.value = live.weather;
             temperature.value = live.temperature;
             humidity.value = live.humidity;
             windPower.value = live.windpower;
             windDirection.value = live.winddirection;
             weatherIcon.value =  getWeatherIcon(live.weather);
			 
          }
		  console.log(res);
        },
        complete: () => {
           getWeatherForecast();
        }
      });
    };
    
    // 获取天气预报
    const getWeatherForecast = () => {
      uni.request({
        url: `https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${adcode.value}&extensions=all`,
        success: (res) => {
          if (res.data.status === '1' && res.data.forecasts.length > 0) {
             forecasts.value = res.data.forecasts[0].casts.slice(0, 3);
          }
        },
        complete: () => {
           loading.value = false;
        }
      });
    };
    
    // 根据天气状况获取图标
    const getWeatherIcon = (weather:any) => {
      const icons = {
        '晴': '/static/weather/sunny.png',
        '多云': '/static/weather/cloudy.png',
        '阴': '/static/weather/overcast.png',
        '雨': '/static/weather/rain.png',
        '雪': '/static/weather/snow.png',
        // 其他天气类型...
      };
      return icons[weather] || '/static/weather/unknown.png';
    };
	const goBack= () => {
	        
	    uni.navigateBack()
	};
  
</script>
<style>
.weather-container {
  padding: 20rpx;
  min-height: 100vh;
  background: linear-gradient(to bottom, #4a90e2, #87CEFA);
  color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
}

.city {
  font-size: 36rpx;
  font-weight: bold;
}

.refresh {
  font-size: 28rpx;
  padding: 10rpx 20rpx;
  background: rgba(255,255,255,0.2);
  border-radius: 30rpx;
}

.current-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40rpx 0;
}

.weather-icon {
  width: 150rpx;
  height: 150rpx;
}

.temperature {
  font-size: 80rpx;
  font-weight: bold;
  margin: 10rpx 0;
}

.weather-desc {
  font-size: 32rpx;
}

.weather-details {
  display: flex;
  justify-content: space-around;
  margin: 40rpx 0;
  padding: 30rpx 0;
  background: rgba(255,255,255,0.1);
  border-radius: 20rpx;
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.detail-item text:first-child {
  font-size: 28rpx;
  opacity: 0.8;
  margin-bottom: 10rpx;
}

.detail-item text:last-child {
  font-size: 32rpx;
  font-weight: bold;
}

.forecast {
  margin-top: 40rpx;
}

.forecast-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25rpx 30rpx;
  border-bottom: 1rpx solid rgba(255,255,255,0.1);
}

.forecast-icon {
  width: 60rpx;
  height: 60rpx;
}

.loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>