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


const handleEdit = async (index: number, row: User) => {
  let setStatus = await axios.examineUserLeaveApi({
    auditStatus: 1,
    id: row.id
  })
  getLeaveListApi()
}

const handleDelete = async (index: number, row: User) => {
  let setStatus = await axios.examineUserLeaveApi({
    auditStatus: 2,
    id: row.id
  })

  getLeaveListApi()
}
function updateTime(time: Date) {
  let date = new Date(time);
  // console.log(date);
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

const small = ref(false);
const disabled = ref(false);
const getLeaveListApi = async function () {
  let leaveData = await axios.getLeaveListApi({
    pageSize: pageSize.value,
    pageNum: pageNum.value
  })
  total.value = leaveData.data.total;
  //渲染列表的数据
  leave.value = leaveData.data.list;
}
getLeaveListApi()

let date = (startTime1 : number , endTime1 : number) =>{
  let starTime = new Date(startTime1).getTime()
  let endTime = new Date(endTime1).getTime()
  let timeStamp = endTime - starTime
  // let duration = timeStamp/1000/60/60%24
  return timeStamp/1000/60/60/24*24;
  
};

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
  <el-table :data="leave" style="width: 100%">

    <el-table-column label="编号">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.userId }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="申请人">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>申请人: {{ scope.row.userInfo.avatarName }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.userInfo.avatarName }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="开始时间">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ updateTime(scope.row.startTime) }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="结束时间">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ updateTime(scope.row.endTime) }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="时长">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ date(scope.row.startTime,scope.row.endTime) }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="休假状态">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;" v-if="scope.row.leaveStatus == 0">
          <span style="margin-left: 10px">未开始</span>
        </div>

        <div style="display: flex; align-items: center;justify-content: center;" v-if="scope.row.leaveStatus == 1">
          <span style="margin-left: 10px">已开始</span>
        </div>

        <div style="display: flex; align-items: center;justify-content: center;" v-if="scope.row.leaveStatus == 2">
          <span style="margin-left: 10px">已结束</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="请假原因">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.reason }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="状态">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;" v-if="scope.row.auditStatus == 0">
          <span style="margin-left: 10px">待审核</span>
        </div>

        <div style="display: flex; align-items: center;justify-content: center;" v-if="scope.row.auditStatus == 1">
          <span style="margin-left: 10px">审核通过</span>
        </div>

        <div style="display: flex; align-items: center;justify-content: center;" v-if="scope.row.auditStatus == 2">
          <span style="margin-left: 10px">审核不通过</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="联系方式">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.userInfo.phoneNumber }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <!-- <div class="btn" v-if="scope.row.auditStatus == 0"> -->
          <el-button size="small" @click="handleEdit(scope.$index , scope.row)">通过</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index , scope.row)">不通过</el-button>
        <!-- </div> -->

        <!-- <div v-else-if="scope.row.auditStatus == 1 || scope.row.auditStatus == 2">
          <span>已审核</span>
        </div> -->
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
::v-deep .cell{
  width: 150px;
}
</style>