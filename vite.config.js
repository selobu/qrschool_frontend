import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { vitePWA } from './src/plugins/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vitePWA()
    ],
    build: {
      sourcemap: true,
    },
})
