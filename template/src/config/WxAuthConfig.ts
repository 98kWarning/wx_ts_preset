import {User} from "@/store/type";

export class WxAuthConfig {
    public  static  readonly  copid = 'wwd8d7e3f0a82c60e5';
    public  static  readonly  redirectUri = '';
    public  static  readonly  state = 'STATE';
    public static getTestUser():User{
        return  {
            "userId": '42',
            "phone": "1234567890",
            "userName": "wwwwwqj",
            "sessionId": "f0821e75ee0903c06cc18d05df7096cd-42"
        }
    }
}
