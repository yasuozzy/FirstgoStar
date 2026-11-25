import { http } from "@/utils/request"; // 【注意】修正了原代码 utiles 的拼写错误


export const mineJianGuanAcount = (data?: any) =>
  http.post("users/getMyLoanWalletUrl", data);


export const mineVollet = (data?: any) =>
  http.post("users/getMyWalletUrl", data);


export const mineGetMyIntegral = (data?: any) =>
  http.post("womalljf/getMyIntegralOrdAndCh", data);


export const mineGetMyIntegralDetail = (data?: any) =>
  http.post("houseInformation/checkDetailIntegral", data);


export const mineIntegralJuanZeng = (data?: any) =>
  http.post("spritActivity/queryDonatedList", data);


export const mineGetMyGongFen = (data?: any) =>
  http.post("memberScore/getMemberScoreBalanceAndList", data);


export const mineGetMyGongFenPill = (data?: any) =>
  http.post("memberScore/getMemberScoreUseRecordList", data);


export const GongFenProduct = (data?: any) =>
  http.post("memberScore/getMemberScoreGoodsList", data);


export const GongFenOrderDeliveryFee = (data?: any) =>
  http.post("memberScore/getDeliveryFee", data);


export const GongFenSelectAddress = (data?: any) =>
  http.post("memberScore/getUserAddressLsit", data);


export const GongFenAddAddress = (data?: any) =>
  http.post("mall/contact/saveAddress", data);


export const mineGetMyLingGongGF = (data?: any) =>
  http.post("dayjob/getDjSignScoreBalAndList", data);


export const vertifyPwd = (data?: any) =>
  http.post("users/verifyPassword", data);



export const resetPwd = (data?: any) =>
  http.post("users/resetPassword", data);


export const BindPhonegetCode = (data?: any) =>
  http.post("auth/getCheckCode", data);


export const ChangePhone = (data?: any) =>
  http.post("auth/changeMobile", data);


export const GetAgreemente = (data?: any) =>
  http.post("agreement/queryAgreeDetail", data);


export const GetPersonalMessage = (data?: any) =>
  http.post("auth/updateUserInfo", data);


export const GetPersonalAvatar = (data?: any) =>
  http.post("AppWorkOrder/addUploadIms", data);


export const MineCircleHeaderData = (data?: any) =>
  http.post("mall/MyCoupColl/getCoupAndCollCount", data);


export const MineCircleDataList = (data?: any) =>
  http.post("customer/order/getCustomerOrderList", data);


export const MineCircleAplyNotes = (data?: any) =>
  http.post("customer/order/getSelfSaleOrderList", data);


export const MineCircleAplyBuyBackSQ = (data?: any) =>
  http.post("customer/order/ynCanApplyAfs", data);


export const MineCircleAplyPlatCutIn = (data?: any) =>
  http.post("customer/order/ynCanApplyPlat", data);


export const MineCircleAplyPlatBackMoneySetUpData = (data?: any) =>
  http.post("customer/order/addSelfAppAfsApply", data);


export const MineCircleAplyPlatCutInSetUpData = (data?: any) =>
  http.post("customer/order/applyPlatFollow", data);


export const MineCircleOrderDetails = (data?: any) =>
  http.post("customer/order/getCustomerOrderInfoView", data);


export const MineCircleOrderCancelOrders = (data?: any) =>
  http.post("customer/order/customerCancelOrder", data);


export const MineCircleOrderDaiFuUrgent = (data?: any) =>
  http.post("customer/order/behalfRemindPay", data);


export const MineCircleOrderPayOrderImmeditly = (data?: any) =>
  http.post("customer/order/orderNosPay", data);


export const MineCircleOrderNormalUrgent = (data?: any) =>
  http.post("customer/order/urgeOrder", data);


export const MineCircleOrderConfirmOrderDone = (data?: any) =>
  http.post("customer/order/confirmUse", data);


export const MineIntegralOrderList = (data?: any) =>
  http.post("womalljf/scoreQueryMyOrderList", data);



export const MineIntegralOrderRemindSend = (data?: any) =>
  http.post("womalljf/urgeOrder", data);


export const MineIntegralOrderSureOrder = (data?: any) =>
  http.post("womalljf/confirmReceiptGoods", data);


export const MineIntegralOrderCancelOrder = (data?: any) =>
  http.post("womalljf/cancelMyOrder", data);


export const MineIntegralOrderDetail = (data?: any) =>
  http.post("womalljf/scoreQueryMyOrderDetail", data);


export const MineHouseTreasureNormal = (data?: any) =>
  http.post("houseInformation/selectBoundHouse", data);


export const MineHouseTreasureNormalDetail = (data?: any) =>
  http.post("houseInformation/selectHouseUser", data);


export const MineHouseTreasureHouseMessage = (data?: any) =>
  http.post("houseInformation/getHseContractList", data);


export const MineHouseTreasureHouseMessageDet = (data?: any) =>
  http.post("houseInformation/getHseContractInfo", data);


export const MineHouseTreasureHouseAddAcount = (data?: any) =>
  http.post("userInformation/selectUserName", data);


export const MineShare = (data?: any) =>
  http.post("sys/info/queryAppShareUrl", data);


export const PrepayHome = (data?: any) =>
  http.post("advancePayUser/getUserCenterInfo", data);


export const prePayUseList = (data?: any) =>
  http.post("advancePayUser/queryRecordListForPage", data);



export const preShopList = (data?: any) =>
  http.post("advancePayUser/getCanBuyAdcanceShopsList", data);


export const activeWithdraList = (data?: any) =>
  http.post("advancePayAct/queryShopMyJoinActList", data);



export const NormalWithdra = (data?: any) =>
  http.post("advancePayUser/applyCashOutInWallet", data);



export const goRecharge = (data?: any) =>
  http.post("advancePayUser/advanceUserPay", data);



export const updateGoodsCarNum = (data?: any) =>
  http.post("advancePayGoodsCart/updateGoodsCarNum", data);



export const getShopDetail = (data?: any) =>
  http.post("advancePayShop/getShopDetailInfo", data);



export const GoodsCarList = (data?: any) =>
  http.post("advancePayGoodsCart/getGoodsCarList", data);



export const ShopCategoryList = (data?: any) =>
  http.post("advancePayUser/getAdvGoodsCatListByShopId", data);



export const getGoodsList = (data?: any) =>
  http.post("advancePayUser/getAdvGoodsListByShopId", data);



export const addCart = (data?: any) =>
  http.post("advancePayGoodsCart/addGoodsCart", data);



export const getRechargeDetail = (data?: any) =>
  http.post("advancePayUser/getRechargeDetail", data);



export const getPrePayUseDetail = (data?: any) =>
  http.post("advancePayUser/getUsedDetail", data);



export const ApplyShouHou = (data?: any) =>
  http.post("advancePayUser/advanceUserApplyAfterService", data);



export const RechargeBackMoneyRecord = (data?: any) =>
  http.post("advancePayUser/queryRefRecordList", data);



export const RechargeHistory = (data?: any) =>
  http.post("advancePayUser/queryRecordListForPage", data);



export const RechargeBackMoney = (data?: any) =>
  http.post("advancePayUser/applyRefund", data);


export const WithdraHistoryList = (data?: any) =>
  http.post("advancePayUser/queryCashOutInWalletList", data);



export const activeWithdra = (data?: any) =>
  http.post("advancePayAct/applyCashOutInWallet", data);



export const getGoodsDetail = (data?: any) =>
  http.post("advancePayUser/getGoodsInfo", data);



export const ShouHouRecord = (data?: any) =>
  http.post("advancePayUser/queryAftServiceList", data);



export const CancelShouHou = (data?: any) =>
  http.post("advancePayUser/cancleAfServiceApply", data);



export const PreApplyPlatFollow = (data?: any) =>
  http.post("advancePayUser/applyPlatFollow", data);



export const PreOrderCommit = (data?: any) =>
  http.post("advancePayOrder/orderSubmit", data);



export const getDiscountCouponsAndAmount = (data?: any) =>
  http.post("mall/order/getDiscountCouponsAndAmount", data);



export const PreJirRuDetail = (data?: any) =>
  http.post("advancePayUser/getPlatApplyOrderDetail", data);



export const getRechargeProductList = (data?: any) =>
  http.post("advancePayUser/getAdvanceShopGoodsList", data);



export const getRechargeShopList = (data?: any) =>
  http.post("advancePayUser/getAdvanceShopList", data);



export const preGetAddress = (data?: any) =>
  http.post("advancePayUser/getAddressList", data);



export const preDelAddress = (data?: any) =>
  http.post("advancePayUser/delAddress", data);



export const UserShouHouDetail = (data?: any) =>
  http.post("advancePayUser/getAfServiceApplyDetail", data);



export const preAddAddress = (data?: any) =>
  http.post("advancePayUser/saveAddress", data);



export const MineServiceCancelMoneyService = (data?: any) =>
  http.post("refundApply/queryRefundPushList", data);




export const MineServiceCancelMoneyServiceDet = (data?: any) =>
  http.post("refundApply/getRAIWithAudit", data);



export const MineServiceCancelMoneyServicePay = (data?: any) =>
  http.post("refundApply/doRefundApplyPay", data);



export const MineServicePayJieSuanList = (data?: any) =>
  http.post("dayjob/queryPayPushList", data);



export const MineServicePayJieSuanDetail = (data?: any) =>
  http.post("dayjob/getDJIPayWithAuditInfo", data);


export const MineServicePayJieSuanSetUp = (data?: any) =>
  http.post("dayjob/salaryPay", data);



export const MineServicePayJieSuanPaiDetail = (data?: any) =>
  http.post("dayjobCompany/getComDJIWithAuditInfo", data);



export const MineServicePayJieSuanPaiGetInfo = (data?: any) =>
  http.post("dayjobCompany/getDayJobOrderInfo", data);



export const MineServicePayJieSuanPaiSetUp = (data?: any) =>
  http.post("dayjobCompany/salaryPay", data);



export const MineServiceJieSuanShenHeList = (data?: any) =>
  http.post("com/message/notice/queryPayAuditNoticeList", data);




export const MineServiceJieSuanLingDetail = (data?: any) =>
  http.post("dayjob/getDayJobPayAuditInfoByPush", data);



export const MineServiceJieSuanPaiDetail = (data?: any) =>
  http.post("dayjobCompany/getComSendAuditInfoByPush", data);



export const MineServiceCancelJieSuanDetail = (data?: any) =>
  http.post("refundApply/getRefundInfoByPush", data);


export const MineServiceTransJieSuanDetail = (data?: any) =>
  http.post("transferAccounts/getTransRecInfoByPush", data);



export const MineServiceQingKuanBaiXiaoList = (data?: any) =>
  http.post("generalApproval/queryApprovalReqFundsAndExpList", data);




export const MineServiceQingKuanDetail = (data?: any) =>
  http.post("generalApproval/getApprovalInfoWithAllAuth", data);



export const MineServiceBaoXiaoDetail = (data?: any) =>
  http.post("generalApproval/queryApprovalInfoAuth", data);




export const MineServiceBaoXiaoControllMoney = (data?: any) =>
  http.post("generalApproval/doFundingPay", data);



export const prePayMyOrderList = (data?: any) =>
  http.post("advancePayUser/queryAdvanceUserPreOrderList", data);



export const prePayMakeOrder = (data?: any) =>
  http.post("advancePayUser/userMakeOrder", data);



export const prePayCancelOrder = (data?: any) =>
  http.post("advancePayUser/userCanclePreOrder", data);



export const LoanShenpiHistory = (data?: any) =>
  http.post("paymentApproval/queryBeforeApprovalList", data, { isOA: true });


export const LoanShenpiHistoryDetail = (data?: any) =>
  http.post("paymentApproval/queryBeforeApprovalView", data, { isOA: true });


export const KuaijiShenpiMingXi = (data?: any) =>
  http.post("paymentApproval/queryCollectionUserList", data, { isOA: true });



