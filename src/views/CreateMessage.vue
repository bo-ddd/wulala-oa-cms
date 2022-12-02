<template>
  
    <el-form ref="ruleFormRef" :model="ruleForm" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
  
        
      <MyEditor v-model="ruleForm.desc"></MyEditor>
  
      <el-button class="submitBtn" type="danger" @click="createMessage">提交</el-button>
      
    </el-form>
  </template>
    
  <script lang="ts" setup>
  import { reactive, ref, } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import axios from '@/assets/api/api'
  import MyEditor from '@/components/MyEditor.vue'
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    desc: '',
    type: [],
  })
  //创建消息方法
  const createMessage = async function () {
    console.log(ruleForm.desc);
    
     if(ruleForm.desc == '<p><br></p>'){
        ElMessage.warning('内容不能为空')
     }else{
      await axios.createMessageApi({
          content: ruleForm.desc
        })
     }
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
      margin-top: 20px;
      margin-right: 200px;
      float: right;
  }
  </style>
    