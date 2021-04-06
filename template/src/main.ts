import {
    Icon,
    Grid,
    GridItem,
    Field,
    Divider,
    Button,
    Empty,
    Popup,
    RadioGroup,
    Radio,
    Toast,
    Notify,
    Loading,
    NavBar,
    Tag,
    Cell
} from 'vant'
const coms = [
    Icon,
    Grid,
    GridItem,
    Field,
    Divider,
    Button,
    Empty,
    Popup,
    RadioGroup,
    Radio,
    Toast,
    Notify,
    Loading,
    NavBar,
    Tag,
    Cell
]

import '@/assets/css/public.css'
import 'vant/lib/index.css';
import { createApp } from 'vue'
import * as AppConfig from '@/config'
import App from './App.vue'
import router from './router'

const app = createApp(App)
coms.map(com =>{
    app.use(com)
})

AppConfig.initHttp();
AppConfig.initStore();
AppConfig.initRouter();

app.use(router)
   .mount('#app')
