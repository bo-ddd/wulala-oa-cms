<script lang="ts" setup>
import axios from '@/assets/api/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: number
  avatarName: string
  content: string
  createdAt: string
  title: string
  userId: number
  userName: string
}

function updateTime(time: Date) {
  let date = new Date(time);
  let year = date.getFullYear();
  let mounth = date.getMonth() + 1;
  let day = date.getUTCDate();
  let hour = date.getHours();
  // console.log(hour);  
  return `${ year }-${ mounth }-${ day }`;
}
let router = useRouter()
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
}
getLeaveListApi()

const handleSizeChange = (val: number) => {
  pageSize.value = val
  getLeaveListApi()
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  pageNum.value = val
  getLeaveListApi()
}

const handleEdit = async (row: User,id :number) => {
  console.log(row);
  router.push({
    name:'dailyDetail',
    query:{
      id
    }
  })
}

let value2 = ref('');
function fn(val : any){
  console.log(val);
}
</script>

<template>
    <h1 class="title">{{ title }}</h1>
    
    <div class="block">
      <el-date-picker
        v-model="value2"
        type="date"
        placeholder="选择日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        @change="fn(value2)"
      />
    </div>

  <el-table :data="leave" style="width: 100%" >
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

    <el-table-column label="操作">
      <template #default="scope">
        <div class="btn">
          <el-button size="small" @click="handleEdit(scope.row,scope.row.id)">查看详情</el-button>
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
:deep(.cell) {
  text-align: center;
  width: 200px;
}
:deep(.cell span){
  text-overflow:ellipsis ;
  white-space: noWrap;
  overflow: hidden;
}
.box{
  height: 500px;
  background-color: aqua;
}
.title{
    margin: 20px;
}
.demo-date-picker{
  margin: 20px;
}
.time{
  display: inline-block;
  margin-right: 20px;
}
.block{
  margin: 20px;
}
.demo-pagination-block{
  margin: 20px 0;
}
</style>