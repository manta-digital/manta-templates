import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      onwarn: (warning, warn) => {
        // Suppress gray-matter eval warning - it's safe in this context
        if (warning.code === 'EVAL' && warning.message?.includes('gray-matter')) {
          return
        }
        warn(warning)
      }
    }
  }
})
