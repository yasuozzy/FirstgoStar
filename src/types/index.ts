// 经纬度点类型
export interface GeoPoint {
  longitude: number
  latitude: number
}

// 距离单位（使用字面量联合类型）
export type DistanceUnit = 'km' | 'm'