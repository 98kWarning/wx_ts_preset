<template>
  <div class="page col">
    <div class="router-item mt10" v-for="(route,index) in routers" :key="index">
      <router-link class="col" :to="{path:route.path,query:route?.meta?.testQuery||{}}">
        <span>标题：{{route.meta.title}}</span>
        <span>路径：{{String(route.path)}}</span>
        <span v-if="route?.meta?.testQuery">参数：{{route?.meta?.testQuery}}</span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs } from 'vue';
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
  padding: 0.1rem;
  background-color: #fff;
  border-radius: 0.05rem;
  font-size: 0.14rem;
}
</style>
