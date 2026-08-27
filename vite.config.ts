import {glob} from 'glob';
import {defineConfig} from 'vite';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/icsf-website/' : '/',
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
}));