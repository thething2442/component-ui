import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'CustomizeUI',
      fileName: (format) => `customize-ui.${format === 'es' ? 'esm' : format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'framer-motion', '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities', 'clsx', 'tailwind-merge'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'framerMotion',
          '@dnd-kit/core': 'dndKitCore',
          '@dnd-kit/sortable': 'dndKitSortable',
          '@dnd-kit/utilities': 'dndKitUtilities',
          'clsx': 'clsx',
          'tailwind-merge': 'tailwindMerge'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'customize-ui.css'
          }
          return assetInfo.name
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    target: 'es2015'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: false,
    postcss: './postcss.config.js'
  },
}) 