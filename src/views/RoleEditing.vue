<script lang="ts" setup>
import { reactive, ref } from 'vue'
import axios from "../assets/api/api"
import { ElTree, ElMessage } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { useRouter, useRoute } from "vue-router";
import { ArrowLeft } from '@element-plus/icons-vue';
import type { FormatData, Tree, RolePermission } from '@/types/Permission';

const route = useRoute()
const router = useRouter()
const checkedRoleName = ref('') //选中角色的名称;
const roleId = ref<number>()  //选中角色的ID;
const defaultCheckedKeys = reactive<number[]>([])  //默认选中的key数组;
const roleList = reactive<{ id: number, roleName: string }[]>([]); //角色列表;
const RolePermissionTree = reactive<Tree[]>([]); // 页面上渲染的树形结构数据（所有权限）;
const RolePermissionList = reactive<{ id: number, label: string }[]>([]); //角色拥有的权限列表;
const treeRef = ref(); //树形组件的实例;
const beforeUpdateIdList = reactive<number[]>([]); //修改前的权限id列表;
const checkedStatus = ref(false); //控制禁选;
const publicSection = reactive<number[]>([]) //修改前与修改后数据的公共部分;
const afterUpdateIdList = reactive<number[]>([]) //修改之后的选中权限Id;
const addList = reactive<number[]>([]) //增加的权限Id;
const deleteList = reactive<number[]>([]) //删除的权限Id;

getCheckedRole() //列表跳详情，获取选中角色进行复显;

// 处理数据结构，为无限极结构;
function formatePermissionList(data: FormatData[]) {
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

//------------------2.渲染数据到页面上--------------------

//列表跳详情，在选择框中做复显操作;
async function getCheckedRole() {
  Object.assign(roleList, (await axios.getRoleListApi({})).data)
  let permissionList = (await axios.getPermissionListApi({})).data
  Object.assign(RolePermissionTree, formatePermissionList(permissionList))

  // -----------------拿到角色ID--------------
  roleList.forEach(item => {
    if (item.id == Number(route.query.id)) {
      checkedRoleName.value = item.roleName
    }
  })
}

//------------------3.角色权限复显功能--------------------

//3-1 角色下拉框选中状态改变时执行的函数;
async function getUserPermission() {
  //拿到选中角色的角色id;
  roleList.forEach(item => {
    if (item.roleName == checkedRoleName.value) {
      roleId.value = item.id
    }
  });

  //根据id搜索出对应的数据;
  let { data } = await axios.queryRolePermissionListApi({
    roleId: roleId.value
  })
  //清空上一次的数据;
  beforeUpdateIdList.length = 0; //存放修改前的id;
  RolePermissionList.length = 0  //复显操作;
  //如果有数据，将数据存起来;
  if (data.length) {
    data.forEach((item: RolePermission) => {
      beforeUpdateIdList.push(item.permissionId)
      RolePermissionList.push({ id: item.permissionId, label: item.permissionName })
    })
  }
}

//点击查询权限按钮复显选中角色的配置权限;
async function setCheckedNodes() {
  await getUserPermission()
  checkedStatus.value = true;
  treeRef.value!.setCheckedNodes(
    RolePermissionList as Node[],
    false
  )
}

//获取选中的节点;
function getCheckedNodes() {
  let afterUpdateList = treeRef.value!.getCheckedNodes(false, false);
  return afterUpdateList.filter((item: Tree) => item.pid == 0)
}
//修改权限的提交修改事件;
function submit() {
  //获取到修改前和修改后的权限id列表;
  afterUpdateIdList.length = 0;
  getCheckedNodes().forEach((item: Tree) => {
    afterUpdateIdList.push(item.id)
  })

  //将两组数据进行比对，区分出增加和删除的数据;
  const intersection = (a: number[], b: number[]) => {
    const s = new Set(b);
    return [...new Set(a)].filter(x => s.has(x));
  };
  Object.assign(publicSection, intersection(afterUpdateIdList, beforeUpdateIdList))

  //增加的数据;
  addList.length = 0
  Object.assign(addList, afterUpdateIdList.filter(item => publicSection.includes(item) == false))
  //删除的数据;
  deleteList.length = 0
  Object.assign(deleteList, beforeUpdateIdList.filter(item => publicSection.includes(item) == false))

  //调用增加权限接口;
  const addData = []
  if (addList.length) {
    addData.push(
      addList.forEach(item => {
        axios.addPermissionRoleApi({
          roleId: roleId.value,
          permissionId: item
        })
      })
    )

    Promise.all(addData).then(res => {
      ElMessage({
        message: '修改权限成功',
        type: 'success',
      })
      router.push('roles')

    }).catch(error => {
      ElMessage({
        message: '修改权限失败',
        type: 'error',
      })
    })
  }
  //调用删除权限接口;
  const deleteData = []
  if (deleteList.length) {
    deleteData.push(
      deleteList.forEach(item => {
        axios.deletePermissionRoleApi({
          roleId: roleId.value,
          permissionId: item
        })
      })
    )

    Promise.all(deleteData).then(res => {
      ElMessage({
        message: '修改权限成功',
        type: 'success',
      })
      router.push('roles')
    }).catch(error => {
      ElMessage({
        message: '修改权限失败',
        type: 'error',
      })
    })
  }
}

</script>

<template>
  <div>
    <el-page-header :icon="ArrowLeft" title="返回" @back="router.push('Roles')">
      <template #content>
        <span class="font-600 mr-3"> 设置角色权限 </span>
      </template>
    </el-page-header>
    <div class="top-list mt-24">
      <el-select v-model="checkedRoleName" filterable placeholder="请输入角色名称" @change="getUserPermission">
        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.roleName" />
      </el-select>
      <el-button @click="setCheckedNodes">查询权限</el-button>
      <el-button type="danger" @click="submit">确认修改</el-button>
    </div>
    <div class="custom-tree-node-container mt-24 scroll-bar">
      <el-tree :data="RolePermissionTree" ref="treeRef" node-key="id" default-expand-all :show-checkbox="checkedStatus"
        :default-checked-keys="defaultCheckedKeys" check-on-click-node :expand-on-click-node="false"
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

.scroll-bar {
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  background-color: white;
}

.scroll-bar::-webkit-scrollbar {
  display: none
}
</style>
