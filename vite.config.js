import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/app-pomodoro/', // ⚠️ ESSENCIAL
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})