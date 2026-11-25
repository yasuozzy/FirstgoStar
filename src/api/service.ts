import { http } from "@/utils/request"; // 【注意】修正了原代码 utiles 的拼写错误


//通知
export const serviceNotice = (data?: any) => 
  http.post("message/comment/appQueryFlow", data);
  
//通知详情
export const serviceNoticeDetail = (data?: any) => 
  http.post("message/comment/appFlowDetail", data);

//通知详情，评论列表
export const serviceNoticeDetailCommentList = (data?: any) => 
  http.post("message/comment/appCommentDetail", data);

//政务网址
export const serviceZhengWu = (data?: any) => 
  http.post("government/queryGovernmentListapp", data);

//智慧养老
export const serviceSmart = (data?: any) => 
  http.post("lifeService/queryLifeServiceListapp", data);

//发布列表
export const serviceRelese = (data?: any) => 
  http.post("Announce/AppRecommendAnnnounce", data);

//发布详情
export const serviceReleseDet = (data?: any) => 
  http.post("Announce/AppAnnounceDetail", data);

//发布详情评论
export const serviceReleseDetComment = (data?: any) => 
  http.post("Announce/AppAnnnounceRecly", data);
  
//发布列表，收藏
export const serviceReleseCollect = (data?: any) => 
  http.post("Announce/AppaddAnnounceCollect", data);
  
//发布列表，取消收藏
export const serviceReleseCancelCollect = (data?: any) => 
  http.post("Announce/AppCancelAnnounceCollect", data);

//发布列表，点赞
export const serviceReleseDianZan = (data?: any) => 
  http.post("Announce/AppAnnounceGive", data);
  
//发布列表，取消点赞
export const serviceReleseCancelDianZan = (data?: any) => 
  http.post("Announce/AppCancelAnnounceGive", data);
  
//发布，普通发帖
export const serviceRelesenormalTie = (data?: any) => 
  http.post("Announce/AppCommonAnnnounce", data);

//发布，其他发帖
export const serviceReleseotherTie = (data?: any) => 
  http.post("Announce/AppRestsAnnnounce", data);


//缴费，缴费明细，历史记录
export const servicePayHistoryData = (data?: any) => 
  http.post("ArrearsCollect/queryPayMent", data);

//缴费，缴费明细，其他数据
export const servicePayOtherData = (data?: any) => 
  http.post("ArrearsCollect/queryPaymentDetailsList", data);

//缴费，缴费明细，其他数据
export const servicePayOtherDataDetail = (data?: any) => 
  http.post("ArrearsCollect/queryPaymentDetails", data);
  
//缴费，缴费明细，预缴，充值
export const serviceyuJiaoChongZhi = (data?: any) => 
  http.post("jdMeter/getJdAdPayList", data);

//缴费，缴费明细，预缴，充值详情
export const serviceYJChongZhiDet = (data?: any) => 
  http.post("jdMeter/getJdAdPayInfo", data);

//缴费，缴费明细，预缴，扣款
export const serviceyuJiaoKouKuan = (data?: any) => 
  http.post("jdMeter/getJdAdCutList", data);
  
//缴费，缴费明细，预缴，扣款详情
export const serviceYJKouKuanDet = (data?: any) => 
  http.post("jdMeter/getJdAdCutInfo", data);
  

//缴费，缴费明细，退款
export const serviceCancelMoney = (data?: any) => 
  http.post("refundApply/getMyAppplyList", data);
  
//缴费，缴费明细，退款详情
export const serviceCancelMoneyDet = (data?: any) => 
  http.post("refundApply/getApplyInfo", data);

//缴费，欠费
export const serviceQianFeiList = (data?: any) => 
  http.post("ArrearsCollect/queryArrearsCollect", data);

//缴费，欠费,在线缴纳
export const serviceQianFeiJiaoNa = (data?: any) => 
  http.post("ArrearsCollect/costFlag", data);

//缴费，欠费,在线缴纳,确认订单
export const serviceQianFeiJiaoNaConfirm = (data?: any) => 
  http.post("ArrearsCollect/costAggregation", data);

//缴费，租金
export const serviceRentMoney = (data?: any) => 
  http.post("RentExpenses/queryRentExpenseList", data);

//缴费，租金，房屋详情
export const serviceRentMoneyPay = (data?: any) => 
  http.post("RentExpenses/queryRentExpenseDetail", data);

//缴费，房屋详情，在线支付
export const serviceRentMoneyPayOnline = (data?: any) => 
  http.post("RentExpenses/innnerPayRentExpenses", data);

//缴费，房屋详情，在线支付，历史数据
export const serviceRentMoneyPayHistory = (data?: any) => 
  http.post("RentExpenses/queryPaymentRentList", data);

//缴费，预充，预充项目
export const serviceYuChongItemList = (data?: any) => 
  http.post("ArrearsCollect/queryChargeList", data);


//缴费，预充，电费是否欠费
export const serviceElectricOweMoney = (data?: any) => 
  http.post("ArrearsCollect/queryChargeTime", data);

//缴费，预充，去缴费
export const serviceInnnerPay = (data?: any) => 
  http.post("ArrearsCollect/innnerPay", data);

//缴费，余量查询
export const serviceRemainElectWater = (data?: any) => 
  http.post("eleremain/queryMeterUsage", data);

//缴费，退款
export const serviceCancelMoneyMain = (data?: any) => 
  http.post("refundApply/submitApplyInfo", data);


//缴费，预缴，余额充值
export const serviceYuJiaoYueChongZhi = (data?: any) => 
  http.post("jdMeter/getHseBalance", data);

//切换房产，房产列表
export const serviceChangeHouseType = (data?: any) => 
  http.post("houseInformation/selectBoundHouse", data);


//切换房产，切换
export const serviceGoToChange = (data?: any) => 
  http.post("houseInformation/mainHouse", data);

//切换房产，刷新token
export const serviceRefreshToken = (data?: any) => 
  http.post("users/freshToken", data);

//服务-社群-社群，获取分类列表
export const serviceGetSheQunGrid = (data?: any) => 
  http.post("chatGroup/queryChatTypeList", data);

//服务-社群-社群，第一个网格分类下的数据
export const serviceGetWangGeList = (data?: any) => 
  http.post("grid/getGridList", data);

//服务-社群-社群，第二个已关注分类下的数据
export const serviceWatchList = (data?: any) => 
  http.post("chatGroup/queryGroupList", data);


//服务-社群-社群，除网格，已关注分类下的数据
export const serviceSheQunOtherList = (data?: any) => 
  http.post("chatGroup/queryGroupList", data);

//服务-社群-社群，网格详情
export const serviceWangGeDetail = (data?: any) => 
  http.post("grid/getGridInfo", data);

//服务-社群-社群，加关注
export const serviceAddAttention = (data?: any) => 
  http.post("chatGroup/addfollowGroup", data);

//服务-社群-社群，其他分类的列表详情
export const serviceSgeQunOtherDetail = (data?: any) => 
  http.post("chatGroup/groupDetail", data);

