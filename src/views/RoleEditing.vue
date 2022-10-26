<script lang="ts" setup>
    import { reactive, ref } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import axios from "../assets/api/api"

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  region: '组长',
  type: [],
})

const rules = reactive<FormRules>({
  region: [
    {
      required: true,
      message: '请选择角色名称',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: '',
      trigger: 'change',
    },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
};



interface PermissionList{
  id:number,
  permissionName:string,
  pid:number
}

interface FormatData extends PermissionList{
  children: PermissionList[]
}

const formatePermissionList=(data:PermissionList)=>{
    const res=JSON.parse(JSON.stringify(data))
    res.forEach((item:FormatData)=>{
      item.children=[];
      if(item.pid!=0){
       let pItem=res.find((pItem:FormatData)=>pItem.id==item.pid)
       if(!pItem.children) pItem.children=[];
       pItem.children.push(item)
      }
    })
  return res.filter((item:FormatData)=>item.pid==0)
}


//刷新页面渲染数据;
const roleList=reactive<{id:number,roleName:string}[]>([]);
const formatData=reactive<FormatData[]>([]);

(async ()=>{
  Object.assign(roleList,(await axios.getRoleListApi({})).data)
  let permissionList=(await axios.getPermissionListApi({})).data
  Object.assign(formatData,formatePermissionList(permissionList))
})();
console.log(formatData)
</script>

<template>
    <div>
        <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm center"
    :size="formSize"
    status-icon
  >

    <el-form-item label="角色名称" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请输入角色名称" size="small">
        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.roleName"/>
      </el-select>
    </el-form-item>


    <el-form-item v-for="item in formatData"  :label="item.permissionName" prop="type">
      <el-checkbox-group v-model="ruleForm.type" v-if="item.children" v-for="key in item.children" :key="key.id" size="small">
        <el-checkbox :label="key.permissionName" name="type" />
      </el-checkbox-group>
    </el-form-item>
    
    
    <el-form-item>
      <el-button type="danger" @click="submitForm(ruleFormRef)" size="small">确定</el-button>
    </el-form-item>
  </el-form>
    </div>

</template>

<style scoped>
:deep(.el-input){
  width:200px
}
</style>
