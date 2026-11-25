import { http } from "@/utils/request";

export const dayjobPolicyList = (data) =>
  http.post("dayjobPolicy/appQueryFlow", data);

export const dayjobPolicyDetail = (data) =>
  http.post("dayjobPolicy/appFlowDetail", data);


export const dayjobCompanyList = (data) =>
  http.post("dayjob/getCompanyDayJobList", data);

export const dayjobWorkTypeList = (data) =>
  http.post("dayjob/getWorkTypeList", data);

export const dayjobWorkerList = (data) =>
  http.post("dayjob/getWorkerDayJobList", data);

export const workerSubmitInfo = (data) =>
  http.post("dayjobMedium/workerSubmitInfo", data);

export const companySubmitInfo = (data) =>
  http.post("dayjobMedium/companySubmitInfo", data);
  
export const dayjobLawyerList = (data) =>
  http.post("dayjobLegal/getLawyerList", data);

export const dayjobProfessionList = (data) =>
  http.post("dayjobLegal/getProfessionList", data);
export const dayjobLawMyApplyList = (data) =>
  http.post("dayjobLegal/getMyApplyList", data);

export const LawMyAgreementList = (data) =>
  http.post("dayjobLegal/getMyAgreementList", data);
export const LawMyPayedAskList = (data) =>
  http.post("dayjobLegal/getMyPayedAskList", data);
export const LawMyFreeAskList = (data) =>
  http.post("dayjobLegal/getMyFreeAskList", data);

export const LawLawyerMessageList = (data) =>
  http.post("dayjobLegal/getLawyerMyMessageList", data);
export const LawUserMessageList = (data) =>
  http.post("dayjobLegal/getUserMyMessageList", data);

export const getPlatSendApplyList = (data) =>
  http.post("dayjobLegal/getPlatSendApplyList", data);

export const getAgreementServiceKind = (data) =>
  http.post("dayjobLegal/getAgreementServiceKind", data);

export const sendAgreement = (data) =>
  http.post("dayjobLegal/sendAgreement", data);


export const wugongdengjiworkkind = (data) =>
  http.post("dayjob/getWorkKind", data);
export const rencaizhaopinworkkind = (data) =>
  http.post("dayjobMedium/getWorkKind", data);



export const getYnSubmitJobInfo = (data) =>
  http.post("dayjobMedium/getYnSubmitJobInfo", data);

export const getYnSubmitWorkerInfo = (data) =>
  http.post("dayjobMedium/getYnSubmitWorkerInfo", data);

export const getMyCompanyDayJobList = (data) =>
  http.post("dayjob/getMyCompanyDayJobList", data);

export const deleteInfo = (data) =>
  http.post("dayjob/deleteInfo", data);

export const closeInfo = (data) =>
  http.post("dayjob/closeInfo", data);

export const openInfo = (data) =>
  http.post("dayjob/openInfo", data);

export const applyPlatInfo = (data) =>
  http.post("dayjob/applyPlatInfo", data);


export const closeWorkerInfo = (data) =>
  http.post("dayjob/closeWorkerInfo", data);

export const openeWorkerInfo = (data) =>
  http.post("dayjob/openeWorkerInfo", data);

export const deleteWorkerInfo = (data) =>
  http.post("dayjob/deleteWorkerInfo", data);


export const wugongdengjiList = (data) =>
  http.post("dayjob/getMyWorkerDayJobList", data);


export const wugongdengjiSubmitInfo = (data) =>
  http.post("dayjob/workerSubmitInfo", data);

export const getZhaoPinJobList = (data) =>
  http.post("dayjobMedium/getWorkerDayJobList", data);

export const getQiuZhiJobList = (data) =>
  http.post("dayjobMedium/getCompanyDayJobList", data);

export const getQiYeYongGongList = (data) =>
  http.post("dayjobCompany/getCompanyDayJobList", data);
export const getQiYePaiGongList = (data) =>
  http.post("dayjobCompany/getCompanySendWorkerList", data);
