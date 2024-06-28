import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@sanity/client'], // Mark '@sanity/client' as an external dependency
    },
  },
});
