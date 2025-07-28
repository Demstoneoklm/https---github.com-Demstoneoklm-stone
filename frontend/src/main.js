import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router' // Importez votre routeur

import './assets/index.css' // Importez votre fichier CSS global (Tailwind CSS)

const app = createApp(App)

app.use(createPinia())
app.use(router) // Utilisez le routeur

app.mount('#app')
