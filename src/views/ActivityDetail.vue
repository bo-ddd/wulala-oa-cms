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
        bgColor:'#000000',
        fontColor:'#ffffff',
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

    },
    {
        id: 2,
        activityName: '三国杀',
        activityBgUrl: '/src/assets/images/bg-war.png',
        activityTime: '2022/12/10',
        appointmentTime: '2022/12/4 09.00 至 2022/12/9 18:00',
        bgColor:'#F5F5F5',
        fontColor:'#000000',
        activityTextList: [
            {
                id: 20,
                title: '游戏背景',
                content: '很久很久以前，在莱茵河畔一座崖壁陡峭的山顶上，有一个名叫“杜斯特瓦德”的小村庄。不久前，这个小村庄每晚都会受到狼人的侵袭。每个夜晚，狼人都会在村中进行抢劫，并且会有一个村民成为这群狼人的牺牲品。然而村民们不会坐以待毙，他们试图寻找出这些白天隐藏在他们之中的狼人'
            },
            {
                id: 21,
                title: '游戏目的',
                content: `1.提高思辨能力，培养团队精神; 
                          2.感受语言的魅力，学习语言使用技巧，展开一段与声音有关的旅程; 
                          3.展现个人魅力风采，辩论能激发个人的潜能，提高对问题的深思，更能实现跨越灵感界限的沟通。`
            },
            {
                id: 22,
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
            :activityBgUrl="item.activityBgUrl"  :bgColor="item.bgColor" :fontColor="item.fontColor" :activityId="item.id"  v-if="item.id == Number(route.query.id)">
            <TextBorder class="mt-50" v-for="key in item.activityTextList">
                <template #title> 
                    {{ key.title }}
                </template>
                <template #content>
                    {{ key.content }}
                </template>
            </TextBorder>
            <div class="prize mt-50" v-if="item.bgColor=='#000000'">
                <p class="title">奖品区</p>
            </div>
        </Activity>
    </div>
</template>



<style scoped>
.mt-50 {
    margin-top: 50px;
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
</style>