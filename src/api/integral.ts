import { http } from "@/utils/request"; // 【注意】修正了原代码 utiles 的拼写错误

/** 积分商城 - 轮播图 */
export const integralGetBanner = (data?: any) => 
  http.post("womalljf/getAdvertisementSpot", data);

/** 积分商城 - 爆款排名 */
export const integralGetHot = (data?: any) => 
  http.post("womalljf/scoreQueryRecommendGoodsList", data);

/** 积分商城 - 商品分类 */
export const integralFirstLevel = (data?: any) => 
  http.post("womalljf/scoreQueryFirstLevList", data);

/** 积分商城 - 商品分类下的商品列表 */
export const integralGoodsList = (data?: any) => 
  http.post("womalljf/scoreSearchGoodsList", data);

/** 积分商城 - 立即兑换 */
export const integralExchangeGoods = (data?: any) => 
  http.post("womalljf/exchangeGoods", data);

/** 积分商城 - 立即兑换-获取默认地址 */
export const integralLoadAddress = (data?: any) => 
  http.post("womalljf/getAddressData", data);

/** 积分商城 - 去下单 */
export const integralGetOrders = (data?: any) => 
  http.post("womalljf/scoreOrderSubmit", data);

/** 积分商城 - 获取支付链接 */
export const integralGetPayURL = (data?: any) => 
  http.post("womalljf/orderNosPay", data);
  
// 登录
export const qunyuanLogin = (data?:any) =>
	http.post("auth/login",data);
	
//首页消息	
export const homeGetMessage = (data?:any) =>
	http.post("com/message/notice/queryNoticeList",data);


