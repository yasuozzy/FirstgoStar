export const DETAIL_ASSETS = {
  urgent: '/static/urgent.png',
  emergency: '/static/home/emergency.png',
  indoor: '/static/indoor.png',
  outdoor: '/static/outdoor.png',
  voice: '/static/adj.png',
};

export const getMaintainTypeAsset = (maintainType?: number) => {
  if (maintainType === 1) return DETAIL_ASSETS.emergency;
  if (maintainType === 2) return DETAIL_ASSETS.indoor;
  return DETAIL_ASSETS.outdoor;
};
