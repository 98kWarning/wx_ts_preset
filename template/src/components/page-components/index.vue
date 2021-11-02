<template>
    <div class="container col">
        <NavBar
            v-if="!route.meta.hideNavBar"
            :title="route.meta.title"
            :left-arrow="!route.meta.hideBackBtn"
            @click-left="onClickLeft(route)"
        />
        <div  class="page-sc" >
            <component :is="component" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { JsBridge } from '@/util/JsBridge'
import router from "@/router";
import { NavBar } from 'vant';

const props = defineProps({
    route: Object,
    component: Object
})

const onClickLeft = (route: any) => {
    if (route.meta.backClose) {
        JsBridge.close();
    } else {
        router.back();
    }
};

</script>
<style scoped>
</style>