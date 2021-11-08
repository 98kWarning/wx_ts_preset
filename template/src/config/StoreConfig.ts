import store from "@/store";
import { ProjectConfig } from "@/config";

export function initStore() {
  const isLogin =
    sessionStorage.getItem(ProjectConfig.SESSION_IS_LOGIN) === "true";
  if (isLogin) {
    try {
      const sessionUser = JSON.parse(
        sessionStorage.getItem(ProjectConfig.SESSION_USER)
      );
      if (sessionUser) {
        store.commit("setUser", sessionUser);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
