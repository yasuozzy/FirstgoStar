<template>
  <view class="x-native-uploader">
    <view class="upload-trigger" @click="handleSelect">
      <slot>
        <view class="default-btn">
          <text class="plus">+</text>
          <text class="text">选择文件并上传</text>
        </view>
      </slot>
    </view>

    <!-- 进度条展示 -->
    <view v-if="files.length > 0" class="file-list">
      <view v-for="(file, index) in files" :key="index" class="file-item">
        <view class="file-info">
          <text class="file-name">{{ file.name }}</text>
          <view class="file-actions">
            <text class="file-status">{{ file.statusText }}</text>
            <!-- <text
              class="delete-btn"
              hover-class="delete-btn--hover"
              hover-stay-time="80"
              @click.stop="removeFile(index)"
            >删除</text> -->
          </view>
        </view>
        <view class="progress-bar">
          <view class="progress-inner" :style="{ width: file.progress + '%' }"></view>
        </view>
      </view>
    </view>
    
    <!-- 文件选择器弹窗 -->
    <x-file-picker ref="filePicker" :multiple="multiple" :limit="limit" @select="onFilePicked"></x-file-picker>
  </view>
</template>

<script>
import xFilePicker from '@/components/x-native-uploader/x-file-picker.vue';

export default {
  name: 'x-native-uploader',
  components: {
    xFilePicker
  },
  props: {
    url: {
      type: String,
      required: true,
      default: ''
    },
    // 上传参数
    formData: {
      type: Object,
      default: () => ({})
    },
    // 请求头
    header: {
      type: Object,
      default: () => ({})
    },
    // 文件字段名
    name: {
      type: String,
      default: 'file'
    },
    // 是否自动上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 文件选择类型: image, video, all
    fileType: {
      type: String,
      default: 'image'
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 最大选择数量
    limit: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    handleSelect() {
      // #ifdef APP-PLUS
      this.selectFileNative();
      // #endif
      // #ifndef APP-PLUS
      this.selectFileWeb();
      // #endif
    },
    
    // Web/小程序端兼容
    selectFileWeb() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          this.processFile(tempFilePath);
        }
      });
    },

    // App端 Native 逻辑
    selectFileNative() {
      if (this.fileType === 'all') {
        // 使用自定义的 Native.js 文件选择器 (x-file-picker)
        // 替代不稳定的 uni.chooseFile
        this.$refs.filePicker.open();
      } else if (this.fileType === 'video') {
        uni.chooseVideo({
          count: 1,
          success: (res) => {
             const tempFilePath = res.tempFilePath;
             // 尝试获取文件名，如果没有则从路径截取
             let fileName = 'video.mp4';
             if (res.tempFile && res.tempFile.name) {
                fileName = res.tempFile.name;
             } else {
                fileName = tempFilePath.substring(tempFilePath.lastIndexOf('/') + 1);
             }
             this.processFile(tempFilePath, fileName);
          }
        });
      } else {
        // 默认图片
        uni.chooseImage({
          count: 1,
          success: (res) => {
            const tempFilePath = res.tempFilePaths[0];
            // 从路径提取文件名
            let fileName = 'image.jpg';
            if (res.tempFiles && res.tempFiles[0] && res.tempFiles[0].name) {
               fileName = res.tempFiles[0].name;
            } else {
               fileName = tempFilePath.substring(tempFilePath.lastIndexOf('/') + 1);
            }
            this.processFile(tempFilePath, fileName);
          }
        });
      }
    },
    
    // 自定义文件选择器回调
    onFilePicked(e) {
      console.log('onFilePicked event:', e);
      // e 可以是单个对象 {path, name} 或数组 [{path, name}, ...]
      if (Array.isArray(e)) {
          console.log('Processing array of files:', e.length);
          e.forEach(item => {
              this.processFile(item.path, item.name);
          });
      } else {
          console.log('Processing single file');
          this.processFile(e.path, e.name);
      }
    },

    // 解析content:// URI为真实文件路径
    resolveContentUri(path) {
      // 非content URI直接返回
      if (!path.startsWith('content://')) {
        return Promise.resolve(path);
      }

      return new Promise((resolve) => {
        // 1. 最优先处理用户遇到的raw:格式URI
        // 匹配: content://.../document/raw%3A%2Fstorage%2Femulated%2F0%2F...
        const rawMatch = path.match(/document\/raw%3A(.+)/);
        if (rawMatch) {
          try {
            // 解码并恢复路径分隔符
            const decodedPath = decodeURIComponent(rawMatch[1]);
            resolve(decodedPath);
            return;
          } catch (e) {
            console.warn('解码raw URI失败:', e);
          }
        }

        // 2. 尝试使用plus.io解析
        try {
          plus.io.resolveLocalFileSystemURL(path, (entry) => {
            resolve(entry.fullPath);
          }, () => {
            // 解析失败时返回原始路径
            resolve(path);
          });
        } catch (e) {
          // 任何异常都返回原始路径
          resolve(path);
        }
      });
    },

    // 获取MediaStore中的文件路径
    getMediaStorePath(contentUri, mainActivity) {
      try {
        const resolver = mainActivity.getContentResolver();
        const cursor = resolver.query(plus.android.invoke('android.net.Uri', 'parse', contentUri),
          ['_data'], null, null, null);

        if (cursor && cursor.moveToFirst()) {
          const path = cursor.getString(0);
          cursor.close();
          return path;
        }
      } catch (e) {
        console.error('获取MediaStore路径失败:', e);
      }
      return null;
    },

    processFile(path, name = 'unknown') {
      this.resolveContentUri(path).then((realPath) => {
        const fileObj = {
          path: realPath,
          name: name,
          progress: 0,
          status: 'pending', // pending, uploading, success, error
          statusText: '等待上传'
        };
        this.files.push(fileObj);

        if (this.autoUpload) {
          // #ifdef APP-PLUS
          this.uploadByNative(fileObj);
          // #endif

          // #ifndef APP-PLUS
          this.uploadByUni(fileObj);
          // #endif
        }
      }).catch((error) => {
        // 如果解析失败，仍然创建fileObj，但是状态为error
        const fileObj = {
          path: path,
          name: name,
          progress: 0,
          status: 'error',
          statusText: '无法解析文件路径: ' + error.message
        };
        this.files.push(fileObj);
        this.$emit('fail', { file: fileObj, error: error.message });
      });
    },

    /**
     * 使用 uni.uploadFile 进行上传
     * 兼容 H5 和 小程序
     */
    uploadByUni(fileObj) {
        if (!this.url) {
            uni.showToast({ title: '请配置上传URL', icon: 'none' });
            return;
        }

        this.resolveContentUri(fileObj.path).then((realPath) => {
            fileObj.status = 'uploading';
            fileObj.statusText = '上传中...';

            const uploadTask = uni.uploadFile({
                url: this.url,
                filePath: realPath,
                name: this.name,
                header: this.header,
                formData: this.formData,
                success: (uploadFileRes) => {
                    if (uploadFileRes.statusCode === 200) {
                        fileObj.progress = 100;
                        fileObj.status = 'success';
                        fileObj.statusText = '上传成功';
                        this.$emit('success', {
                            file: fileObj,
                            response: uploadFileRes.data
                        });
                    } else {
                        fileObj.status = 'error';
                        fileObj.statusText = '上传失败';
                        this.$emit('fail', {
                            file: fileObj,
                            error: uploadFileRes.statusCode
                        });
                    }
                },
                fail: (err) => {
                    fileObj.status = 'error';
                    fileObj.statusText = '上传失败';
                    this.$emit('fail', {
                        file: fileObj,
                        error: err
                    });
                }
            });

            fileObj._task = uploadTask;

            uploadTask.onProgressUpdate((res) => {
                fileObj.progress = res.progress;
                this.$emit('progress', {
                    file: fileObj,
                    progress: res.progress
                });
            });
        }).catch((error) => {
            fileObj.status = 'error';
            fileObj.statusText = '无法解析文件路径: ' + error.message;
            console.error('UploadByUni error:', error);
            this.$emit('fail', { file: fileObj, error: error.message });
        });
    },

    /**
     * 使用 HTML5+ Native API 进行上传
     * 这是 App 端推荐的“原生”上传方式
     */
    uploadByNative(fileObj) {
      if (!this.url) {
        uni.showToast({ title: '请配置上传URL', icon: 'none' });
        return;
      }

      this.resolveContentUri(fileObj.path).then((realPath) => {
        fileObj.status = 'uploading';
        fileObj.statusText = '上传中...';

        // 创建上传任务
        // 文档: https://www.html5plus.org/doc/zh_cn/uploader.html
        const task = plus.uploader.createUpload(
          this.url,
          {
            method: 'POST',
            priority: 100
          },
          (upload, status) => {
            // 上传完成回调
            if (status === 200) {
              fileObj.progress = 100;
              fileObj.status = 'success';
              fileObj.statusText = '上传成功';
              this.$emit('success', {
                file: fileObj,
                response: upload.responseText
              });
              console.log('Upload success: ' + upload.responseText);
            } else {
              fileObj.status = 'error';
              fileObj.statusText = '上传失败';
              this.$emit('fail', {
                file: fileObj,
                error: status
              });
              console.log('Upload failed: ' + status);
            }
          }
        );

        fileObj._task = task;

        // 添加上传文件
        // addFile(path, options)
        const added = task.addFile(realPath, { key: this.name });

        if (!added) {
          fileObj.status = 'error';
          fileObj.statusText = '文件添加失败';
          console.error('Task addFile failed');
          this.$emit('fail', { file: fileObj, error: 'Failed to add file' });
          return;
        }

        // 添加 header
        if (this.header) {
          for (const key in this.header) {
            task.setRequestHeader(key, this.header[key]);
          }
        }

        // 添加 formData
        if (this.formData) {
          for (const key in this.formData) {
            task.addData(key, String(this.formData[key]));
          }
        }

        // 监听进度
        task.addEventListener('statechanged', (upload, status) => {
          // upload.state: 3 (Connected/Uploading), 4 (Completed)
          if (upload.state === 3) { // 上传中
             const percent = Math.floor((upload.uploadedSize / upload.totalSize) * 100);
             fileObj.progress = percent;
             this.$emit('progress', {
               file: fileObj,
               progress: percent
             });
          }
        });

        // 开始上传
        task.start();
      }).catch((error) => {
        fileObj.status = 'error';
        fileObj.statusText = '无法解析文件路径: ' + error.message;
        console.error('UploadByNative error:', error);
        this.$emit('fail', { file: fileObj, error: error.message });
      });
    },

    removeFile(index) {
      const fileObj = this.files[index];
      if (!fileObj) return;

      const task = fileObj._task;
      if (fileObj.status === 'uploading' && task) {
        try {
          if (typeof task.abort === 'function') {
            task.abort();
          }
        } catch (e) {}
      }

      this.files.splice(index, 1);
      this.$emit('remove', {
        file: fileObj,
        index
      });
    }
  }
}
</script>

<style scoped>
.x-native-uploader {
  width: 100%;
}
.upload-trigger {
  width: 100%;
}
.default-btn {
  width: 100%;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
}
.plus {
  font-size: 40px;
  color: #999;
  line-height: 1;
}
.text {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
.file-list {
  margin-top: 15px;
}
.file-item {
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}
.file-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  font-size: 14px;
}
.file-actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 12px;
}
.file-status {
  color: #8a8f98;
  font-size: 12px;
}
.delete-btn {
  margin-left: 8px;
  height: 24px;
  line-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  color: #ff3b30;
  font-size: 12px;
  font-weight: 500;
  background: rgba(255, 59, 48, 0.08);
  border: 1px solid rgba(255, 59, 48, 0.25);
}
.delete-btn--hover {
  background: rgba(255, 59, 48, 0.16);
  border-color: rgba(255, 59, 48, 0.35);
}
.file-name {
  color: #333;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.progress-bar {
  height: 4px;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;
}
.progress-inner {
  height: 100%;
  background: #007aff;
  transition: width 0.3s;
}
</style>
