import { BdjfHttp, BdjfRequest, createLoadingRes, HttpConfig,createRequest,CacheOption,RequestOption } from "bdjf_http";
import { Notify, Toast } from "vant";
import axios from 'axios';
import qs from "qs";
import Store from "@/store";


const bdjfConfig:HttpConfig = {
    attributeMapping:{
        code:'code',
        msg:'msg',
        data:'data'
    },
    successCode: 0,
    showError(res,request) {
        Notify({ type: 'danger', message: res.msg});
    },
    showWarn(res,request) {
        Notify({ type: 'warning', message: res.msg });
    },
    showLoading(request) {
        Toast.loading({
            message: request.requestOption.loadingText || '加载中...',
            forbidClick: true
        });
    },
    hideLoading() {
        Toast.clear()
    },
    openLog:false,
}

let httpInstance:BdjfHttp;

export function initHttp(){
    const baseUrl = process.env.VUE_APP_SERVER;

    console.log('-----baseUrl--------',baseUrl);
    
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 15000,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data, headers) {
            // 对 data 进行任意转换处理
            if(data){
                data.userid = Store.getters.getUser.staffId;;
            }
            console.log('----transformRequest----',data);
            return qs.stringify(data);
        }],
    });
    httpInstance = new BdjfHttp(axiosInstance,bdjfConfig);
}

export function setHeader(key:string,token:string){
    httpInstance.axiosInstance.defaults.headers.common[key] = token;
}

export function createLoading (data?:any){
    return httpInstance.createLoadingRes(data);
}

// 这里提供两种风格的send
// 1.requestOptions 中携带 data
export function sendRequest(requestOption: RequestOption, cacheOption?: CacheOption){
    return httpInstance.sendRequest(createRequest(requestOption,cacheOption));
}
// 2.requestOptions 与 data 分开
export function sendRequestWithData(requestData:BdjfRequest,data?:any){
    requestData.requestOption.data = data;
    return httpInstance.sendRequest(requestData);
}