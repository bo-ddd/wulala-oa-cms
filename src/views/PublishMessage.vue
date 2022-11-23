<template>

  <div style="display: inline-block" class="mb-10">
    <el-select v-model="deptValue" clearable placeholder="所在分组" size="small" @change="asd">
      <el-option v-for="(group, index) in deptList" :key="index" :label="group.deptName" :value="group.deptId" />
    </el-select>
    <el-select v-model="deptMembersValue" multiple placeholder="谁接收消息" style="width: 240px" size="small" class="ml-10">
      <el-option v-for="(item, index) in deptMembersList" :key="index" :label="item.avatarName" :value="item.userId" />
    </el-select>
    <!-- <el-button class="submitBtn" type="danger" size="small" @click="submitForm(ruleFormRef)">发送消息</el-button> -->
  </div>

  <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>

    <MyEditor v-model="ruleForm.desc"></MyEditor>

   
  </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
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
console.log(UserStore.userId);

//获取用户所在哪个组
const getUserDeptList = async function () {
  let res = await axios.getUserDeptListApi({
    userId: UserStore.userId
  })
  console.log("---------------------");
  
  
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

const asd = function (val: number) {
  deptId.value = val
  queryUserMembers()
}
getUserDeptList()

//创建消息方法
const createMessage = async function () {
  let createMessage = await axios.createMessageApi({
        content: ruleForm.desc
      })
}
//发送消息方法
const sendMessage = async function () {
  let sendMessage = await axios.sendMessageApi({})
}



// const submitForm = (formEl: FormInstance | undefined) => {
//   console.log(ruleForm.desc);
//   if (!formEl) return
//   formEl.validate(async (valid, fields) => {
//     if (valid) {
//       alert("提交成功")
//       let createArticle = await axios.createMessageApi({
//         content: ruleForm.desc
//       });
//     } else {
//       console.log('error submit!', fields)
//       alert('提交错误')
//       formEl.resetFields()
//     }
//   })
// }

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

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
  