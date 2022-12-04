<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from '@/assets/api/api'

import { usePageSizeOptionsStore } from '@/stores/tools'
import { storeToRefs } from "pinia";
import type { received } from '@/types/Message'
const pageSizeOptionsStore = usePageSizeOptionsStore()
pageSizeOptionsStore.getStorageStatus()
const { defaultValue } = storeToRefs(pageSizeOptionsStore)
const centerDialogVisible = ref(false)

let pageNum = ref<number>()
let pageSize = ref<number>()
let total = ref<number>();
let getUserMessageList = ref()

const small = ref(false);
const disabled = ref(false);
const ruleForm = reactive({
    id : 0,
    content: '',
    type: [],
    senderAvatarName : '',
    createdAt : '',
    updatedAt : '' 
  })

// 从pinio中拿到用户设置的默认值;
if (defaultValue.value) {
    pageSize.value = defaultValue.value
}

getUserMessage()

function updateTime(time: any) {
  let date = new Date(time);
  let year = date.getFullYear();
  let mounth = date.getMonth() + 1;
  let day = date.getUTCDate();
  return `${year}-${mounth}-${day}`;
}

async function getUserMessage () {
   let myMessage = await axios.getUserMessageApi({
    pageNum : pageNum.value,
    pageSize : pageSize.value
   })
   total.value = myMessage.data.total
   getUserMessageList.value = myMessage.data.list
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  getUserMessage()
}
const handleCurrentChange = (val: number) => {
  pageNum.value = val
  getUserMessage()
}

const updateEditor = function (row : received){
  ruleForm.id = row.id
  ruleForm.content = row.content
  ruleForm.senderAvatarName = row.senderAvatarName
  ruleForm.updatedAt = row.updatedAt
  ruleForm.createdAt = row.createdAt
}

const thisRow = function (row : received){
  updateEditor(row)
}
</script>

<template>

  <el-table :data="getUserMessageList" style="width: 100%" fit>

<el-table-column label="ID" width="60">
  <template #default="scope">
    <div>
      <span>{{ scope.row.id }}</span>
    </div>
  </template>
</el-table-column>

<el-table-column label="收件人">
  <template #default="scope">
    <el-popover effect="light" trigger="hover" placement="top">
      <template #default>
        <div>收件人: {{ scope.row.senderAvatarName }}</div>
      </template>
      <template #reference>
        <el-tag>{{ scope.row.senderAvatarName }}</el-tag>
      </template>
    </el-popover>
  </template>
</el-table-column>

<el-table-column label="创建时间">
  <template #default="scope">
    <div>
      <span>{{ updateTime(scope.row.createdAt) }}</span>
    </div>
  </template>
</el-table-column>

<el-table-column label="更新时间">
  <template #default="scope">
    <div>
      <span>{{ updateTime(scope.row.updatedAt) }}</span>
    </div>
  </template>
</el-table-column>

<el-table-column label="内容">
  <template #default="scope">
    <div>
      <span class="content" v-html="scope.row.content"></span>
    </div>
  </template>
</el-table-column>

<el-table-column label="操作">
  <template #default="scope">
    <div class="flex">
      <el-link type="success" @click="centerDialogVisible = true,thisRow(scope.row)">查看消息</el-link>
    </div>
  </template>
</el-table-column>
</el-table>
  
<el-dialog
    v-model="centerDialogVisible"
    title="内容详情"
    width="30%"
    align-center
  >
    <p class="warp">收件人 : {{ ruleForm.senderAvatarName }}</p>
    <p class="warp">收到时间 : {{ updateTime(ruleForm.createdAt) }}</p>
    <p class="warp">更新时间 : {{ updateTime(ruleForm.updatedAt) }}</p>
    <p class="warp">消息内容 : </p>
    <span class="ml-20 inline-block" v-html="ruleForm.content"></span><br>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">
          我知道了
        </el-button>
      </span>
    </template>
  </el-dialog>

  <div class="demo-pagination-block">
    <el-pagination v-model:pageNum="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20, 25, 30]" :small="small"
      :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" class="mt-20"/>
  </div>

  <AffixTip class="mt-20"></AffixTip>

</template>
 
<style scoped>
:deep(.cell) {
  text-align: center;
}
.content {
  text-overflow: ellipsis;
  white-space: noWrap;
  overflow: hidden;
}
.flex {
  display: flex;
  justify-content: space-around;
}
.warp{
  margin: 10px 0;
}
.inline-block{
  display: inline-block;
}
</style>