<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from "../assets/api/api"
import type Node from 'element-plus/es/components/tree/src/model/node'

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

interface PermissionList {
  id: number,
  permissionName: string,
  pid: number,
  // isPenultimate:true
}

interface FormatData extends PermissionList {
  children: PermissionList[]
}

const formatePermissionList = (data: PermissionList) => {
  const res = JSON.parse(JSON.stringify(data))
  res.forEach((item: FormatData) => {
    // item.isPenultimate=true;
    item.children = [];
    if (item.pid != 0) {
      let pItem = res.find((pItem: FormatData) => pItem.id == item.pid)
      if (!pItem.children) pItem.children = [];
      pItem.children.push(item)
    }
  })
  return res.filter((item: FormatData) => item.pid == 0)
}


//刷新页面渲染数据;
const roleList = reactive<{ id: number, roleName: string }[]>([]);
const formatData = reactive<Tree[]>([]);

(async () => {
  Object.assign(roleList, (await axios.getRoleListApi({})).data)
  let permissionList = (await axios.getPermissionListApi({})).data
  Object.assign(formatData, formatePermissionList(permissionList))
})();

interface Tree {
  id: number,
  permissionName: string,
  pid: number,
  isPenultimate?: boolean
  children: Tree[]
}



const customNodeClass = (data: Tree, node: Node) => {
  if (data.isPenultimate) {
    return 'is-penultimate'
  }
  return null
}

</script>

<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm center"
      :size="formSize" status-icon>

      <template class="top-list mt-10">
        <el-form-item label="角色名称" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请输入角色名称" size="small">
            <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.roleName" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm(ruleFormRef)" size="small">确定</el-button>
        </el-form-item>
      </template>

        <div class="custom-tree-node-container mt-10">
          <el-tree :data="formatData" show-checkbox node-key="id"  default-expand-all :expand-on-click-node="false"
            :props="{ label:'permissionName' }" />
        </div>

    </el-form>
  </div>

</template>

<style scoped>
:deep(.el-input) {
  width: 200px
}

.top-list {
  display: flex;
  align-items: center;
  gap: 20px;
}

.container::-webkit-scrollbar {
  display: none;
}

/* Tree控件 */
.is-penultimate > .el-tree-node__content {
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}

.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}

/* 改变树形控件的背景颜色 */
/* :deep(.el-tree){
   background-color: transparent;
} */
</style>
