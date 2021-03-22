import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import WxAuth from '@/views/WxAuth/WxAuth.vue'
import About from '@/views/About/About.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      hideNavBar:true
    }
  },
  {
    path: '/wxauth',
    name: 'WxAuth',
    component: WxAuth,
    meta: {
      title: '登录',
      hideNavBar:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于',
      hideNavBar:false
    }
  },
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router
