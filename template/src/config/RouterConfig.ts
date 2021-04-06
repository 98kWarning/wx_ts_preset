import router from '../router/index'
import store from '@/store'

export function initRouter() {
    router.beforeEach((to, from, next) => {
        if (to.path === '/wxauth') {
            next()
        } else {
            store.state.isLogin ? next() : next('/wxauth')
        }
    })
}