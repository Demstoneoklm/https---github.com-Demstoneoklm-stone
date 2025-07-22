import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
    modules: [
        '@pinia/nuxt'
    ],
    runtimeConfig: {
        public: {
            apiBase: process.env.VITE_API_URL || 'http://localhost:3000/api'
        }
    },
    typescript: {
        strict: true
    },
    alias: {
        '@': './src' // ✅ Corrigé : à adapter si ton code est dans ./src
    }
})
