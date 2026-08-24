import {glob} from 'glob';
import {defineConfig} from 'vite';

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/icsf-website/' : '/',
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      // this finds all the html files
      input: glob.sync('**/*.html', {cwd: './src'}),
    },
  },
});