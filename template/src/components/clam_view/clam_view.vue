<template>
    <div class="empty_view col-center item-center" v-if="viewStatus === 'empty'">
      <van-empty :description="emptyText"/>
    </div>
    <div class="clam-box" :class="[viewStatus==='loading'?'clam-view-empty-view':'clam-view-default-view']" v-if="viewStatus === 'show'||viewStatus === 'loading'">
      <slot v-bind:data="viewStatus==='loading'?emptyData:res.data"></slot>
    </div>
    <div class="empty_view center" v-if="viewStatus === 'error'">
      <van-empty image="error" :description="res.msg" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {ResponseBean} from 'bdjf_http'

export default defineComponent({
  name: 'ClamView',
  props: {
    res: {
        type:ResponseBean,
        default:()=>{
            return new ResponseBean().loading();
        }
    },
    showLoading :{
        type: Boolean,
        default:()=>{
            return false;
        }
    },
    emptyText:{
         type: String,
         default:()=>{
             return '暂无数据';
         }
    },
    emptyData:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  computed:{
      viewStatus(): string {
        return this.viewStatusAdapter(this.res);
      }
  },
  methods:{
      viewStatusAdapter(response: ResponseBean): string {
        // console.log('----viewStatusAdapter----',response)
      if (this.showLoading) {
        return "loading";
      }
      if (!response) {
        return "loading";
      }
      switch (response.code) {
        case 0:
          if (!response.data || response.data.length === 0) {
            return "empty";
          } else {
            return "show";
          }
        case -100:
          return "loading";
        case 404:
          return "empty";
        default:
          return "error";
      }
    }
  }
});
</script>

<style>
@import url("./clam_view.css");
</style>