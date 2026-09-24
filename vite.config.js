import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const FOURSQUARE_TARGET = 'https://places-api.foursquare.com'
const FOURSQUARE_API_VERSION = '2025-06-17'

function foursquareProxy(apiKey) {
  return {
    target: FOURSQUARE_TARGET,
    changeOrigin: true,
    secure: true,
    rewrite: (path) => path.replace(/^\/api\/foursquare/, ''),
    configure: (proxy) => {
      proxy.on('proxyReq', (proxyReq) => {
        proxyReq.setHeader('Accept', 'application/json')
        proxyReq.setHeader('X-Places-Api-Version', FOURSQUARE_API_VERSION)
        if (apiKey) {
          proxyReq.setHeader('Authorization', `Bearer ${apiKey}`)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const foursquareKey = env.FOURSQUARE_API_KEY ?? ''
  
  return {
    plugins: [tailwindcss(), react()],
    server: {
      proxy: {
        '/api/foursquare': foursquareProxy(foursquareKey),
      },
    },
    preview: {
      proxy: {
        '/api/foursquare': foursquareProxy(foursquareKey),
      },
    },
  }
})