//服务-社群-意见征集，列表
export const serviceOpinionCollectList = (data?: any) => 
  http.post("opinion/queryOpinionCollectList", data);


//服务-社群-意见征集，详情
export const serviceOpinionCollectDetail = (data?: any) => 
  http.post("opinion/getOpinionInfo", data);


//服务-社群-意见征集，填写类提交数据
export const serviceOpinionFillUp = (data?: any) => 
  http.post("opinion/fillOpinionCollectionUserJoin", data);

//服务-社群-意见征集，选择类提交数据
export const serviceOpinionChoosen = (data?: any) => 
  http.post("opinion/chooseOpinionCollectionUserJoin", data);

//服务-社群-意见征集，我的征集列表
export const serviceMyOpinionCollectList = (data?: any) => 
  http.post("opinion/queryMyJoinOpinionCollectList", data);

//服务-社群-意见征集，我的征集详情
export const serviceMyOpinionCollectDetail = (data?: any) => 
  http.post("opinion/getMyJoinOpinionInfo", data);

//服务-社群-意见公示，列表
export const serviceGongShiList = (data?: any) => 
  http.post("opinion/queryUserOpinionCollectResList", data);


//服务-社群-意见公示，详情
export const serviceGongShiDetail = (data?: any) => 
  http.post("opinion/getRelOpinColResInfo", data);


//服务-社群-选民登记，列表
export const serviceXuanMinList = (data?: any) => 
  http.post("elector/queryElectorCheckInList", data);

//服务-社群-选民登记，详情
export const serviceXuanMinDetail = (data?: any) => 
  http.post("elector/getElectorCheckInInfo", data);

//服务-社群-选民登记，我的登记，列表
export const serviceMyXuanMinList = (data?: any) => 
  http.post("elector/queryMyJoinElectorList", data);

//服务-社群-选民登记，我的登记，详情
export const serviceMyXuanMinDetail = (data?: any) => 
  http.post("elector/getMyJoinElectorInfo", data);

//服务-社群-选民登记，详情，去投票
export const serviceXuanMinVoting = (data?: any) => 
  http.post("elector/fillElectorUserJoin", data);

//服务-社群-选民公示，列表
export const serviceXuanMinGongShiList = (data?: any) => 
  http.post("elector/queryUserElectorResList", data);

//服务-社群-选民公示，详情
export const serviceXuanMinGongShiDetail = (data?: any) => 
  http.post("elector/getRelElectorResInfo", data);
  
//服务-社群-去选举，列表
export const serviceGoToElectList = (data?: any) => 
  http.post("election/queryElectionCollectList", data);

//服务-社群-去选举，详情
export const serviceGoToElectDetail = (data?: any) => 
  http.post("election/getElectionInfo", data);

//服务-社群-去选举，详情，投票
export const serviceGoToElectDetailVoting = (data?: any) => 
  http.post("election/chooseElectionUserJoin", data);
  
//服务-社群-去选举，我的选举，列表
export const serviceMyGoToElectList = (data?: any) => 
  http.post("election/queryMyJoinElectionCollectList", data);
  
//服务-社群-去选举，我的选举，详情
export const serviceMyGoToElectDetail = (data?: any) => 
  http.post("election/getMyJoinElectionInfo", data);

//服务-社群-选举公示，列表
export const serviceElectGongShiList = (data?: any) => 
  http.post("election/queryUserElectionCollectResList", data);

//服务-社群-选举公示，详情
export const serviceElectGongShiDetail = (data?: any) => 
  http.post("election/queryUserElectionCollectResInfo", data);

//服务-社群-去投票，列表
export const serviceGoToVoteList = (data?: any) => 
  http.post("vote/queryMarchVoteMainListForPage", data);

//服务-社群-去投票，详情
export const serviceGoToVoteDetail = (data?: any) => 
  http.post("vote/getUserVoteInfo", data);

//服务-社群-去投票，提交投票信息
export const serviceGoToVoteSetUp = (data?: any) => 
  http.post("vote/chooseVoteUserJoin", data);

//服务-社群-去投票，我的投票，列表
export const serviceGoToVoteMyList = (data?: any) => 
  http.post("vote/queryMyJoinOpinionVoteList", data);

//服务-社群-去投票，我的投票，详情
export const serviceGoToVoteMyDetail = (data?: any) => 
  http.post("vote/getMyJoinVoteInfo", data);

//服务-社群-投票公示，列表
export const serviceVoteGongShiList = (data?: any) => 
  http.post("vote/queryUserVoteResList", data);

//服务-社群-投票公示，详情
export const serviceVoteGongShiDetail = (data?: any) => 
  http.post("vote/getMyRelVoteColResInfo", data);


//服务-收发，我的收件1，我的寄件2，列表
export const serviceReceiveMyGetIn = (data?: any) => 
  http.post("waybill/querySendReceiveList", data);

//服务-收发，我的收件1，我的寄件2，详情
export const serviceReceiveMyGetInDetail = (data?: any) => 
  http.post("waybill/kdTimelyQuery", data);

//服务-收发，我的收件1，我的寄件2，我要发件，选择地址
export const serviceReceiveMyGetInAddress = (data?: any) => 
  http.post("address/getAddressList", data);

//服务-收发，我的收件1，我的寄件2，我要发件，选择地址,默认地址
export const serviceReceiveAddressDefaut = (data?: any) => 
  http.post("address/editDefaultAddress", data);

//服务-收发，我的收件1，我的寄件2，我要发件，快递公司列表
export const serviceReceiveShipperCode = (data?: any) => 
  http.post("waybill/queryShipperCode", data);

//服务-收发，我的收件1，我的寄件2，我要发件，下单
export const serviceReceiveSentOrders = (data?: any) => 
  http.post("waybill/kdCreateOrder", data);

//服务-社创群苑-志愿点单，点单类型
export const serviceSheChaungOrder = (data?: any) => 
  http.post("spritOrder/getOrderType", data);


//服务-社创群苑-志愿点单，提交
export const serviceSheChaungOrderSetUp = (data?: any) => 
  http.post("spritOrder/spritOrderSubmit", data);

//服务-社创群苑-爱心榜，个人
export const serviceLoveBangPersonal = (data?: any) => 
  http.post("spritActivity/queryLoveListUser", data);
  
//服务-社创群苑-爱心榜，组织
export const serviceLoveBangOrganization = (data?: any) => 
  http.post("spritActivity/queryLoveListOrg", data);

//服务-社创群苑-爱心榜，积分捐赠
export const serviceLoveBangDonateList = (data?: any) => 
  http.post("spritActivity/queryDonatedList", data);

//服务-社创群苑-找活动，列表
export const serviceFindActivityList = (data?: any) => 
  http.post("spritActivity/queryActivityList", data);

//服务-社创群苑-找活动，详情
export const serviceFindActivityDetail = (data?: any) => 
  http.post("spritActivity/getActivityInfo", data);


//服务-社创群苑-找活动，详情,已报名志愿者
export const serviceFindActivityDetailVolunteer = (data?: any) => 
  http.post("spritActivity/queryActivityVolList", data);
  
  
