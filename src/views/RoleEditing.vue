<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import axios from "../assets/api/api"


interface RolePermission{
  id:number,
  permissionId: number,
  permissionName:string
}

const value = ref('')
const roleId = ref<number>()
const defaultCheckedKeys=reactive<number[]>([])
//处理数据结构，为无限极结构;
interface PermissionList {
  id: number,
  permissionName: string,
  pid: number,
}

interface FormatData extends PermissionList {
  children: PermissionList[]
}

const formatePermissionList = (data: FormatData[]) => {
  const res: FormatData[] = JSON.parse(JSON.stringify(data))
  res.forEach(item => {
    item.children = [];
    if (item.pid != 0) {
      let pItem = res.find((pItem: FormatData) => pItem.id == item.pid)
      if (pItem && !pItem.children) pItem.children = [];
      pItem?.children.push(item)
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
  console.log('----------------角色列表--------------------')
  console.log(roleList)
  console.log('----------------权限列表--------------------')
  console.log(formatData)
})();

//树形数据结构的类型接口;
interface Tree {
  id: number,
  permissionName: string,
  pid: number,
  children: Tree[]
}

const getUserPermission = () => {
  
 //拿到id;
  roleList.forEach(item => {
    if (item.roleName == value.value) {
      roleId.value = item.id
    }
  });

  //根据id搜索出对应的数据;
  (async()=>{
  let {data}= await axios.queryRolePermissionApi({
      roleId: roleId.value
    })
     defaultCheckedKeys.length=0
     data.forEach((item:RolePermission)=>{
        defaultCheckedKeys.push(item.permissionId)
      })
      console.log('-------------------默认选中的权限数组-------------------')
      console.log(defaultCheckedKeys)
  })();
}



</script>

<template>
  <div>
    <div class="top-list mt-10">
      <el-select v-model="value" filterable placeholder="请输入角色名称" @change="getUserPermission">
        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.roleName" />
      </el-select>
      <el-button type="danger" size="small">确定{{defaultCheckedKeys}}</el-button>
    </div>
    <div class="custom-tree-node-container mt-10">
      <el-tree :data="formatData" 
      node-key="id" 
      default-expand-all
      show-checkbox
      :default-checked-keys="defaultCheckedKeys"
      check-on-click-node
      :expand-on-click-node="false" 
      :props="{ label: 'permissionName' }" />

    </div>
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
.is-penultimate>.el-tree-node__content {
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate>.el-tree-node__children {
  display: flex;
  flex-direction: row;
}

.is-penultimate>.el-tree-node__children>div {
  width: 25%;
}
</style>
