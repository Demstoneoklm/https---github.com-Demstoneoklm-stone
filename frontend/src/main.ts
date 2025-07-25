// main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia' // Installation requise
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Configuration Pinia
const pinia = createPinia()
app.use(pinia)

// Configuration Router
app.use(router)

app.mount('#app')