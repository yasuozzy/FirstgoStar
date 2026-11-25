# x-native-uploader 原生文件上传组件

`x-native-uploader` 是一个跨平台的文件上传组件，专为解决 UniApp 在 App 端文件选择与上传的痛点而设计。它集成了 Native.js 的能力，支持在 Android 和 iOS 上调用原生文件选择器，同时兼容 H5 和小程序平台。

## 功能特性

*   📱 **原生体验**: App 端使用 Native.js 调用系统原生文件选择器 (Intent / UIDocumentPicker)，支持选择任意类型文件。
*   🚀 **高性能上传**: App 端使用 `plus.uploader` 实现原生上传，支持后台传输、大文件上传，比 WebView AJAX 更稳定。
*   🔄 **跨平台兼容**: 自动降级处理，H5 使用 `uni.chooseFile`，小程序使用 `uni.chooseMessageFile`，一套代码多端运行。
*   📦 **多选支持**: 支持一次选择多个文件进行批量上传 (Android/iOS/H5/MP)。
*   🛠️ **灵活配置**: 支持自定义上传 URL、Header、FormData 以及自定义触发按钮 UI。
*   📄 **PDF 及其他文件支持**: 完美处理 Android 平台的 `content://` URI 文件路径，确保 PDF、Word 等各种文档类型的正确上传。

## 引入组件

```javascript
import xNativeUploader from '@/components/x-native-uploader/x-native-uploader.vue';

export default {
  components: {
    xNativeUploader
  }
}
```

## 代码演示

### 基础用法 (单选)

默认点击按钮选择单个文件并自动上传。

```html
<x-native-uploader
  url="https://your-api.com/upload"
  :header="{ 'Authorization': 'Bearer token' }"
  :formData="{ userId: '123' }"
  @success="onSuccess"
  @fail="onFail"
></x-native-uploader>
```

### 多文件上传

设置 `multiple` 属性开启多选，`limit` 控制最大选择数量。

```html
<x-native-uploader
  url="https://your-api.com/upload"
  :multiple="true"
  :limit="9"
  fileType="all"
  @success="onSuccess"
  @fail="onFail"
>
  <view class="custom-btn">
    <text>点击批量上传文件</text>
  </view>
</x-native-uploader>
```

### PDF 文件上传（Android 兼容）

设置 `fileType="all"` 即可支持上传 PDF 文件，组件会自动处理 Android 平台的 `content://` URI 路径：

```html
<x-native-uploader
  url="https://your-api.com/upload/pdf"
  fileType="all"
  accept="application/pdf"
  @success="handlePdfUploadSuccess"
  @fail="handleUploadFail"
>
  <view class="upload-btn">
    <text>上传 PDF 文件</text>
  </view>
</x-native-uploader>
```

### 自定义触发按钮

通过默认插槽 (slot) 自定义上传按钮样式。

```html
<x-native-uploader url="...">
  <button type="primary">点击上传</button>
</x-native-uploader>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `url` | 上传接口地址 (必填) | `String` | - |
| `name` | 上传文件的字段名 | `String` | `'file'` |
| `header` | 请求头对象 | `Object` | `{}` |
| `formData` | 额外的上传参数 | `Object` | `{}` |
| `fileType` | 文件选择类型，可选值: `image`, `video`, `all` | `String` | `'image'` |
| `multiple` | 是否开启多选 | `Boolean` | `false` |
| `limit` | 最大选择文件数量 (多选模式下有效) | `Number` | `9` |
| `autoUpload` | 选择文件后是否自动上传 | `Boolean` | `true` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `success` | 上传成功时触发 | `{ file: FileObj, response: String }` |
| `fail` | 上传失败时触发 | `{ file: FileObj, error: Any }` |
| `progress` | 上传进度更新时触发 | `{ file: FileObj, progress: Number }` |

### FileObj 数据结构

```javascript
{
  path: "...",       // 文件本地路径
  name: "...",       // 文件名
  progress: 100,     // 上传进度 (0-100)
  status: "success", // 状态: pending, uploading, success, error
  statusText: "..."  // 状态描述文本
}
```

## 注意事项

1.  **Android 权限**: App 端需要 `READ_EXTERNAL_STORAGE` 和 `WRITE_EXTERNAL_STORAGE` 权限。
2.  **iOS 配置**: iOS 端无需特殊配置，使用 `UIDocumentPickerViewController`。
3.  **H5 跨域**: 确保上传接口支持 CORS 跨域请求。
4.  **小程序**: 微信小程序使用 `uni.chooseMessageFile`，支持从聊天记录中选择文件。
5.  **Android content:// URI 处理**: 组件已自动处理 Android 系统返回的 `content://` 格式 URI，包括对 `raw: `前缀的路径解析，确保 PDF、Word、Excel 等文件能够正确上传。
6.  **文件格式支持**: 当 `fileType="all"` 时，支持选择任意类型文件，但上传前请确保服务器端支持该文件格式。

## 常见问题

### Q: 为什么在 Android 上选择 PDF 文件后上传失败？

**A**: 这是因为 Android 系统返回的文件路径是 `content://` 格式的 URI，而不是真实的本地文件路径。本组件已经内置了对这种格式的自动解析处理，确保文件能够正确上传。如果仍然遇到问题，请检查：
1.  是否已经正确配置了 Android 权限
2.  文件路径是否被正确解析
3.  服务器端是否支持接收该文件格式

### Q: 如何限制只能上传特定类型的文件？

**A**: 可以通过设置 `fileType` 属性来限制文件类型：
- `fileType="image"` - 仅允许选择图片
- `fileType="video"` - 仅允许选择视频
- `fileType="all"` - 允许选择所有类型文件

如果需要更精确的控制，可以结合使用 `accept` 属性，例如 `accept="application/pdf"`。
