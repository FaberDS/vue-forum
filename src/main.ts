import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FontAwesomeIcon from '@/utilities/fontawesome'
import { createPinia } from 'pinia'
import './assets/main.css'

const app = createApp(App)

const pinia = createPinia()

app.use(router)
app.use(pinia)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
