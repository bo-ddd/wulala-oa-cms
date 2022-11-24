<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import axios from '@/assets/api/api'
let route = useRoute()
let myId = route.query.id;
let leave = ref();
let total = ref();
const getLeaveListApi = async function () {

    let DetailData = await axios.getLeaveListApi()
    total.value = DetailData.data.total;
    //渲染列表的数据
    let dailyDetail = await axios.getLeaveListApi({
        pageSize: total.value
    })
    leave.value = dailyDetail.data.list
}
function updateTime(time: Date) {
    let date = new Date(time);
    // console.log(date);
    let year = date.getFullYear();
    let mounth = date.getMonth() + 1;
    let day = date.getUTCDate();
    let hour = date.getHours();
    // console.log(hour);  
    return `${year}-${mounth}-${day}`;
}
getLeaveListApi()

</script>

<template>

    <div class="body">
        <div class="content">
            <div class="content_l clearfix" v-for="item in leave">

                <template v-if="item.id == myId">
                    <h3>{{ item.userInfo.avatarName }}</h3>
                    <p class="deeppink">开始时间： {{ updateTime(item.startTime) }} </p>
                    <p class="deeppink">结束时间： {{ updateTime(item.endTime) }} </p>
                    <div class="state"
                        v-if="item.leaveStatus == 0">
                        <span>休假状态:未开始</span>
                    </div>

                    <div class="state"
                        v-if="item.leaveStatus == 1">
                        <span>休假状态:已开始</span>
                    </div>

                    <div class="state"
                        v-if="item.leaveStatus == 2">
                        <span>休假状态:已结束</span>
                    </div>
                    <div class="state">
                        <span>联系方式：{{ item.userInfo.phoneNumber }}</span>
                    </div>
                    <p class="deeppink">请假原因如下</p>
                    <p class="cc">{{ item.reason }}</p>
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
.state{
margin: 10px 0;
}
.deeppink{
    color: deeppink;
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
    font-weight: 700;
}

.deeppink {
    color: deeppink;
}
</style>