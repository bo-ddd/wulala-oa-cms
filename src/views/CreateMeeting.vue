<script setup lang="ts">
import {ref } from "vue";
import { MoreFilled } from '@element-plus/icons-vue'
const dateValue = ref(new Date())
const startTime = ref('')
const endTime = ref('')
const activities = [
  {
    content: 'Custom icon',
    timestamp: '2018-04-12 20:46',
    size: 'large',
    type: 'primary',
    icon: MoreFilled,
  },
  {
    content: 'Custom color',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: 'Custom size',
    timestamp: '2018-04-03 20:46',
    size: 'large',
  },
  {
    content: 'Custom hollow',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    hollow: true,
  },
  {
    content: 'Default node',
    timestamp: '2018-04-03 20:46',
  },
]
</script>

<template>
    <h2> 会议室</h2>
    <div class="meeting-room flex-center mb-20">
        <div class="metting-scrool">
            <div class="meting-item">
                <h3>第一会议室</h3>
                <div>办公楼204，座位数15</div>
                <el-button type="danger"  class="mt-10" round>选择</el-button>
            </div>
            <div class="meting-item">
                <h3>第二会议室</h3>
                <div>办公楼206，座位数25</div>
                <el-button type="danger"  class="mt-10" round>选择</el-button>
            </div>
            <div class="meting-item">
                <h3>第三会议室</h3>
                <div>办公楼208，座位数40</div>
                <el-button type="danger"  class="mt-10" round>选择</el-button>
            </div>
            <div class="meting-item">
                <h3>第四会议室</h3>
                <div>办公楼208，座位数60</div>
                <el-button type="danger"  class="mt-10" round>选择</el-button>
            </div>
            <div class="meting-item">
                <h3>大会堂</h3>
                <div>办公楼208，座位数300</div>
                <el-button type="danger"  class="mt-10" round>选择</el-button>
            </div>
        </div>
    </div>
<div class="main">
    <div class="date">
        <el-calendar v-model="dateValue" />
    </div>
        <div class="demo-time-range">
    <el-time-select
      v-model="startTime"
      :max-time="endTime"
      class="mr-4"
      placeholder="Start time"
      start="09:0"
      step="00:30"
      end="19:00"
    />
    <el-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="End time"
      start="09:30"
      step="00:30"
      end="19:00"
    />
    </div>
</div>
    <!-- <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :hollow="activity.hollow"
      :timestamp="activity.timestamp"
    >
      {{ activity.content }}
    </el-timeline-item>
  </el-timeline> -->
</template>

<style scoped>
h2{
    text-align: center;
    margin-bottom: 10px;
}
.flex-center{
    display: flex;
}
.metting-scrool {
    display: flex;
    overflow-x: scroll;
    width: 1100px;
    height: 165px;
    padding: 10px 20px;
    box-sizing: border-box;
}
.meting-item{
    border-radius: 20px;
   text-align: center;
    width: 230px;
    background-color: rgb(245, 238, 238);
    margin: 0 10px;
    flex-shrink: 0;
    padding: 20px;
    box-sizing: border-box;
}
.main{
    display: flex;
}
.date{
    width: 500px;
    height: 400px;
}
.el-calendar{
    --el-calendar-cell-width:55px;
}
</style> 