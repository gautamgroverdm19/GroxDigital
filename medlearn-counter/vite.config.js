import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built app run from any folder or static host (HashRouter is used for routes).
// `npm run build:single` uses mode "single": one JS bundle + one CSS file, later inlined
// into a single medlearn-counter.html by scripts/make-single.mjs.
export default defineConfig(({ mode }) => {
  const single = mode === 'single';
  return {
    plugins: [react()],
    base: './',
    server: { port: 5173, open: true },
    define: single ? { 'import.meta.env.VITE_SINGLE': 'true' } : {},
    build: single
      ? {
          outDir: 'dist-single',
          copyPublicDir: false,
          cssCodeSplit: false,
          assetsInlineLimit: 100000000,
          rollupOptions: { output: { inlineDynamicImports: true } },
        }
      : {},
  };
});
