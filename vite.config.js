import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ntl from "@netlify/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ntl],
})
