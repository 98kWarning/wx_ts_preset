<template>
  <div class="login_page">
    <span v-if="!errorMsg">登录中...</span>
    <template v-else>
      <p >登录失败!</p>
      <p>{{errorMsg}}</p>
    </template>
  </div>
</template>
<script>
import { defineComponent,ref} from 'vue'
import Store from '@/store'
import { useRoute } from 'vue-router'
import {API} from '@/http';
import router from '@/router'
import {WxAuthConfig} from "@/config";

const getRedirectParams = (query)=>{

  const {redirectTo,...otherParams} = query;

  return {
    redirectTo,
    otherParams
  }
}

const getMyParams = (query) => {
      // 将search字符串转为对象
  function searchObj(search) {
      return JSON.parse("{\"".concat(decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"'), "\"}"));
  }
  if(query.sessionid){
    console.log('-----useRoute-----',query)
    return query;
  }else if(location.search){
    console.log('-----search-----',location.search)
    const search = searchObj(location.search)
    return search;
  }
  return {}
}

export default defineComponent({
  name: 'Login',
  setup(){

    const route = useRoute();

    const redirect = getRedirectParams(route.query);

    console.log('---redirect---',redirect);

    const errorMsg = ref('')

    const isDev = process.env.NODE_ENV === 'development';

    const loginComplete = (user)=>{

      // 完成登录，然后跳转
      // 此页面中的 redirect 信息参数是在路由拦截中加上的，
      // 具体代码在 RouterConfig 中

      Store.commit('setUser',user);

      if(redirect.redirectTo){
        router.replace({
          path:redirect.redirectTo,
          query:redirect.otherParams
        })
      }else{
         router.replace({
          path:'/home'
        })
      }
    }


    if(!isDev){
      const params = getMyParams(route.query);
      console.log('-----getMyParams-----',params)
      if(params.sessionid){
        API.login({
          sessionId:params.sessionid
        })
        .then(res=>{
          if(res.success){
            if(res.data.userid){
              loginComplete(res.data);
            }else{
              errorMsg.value = '登陆失败，userid为空';
            }
          }else{
            errorMsg.value = JSON.stringify(res);
          }
        })
      }
    }else{
      const testUser = WxAuthConfig.getTestUser();
      loginComplete(testUser);
    }
    return {
      errorMsg
    };
  }
})

</script>
<style>
.login_page{
  font-size: .14rem;
}
</style>
