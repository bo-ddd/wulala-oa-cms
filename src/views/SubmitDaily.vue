<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      · <el-form-item label="用户ID" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
  
      <div class="demo-datetime-picker">
        <div class="block">
          <span class="demonstration">提交时间</span>
          <el-date-picker v-model="nowTime" type="datetime" placeholder="提交时间" readonly="readonly" />
        </div>
      </div>
  
      <!-- <el-form-item label="提交内容" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item> -->

      <MyEditor></MyEditor>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import axios from '@/assets/api/api'
  import MyEditor from '@/components/MyEditor.vue'

  console.log(MyEditor);
  
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  let nowTime = new Date()
  const ruleForm = reactive({
    name: '',
    date1: '',
    date2: '',
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
  
  const getsunmit = async ()=>{
    let userId = await axios.queryUserInfoApi({});
    ruleForm.name = userId.data.avatarName
  }

 
  getsunmit()
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('submit!');
        alert("提交成功")
        let createArticle = await axios.createArticleApi({});
        console.log(createArticle);
        
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
  .el-input{
  width: 60%;
  }
  .el-textarea{
    width: 60%;
  }
  .demo-datetime-picker .block {
    padding: 30px 0;
    width: 900px;
    text-align: center;
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
  </style>
  