import '@/assets/css/public.css'
import 'vant/lib/index.css';
import { createApp } from 'vue'
import * as AppConfig from '@/config'
import App from './App.vue'
import router from './router'

const app = createApp(App)

AppConfig.initHttp();
AppConfig.initStore();
AppConfig.initRouter();

app.use(router)
   .mount('#app')
