import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: './src',
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
        ml: path.resolve(__dirname, 'src/ml.html'),
        software: path.resolve(__dirname, 'src/software.html'),
        blogs: path.resolve(__dirname, 'src/blogs.html'),
      },
    },
  },
});
