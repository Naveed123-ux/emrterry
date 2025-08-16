import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/styles": path.resolve(__dirname, "./styles"),
      "@/utils": path.resolve(__dirname, "./utils"),
      "@/types": path.resolve(__dirname, "./types"),
      "@/contexts": path.resolve(__dirname, "./contexts"),
      "@/hooks": path.resolve(__dirname, "./hooks"),
      "@/services": path.resolve(__dirname, "./services"),
      "@/store": path.resolve(__dirname, "./store"),
    },
  },
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-slot'],
          charts: ['recharts'],
          forms: ['react-hook-form'],
          redux: ['@reduxjs/toolkit', 'react-redux', 'redux-persist'],
        },
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      'recharts',
      'react-hook-form',
      'motion/react',
      '@reduxjs/toolkit',
      'react-redux',
    ],
  },
})
