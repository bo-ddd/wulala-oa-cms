<script lang="ts" setup>
import axios from '@/assets/api/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePageSizeOptionsStore } from '@/stores/tools'
import { storeToRefs } from "pinia";
import type { ExamineUserLeave } from '@/types/Leave'

const pageSizeOptionsStore = usePageSizeOptionsStore()
pageSizeOptionsStore.getStorageStatus()
const { defaultValue } = storeToRefs(pageSizeOptionsStore)
const router = useRouter()
let leave = ref<any>();
let pageSize = ref<number>();
let total = ref<number>();
let pageNum = ref(1);
const small = ref(false);
const disabled = ref(false);

getLeaveListApi()
// 从pinio中拿到用户设置的默认值;
if (defaultValue.value) {
    pageSize.value = defaultValue.value
}

 async function getLeaveListApi() {
  let leaveData = await axios.getLeaveListApi({
    pageSize: pageSize.value,
    pageNum: pageNum.value
  })
  total.value = leaveData.data.total;
  //渲染列表的数据
  leave.value = leaveData.data.list;
}

const handleEdit = async (index: number, row: ExamineUserLeave) => {
  let setStatus = await axios.examineUserLeaveApi({
    auditStatus: 1,
    id: row.id
  })
  getLeaveListApi()
}

const handleDelete = async (index: number, row: ExamineUserLeave) => {
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


const handleSizeChange = (val: number) => {
  pageSize.value = val
  getLeaveListApi()
}

const handleLeaveDetail = (index: number, row: ExamineUserLeave) => {
    router.push({
        name: 'leaveDetail',
        query: {
            id: row.id
        }
    })
}

const handleCurrentChange = (val: number) => {
  pageNum.value = val
  getLeaveListApi()
}

</script>

<template>
  <el-table :data="leave" style="width: 100%">

    <el-table-column label="ID" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span>{{ scope.row.userId }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="申请人" >
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
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
          <span>{{ updateTime(scope.row.startTime) }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="结束时间">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span>{{ updateTime(scope.row.endTime) }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="状态">
      <template #default="scope">
        
        <el-popover effect="light" trigger="hover" placement="top" v-if="scope.row.auditStatus == 0">
          <template #default>
            <div>状态：待审核</div>
          </template>
          <template #reference>
            <el-tag >待审核</el-tag>
          </template>
          
        </el-popover>
        

        <el-popover effect="light" trigger="hover" placement="top" v-if="scope.row.auditStatus == 1">
          <template #default>
            <div>状态：审核通过</div>
          </template>
          <template #reference>
            <el-tag type="success">审核通过</el-tag>
          </template>
        </el-popover>

        <el-popover effect="light" trigger="hover" placement="top"  v-if="scope.row.auditStatus == 2">
          <template #default>
            <div>状态：审核不通过</div>
          </template>
          <template #reference>
            <el-tag type="danger">审核不通过</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <div class="btn" v-if="scope.row.auditStatus == 0">
          <el-link type="success"  @click="handleEdit(scope.$index , scope.row)">通过</el-link>
          <el-link type="danger" @click="handleDelete(scope.$index , scope.row)">不通过</el-link>
          <el-link type="warning" @click="handleLeaveDetail(scope.$index, scope.row)">查看详情</el-link>
        </div>

        <div class="operation" v-else-if="scope.row.auditStatus == 1 || scope.row.auditStatus == 2">
          <el-link type="warning" @click="handleLeaveDetail(scope.$index, scope.row)">查看详情</el-link>
        </div>
      </template>
    </el-table-column>

  </el-table>

  <div class="demo-pagination-block">
    <el-pagination v-model:pageNum="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20, 25, 30]" :small="small"
      :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" class="mt-20"/>
  </div>

  <AffixTip class="mt-20"></AffixTip>

</template>


<style scoped>
/* 标题与操作的居中样式 */
:deep(.cell) {
  text-align: center;
}

.box {
  height: 500px;
  background-color: aqua;
}
.btn{
  display: flex;
  justify-content: space-evenly;
}
.m-10{
  margin: 10px 0;
}
</style>