export const KuaijiShenpiLeaderDetail = (data?: any) =>
  http.post("paymentApproval/queryLeaderApprovalView", data, { isOA: true });


export const KuaijiShenpiHistoryDetail = (data?: any) =>
  http.post("paymentApproval/queryApprovalView", data, { isOA: true });


export const CommitKuanXiang = (data?: any) =>
  http.post("paymentApproval/applyBeforeApprovalRecordVo", data, { isOA: true });



export const KuaijiShenpiHistory = (data?: any) =>
  http.post("paymentApproval/queryApprovalList", data, { isOA: true });


export const LeaderApprovalList = (data?: any) =>
  http.post("paymentApproval/queryLeaderApprovalList", data, { isOA: true });



export const leaderAppropriationpay = (data?: any) =>
  http.post("generalApproval/leaderAppropriation", data);


export const leaderApproval = (data?: any) =>
  http.post("paymentApproval/leaderApproval", data, { isOA: true });



export const KuaijiShenpiContact = (data?: any) =>
  http.post("paymentApproval/queryExApLeaderList", data, { isOA: true });




export const getMyaccount = (data?: any) =>
  http.post("users/getMyLoanWalletUrl", data);



export const getMyWalletUrl = (data?: any) =>
  http.post("users/getMyWalletUrl", data);



export const ToBePayList = (data?: any) =>
  http.post("fundspayment/getToBePayList", data);



export const UserGoPay = (data?: any) =>
  http.post("fundspayment/userApproveGoPay", data);



export const ToPayDetail = (data?: any) =>
  http.post("fundspayment/getPayInfo", data);



export const MineOAManageComNormalShenPiNum = (data?: any) =>
  http.post("generalApproval/queryLeaderApprovalCount", data);



export const MineOAManageComNormalShenPiNormalList = (data?: any) =>
  http.post("generalApproval/queryLeaderApprovalList", data);



export const MineOAManageComNormalShenPiMyTransList = (data?: any) =>
  http.post("generalForwarding/queryGeneralForwardingList", data);




export const MineOAManageComNormalShenPiTransMeList = (data?: any) =>
  http.post("generalForwarding/queryReceiverForwardingList", data);




export const MineOrderManageCircleYuFuOrder = (data?: any) =>
  http.post("advancePayShop/queryAdvanceShopOrderList", data);




export const MineOrderManageCircleYuFuOrderDetail = (data?: any) =>
  http.post("advancePayShop/getCustomerOrderInfoView", data);



export const MineOrderManageCircleSaleBehindOrder = (data?: any) =>
  http.post("advancePayShop/queryShopAftServiceList", data);




export const MineOrderManageCircleSaleBehindPass = (data?: any) =>
  http.post("advancePayShop/shopAuditAfServiceApply", data);



export const MineOrderManageCircleYuYueOrderCinfirm = (data?: any) =>
  http.post("advancePayShop/shopConfirmPreOrder", data);



export const MineOrderManageCircleYuYueOrderCancel = (data?: any) =>
  http.post("advancePayShop/shopCanclePreOrder", data);



export const PartyQYHeader = (data?: any) =>
  http.post("gridParty/queryAdvertPlaceList", data);



export const PartyQYGetNowLocation = (data?: any) =>
  http.post("gridParty/getHousePlace", data);



export const MineComInsideNolmalSHGetHouse = (data?: any) =>
  http.post("generalApproval/queryCompanyList", data);



export const MineComInsideNolmalSHHistory = (data?: any) =>
  http.post("generalApproval/queryGeneralApprovalList", data);



export const MineComInsideNolmalSHDelete = (data?: any) =>
  http.post("generalApproval/delApprovalMessage", data);



export const MineComInsideNolmalSHDetail = (data?: any) =>
  http.post("generalApproval/queryApprovalView", data);


export const MineComInsideNolmalSHDetailCancel = (data?: any) =>
  http.post("generalApproval/cancelApprovalMessage", data);



export const MineComInsideQingKuanHeader = (data?: any) =>
  http.post("generalApproval/queryDeptList", data);



export const MineComInsideQingKuanSetUpData = (data?: any) =>
  http.post("generalApproval/addGeneralApprovalMessage", data);



export const MineComInsideQingKuanSelectShenPiPerson = (data?: any) =>
  http.post("generalApproval/queryGeneralLeaderList", data);



export const MineComInsideQingKuanSelectChaoSongPerson = (data?: any) =>
  http.post("generalApproval/queryGeneralReceriverList", data);




export const MineComInsideHuanKuanSetUp = (data?: any) =>
  http.post("generalApproval/repaymentSubmit", data);



export const MineComInsideHuanKuanGoPay = (data?: any) =>
  http.post("generalApproval/repaymentGoPay", data);



export const MineComInsideQingJiaType = (data?: any) =>
  http.post("generalApproval/queryLeaveTypeList", data);




export const MineComInsideDailyReportMySetUp = (data?: any) =>
  http.post("report/getMyReportList", data);



export const MineComInsideDailyReportMyTransfer = (data?: any) =>
  http.post("report/getMyForwardReportList", data);



export const MineComInsideDailyReportTransferMe = (data?: any) =>
  http.post("report/getForwardToMeReportList", data);



export const MineComInsideDailyReportMySetUpDetail = (data?: any) =>
  http.post("report/getReportDayInfo", data);



export const MineComInsideDailyReportMyTransferDetail = (data?: any) =>
  http.post("report/getForwardReportDayInfo", data);



export const MineComInsideDailyReportTransferMeDetail = (data?: any) =>
  http.post("report/getForwardToMeReportDayInfo", data);



export const MineComInsideDailyReportTransferMeAnswer = (data?: any) =>
  http.post("report/replyForwardReport", data);


export const MineComInsideDailyReportSetUpTransfer = (data?: any) =>
  http.post("report/forwardReport", data);



export const MineComInsideDailyReportSetUpGetReceiver = (data?: any) =>
  http.post("generalApproval/queryCompanyUsersList", data);



export const MineComInsideDailyReportWriteReport = (data?: any) =>
  http.post("report/saveReportDay", data);



export const MineComInsideDailyReportSelectPeople = (data?: any) =>
  http.post("report/getReportReceiversList", data);



export const MineFinancialPiLiangShenHe = (data?: any) =>
  http.post("refundApply/getBatRefInfoByPush", data);


export const MineFinancialPiLiangShenHeSetReason = (data?: any) =>
  http.post("refundApply/batRefAudit", data);



export const MineFinancialPiLiangTuiKuanOne = (data?: any) =>
  http.post("refundApply/getBatRefInfo", data);



export const MineFinancialPiLiangTuiKuanTwo = (data?: any) =>
  http.post("refundApply/getBatRefInfoWithAudit", data);



export const MineFinancialPiLiangTuiKuanPay = (data?: any) =>
  http.post("refundApply/doBatRefPay", data);



export const MineCircleOrderYuGouOrderList = (data?: any) =>
  http.post("customer/order/queryUserOrdPreOrderList", data);



export const MineCircleOrderYuGouOrderDetail = (data?: any) =>
  http.post("customer/order/userGetOrdPreOrderInfoView", data);



export const MineCircleOrderYuGouOrderCancelOrder = (data?: any) =>
  http.post("customer/order/userCancleOrdPreOrder", data);



export const MineCircleOrderYuGouOrderUseOrder = (data?: any) =>
  http.post("customer/order/userOrdPreMakeOrder", data);



export const MineCircleOrderDaiFuOrderList = (data?: any) =>
  http.post("customer/order/getBehalfOrderList", data);



export const MineCircleOrderDaiFuOrderDetail = (data?: any) =>
  http.post("customer/order/getBehalfOrderInfoView", data);



export const MineGetEmergencyOrderIsWOrker = (data?: any) =>
  http.post("Temporary/isUserTemporay", data);



export const MineGetEmergencyOrderList = (data?: any) =>
  http.post("AppWorkOrder/AppTemporayWorkOrderForPage", data);



export const MineGetEmergencyGrabOrderList = (data?: any) =>
  http.post("AppWorkOrder/AppWorkOrderGrabsList", data);



export const MineGetEmergencyGoGrabOrder = (data?: any) =>
  http.post("AppWorkOrder/grabsOrder", data);



export const MineGetEmergencyEndWorkOrder = (data?: any) =>
  http.post("AppWorkOrder/AppEndWorkOrder", data);



export const MineGetEmergencyPauseWorkOrder = (data?: any) =>
  http.post("AppWorkOrder/AppPauseWorkOrder", data);



export const MineGetEmergencyPassWorkOrder = (data?: any) =>
  http.post("AppWorkOrder/verifyWorkOrderPass", data);



export const MineGetEmergencyOrderDetail = (data?: any) =>
  http.post("AppWorkOrder/AppGetWorkOrder", data);


export const MineGetEmergencyEstateOrderDetail = (data?: any) =>
  http.post("platformEmergency/estateWorkOrderView", data);


export const MineJoinPartyInfo = (data?: any) =>
  http.post("gridParty/getApplyJoinOrgInfo", data);




export const MineJoinPartyList = (data?: any) =>
  http.post("gridParty/queryGridPartyListForPage", data);



export const MineJoinPartyShenQingJoin = (data?: any) =>
  http.post("gridParty/applyGridParty", data);



export const MineJoinPartyShenQingJoinDang = (data?: any) =>
  http.post("houseInformation/joinPartyApply", data);



export const MineJoinPartyShenQingRelationGetIn = (data?: any) =>
  http.post("gridParty/addGridPartyTrans", data);



export const MineJoinPartyShenQingRelationGetInNotes = (data?: any) =>
  http.post("gridParty/queryGridPartyTransList", data);




export const MineJoinPartyFaBuNeeds = (data?: any) =>
  http.post("gridParty/savePartyMemberNeeds", data);



export const MineJoinPartyClassAdvList = (data?: any) =>
  http.post("gridParty/queryGridPartyAdvList", data);



export const MineJoinPartyClassArticleList = (data?: any) =>
  http.post("gridParty/queryGridPartyArticleList", data);


export const MineJoinPartyClassMoreArticleList = (data?: any) =>
  http.post("gridParty/queryGridPartyArticleTypeList", data);



export const MineJoinPartyClassMoreArticleDetail = (data?: any) =>
  http.post("gridParty/queryGridPartyAdvDetail", data);



export const MinePartyWangGeMessageList = (data?: any) =>
  http.post("gridCheck/getMyCheckHouseList", data);



export const MinePartyWangGeMessageAddMainKeeper = (data?: any) =>
  http.post("gridCheck/submitHouseUserInfo", data);




export const MinePartyWangGeMessageGetKeeperInfo = (data?: any) =>
  http.post("gridCheck/getHouseUserInfo", data);



export const MinePartyWangGeMessageEditKeeperInfo = (data?: any) =>
  http.post("gridCheck/updateHouseUserInfo", data);



export const MinePartyWangGeMessageCheckWanggeList = (data?: any) =>
  http.post("gridCheck/getHseInfoListByIndex", data);



export const MinePartyWangGeMessageChooseProviceInfo = (data?: any) =>
  http.post("gridCheck/getProCitDisStrRegGridList", data);



export const MinePartyWangGeMessageSubmitHouseInfo = (data?: any) =>
  http.post("gridCheck/submitHouseInfo", data);



export const MinePartyWangGeEvents = (data?: any) =>
  http.post("houseInformation/getLocationStatus", data);




export const MinePartyWangGeEventsTypes = (data?: any) =>
  http.post("AppWorkOrder/AppRepairTypeList", data);



export const MinePartyWangGeEventsChooseWangge = (data?: any) =>
  http.post("houseInformation/selectPlatHouse", data);



export const MinePartyWangGeEventsSetUpEvents = (data?: any) =>
  http.post("AppWorkOrder/AppWorkOraderRegister", data);



export const MinePartyWangGeEventsGenZong = (data?: any) =>
  http.post("AppWorkOrder/AppWorkOraderForForPage", data);



