<script setup lang="ts">
import Card from '@/components/Card.vue';
const latestActivityList = [
    {
        id: 1,
        title: '狼人杀',
        url: '/src/assets/images/image-werewolf.jpg',
        totalNum: 12,
        currentNum: 8
    },
    {
        id: 2,
        title: '三国杀',
        url: '/src/assets/images/image-Kingdoms.jpg',
        totalNum: 14,
        currentNum: 5
    },
    {
        id: 3,
        title: '剧本杀',
        url: '/src/assets/images/image-mmg.jpg',
        totalNum: 8,
        currentNum: 7
    },
    {
        id: 4,
        title: '王者争霸赛',
        url: '/src/assets/images/image-timi.jpg',
        totalNum: 10,
        currentNum: 5
    }
]
</script>

<template>
    <div>
        <div class="header">
            <img src="@/assets/images/activity.jpg" class='banner-activity' alt="">
        </div>
        <div class="container mt-20">
            <div class="activity">
                <div class="bg-title">
                    <el-header class="laber">最新上线</el-header>
                </div>

                <el-main class="list">
                    <Card v-for="item in latestActivityList" :data="item" :key="item.id" />
                </el-main>
            </div>
            <div class="activity">
                <div class="bg-title">
                    <el-header class="laber">限时活动</el-header>
                </div>
                <el-main class="list">
                    <Card v-for="item in latestActivityList" :data="item" :key="item.id" />
                </el-main>
            </div>
            <div class="activity">
                <div class="bg-title">
                    <el-header class="laber">一次性活动</el-header>
                </div>
                <el-main class="list">
                    <Card v-for="item in latestActivityList" :data="item" :key="item.id" />
                </el-main>
            </div>
            <div class="activity">
                <div class="bg-title">
                    <el-header class="laber">常驻活动</el-header>
                </div>
                <el-main class="list">
                    <Card v-for="item in latestActivityList" :data="item" :key="item.id" />
                </el-main>
            </div>
        </div>

    </div>

</template>



<style scoped>
.header {
    width: 100%;
    background-color: #5F35A5;

}

.banner-activity {
    display: block;
    width: 1180px;
    margin: 0 auto;
}

.bg-title {
    display: inline;
    padding: 10px 20px;
    background: url('@/assets/images/bg-title.png') no-repeat center;
    background-size: cover;
}

.laber {
    display: inline;
    padding: 10px 20px;
    color: #88775D;
    font-size: 16px;
    font-weight: bold;
    border-radius: 10px;
    box-sizing: border-box;
    align-items: center;
}

.activity {
    height: 350px;
}

.activity .list {
    height: 300px;
    display: flex;
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
}
</style>