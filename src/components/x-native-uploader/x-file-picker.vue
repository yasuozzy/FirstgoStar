<template>
  <view v-if="visible" class="x-file-picker-mask" @click="close">
    <view class="x-file-picker-container" @click.stop>
      <view class="picker-header">
        <text class="back-btn" @click="goBack" v-if="canGoBack">‹</text>
        <text class="title-text">{{ titleDisplay }}</text>
        <view class="header-right"></view>
      </view>
      
      <!-- 菜单视图 -->
      <view v-if="mode === 'menu'" class="menu-grid">
        <view class="menu-item" @click="selectCamera">
          <view class="menu-icon" style="background: #33C759;">📷</view>
          <text class="menu-text">相机</text>
        </view>
        <view class="menu-item" @click="selectImage">
          <view class="menu-icon" style="background: #FF2D55;">🖼️</view>
          <text class="menu-text">图库</text>
        </view>
        <view class="menu-item" @click="selectFileSystem">
          <view class="menu-icon" style="background: #FF9500;">📁</view>
          <text class="menu-text">文件管理</text>
        </view>
        <view class="menu-item" @click="selectVideo">
          <view class="menu-icon" style="background: #5856D6;">🎥</view>
          <text class="menu-text">视频</text>
        </view>
        <view class="menu-item" @click="browsePath('Download')">
          <view class="menu-icon" style="background: #007AFF;">⬇️</view>
          <text class="menu-text">下载</text>
        </view>
        <view class="menu-item" @click="browsePath('Documents')">
          <view class="menu-icon" style="background: #AF52DE;">📄</view>
          <text class="menu-text">文档</text>
        </view>
        <view class="menu-item" @click="browsePath('Music')">
          <view class="menu-icon" style="background: #FF3B30;">🎵</view>
          <text class="menu-text">音乐</text>
        </view>
        <view class="menu-item" @click="browsePath('Movies')">
          <view class="menu-icon" style="background: #5AC8FA;">🎬</view>
          <text class="menu-text">影视</text>
        </view>
      </view>

      <!-- 文件列表视图 (作为系统API不可用时的降级方案) -->
      <scroll-view v-else scroll-y class="file-list">
        <view v-if="loading" class="loading-tips">加载中...</view>
        <view v-else-if="fileList.length === 0" class="empty-tips">空文件夹</view>
        
        <view 
          v-for="(item, index) in fileList" 
          :key="index" 
          class="file-item"
          @click="handleItemClick(item)"
        >
          <view class="item-icon">
            <text v-if="item.isDirectory" style="font-size: 24px;">📁</text>
            <text v-else style="font-size: 24px;">📄</text>
          </view>
          <view class="item-info">
            <text class="item-name">{{ item.name }}</text>
            <text class="item-detail" v-if="!item.isDirectory">{{ formatSize(item.size) }}</text>
          </view>
        </view>
      </scroll-view>

      <!-- 底部取消按钮 -->
      <view class="picker-footer" @click="close">
        <text class="cancel-text">取消</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'x-file-picker',
  props: {
    // 是否支持多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 最多选择数量
    limit: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      visible: false,
      mode: 'menu', // 'menu' | 'browser'
      currentEntry: null,
      currentPath: '',
      rootPath: '',
      fileList: [],
      loading: false
    };
  },
  computed: {
    canGoBack() {
      return this.mode === 'browser';
    },
    titleDisplay() {
      if (this.mode === 'menu') return '选择操作';
      if (!this.currentPath) return '/';
      const parts = this.currentPath.split('/');
      if (parts.length > 2) {
        return '.../' + parts[parts.length - 1];
      }
      return this.currentPath;
    }
  },
  methods: {
    open() {
      // 直接调用系统文件选择，不显示菜单
      this.selectFileSystem();
    },
    close() {
      this.visible = false;
    },
    
    // 拍照 (保留方法但不显示入口)
    selectCamera() {
      uni.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: (res) => this.handleImageSuccess(res)
      });
    },
    
    // 相册 (保留方法但不显示入口)
    selectImage() {
      uni.chooseImage({
        count: 1,
        sourceType: ['album'],
        success: (res) => this.handleImageSuccess(res)
      });
    },
    
    handleImageSuccess(res) {
        const path = res.tempFilePaths[0];
        let name = 'image.jpg';
        if (res.tempFiles && res.tempFiles[0] && res.tempFiles[0].name) {
           name = res.tempFiles[0].name;
        } else {
           name = path.substring(path.lastIndexOf('/') + 1);
        }
        this.$emit('select', { path, name });
        this.close();
    },
    
    // 视频
    selectVideo() {
      uni.chooseVideo({
        count: 1,
        success: (res) => {
          const path = res.tempFilePath;
          let name = 'video.mp4';
          if (res.tempFile && res.tempFile.name) {
             name = res.tempFile.name;
          } else {
             name = path.substring(path.lastIndexOf('/') + 1);
          }
          this.$emit('select', { path, name });
          this.close();
        }
      });
    },

    selectFileSystem() {
      // #ifdef APP-PLUS
      if (plus.os.name === 'Android') {
        this.selectFileByNativeAndroid();
        return;
      }
      if (plus.os.name === 'iOS') {
        this.selectFileByNativeIOS();
        return;
      }
      this.browsePath('root');
      return;
      // #endif

      // #ifdef H5
      uni.chooseFile({
        count: this.multiple ? this.limit : 1,
        success: (res) => this.handleFileSuccess(res),
        fail: (err) => {
            console.error('Choose file failed', err);
        }
      });
      return;
      // #endif

      // #ifdef MP-WEIXIN
      uni.chooseMessageFile({
        count: this.multiple ? this.limit : 1,
        type: 'all',
        success: (res) => this.handleFileSuccess(res),
        fail: (err) => {
            console.error('Choose message file failed', err);
        }
      });
      return;
      // #endif

      // #ifndef APP-PLUS || H5 || MP-WEIXIN
      uni.showToast({ title: '当前平台暂不支持文件选择', icon: 'none' });
      // #endif
    },

    handleFileSuccess(res) {
      if (this.multiple) {
        // 多选处理
        const files = (res.tempFiles || []).map(file => {
            let name = file.name || '';
            const path = file.path || '';
            if (!name && path) {
                name = path.substring(path.lastIndexOf('/') + 1);
            }
            return { path, name: name || 'file' };
        });
        
        if (files.length === 0 && res.tempFilePaths) {
            res.tempFilePaths.forEach(path => {
                const name = path.substring(path.lastIndexOf('/') + 1);
                files.push({ path, name });
            });
        }
        
        if (files.length === 0) {
            uni.showToast({ title: '未选择文件', icon: 'none' });
            return;
        }
        this.$emit('select', files); // 返回数组
      } else {
        // 单选兼容处理 (返回单个对象)
        const file = res.tempFiles && res.tempFiles[0] ? res.tempFiles[0] : null;
        const path = (file && file.path) || (res.tempFilePaths && res.tempFilePaths[0]) || '';
        let name = (file && file.name) || 'file';
        if (!name && path) {
            name = path.substring(path.lastIndexOf('/') + 1);
        }
        if (!path) {
            uni.showToast({ title: '未选择文件', icon: 'none' });
            return;
        }
        this.$emit('select', { path, name });
      }
      this.close();
    },

    selectFileByNativeAndroid() {
      const main = plus.android.runtimeMainActivity();
      const Intent = plus.android.importClass('android.content.Intent');
      const intent = new Intent(Intent.ACTION_GET_CONTENT);
      intent.setType('*/*');
      intent.addCategory(Intent.CATEGORY_OPENABLE);
      intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
      
      if (this.multiple) {
        intent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
      }
      
      // 生成随机 requestCode (10000 ~ 50000) 避免冲突
      const requestCode = 10000 + Math.floor(Math.random() * 40000);
      
      // 保存旧的 onActivityResult 回调
      const oldActivityResult = main.onActivityResult;
      
      main.onActivityResult = (requestCodeResult, resultCode, data) => {
        // 如果有旧的回调，先执行
        if (oldActivityResult) {
          try {
             oldActivityResult(requestCodeResult, resultCode, data);
          } catch (e) {
             console.error('Old onActivityResult failed', e);
          }
        }
        
        if (requestCodeResult !== requestCode) return;
        
        if (resultCode !== -1 || !data) { // -1 is Activity.RESULT_OK
          return;
        }
        
        // 处理多选 ClipData
        let clipData = null;
        try {
            clipData = data.getClipData();
        } catch(e) {
            console.warn('getClipData failed', e);
        }
        
        console.log('Android File Picked: multiple=', this.multiple, 'clipData=', clipData);

        if (clipData && this.multiple) {
            let count = 0;
            try {
                // 尝试直接调用
                count = clipData.getItemCount();
            } catch (e) {
                console.warn('clipData.getItemCount() failed, trying plus.android.invoke', e);
                try {
                    // 降级尝试
                    count = plus.android.invoke(clipData, 'getItemCount');
                } catch (e2) {
                    console.error('All getItemCount attempts failed', e2);
                }
            }
            
            console.log('ClipData count:', count);
            
            if (count > 0) {
                const files = [];
                let processedCount = 0;
                
                for (let i = 0; i < count; i++) {
                    try {
                        // 尝试直接调用或 invoke
                        let item = null;
                        try {
                            item = clipData.getItemAt(i);
                        } catch(e) {
                            item = plus.android.invoke(clipData, 'getItemAt', i);
                        }
                        
                        if (!item) throw new Error('Item is null');
                        
                        let uri = null;
                        try {
                            uri = item.getUri();
                        } catch(e) {
                            uri = plus.android.invoke(item, 'getUri');
                        }
                        
                        if (!uri) throw new Error('Uri is null');
                        
                        const uriStr = uri.toString();
                        
                        // 异步获取每个文件信息
                        this.resolveAndroidFile(main, uri, uriStr, (file) => {
                            files.push(file);
                            processedCount++;
                            if (processedCount === count) {
                                this.emitSelectFiles(files);
                            }
                        });
                    } catch (e) {
                        console.error('Process clip item failed at index ' + i, e);
                        processedCount++;
                        if (processedCount === count) {
                            this.emitSelectFiles(files);
                        }
                    }
                }
                return;
            }
            // 如果 count 为 0，降级到单选逻辑
        }

        // 单选或不支持 ClipData
        const uri = data.getData();
        console.log('Single URI:', uri);
        if (!uri) {
            console.error('No data uri found');
            return;
        }
        const uriStr = uri.toString();
        
        this.resolveAndroidFile(main, uri, uriStr, (file) => {
            console.log('Resolved single file:', file);
            if (this.multiple) {
                this.emitSelectFiles([file]);
            } else {
                this.emitSelect(file.path, file.name);
            }
        });
      };
      
      main.startActivityForResult(intent, requestCode);
    },

    resolveAndroidFile(main, uri, uriStr, callback) {
        let callbackCalled = false;
        const safeCallback = (res) => {
            if (callbackCalled) return;
            callbackCalled = true;
            callback(res);
        };

        plus.io.resolveLocalFileSystemURL(uriStr, (entry) => {
          safeCallback({ path: entry.fullPath, name: entry.name || '' });
        }, (e) => {
          console.log('resolveLocalFileSystemURL failed', e);
          let name = this.getAndroidFileName(main, uri);
          if (!name) {
             try {
                const path = uri.getPath();
                if (path) {
                    const lastSlash = path.lastIndexOf('/');
                    if (lastSlash !== -1) {
                        name = decodeURIComponent(path.substring(lastSlash + 1));
                    }
                }
             } catch (e) {}
          }
          safeCallback({ path: uriStr, name: name || 'file' });
        });
    },

    getAndroidFileName(main, uri) {
      try {
        const OpenableColumns = plus.android.importClass('android.provider.OpenableColumns');
        const resolver = main.getContentResolver();
        plus.android.importClass(resolver); // 确保 resolver 方法被绑定
        const cursor = resolver.query(uri, null, null, null, null);
        if (cursor) {
          plus.android.importClass(cursor); // 确保 cursor 方法被绑定
          if (cursor.moveToFirst()) {
            const index = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
            if (index > -1) {
                const name = cursor.getString(index);
                cursor.close();
                return name || '';
            }
          }
          cursor.close();
        }
      } catch (e) {
          console.error('getAndroidFileName error', e);
      }
      return '';
    },

    selectFileByNativeIOS() {
      const UIDocumentPickerViewController = plus.ios.importClass('UIDocumentPickerViewController');
      const picker = new UIDocumentPickerViewController(['public.data'], 0);
      picker.allowsMultipleSelection = this.multiple;
      picker.onDidPickDocumentAtURL = (url) => {
        const path = plus.ios.invoke(url, 'path');
        const name = this.extractName(path);
        if (this.multiple) {
            this.emitSelectFiles([{ path, name }]);
        } else {
            this.emitSelect(path, name);
        }
        plus.ios.deleteObject(picker);
      };
      picker.onDidPickDocumentsAtURLs = (urls) => {
        const count = urls.count();
        if (count > 0) {
          if (this.multiple) {
              const files = [];
              for(let i=0; i<count; i++) {
                  const url = urls.objectAtIndex(i);
                  const path = plus.ios.invoke(url, 'path');
                  files.push({ path, name: this.extractName(path) });
              }
              this.emitSelectFiles(files);
          } else {
              const first = urls.objectAtIndex(0);
              const path = plus.ios.invoke(first, 'path');
              this.emitSelect(path, this.extractName(path));
          }
        }
        plus.ios.deleteObject(picker);
      };
      picker.onWasCancelled = () => {
        plus.ios.deleteObject(picker);
      };
      const current = plus.ios.currentViewController();
      current.presentViewController(picker, true, null);
    },

    extractName(path) {
      if (!path) return '';
      return path.substring(path.lastIndexOf('/') + 1);
    },

    emitSelectFiles(files) {
        if (!files || files.length === 0) {
            uni.showToast({ title: '未选择文件', icon: 'none' });
            return;
        }
        this.$emit('select', files);
        this.close();
    },

    emitSelect(path, name) {
      if (!path) {
        uni.showToast({ title: '未选择文件', icon: 'none' });
        return;
      }
      const fileName = name || this.extractName(path) || 'file';
      this.$emit('select', { path, name: fileName });
      this.close();
    },

    /**
     * 浏览特定目录
     * 由于标准基座不支持 uni.chooseFile，这里使用 plus.io 进行降级处理
     * 保持 UI 风格一致，但在应用内浏览文件
     */
    browsePath(type) {
      this.visible = true; // 仅在需要浏览器 UI 时显示遮罩
      this.mode = 'browser';
      this.loading = true;
      
      let targetPath = '';
      // #ifdef APP-PLUS
      const base = '/storage/emulated/0/';
      switch(type) {
        case 'Download': targetPath = base + 'Download/'; break;
        case 'Documents': targetPath = base + 'Documents/'; break;
        case 'Music': targetPath = base + 'Music/'; break;
        case 'Movies': targetPath = base + 'Movies/'; break;
        case 'root': targetPath = base; break;
        default: targetPath = base;
      }
      
      plus.io.resolveLocalFileSystemURL(targetPath, (entry) => {
        this.rootPath = entry.fullPath;
        this.readDirectory(entry);
      }, (e) => {
        console.error('Dir access failed', e);
        if (type !== 'root') {
            // 失败尝试回退到根目录
            this.browsePath('root');
        } else {
            uni.showToast({ title: '无法访问存储', icon: 'none' });
            this.mode = 'menu';
        }
      });
      // #endif
      
      // #ifndef APP-PLUS
      uni.showToast({ title: '仅App端支持', icon: 'none' });
      this.mode = 'menu';
      // #endif
    },

    readDirectory(entry) {
      this.currentEntry = entry;
      this.currentPath = entry.fullPath;
      this.loading = true;
      this.fileList = [];

      const reader = entry.createReader();
      reader.readEntries((entries) => {
        const list = [];
        if (entries.length > 0) {
            // 排序: 文件夹在前
            entries.sort((a, b) => {
                if (a.isDirectory && !b.isDirectory) return -1;
                if (!a.isDirectory && b.isDirectory) return 1;
                return a.name.localeCompare(b.name);
            });

            entries.forEach(item => {
                if (item.name.startsWith('.')) return;
                list.push({
                    name: item.name,
                    isDirectory: item.isDirectory,
                    fullPath: item.fullPath,
                    entry: item,
                    size: 0
                });
            });
        }
        this.fileList = list;
        this.loading = false;
      }, (e) => {
        console.error('Read dir failed', e);
        this.loading = false;
        uni.showToast({ title: '读取目录失败', icon: 'none' });
      });
    },

    handleItemClick(item) {
      if (item.isDirectory) {
        this.readDirectory(item.entry);
      } else {
        this.$emit('select', {
          path: item.fullPath,
          name: item.name
        });
        this.close();
      }
    },

    goBack() {
      if (this.currentPath === this.rootPath) {
        this.mode = 'menu';
        return;
      }
      if (!this.currentEntry) {
          this.mode = 'menu';
          return;
      }
      this.currentEntry.getParent((parentEntry) => {
        this.readDirectory(parentEntry);
      }, (e) => {
        this.mode = 'menu';
      });
    },
    
    formatSize(size) {
        if (size < 1024) return size + ' B';
        if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
        return (size / 1024 / 1024).toFixed(2) + ' MB';
    }
  }
}
</script>

