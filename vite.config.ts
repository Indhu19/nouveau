import { sentryVitePlugin } from '@sentry/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          auth: ['@auth0/auth0-react'],
          icons: ['lucide-react'],
          query: ['@tanstack/react-query'],
          sentry: ['@sentry/react'],
          vendor: [
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'zustand',
            'react',
            'react-dom'
          ]
        }
      }
    },
    sourcemap: true,
    target: 'esnext'
  },

  plugins: [
    react(),
    tailwindcss(),
    mode === 'production' &&
      sentryVitePlugin({
        bundleSizeOptimizations: {
          excludeDebugStatements: true,
          excludeReplayIframe: true
        },
        org: 'neohorizon-analytics',
        project: 'boilerplate-react',
        reactComponentAnnotation: {
          enabled: true
        },
        telemetry: false
      }),
    process.env.ANALYZE &&
      visualizer({
        brotliSize: true,
        filename: 'dist/bundle-analysis.html',
        gzipSize: true,
        open: true,
        template: 'treemap',
        title: 'Bundle Analysis'
      })
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  test: {
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: 'chromium' }],
      provider: 'playwright'
    },
    name: 'unit'
  }
}));
