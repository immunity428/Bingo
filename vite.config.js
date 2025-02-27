import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/Bingo/', // リポジトリ名を指定
  plugins: [react()],
});
