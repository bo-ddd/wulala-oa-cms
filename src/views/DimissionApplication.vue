<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '../assets/api/api'
import type { FormInstance, FormRules } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue';
const active=ref<number>(0)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  id: 0,
  name: '',
  department: '',
  post: '',
  applicationTime: '',
  duration: '',
  quitType: '主动离职',
  desc: ''
})
const rules = reactive<FormRules>({
  duration: [
    {
      required: true,
      message: '请选择一个时间',
      trigger: 'blur'
    }
  ],
  desc: [
    {
      required: true,
      message: '离职原因不能为空',
      trigger: 'change'
    }
  ]
})
//处理时间戳=>YY-MM-DD;
const formatDate = (time: Date) => {
  let year = new Date(time).getFullYear();
  let month = new Date(time).getMonth() + 1;
  let date = new Date(time).getDate();
  let months = month >= 10 ? month : '0' + month;
  let dates = date >= 10 ? date : '0' + date;
  return year + '-' + months + '-' + dates;
}
//申请时间;
ruleForm.applicationTime = formatDate(new Date());

//获取当前用户的信息, 部门/职位;
const getUserInfo = async () => {
  let userInfo = await axios.queryUserInfoApi();
  ruleForm.id = userInfo.data.userId;
  ruleForm.name = userInfo.data.avatarName;
  ruleForm.post = userInfo.data.roles[0].roleName;
}
getUserInfo()


//获取当前用户的所在部门列表;//暂时还不能用;
const getUserDeptList = async () => {
  let userDeptList = await axios.getUserDeptListApi({ userId: 152 });
  ruleForm.department = userDeptList.data[0].deptName;
}
getUserDeptList()


//离职类型;
const quitType = ['主动离职', '被动离职'];


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //控制步骤条;
      active.value=1
    } else {
      console.log('提交失败')
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-steps :active="active" finish-status="success" align-center class="mt-20 mb-20">
    <el-step title="填写申请" />
    <el-step title="审批结果" />
    <el-step title="离职交接" />
  </el-steps>
  <div class="form" v-if="active == 0">
    <h3>离职申请</h3>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" size="small"
      class="demo-ruleForm mt-24" hide-required-asterisk>
      <el-form-item label="用户ID">
        <el-input v-model="ruleForm.id" disabled />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="ruleForm.name" disabled />
      </el-form-item>
      <el-form-item label="所在部门">
        <el-input v-model="ruleForm.department" disabled />
      </el-form-item>
      <el-form-item label="所在职位">
        <el-input v-model="ruleForm.post" disabled />
      </el-form-item>
      <el-form-item label="申请时间">
        <el-date-picker v-model="ruleForm.applicationTime" type="date" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="任职时间" prop="duration" required>
        <el-date-picker v-model="ruleForm.duration" type="daterange" range-separator="至" start-placeholder="入职日期"
          end-placeholder="离职日期" />
      </el-form-item>
      <el-form-item label="离职类型">
        <el-select v-model="ruleForm.quitType" class="m-2" placeholder="Select">
          <el-option v-for="item in quitType" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="离职原因" prop="desc" required>
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="附件">
        <el-upload class="upload-demo" drag action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple>
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            拖拽上传 <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="danger" @click="submitForm(ruleFormRef)">提交申请</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="process" v-if="active == 1">
   
  </div>
</template>



<style scoped>
.form {
  width: 80%;
  margin: 0 auto;
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
}

:deep(.el-input) {
  width: 120px
}

:deep(.el-input__wrapper) {
  flex-grow: 0
}

:deep(.el-textarea__inner) {
  width: 400px
}
</style>