import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    open: process.env.NODE_ENV !== 'test',
  },
  build: {
    cssMinify: true,
    minify: true,
    lib: {
      entry: resolve(__dirname, 'src/EditableJs.ts'),
      name: 'EditableJs', // for iife and umd
      fileName: 'EditableJs',
      formats: ['iife', 'cjs', 'es', 'umd'],
    },
  },
  plugins: [],
});
