<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import axios from '@/assets/api/api'
let route = useRoute()
console.log(route);
let myId = route.query.id;
let leave = ref();
let total = ref();
const getLeaveListApi = async function () {
    
    let DetailData = await axios.getArticleListApi()
    total.value = DetailData.data.total;
    //渲染列表的数据
    let dailyDetail = await axios.getArticleListApi({
        pageSize:total.value
    })
    leave.value = dailyDetail.data.list
}
getLeaveListApi()

</script>

<template>

    <div class="body">
        <div class="content">
            <div class="content_l clearfix" v-for="item in leave">

                <template v-if="item.id == myId">
                    <h3> {{ item.title }} </h3>
                    <p class="deeppink">{{ item.avatarName }}</p>
                    <p class="cc">{{ item.content }}</p>
                </template>

            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

h3 {
    margin: 20px 0;
}

.body {
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: url(@/assets/images/6a947018821f45f9119b6cfd3cd88bad.png) no-repeat;
    background-size: 100%;
}

.content {
    width: 600px;
    padding: 10px;
    border-radius: 10px;
    background-color: rgba(236, 236, 236, 0.59);
    transition: all 1.0s;
}

.content:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.52);
}

.content_l {
    text-align: center;
}

.cc {
    height: 300px;
    margin: 0 auto;
    margin-top: 10px;
    color: #1F2023;
    font-size: 18px;
}

.deeppink {
    color: deeppink;
}
</style>