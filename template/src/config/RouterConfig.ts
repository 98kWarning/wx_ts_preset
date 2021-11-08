import router from '@/router'
import store from '@/store'

const loginUrl = '/login';
export function initRouter() {
    router.beforeEach((to, from, next) => {
        if (to.meta.notNeedLogin) {
            next()
        } else {

            // 这个地方与刷新时重新登陆逻辑不冲突
            // StoreConfig.ts 中的代码是在用户刷新后，在session中重新取出用户信息然后完成登录
            // 代码是在此之前执行

            store.state.isLogin ? next() : next({
                path:loginUrl,
                query:{
                    redirectTo:to.path,
                    ...to.query,
                }
            })
        }
    })
}
