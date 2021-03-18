<template>
  <div class="home col">
    Home
    <router-link to="/about" >About</router-link>
  </div>
</template>

<script lant="ts">
import { defineComponent,reactive,toRefs } from 'vue';

export default defineComponent({
  name: 'Home',
  setup(){

    const state = reactive({

    })

    return {
      ...toRefs(state)
    }
  }
});
</script>

<style scoped>
@import "home.css";
</style>

