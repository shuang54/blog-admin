import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import { createPinia } from 'pinia'
// import '_element-plus@2.0.5@element-plus/theme-chalk/index.css';
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
