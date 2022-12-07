<template>
    <div class="card">
        <div class="banner">
            <img :src="data.url" class='img-werewolf' alt="">
            <p class="entry">
                <span>{{ `报名人数(${data.currentNum}/${data.totalNum})` }}</span>
            </p>
        </div>
        <div class="flex-between">
            <el-tag type="danger">{{ data.title }}</el-tag>
            <el-button type="danger" size="small" @click="to(data.id)">去报名</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
const to = (id: number): void => {
    router.push({
        name: 'activityDetail',
        query: {
            id
        }
    })

}
const props = defineProps<{
    data: {
        id: number,
        title: string,
        url: string,
        currentNum: number,
        totalNum: number,

    }
}>()
const { data } = props;

</script>


<style scoped>
.card {
    width: 190px;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}

.banner {
    width: 100%;
    background-color: #000D16;
    text-align: center;
    position: relative;
}

.img-werewolf {
    height: 200px;
}

.flex-between {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.entry {
    width: 100%;
    color: rgba(255, 255, 255, 0.8);
    position: absolute;
    bottom: 0;
    padding: 3px 0;
    font-size: 12px;
    text-align: center;
    background-color: rgba(185, 187, 188, 0.6);

}
</style>