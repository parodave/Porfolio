import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Force Vite detection on Vercel by tweaking the build config
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
});
