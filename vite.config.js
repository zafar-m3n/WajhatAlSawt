import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// `vite preview` serves the prerendered pages the way the live host will:
// /about -> dist/about/index.html, and unknown paths -> dist/404.html with a 404 status.
const prerenderedPages = {
  name: 'prerendered-pages',
  configurePreviewServer(server) {
    const dist = fileURLToPath(new URL('./dist', import.meta.url))
    server.middlewares.use((req, res, next) => {
      const url = decodeURIComponent((req.url || '/').split('?')[0])
      if (path.extname(url)) return next()
      const page = path.join(dist, url, 'index.html')
      if (fs.existsSync(page)) {
        req.url = path.posix.join(url, 'index.html')
        return next()
      }
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html')
      res.end(fs.readFileSync(path.join(dist, '404.html')))
    })
  },
}

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderedPages],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
