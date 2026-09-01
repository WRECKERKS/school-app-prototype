import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Repo is served under /school-app-prototype/ on GitHub Pages
  base: '/school-app-prototype/',
})