<style scoped>
.x-file-picker-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 底部对齐 */
}
.x-file-picker-container {
  width: 100%;
  height: 60vh; /* 半屏高度 */
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}
.picker-header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  border-bottom: 1px solid #f0f0f0;
}
.back-btn {
  font-size: 24px;
  color: #333;
  width: 40px;
}
.header-right {
  width: 40px;
}
.title-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}
.menu-grid {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;
  align-content: flex-start;
  overflow-y: auto;
}
.menu-item {
  width: 25%; /* 4列布局 */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
}
.menu-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px; /* 大圆角 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 8px;
  color: #fff;
}
.menu-text {
  font-size: 12px;
  color: #666;
  text-align: center;
}
.file-list {
  flex: 1;
  padding: 0 15px;
}
.loading-tips, .empty-tips {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 14px;
}
.file-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f5f5f5;
}
.file-item:active {
  background-color: #f9f9f9;
}
.item-icon {
  margin-right: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 8px;
  color: #999;
}
.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.item-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}
.item-detail {
  font-size: 12px;
  color: #999;
}
.picker-footer {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 8px solid #f8f8f8; /* 分隔条效果 */
  background: #fff;
}
.cancel-text {
  font-size: 16px;
  color: #333;
  width: 100%;
  text-align: center;
  line-height: 50px;
}
</style>