//服务-社创群苑-找活动，详情,留言咨询列表
export const serviceFindActivityLeaveMessage = (data?: any) => 
  http.post("spritActivity/queryActMyleaveWordList", data);
  

//服务-社创群苑-找活动，详情,留言咨询,提交留言
export const serviceFindActivitySetUpMessage = (data?: any) => 
  http.post("spritActivity/leaveWord", data);

//服务-社创群苑-找活动，详情,获取用户志愿者状态信息且信息是否完整，点击加入组织或者报名时先走该接口
export const serviceFindActivityUserYnVolAndInfo = (data?: any) => 
  http.post("spritOrganization/getUserYnVolAndInfoComplete", data);

//服务-社创群苑-找活动，详情,获取街道信息
export const serviceFindActivitygetStreetList = (data?: any) => 
  http.post("spritVolunteers/getStreetList", data);

//服务-社创群苑-找活动，详情,获取服务类型
export const serviceFindActivitygetServiceList = (data?: any) => 
  http.post("spritOrganization/getServiceTypeList", data);

//服务-社创群苑-找活动，详情,获取验证码
export const serviceFindActivityGetCode = (data?: any) => 
  http.post("auth/getCheckCode", data);

//服务-社创群苑-找活动，详情,志愿者申请
export const serviceFindActivityTiJiaoData = (data?: any) => 
  http.post("spritVolunteers/userVolunteersApply", data);

//服务-社创群苑-找活动，详情,协会详情
export const serviceFindActivityOrgDetail = (data?: any) => 
  http.post("spritOrganization/getOrganizationInfo", data);

//服务-社创群苑-找活动，详情,协会详情，加入组织，status= 2
export const serviceFindActivityOrgDetailJoinParty = (data?: any) => 
  http.post("spritOrganization/userOrganizationApply", data);

//服务-社创群苑-找活动，详情,协会详情，获取志愿者信息
export const serviceFindActivityOrgDetailPersonal = (data?: any) => 
  http.post("spritPersonal/getPersonalInfo", data);

//服务-社创群苑-找活动，详情,协会详情，确认报名活动
export const serviceFindActivityConfirmJoinAct = (data?: any) => 
  http.post("spritActivity/userActivityApply", data);


//服务-社创群苑-找活动，详情,协会详情，取消报名活动
export const serviceFindActivityCancelJoinAct = (data?: any) => 
  http.post("spritActivity/userActivityCancle", data);

//服务-社创群苑-找活动，详情,协会详情，提交志愿者信息
export const serviceFindActivityOrgDetailSetUp = (data?: any) => 
  http.post("spritPersonal/updatePersonalInfo", data);
  
//服务-社创群苑-找组织，列表
export const serviceFindOrganizationList = (data?: any) => 
  http.post("spritOrganization/queryOrganizationList", data);

//服务-社创群苑-找组织，退出组织
export const serviceFindOrganizationExitOrg = (data?: any) => 
  http.post("spritOrganization/userOrganizationExit", data);

//服务-社创群苑-活动签到
export const serviceActivitySign = (data?: any) => 
  http.post("spritActivity/queryTodayMyActList", data);

//服务-社创群苑-志愿者申请，志愿者状态
export const serviceActivityUserStatus = (data?: any) => 
  http.post("spritVolunteers/getUserVolunteersInfo", data);

//服务-社创群苑-智慧养老，医疗卫生
export const serviceSmartFeedOlderMedical = (data?: any) => 
  http.post("vendors/queryVendorsListByKind", data);


//服务-社创群苑-智慧养老，医疗卫生
export const serviceSmartFeedOlderMedicalDet = (data?: any) => 
  http.post("vendors/queryVendorsInfo", data);

//服务-社创群苑-智慧养老，医疗卫生，本店在售
export const serviceSmartFeedOlderMedicalGoodsList = (data?: any) => 
  http.post("lifeServiceGood/upAndDownGoodList", data);

//服务-社创群苑-智慧养老，医疗卫生，本店在售,购买，确认订单页面，获取商品页
export const serviceSmartFeedOlderMedicalConfirmOrder = (data?: any) => 
  http.post("lifeServiceGood/queryLfsGoodById", data);

//服务-社创群苑-智慧养老，医疗卫生，本店在售,购买，确认订单页面，获取商品页,下单
export const serviceSmartFeedOlderMedicalSureOrder = (data?: any) => 
  http.post("lifeServiceOrder/submitOrder", data);

//服务-社创群苑-智慧养老，医疗卫生，本店在售,购买，确认订单页面，获取商品页,获取支付URL
export const serviceSmartFeedOlderMedicalGetOrderPay = (data?: any) => 
  http.post("lifeServiceOrder/orderPay", data);
  

//服务-社创群苑-智慧养老，居家照料，去签到，判断判断当前登录用户是否有正在进行中的签到列表 没有数据时返回空集合，提示暂无签到工单
export const serviceSmartFeedGoToSign = (data?: any) => 
  http.post("serviceOld/toSign", data);

//服务-社创群苑-智慧养老，居家照料，获取签到信息
export const serviceSmartFeedGetSignInfo = (data?: any) => 
  http.post("serviceOld/getByServiceOrderId", data);

//服务-社创群苑-智慧养老，居家照料，服务工单
export const serviceSmartServiceOrderList = (data?: any) => 
  http.post("serviceOld/queryServiceOrderList", data);

//服务-社创群苑-智慧养老，居家照料，接单
export const serviceSmartServiceOrdertoOrder = (data?: any) => 
  http.post("serviceOld/toOrder", data);

//服务-社创群苑-房源信息，租房，住宅信息
export const serviceHouseInfoHouseList = (data?: any) => 
  http.post("houseRenting/queryHouseRentingList", data);

//服务-社创群苑-房源信息，租房，商铺信息
export const serviceHouseInfoShopList = (data?: any) => 
  http.post("shoprenttenant/getShopRentList", data);

//服务-社创群苑-房源信息，租房，住宅信息,详情
export const serviceHouseInfoHouseDetail = (data?: any) => 
  http.post("houseRenting/queryHouseRentingView", data);

//服务-社创群苑-房源信息，租房，住宅信息,详情,添加收藏，operateType=0，取消收藏，operateType=1，添加收藏
export const serviceHouseInfoHouseAddColletion = (data?: any) => 
  http.post("houseRenting/addHouseRentingCollection", data);

//服务-社创群苑-房源信息，租房，住宅信息,详情,举报，举报原因
export const serviceHouseInfoHouseJuBaoReason = (data?: any) => 
  http.post("houseRentalRelease/queryRentalDict", data);

//服务-社创群苑-房源信息，租房，住宅信息,详情,举报，提交举报
export const serviceHouseInfoHouseSetUpJuBao = (data?: any) => 
  http.post("houseRenting/addHouseRentingReport", data);
  
//服务-社创群苑-房源信息，租房，商铺信息,详情
export const serviceHouseInfoShopDetail = (data?: any) => 
  http.post("shoprenttenant/getShopRentInfo", data);

//服务-社创群苑-房源信息，买房，住宅信息
export const serviceHouseInfoBuyHouseList = (data?: any) => 
  http.post("houseBuying/queryHouseBuyingList", data);

