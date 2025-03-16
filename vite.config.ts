import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false, // Minification'ı kapat
    sourcemap: true // Sourcemap oluştur (hata mesajlarını okunabilir yapar)
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Backend sunucu adresi
        changeOrigin: true,
        secure: false
      }
    }
  }
})
