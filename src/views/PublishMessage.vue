<template>

  <div style="display: inline-block" class="mb-10">
    <span class="label">请选择组 : </span>
    <el-select v-model="deptValue" clearable placeholder="所在分组" size="small" @change="changeMembers">
      <el-option v-for="(group, index) in deptList" :key="index" :label="group.name" :value="group.id" />
    </el-select>
   <span class="label ml-20">接收人 : </span> 
    <el-select v-model="deptMembersValue" multiple placeholder="谁接收消息" style="width: 240px" @change="receiveMessages"
      size="small" class="ml-10">
      <el-option v-for="(item, index) in deptMembersList" :key="index" :label="item.avatarName" :value="item.userId" />
    </el-select>
  </div>

  <el-table :data="message" style="width: 100%" fit>

    <el-table-column label="ID" width="60">
      <template #default="scope">
        <div>
          <span>{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="创建人">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top">
          <template #default>
            <div>申请人: {{ scope.row.avatarName }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.avatarName }}</el-tag>
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
          <el-link type="primary" @click="sendMessage(scope.row)">发送消息</el-link>
          <el-link type="warning" @click="(dialogTableVisible = true, thisRow(scope.row))">
            修改消息
          </el-link>

        </div>
      </template>
    </el-table-column>
  </el-table>

  <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" status-icon>
    <el-dialog class="parent" v-model="dialogTableVisible" title="修改消息">
      <MyEditor v-model="ruleForm.desc"></MyEditor>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="modifyMessage">
            确认修改
          </el-button>
          <el-button @click="dialogTableVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </el-form>

  <div class="demo-pagination-block">
    <el-pagination v-model:pageNum="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20, 25, 30]"
      :small="small" :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" class="mt-20" />
  </div>

  <AffixTip class="mt-20"></AffixTip>

</template>
  
<script lang="ts" setup>
import { reactive, ref, } from 'vue'
import type { DeptMember } from "../types/Dept";
import axios from '@/assets/api/api'
import { usePageSizeOptionsStore } from '@/stores/tools'
import { storeToRefs } from "pinia";
import MyEditor from '@/components/MyEditor.vue';
import type { Message } from '@/types/Message'
const pageSizeOptionsStore = usePageSizeOptionsStore()
pageSizeOptionsStore.getStorageStatus()
const { defaultValue } = storeToRefs(pageSizeOptionsStore)

const deptMembersValue = ref([])
const deptValue = ref([])
let deptList = reactive<any>([])
let deptMembersList = reactive<DeptMember[]>([])
let deptId = ref(0)
let message = ref([])
let messageMember = ref([])
//页面的条数
let pageSize = ref(10);
//总页数
let pageNum = ref(1);
//总条数
let total = ref<number>();
const small = ref(false);
const disabled = ref(false);
const ruleForm = reactive({
  msgId: 0,
  desc: '',
  type: [],
})

// 从pinio中拿到用户设置的默认值;
if (defaultValue.value) {
  pageSize.value = defaultValue.value
}

//弹窗
const dialogTableVisible = ref(false)

getUserDeptList()
myMessageList()

function updateTime(time: Date) {
  let date = new Date(time);
  let year = date.getFullYear();
  let mounth = date.getMonth() + 1;
  let day = date.getUTCDate();
  return `${year}-${mounth}-${day}`;
}
//获取用户所在哪个组
async function getUserDeptList() {
  let res = await axios.getDeptList({})
  console.log(res.data);
  
  if (res.status == 1) {
    res.data.forEach((dept: any) => {
      deptId.value = dept.deptId
    })
    deptList.push(...res.data)
  }
}
//查询当前组都有谁
const queryUserMembers = async function () {
  let res = await axios.queryUserMembersApi({
    deptId: deptId.value
  })
  if (res.status == 1) {
    deptMembersList.length = 0
    deptMembersList.push(...res.data)
  }
}
const changeMembers = function (val: number) {
  deptId.value = val
  queryUserMembers()
}
//发送消息方法
const sendMessage = function (row: Message) {
  const userIdArr: any[] = [];
  if (messageMember.value.length) {
    messageMember.value.forEach(item => {
      userIdArr.push(axios.sendMessageApi({
        userId: item,
        msgId: row.id
      }))
    })
  }
}
// 监听当前选择的收消息的人
const receiveMessages = function (val: any) {
  messageMember.value = val
}
//获取列表
async function myMessageList () {
  let messageList = await axios.queryMessageListApi({
    pageSize: pageSize.value,
    pageNum: pageNum.value,
  })
  total.value = messageList.data.total
  message.value = messageList.data.list
}
const handleSizeChange = (val: number) => {
  pageSize.value = val
  myMessageList()
}
const handleCurrentChange = (val: number) => {
  pageNum.value = val
  myMessageList()
}
const updateEditor = function (row: Message) {
  ruleForm.msgId = row.id
  ruleForm.desc = row.content
}
const thisRow = function (row: Message) {
  updateEditor(row)
}
const modifyMessage = async function () {
  await axios.updateMessageApi({
    id: ruleForm.msgId,
    content: ruleForm.desc
  })
  dialogTableVisible.value = false
  myMessageList()
}
</script>
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
.label{
  font-size: 14px;
}
</style>
  