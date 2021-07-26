import {HttpUtil, RequestBean, ResponseBean,createRequest} from 'bdjf_http'
import Store from "../store";
import qs from 'qs';


export function post(requestBean: RequestBean,params:Record<string, unknown> = {}): Promise<ResponseBean>{
    if(Store.state.isLogin){
        params['staff_id'] = Store.getters.getUser.staffId;
    }
    return HttpUtil.request(requestBean,qs.stringify(params));
}

export class API{

    public static readonly loginWithCode = ()=>createRequest('/login');

}
