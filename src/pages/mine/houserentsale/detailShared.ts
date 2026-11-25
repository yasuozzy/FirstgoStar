import { BaseImgURL } from '@/utils/storage';

export function resolveImage(path = '') {
  if (!path) {
    return '';
  }
  if (/^https?:\/\//.test(path) || path.startsWith('data:') || path.startsWith('/static/')) {
    return path;
  }
  return `${BaseImgURL}${path}`;
}

export function normalizeCode(value: string | number | null | undefined) {
  return String(value ?? '');
}

export function splitImages(value?: string | string[] | null) {
  const list = Array.isArray(value) ? value : String(value || '').split(',');
  return list
    .flatMap((item) => String(item).split(','))
    .map((item) => item.trim())
    .filter((item) => !!item);
}

export function splitLabels(value?: string | null) {
  if (!value) {
    return [];
  }
  return String(value)
    .split(',')
    .map((item) => item.replace(/,/g, '').trim())
    .filter((item) => !!item);
}

export function previewImages(urls: string[], current = 0) {
  const list = urls.filter((item) => !!item);
  if (!list.length) {
    return;
  }
  const index = Math.min(Math.max(current, 0), list.length - 1);
  uni.previewImage({
    current: list[index],
    urls: list,
  });
}