//服务-社创群苑-房源信息，买房，住宅信息
export const serviceHouseInfoBuyHouseDetail = (data?: any) => 
  http.post("houseBuying/queryHouseBuyingView", data);

//服务-社创群苑-房源信息，买房，住宅信息,详情,添加收藏，operateType=0，取消收藏，operateType=1，添加收藏
export const serviceHouseInfoBuyHouseAddColletion = (data?: any) => 
  http.post("houseBuying/addHouseBuyingCollection", data);

//服务-社创群苑-房源信息，买房，商铺信息
export const serviceHouseInfoBuyShopList = (data?: any) => 
  http.post("shopSalelandlord/getShopSaleList", data);

//服务-社创群苑-房源信息，买房，商铺信息
export const serviceHouseInfoBuyShopDetail = (data?: any) => 
  http.post("shopSalelandlord/getShopSaleInfo", data);

//服务-社创群苑-房源信息，买房，商铺信息,详情,添加收藏，operateType=0，取消收藏，operateType=1，添加收藏
export const serviceHouseInfoBuyShopAddColletion = (data?: any) => 
  http.post("shopSalelandlord/addShopSaleCollection", data);

//服务-社创群苑-房源信息，租房，我的，我浏览的
export const serviceHouseMineReview = (data?: any) => 
  http.post("houseRenting/queryMyBrowsingHouseRentingList", data);

//服务-社创群苑-房源信息，租房，我的，我收藏的
export const serviceHouseMineCollections = (data?: any) => 
  http.post("houseRenting/queryMyCollectionHouseRentingList", data);
  
//服务-社创群苑-房源信息，租房，我的，我举报的
export const serviceHouseMineReported = (data?: any) => 
  http.post("houseRenting/queryMyReportHouseRentingList", data);

//服务-社创群苑-房源信息，买房，住宅，我的，我浏览的
export const serviceBuyHouseMineReview = (data?: any) => 
  http.post("houseBuying/queryMyBrowsingHouseBuyingList", data);

//服务-社创群苑-房源信息，买房，住宅，我的，我收藏的
export const serviceBuyHouseMineCollections = (data?: any) => 
  http.post("houseBuying/queryMyCollectionHouseBuyingList", data);

//服务-社创群苑-房源信息，买房，住宅，我的，我举报的
export const serviceBuyHouseMineReported = (data?: any) => 
  http.post("houseBuying/queryMyReportHouseBuyingList", data);

//服务-社创群苑-房源信息，买房，商铺，我的，我浏览的
export const serviceBuyShopMineReview = (data?: any) => 
  http.post("shopSalelandlord/queryMyBrowseShopSaleList", data);

//服务-社创群苑-房源信息，买房，商铺，我的，我收藏的
export const serviceBuyShopMineCollections = (data?: any) => 
  http.post("shopSalelandlord/queryMyColShopSaleList", data);

//服务-社创群苑-房源信息，买房，商铺，我的，我举报的
export const serviceBuyShopMineReported = (data?: any) => 
  http.post("shopSalelandlord/queryMyReportShopSaleList", data);

//服务-社创群苑-房源信息，买房，商铺，我的，我的租房
export const serviceBuyShopMineRentHouse = (data?: any) => 
  http.post("shoprenttenant/queryMyShopRentList", data);

//服务-社创群苑-房源信息，买房，商铺，我的，我的租房,退押金
export const serviceBuyShopMineRentHouseCancelMoney = (data?: any) => 
  http.post("shoprenttenant/applyDepositRefund", data);

//服务-社创群苑-房源信息，买房，商铺，我的，我的租房,去缴纳
export const serviceBuyShopMineRentHouseJiaoNa = (data?: any) => 
  http.post("shoprenttenant/shopRentDepositPay", data);

//服务-社创群苑-房源信息，买房，商铺，我的，我的租房,详情
export const serviceBuyShopMineRentHouseDetail = (data?: any) => 
  http.post("shoprenttenant/getMyShopRentInfo", data);


//服务-平台服务，获取三个项目，中介平台，平台供应，平台报修
export const serviceGetPingTaiServiceRole = (data?: any) => 
  http.post("AppAuthority/queryAppUserRole", data);
  
//服务-平台报修，获取公共设施
export const serviceGetPingTaiRepairSheShi = (data?: any) => 
  http.post("AppWorkOrder/AppRepairTypeList", data);

//服务-平台报修，获取所在管理处
export const serviceGetPingTaiManageMent = (data?: any) => 
  http.post("platformEmergency/queryOffice", data);



//服务-平台报修，提交
export const serviceGetPingTaiSetUp = (data?: any) => 
  http.post("AppWorkOrder/AppWorkOraderRegister", data);

//服务-平台报修，历史记录
export const serviceGetPingTaiHistoryData = (data?: any) => 
  http.post("AppWorkOrder/AppWorkOraderForForPage", data);

//服务-平台报修，历史记录,获取详情之前
export const serviceGetPingTaiHistoryDataDetail = (data?: any) => 
  http.post("AppWorkOrder/AppGetWorkOrder", data);
  
//回收 置换tab分类
export const getRecyclerExchangeTab = (data?: any) => 
  http.post("idle/AppidleTypeAll", data);
  
//回收商品列表
export const getRecyclerList = (data?: any) => 
  http.post("idle/recycle/AppRecycleForPage", data);
  
//置换商品列表
export const getExChangeList = (data?: any) => 
  http.post("idle/exchange/AppExChangeForPage", data);

//置换打电话
export const getExChangeCall = (data?: any) => 
  http.post("idle/exchange/addExChangeContact", data);

//热搜关键词
export const getSearchWord = (data?: any) => 
  http.post("idle/exchange/AppItemSearhByExchange", data);

//获取置换的搜索结果
export const getexchangeSearch = (data?: any) => 
  http.post("idle/exchange/AppExChangeForPage", data);

//获取回收的搜索结果
export const getRecyclerSearch = (data?: any) => 
  http.post("idle/recycle/AppRecycleForPage", data);
  
//我联系的
export const getRecyclerMyConnect = (data?: any) => 
  http.post("idle/AppItemContact", data);

//联系我的
export const getConnectMe = (data?: any) => 
  http.post("idle/AppItemContactReception", data);

//置换删除
export const deleteExChange = (data?: any) => 
  http.post("idle/exchange/ExChangeDel", data);

//置换上架
export const ExChangeUpper = (data?: any) => 
  http.post("idle/exchange/ExChangePutaway", data);


//置换上 下架列表
export const getExChangeUpDownList = (data?: any) => 
  http.post("idle/exchange/AppExChangeByUserForPage", data);

//置换下架
export const ExChangeDown = (data?: any) => 
  http.post("idle/exchange/ExChangeSoldOut", data);

//回收上下架列表
export const recycleUpDownList = (data?: any) => 
  http.post("idle/recycle/AppRecycleByUserForPage", data);

//回收下架
export const recycleDown = (data?: any) => 
  http.post("idle/recycle/RecycleSoldOut", data);

