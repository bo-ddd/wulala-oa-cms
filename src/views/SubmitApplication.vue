<template>
  <h1>请假申请</h1>
  <div class="flex">
    <div class="m-0-auto">

      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="ruleForm.name" readonly="readonly" />
      </el-form-item>
      
      <div class="block">
        <el-form-item class="warp" label="用户名称" prop="name">
          <el-date-picker v-model="ruleForm.dateValue" type="datetimerange" range-separator="To" start-placeholder="开始时间"
        end-placeholder="结束时间" />
      </el-form-item>
    </div>
    
    <el-form-item class="block" label="请假理由" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
    </el-form-item>
  </el-form>
</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { queryUserInfoApi,createLeaveApi } from '@/assets/api/api'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  id: '',
  dateValue: '',
  type: [],
  desc: '',
})
const rules = reactive<FormRules>({
  date1: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: '请假理由不能为空！！！', trigger: 'blur' },
  ],
});


getsunmit()

async function getsunmit (){
  let userId = await queryUserInfoApi({});
  ruleForm.id = userId.data.userId
  ruleForm.name = userId.data.avatarName
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!');
      alert("提交成功")
       await createLeaveApi({
        userId: ruleForm.id,
        reason: ruleForm.desc,
        startTime: ruleForm.dateValue[0],
        endTime: ruleForm.dateValue[1],
      });
      formEl.resetFields()
    } else {
      alert('提交错误')
      formEl.resetFields()
    }
  })
}
</script>
<style scoped>
:deep(.el-form){
  width: 1000px;
}
.el-input {
  width: 60%;
}
.el-textarea {
  width: 60%;
}
:deep(.el-textarea__inner) {
  height: 300px;
}
.block{
  margin: 30px 0;
}
.warp{
  width: 40%;
}
.m-0-auto{
  width: 800px;
  margin: 0 auto;
}
.flex{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
