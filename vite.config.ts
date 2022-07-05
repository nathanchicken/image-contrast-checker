import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /image-checker\//,
        replacement: `${path.resolve(__dirname, 'image-checker')}/`
      },
      {
        find: /^image-checker$/,
        replacement: `${path.resolve(__dirname, 'image-checker/index.ts')}/`
      },
      {
        find: /^src\/(.+)/,
        replacement: path.resolve(__dirname, 'src/$1')
      }
    ]
  },
  server: {
    port: 9000
  }
})
