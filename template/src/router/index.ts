import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home/Home.vue'
import Login from '@/views/Login/Login.vue'
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
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hideNavBar:true,
      notNeedLogin:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '关于',
      hideNavBar:false,
    }
  },
]

const router = createRouter({
  history:createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 始终在元素 #main 上方滚动 10px
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          el: '#my_router_view',
          top: 0,
        });
      }, 500);
    });
  },
  routes
})

export default router
