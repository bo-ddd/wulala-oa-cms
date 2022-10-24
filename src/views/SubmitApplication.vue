<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item label="Activity name" prop="name">
      <el-input v-model="ruleForm.name" readonly=“readonly” />
    </el-form-item>
   
    <el-form-item label="请假时间">
      <el-col :span="11">
        <el-date-picker
          v-model="ruleForm.date1"
          type="date"
          placeholder="开始时间"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-date-picker
          v-model="ruleForm.date2"
          type="date"
          placeholder="结束时间"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
   
    <el-form-item label="Activity form" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Create</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from '@/assets/api/api'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  name: '',
  date1: '',
  date2: '',
  type: [],
  desc: '',
})

const rules = reactive<FormRules>({
  // name: [
  //   { required: true, message: 'Please input Activity name', trigger: 'blur' },
  //   { min: 1, max: 3, message: 'Length should be 3 to 5', trigger: 'blur' },
  // ],
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
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
});

(async function(){
let userId = await axios.queryUserInfoApi({});
ruleForm.name = userId.data.userId
})();

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
   formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!');
      let userInfo = await axios.createLeaveApi({
        userId : ruleForm.name,
        reason : ruleForm.desc,
        startTime : ruleForm.date1,
        endTime : ruleForm.date2,
      });
      console.log(userInfo.data.userId);
      
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>
<style scoped>
.text-center{
  text-align: center;
}
</style>
