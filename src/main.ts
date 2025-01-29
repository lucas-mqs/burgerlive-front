import { createApp } from 'vue'
import { createPinia } from 'pinia' // Corrige a importação
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia()) // Adiciona esta linha
app.use(router)
app.mount('#app')