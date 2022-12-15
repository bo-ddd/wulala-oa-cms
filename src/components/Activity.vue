<template>
    <!-- 活动时间 报名时间 游戏背景 游戏目的 游戏规则 游戏流程 奖品 背景颜色 背景图  背景音乐ID-->
    <div class="main">
            <img class="bg-main" :src="activityBgUrl" alt="">
        <div class="wrapper">
            <p class="mt-20">
                活动时间：{{ activityTime }}
            </p>
            <p class="mt-20">
                报名时间：{{ appointmentTime }}
            </p>
            <el-button type="danger" size="large" class="mt-20"  @click="handleSubmit(activityId)"
                :disabled="disabled">{{disabled? '已报名':'立即报名'}}</el-button>
            <slot></slot>
            <div class="tip mt-50">
                活动最终解释权归乌拉拉所有
            </div>
        </div>
        <MusicPlayer :autoplay="true" :isPlay="isPlay" v-show="false"></MusicPlayer>
        <div class="music" @click="toggleMusicStatus" :class="{ rotate: isPlay }">
            <img class="icon-music" src="@/assets/images/icon-music.png">
        </div>
    </div>
</template>

<script setup lang="ts">
import MusicPlayer from '@/components/MusicPlayer.vue';
import { ref, reactive } from 'vue';
const props = defineProps<{
    activityId: number,
    activityBgUrl: string,
    activityTime: string,
    appointmentTime: string,
    bgColor:string,
    fontColor:string
}>()
const { activityTime, appointmentTime, activityBgUrl, activityId } = props
const isPlay = ref(true) //音乐播放器开关状态;
const disabled = ref(false)

//音乐播放器切换开关;
function toggleMusicStatus() {
    isPlay.value = isPlay.value ? false : true
}
function handleSubmit(activityId: number) {
    //调接口，将活动Id传递给后端;
    //成功之后的操作;
    disabled.value=true;
}
</script>



<style scoped>
.main {
    width: 1200px;
    margin: 0 auto;
    background-color: v-bind(bgColor);
    color: v-bind(fontColor);
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

.prize {
    width: 104%;
    height: 500px;
    color: white;
    padding: 60px 140px 70px 110px;
    box-sizing: border-box;
    background-color: white;
    background: url('@/assets/images/bg-prize.png') no-repeat center;
    background-size: cover;
}

.prize .title {
    padding: 20px 0;
    font-size: 26px;
    font-weight: bold;
}

.tip {
    width: 100%;
    font-size: 14px;
    color: white;
}
</style>