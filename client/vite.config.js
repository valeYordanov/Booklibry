import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // You can specify custom build options here if needed
    outDir: 'dist', // Default build output directory
    sourcemap: true, // Generate source maps for easier debugging
    rollupOptions: {
      // Add any rollup-specific options here
    },
    chunkSizeWarningLimit: 1000,
  },
});