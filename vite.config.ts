import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";


export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server:{
    //该服务器走一个代理
    proxy:{
      //访问的接口名 如果是以、api来头
      //我就自动帮你访问地址
      '/api': {
        target: 'http://8.131.89.181:8080',
        // target: 'http://192.168.1.39:8080',
        changeOrigin: true,
        //rewrite 重写
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
    //  host:"0.0.0.0",
  },
});
