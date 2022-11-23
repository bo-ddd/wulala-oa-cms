<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '../assets/api/api'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  department: '',
  post: '',
  applicationTime: '',
  duration: '',
  quitType: '主动离职',
  reason: '',
  enclosure: ''
})
const rules = reactive<FormRules>({
  duration: [
    {
      required: true,
      message: '请选择一个时间',
      trigger: 'blur'
    }
  ],
  reason: [
    {
      required: true,
      message: '离职原因不能为空',
      trigger: 'change'
    }
  ]
})
//处理时间戳=>YY-MM-DD;
const formatDate = (time: Date | string) => {
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
const userId = ref<number>()
const getUserInfo = async () => {
  let userInfo = await axios.queryUserInfoApi();
  ruleForm.name = userInfo.data.avatarName;
  ruleForm.post = userInfo.data.roles[0].roleName;
  userId.value = userInfo.data.userId as number;
  getUserDeptList(userId.value)
}
getUserInfo()


//获取当前用户的所在部门列表;//暂时还不能用;
const getUserDeptList = async (userId: number) => {
  let userDeptList = await axios.getUserDeptListApi({ userId });
  ruleForm.department = userDeptList.data[0].deptName;
}


//离职类型;
const quitType = ['主动离职', '被动离职'];


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      //确认消息弹出框
      ElMessageBox.confirm(
        '您确定提交离职申请吗？',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async () => {
          //调用提交接口;
          let quitTime = formatDate(ruleForm.duration[1]);
          await axios.userQuitApplyApi({
            userId: userId.value,
            quitTime,
            reason: ruleForm.reason,
            enclosure: ruleForm.enclosure
          }).then(res => {
            ElMessage({
              type: 'success',
              message: '提交成功',
            })
          }, error => {
            ElMessage.error('提交失败')
          })
          //跳转到离职列表页面;
          router.push('dimissionList')
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消申请',
          })
        })
    } else {
      ElMessage.error('提交失败')
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
//上传附件;
const fileList = ref<UploadUserFile[]>([])

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `您选择了${files.length} 文件，已超过最大上传数量`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `确定取消上传 ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const handleSuccessUpload = (response: any) => {
  ruleForm.enclosure = response.data.url
}

</script>

<template>
  <div class="form">
    <h3>离职申请</h3>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" size="small"
      class="demo-ruleForm mt-24" hide-required-asterisk>
      <template class="grid">
        <el-form-item label="姓名">
          <el-input v-model="ruleForm.name" disabled />
        </el-form-item>
        <el-form-item label="申请时间">
          <el-date-picker v-model="ruleForm.applicationTime" type="date" placeholder="" disabled />
        </el-form-item>
        <el-form-item label="所在部门">
          <el-input v-model="ruleForm.department" disabled />
        </el-form-item>
        <el-form-item label="所在职位">
          <el-input v-model="ruleForm.post" disabled />
        </el-form-item>
      </template>
      <el-form-item label="任职时间" prop="duration" required>
        <el-date-picker v-model="ruleForm.duration" type="daterange" range-separator="至" start-placeholder="入职日期"
          end-placeholder="离职日期" />
      </el-form-item>
      <el-form-item label="离职类型">
        <el-select v-model="ruleForm.quitType" class="m-2" placeholder="Select">
          <el-option v-for="item in quitType" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="离职原因" prop="reason" required>
        <el-input v-model="ruleForm.reason" type="textarea" resize='none' />
      </el-form-item>

      <el-form-item label="附件">
        <el-upload v-model:file-list="fileList" class="upload-demo" multiple 
          action="/api/upload/enclosure"  :before-remove="beforeRemove" :limit="1"
          :on-exceed="handleExceed" :on-success="handleSuccessUpload">
          <el-button type="danger">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png 格式文件不能超过 500KB
            </div>
          </template>
        </el-upload>
      </el-form-item>

      <el-form-item class="mt-20">
        <el-button type="danger" @click="submitForm(ruleFormRef)">提交申请</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
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

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.el-upload__tip {
  color: rgb(155, 151, 151)
}
</style>