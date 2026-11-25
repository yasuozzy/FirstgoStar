/**
 * UTS 插件安全桥接层
 * 当 UTS 插件编译失败时提供空实现，防止整个应用崩溃
 */

// #ifdef APP-PLUS
// @ts-ignore
import * as nativePlugin from '@/uni_modules/tuikit-atomic-x';
// #endif

// #ifndef APP-PLUS
const nativePlugin = {};
// #endif

const _callAPI = nativePlugin && nativePlugin.callAPI;
const _addListener = nativePlugin && nativePlugin.addListener;
const _removeListener = nativePlugin && nativePlugin.removeListener;
const _reportUIPlatform = nativePlugin && nativePlugin.reportUIPlatform;
const _pluginReady = typeof _callAPI === 'function';

if (!_pluginReady) {
  console.warn('[tuikit-bridge] UTS 插件未就绪，使用空实现');
}

function noop(..._args: any[]): void {}
function noopCallback(_json: string, callback?: (res: string) => void): void {
  if (callback) {
    callback(JSON.stringify({ code: -1, message: 'UTS plugin not available' }));
  }
}

export const callAPI: (json: string, callback: (res: string) => void) => void =
  _pluginReady && _callAPI ? _callAPI : noopCallback;

export const addListener: (options: any, callback: (data: string) => void) => void =
  _pluginReady && _addListener ? _addListener : noop;

export const removeListener: (options: any) => void =
  _pluginReady && _removeListener ? _removeListener : noop;

export const reportUIPlatform: () => void =
  _pluginReady && _reportUIPlatform ? _reportUIPlatform : noop;

// ========== CallState 需要的原生能力 ==========
const _setVirtualBackground = nativePlugin && nativePlugin.setVirtualBackground;
const _startFloatView = nativePlugin && nativePlugin.startFloatView;
const _stopFloatView = nativePlugin && nativePlugin.stopFloatView;
const _addFloatViewListener = nativePlugin && nativePlugin.addFloatViewListener;
const _removeFloatViewListener = nativePlugin && nativePlugin.removeFloatViewListener;
const _startVibrating = nativePlugin && nativePlugin.startVibrating;
const _stopVibrating = nativePlugin && nativePlugin.stopVibrating;
const _enableMultiDeviceAbility = nativePlugin && nativePlugin.enableMultiDeviceAbility;
const _startForegroundService = nativePlugin && nativePlugin.startForegroundService;
const _stopForegroundService = nativePlugin && nativePlugin.stopForegroundService;
const _setCallFramework = nativePlugin && nativePlugin.setCallFramework;

export const setVirtualBackground: (enable: boolean) => void =
  _pluginReady && _setVirtualBackground ? _setVirtualBackground : noop;
export const startFloatView: (options: string, callback?: (code: number, message: string) => void) => void =
  _pluginReady && _startFloatView ? _startFloatView : noop;
export const stopFloatView: () => void =
  _pluginReady && _stopFloatView ? _stopFloatView : noop;
export const addFloatViewListener: (click: () => void) => void =
  _pluginReady && _addFloatViewListener ? _addFloatViewListener : noop;
export const removeFloatViewListener: () => void =
  _pluginReady && _removeFloatViewListener ? _removeFloatViewListener : noop;
export const startVibrating: () => void =
  _pluginReady && _startVibrating ? _startVibrating : noop;
export const stopVibrating: () => void =
  _pluginReady && _stopVibrating ? _stopVibrating : noop;
export const enableMultiDeviceAbility: (enable: boolean) => void =
  _pluginReady && _enableMultiDeviceAbility ? _enableMultiDeviceAbility : noop;
export const startForegroundService: (...args: any[]) => void =
  _pluginReady && _startForegroundService ? _startForegroundService : noop;
export const stopForegroundService: (...args: any[]) => void =
  _pluginReady && _stopForegroundService ? _stopForegroundService : noop;
export const setCallFramework: (framework: number) => void =
  _pluginReady && _setCallFramework ? _setCallFramework : noop;

const _reportScene = nativePlugin && nativePlugin.reportScene;
const _reportMetrics = nativePlugin && nativePlugin.reportMetrics;
const _setFramework = nativePlugin && nativePlugin.setFramework;
const _invokeEngineBridgeApi = nativePlugin && nativePlugin.invokeEngineBridgeApi;
const _addEngineBridgeObserver = nativePlugin && nativePlugin.addEngineBridgeObserver;
const _removeEngineBridgeObserver = nativePlugin && nativePlugin.removeEngineBridgeObserver;
const _showAlbumPicker = nativePlugin && nativePlugin.showAlbumPicker;
const _pickSingleImageFromAlbum = nativePlugin && nativePlugin.pickSingleImageFromAlbum;

export const reportScene: (scene: string) => void =
  _pluginReady && _reportScene ? _reportScene : noop;
export const reportMetrics: (type: string) => void =
  _pluginReady && _reportMetrics ? _reportMetrics : noop;
export const setFramework: (component: number) => void =
  _pluginReady && _setFramework ? _setFramework : noop;
export const invokeEngineBridgeApi: (
  api: string,
  params: string,
  callback: (code: number, message: string, data: string) => void
) => void =
  _pluginReady && _invokeEngineBridgeApi
    ? _invokeEngineBridgeApi
    : (_api, _params, callback) => callback?.(-1, 'UTS plugin not available', '');
export const addEngineBridgeObserver: (
  listenerID: string,
  callback: (eventName: string, data: string) => void
) => void =
  _pluginReady && _addEngineBridgeObserver ? _addEngineBridgeObserver : noop;
export const removeEngineBridgeObserver: (listenerID: string) => void =
  _pluginReady && _removeEngineBridgeObserver ? _removeEngineBridgeObserver : noop;
export const showAlbumPicker: (...args: any[]) => void =
  _pluginReady && _showAlbumPicker ? _showAlbumPicker : noop;
export const pickSingleImageFromAlbum: (
  onSuccess: (tempFilePath: string) => void,
  onCancel: () => void
) => void =
  _pluginReady && _pickSingleImageFromAlbum
    ? _pickSingleImageFromAlbum
    : (_onSuccess, onCancel) => onCancel?.();

export const isPluginReady = (): boolean => _pluginReady;

/** HybridCallOptions 类型（从 UTS 接口复制） */
export type HybridCallOptions = {
  api: string;
  params: Record<string, any>;
};

export type HybridResponseData<T = any> = {
  code: number;
  message?: string;
  data?: T;
};
