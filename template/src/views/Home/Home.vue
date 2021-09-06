<template>
  <div class="home col">
    <clam-view :res="response" v-slot="{data}">
      <p><span>{{data.name}}</span></p>
      <p>Home</p>
      <router-link to="/about" >{{data.route}}</router-link>
    </clam-view>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive,toRefs,onMounted } from 'vue';
import {createLoading} from '@/config'
import ClamView from '@/components/clam_view/index'

export default defineComponent({
  name: 'Home',
  components:{
    ClamView
  },
  setup(){

    const response = reactive(createLoading({
      name:'站位文字',
      route:'站位文字'
    }))

    onMounted(()=>{
      setTimeout(()=>{
        response.update()
      },2500)
    })


    return {
      response
    }
  }
});
</script>

<style scoped>
</style>
