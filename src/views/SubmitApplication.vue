<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
    status-icon>
     <el-form-item label="用户名称" prop="name">
      <el-input v-model="ruleForm.name" readonly="readonly" />
    </el-form-item>

    <!-- <div class="demo-datetime-picker">
      <div class="block">
        <span class="demonstration">开始时间</span>
        <el-date-picker v-model="ruleForm.date1" type="datetime" placeholder="选择开始时间" />
      </div>

      <div class="block">
        <span class="demonstration">结束时间</span>
        <el-date-picker v-model="ruleForm.date2" type="datetime" placeholder="选择结束时间" :shortcuts="shortcuts" />
      </div>
    </div> -->

    <div class="block">
      <el-form-item class="warp" label="用户名称" prop="name">
      <el-date-picker v-model="ruleForm.dateValue" type="datetimerange" range-separator="To" start-placeholder="开始时间"
        end-placeholder="结束时间" />
      </el-form-item>
    </div>

    <el-form-item label="请假理由" prop="desc">
      <el-input v-model="ruleForm.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
      <el-button @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from '@/assets/api/api'

const shortcuts = [
  {
    text: 'Today',
    value: new Date(),
  },
  {
    text: 'Yesterday',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: 'A week ago',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      return date
    },
  },
]

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

const getsunmit = async () => {
  let userId = await axios.queryUserInfoApi({});
  ruleForm.id = userId.data.userId
  ruleForm.name = userId.data.avatarName
}
getsunmit()
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!');
      alert("提交成功")
      let userInfo = await axios.createLeaveApi({
        userId: ruleForm.id,
        reason: ruleForm.desc,
        startTime: ruleForm.dateValue[0],
        endTime: ruleForm.dateValue[1],
      });
      formEl.resetFields()
    } else {
      // console.log('error submit!', fields)
      alert('提交错误')
      formEl.resetFields()
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>
<style scoped>
.text-center {
  text-align: center;
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
  margin-left:0px ;
  margin-bottom: 20px;
}
.warp{
  width: 40%;
}
</style>