//同意或拒绝公益回收  是否同意(2同意3拒绝)
//  map.put("recycleId", resultBean.benefitrecycleEntity.recycleId);
// map.put("id", resultBean.benefitrecycleEntity.id);
// map.put("userId", App.getUid());
// map.put("isConsent", s);
export const recycleacceptOrRefuse = (data?: any) => 
  http.post("idle/recycle/UserBenefitrecycle", data);

//删除回收            map.put("recycleId", id);
export const recycleDelete = (data?: any) => 
  http.post("idle/recycle/RecycleDel", data);

//上架回收            map.put("recycleId", id);
export const recycleUp = (data?: any) => 
  http.post("idle/recycle/RecyclePutaway", data);

//我购买回收  提醒发货            map.put("authorToken", App.getToken()); map.put("orderId", id);
export const remindOrder = (data?: any) => 
  http.post("estate/recycleOrder/remindSendRecycleOrder", data);
  
//我购买回收  支付            map.put("orderNo", id);  map.put("userId", App.getUid());
export const payOrder = (data?: any) => 
  http.post("common/payment/innnerRecycleOrderPay", data);
  
//确认收货 取消订单     0：取消订单 5：确认收货      map.put("status", String.valueOf(i)); map.put("orderId", id);
export const changeOrder = (data?: any) => 
  http.post("estate/recycleOrder/orderOver", data);
  
//购买的回收订单列表
//
//map.put("authorToken", App.getToken());
// map.put("status", status);
//		map.put("userId", App.getUid());
//	map.put("serveType", "1");  1 购买的                 2 发布的
//	map.put("page", "1");
//	map.put("size", String.valueOf(Constant.MAX_SIZE));
//
export const recycleOrderList = (data?: any) => 
  http.post("estate/recycleOrder/queryOrderList", data);

//购买的回收售后列表
//
//map.put("userId", App.getUid());
//	map.put("page", String.valueOf(mPage++));
//	map.put("serveType", "1");  buy            2 pub
//	map.put("size", String.valueOf(Constant.MAX_SIZE));

export const RecycleAfsOrderList = (data?: any) => 
  http.post("estate/recycleOrder/queryAfsOrderList", data);

//回收详情 
//
//map.put("userId", App.getUid());
//	map.put("RecycleId", mId);
//	        
//	       

export const RecycleAProductDetail = (data?: any) => 
  http.post("idle/recycle/AppRecycleDetail", data);
  
//回收详情 评论列表
//	map.put("RecycleId", mId);
//	        map.put("page", "1");
//	        map.put("size", "100");

export const RecycleAProductCommentList = (data?: any) => 
  http.post("idle/recycle/AppRecycleReclyForPage", data);
  
//回收购买 创建订单
// map.put("buyer_id", App.getUid());
// map.put("buyer_name", TextUtils.isEmpty(App.getRealName()) ? App.getNickName() : App.getRealName());
// map.put("goods_id", mRecycleEntityBean.id);
// map.put("seller_id", mRecycleEntityBean.userId);
// map.put("seller_name", mRecycleEntityBean.username);
// map.put("note", "");
// if (mBean == null) {
// 	map.put("received_adress", mRecBuyAddressBean.result.address);
// 	map.put("received_area", mRecBuyAddressBean.result.area_name);
// 	map.put("received_city", mRecBuyAddressBean.result.city_name);
// 	map.put("received_mobile", mRecBuyAddressBean.result.mobile);
// 	map.put("received_name", mRecBuyAddressBean.result.accept_name);
// 	map.put("received_province", mRecBuyAddressBean.result.province_name);
// } else {
// 	map.put("received_adress", mBean.address);
// 	map.put("received_area", mBean.area_name);
// 	map.put("received_city", mBean.city_name);
// 	map.put("received_mobile", mBean.mobile);
// 	map.put("received_name", mBean.accept_name);
// 	map.put("received_province", mBean.province_name);
// }

export const RecycleCreatOrder = (data?: any) => 
  http.post("estate/recycleOrder/createOrder", data);
  
//回收支付订单
export const Recyclepayorder = (data?: any) => 
  http.post("common/payment/innnerRecycleOrderPay", data);


//置换详情
//
//map.put("userId", App.getUid());
//	map.put("exChangeId", mId);
//	        
//	       

export const ExchangeProductDetail = (data?: any) => 
  http.post("idle/exchange/getExChangeInfo", data);

//置换详情 评论
//
//       map.put("exChangeId", mId);
//	        map.put("page", "1");
//	        map.put("size", "100");        
//	       

export const ExchangeProductCommentList = (data?: any) => 
  http.post("idle/exchange/AppRecycleReclyForPage", data);


export const addRecycleReply = (data?: any) => 
  http.post("idle/recycle/addRecycleReply", data);


//  map.put("acceptUserId", mAcceptUserId);
            // map.put("parentReplyId", mParentReplyId);
            // map.put("sendUserId", App.getUid());
            // map.put("exchangeId", mId);
            // map.put("replyContent", trim);

export const addReplyExChangeReply = (data?: any) => 
  http.post("idle/exchange/addReplyExChangeReply", data);


//  map.put("sendUserId", App.getUid());
//             map.put("exchangeId", mId);
//             map.put("replyContent", trim);


export const addExChangeReply = (data?: any) => 
  http.post("idle/exchange/addExChangeReply", data);



//置换详情 取消收藏
//
//       map.put("exChangeId", mId);
//	       map.put("userId", App.getUid());

export const ExchangeProductCancelCollect = (data?: any) => 
  http.post("idle/exchange/cancelExChangeCollect", data);
  
//置换详情 收藏
//       map.put("exChangeId", mId);
//	       map.put("userId", App.getUid());


export const ExchangeProductCollect = (data?: any) => 
  http.post("idle/exchange/addExChangeCollect", data);

//回收详情 收藏
//       map.put("exChangeId", mId);
//	       map.put("userId", App.getUid());


export const RecyclerProductCollect = (data?: any) => 
  http.post("idle/recycle/addExChangeCollect", data);

//提交置换商品
// map.put("managementId", App.getManageId());
// map.put("userId", App.getUid());
// map.put("estId", mTypeid);
// map.put("itemTitle", mGoodTitle);
// map.put("itemDescrption", mGoodDescribe);
// map.put("itemContentImgs", TextUtils.isEmpty(mImageurl) ? "" : mImageurl);

export const ExchangeProductcommit = (data?: any) => 
  http.post("idle/exchange/AppAddExChange", data);

//更新置换商品

// map.put("managementId", App.getManageId());
// map.put("id", mResultBean.id);
// map.put("userId", App.getUid());
// map.put("estId", mTypeid);
// map.put("itemTitle", mGoodTitle);
// map.put("itemDescrption", mGoodDescribe);
// map.put("itemContentImgs", TextUtils.isEmpty(mImageurl) ? "" : mImageurl);

export const ExchangeProductupdate = (data?: any) => 
  http.post("idle/exchange/AppUpExChange", data);
  
//更新回收商品

