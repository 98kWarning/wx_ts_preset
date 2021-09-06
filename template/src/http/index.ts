import { sendRequest } from "@/config"

export const API = {


    login:(data:any)=> sendRequest({
        url:'login',
        method:'POST',
        data:data,
        loadingText:'登陆中...'
    }),

    getDefinedStrings:()=> sendRequest({
        url:'pub/common/getDefinedStrings',
        method:'POST',
        loadingText:'获取字符串...',
        needCache:true
    }),

    agreementContent:(params:any)=>sendRequest({
        url:'pub/hospital/agreementContent',
        method:'POST',
        data:params,
        loadingText:'获取协议...',
        needCache:true
    },{bindCacheKey:['id']}),

}