import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'
import { viteContentPlugin } from './src/lib/ui-adapters/vite/vite-plugin-content'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@manta-templates/content': fileURLToPath(
        new URL('./content', import.meta.url)
      ),
      '@/lib': fileURLToPath(
        new URL('./src/lib', import.meta.url)
      )
    }
  },
  plugins: [
    react(), 
    tailwindcss(),
    viteContentPlugin({
      sanitize: true,
      contentAlias: '@manta-templates/content'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'ui-core': ['./src/lib/ui-core']
        }
      }
    }
  }
})
