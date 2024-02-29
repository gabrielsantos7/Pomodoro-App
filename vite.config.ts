import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteFaviconsPlugin('src/assets/Logo.png')]
});
