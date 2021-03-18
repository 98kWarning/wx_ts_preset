import { createStore } from 'vuex'
import { User,StoreState } from './type'
import {HttpUtil} from "bdjf_http";
import axios from "axios"

export default createStore<StoreState>({
  state: {
    user:{},
    isLogin:false
  },
  mutations: {
    setUser(state,newUser: User){
      state.user = newUser;
      state.isLogin = true;
      sessionStorage.setItem('_clixgo_is_login',"true");
      sessionStorage.setItem("_clixgo_user",JSON.stringify(newUser))
      const httpUtil = new HttpUtil()
      const baseUrl = process.env.VUE_APP_SERVER
      const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-clixgo-sessionid':newUser.sessionId
        }
      });
      httpUtil.setAxios(axiosInstance)
    },
    logout(state){
      state.user = {};
      state.isLogin = false;
    }
  },
  getters: {
    getUser(state): User{
      return (state.user as User);
    },
  },
  actions: {
  }
})
