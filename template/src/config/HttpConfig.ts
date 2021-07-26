import { HttpUtil } from "bdjf_http";
import axios from "axios"
import { Toast, Notify } from 'vant';

export function initHttp() {

    const baseUrl = process.env.VUE_APP_SERVER

    const axiosInstance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    HttpUtil.setAxios(axiosInstance)
    HttpUtil.initConfig({
        codeName: 'code',
        msgName: 'msg',
        dataName: 'data',
        successCode: 0,
        showError(error) {
            Notify({ type: 'danger', message: error.message });
        },
        showWarn(code,msg) {
            Notify({ type: 'warning', message: msg });
        },
        showLoading() {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
        },
        hideLoading() {
            Toast.clear()
        }
    })
}