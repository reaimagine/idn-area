/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'node:path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    alias: {
      '@': path.resolve('./src'),
    },
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  plugins: [
    // @ts-ignore
    swc.vite(),
  ],
});
