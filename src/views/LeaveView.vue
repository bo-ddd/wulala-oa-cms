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
  // console.log(index + 1, row)
  let status = await axios.getLeaveListApi({})
  status.data.list[0].auditStatus = 1
}

const getList = (index: number, row: User) => {
  console.log(row.startTime);
}

const handleDelete = (index: number, row: User) => {
  // console.log(index + 1, row)
  row.auditStatus = 2;
}

let leave = ref();
//页面的条数
let pageSize = ref();
//总条数
let total = ref();
//总页数
let pageNum = ref();
(async function () {
  let leaveData = await axios.getLeaveListApi({})
  //页面的条数
  pageSize.value = leaveData.data.pageSize
  //总条数
  total.value = leaveData.data.total
  //总页数
  pageNum.value = leaveData.data.pageNum
  leave.value = leaveData.data.list
  leave.value[0].startTime
  console.log(pageNum.value);
  
})()

</script>

<template>
  <el-table :data="leave" style="width: 100%">

    <el-table-column label="编号" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="申请人" width="100">
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
          <span style="margin-left: 10px">{{ scope.row.startTime.split('T')[0] }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="结束时间">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.endTime.split('T')[0] }}</span>
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
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">通过</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row),
        getList(scope.$index,scope.row)">不通过</el-button>
      </template>
    </el-table-column>

    
  </el-table>

  <el-pagination
    background
    layout="prev, pager, next"
    :total="total"
    :hide-on-single-page="false"
    v-model:page-size="pageSize"
    :page-count:="pageNum"
  />
    
</template>


<style scoped>
/* 标题与操作的居中样式 */
::v-deep .cell {
  text-align: center;
}
.box{
  height: 500px;
  background-color: aqua;
}
.el-pagination{
  position:fixed;
  bottom: 50px;
  right: 40%;
}
</style>