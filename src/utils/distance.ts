/**
 * 计算两个经纬度坐标之间的距离（单位：米）
 * @param pos1 位置1 { latitude, longitude }
 * @param pos2 位置2 { latitude, longitude }
 * @returns 距离（米）
 */
export function calculateDistance(
  pos1: { latitude: number | string; longitude: number | string },
  pos2: { latitude: number | string; longitude: number | string }
): number {
  if (!pos1 || !pos2 || pos1.latitude == null || pos1.longitude == null || pos2.latitude == null || pos2.longitude == null) {
    return 0;
  }

  const lat1 = Number(pos1.latitude);
  const lon1 = Number(pos1.longitude);
  const lat2 = Number(pos2.latitude);
  const lon2 = Number(pos2.longitude);

  if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) {
    return 0;
  }

  const R = 6371000; // 地球半径（米）
  const radLat1 = (lat1 * Math.PI) / 180;
  const radLat2 = (lat2 * Math.PI) / 180;
  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * 格式化距离显示
 * @param meters 距离（米）
 * @returns 格式化后的字符串，如 "500m" 或 "1.2km"
 */
export function formatDistance(meters: number): string {
  // if (meters == null || isNaN(meters)) return '未知距离';
  // if (meters < 1000) {
  //   return `${Math.round(meters)}m`;
  // }
  // return `${(meters / 1000).toFixed(1)}km`;
  if (meters == null || isNaN(meters)) return '-- 米';
    
  // 2. 直接返回整数 + 'm'（不需要再判断是否小于1000）
  // 注意：如果后台返回 1500，这里显示 "1500m"，与后台数值一一对应
  return `${Math.round(meters)}m`;
}
