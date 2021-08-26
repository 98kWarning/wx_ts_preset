<template>
  <div class="home col">
    <clam-view :res="res" v-slot="{data}">
      <p><span>{{data.name}}</span></p>
      <p>Home</p>
      <router-link to="/about" >{{data.route}}</router-link>
    </clam-view>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue';
import {ResponseBean,useLoadingRes} from 'bdjf_http'
import ClamView from '@/components/clam_view/index'

export default defineComponent({
  name: 'Home',
  components:{
    ClamView
  },
  setup(){

    const res = reactive<ResponseBean>(useLoadingRes({
      name:'站位文字',
      route:'站位文字'
    }))

    onMounted(()=>{
      setTimeout(()=>{
        res.update(new ResponseBean(0,'',{
          name:'Home',
          route:'About'
        }))
      },2500)
    })


    return {
      res
    }
  }
});
</script>

<style scoped>
</style>
