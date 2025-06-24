import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const API_URL = "http://localhost:8082"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: false, // 项目启动时自动打开浏览器
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
      },
      '/steam': {
        target: API_URL,
        changeOrigin: true,
      },
      '/hello': {
        target: API_URL,
        changeOrigin: true,
      },
    },
  },
})
