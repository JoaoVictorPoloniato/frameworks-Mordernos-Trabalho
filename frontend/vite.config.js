import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const GROUP_NAME = 'g3'

export default defineConfig({
  plugins: [vue()],
  base: `/${GROUP_NAME}/`,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