export const MinePartyWangGeEventsCancelSetUp = (data?: any) =>
  http.post("AppWorkOrder/cancelWorkorder", data);



export const MinePartyWangGeEventsDeleteEvent = (data?: any) =>
  http.post("AppWorkOrder/deleteWorkOrder", data);



export const MinePartyWangGeEventsHelpEachOther = (data?: any) =>
  http.post("spritOrder/volGetSpritOrderList", data);


export const MinePartyWangGeEventsHelpEachOtherRenLing = (data?: any) =>
  http.post("spritOrder/volClaim", data);



export const MinePartyWangGeEventsHelpEachOtherHandle = (data?: any) =>
  http.post("spritOrder/volDealWith", data);


export const MinePartyWangGeEventsHelpEachOtherComplete = (data?: any) =>
  http.post("spritOrder/volSubmitComplete", data);



export const MinePartyWangGeEventsHelpEachOtherUrgeUser = (data?: any) =>
  http.post("spritOrder/vloUrgeUser", data);



export const MinePartyWangGeEventsHelpEachOtherDetail = (data?: any) =>
  http.post("spritOrder/getSpritOrderInfo", data);



export const MinePartyWangGeEventsHelpEachOtherEvaluate = (data?: any) =>
  http.post("spritOrder/userEvaluate", data);



export const MinePartyWangGeSuggestAdvice = (data?: any) =>
  http.post("complain/insertComplain", data);



export const MinePartyPublicJusticeGetFanWei = (data?: any) =>
  http.post("opinion/queryManAuth", data);



export const MinePartyPublicJusticeHistoryList = (data?: any) =>
  http.post("opinion/querySaveAndRelOpinionList", data);



export const MinePartyPublicJusticeOpinionSave = (data?: any) =>
  http.post("opinion/saveAndReleaseOpinCol", data);



export const MinePartyPublicJusticeOpinionEdit = (data?: any) =>
  http.post("opinion/getSaveAndRelOpinionInfo", data);



export const MinePartyPublicJusticeGongShiList = (data?: any) =>
  http.post("opinion/queryMyReleaseOpinionCollectResultList", data);



export const MinePartyPublicJusticeGongShilWaitRelList = (data?: any) =>
  http.post("opinion/queryOpinionColWaitRelList", data);



export const MinePartyPublicJusticeGongShilFaBuGongShi = (data?: any) =>
  http.post("opinion/releaseOpinionCollectResult", data);



export const MinePartyPublicJusticeGongShilInfoData = (data?: any) =>
  http.post("opinion/getRelOpinColResInfo", data);



export const MinePartyPublicJusticeXuanMinSaveFabu = (data?: any) =>
  http.post("elector/saveAndReleaseElector", data);



export const MinePartyPublicJusticeXuanMinDengJiList = (data?: any) =>
  http.post("elector/querySaveAndRelElectorList", data);



export const MinePartyPublicJusticeXuanMinDengJiInfo = (data?: any) =>
  http.post("elector/getSaveAndRelElectorInfo", data);



export const MinePartyPublicJusticeXuanMinDengJiJieGuo = (data?: any) =>
  http.post("elector/queryElectorList", data);



export const MinePartyPublicJusticeXuanMinGongShiList = (data?: any) =>
  http.post("elector/queryElectorWaitRelList", data);


export const MinePartyPublicJusticeXuanMinGongShiFaBu = (data?: any) =>
  http.post("elector/releaseElectorResult", data);



export const MinePartyPublicJusticeXuanMinGongShiNotes = (data?: any) =>
  http.post("elector/queryMyReleaseElectorResultList", data);



export const MinePartyPublicJusticeXuanMinGongShiDetail = (data?: any) =>
  http.post("elector/getRelElectorResInfo", data);



export const MinePartyPublicJusticeFaQiXuanJuFanWei = (data?: any) =>
  http.post("election/queryManAuth", data);



export const MinePartyPublicJusticeFaQiXuanJuNotesList = (data?: any) =>
  http.post("election/querySaveAndRelElectionList", data);



export const MinePartyPublicJusticeFaQiXuanJuDetail = (data?: any) =>
  http.post("election/getSaveAndRelElectionInfo", data);




export const MinePartyPublicJusticeFaBuSaveXuanJu = (data?: any) =>
  http.post("election/saveAndReleaseElection", data);



export const MinePartyPublicJusticeGetGongShiList = (data?: any) =>
  http.post("election/queryElectionColWaitRelList", data);



export const MinePartyPublicJusticeXuanJuGongShiFaBu = (data?: any) =>
  http.post("election/releaseElectionCollectResult", data);



export const MinePartyPublicJusticeXuanJuGongShiNoteList = (data?: any) =>
  http.post("election/queryMyReleaseElectionCollectResultList", data);



export const MinePartyPublicJusticeXuanJuGongShiNoteInfo = (data?: any) =>
  http.post("election/getRelElectionColResInfo", data);



export const MinePartyPublicJusticeVoteBiaoJueGetFanWei = (data?: any) =>
  http.post("vote/queryManAuth", data);



export const MinePartyPublicJusticeVoteBiaoJueSaveAndFaBu = (data?: any) =>
  http.post("vote/saveVoteMain", data);



export const MinePartyPublicJusticeVoteBiaoJueNoteList = (data?: any) =>
  http.post("vote/querySaveVoteMainList", data);



export const MinePartyPublicJusticeVoteBiaoJueInfo = (data?: any) =>
  http.post("vote/getVoteMainInfo", data);



export const MinePartyPublicJusticeVoteGongShiGetList = (data?: any) =>
  http.post("vote/querySaveVoteMainColWaitRelList", data);



export const MinePartyPublicJusticeVoteGongShiNoteList = (data?: any) =>
  http.post("vote/queryMyVoteResultPublicistForPage", data);



export const MinePartyPublicJusticeVoteGongShiNoteInfo = (data?: any) =>
  http.post("vote/getMyRelVoteColResInfo", data);



export const MinePartyPublicLoveBankMyJiFen = (data?: any) =>
  http.post("houseInformation/queryBalanceIntegral", data);




export const MinePartyPublicLoveBankGetMember = (data?: any) =>
  http.post("houseInformation/getDonatedMember", data);



export const MinePartyPublicMyHelpDataList = (data?: any) =>
  http.post("spritOrder/volGetSpritOrderList", data);



export const MinePartyPublicMyHelpRenLing = (data?: any) =>
  http.post("spritOrder/volClaim", data);



export const MinePartyPublicMyQianDaoClickQianDao = (data?: any) =>
  http.post("gridParty/addUserSignRecord", data);



export const MinePartyPublicMyQianDaoHaveQianDaoList = (data?: any) =>
  http.post("gridParty/querySignRecordList", data);



export const MinePartyPublicMyStudyList = (data?: any) =>
  http.post("gridParty/queryArticleRecordList", data);



export const MinePartyPublicMyStudyDetail = (data?: any) =>
  http.post("gridParty/queryGridPartyAdvDetail", data);



export const MinePartyPublicBiaoBingPaiHangList = (data?: any) =>
  http.post("houseInformation/getRanking", data);



export const MinePartyPublicIntegralPaiHangList = (data?: any) =>
  http.post("houseInformation/getScoreRanking", data);



export const MinePartyPublicJuanZengPaiHangList = (data?: any) =>
  http.post("houseInformation/getDonateRanking", data);



export const MinePartyPublicLearnToStrongCountry = (data?: any) =>
  http.post("houseInformation/getFilledInfoOpenLearn", data);



export const MinePartyPublicLearnToStrongCountryGetCity = (data?: any) =>
  http.post("houseInformation/getCitySiteList", data);



export const MinePartyPublicLearnToStrongCountryGetStreet = (data?: any) =>
  http.post("houseInformation/getStreetEstateList", data);



export const MinePartyPublicLearnToStrongCountryGetRegionMan = (data?: any) =>
  http.post("houseInformation/getRegionManList", data);



export const MinePartyPublicLearnToStrongCountryGetWangge = (data?: any) =>
  http.post("houseInformation/getGridBldgList", data);



export const MinePartyPublicLearnToStrongCountryGetSecondWangge = (data?: any) =>
  http.post("houseInformation/getSecondGridHseList", data);


export const MinePartyPublicLearnToStrongCountryOpenClick = (data?: any) =>
  http.post("houseInformation/filledInfoOpenLearnSubmit", data);



export const MinePartyPublicLearnToStrongCountryTongJi = (data?: any) =>
  http.post("AppAuthority/openLearnRecord", data);



export const MineFinancialTransferServiceList = (data?: any) =>
  http.post("transferAccounts/queryTransferAccountsList", data);



export const MineFinancialTransferServiceListCancelTransfer = (data?: any) =>
  http.post("transferAccounts/cancleTranAcct", data);



export const MineFinancialTransferServiceListSureTransfer = (data?: any) =>
  http.post("transferAccounts/datailGoPayTranAcct", data);



export const MineFinancialTransferServiceDetail = (data?: any) =>
  http.post("transferAccounts/getTransferAccountsInfo", data);



export const MineFinancialTransferServiceGetpayUserInfo = (data?: any) =>
  http.post("transferAccounts/getPayeeUserInfo", data);



export const MineFinancialTransferServiceTransferMoney = (data?: any) =>
  http.post("transferAccounts/payTransferAccounts", data);



export const MineGetJianGuanAcountMoney = (data?: any) =>
  http.post("users/getMyLoanBalance", data);



export const MineGetMyVolletAndIntegral = (data?: any) =>
  http.post("users/queryBalanceIntegral", data);



export const MineGetLearnToStrongContryData = (data?: any) =>
  http.post("AppAuthority/queryAppUserPartyAuthrity", data);



export const MineGetQunYuanMallData = (data?: any) =>
  http.post("auth/getYnShowMallThings", data);



export const MineHouseInfoAddHouseHistoryList = (data?: any) =>
  http.post("gridCheck/getMySubmitHouseList", data);



export const MineHouseInfoAddHouseHistoryDetail = (data?: any) =>
  http.post("gridCheck/getMySubmitHouseInfo", data);




export const MineJiuYeQunYuanAuthrity = (data?: any) =>
  http.post("AppAuthority/queryAppUserDayJobAuthrity", data);




export const MineJiuYeQunYuanUseWorkerTalkList = (data?: any) =>
  http.post("dayjob/getDayJobOrderList", data);



export const MineJiuYeQunYuanUseWorkerTalkDetail = (data?: any) =>
  http.post("dayjob/getDayJobOrderInfo", data);



export const MineJiuYeQunYuanUseWorkerTalkStart = (data?: any) =>
  http.post("dayjob/getDayJobOrderInfo", data);



export const MineJiuYeQunYuanUseWorkerTalkSureOrder = (data?: any) =>
  http.post("dayjob/completeOrder", data);



export const MineJiuYeQunYuanUseWorkerTalkPauseOrder = (data?: any) =>
  http.post("dayjob/pauseOrder", data);



export const MineJiuYeQunYuanUseWorkerTalkStopOrder = (data?: any) =>
  http.post("dayjob/stopOrder", data);


export const MineJiuYeQunYuanUseWorkerCommentOrder = (data?: any) =>
  http.post("dayjob/stopOrder", data);



export const MineJiuYeQunYuanUseWorkerClockInList = (data?: any) =>
  http.post("dayjob/getDayJobClockInList", data);




export const MineJiuYeQunYuanUseWorkerClockDetail = (data?: any) =>
  http.post("dayjob/getClockInInfo", data);



export const MineJiuYeQunYuanUseWorkerClockSettingInfo = (data?: any) =>
  http.post("dayjob/getClockInSettingInfo", data);




export const MineJiuYeQunYuanUseWorkerClockSaveInfo = (data?: any) =>
  http.post("dayjob/clockInSetting", data);




export const MineJiuYeQunYuanUseWorkerSecondSign = (data?: any) =>
  http.post("dayjob/signOrder", data);



export const MineJiuYeQunYuanUseWorkerChoseWorkList = (data?: any) =>
  http.post("dayjob/getMyCompanyDayJobListToChose", data);



