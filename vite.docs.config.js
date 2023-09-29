import { resolve } from 'path'
import { defineConfig } from 'vite'

import config from './vite.config.ts'

// https://vitejs.dev/config/
export default defineConfig({
  ...config,
  base: '/murmur/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        dir: resolve(__dirname, 'dist/docs')
      }
    }
  }
})