// map.put("managementId", App.getManageId());
// map.put("userId", App.getUid());
// map.put("estId", mTypeid);
// map.put("id", mEntityBean.id);
// map.put("recycleTitle", mGoodTitle);
// map.put("recycleContent", mGoodDescribe);
// map.put("recycleContentImgs", TextUtils.isEmpty(mImageurl) ? "" : mImageurl);
// map.put("recyclePrice", Double.valueOf(mGoodPrice).toString());
// map.put("freightPrice", Double.valueOf(mTrafficPrice).toString());
// map.put("isRefund", mIsReplace ? "1" : "2");
// map.put("isgoodRecovery", mIsRecovery ? "1" : "2");
// map.put("hostNo", App.getHostNo());
// map.put("cstType", App.getCstType());
// map.put("mobile", App.getPhone());

export const recycleProductupdate = (data?: any) => 
  http.post("idle/recycle/AppUpRecycle", data);
  

//提交回收商品
// map.put("managementId", App.getManageId());
// map.put("userId", App.getUid());
// map.put("estId", mTypeid);
// map.put("recycleTitle", mGoodTitle);
// map.put("recycleContent", mGoodDescribe);
// map.put("recycleContentImgs", TextUtils.isEmpty(mImageurl) ? "" : mImageurl);
// map.put("recyclePrice", Double.valueOf(mGoodPrice).toString());
// map.put("freightPrice", Double.valueOf(mTrafficPrice).toString());
// map.put("isRefund", mIsReplace ? "1" : "2");
// map.put("isgoodRecovery", mIsRecovery ? "1" : "2");
// map.put("hostNo", App.getHostNo());
// map.put("cstType", App.getCstType());
// map.put("mobile", App.getPhone());

export const recycleProductcommit = (data?: any) => 
  http.post("idle/recycle/AppAddRecycle", data);
  

//置换收藏列表
// mMap.put("userId", App.getUid());
// mMap.put("page", "1");
// mMap.put("size", String.valueOf(Constant.MAX_SIZE));


export const exchangeCololecList = (data?: any) => 
  http.post("idle/exchange/AppExChangeCollectForPage", data);

//回收收藏列表
// mMap.put("userId", App.getUid());
// mMap.put("page", "1");
// mMap.put("size", String.valueOf(Constant.MAX_SIZE));

export const recycleCololecList = (data?: any) => 
  http.post("idle/recycle/AppRecycleCollectForPage", data);

//置换取消收藏
// map.put("userId", App.getUid());
// map.put("exchangeIds", strings);

export const cancelExchangeCollect = (data?: any) => 
  http.post("idle/exchange/cancelExChangeCollects", data);
  
//回收取消收藏
// map.put("userId", App.getUid());
// map.put("recycleIds", strings);

export const cancelRecycleCollect = (data?: any) => 
  http.post("idle/recycle/cancelExChangeCollects", data);

//回收取消收藏
// map.put("userId", App.getUid());
// map.put("recycleIds", strings);
export const cancelRecycleCollec = (data?: any) => 
  http.post("idle/recycle/cancelExChangeCollect", data);



export const scoreAddressList = (data?: any) => 
  http.post("address/getAddressList", data);


export const scoreSaveAddress = (data?: any) => 
  http.post("address/saveAddress", data);
  

export const scoreGetAddress = (data?: any) => 
  http.post("address/getAddress", data);
  

export const scoreDelAddress = (data?: any) => 
  http.post("address/delAddress", data);
  

export const editDefaultAddress = (data?: any) => 
  http.post("address/editDefaultAddress", data);


export const recOrderDetail = (data?: any) => 
  http.post("estate/recycleOrder/goOrderDetail", data);

//服务，智慧养老，居家照料，去签到，获取服务内容列表
export const ServiceHomeCareGotoSignGetServiceList = (data?: any) => 
  http.post("serviceOld/getServiceContentInfoList", data);

//服务，智慧养老，居家照料，去签到，点击签到按钮
export const ServiceHomeCareGotoSignToRecord = (data?: any) => 
  http.post("serviceOld/toRecord", data);

//服务，智慧养老，居家照料，去签到，签到记录
export const ServiceHomeCareGotoSignRecordList = (data?: any) => 
  http.post("serviceOld/queryMyRecordForPage", data);


//服务，智慧养老，居家照料，去签到，签到记录,详情
export const ServiceHomeCareGotoSignRecordDetail = (data?: any) => 
  http.post("serviceOld/getRecordInfo", data);

//服务，智慧社创，活动签到，点击签到
export const ServiceSheChuangActivityGotoSign = (data?: any) => 
  http.post("spritActivity/actUserSign", data);

// map.put("id", id);
//         map.put("applyUserId", App.getPid());
//         map.put("applyUserName", App.getUsername());
//         map.put("content", content);
//         map.put("details", details);
//         map.put("image", image);
//         map.put("enclosure", enclosure);
//         map.put("signaturepic", signaturepic);
//         map.put("reason", reason);
//         map.put("receivers", receivers);
//         map.put("submitFlag", submitFlag);


export const addfilesign = (data?: any) => 
  http.post("documentApproval/addDocumentMessage", data,{isOA:true});



export const queryReceiverList = (data?: any) => 
  http.post("documentApproval/queryReceiverList", data,{isOA:true});


export const queryDocumentView = (data?: any) => 
  http.post("documentApproval/queryDocumentView", data,{isOA:true});

export const receiverQueryDocumentView = (data?: any) => 
  http.post("documentApproval/receiverQueryDocumentView", data,{isOA:true});

export const addfilehistory = (data?: any) => 
  http.post("documentApproval/queryDocumentList", data,{isOA:true});


export const addfilehistoryDetail = (data?: any) => 
  http.post("documentApproval/queryDocumentView", data,{isOA:true});

// map.put("userId", App.getPid());
export const receivefilecount = (data?: any) => 
  http.post("documentApproval/queryReceiverFileCount", data,{isOA:true});


export const receiverTransmitFile = (data?: any) => 
  http.post("documentApproval/receiverTransmitFile", data,{isOA:true});

//   map.put("userId", App.getPid());
// map.put("page", String.valueOf(page));
// map.put("size", String.valueOf(Constant.MAX_SIZE));
// map.put("status", type + "");
// map.put("content", content);

export const receivefilelist = (data?: any) => 
  http.post("documentApproval/receiverQueryDocumentList", data,{isOA:true});

//   map.put("id", id);
//         map.put("reason", reason);
//         map.put("signaturepic", signaturepic);
//         map.put("userId", App.getPid());

export const approvereceivefile = (data?: any) => 
  http.post("documentApproval/receiverConfirmFile", data,{isOA:true});

//服务，中介房源，租房，商铺，详情，去租房，填写租户信息
export const ServiceHouseInfoShopDetailGetUserDetail = (data?: any) => 
  http.post("shoprenttenant/tenantSubmitShopRent", data);
//服务，商圈排行榜
export const ServiceShangQuanPaiHangBangList = (data?: any) => 
  http.post("mall/shop/getMallIndexShopList", data);
  
export const MallAppIndexAdvert = (data?: any) => 
  http.post("mall/Advert/MallAppIndexAdvert", data);

