import {glob} from 'glob';
import {defineConfig} from 'vite';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      // this finds all the html files
      input: glob.sync('**/*.html', {cwd: './src'}),
    },
  },
});