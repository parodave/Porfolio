import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://karimhammouche.com',
      dynamicRoutes: ['/test-supabase'],
      generateRobotsTxt: false,
    }),
  ],
  optimizeDeps: {
    include: [
      'three',
      'three/examples/jsm/nodes/Nodes.js',
      'three/examples/jsm/AdditiveBlendingShader.js',
      'three/examples/jsm/WebGPURenderer.js',
      'three/webgpu',
      'three/tsl',
    ],
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      three: path.resolve(__dirname, 'node_modules/three'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
  },
});
