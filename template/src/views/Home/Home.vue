<template>
  <div class="home col">
    <clam-view :res="res">
      <span>Home</span>
        <router-link to="/about" >About</router-link>
    </clam-view>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue';
import {ResponseBean} from 'bdjf_http'

export default defineComponent({
  name: 'Home',
  setup(){

    const state = reactive({
      res:new ResponseBean().loading()
    })

    onMounted(()=>{
      setTimeout(()=>{
        state.response = new ResponseBean(0,'',{})
      },1500)
    })

    return {
      ...toRefs(state)
    }
  }
});
</script>

<style scoped>
</style>