export const getCategary = (data?: any) => 
  http.post("mall/shopclass/getCategary", data);

export const getGoodsRindInfo = (data?: any) => 
  http.post("mall/goods/getGoodsRindInfo", data);

export const getGoodsInfo = (data?: any) => 
  http.post("mall/goods/getGoodsInfo", data);

export const addGoodsCartOrdPre = (data?: any) => 
  http.post("mall/goodsCart/addGoodsCartOrdPre", data);

export const getGoodsCarListOrdPre = (data?: any) => 
  http.post("mall/goodsCart/getGoodsCarListOrdPre", data);

export const addGoodsCart = (data?: any) => 
  http.post("mall/goodsCart/addGoodsCart", data);

export const getGoodsCarList = (data?: any) => 
  http.post("mall/goodsCart/getGoodsCarList", data);

export const getGoodsInfoBySkuSpec = (data?: any) => 
  http.post("mall/goods/getGoodsInfoBySkuSpec", data);

export const getGoodsComment = (data?: any) => 
  http.post("mall/goods/getGoodsComment", data);




export const MineWuYeBaoXiuGetGuanLiChuList = (data?: any) => 
  http.post("platformEmergency/queryUserAuthOffice", data);

export const getGoodsListByIndex = (data?: any) =>
  http.post("mall/shop/getGoodsListByIndex", data);
  
export const getSearchShopList = (data?: any) =>
  http.post("mall/shop/getSearchShopList", data);

export const updateGoodsCarNum = (data?: any) =>
  http.post("mall/goodsCart/updateGoodsCarNum", data);

export const getAuthComPurList = (data?: any) =>
  http.post("customer/order/getAuthComPurList", data);

export const getComActList = (data?: any) =>
  http.post("customer/order/getComActList", data);

export const getActBalance = (data?: any) =>
  http.post("customer/order/getActBalance", data);

export const getDiscountCouponsAndAmount = (data?: any) =>
  http.post("mall/order/getDiscountCouponsAndAmount", data);

export const getDeliveryFee = (data?: any) =>
  http.post("mall/order/getDeliveryFee", data);

export const getDefaultAddress = (data?: any) =>
  http.post("mall/contact/getDefaultAddress", data);

export const orderActivitySubmit = (data?: any) =>
  http.post("event/cart/orderActivitySubmit", data);

export const orderSubmit = (data?: any) =>
  http.post("mall/order/orderSubmit", data);

export const orderNosPay = (data?: any) =>
  http.post("customer/order/orderNosPay", data);

export const bussinessgetAddressList = (data?: any) =>
  http.post("mall/contact/getAddressList", data);

export const bussinessdelAddress = (data?: any) =>
  http.post("mall/contact/delAddress", data);

export const bussinesseditDefaultAddress = (data?: any) =>
  http.post("mall/contact/editDefaultAddress", data);
  
  export const bussinesssaveAddress = (data?: any) =>
    http.post("mall/contact/saveAddress", data);

  export const getOrderClassNumS = (data?: any) =>
    http.post("merchant/order/getOrderClassNumS", data);  

  export const getCoupAndCollCount = (data?: any) =>
    http.post("mall/MyCoupColl/getCoupAndCollCount", data);

  export const confirmUse = (data?: any) =>
    http.post("customer/order/confirmUse", data);

  export const urgeOrder = (data?: any) =>
    http.post("customer/order/urgeOrder", data);

  export const behalfRemindPay = (data?: any) =>
    http.post("customer/order/behalfRemindPay", data);

  export const BussinessOrderNosPay = (data?: any) =>
    http.post("customer/order/orderNosPay", data);

  export const customerCancelOrder = (data?: any) =>
    http.post("customer/order/customerCancelOrder", data);

  export const getCustomerOrderList = (data?: any) =>
    http.post("customer/order/getCustomerOrderList", data);

  export const getCustomerOrderInfoView = (data?: any) =>
    http.post("customer/order/getCustomerOrderInfoView", data);

  export const getSelfSaleOrderList = (data?: any) =>
    http.post("customer/order/getSelfSaleOrderList", data);

  export const ynCanApplyPlat = (data?: any) =>
    http.post("customer/order/ynCanApplyPlat", data);

  export const ynCanApplyAfs = (data?: any) =>
    http.post("customer/order/ynCanApplyAfs", data);

  export const getMyCollectionList = (data?: any) =>
    http.post("mall/MyCoupColl/getMyCollectionList", data);

  export const getCouponNumAndList = (data?: any) =>
    http.post("mall/MyCoupColl/getCouponNumAndList", data);

  export const getCouponGoodsList = (data?: any) =>
    http.post("mall/MyCoupColl/getCouponGoodsList", data);
	
  export const getDeductionCouponNumAndList = (data?: any) =>
    http.post("mall/MyCoupColl/getDeductionCouponNumAndList", data);

  export const getOrderCouponListByApp = (data?: any) =>
    http.post("mall/MyCoupColl/getOrderCouponListByApp", data);

  export const queryPersonalEvaluation = (data?: any) =>
    http.post("evaluationManagement/queryPersonalEvaluation", data);
	
  export const getAfterSaleDetail = (data?: any) =>
    http.post("merchant/order/getAfterSaleDetail", data);	
	
  export const getApplyOrderDetail = (data?: any) =>
    http.post("customer/order/getApplyOrderDetail", data);	

  export const getShopDetailInfo = (data?: any) =>
    http.post("mall/shop/getShopDetailInfo", data);	

  export const receiveShopCoupon = (data?: any) =>
    http.post("mall/shop/receiveCoupon", data);	
		
  export const addSelfAppAfsApply = (data?: any) =>
    http.post("customer/order/addSelfAppAfsApply", data);		

  export const queryGroupBuyPinList = (data?: any) =>
    http.post("activityGroup/queryGroupList", data);		

  export const queryGroupDetails = (data?: any) =>
    http.post("activityGroup/queryGroupDetails", data);
		
  export const qpeellGroups = (data?: any) =>
    http.post("activityGroup/qpeellGroups", data);	
		
export const addCart = (data?: any) =>
  http.post("event/cart/addCart", data);	
  
  export const queryJoinGroupList = (data?: any) =>
    http.post("activityGroup/queryJoinGroupList", data);	
  

export const getMyWalletUrl = (data?: any) => 
  http.post("users/getMyWalletUrl", data);


export const getMyaccount = (data?: any) => 
  http.post("users/getMyLoanWalletUrl", data);

export const orderSubmitOrdPre = (data?: any) => 
  http.post("mall/order/orderSubmitOrdPre", data);
  

//获取服务网点
export const ServiceShunFengYueCarGetQueryOffice = (data?: any) => 
  http.post("Delivery/queryOffice", data);
  

//验证码验证
export const ServiceShunFengYueCarValidateCode = (data?: any) => 
  http.post("auth/validateCode", data);
  
  

//判断是否是配送员
export const ServiceShunFengYueCarIsUserDelivery = (data?: any) => 
  http.post("Delivery/isUserDelivery", data);
  


