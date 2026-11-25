/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
// 【关键】全局声明 uview-plus 组件，解决 TS 报红
import 'vue';

declare module 'vue' {
  export interface GlobalComponents {
    // 表单相关
    'u--form': typeof import('uview-plus/components/u--form/u--form.vue')['default'];
    'u-form-item': typeof import('uview-plus/components/u-form-item/u-form-item.vue')['default'];
    
    // 输入与按钮
    'u--input': typeof import('uview-plus/components/u--input/u--input.vue')['default'];
    'u--textarea': typeof import('uview-plus/components/u--textarea/u--textarea.vue')['default'];
    'u-button': typeof import('uview-plus/components/u-button/u-button.vue')['default'];
    
    // 文本与图标
    'u--text': typeof import('uview-plus/components/u--text/u--text.vue')['default'];
    'u-text': typeof import('uview-plus/components/u-text/u-text.vue')['default'];
    'u-icon': typeof import('uview-plus/components/u-icon/u-icon.vue')['default'];
    
    // 布局
    'u-row': typeof import('uview-plus/components/u-row/u-row.vue')['default'];
    'u-col': typeof import('uview-plus/components/u-col/u-col.vue')['default'];
    
    // 选择器
    'u-checkbox': typeof import('uview-plus/components/u-checkbox/u-checkbox.vue')['default'];
    'u-checkbox-group': typeof import('uview-plus/components/u-checkbox-group/u-checkbox-group.vue')['default'];
    'u-radio': typeof import('uview-plus/components/u-radio/u-radio.vue')['default'];
    'u-radio-group': typeof import('uview-plus/components/u-radio-group/u-radio-group.vue')['default'];

    // 其他常用组件（按需添加，如果还报红就继续往这里加）
    'u-popup': typeof import('uview-plus/components/u-popup/u-popup.vue')['default'];
    'u-modal': typeof import('uview-plus/components/u-modal/u-modal.vue')['default'];
    'u-toast': typeof import('uview-plus/components/u-toast/u-toast.vue')['default'];
    'u-loading-icon': typeof import('uview-plus/components/u-loading-icon/u-loading-icon.vue')['default'];
  }
}