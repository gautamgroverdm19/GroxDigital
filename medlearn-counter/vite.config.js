import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built app run from any folder or static host (HashRouter is used for routes).
export default defineConfig({
  plugins: [react()],
  base: './',
  server: { port: 5173, open: true },
});
