<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue'
import { getLeaveListApi } from '@/assets/api/api'
let route = useRoute()
let myId = route.query.id;
let leave = ref<any>();
let total = ref<number>();

getMyLeaveListApi()

async function getMyLeaveListApi () {
    let DetailData = await getLeaveListApi({})
    total.value = DetailData.data.total;
    //渲染列表的数据
    let dailyDetail = await getLeaveListApi({
        pageSize: total.value
    })
    leave.value = dailyDetail.data.list
}
function updateTime(time: Date) {
    let date = new Date(time);
    let year = date.getFullYear();
    let mounth = date.getMonth() + 1;
    let day = date.getUTCDate();
    return `${year}-${mounth}-${day}`;
}
</script>

<template>

    <div class="body"> 
        <div class="content">
            <div class="clearfix" v-for="item in leave">

                <template v-if="item.id == myId">
                    <h3>姓名：{{ item.userInfo.avatarName }}</h3>
                    <p class="state">开始时间：<span class="strong"> {{ updateTime(item.startTime) }} </span></p>
                    <p class="state">结束时间：<span class="strong"> {{ updateTime(item.endTime) }} </span>  </p>

                    <div class="state"
                        v-if="item.leaveStatus == 0">
                        <span>休假状态: <span class="strong">未开始</span> </span>
                    </div>

                    <div class="state"
                        v-if="item.leaveStatus == 1">
                        <span class="strong">休假状态: <span class="strong">已开始</span></span>
                    </div>

                    <div class="state"
                        v-if="item.leaveStatus == 2">
                        <span class="strong">休假状态: <span class="strong">已结束</span></span>
                    </div>

                    <div class="state">
                        <span>联系方式：<span class="strong"> {{ item.userInfo.phoneNumber }} </span></span>
                    </div>

                    <p class="deeppink">请假原因：</p>
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
    font-weight: 700;
    margin-top: 20px;
}
.strong{
    font-weight: 700;
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
    width: 400px;
    padding: 30px;
    border-radius: 10px;
    background-color: rgba(236, 236, 236, 0.9);
    transition: all 1.0s;
}

.content:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.52);
}



.cc {
    height: 300px;
    margin-top: 10px;
    margin-left: 10px;
    color: #1F2023;
}
</style>