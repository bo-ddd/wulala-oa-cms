<script setup lang="ts">
import TextBorder from '@/components/TextBorder.vue';
import MusicPlayer from '@/components/MusicPlayer.vue';
import { ref,onMounted } from 'vue';
const isPlay = ref(true) //音乐播放器开关状态;

//音乐播放器切换开关;
function toggleMusicStatus() {
    isPlay.value = isPlay.value ? false : true
}
// onMounted(()=>{
//     isPlay.value=false;
//     // setTimeout(()=>{
//     //     isPlay.value=true;
//     // },1000)
// })
onMounted(()=>{
    toggleMusicStatus()
    console.log('第一次')
    console.log(isPlay.value)
    toggleMusicStatus()
    console.log('第二次')
    console.log(isPlay.value)
})
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
                    游戏规则
                </template>
                <template #text>
                    游戏时间：20-30分钟。游戏中主要由狼人、特殊村民和普通村民组成，狼人的目标是吞食所有村民，而村民的目标则是找出隐藏在村民中的狼人并消灭他们，特殊村民由于有特殊功能为游戏提供了很多有力线索，当然也可能是狼人混迹其中混淆你的判断哦，需要你机智敏锐的洞察力，来完成你的任务。
                </template>
            </TextBorder>
        </div>
        <keep-alive>
        <MusicPlayer :autoplay="true" :isPlay="isPlay" v-show="false"></MusicPlayer>
        </keep-alive>
        <div class="music" @click="toggleMusicStatus" :class="{ rotate: isPlay }">
            <img class="icon-music" src="@/assets/images/icon-music.png">
        </div>
    </div>

</template>



<style scoped>
.main {
    width: 1200px;
    margin: 0 auto;
    background-color: black;
    color: white;
    padding-bottom: 50px;
    position: relative;
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

:deep(.el-button--large) {
    font-size: 24px;
    padding: 26px;
}

.mt-50 {
    margin-top: 50px;
}

.audio {
    width: 200px;
    height: 200px;
    background-color: white;
}

.box {
    width: 200px;
    height: 100px;
    background-color: white;
}

@keyframes rotate {
    0% {
        -webkit-transform: rotate(0deg);
    }

    25% {
        -webkit-transform: rotate(90deg);
    }

    50% {
        -webkit-transform: rotate(180deg);
    }

    75% {
        -webkit-transform: rotate(270deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

.music {
    display: inline-flex;
    border-radius: 100%;
    padding: 5px;
    justify-content: center;
    align-items: center;
    background-color: rgba(217, 221, 221, 0.6);
    position: absolute;
    top: 50px;
    right: 50px;
}


.rotate {
    animation: rotate 2s linear infinite;
}



.icon-music {
    width: 40px;
    height: 40px;
}
</style>