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
      '@tests': path.resolve(__dirname, './tests'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  test: {
    coverage: {
      reporter: ['cobertura', 'text', 'html', 'clover', 'json', 'text-summary'],
    },
    includeSource: ['src/**/*.{js,ts,jsx,tsx}'],
    workspace: [
      {
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          include: [
            'tests/unit/**/*.{test,spec}.{js,jsx,ts,tsx}',
            'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
            'src/**/__tests__/**/*.{js,jsx,ts,tsx}'
          ],
        },
      },
      {
        test: {
          name: 'e2e',
          include: ['tests/e2e/**/*.{test,spec}.{js,jsx,ts,tsx}'],
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
          include: [
            'src/**/*.mdx',
            'tests/**/*.stories.{js,jsx,mjs,ts,tsx}',
            'tests/visual/**/*.{test,spec}.{js,jsx,ts,tsx}'
          ],
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      {
        test: {
          name: 'integration',
          globals: true,
          environment: 'jsdom',
          include: ['tests/integration/**/*.{test,spec}.{js,jsx,ts,tsx}'],
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