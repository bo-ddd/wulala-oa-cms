<!-- 当月任务共计  谁最优秀 最拉跨 谁罚钱 内部活动  班费赞助排行榜  称谓系统-->

<script lang="ts" setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import { Check } from '@element-plus/icons-vue'
// 进度条组件自带方法;

const bannerList = [
  {
    id: 1,
    url: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.Oiy0ZhrBtSBpBjAkDAR7xAHaEo?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    id: 2,
    url: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.fFUMf4Nfh3EXVe7hA8No-QHaEo?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    id: 3,
    url: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.D25iBDGx4ddYgqmHZMqmRQHaEo?w=283&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    id: 4,
    url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.or2yOxvfgmQgKISOKZEFDQHaEo?w=240&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    id: 5,
    url: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.Nxv-KX874ocnv1CjVApVmwHaEo?w=279&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    id: 6,
    url: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.XQELBq9MyEiiRiSc8OoTwwHaEK?w=271&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  }
]

const cleanerList = [
  {
    id: 1,
    name: ["卫正阳", "马格烜"]
  },
  {
    id: 2,
    name: ["周永峰", "郝永祥"]
  },
  {
    id: 3,
    name: ["侯鑫茹", "朱江艳"]
  },
  {
    id: 4,
    name: ["刘伟博", "尚宇豪"]
  },
  {
    id: 5,
    name: ["宋巍", "申少杰"]
  },
  {
    id: 6,
    name: ["李展鹏", "魏浩爽"]
  },
  {
    id: 7,
    name: ["朱鑫鹏", "王鹏程"]
  }
]

const projectProgress = [
  {
    id: 1,
    name: '马超项目组',
    percentage: 20
  },
  {
    id: 2,
    name: '点餐项目组',
    percentage: 50
  },
  {
    id: 3,
    name: 'OA项目组',
    percentage: 70
  }
]

//员工综合评估排行榜;
const assessmentList = () => {
  type EChartsOption = echarts.EChartsOption;
  let myChart = echarts.init(document.getElementById('assessment')!);
  let option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        // Use axis to trigger tooltip
        type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
      }
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['侯鑫茹', '朱江艳', '尚宇豪', '卫正阳', '魏浩爽']
    },
    series: [
      {
        name: '工作态度',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [88, 88, 88, 89, 92, 92, 95]
      },
      {
        name: '专业技能',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [92, 92, 87, 82, 90, 92, 95]
      },
      {
        name: '绩效考核',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [75, 74, 73, 82, 90, 95, 97]
      },
      {
        name: '个人能力',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [75, 80, 86, 89, 92, 95, 95]
      },
      {
        name: '综合评价',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [74, 74, 81, 82, 85, 88, 86]
      }
    ]
  };
  option && myChart.setOption(option);
}
//基金贡献占比排行榜;
const contributionList = () => {
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

}
const newsList=[
  {
    id:1,
    text:'B端作品集就别用C端那套思路了',
  },
  {
    id:2,
    text:'中小企业最佳DevOps工具',
  },
  {
    id:3,
    text:'web3.0 会是下一代互联网的风口么？',
  },
  {
    id:4,
    text:'羊了个羊火爆全网，原来自己做个小游戏这么简单！',
  },
  {
    id:5,
    text:'你说你会Promise？那你解决一下项目中的这五个难题？',
  },
  {
    id:6,
    text:'刚工作三天就被裁是一种怎样的体验',
  },
  {
    id:7,
    text:'5年迭代5次，抖音推荐系统演进历程',
  },
  {
    id:8  ,
    text:'架构师的自我修养',
  }
]

onMounted(() => {
  contributionList(); //基金贡献占比排行榜;
  assessmentList(); //员工综合评估排行榜;
})


</script>

<template>


  <div class="box">
    <el-row :gutter="50">
      <el-col :span="16">
        <div class="grid-content ep-bg-purple">
          <!-- 轮播图 -->
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
              <img :src="item.url" style="width:100%">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="8">
        <!-- 项目进度条 -->
        <div class="grid-content progress-project">
          <h3>
            项目进展情况
          </h3>
          <div class="progress ep-bg-purple">
            <div v-for="item in projectProgress" :key="item.id">
              <!-- 项目完成的样式 -->
              <el-progress v-if="item.percentage == 100" type="circle" :percentage="100" status="success">
                <el-button type="success" :icon="Check" circle />
              </el-progress>
              <!-- 项目进行中的样式 -->
              <el-progress v-if="item.percentage != 100" type="dashboard" :percentage="item.percentage">
                <template #default="{ percentage }">
                  <span class="percentage-value">{{ percentage }}%</span>
                  <span class="percentage-label">{{ item.name }}</span>
                </template>
              </el-progress>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">

      <el-col :span="8">
        <!-- 班费扇形图 -->
        <div class="grid-content ep-bg-purple">
          <div id="fund"></div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content ep-bg-purple ">
          <div id="assessment"></div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="grid-content ep-bg-purple news">
          <!-- 呜啦啦资讯 -->
          <el-space wrap>
            <el-card class="box-card pl-10" style="width: 380px">
              <template #header>
                <div class="card-header">
                  <span>呜啦啦资讯</span>
                  <el-button class="button" text>查看更多</el-button>
                </div>
              </template>
              <div v-for="item in newsList" :key="item.id" class="text-item ">
                {{item.id+'. '+item.text}}
              </div>
            </el-card>
          </el-space>
        
        </div>
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
  box-sizing: border-box;
}

#assessment {
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

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

/* 进度条 */
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}

.progress-project {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}

.progress {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 资讯模块 */
.news{
  padding:5px;
  box-sizing: border-box;
}
.card-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card{
  transition: all 0.1s ease-in;
}

:deep(.el-card__header){
  padding:5px;
}
:deep(.el-card__body){
  padding:5px;
}
.text-item{
  padding:2px;
  text-overflow:ellipsis;
  white-space: noWrap;
  overflow: hidden;
  font-size:12px;
}
.text-item:hover{
  background-color: rgba(130, 128, 128, 0.1);
  transform: translate(1px, 1px);
}
.card-header .button{
  font-size:8px;
}
</style>
