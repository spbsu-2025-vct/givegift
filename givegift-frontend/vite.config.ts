import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // That's a dirty hack only to run the app on localhost with VPN
    host: '127.0.0.1'
  }
})