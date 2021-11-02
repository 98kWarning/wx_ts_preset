import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    hideNavBar?:boolean;
    hideBackBtn?:boolean;
    testQuery?:LocationQuery;
    hideAnim?:boolean;
  }
}
