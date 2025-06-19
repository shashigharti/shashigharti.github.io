import { defineConfig } from 'vite';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
        software: path.resolve(__dirname, 'src/software.html'),
        blogs: path.resolve(__dirname, 'src/blogs.html'),
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/bootstrap-icons/font/fonts/*'),
          dest: 'fonts'
        },
        {
          src: path.resolve(__dirname, 'src/assets/docs/*'),
          dest: 'docs'
        }
      ]
    })
  ],  
});
