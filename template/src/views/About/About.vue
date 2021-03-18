<template>
  <div class="home col">
    About
    关于
  </div>
</template>

<script lant="ts">
import { defineComponent,reactive,toRefs,inject } from 'vue';

export default defineComponent({
  name: 'About',
  setup(){

    const updateTitle: Function = inject('setNavTitle')

    const state = reactive({

    })

    const setTitle = ()=>{
      updateTitle('关于页面')
    }

    setTitle()

    return {
      ...toRefs(state)
    }
  }
});
</script>

<style scoped>
</style>

