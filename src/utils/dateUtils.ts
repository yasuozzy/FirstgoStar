/**
 * 判断当前时间（或指定时间）是否在开始时间和结束时间范围内
 * @param startDateStr 开始时间字符串 (如 "2025-01-01 00:00:00")
 * @param endDateStr 结束时间字符串 (如 "2025-12-31 23:59:59")
 * @returns { isInRange: boolean, message: string }
 */
export function isDateInRange(
  startDateStr?: string,
  endDateStr?: string
): { isInRange: boolean; message: string } {
  if (!startDateStr || !endDateStr) {
    return { isInRange: true, message: '时间范围有效' };
  }

  const now = new Date().getTime();
  const start = new Date(startDateStr.replace(/-/g, '/')).getTime();
  const end = new Date(endDateStr.replace(/-/g, '/')).getTime();

  if (!isNaN(start) && now < start) {
    return { isInRange: false, message: '活动/服务尚未开始' };
  }

  if (!isNaN(end) && now > end) {
    return { isInRange: false, message: '活动/服务已经结束' };
  }

  return { isInRange: true, message: '在允许的时间范围内' };
}