export const getLaoWuJianZhiList = (data) =>
  http.post("dayjobPartTime/getWorkerDayJobList", data);
export const getYongGongGongXiangList = (data) =>
  http.post("dayjobShared/getCompanyDayJobList", data);
export const getYongPaiGongXiangList = (data) =>
  http.post("dayjobShared/getCompanySendWorkerList", data);


export const getQiYeYongGongDetail = (data) =>
  http.post("dayjobCompany/getMyCompanyDayJobInfo", data);
export const getQiYePaiGongDetail = (data) =>
  http.post("dayjobCompany/getMySendWorkerInfo", data);
export const getLaoWuJianZhiDetail = (data) =>
  http.post("dayjobPartTime/getMyWorkerDayJobInfo", data);
export const getYongGongGongXiangDetail = (data) =>
  http.post("dayjobShared/getMyCompanyDayJobInfo", data);
export const getYongPaiGongXiangDetail = (data) =>
  http.post("dayjobShared/getMySendWorkerInfo", data);


export const dayjobcompanySubmitInfo = (data) =>
  http.post("dayjob/companySubmitInfo", data);
export const dayjobcompanyUpdateInfo = (data) =>
  http.post("dayjob/companyUpdateInfo", data);



export const getMyCompanyDayJobInfo = (data) =>
  http.post("dayjob/getMyCompanyDayJobInfo", data);
export const getHumResComInfo = (data) =>
  http.post("dayjob/getHumResComInfo", data);

export const companySubmitOrderInfo = (data) =>
  http.post("dayjob/companySubmitOrderInfo", data);

export const getPublicServiceKind = (data) =>
  http.post("dayjobLegal/getPublicServiceKind", data);

export const userSubmitAidApply = (data) =>
  http.post("dayjobLegal/userSubmitAidApply", data);

export const getLegalApplyInfo = (data) =>
  http.post("dayjobLegal/getApplyInfo", data);

export const getLegalAgreementInfo = (data) =>
  http.post("dayjobLegal/getAgreementInfo", data);

export const paidAgreementUserSign = (data) =>
  http.post("dayjobLegal/paidAgreementUserSign", data);

export const freeAgreementUserSign = (data) =>
  http.post("dayjobLegal/freeAgreementUserSign", data);

export const dealWithApply = (data) =>
  http.post("dayjobLegal/dealWithApply", data);

export const stopApply = (data) =>
  http.post("dayjobLegal/stopApply", data);
export const pauseApply = (data) =>
  http.post("dayjobLegal/pauseApply", data);

export const finishApply = (data) =>
  http.post("dayjobLegal/finishApply", data);

export const getUserLawyerMessageInfo = (data) =>
  http.post("dayjobLegal/getUserLawyerMessageInfo", data);
export const sendMessage = (data) =>
  http.post("dayjobLegal/sendMessage", data);
export const payAskFee = (data) =>
  http.post("dayjobLegal/payAskFee", data);

export const dayjobcompanySubmitOrderInfo = (data) =>
  http.post("dayjobCompany/companySubmitOrderInfo", data);

export const PartTimecompanySubmitOrderInfo = (data) =>
  http.post("dayjobPartTime/companySubmitOrderInfo", data);

export const SharedcompanySubmitOrderInfo = (data) =>
  http.post("dayjobShared/companySubmitOrderInfo", data);

export const MediumcompanySubmitOrderInfo = (data) =>
  http.post("dayjobMedium/companySubmitOrderInfo", data);

export const PartTimegetWorkKind = (data) =>
  http.post("dayjobPartTime/getWorkKind", data);

export const filePreview = (data) =>
  http.post("users/filePreview", data);

export const updateWaybillInfo = (data) =>
  http.post("estate/recycleOrder/updateWaybillInfo", data);
  export const getMyWorkerDayJobInfo = (data?: any) =>
    http.post("dayjob/getMyWorkerDayJobInfo", data);
export const updateMyWorkerDayJobInfo = (data?: any) => 
  http.post("dayjob/updateMyWorkerDayJobInfo", data);