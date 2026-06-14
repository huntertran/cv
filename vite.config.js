import { defineConfig } from 'vite'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'

// GitHub Pages serves 404.html for unknown paths. Copying the built index.html to
// 404.html lets the SPA boot and resolve clean (history-mode) deep links on refresh.
function spaFallback(outDir) {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    }
  }
}

// Output to ./build so the existing deploy workflow (publish_dir: ./build) keeps working.
export default defineConfig({
  plugins: [vue(), spaFallback('build')],
  build: {
    outDir: 'build',
    emptyOutDir: true
  },
  server: {
    port: 8080
  }
})
