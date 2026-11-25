import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
   // 【核心配置】：消除 Sass 废弃警告
    css: {
      preprocessorOptions: {
        scss: {
          // 启用现代 API，消除 legacy-js-api 警告
          api: 'modern-compiler', 
          // 静默 uview-plus 引起的 @import 等废弃警告
          silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin'],
        }
      }
    }
});
