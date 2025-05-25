import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src', // Set the root to the src directory
  publicDir: '../public', // Path to public folder relative to root
  build: {
    outDir: '../dist', // Output directory (outside src)
    emptyOutDir: true
  }
})
