<template>

<div style="display: inline-block" class="mb-10">
        <el-select v-model="deptValue" clearable placeholder="用户所在分组" size="small" @change="groupChange">
            <el-option v-for="(group, index) in deptList" :key="index" :label="group.deptName" :value="group.deptId" />
        </el-select>
        <el-select v-model="deptMembersValue" multiple placeholder="任务接收人" style="width: 240px" size="small" class="ml-10">
            <el-option v-for="(item, index) in deptMembersList" :key="index" :label="item.avatarName"
                :value="item.userId" />
        </el-select>
        <el-button type="danger" round class="ml-10" size="small" @click="clickPublishTask">确定发布</el-button>
    </div>

    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
  
      <div class="demo-datetime-picker">
        <div class="block">
          <span class="demonstration">提交时间</span>
          <el-date-picker v-model="ruleForm.date" type="datetime" placeholder="提交时间" readonly="readonly" />
        </div>
      </div>
  
      <MyEditor v-model="ruleForm.desc" ></MyEditor>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref,} from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import { useStore } from "@/stores/nav";
  import axios from '@/assets/api/api'
  import MyEditor from '@/components/MyEditor.vue'
  let deptList = ref([])
  let deptId = ref(0)
  let UserStore = useStore()
  const formSize = ref('default')
  const ruleFormRef = ref<FormInstance>()
  const ruleForm = reactive({
    id:'',
    name: '',
    desc: '',
    date: new Date(),
    type: [],
  })
  
  const getUserDeptList = async function () {
    let res = await axios.getUserDeptListApi({
        userId: UserStore.userId
    })
    if (res.status == 1) {
        res.data.forEach((dept: any) => {
            deptId.value=dept.deptId
        })
        console.log(deptId.value);  ///当前组id
        deptList.push(...res.data)
    }
}

  // let year = ruleForm.date.getFullYear();
  // let mounth = ruleForm.date.getMonth() + 1;
  // let day = ruleForm.date.getUTCDate();
  // let timeTitle = `${ year }-${ mounth }-${ day }`;
  
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
  
  // const getsunmit = async ()=>{
  //   let userId = await axios.queryUserInfoApi({});
  //   ruleForm.id = userId.data.userId
  //   ruleForm.name = userId.data.avatarName
  // }

  // getsunmit()
  const submitForm = (formEl: FormInstance | undefined) => {
    console.log(ruleForm.desc);
    if (!formEl) return
    formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('submit!');
        alert("提交成功")
        let createArticle = await axios.createArticleApi({
          title : timeTitle,
          content : ruleForm.desc
        });
        console.log('-----lll-----');
        console.log(createArticle);
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
  </style>
  