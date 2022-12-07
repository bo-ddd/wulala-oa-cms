<script setup lang="ts">
import TextBorder from '@/components/TextBorder.vue'
</script>

<template>
    <div class="main">
        <img class="bg-main" src="@/assets/images/bg-werewolf.jpg" alt="">
        <div class="wrapper">
            <p class="mt-20">
                活动时间：2022/12/10
            </p>
            <p class="mt-20">
                报名时间：2022/12/4 09.00 至 2022/12/9 18:00
            </p>
            <el-button type="primary" size="large" class="mt-20">立即报名</el-button>
            <TextBorder class="mt-50">
                <template #title>
                    游戏背景
                </template>
                <template #text>
                    很久很久以前，在莱茵河畔一座崖壁陡峭的山顶上，有一个名叫“杜斯特瓦德”的小村庄。不久前，这个小村庄每晚都会受到狼人的侵袭。每个夜晚，狼人都会在村中进行抢劫，并且会有一个村民成为这群狼人的牺牲品。然而村民们不会坐以待毙，他们试图寻找出这些白天隐藏在他们之中的狼人......
                </template>
            </TextBorder>
            <TextBorder class="mt-50">
                <template #title>
                    游戏流程
                </template>
                <template #text>
                </template>
            </TextBorder>

        </div>
    </div>
</template>



<style scoped>
.main {
    width: 1500px;
    margin: 0 auto;
    background-color: black;
    color: white;
    padding-bottom: 50px;
}

.bg-main {
    width: 100%;
    text-align: center;
}

.wrapper {
    width: 800px;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
}

/* .title{
    text-align: start;
    padding:20px 0;
    font-size:26px;
    font-weight: bold;
}
.text {
    line-height: 50px;
    text-align: justify;

}

.border {
    height: 500px;
    background: url('@/assets/images/bg-border.png') no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 80px;
} */

:deep(.el-button--large) {
    font-size: 24px;
    padding: 26px;
}

.mt-50 {
    margin-top: 50px;
}
</style>