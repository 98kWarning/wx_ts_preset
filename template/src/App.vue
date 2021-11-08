<template>
  <van-config-provider style="height: 100%" :theme-vars="themeVars">
    <router-view v-slot="{ Component, route }">
      <transition :name="transitionName">
        <!-- 没有key的话,vue的动画无法生效 -->
        <PageComponents :key="route.path" :route="route" :component="Component" />
      </transition>
    </router-view>
  </van-config-provider>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { getTheme } from "@/util/CustomTheme";
import { ConfigProvider } from "vant";
import { RouteLocationNormalized } from "vue-router";
import router from '@/router';
import PageComponents from '@/components/page-components/index.vue';

export default defineComponent({
  name: "App",
  components: {
    "van-config-provider": ConfigProvider,
    PageComponents
  },
  setup() {
    const themeVars = getTheme();

    const transitionName = ref("");


    const routeArr: RouteLocationNormalized[] = [];

    onMounted(() => {
      router.beforeEach((to, from) => {
        let hide = to.meta?.hideAnim || from.meta?.hideAnim;

        if (to.name === from.name) {
          hideRouteAnim();
          return;
        }
        if (routeArr.length < 2) {
          if (!hide) forward();
          routeArr.push(to);
          return;
        }
        if (to.name === routeArr[routeArr.length - 2].name) {
          if (!hide) reverse();
          routeArr.pop();
        } else {
          if (!hide) forward();
          routeArr.push(to);
        }
      });
    });

    const hideRouteAnim = () => {
      transitionName.value = '';
    }

    const forward = () => {
      transitionName.value = "slide-left";
    };

    const reverse = () => {
      transitionName.value = "slide-right";
    };

    return {
      themeVars,
      transitionName,
    };
  },
});
</script>

<style>
.container {
  width: 100%;
  height: 100%;
}
.page-sc {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
}


.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100vw;
  backface-visibility: hidden;
  perspective: 1000;
}

.slide-right-enter-active {
  /* opacity: 0; */
  animation: re 0.3s ease;
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
  animation: le 0.3s ease;
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
