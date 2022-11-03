<script lang="ts" setup>
import axios from '@/assets/api/api'
import { ref } from 'vue'
interface User {
  id: number
  userId: number
  reason: string
  startTime: string
  endTime: string
  leaveStatus: number
  auditStatus: number
}

function updateTime(time: Date) {
  let date = new Date(time);
  console.log(date);
  let year = date.getFullYear();
  let mounth = date.getMonth() + 1;
  let day = date.getUTCDate();
  let hour = date.getHours();
  // console.log(hour);  
  return `${ year }-${ mounth }-${ day }-${ hour }`;
}

let leave = ref();
//页面的条数
let pageSize = ref(10);
//总条数
let total = ref();
//总页数
let pageNum = ref(1);
//title
let title = ref();
const small = ref(false);
const disabled = ref(false);
const getLeaveListApi = async function () {
  let leaveData = await axios.getArticleListApi({
    pageSize: pageSize.value,
    pageNum: pageNum.value
  })
  total.value = leaveData.data.total;
  //渲染列表的数据
  leave.value = leaveData.data.list;
  title.value = leaveData.data.list[0].title
  console.log(title.value);
}
getLeaveListApi()


const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
  pageSize.value = val
  console.log(pageSize);
  getLeaveListApi()
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  pageNum.value = val
  getLeaveListApi()
}
</script>

<template>
    <h1 class="title">{{ title }}</h1>

  <el-table :data="leave" style="width: 100%">
    <el-table-column label="编号">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="姓名" >
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <div>{{ scope.row.avatarName }}的日报</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.avatarName }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="提交时间">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ updateTime(scope.row.createdAt) }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="日报内容">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </div>
      </template>
    </el-table-column>

  </el-table>

  <div class="demo-pagination-block">
    <el-pagination v-model:pageNum="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]" :small="small"
      :disabled="disabled" background layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>

</template>


<style scoped>
/* 标题与操作的居中样式 */
::v-deep .cell {
  text-align: center;
  width: 200px;
}
.box {
  height: 500px;
  background-color: aqua;
}
.el-pagination {
  position: fixed;
  bottom: 50px;
  right: 40%;
}
.title{
    margin: 20px;
}
</style>