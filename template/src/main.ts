import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css';
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

import {HttpUtil} from "bdjf_http";
import axios from "axios"
import store from './store'
import '@/assets/css/public.css'
import CalmView from './components/clam_view'
import {ProjectConfig} from "@/config";
// import  VConsole  from 'vconsole'
// const vConsole = new VConsole();

const baseUrl = process.env.VUE_APP_SERVER

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

HttpUtil.setAxios(axiosInstance)
HttpUtil.initConfig({
    codeName:'code',
    msgName:'msg',
    dataName:'data',
    successCode:0,
    showError(error) {
        Notify({ type: 'danger', message: error.message });
    },
    showWarn(msg) {
        Notify({ type: 'warning', message: msg });
    },
    showLoading() {
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        });
    },
    hideLoading() {
        Toast.clear()
    }
})


const app = createApp(App)
coms.map(com =>{
    app.use(com)
})
app.component('clam-view',CalmView)


//从session中登录，防止点击刷新丢失登录又回到首页
const isLogin = sessionStorage.getItem(ProjectConfig.SESSION_IS_LOGIN) === 'true';
if(isLogin){
    const sessionUser = JSON.parse(sessionStorage.getItem(ProjectConfig.SESSION_IS_LOGIN||''));
    if(sessionUser){
        store.commit('setUser',sessionUser);
    }
}
router.beforeEach((to, from ,next) => {
    // if (to.meta && to.meta.title) document.title = <string>to.meta.title;
    if(to.path === '/wxauth'){
        next()
    }else{
        store.state.isLogin?next():next('/wxauth')
    }
})

app.use(router)
    .mount('#app')
