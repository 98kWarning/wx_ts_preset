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
import {API,post} from '@/http';
import router from '@/router'
import {WxAuthConfig} from "@/config"

const getMyParams = () => {
      // 将search字符串转为对象
  function searchObj(search) {
      return JSON.parse("{\"".concat(decodeURIComponent(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"'), "\"}"));
  }
  if(useRoute().query.code){
    console.log('-----useRoute-----',useRoute().query)
    return useRoute().query;
  }else if(location.search){
    console.log('-----search-----',location.search)
    const search = searchObj(location.search)
    return search;
  }
  return {}
}

export default defineComponent({
  name: 'WxAuth',
  setup(){
    const errorMsg = ref('')
    const idProd = process.env.NODE_ENV === 'production';
    if(idProd){
      // alert(sessionStorage.getItem('isLogin'))
      if(sessionStorage.getItem('_clixgo_is_login') === 'true'){
         // eslint-disable-next-line no-undef
        console.log(WeixinJSBridge);
         // eslint-disable-next-line no-undef
        WeixinJSBridge?.call('closeWindow');
        return
      }

      const params = getMyParams();
      console.log('-----getMyParams-----',params)
      if(params.code){
        post(
          API.loginWithCode(),
          {
          code: params.code
         }
        )
        .then(res=>{
          if(res.success){
            Store.commit('setUser',res.data)
            router.replace({
              path:'/home'
            })
          }else{
            errorMsg.value = JSON.stringify(res);
          }
        })
      }else{
        const auth = {
          copid: WxAuthConfig.copid,
          redirectUri: encodeURIComponent(WxAuthConfig.redirectUri),
          state: WxAuthConfig.state
        }
        const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${auth.copid}&redirect_uri=${auth.redirectUri}&response_type=code&scope=snsapi_base&state=${auth.state}#wechat_redirect`
        setTimeout(()=>{
          window.location.replace(authUrl);
        },500)
      }
    }else{
      const testUser = WxAuthConfig.getTestUser();
      Store.commit('setUser',testUser);
      router.replace({
        path:'/home'
      })
    }
    return {
      errorMsg
    };
  }
})

</script>
<style>
.login_page{
  font-size: .25rem;
}
</style>
