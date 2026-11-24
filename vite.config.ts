import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/xlsx')) {
            return 'vendor-xlsx';
          }
          if (id.includes('node_modules/@supabase')) {
            return 'vendor-supabase';
          }
          if (id.includes('node_modules/')) {
            return 'vendor';
          }
          if (id.includes('src/i18n/dicts/pt')) {
            return 'i18n-pt';
          }
          if (id.includes('src/i18n/dicts/fr')) {
            return 'i18n-fr';
          }
          if (id.includes('src/i18n/dicts/de')) {
            return 'i18n-de';
          }
          if (id.includes('src/i18n/dicts/zh')) {
            return 'i18n-zh';
          }
        },
      },
    },
  },
});
