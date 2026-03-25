import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const rootDir = fileURLToPath(new URL('.', import.meta.url))
  const env = loadEnv(mode, rootDir, '')
  const proxy = {
    '/api': {
      target: env.CONTACT_SERVER_URL || 'http://127.0.0.1:8787',
      changeOrigin: true,
    },
  }

  return {
    plugins: [react()],
    server: {
      proxy,
    },
    preview: {
      proxy,
    },
  }
})
