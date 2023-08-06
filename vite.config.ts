/// <reference types="vitest" />
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build'
  },
  test: {
      // globals: true,
      setupFiles: 'src/setupTests.ts',
  },
  resolve: {
    alias: {
      "@services": "/src/services",
      "@components": "/src/components",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "src/@types": "/src/@types",
      "@styles": "/src/styles"
    }
  },
  plugins: [
    compression({
      algorithm: 'gzip', // or 'brotli', 'deflate'
    }),
    splitVendorChunkPlugin(),
    react({
      include: '**/*.tsx',
    }),
  ],
})
