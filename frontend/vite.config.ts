import { defineConfig } from 'vitest/config'  // <- not 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [react()],
})