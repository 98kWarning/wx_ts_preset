export function webIsIos(): boolean{
    const u = navigator.userAgent;
    if (u.indexOf('iPhone') > -1||u.indexOf('iphone') > -1) {
        return true;
    }
    return false;
}