<!-- 当月任务共计  谁最优秀 最拉跨 谁罚钱 内部活动  班费赞助排行榜  称谓系统-->
<script lang="ts" setup>
import * as echarts from 'echarts';
import {  ref, onMounted } from "vue";
const value = ref(new Date())
onMounted(() => {
  var myChart = echarts.init(<HTMLElement>document.getElementById('main'));
  // 绘制图表
  myChart.setOption({
    title: {
      text: '项目任务进度展示'
    },
    tooltip: {},
    xAxis: {
      data: ['夕阳红管理系统', '卡拉米点餐系统', '卡拉米点菜管理系统', '马超项目组',]
    },
    yAxis: {},
    series: [
      {
        name: '进度',
        type: 'bar',
        data: [5, 19, 12, 10,]
      }
    ]
  });
})

</script>

<template>
    <div class="calendar">
      <el-calendar v-model="value" />
    </div>
  
  <div id="main">
  </div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.box{
   display: flex;
}
#main {
  height: 300px;
}

.el-calendar {
  width: 40%;
  --el-calendar-cell-width: 35px;
}

.el-calendar-table {
  height: var(--el-calendar-cell-width);
}
.box{
   margin-bottom: 10px;
}
</style>