export const MineJiuYeQunYuanUseWorkerGetZhongJieSign = (data?: any) =>
  http.post("dayjob/getHumResComInfo", data);



export const MineJiuYeQunYuanUseWorkerFaSong = (data?: any) =>
  http.post("dayjob/companySubmitOrderInfo", data);



export const MineJiuYeQunYuanUseWorkerMyProtocalList = (data?: any) =>
  http.post("dayjob/getDayJobAgreementList", data);



export const MineJiuYeQunYuanLaoWuOrderIfAccept = (data?: any) =>
  http.post("dayjob/getAcceptStatus", data);



export const MineJiuYeQunYuanLaoWuOrderRemind = (data?: any) =>
  http.post("dayjob/userRemindPay", data);


export const MineJiuYeQunYuanLaoWuOrderGoToDaKa = (data?: any) =>
  http.post("dayjob/clockInOperation", data);



export const MineJiuYeQunYuanLaoWuOrderSupplementSettingInfo = (data?: any) =>
  http.post("dayjob/getClockInSupplementSettingInfo", data);




export const MineJiuYeQunYuanLaoWuOrderBukaGoToDaka = (data?: any) =>
  http.post("dayjob/clockInSupplementOperation", data);



export const MineJiuYeQunYuanLaoWuOrderJieSuanNoteList = (data?: any) =>
  http.post("dayjob/getDayJobDayPayList", data);



export const MineJiuYeQunYuanLaoWuOrderGoToCanCelMoney = (data?: any) =>
  http.post("dayjob/refund", data);



export const MineJiuYeQunYuanLaoWuOrderZhaoPinYesNo = (data?: any) =>
  http.post("dayjob/getComSubmitYn", data);



export const MineJiuYeQunYuanLaoWuOrderZhaoPinUpLoad = (data?: any) =>
  http.post("dayjob/doComSubmit", data);



export const MineJiuYeQunYuanLaoWuOrderZhaoPinDetail = (data?: any) =>
  http.post("dayjob/getComSubmitInfo", data);



export const MineJiuYeQunYuanLaoWuOrderChangeSwitch = (data?: any) =>
  http.post("dayjob/openAndCloseAcceptOrder", data);



export const MineJiuYeQunShareYuanLaoWuOrderChangeSwitch = (data?: any) =>
  http.post("Temporary/TemporayTakeOrder", data);




export const MineJiuYeQunShareYuanLaoWuOrderThirdDetail = (data?: any) =>
  http.post("Temporary/TemporayDetail", data);



export const MineJiuYeQunShareYuanLaoWuOrderSkilllabels = (data?: any) =>
  http.post("Temporary/temporaryTallyAll", data);



export const MineJiuYeQunShareYuanLaoWuOrderServiceStatus = (data?: any) =>
  http.post("personalReceipt/getPersonalServiceStatus", data);


export const MineJiuYeQunShareYuanLaoWuOrderTransferServiceStatus = (data?: any) =>
  http.post("personalReceipt/updatePersonalServiceStatus", data);



export const MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderList = (data?: any) =>
  http.post("personalReceipt/queryPersonalLabourWorkList", data);



export const MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderConfirm = (data?: any) =>
  http.post("personalReceipt/confirmCompletionOrder", data);



export const MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderDetail = (data?: any) =>
  http.post("personalReceipt/queryPersonalLabourWorkView", data);



export const MineJiuYeQunShareYuanLaoWuOrderSheYuanOrderJieDan = (data?: any) =>
  http.post("personalReceipt/confirmPersonalLabourWork", data);



export const MineJiuYeQunShareYuanLaoWuOrderSendOutOrder = (data?: any) =>
  http.post("AppWorkOrder/getWorkSendOutForPage", data);




export const MineJiuYeQunShareUseWorkCompanygetWorkKind = (data?: any) =>
  http.post("dayjobCompany/getWorkKind", data);



