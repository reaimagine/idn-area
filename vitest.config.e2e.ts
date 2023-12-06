/* eslint-disable @typescript-eslint/ban-ts-comment */
import path from 'node:path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    root: './',
    alias: {
      '@': path.resolve('./src'),
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
