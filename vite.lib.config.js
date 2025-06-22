import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'ReactDragBuilderUI',
      fileName: (format) => `react-drag-builder-ui.${format === 'es' ? 'esm' : 'cjs'}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@dnd-kit/core', '@dnd-kit/sortable', '@dnd-kit/utilities', 'clsx', 'tailwind-merge'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@dnd-kit/core': 'dndKitCore',
          '@dnd-kit/sortable': 'dndKitSortable',
          '@dnd-kit/utilities': 'dndKitUtilities',
          'clsx': 'clsx',
          'tailwind-merge': 'tailwindMerge'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'react-drag-builder-ui.css'
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