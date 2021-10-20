<template>
  <router-view v-slot="{ Component, route }">
    <van-config-provider style="height: 100%" :theme-vars="themeVars">
      <div id="container" class="col">
        <van-nav-bar
          v-if="!route.meta.hideNavBar"
          :title="route.meta.title"
          :left-arrow="!route.meta.hideBackBtn"
          @click-left="onClickLeft"
        />
        <div id="my_router_view" ref="routerContainerView">
          <transition :name="transitionName">
            <component :is="Component" />
          </transition>
        </div>
      </div>
    </van-config-provider>
  </router-view>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, provide } from "vue";
import router from "./router";
import { getTheme } from "@/util/CustomTheme";
import { NavBar, ConfigProvider } from "vant";
import { RouteLocationNormalized } from "vue-router";

export default defineComponent({
  name: "App",
  components: {
    "van-nav-bar": NavBar,
    "van-config-provider": ConfigProvider,
  },
  setup() {
    const themeVars = getTheme();
    const routerContainerView = ref(null);

    const setNavTitle = (title: string) => {
      
    };

    const transitionName = ref("slide-left");

    provide("setNavTitle", setNavTitle);

    const routeArr: RouteLocationNormalized[] = [];

    onMounted(() => {
      router.beforeEach((to, from) => {
        if (to.name === from.name) {
          transitionName.value = "";
          return;
        }
        if (routeArr.length < 2) {
          forward();
          routeArr.push(to);
          return;
        }
        if (to.name === routeArr[routeArr.length - 2].name) {
          reverse();
          routeArr.pop();
        } else {
          forward();
          routeArr.push(to);
        }
      });
    });

    const forward = ()=>{
        transitionName.value = "slide-left";
    }

    const reverse = ()=>{
        transitionName.value = "slide-right";
    }

    const onClickLeft = () => {
      router.back();
    };

    return {
      onClickLeft,
      themeVars,
      routerContainerView,
      transitionName,
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

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  width: 100vw;
  backface-visibility: hidden;
  perspective: 1000;
}

.slide-right-enter-active {
  /* opacity: 0; */
  animation: re 0.5s ease;
}

@keyframes re {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
}

.slide-right-leave-active {
  /* opacity: 0; */
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter-active {
  /* opacity: 0; */
  /* background-color: #fff; */
  animation: le 0.5s ease;
}

@keyframes le {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0%, 0, 0);
  }
}

.slide-left-leave-active {
  /* opacity: 0; */
  transform: translate3d(-100%, 0, 0);
}
</style>
