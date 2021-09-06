import { createStore } from 'vuex'
import { User,StoreState } from './type'
import { setHeader } from '@/config';
import {ProjectConfig} from "@/config";

export default createStore<StoreState>({
  state: {
    user:{},
    isLogin:false
  },
  mutations: {
    setUser(state,newUser: User){
      state.user = newUser;
      state.isLogin = true;
      sessionStorage.setItem(ProjectConfig.SESSION_IS_LOGIN,"true");
      sessionStorage.setItem(ProjectConfig.SESSION_USER,JSON.stringify(newUser));
      setHeader(ProjectConfig.HEADER_TOKEN_NAME,newUser.sessionId);
    },
    logout(state){
      state.user = {};
      state.isLogin = false;
      sessionStorage.removeItem(ProjectConfig.SESSION_IS_LOGIN);
      sessionStorage.removeItem(ProjectConfig.SESSION_USER);
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
