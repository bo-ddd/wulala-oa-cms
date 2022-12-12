<script setup lang="ts">
import TextBorder from '@/components/TextBorder.vue';
import { ref } from 'vue';
import Activity from '@/components/Activity.vue';
import { useRoute } from 'vue-router'
const route = useRoute()
const ActivityInfoList = [
    {
        id: 1,
        activityName: '狼人杀',
        activityBgUrl: '/src/assets/images/bg-werewolf.jpg',
        activityTime: '2022/12/10',
        appointmentTime: '2022/12/4 09.00 至 2022/12/9 18:00',
        activityTextList: [
            {
                id: 10,
                title: '游戏背景',
                content: '很久很久以前，在莱茵河畔一座崖壁陡峭的山顶上，有一个名叫“杜斯特瓦德”的小村庄。不久前，这个小村庄每晚都会受到狼人的侵袭。每个夜晚，狼人都会在村中进行抢劫，并且会有一个村民成为这群狼人的牺牲品。然而村民们不会坐以待毙，他们试图寻找出这些白天隐藏在他们之中的狼人'
            },
            {
                id: 11,
                title: '游戏目的',
                content: `1.提高思辨能力，培养团队精神; 
                          2.感受语言的魅力，学习语言使用技巧，展开一段与声音有关的旅程; 
                          3.展现个人魅力风采，辩论能激发个人的潜能，提高对问题的深思，更能实现跨越灵感界限的沟通。`
            },
            {
                id: 12,
                title: '游戏规则',
                content: '游戏时间：20-30分钟。游戏中主要由狼人、特殊村民和普通村民组成，狼人的目标是吞食所有村民，而村民的目标则是找出隐藏在村民中的狼人并消灭他们，特殊村民由于有特殊功能为游戏提供了很多有力线索，当然也可能是狼人混迹其中混淆你的判断哦，需要你机智敏锐的洞察力，来完成你的任务。'
            }
        ]

    }
]

</script>

<template>
    <!-- 活动时间 报名时间 游戏背景 游戏目的 游戏规则 游戏流程 奖品 背景颜色 背景图  背景音乐ID-->
    <div v-for="item in ActivityInfoList">
        <Activity :activityTime="item.activityTime" :appointmentTime="item.appointmentTime"
            :activityBgUrl="item.activityBgUrl" :activityId="item.id"  v-if="item.id == Number(route.query.id)">
            <TextBorder class="mt-50" v-for="key in item.activityTextList">
                <template #title> 
                    {{ key.title }}
                </template>
                <template #content>
                    {{ key.content }}
                </template>
            </TextBorder>
            <div class="prize mt-50">
                <p class="title">奖品区</p>
            </div>
        </Activity>
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