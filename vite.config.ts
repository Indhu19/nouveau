/// <reference types="vitest/config" />

import { fileURLToPath } from 'node:url';
import path from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    storybookTest({ configDir: path.join(dirname, '.storybook') }),
    sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'neohorizon-analytics',
      project: process.env.SENTRY_PROJECT,
    }),
    visualizer({
      filename: './rollup-visualizer-stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      reporter: ['cobertura', 'text', 'html', 'clover', 'json', 'text-summary'],
    },
    workspace: [
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          include: ['src/**/*.{test,spec}.@(js|jsx|ts|tsx)'],
        },
      },
      {
        test: {
          name: 'visual',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          include: ['src/**/*.mdx', 'src/**/*.stories.@(js|jsx|mjs|ts|tsx)', 'src/**/*.{tsx,ts}', 'tests/**/**/*/.ts'],
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // react: ['react', 'react-dom'],
          tanstack: ['@tanstack/react-query', '@tanstack/react-router'],
          sentry: ['@sentry/react', '@sentry/browser'],
          editor: ['quill'],
          charts: ['recharts'],
          // i18n: ['i18next', 'react-i18next'],
          radix: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-dropdown-menu',
          ],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