//约车，审核状态
export const ServiceShunFengYueCarDeliveryDetailAudit = (data?: any) => 
  http.post("Delivery/DeliveryDetailAudit", data);
  
  

//约车，审核详情
export const ServiceShunFengYueCardeliveryDetail = (data?: any) => 
  http.post("Delivery/deliveryDetail", data);
  
  
//约车，审核详情,重新提交
export const ServiceShunFengYueCarAgainDeliveryRegister = (data?: any) => 
  http.post("Delivery/againDeliveryRegister", data);
  


//约车，审核详情,车辆授权列表
export const ServiceShunFengYueCareEpowerDeliveryList = (data?: any) => 
  http.post("Delivery/empowerDeliveryList", data);
  
  
//约车，审核详情,车辆授权列表,删除车辆
export const ServiceShunFengYueCareCancelEmpowerDelivery = (data?: any) => 
  http.post("Delivery/cancelEmpowerDelivery", data);
  

//约车，审核详情,车辆授权列表,添加授权
export const ServiceShunFengYueCarEmpowerDeliveryCar = (data?: any) => 
  http.post("Delivery/empowerDeliveryCar", data);
  
  

//约车，获取配送员接单状态
export const ServiceShunFengYueCarGetDeliveryUserStatus = (data?: any) => 
  http.post("delivery/getDeliveryUserStatus", data);
  

//约车，获取配送员接单状态,接单状态，开启关闭
export const ServiceShunFengYueCarUpdateDeliveryStatus = (data?: any) => 
  http.post("delivery/updateDeliveryStatus", data);
  

//约车，配送流程，车辆列表
export const ServiceShunFengYueCarGetDriverTaxiCarList = (data?: any) => 
  http.post("driverOrders/getDriverTaxiCarList", data);
  
  
  
//约车，配送流程，顺风约车列表
export const ServiceShunFengYueCarGetDriverTaxiOrderList = (data?: any) => 
	http.post("driverOrders/getDriverTaxiOrderList", data);
	

//约车，配送流程，顺风约车列表,单条抢单
export const ServiceShunFengYueCarApplyTaxiOrder = (data?: any) => 
	http.post("driverOrders/applyTaxiOrder", data);



//约车，配送流程，顺风约车列表,待接单列表数据
export const ServiceShunFengYueCarGetCanApplyOrderList = (data?: any) => 
	http.post("delivery/getCanApplyOrderList", data);
	

//约车，配送流程，顺风约车列表,待接单列表数据,申请接单
export const ServiceShunFengYueCarApplySendOrder = (data?: any) => 
	http.post("delivery/applySendOrder", data);
	

//约车，配送流程，顺风约车列表,平台派单列表数据
export const ServiceShunFengYueCarGetOrderList = (data?: any) => 
	http.post("delivery/getOrderList", data);
	
	
//约车，配送流程，顺风约车列表,平台派单列表数据,接受订单
export const ServiceShunFengYueCarAgreeAcceptSendOrder = (data?: any) => 
	http.post("delivery/agreeAcceptSendOrder", data);
	

//约车，配送流程，顺风约车列表,平台派单列表数据,拒绝订单
export const ServiceShunFengYueCarRefuseAcceptSendOrder = (data?: any) => 
	http.post("delivery/refuseAcceptSendOrder", data);


//约车，配送流程，顺风约车列表,进行中列表数据,取消订单
export const ServiceShunFengYueCarCancelSendOrder = (data?: any) => 
	http.post("delivery/cancelSendOrder", data);
	

//约车，配送流程，顺风约车列表,进行中列表数据,顺风约车列表
export const ServiceShunFengYueCarGetMySelfTaxiOrderList = (data?: any) => 
	http.post("driverOrders/getMySelfTaxiOrderList", data);
	
	
//约车，配送流程，顺风约车列表,进行中列表数据,顺风约车列表,取消订单
export const ServiceShunFengYueCarDriverCancelOrder = (data?: any) => 
	http.post("driverOrders/driverCancelOrder", data);
	

//约车，配送流程，顺风约车列表,进行中列表数据,顺风约车列表,确认完成
export const ServiceShunFengYueCarCompleteTaxiIOrder = (data?: any) => 
	http.post("driverOrders/completeTaxiIOrder", data);
	

//约车，配送流程，顺风约车列表,进行中列表数据,待取货列表,确认取货
export const ServiceShunFengYueCarConfirmPickUp = (data?: any) => 
	http.post("delivery/confirmPickUp", data);
	

//约车，配送流程，顺风约车列表,进行中列表数据,待取货列表,确认完成
export const ServiceShunFengYueCarConfirmFinishOrder = (data?: any) => 
	http.post("delivery/confirmFinishOrder", data);
	

//约车，配送流程，顺风约车列表,进行中列表数据,待取货列表,全选，确认首单？
export const ServiceShunFengYueCarGetYnNeedChoseFirst = (data?: any) => 
	http.post("delivery/getYnNeedChoseFirst", data);
	
	
//约车，配送流程，顺风约车列表,详情
export const ServiceShunFengYueCarGetOrderDetail = (data?: any) => 
	http.post("driverOrders/getOrderDetail", data);
	
	

//约车，顺丰约车，我要约车，马上叫车/立即预约，提交操作
export const ServiceShunFengYueCarTakeTaxi = (data?: any) => 
	http.post("taxiOrders/takeTaxi", data);
	
//约车，顺丰约车，我要约车，马上叫车/立即预约，取消叫车
export const ServiceShunFengYueCarCancelsTaxiOrder = (data?: any) => 
	http.post("taxiOrders/cancelsTaxiOrder", data);
	

//约车，顺丰约车，我要约车，马上叫车/立即预约，获取订单状态
export const ServiceShunFengYueCarGetTaxiWorker = (data?: any) => 
	http.post("taxiOrders/getTaxiWorker", data);
	
	
//约车，顺丰约车，我要约车，马上叫车/立即预约，延长等待时间
export const ServiceShunFengYueCarExtendWaitingTime = (data?: any) => 
	http.post("taxiOrders/extendWaitingTime", data);
	

//约车，顺丰约车，我要约车，马上叫车/立即预约，订单详情，平台支付
export const ServiceShunFengYueCarInnnerPayTaxiOrder = (data?: any) => 
	http.post("taxiOrders/innnerPayTaxiOrder", data);
	

//约车，顺丰约车，我要约车，马上叫车/立即预约，订单详情，线下支付
export const ServiceShunFengYueCarOfflinePayment = (data?: any) => 
	http.post("taxiOrders/offlinePayment", data);
	

//收发，添加物流编号
export const SendAndReceivementUpdateWaybillInfo = (data?: any) => 
	http.post("estate/recycleOrder/updateWaybillInfo", data);
	

//预缴，用量查询，返回查看方式
export const YuJiaoCheckYongLiangGetHseMeterButtonType = (data?: any) => 
	http.post("jdMeter/getHseMeterButtonType", data);
	

//预缴，用量查询，查看分类用量
export const YuJiaoCheckYongLiangGetHseMeterUsedByButton = (data?: any) => 
	http.post("jdMeter/getHseMeterUsedByButton", data);
