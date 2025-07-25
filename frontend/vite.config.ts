import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import csp from 'vite-plugin-csp'

export default defineConfig({
    define: {
        'process.env': process.env
    },
    plugins: [
        vue(),
        csp({
            policy: {
                'default-src': ["self"],
                'script-src': ["self", "unsafe-inline"],
                'style-src': ["self", "unsafe-inline"],
                'img-src': ["self", "data:"],
                'connect-src': ["self", "http://localhost:3000", "https://votre-api.com"]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 5173,
        strictPort: true
    },
    build: {
        outDir: './dist',
        emptyOutDir: true
    }
})
