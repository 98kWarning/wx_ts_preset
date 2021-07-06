import router from '../router/index'
import store from '@/store'

const loginUrl = '/wxauth';
export function initRouter() {
    router.beforeEach((to, from, next) => {
        if (to.meta.notNeedLogin) {
            next()
        } else {
            store.state.isLogin ? next() : next(loginUrl)
        }
    })
}
