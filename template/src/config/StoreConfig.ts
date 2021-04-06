import store from '../store/index'
import {ProjectConfig} from "@/config";

export function initStore(){
    const isLogin = sessionStorage.getItem(ProjectConfig.SESSION_IS_LOGIN) === 'true';
      if(isLogin){
          const sessionUser = JSON.parse(sessionStorage.getItem(ProjectConfig.SESSION_USER||''));
          if(sessionUser){
            store.commit('setUser',sessionUser);
          }
      }
}