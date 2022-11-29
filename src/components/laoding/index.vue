<template>
    <div class="loading"></div>
</template>
    
<script lang="ts">
export default {
    name: 'Loading' // 定义的组件名称 使用时写法：loading
}
</script>
    
<style scoped>
.loading {
    position: fixed;
    left: 0;
    top: 0;
    background: url('@/assets/images/Plant.gif') center center no-repeat #fff;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
}
</style>