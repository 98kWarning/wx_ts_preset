<template>
  <div class="home col">
    <div class="router-item" v-for="(router,index) in routers" :key="index">
      <router-link :to="router.path">{{`${router.meta.title} ${String(router.name)}`}}</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,inject } from 'vue';
import router from '@/router'

export default defineComponent({
  name: 'About',
  setup(){

    const state = reactive({
      routers:router.getRoutes()
    })

    return {
      ...toRefs(state)
    }
  }
});
</script>

<style scoped>
.router-item{
  padding: 10px;
}
</style>
