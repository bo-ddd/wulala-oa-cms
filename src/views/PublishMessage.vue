<template>

  <div style="display: inline-block" class="mb-10">
    <el-select v-model="deptValue" clearable placeholder="所在分组" size="small" @change="changeMembers">
      <el-option v-for="(group, index) in deptList" :key="index" :label="group.deptName" :value="group.deptId" />
    </el-select>
    <el-select v-model="deptMembersValue" multiple placeholder="谁接收消息" style="width: 240px" size="small" class="ml-10">
      <el-option v-for="(item, index) in deptMembersList" :key="index" :label="item.avatarName" :value="item.userId" />
    </el-select>
    <!-- <el-button class="submitBtn" type="danger" size="small" @click="submitForm(ruleFormRef)">发送消息</el-button> -->
  </div>

  <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>

    <MyEditor v-model="ruleForm.desc"></MyEditor>

    <el-button class="submitBtn" type="danger" @click="createMessage()">提交</el-button>
  </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, } from 'vue'
import type { FormInstance } from 'element-plus'
import type { Dept, DeptMember } from "../types/Dept";
import { useStore } from "@/stores/nav";
import axios from '@/assets/api/api'
import MyEditor from '@/components/MyEditor.vue'
const deptMembersValue = ref([])
const deptValue = ref([])
let deptList = reactive<Dept[]>([])
let deptMembersList = reactive<DeptMember[]>([])
let deptId = ref(0)
let UserStore = useStore()
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  desc: '',
  type: [],
})

//获取用户所在哪个组
const getUserDeptList = async function () {
  let res = await axios.getUserDeptListApi({
    userId: UserStore.userId
  })
  
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
    deptMembersList.push(...res.data)
  }
}

const changeMembers = function (val: number) {
  deptId.value = val
  queryUserMembers()
}
getUserDeptList()

//创建消息方法
const createMessage = async function () {
  let a = await axios.createMessageApi({
        content: ruleForm.desc
      })
      console.log(a);
}
//发送消息方法
const sendMessage = async function () {
  let sendMessage = await axios.sendMessageApi({})
  console.log(sendMessage);
}

const asd = async function () {
  let a = await axios.queryMessageListApi({})
  console.log(a);
}
asd()
</script>
<style scoped>
.demo-datetime-picker .block {
  padding: 30px 0;
  width: 900px;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-datetime-picker .block:last-child {
  border-right: none;
}

.demo-datetime-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.submitBtn{
    margin-left: 20px;
}
</style>
  