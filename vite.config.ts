/// <reference types="vitest" />
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
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
    splitVendorChunkPlugin(),
    react({
      include: '**/*.tsx',
    })
  ],
})
