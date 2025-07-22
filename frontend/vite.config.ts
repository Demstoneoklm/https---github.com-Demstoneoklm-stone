import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { csp } from 'vite-plugin-csp';
import { createHead } from '@vueuse/head'; // À utiliser dans le code Vue, pas ici

export default defineConfig({
    plugins: [
        vue(),
        csp({
            policies: {
                'default-src': ["'self'"],
                'script-src': ["'self'", "'unsafe-inline'"], // À restreindre davantage en production
                'style-src': ["'self'", "'unsafe-inline'"],
                'img-src': ["'self'", "data:"],
                'connect-src': ["'self'", "your-api-domain.com"]
            }
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: './src/main.ts'
            }
        }
    }
});
