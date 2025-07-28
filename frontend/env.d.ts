/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface ImportMetaEnv {
    readonly VITE_APP_API_URL: string
    readonly VITE_APP_TITLE: string
    // plus d'env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}