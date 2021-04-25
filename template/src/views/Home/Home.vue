<template>
  <div class="home col">
    <clam-view :res="response" v-slot="{data}" :empty-data="emptyData">
      <p><span>{{data.name}}</span></p>
      <p>Home</p>
      <router-link to="/about" >{{data.route}}</router-link>
    </clam-view>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue';
import {ResponseBean} from 'bdjf_http'
import ClamView from '@/components/clam_view/index'

export default defineComponent({
  name: 'Home',
  components:{
    ClamView
  },
  setup(){

    const state = reactive({
      response:new ResponseBean().loading()
    })

    onMounted(()=>{
      setTimeout(()=>{
        state.response = new ResponseBean(0,'',{
          name:'Home',
          route:'About'
        })
      },2500)
    })

    const emptyData = {
      name:'站位文字',
      route:'站位文字'
    }

    return {
      ...toRefs(state),
      emptyData
    }
  }
});
</script>

<style scoped>
</style>