export const MineJiuYeQunShareUseWorkCompanySubmitInfo = (data?: any) =>
  http.post("dayjobCompany/companySubmitInfo", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkMessage = (data?: any) =>
  http.post("dayjobCompany/getMyCompanyDayJobList", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkMessageClose = (data?: any) =>
  http.post("dayjobCompany/closeInfo", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkMessageOpen = (data?: any) =>
  http.post("dayjobCompany/openInfo", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkMessageDelete = (data?: any) =>
  http.post("dayjobCompany/deleteInfo", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkMessageDetail = (data?: any) =>
  http.post("dayjobCompany/getMyCompanyDayJobInfo", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkProtocalSetUp = (data?: any) =>
  http.post("dayjobCompany/companySubmitOrderInfo", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkProtocalList = (data?: any) =>
  http.post("dayjobCompany/getDayJobAgreementList", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkTalkList = (data?: any) =>
  http.post("dayjobCompany/getDayJobOrderList", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkPauseOrder = (data?: any) =>
  http.post("dayjobCompany/pauseOrder", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkStopOrder = (data?: any) =>
  http.post("dayjobCompany/stopOrder", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkOpenOrder = (data?: any) =>
  http.post("dayjobCompany/restartOrder", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoPingJiaList = (data?: any) =>
  http.post("dayjobCompany/getDjOrdComWorkerEvaList", data);




export const MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoCheckPingJia = (data?: any) =>
  http.post("dayjobCompany/getWorkerEvaInfo", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkJiXiaoSetUpPingJia = (data?: any) =>
  http.post("dayjobCompany/evaWorker", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkShenHeSure = (data?: any) =>
  http.post("dayjobCompany/completeOrder", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkPayToWayOne = (data?: any) =>
  http.post("dayjobCompany/getDayJobOrderComWorkerList", data);



export const MineJiuYeQunShareUseWorkCompanyUseWorkToJieSuan = (data?: any) =>
  http.post("dayjobCompany/salaryComPayWorker", data);


export const MineJiuYeQunShareUseWorkCompanyUseWorkSureSetUp = (data?: any) =>
  http.post("dayjobCompany/signOrder", data);




export const MineJiuYeQunShareUseWorkCompanyUseWorkCuiYiCui = (data?: any) =>
  http.post("dayjobCompany/userRemindPay", data);



export const MineJiuYeQunShareUseWorkCompanySendUpLoad = (data?: any) =>
  http.post("dayjobCompany/sendWorkerSubmitInfo", data);



export const MineJiuYeQunShareUseWorkCompanySendWorkList = (data?: any) =>
  http.post("dayjobCompany/getMySendWorkerList", data);



export const MineJiuYeQunShareUseWorkCompanySendWorkClose = (data?: any) =>
  http.post("dayjobCompany/closeSendWorkerInfo", data);



export const MineJiuYeQunShareUseWorkCompanySendWorkOpen = (data?: any) =>
  http.post("dayjobCompany/openSendWorkerInfo", data);



export const MineJiuYeQunShareUseWorkCompanySendWorkDelete = (data?: any) =>
  http.post("dayjobCompany/deleteSendWorkerInfo", data);



export const MineJiuYeQunShareUseWorkCompanySendWorkDetailInfo = (data?: any) =>
  http.post("dayjobCompany/getMySendWorkerInfo", data);



export const MineJiuYeQunShareUseWorkCompanySendWorkAddWorker = (data?: any) =>
  http.post("dayjobCompany/companySubmitWorkerInfo", data);

//我的，就业群苑,共享用工，派工企业，员工管理，列表
export const MineJiuYeQunShareUseWorkCompanySendWorkWorkerList = (data?: any) =>
  http.post("dayjobCompany/getMyCompanyWorkerList", data);

//我的，就业群苑,共享用工，派工企业，员工管理，停止接单
export const MineJiuYeQunShareUseWorkCompanySendWorkWorkerStopOrder = (data?: any) =>
  http.post("dayjobCompany/stopAcceptOrder", data);


//我的，就业群苑,共享用工，派工企业，员工管理，详情
export const MineJiuYeQunShareUseWorkCompanySendWorkWorkerDetail = (data?: any) =>
  http.post("dayjobCompany/getMyCompanyWorkerInfo", data);

//我的，就业群苑,共享用工，兼职劳务，兼职登记，提交数据
export const MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiRegist = (data?: any) =>
  http.post("dayjobPartTime/workerSubmitInfo", data);

//我的，就业群苑,共享用工，兼职劳务，兼职登记，登记列表
export const MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiList = (data?: any) =>
  http.post("dayjobPartTime/getMyWorkerDayJobList", data);

//我的，就业群苑,共享用工，兼职劳务，兼职登记，登记列表,关闭
export const MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiClose = (data?: any) =>
  http.post("dayjobPartTime/closeWorkerInfo", data);

//我的，就业群苑,共享用工，兼职劳务，兼职登记，登记列表,打开
export const MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiOpen = (data?: any) =>
  http.post("dayjobPartTime/openeWorkerInfo", data);

//我的，就业群苑,共享用工，兼职劳务，兼职登记，登记列表,删除
export const MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiDelete = (data?: any) =>
  http.post("dayjobPartTime/deleteWorkerInfo", data);

//我的，就业群苑,共享用工，兼职劳务，兼职登记，登记列表,派遣
export const MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiPaiQian = (data?: any) =>
  http.post("dayjobPartTime/applyPlatInfo", data);

//我的，就业群苑,共享用工，兼职劳务，兼职登记，登记详情
export const MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiDetailInfo = (data?: any) =>
  http.post("dayjobPartTime/getMyWorkerDayJobInfo", data);

//我的，就业群苑,共享用工，兼职劳务，兼职登记，登记编辑提交
export const MineJiuYeQunShareUseWorkPartTimeLaoWuDengJiUpdateData = (data?: any) =>
  http.post("dayjobPartTime/updateMyWorkerDayJobInfo", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，列表
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkList = (data?: any) =>
  http.post("dayjobPartTime/getDayJobOrderList", data);


//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，详情
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkDetail = (data?: any) =>
  http.post("dayjobPartTime/getDayJobOrderInfo", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，详情,提交数据
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkSetUpData = (data?: any) =>
  http.post("dayjobPartTime/signOrder", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，详情,确认完成
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCompleteOrder = (data?: any) =>
  http.post("dayjobPartTime/completeOrder", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，详情,结算
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkSalaryPay = (data?: any) =>
  http.post("dayjobPartTime/salaryPay", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，去打卡
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKa = (data?: any) =>
  http.post("dayjobPartTime/getClockInSettingInfo", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，打卡提交
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaSetUp = (data?: any) =>
  http.post("dayjobPartTime/clockInOperation", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，去打卡,打卡列表
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaList = (data?: any) =>
  http.post("dayjobPartTime/getDayJobClockInList", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，去打卡,打卡列表,点击详情
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaDetail = (data?: any) =>
  http.post("dayjobPartTime/getClockInInfo", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，去打卡,打卡列表,补卡
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaBuKaSetting = (data?: any) =>
  http.post("dayjobPartTime/getClockInSupplementSettingInfo", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，去打卡,打卡列表,补卡,去打卡
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkGoDaKaBuKaGoDaKa = (data?: any) =>
  http.post("dayjobPartTime/clockInSupplementOperation", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，暂停
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkPauseOrder = (data?: any) =>
  http.post("dayjobPartTime/pauseOrder", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，停止
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkStopOrder = (data?: any) =>
  http.post("dayjobPartTime/stopOrder", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，开启
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkRestartOrder = (data?: any) =>
  http.post("dayjobPartTime/restartOrder", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，派遣/洽谈工单，查看《绩效考核结果通知书》
export const MineJiuYeQunShareUseWorkPartTimeLaoWuAndUseWorkCheckJiXiaoBook = (data?: any) =>
  http.post("dayjobPartTime/getDayJobOrderEvaInfo", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，协议记录
export const MineJiuYeQunShareUseWorkPartTimeLaoWuProtocalList = (data?: any) =>
  http.post("dayjobPartTime/getDayJobAgreementList", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，列表，去评价
export const MineJiuYeQunShareUseWorkPartTimeGoPingJia = (data?: any) =>
  http.post("dayjobPartTime/evaDayJobOrder", data);

//我的，就业群苑,共享用工，兼职劳务/兼职用工，列表，连续用工
export const MineJiuYeQunShareUseWorkPartTimeContinueOrder = (data?: any) =>
  http.post("dayjobPartTime/continueOrder", data);


//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，获取用工工种
export const MineJiuYeQunShareUseWorkSharePingTaiGetWorkKind = (data?: any) =>
  http.post("dayjobShared/getWorkKind", data);

//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，提交数据
export const MineJiuYeQunShareUseWorkSharePingTaiSubmitInfo = (data?: any) =>
  http.post("dayjobShared/companySubmitInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，用工信息
export const MineJiuYeQunShareUseWorkSharePingTaiUseWorkList = (data?: any) =>
  http.post("dayjobShared/getMyCompanyDayJobList", data);


//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，用工信息,申请派遣
export const MineJiuYeQunShareUseWorkSharePingTaiUseWorkPaiQian = (data?: any) =>
  http.post("dayjobShared/applyPlatInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，用工信息,关闭
export const MineJiuYeQunShareUseWorkSharePingTaiUseWorkClose = (data?: any) =>
  http.post("dayjobShared/closeInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，用工信息,打开
export const MineJiuYeQunShareUseWorkSharePingTaiUseWorkOpen = (data?: any) =>
  http.post("dayjobShared/openInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，用工信息,删除
export const MineJiuYeQunShareUseWorkSharePingTaiUseWorkDelete = (data?: any) =>
  http.post("dayjobShared/deleteInfo", data);


//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，用工信息,详情，（编辑使用详情）
export const MineJiuYeQunShareUseWorkSharePingTaiUseWorkDetail = (data?: any) =>
  http.post("dayjobShared/getMyCompanyDayJobInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工，用工登记，用工信息,编辑
export const MineJiuYeQunShareUseWorkSharePingTaiUseWorkUpdateData = (data?: any) =>
  http.post("dayjobShared/companyUpdateInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，列表
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderList = (data?: any) =>
  http.post("dayjobShared/getDayJobOrderList", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，列表,确认完成
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderCompleteOrder = (data?: any) =>
  http.post("dayjobShared/completeOrder", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，列表,开启
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderOpenOrder = (data?: any) =>
  http.post("dayjobShared/restartOrder", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，列表,暂停
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderPauseOrder = (data?: any) =>
  http.post("dayjobShared/pauseOrder", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，列表,停止
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderStopOrder = (data?: any) =>
  http.post("dayjobShared/stopOrder", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，列表,结算
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderPayOrder = (data?: any) =>
  http.post("dayjobShared/salaryPay", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，详情
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderDetailInfo = (data?: any) =>
  http.post("dayjobShared/getDayJobOrderInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，协议记录
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderProtocalList = (data?: any) =>
  http.post("dayjobShared/getDayJobAgreementList", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，新增员工信息
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderAddNewMember = (data?: any) =>
  http.post("dayjobShared/companySubmitWorkerInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，新增员工信息,列表
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderMemberList = (data?: any) =>
  http.post("dayjobShared/getMyCompanyWorkerList", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，新增员工信息,列表,停止接单
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderMemberStopOrder = (data?: any) =>
  http.post("dayjobShared/stopAcceptOrder", data);

//我的，就业群苑,共享用工，共享平台，共享用工、派工/洽谈、派遣，新增员工信息,列表,详情
export const MineJiuYeQunShareUseWorkSharePingTaiShareUseSendOrderMemberDetail = (data?: any) =>
  http.post("dayjobShared/getMyCompanyWorkerInfo", data);

//我的，就业群苑,中介招聘，发布招聘，列表
export const MineJiuYeQunMediumZhaoPinDataZhiList = (data?: any) =>
  http.post("dayjobMedium/getMyCompanyDayJobList", data);

//我的，就业群苑,中介招聘，发布求职，列表
export const MineJiuYeQunMediumQiuZhiDataZhiList = (data?: any) =>
  http.post("dayjobMedium/getMyWorkerDayJobList", data);

//我的，就业群苑,中介招聘，发布招聘，列表,关闭
export const MineJiuYeQunMediumZhaoPinDataZhiListClose = (data?: any) =>
  http.post("dayjobMedium/closeInfo", data);

//我的，就业群苑,中介招聘，发布求职，列表,关闭
export const MineJiuYeQunMediumQiuZhiDataZhiListClose = (data?: any) =>
  http.post("dayjobMedium/closeWorkerInfo", data);


//我的，就业群苑,中介招聘，发布招聘，列表,打开
export const MineJiuYeQunMediumZhaoPinDataZhiListOpen = (data?: any) =>
  http.post("dayjobMedium/openInfo", data);


//我的，就业群苑,中介招聘，发布求职，列表,打开
export const MineJiuYeQunMediumQiuZhiDataZhiListOpen = (data?: any) =>
  http.post("dayjobMedium/openeWorkerInfo", data);

//我的，就业群苑,中介招聘，发布招聘，列表,删除
export const MineJiuYeQunMediumZhaoPinDataZhiListDelete = (data?: any) =>
  http.post("dayjobMedium/deleteInfo", data);

//我的，就业群苑,中介招聘，发布求职，列表,删除
export const MineJiuYeQunMediumQiuZhiDataZhiListDelete = (data?: any) =>
  http.post("dayjobMedium/deleteWorkerInfo", data);

//我的，就业群苑,中介招聘，发布求职，列表,发布提交
export const MineJiuYeQunMediumQiuZhiDataZhiSetUpData = (data?: any) =>
  http.post("dayjobMedium/companySubmitInfo", data);

//我的，就业群苑,中介招聘，发布求职，列表,详情编辑使用
export const MineJiuYeQunMediumQiuZhiDataZhiDetailDataInfo = (data?: any) =>
  http.post("dayjobMedium/getMyCompanyDayJobInfo", data);

//我的，就业群苑,中介招聘，发布求职，列表,编辑提交
export const MineJiuYeQunMediumQiuZhiDataZhiDetailEditInfo = (data?: any) =>
  http.post("dayjobMedium/companyUpdateInfo", data);

//我的，就业群苑,中介招聘，协议记录
export const MineJiuYeQunMediumQiuZhiDataAgreementList = (data?: any) =>
  http.post("dayjobMedium/getDayJobAgreementList", data);

//我的，就业群苑,中介招聘，协议记录
export const MineJiuYeQunMediumQiuZhiDataAgreementDetail = (data?: any) =>
  http.post("dayjobMedium/getDayJobOrderInfo", data);

//我的，就业群苑,中介招聘，发布求职，更新信息
export const MineJiuYeQunMediumQiuZhiUpdateMyWorkerDayJobInfo = (data?: any) =>
  http.post("dayjobMedium/updateMyWorkerDayJobInfo", data);

//我的，就业群苑,中介招聘，发布求职，提交信息
export const MineJiuYeQunMediumQiuZhiWorkerSubmitInfo = (data?: any) =>
  http.post("dayjobMedium/workerSubmitInfo", data);

//我的，就业群苑,中介招聘，发布求职，详情，用来获取编辑信息
export const MineJiuYeQunMediumQiuZhiGetMyWorkerDayJobInfo = (data?: any) =>
  http.post("dayjobMedium/getMyWorkerDayJobInfo", data);

//我的，就业群苑,中介招聘，洽谈用工,列表
export const MineJiuYeQunMediumQiuZhiZhaoPinGetDayJobOrderList = (data?: any) =>
  http.post("dayjobMedium/getDayJobOrderList", data);

//我的，就业群苑,中介招聘，洽谈用工,列表,暂停
export const MineJiuYeQunMediumQiuZhiZhaoPinGetDayJobOrderListPause = (data?: any) =>
  http.post("dayjobMedium/pauseOrder", data);

//我的，就业群苑,中介招聘，洽谈用工,列表,停止
export const MineJiuYeQunMediumQiuZhiZhaoPinGetDayJobOrderListStop = (data?: any) =>
  http.post("dayjobMedium/stopOrder", data);

//我的，就业群苑,中介招聘，洽谈用工,列表,确认完成
export const MineJiuYeQunMediumQiuZhiZhaoPinGetDayJobOrderListComplete = (data?: any) =>
  http.post("dayjobMedium/completeOrder", data);

//我的，就业群苑,中介招聘，洽谈用工,列表,开启
export const MineJiuYeQunMediumQiuZhiZhaoPinGetDayJobOrderListRestart = (data?: any) =>
  http.post("dayjobMedium/restartOrder", data);


//我的，就业群苑,中介招聘，洽谈用工,列表,结算
export const MineJiuYeQunMediumQiuZhiZhaoPinGetDayJobOrderListSalaryPay = (data?: any) =>
  http.post("dayjobMedium/salaryPay", data);

//我的，就业群苑,共享用工，共享平台，共享用工，派工登记，提交数据
export const MineJiuYeQunShareUseWorkSharePingTaiSendWorkSubmitInfo = (data?: any) =>
  http.post("dayjobShared/sendWorkerSubmitInfo", data);


//我的，就业群苑,共享用工，共享平台，共享用工，派工登记，派工信息
export const MineJiuYeQunShareUseWorkSharePingTaiSendWorkList = (data?: any) =>
  http.post("dayjobShared/getMySendWorkerList", data);

//我的，就业群苑,共享用工，共享平台，共享用工，派工登记，派工信息,关闭
export const MineJiuYeQunShareUseWorkSharePingTaiSendWorkListClose = (data?: any) =>
  http.post("dayjobShared/closeSendWorkerInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工，派工登记，派工信息,打开
export const MineJiuYeQunShareUseWorkSharePingTaiSendWorkListOpen = (data?: any) =>
  http.post("dayjobShared/openSendWorkerInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工，派工登记，派工信息,删除
export const MineJiuYeQunShareUseWorkSharePingTaiSendWorkListDelete = (data?: any) =>
  http.post("dayjobShared/deleteSendWorkerInfo", data);

//我的，就业群苑,共享用工，共享平台，共享用工，派工登记，派工信息,详情
export const MineJiuYeQunShareUseWorkSharePingTaiSendWorkDetail = (data?: any) =>
  http.post("dayjobShared/getMySendWorkerInfo", data);

//我的，我的房产，上传房产信息。loginType=1
export const MineHouseInformationSubmitHseContract = (data?: any) =>
  http.post("houseInformation/submitHseContract", data);

//我的，我的地址，地址管理，编辑地址
export const MineAddressManageMentUpdateAddress = (data?: any) =>
  http.post("address/updateAddress", data);

//我的，我的地址，地址管理，删除地址
export const MineAddressManageMentDeleteAddress = (data?: any) =>
  http.post("address/delAddress", data);

//我的，财务服务，结算支付，兼职工单，结算详情
export const MineFinancialServicePartTimeOrderInfo = (data?: any) =>
  http.post("dayjobPartTime/getPartTimeDJIWithAuditInfo", data);


//我的，财务服务，结算支付，兼职工单，批量结算详情
export const MineFinancialServicePartTimeOrderPiLiangInfo = (data?: any) =>
  http.post("dayjobPartTime/getPtBatPayInfo", data);



//我的，财务服务，结算支付，兼职工单，批量结算详情,驳回
export const MineFinancialServicePartTimeOrderPiLiangBoHui = (data?: any) =>
  http.post("dayjobPartTime/ptBatPayAudit", data);


//我的，财务服务，结算支付，兼职工单，批量结算详情,结算
export const MineFinancialServicePartTimeOrderPiLiangPayAction = (data?: any) =>
  http.post("dayjobPartTime/ptBatchPayDo", data);

//我的，财务服务，结算支付，兼职工单，批量结算详情,工单列表
export const MineFinancialServicePartTimeOrderPiLiangListByUser = (data?: any) =>
  http.post("dayjobPartTime/getPtPayBatAuditListByUser", data);


//我的，财务服务，结算审核，兼职工单，详情
export const MineFinancialServicePartTimeOrderShenHeDetail = (data?: any) =>
  http.post("dayjobPartTime/getPartPayAuditInfoByPush", data);

//我的，财务服务，结算审核，兼职工单，审核
export const MineFinancialServicePartTimeOrderAuditShenHe = (data?: any) =>
  http.post("dayjobPartTime/partTimePayAudit", data);


//我的，财务服务，结算审核，派工工单，审核，通过拒绝
export const MineFinancialServiceSendOrderAuditShenHe = (data?: any) =>
  http.post("dayjobCompany/comSendPayAudit", data);

//我的，财务服务，结算审核，退款，审核，通过拒绝
export const MineFinancialServiceCancelMoneyAuditShenHe = (data?: any) =>
  http.post("refundApply/refundAudit", data);

//我的，财务服务，结算审核，零工工单，审核，通过拒绝
export const MineFinancialServiceLingGongOrderAuditShenHe = (data?: any) =>
  http.post("dayjob/dayJobPayAudit", data);

//我的，财务服务，结算审核，转账工单，审核，通过拒绝
export const MineFinancialServiceZhaunZhangOrderAuditShenHe = (data?: any) =>
  http.post("transferAccounts/transAcctAudit", data);

//消息页，SHOP_SALE_AUDIT_NOTICE，店铺出售信息审核
export const MessageListShopSaleOutShenHeInfo = (data?: any) =>
  http.post("shopSalelandlord/getMyShopSaleInfo", data);

//消息页，ADV_ORD_OUT_WAIT_AUDIT,ADV_ORD_OUT_AUDIT_PASS，预付订单出库信息审核
export const MessageListYuFuOrderOutKuShenHeInfo = (data?: any) =>
  http.post("advancePayShop/getAdvOrdOutAuditInfoByPush", data);

//消息页，ADV_ORD_OUT_WAIT_AUDIT,ADV_ORD_OUT_AUDIT_PASS，预付订单出库信息审核,同意/拒绝操作
export const MessageListYuFuOrderOutKuShenHeRefusePass = (data?: any) =>
  http.post("advancePayShop/advOrdOutAudit", data);

//消息页，WORK_ORDER_PAY_TO_WORKERS_AUDIT_CONFIRM，平台应急工单结算审核
export const MessageListPingTaiEmergencyOrderJieSuan = (data?: any) =>
  http.post("AppWorkOrder/getPayToWorkersAuditInfoByPush", data);

//消息页，WORK_ORDER_PAY_TO_WORKERS_AUDIT_CONFIRM，平台应急工单结算审核,同意/拒绝操作
export const MessageListPingTaiEmergencyOrderRefusePass = (data?: any) =>
  http.post("AppWorkOrder/ptWorkersPayAudit", data);

//消息页，WORK_ORDER_PAY_TO_WORKERS_PAY_CONFIRM，平台应急工单结算审核（worker端）
export const MessageListPingTaiEmergencyOrderWorkerInfo = (data?: any) =>
  http.post("AppWorkOrder/getPtWorkersPayInfo", data);

//消息页，WORK_ORDER_PAY_TO_WORKERS_PAY_CONFIRM，平台应急工单结算审核（worker端）,驳回接口
export const MessageListPingTaiEmergencyOrderWorkerRefuse = (data?: any) =>
  http.post("AppWorkOrder/ptWorkersRefuse", data);

//消息页，WORK_ORDER_PAY_TO_WORKERS_PAY_CONFIRM，平台应急工单结算审核（worker端）,结算支付
export const MessageListPingTaiEmergencyOrderWorkerPayMoney = (data?: any) =>
  http.post("AppWorkOrder/ptWorkersPayDo", data);


//我的，共享劳务，劳务订单，详情,重新发起
export const MineShareLaoWuOrderDetailRebuildOrder = (data?: any) =>
  http.post("AppWorkOrder/rollBackState", data);

//我的，共享劳务，劳务订单，详情,接单或者拒绝
export const MineShareLaoWuOrderDetailAcceptOrRefuseOrder = (data?: any) =>
  http.post("AppWorkOrder/AppacceptOrRefuseOrder", data);

//我的，共享劳务，劳务订单，详情,继续
export const MineShareLaoWuOrderDetailContinueOrder = (data?: any) =>
  http.post("AppWorkOrder/AppReplyPauseWorkOrder", data);

//我的，共享劳务，劳务订单，详情,第一次加价
export const MineShareLaoWuOrderDetailFirstAddPriceOrder = (data?: any) =>
  http.post("AppWorkOrder/AppWorkOrderPrice", data);

//我的，共享劳务，劳务订单，详情,追加
export const MineShareLaoWuOrderDetailZhuiAddPriceOrder = (data?: any) =>
  http.post("AppWorkOrder/AppWorkbackhanderMoney", data);

//我的，共享劳务，劳务订单，Worker认证，第三方兼职，获取服务网点
export const MineShareLaoWuOrderManagementOfficeInformation = (data?: any) =>
  http.post("managementOfficeInformation/queryOffice", data);

//我的，共享劳务，劳务订单，Worker认证，第三方兼职，提交
export const MineShareLaoWuOrderAppTemporayRegister = (data?: any) =>
  http.post("Temporary/AppTemporayRegister", data);

export const PartyBuildPartyProjectList = (data?: any) =>
  http.post('partyProject/queryPartyProjectList', data);

export const PartyBuildPartyProjectDetail = (data?: any) =>
  http.post('partyProject/getPartyProjectInfo', data);


export const PartyBuildPartyProjectJoinProject = (data?: any) =>
  http.post('partyProject/applyJoinProject', data);


export const PartyBuildMyIniPartyProject = (data?: any) =>
  http.post('partyProject/queryMyIniPartyProjectList', data);


export const PartyBuildMyJoinPartyProject = (data?: any) =>
  http.post('partyProject/queryMyJoinPartyProjectList', data);

export const PartyBuildGetMySetUpPartyInfo = (data?: any) =>
  http.post('partyProject/getMyIniPartyProjectInfo', data);


export const PartyBuildMemberAuditList = (data?: any) =>
  http.post('partyProject/queryMemAuditList', data);


export const PartyBuildMemberAudiShenHeInfo = (data?: any) =>
  http.post('partyProject/auditJoinApply', data);


export const PartyBuildProgressAudiList = (data?: any) =>
  http.post('partyProject/queryProgessAuditList', data);


export const PartyBuildProgressAudiShenHeInfo = (data?: any) =>
  http.post('partyProject/auditProgress', data);


export const PartyBuildProgressAudiShenHeDetail = (data?: any) =>
  http.post('partyProject/getProgressInfo', data);


export const PartyBuildMyJoinProjectDetail = (data?: any) =>
  http.post('partyProject/getMyJoinPartyProjectInfo', data);


export const PartyBuildMyJoinProjectProgressList = (data?: any) =>
  http.post('partyProject/queryMyJoinProgressList', data);


export const PartyBuildMyProjectAddProgress = (data?: any) =>
  http.post('partyProject/progressAdd', data);


export const PartyBuildMyProjectAddProject = (data?: any) =>
  http.post('partyProject/initiatePartyProject', data);


export const PartyPublicDiscussComplaintAndAdvice = (data?: any) =>
  http.post('complain/queryComplainList', data);


export const PartyPublicDiscussComplaintAndAdviceDetail = (data?: any) =>
  http.post('complain/queryReply', data);


export const PartyPublicDiscussComplaintAndAdviceRealHousing = (data?: any) =>
  http.post('houseInformation/realHousing', data);


export const WorkQunYuanCompanyInserviceShenPiNormalDetail = (data?: any) =>
  http.post('generalApproval/queryLeaderApprovalView', data);



export const CompanyInserviceNormalShenPiAgreeRefuseData = (data?: any) =>
  http.post('generalApproval/leaderApproval', data);

//审批，选择转发人
export const CompanyInserviceNormalShenPiTransferReceivePerson = (data?: any) =>
  http.post('generalApproval/queryGeneralForwardList', data);

//拨款是否需要验证码		
export const CompanyInserviceNormalShenPiMobileVerification = (data?: any) =>
  http.post('generalApproval/mobileVerification', data);


//拨款
export const CompanyInserviceNormalShenPiAppropriation = (data?: any) =>
  http.post('generalApproval/leaderAppropriation', data);


//审批，转发我的，详情
export const CompanyInserviceNormalShenPiTransferMeDetail = (data?: any) =>
  http.post('generalForwarding/queryReceiverForwardingView', data);



//审批，我的转发，详情
export const CompanyInserviceNormalShenPiMyTransferDetail = (data?: any) =>
  http.post('generalForwarding/queryApprovalForwardingView', data);


//审批，转发操作
export const CompanyInserviceNormalShenPiTransferUpdate = (data?: any) =>
  http.post('generalForwarding/addGeneralForwardingMessage', data);



//结算支付，物业应急工单批量结算
export const FinancialServiceWuYeEmergencyPiLiangJieSuan = (data?: any) =>
  http.post('AppWorkOrder/getWorkOrdBatPayInfo', data);



//结算支付，物业应急工单批量结算,驳回
export const FinancialServiceWuYeEmergencyPiLiangJieSuanRefuse = (data?: any) =>
  http.post('AppWorkOrder/workOrdBatPayRefuse', data);


//结算支付，物业应急工单批量结算,结算支付链接获取
export const FinancialServiceWuYeEmergencyPiLiangJieSuanPayDo = (data?: any) =>
  http.post('AppWorkOrder/workOrdBatchPayDo', data);



//结算审核，物业应急工单批量审核结算
export const FinancialServiceWuYeEmergencyPiLiangJieSuanFonfirm = (data?: any) =>
  http.post('AppWorkOrder/getWorkOrdPayBatAuditInfoByPush', data);



//结算审核，物业应急工单批量审核结算，通过/拒绝
export const FinancialServiceWuYeEmergencyPiLiangJieSuanFonfirmRefusePass = (data?: any) =>
  http.post('AppWorkOrder/workOrdBatPayAudit', data);


//我的，订单管理+OA治理
export const MineOrderManageMentAndOaDataList = (data?: any) =>
  http.post('AppAuthority/queryAppUserOAAuthrity', data);


//我的，服务订单
export const MineServiceOrderList = (data?: any) =>
  http.post('lifeServiceOrder/getLfsOrderList', data);


//我的，服务订单,取消订单
export const MineServiceOrderListCancleOrder = (data?: any) =>
  http.post('lifeServiceOrder/cancleOrder', data);


//我的，服务订单,催一催
export const MineServiceOrderListRemindOrder = (data?: any) =>
  http.post('lifeServiceOrder/remindOrder', data);


//我的，服务订单,催一催
export const MineServiceOrderListOrderPay = (data?: any) =>
  http.post('lifeServiceOrder/orderPay', data);


//我的，服务订单,评价
export const MineServiceOrderListLifeServiceEvaluate = (data?: any) =>
  http.post('lifeService/lifeServiceEvaluate', data);


//我的，服务订单,售后
export const MineServiceOrderListApplyAfterSale = (data?: any) =>
  http.post('vendors/applyAfterSale', data);


//我的，服务订单,介入
export const MineServiceOrderListApplyPlat = (data?: any) =>
  http.post('lifeService/applyPlat', data);


//我的，服务订单,详情
export const MineServiceOrderListDetail = (data?: any) =>
  http.post('lifeServiceOrder/getOrderDetail', data);


//我的，物业工单,报修工单
export const MineWuYeOrderBaoXiuOrderToBePaidList = (data?: any) =>
  http.post('platformEmergency/toBePaidWorkOrderForPage', data);


//我的，物业工单,报修工单
export const MineWuYeOrderBaoXiuOrderEstateList = (data?: any) =>
  http.post('platformEmergency/estateWorkOrderForPage', data);


//我的，物业工单,报修工单,付款，paytype = 1
export const MineWuYeOrderBaoXiuOrderPayTypeOne = (data?: any) =>
  http.post('platformEmergency/estatePayPrice', data);

//我的，物业工单,报修工单,付款，paytype = 2
export const MineWuYeOrderBaoXiuOrderPayTypeTwo = (data?: any) =>
  http.post('platformEmergency/estatePayBackhanderMoney', data);


//我的，志愿工单,列表
export const MineVolunteerOrderUserGetSpritOrderList = (data?: any) =>
  http.post('spritOrder/userGetSpritOrderList', data);



//我的，志愿工单,列表,催一催
export const MineVolunteerOrderUserGetSpritOrderListUrge = (data?: any) =>
  http.post('spritOrder/userUrgeVlo', data);


//我的，志愿工单,列表,确认完成
export const MineVolunteerOrderUserGetSpritOrderListConfirm = (data?: any) =>
  http.post('spritOrder/userConfirmComplete', data);


//我的，必备工具，文体活动，列表
export const MineNeedToolsCultureAndSportsList = (data?: any) =>
  http.post('culSpoCenter/queryCulSpoActList', data);


//我的，必备工具，文体活动，详情
export const MineNeedToolsCultureAndSportsDetail = (data?: any) =>
  http.post('culSpoCenter/getCulSpoActSkuList', data);


//我的，必备工具，文体活动，获取预约时间段
export const MineNeedToolsCultureAndSportsGetHours = (data?: any) =>
  http.post('culSpoCenter/getCulSpoActSkuHourList', data);


//我的，必备工具，文体活动，去预约
export const MineNeedToolsCultureAndSportsYuYue = (data?: any) =>
  http.post('culSpoCenter/culSpoActExeGoods', data);


//我的，必备工具，文体活动，预约记录
export const MineNeedToolsCultureAndSportsYuYueNotes = (data?: any) =>
  http.post('culSpoCenter/queryUserCulSpoPreList', data);


//我的，必备工具，文体活动，预约记录,取消预约
export const MineNeedToolsCultureAndSportsYuYueCancelOrder = (data?: any) =>
  http.post('culSpoCenter/cancleCulSpoActPre', data);


//我的，必备工具，志愿者
export const MineNeedToolsVolunteerGetPersonalInfo = (data?: any) =>
  http.post('spritPersonal/getPersonalInfo', data);


//我的，必备工具，志愿者,志愿认领，催一催
export const MineNeedToolsVolunteerUrgeUser = (data?: any) =>
  http.post('spritOrder/vloUrgeUser', data);


//我的，必备工具，志愿者,我的活动，列表
export const MineNeedToolsVolunteerMyActivityList = (data?: any) =>
  http.post('spritPersonal/queryMyActivityList', data);


//我的，必备工具，志愿者,加入的组织，列表
export const MineNeedToolsVolunteerMyOrganizationList = (data?: any) =>
  http.post('spritPersonal/queryMyOrganizationList', data);


//我的，必备工具，志愿者,加入的组织，列表,退出组织
export const MineNeedToolsVolunteerMyOrganizationExit = (data?: any) =>
  http.post('spritOrganization/userOrganizationExit', data);


//我的，必备工具，志愿者,我的留言
export const MineNeedToolsVolunteerMyleaveWordList = (data?: any) =>
  http.post('spritPersonal/queryMyleaveWordList', data);


//我的，必备工具，志愿者,个人资料，保存
export const MineNeedToolsVolunteerUpdatePersonalInfo = (data?: any) =>
  http.post('spritPersonal/updatePersonalInfo', data);


//我的，必备工具，我的登记，获取个人信息
export const MineNeedToolsMySignInGetUserInfo = (data?: any) =>
  http.post('users/getCheckInUserInfo', data);


//我的，必备工具，我的登记，提交
export const MineNeedToolsMySignInCheckInOption = (data?: any) =>
  http.post('users/checkInOption', data);


//我的，必备工具，我的登记，人员信息，列表
export const MineNeedToolsMySignInGetOtherUserList = (data?: any) =>
  http.post('users/getOtherUserList', data);


//我的，必备工具，我的登记，人员信息，列表,添加人员信息
export const MineNeedToolsMySignInAddOtherUserInfo = (data?: any) =>
  http.post('users/addOtherUserInfo', data);


//我的，必备工具，我的登记，人员信息，列表,添加人员信息
export const MineNeedToolsMySignInGetCheckInOptionList = (data?: any) =>
  http.post('users/getCheckInOptionList', data);


//我的，就业群苑，共享劳务，劳务订单，外派订单，加价，改价
export const MineWorkQunYuanShareLaowuSendOutAddPrice = (data?: any) =>
  http.post('AppWorkOrder/sendOrderQuote', data);


//我的，网格事件，1表示已经有居民信息，跳转列表，0表示没有居民信息，跳转添加居民信息
export const MineWanggeEventsGetYnSubmitHouse = (data?: any) =>
  http.post('gridCheck/getYnSubmitHouse', data);


//我的，商圈管理，商圈信息
export const MineShangquanManageMentGetSelfShopInfo = (data?: any) =>
  http.post('merchant/selfshop/getSelfShopInfo', data);


//我的，商圈管理，门店运营选项
export const MineShangquanManageMentGetApplyYn = (data?: any) =>
  http.post('advancePayShop/getApplyYn', data);



//我的，商圈管理，订单管理，取消/确认订单
export const MineShangquanManageMentSubmitAudit = (data?: any) =>
  http.post('merchant/order/submitAudit', data);


//我的，商圈管理，订单管理，确认提货，确认使用
export const MineShangquanManageMentInitiatingUse = (data?: any) =>
  http.post('merchant/order/initiatingUse', data);


//我的，商圈管理，订单管理，退款售后,同意/拒绝，确认使用
export const MineShangquanManageMentMerchantRefund = (data?: any) =>
  http.post('merchant/order/merchantRefund', data);


//我的，商圈管理，商品管理，获取左侧商品分类列表
export const MineShangquanQuerySelfShopCatListForPage = (data?: any) =>
  http.post('selfShopCat/querySelfShopCatListForPage', data)

//我的，商圈管理，商品管理，获取右侧商品列表
export const MineShangquanQueryGoodsListForPage = (data?: any) =>
  http.post('goods/queryGoodsListForPage', data);

//我的，商圈管理，商品管理，商品上下架与编辑
export const MineShangquanUpGoods = (data?: any) =>
  http.post('goods/upGoods', data);

//我的，商圈管理，预付商品管理，获取左侧商品分类列表
export const MineAdvancePayQuerySelfShopCatList = (data: any) =>
  http.post('advancePayShop/querySelfShopCatList', data)

//我的，商圈管理，预付商品管理，获取右侧商品列表
export const MineAdvancePayQueryGoodsListForPage = (data?: any) =>
  http.post('advancePayShop/queryGoodsListForPage', data);

//我的，商圈管理，预付商品管理，预付商品上下架与编辑
export const MineAdvancePayUpGoods = (data?: any) =>
  http.post('advancePayShop/upGoods', data);

//我的，商圈管理，预付商品管理，删除商品
export const MineAdvancePayDelGoods = (data?: any) =>
  http.post('advancePayShop/delGoods', data);
//我的，商圈管理，订单管理，退款售后,详情
export const MineShangquanManageMentGetAfterSaleDetail = (data?: any) =>
  http.post('merchant/order/getAfterSaleDetail', data);



//我的，商圈管理，商品分类管理
export const MineShangquanManageMentQuerySelfShopCatListForPage = (data?: any) =>
  http.post('selfShopCat/querySelfShopCatListForPage', data);


//我的，商圈管理，商品分类管理,添加商品分类
export const MineShangquanManageMentInsertSelfShopCat = (data?: any) =>
  http.post('selfShopCat/insertSelfShopCat', data);


//我的，商圈管理，商品分类管理,删除商品分类
export const MineShangquanManageMentDelSelfShop = (data?: any) =>
  http.post('selfShopCat/delSelfShop', data);


//我的，门店信息，营业状态修改
export const MineShangquanManageMentStoreInfoUpdateStoreStatus = (data?: any) =>
  http.post('merchant/selfshop/updateStoreStatus', data);


//我的，门店信息，授权管理，获取我的授权列表
export const MineShangquanManageMentStoreInfoGetMyGrantShopList = (data?: any) =>
  http.post('merchant/selfshop/getMyGrantShopList', data);


//我的，门店信息，授权管理，获取我的授权列表,解除授权
export const MineShangquanManageMentStoreInfoRemoveGrantShopManage = (data?: any) =>
  http.post('merchant/selfshop/removeGrantShopManage', data);


//我的，门店信息，授权管理，获取我的授权列表,授权
export const MineShangquanManageMentStoreInfoGrantShopManage = (data?: any) =>
  http.post('merchant/selfshop/grantShopManage', data);


//我的，生活服务管理，待审核已上架已下架列表
export const MineLifeServiceManageMentShenheList = (data?: any) =>
  http.post('lifeServiceGood/upAndDownGoodList', data);


//我的，生活服务管理，我的订单列表
export const MineLifeServiceManageMentMyOrderList = (data?: any) =>
  http.post('lifeServiceOrder/getLfsOrderList', data);


//我的，生活服务管理，我的订单列表，删除
export const MineLifeServiceManageMentShenHeListDelete = (data?: any) =>
  http.post('lifeServiceGood/delLsGood', data);


//我的，生活服务管理，我的订单列表，上架1，下架0
export const MineLifeServiceManageMentShenHeListUpAndDownGood = (data?: any) =>
  http.post('lifeServiceGood/upAndDownGood', data);


//我的，生活服务管理，我的订单列表，接单
export const MineLifeServiceManageMentMyOrderListAcceptOrder = (data?: any) =>
  http.post('lifeServiceOrder/acceptOrder', data);


//我的，生活服务管理，我的订单列表，报价
export const MineLifeServiceManageMentMyOrderListBargainPrice = (data?: any) =>
  http.post('lifeServiceOrder/bargainPrice', data);


//我的，生活服务管理，我的订单列表，退款
export const MineLifeServiceManageMentMyOrderListRefundMoney = (data?: any) =>
  http.post('lifeServiceOrder/refund', data);


//我的，生活服务管理，我的订单列表，确认完成
export const MineLifeServiceManageMentMyOrderListCompleteOrder = (data?: any) =>
  http.post('lifeServiceOrder/completeOrder', data);


//我的，生活服务管理，我的订单列表，同意
export const MineLifeServiceManageMentMyOrderListApplyExamine = (data?: any) =>
  http.post('vendors/applyExamine', data);


//我的，生活服务管理，我的订单列表，发布
export const MineLifeServiceManageMentMyOrderListAddLsGood = (data?: any) =>
  http.post('lifeServiceGood/addLsGood', data);


//我的，土地流转，待流转土地
export const MineLandrentGetLandWaitList = (data?: any) =>
  http.post('landrent/getLandWaitList', data);


//我的，土地流转，待流转土地,个人详情
export const MineLandrentGetLandWaitListGetLandRentInfo = (data?: any) =>
  http.post('landrent/getLandRentInfo', data);


//我的，土地流转，待流转土地,提交
export const MineLandrentGetLandWaitListSubmitLandRentOrder = (data?: any) =>
  http.post('landrent/submitLandRentOrder', data);


//我的，土地流转，待流转土地,历史记录，流转
export const MineLandrentGetLandWaitListHisTransList = (data?: any) =>
  http.post('landrent/getSponsorLandRentOrderList', data);


//我的，土地流转，待流转土地,历史记录，租赁
export const MineLandrentGetLandWaitListHisRentOrderList = (data?: any) =>
  http.post('landrent/getOwnerLandRentOrderList', data);


//我的，土地流转，待流转土地,历史记录，提交
export const MineLandrentGetLandWaitListHisGetMyLandList = (data?: any) =>
  http.post('landrent/getMyLandList', data);


//我的，土地流转，待流转土地,历史记录，流转详情
export const MineLandrentGetLandWaitListHisGetSponsorLandRentOrderInfo = (data?: any) =>
  http.post('landrent/getSponsorLandRentOrderInfo', data);


//我的，土地流转，待流转土地,历史记录，流转详情
export const MineLandrentGetLandWaitListHisGetOwnerLandRentOrderInfo = (data?: any) =>
  http.post('landrent/getOwnerLandRentOrderInfo', data);


//我的，土地流转，待流转土地,历史记录，付款
export const MineLandrentGetLandWaitListHisLandRentOrderPay = (data?: any) =>
  http.post('landrent/landRentOrderPay', data);


//我的，土地流转，待流转土地,历史记录，详情，确认，签字
export const MineLandrentGetLandWaitListHisOwnerLandRentOrderSign = (data?: any) =>
  http.post('landrent/ownerLandRentOrderSign', data);


//我的，土地流转，待流转土地,是否有土地信息
export const MineLandrentGetLandWaitListGetUserYnSubmitComInfo = (data?: any) =>
  http.post('landrent/getUserYnSubmitComInfo', data);


//我的，土地流转，待流转土地,获取公司信息
export const MineLandrentGetLandWaitListgetSubmitComInfo = (data?: any) =>
  http.post('landrent/getSubmitComInfo', data);


//我的，土地流转，待流转土地,提交公司信息
export const MineLandrentGetLandWaitListSubmitComInfo = (data?: any) =>
  http.post('landrent/submitComInfo', data);


//我的，土地流转，待流转土地,流转记录，提交列表，详情展示
export const MineLandrentGetLandWaitListNotesTiJiaoDetail = (data?: any) =>
  http.post('landrent/getLandInfo', data);


//我的，土地流转，待流转土地,流转记录，提交(编辑已有公司信息)
export const MineLandrentGetLandWaitListNotesEditSubmitLandRent = (data?: any) =>
  http.post('landrent/editSubmitLandRent', data);



//我的，房屋租售，出租发布，住宅信息，列表
export const MineHouseSaleRentQueryHouseRentalReleaseList = (data?: any) =>
  http.post('houseRentalRelease/queryHouseRentalReleaseList', data);


//我的，房屋租售，出租发布，商铺信息，列表
export const MineHouseSaleRentGetMyShopRentList = (data?: any) =>
  http.post('shoprentlandlord/getMyShopRentList', data);


//我的，商圈管理，用户评价，列表
export const MineShangquanManageMentQueryEvaluationManagementForPage = (data?: any) =>
  http.post('evaluationManagement/queryEvaluationManagementForPage', data);


//我的，商圈管理，用户评价，列表，回复
export const MineShangquanManageMentEvaluationManagementEvaluation = (data?: any) =>
  http.post('evaluationManagement/evaluationManagementEvaluation', data);


//我的，商圈管理，优惠券管理，列表
export const MineShangquanManageMentQueryShopCouponListForPage = (data?: any) =>
  http.post('coupon/queryShopCouponListForPage', data);


//我的，商圈管理，优惠券管理，列表,删除
export const MineShangquanManageMentQueryShopCouponListDeleteCouponById = (data?: any) =>
  http.post('coupon/deleteCouponById', data);


//我的，商圈管理，优惠券管理，列表,新增优惠券
export const MineShangquanManageMentQueryShopCouponListSaveCoupon = (data?: any) =>
  http.post('coupon/saveCoupon', data);


//我的，商圈管理，优惠券管理，列表,编辑优惠券
export const MineShangquanManageMentQueryShopCouponListUpCoupon = (data?: any) =>
  http.post('coupon/upCoupon', data);

export const cancleShopRent = (data?: any) =>
  http.post('shoprentlandlord/cancleShopRent', data);

export const cancleShopSale = (data?: any) =>
  http.post('shopSalelandlord/cancleShopSale', data);

export const getMyShopRentList = (data?: any) =>
  http.post('shoprentlandlord/getMyShopRentList', data);

export const queryHouseRentalReleaseList = (data?: any) =>
  http.post('houseRentalRelease/queryHouseRentalReleaseList', data);

export const queryHouseSaleReleaseList = (data?: any) =>
  http.post('houseSaleRelease/queryHouseSaleReleaseList', data);

export const getMyShopSaleList = (data?: any) =>
  http.post('shopSalelandlord/getMyShopSaleList', data);


export const queryHouseSaleReleaseView = (data?: any) =>
  http.post('houseSaleRelease/queryHouseSaleReleaseView', data);
export const cancelHouseSaleReleaseMessage = (data?: any) =>
  http.post('houseSaleRelease/cancelHouseSaleReleaseMessage', data);
export const delHouseSaleReleaseMessage = (data?: any) =>
  http.post('houseSaleRelease/delHouseSaleReleaseMessage', data);
export const delHouseRentalReleaseMessage = (data?: any) =>
  http.post('houseRentalRelease/delHouseRentalReleaseMessage', data);
export const cancelHouseRentalReleaseMessage = (data?: any) =>
  http.post('houseRentalRelease/cancelHouseRentalReleaseMessage', data);
export const queryHouseRentalReleaseView = (data?: any) =>
  http.post('houseRentalRelease/queryHouseRentalReleaseView', data);
// export const getMyShopSaleInfo = (data?:any) =>
// 		http.post('shopSalelandlord/getMyShopSaleInfo',data);
export const getShopRentInfo = (data?: any) =>
  http.post('shoprentlandlord/getShopRentInfo', data);

export const CheckPhonegetCode = (data?: any) =>
  http.post("generalApproval/leaderVerification", data);

export const AppGetWorkOrderByWorker = (data?: any) =>
  http.post("AppWorkOrder/AppGetWorkOrderByWorker", data);

export const queryDictAllList = (data?: any) =>
  http.post('houseRentalRelease/queryDictAllList', data);
export const addHouseRentalReleaseMessage = (data?: any) =>
  http.post('houseRentalRelease/addHouseRentalReleaseMessage', data);
export const queryRentalDict = (data?: any) =>
  http.post('houseRentalRelease/queryRentalDict', data);
export const addHouseSaleReleaseMessage = (data?: any) =>
  http.post('houseSaleRelease/addHouseSaleReleaseMessage', data);
export const landLoadSubmitShopSale = (data?: any) =>
  http.post('shopSalelandlord/landLoadSubmitShopSale', data);
export const landLoadSubmitShopRent = (data?: any) =>
  http.post('shoprentlandlord/landLoadSubmitShopRent', data);

export const shoprentgetHouseList = (data?: any) =>
  http.post('shoprentlandlord/getHouseList', data);

export const shopSalegetHouseList = (data?: any) =>
  http.post('shopSalelandlord/getHouseList', data);

export const AppCuiruOrder = (data?: any) =>
  http.post("AppWorkOrder/AppCuiruOrder", data);


export const BeginWorkOrder = (data?: any) =>
  http.post("AppWorkOrder/BeginWorkOrder", data);

export const finishedSignOrder = (data?: any) =>
  http.post("AppWorkOrder/finishedSignOrder", data);

export const AppConsentBackhanderMoney = (data?: any) =>
  http.post("AppWorkOrder/AppConsentBackhanderMoney", data);

export const AppConsentWordOrderPrice = (data?: any) =>
  http.post("AppWorkOrder/AppConsentWordOrderPrice", data);

export const CancelWorkordersale = (data?: any) =>
  http.post("AppWorkOrder/CancelWorkordersale", data);

export const AppOwnerPayBackhanderMoney = (data?: any) =>
  http.post("AppWorkOrder/AppOwnerPayBackhanderMoney", data);

export const AppOwnerPayPrice = (data?: any) =>
  http.post("AppWorkOrder/AppOwnerPayPrice", data);

//已有用户授权房产
export const MineHouseInfomationAuthDonePersonhorize = (data?: any) =>
  http.post('houseInformation/authorizeOthers', data);


//新用户授权房产
export const MineHouseInfomationAuthNewAcountPersonhorize = (data?: any) =>
  http.post('houseInformation/authorizeOthersRegister', data);




//我的房产，房产详情，房产租售，委托出租
export const MineHouseInfomationWeiTuoHouseSell = (data?: any) =>
  http.post('houseInformation/houseSell', data);


//我的房产，房产详情，房产租售，委托出租
export const MineHouseInfomationWeiTuoRentOut = (data?: any) =>
  http.post('houseInformation/houseRent', data);



//我的，商圈管理，商品审核，列表
export const MineShangquanManageMentQueryGoodsPublicListForPage = (data?: any) =>
  http.post('goods/queryGoodsPublicListForPage', data);



//我的，商圈管理，商品审核，列表,删除操作
export const MineShangquanManageMentQueryGoodsDelGoodsPublic = (data?: any) =>
  http.post('goods/delGoodsPublic', data);



//我的，商圈管理，商品审核，列表,重新提交
export const MineShangquanManageMentQueryGoodsUpGoodsPublic = (data?: any) =>
  http.post('goods/upGoodsPublic', data);



//我的，商圈管理，预付店铺申请，获取关联集团
export const MineShangquanManageMentYufuStoreGetGroupList = (data?: any) =>
  http.post('advancePayShop/getGroupList', data);


//我的，商圈管理，预付店铺申请，获取类目
export const MineShangquanManageMentYufuStoreGetCategary = (data?: any) =>
  http.post('advancePayShop/getCategary', data);



//我的，商圈管理，预付店铺申请，提交
export const MineShangquanManageMentYufuStoreApplyShop = (data?: any) =>
  http.post('advancePayShop/applyShop', data);


//我的，商圈管理，预付店铺申请，认证状态
export const MineShangquanManageMentYufuStoreGetDisSetInfo = (data?: any) =>
  http.post('advancePayShop/getDisSetInfo', data);



//我的，商圈管理，预付店铺申请，是否同意政府折扣
export const MineShangquanManageMentYufuStoreShopUserConfirmDis = (data?: any) =>
  http.post('advancePayShop/shopUserConfirmDis', data);


//我的，商圈管理，预付店铺申请，详情
export const MineShangquanManageMentYufuStoreShopGetApplyInfo = (data?: any) =>
  http.post('advancePayShop/getApplyInfo', data);


//我的，商圈管理，商品规格管理，列表
export const MineShangquanManageMentProductDescManagementList = (data?: any) =>
  http.post('specquerySpec/querySpec', data);



//我的，商圈管理，商品规格管理，列表,添加规格
export const MineShangquanManageMentProductDescAddSpec = (data?: any) =>
  http.post('specquerySpec/addSpec', data);


//我的，商圈管理，商品规格管理，列表,删除规格
export const MineShangquanManageMentProductDescDelSpec = (data?: any) =>
  http.post('specquerySpec/delSpec', data);


//我的，商圈管理，商品规格管理，列表,编辑规格
export const MineShangquanManageMentProductDescEditSpec = (data?: any) =>
  http.post('specquerySpec/editSpec', data);


//我的，商圈管理，商品规格管理，列表,编辑详情删除规格
export const MineShangquanManageMentProductDescDelSpecDetail = (data?: any) =>
  http.post('specquerySpec/delSpecDetail', data);


//我的，物业报修，历史记录，列表
export const MineWuYeBaoXiuHistoryAppComWorkOraderForForPage = (data?: any) =>
  http.post('AppWorkOrder/AppComWorkOraderForForPage', data);

// 我的，商圈管理，编辑规格，获取所有规格列表
export const MineShangquanQuerySpec = (data?: any) =>
  http.post('specquerySpec/querySpec', data);

// 我的，商圈管理，新增商品
export const MineShangquanAddGoods = (data?: any) =>
  http.post('goods/addGoods', data);

// 我的，商圈管理，预付商品管理，分页获取预付商品分类列表
export const MineAdvancePayQuerySelfShopCatListForPage = (data?: any) =>
  http.post('advancePayShop/querySelfShopCatListForPage', data);

//我的，商圈管理，预付商品管理，添加商品
export const MineAdvancePayAddGoods = (data?: any) =>
  http.post('advancePayShop/addGoods', data);
