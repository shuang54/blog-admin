import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import { createPinia } from 'pinia'
import 'nprogress/nprogress.css'
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';
// import '_element-plus@2.0.5@element-plus/theme-chalk/index.css';
const app = createApp(App)
VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
app.use(VueMarkdownEditor);
app.use(createPinia())
app.use(router)
app.mount('#app')
