import { defineConfig } from "vite";
import { resolve } from 'path';
import { readdirSync } from 'fs';

// プロジェクトルート下のHTMLファイルを動的に取得
function getHtmlFiles() {
  const files = readdirSync(resolve(__dirname, 'src'));
  return files.filter(file => file.endsWith('.html')).reduce((entries, file) => {
    const name = file.replace('.html', '');
    entries[name] = resolve(__dirname, 'src', file);
    return entries;
  }, {});
};

export default defineConfig({
  root: resolve(__dirname, 'src'),
  base: '/',
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input:getHtmlFiles(),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    }
  },
  server: {
    host: 'localhost',
    port: 3000,
    open: true,
  }
});
