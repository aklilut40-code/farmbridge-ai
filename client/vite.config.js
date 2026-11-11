import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `host: true` lets you open the dev server from an Android phone on the same Wi-Fi.
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    open: true, // Automatically opens the application in your browser (e.g. Chrome)
    // In development, requests to /api go to the Express server (running on port 5000)
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});

