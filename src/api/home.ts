import { http } from "@/utils/request"; 

//首页，消息
export const homeGetMessage = (data?: any) => 
  http.post("com/message/notice/queryNoticeList", data);
  
export const queryVersion = (data?: any) =>
	http.post("version/queryVersion", data);
  
export const freshToken = (data?: any) =>
	http.get("users/freshToken", data);  
	  

export const MainPageBannerList = (data?: any) =>
	http.post("Advert/AppAdvertPlace", data);  