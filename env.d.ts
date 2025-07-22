// env.d.ts
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    // Ajoutez d'autres variables ici...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}