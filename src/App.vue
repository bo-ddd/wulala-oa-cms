<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
 <RouterView></RouterView>
</template>

<style>
#nprogress .bar {
    /* //// 自定义颜色 */
 background:linear-gradient(45deg,#ff0000 0%,#ffb600 11%,#ebe786 22%,#a5ff00 33%,#00a9ff 44%,rgb(89, 87, 248) 55%,#8e10f5 66%,#f7a0f0 77%,#ed447f 88%,#e84242 100%)!important;
 /* // 自定义高度 */
 height: 8px !important; 
 }
</style>
