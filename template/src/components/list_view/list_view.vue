<template>
  <div :class="[viewStatus === 'init'?'list-view-empty-view':'list-view-defalut-view']">
      <slot
          v-for="(item, index) in datas"
          :key="itemKeyFun(item,index)"
          v-bind:item="item"
          v-bind:index="index"
      ></slot>
  </div>
  <div v-if="viewStatus === 'loading'">
    <slot name="loading">
      <span class="list-view-center">{{ loadingText }}</span>
    </slot>
  </div>
  <div v-if="viewStatus === 'empty'">
    <slot name="finished">
      <span class="list-view-center">{{ emptyText }}</span>
    </slot>
  </div>
  <div v-if="viewStatus === 'finished'">
    <slot name="finished">
      <span class="list-view-center">{{ finshedText }}</span>
    </slot>
  </div>
  <div @click="errorClick" v-if="viewStatus === 'error'">
    <slot name="error">
      <span class="list-view-center">{{ errorText }}</span>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, computed } from "vue";
function debounce(callBack:()=>void, millisecond: number) {
  let timeout = -1;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(callBack, millisecond);
  };
}
export default defineComponent({
  name: "ListView",
  props: {
    listData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    bindKey:{
        type: [String,Function],
        default:() => null
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    error: {
      type: Boolean,
      default: () => false,
    },
    finished: {
      type: Boolean,
      default: () => false,
    },
    emptyText: {
      type: String,
      default: () => {
        return "暂无数据";
      },
    },
    emptyItem: {
      type: Object,
      default: () => {
        return {};
      }
    },
    placeCount:{
      type: Number,
      default: () => {
        return 10;
      }
    },
    loadingText: {
      type: String,
      default: () => "加载中...",
    },
    finshedText: {
      type: String,
      default: () => "没有更多了",
    },
    errorText: {
      type: String,
      default: () => "加载失败了，点我重新加载",
    },
    offset: {
      type: Number,
      default: () => 100,
    },
    immediateCheck: {
      type: Boolean,
      default: () => true,
    },
    bindScrollDocument: {
      type: Object,
      default: () => null,
    },
  },
  emits: ["load", "update:loading", "update:error"],
  setup(props, context) {
    const bindScrollDocument = props.bindScrollDocument || window;

    const viewStatus = computed(() => {
      if (props.listData.length === 0 && props.loading) {
        return "init";
      }
      if (props.listData.length === 0 && props.finished) {
        return "empty";
      }
      if (props.error) {
        return "error";
      }
      if (props.finished) {
        return "finished";
      }
      if (props.loading) {
        return "loading";
      }
      return "loading";
    });

    const datas = computed(()=>{
      if(viewStatus.value==='init'){
        const emptyArr = [];
        const count = props.placeCount>10?10:props.placeCount;
        for(let i=0;i<count;i++){
          emptyArr.push(props.emptyItem);
        }
        return emptyArr;
      }else if(viewStatus.value === 'empty'){
        return []
      }
      return props.listData;
    })

    let debounceFun: ()=>void;

    const loading = () => {
      if (props.finished) {
        return;
      }
      if(props.loading){
        return;
      }
      console.log("loading");
      context.emit("update:loading", true);
      context.emit("load");
    };

    const errorClick = () => {
      loading();
    };

    const onScroll = () => {
      const element = bindScrollDocument;
      // 获取总高度
      const innerHeight = element.scrollHeight;
      // 屏幕尺寸高度
      const clientHeight = element.clientHeight;
      // 可滚动容器超出当前窗口显示范围的高度
      const scrollTop = element.scrollTop;
      if (clientHeight + scrollTop >= innerHeight) {
        debounceFun();
      }
    };

    const bindScroll = () => {
      bindScrollDocument.removeEventListener("scroll", onScroll);
      bindScrollDocument.addEventListener("scroll", onScroll);
    };

    onBeforeUnmount(() => {
      bindScrollDocument.removeEventListener("scroll", onScroll);
    });

    onMounted(() => {
      debounceFun = debounce(loading, 1000);
      bindScroll();
      if (props.immediateCheck) {
        loading();
      }
    });

    const itemKeyFun = (item: Record<string, unknown>,index: number)=>{
        if(viewStatus.value==='init'){
          return index;
        }
        if(!props.bindKey){
            return index;
        }else{
            if(props.bindKey instanceof Function){
                return props.bindKey(item,index);
            }else{
                return item[props.bindKey]
            }
        }
    }

    return {
      errorClick,
      viewStatus,
      itemKeyFun,
      datas
    };
  },
});
</script>

<style >
.list-view-init-view {
  pointer-events: none;
}
.list-view-defalut-view span,
.list-view-defalut-view a,
.list-view-defalut-view img
{
  transition: all .7s ease;
  background-color: rgba(0, 0, 0, 0)
}

.list-view-empty-view span,
.list-view-empty-view a {
  color: rgba(0, 0, 0, 0) !important;
  border-radius: 2px;
  background: linear-gradient(
    -45deg,
    #999999 0%,
    #777 25%,
    #999999 50%,
    #777 75%,
    #999999 100%
  );
  animation: gradientBG 4s ease infinite;
  background-size: 400% 400%;
  background-color:#666;
  transition: all 1s ease;
}
/* [src=""],img:not([src])*/
.list-view-empty-view img {
  content: url(./no_url.png);
  border-radius: 2px;
  background: linear-gradient(
    -45deg,
    #999999 0%,
    #777 25%,
    #999999 50%,
    #777 75%,
    #999999 100%
  );
  animation: gradientBG 4s ease infinite;
  background-size: 400% 400%;
  background-color:#666;
  transition: all 1s ease;
}
@keyframes gradientBG {
  0% {
    background-position: 100% 100%;
  }
  50% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 100%;
  }

}

.list-view-center{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #777;
  font-size: 15px;
}


</style>
