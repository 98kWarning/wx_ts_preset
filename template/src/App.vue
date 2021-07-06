<template>
  <van-config-provider style="height: 100%" :theme-vars="themeVars">
    <div id="container" class="col">
      <van-nav-bar
        v-if="showCommonNavBar && !isIos"
        :title="titleText"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div id="my_router_view" :class="isIos && showCommonNavBar ? 'ios_class' : ''">
        <router-view></router-view>
      </div>
    </div>
  </van-config-provider>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, provide } from "vue";
import router from "./router";
import { webIsIos } from '@/util/Utils'
import { getTheme } from "@/util/Utils";

export default defineComponent({
  name: "App",
  setup() {
    const showCommonNavBar = ref(true);
    const titleText = ref("");
    const themeVars = getTheme();

    const isIos = webIsIos()
    const setNavTitle = (title: string) => {
      if (isIos) {
        document.title = title;
      } else {
        titleText.value = title;
      }
    }

    provide('setNavTitle', setNavTitle)

    let routerView;
    onMounted(() => {
      routerView = document.querySelector('#my_router_view');
      router.afterEach((to) => {
        if (to.meta) {
          if (to.meta.hideNavBar) {
            showCommonNavBar.value = false;
          } else {
            showCommonNavBar.value = true;
          }
          if (to.meta.title) {
            setNavTitle((to.meta.title as string))
          }
        }
        routerView.scrollTop = 0;
      });
    });

    const onClickLeft = () => {
      router.back();
    };

    return {
      titleText,
      showCommonNavBar,
      onClickLeft,
      isIos,
      themeVars
    };
  },
});
</script>

<style>
#container {
  width: 100%;
  height: 100%;
}
#my_router_view {
  height: 0;
  flex: 1;
  overflow-y: auto;
}
.ios_class {
  padding-top: 10px;
}
</style>
