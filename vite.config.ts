import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build'

  const buildInputs = {
    config: resolve(__dirname, 'config.html'),
    panel: resolve(__dirname, 'panel.html'),
  }

  const developmentInputs = {
    ...buildInputs,
    main: resolve(__dirname, 'index.html'),
  }

  return {
    base: isProduction ? './' : '/',
    build: {
      rollupOptions: {
        input: isProduction ? buildInputs : developmentInputs,
        output: {
          assetFileNames: '[name]-[hash:8].[ext]',
          chunkFileNames: '[name]-[hash:8].js',
          entryFileNames: '[name]-[hash:8].js',
        },
      },
      sourcemap: !isProduction,
    },
    plugins: [
      tailwindcss(),
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  }
})
