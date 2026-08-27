import {glob} from 'glob';
import {defineConfig} from 'vite';
import {BASE_URL} from './config.js';
import path from 'path';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE_URL : '/',
  root: './src',
  publicDir: '../public',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.')
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      // this finds all the html files
      input: glob.sync('**/*.html', {cwd: './src'}),
    },
  },
}));