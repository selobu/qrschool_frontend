import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { vitePWA } from './src/plugins/vite'
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    vitePWA(),
    viteCompression(),
    ],
    build: {
      sourcemap: true,
    },
})
