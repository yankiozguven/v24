import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true, // Sadece 3000 portunu kullan
    hmr: {
      clientPort: 443, // HTTPS portu
      host: 'f5332c22-4f77-45d1-bd42-936f6c71f964-00-33j5jhjw9t0gp.pike.replit.dev',
      protocol: 'wss', // WebSocket Secure
      timeout: 120000 // Bağlantı zaman aşımını artır
    },
    fs: {
      strict: false
    },
    // Tüm Replit hostlarına izin ver
    allowedHosts: [
      'f5332c22-4f77-45d1-bd42-936f6c71f964-00-33j5jhjw9t0gp.pike.replit.dev',
      '.replit.dev',
      'localhost'
    ],
    watch: {
      usePolling: true, // Dosya değişikliklerini tespit etmek için polling kullan
      interval: 1000
    }
  }
}) 