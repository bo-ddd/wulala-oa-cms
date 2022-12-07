<template>
    <div class="border">
        <div>
            <p class="title">
                <slot name="title"></slot>
            </p>
            <P class="text">
                <slot name="text"></slot>
            </P>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.border {
    height: 500px;
    background: url('@/assets/images/bg-border.png') no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 80px;
}
.title{
    text-align: start;
    padding:20px 0;
    font-size:26px;
    font-weight: bold;
}
.text {
    line-height: 50px;
    text-align: justify;

}
</style>