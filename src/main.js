import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
// import { createPinia } from 'pinia'
import store from './store/index.ts'
import 'nprogress/nprogress.css'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';
// use
const app = createApp(App)
VMdEditor.use(vuepressTheme, {
  Prism,
});
app.use(VMdEditor);
app.use(store)
app.use(router)
app.mount('#app')
