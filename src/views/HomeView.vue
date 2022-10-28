<!-- 当月任务共计  谁最优秀 最拉跨 谁罚钱 内部活动  班费赞助排行榜  称谓系统-->

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';

//班费排行榜;

onMounted(() => {
  type EChartsOption = echarts.EChartsOption;
  let myChart = echarts.init(document.getElementById('fund')!);

  let option: EChartsOption = {
    title: {
      text: '呜啦啦基金会',
      subtext: '贡献占比',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '呜啦啦基金会贡献占比',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 150, name: '魏浩爽' },
          { value: 55, name: '李展鹏' },
          { value: 20, name: '朱鑫鹏' },
          { value: 20, name: '申少杰' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);


})


</script>

<template>


  <div class="box">
    <el-row :gutter="50">
      <el-col :span="16">
        <div class="grid-content ep-bg-purple cyan">
           <!-- 轮播图 -->
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple grid-fund">
          <!-- 班费扇形图 -->
          <div id="fund" class="pt-20"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="grid-content ep-bg-purple green"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple color1 "></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content ep-bg-purple color2"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content ep-bg-purple color3"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content ep-bg-purple color4"></div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content ep-bg-purple color5"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content ep-bg-purple color6"></div>
      </el-col>
    </el-row>
  </div>



</template>

<style scoped>
.grid-content {
  border-radius: 4px;
  /* min-height: 36px; */
  height: 100%;
}

/* 设置呜啦啦基金会扇形图的尺寸 */
#fund {
  min-height: 300px;
  min-width: 400px;
}

/* 轮播图 */
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

</style>
