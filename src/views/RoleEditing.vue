<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import axios from "../assets/api/api"
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'

const value = ref('')
const roleId = ref<number>()
const defaultCheckedKeys = reactive<number[]>([])

//------------------1.处理数据结构，为无限极结构--------------------
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


//------------------2.渲染数据到页面上--------------------
interface Tree {
  id: number,
  permissionName: string,
  pid: number,
  children: Tree[]
}

//角色列表;
const roleList = reactive<{ id: number, roleName: string }[]>([]);
//权限列表;
const formatData = reactive<Tree[]>([]);
const RolePermissionList = reactive<{ id: number, label: string }[]>([]);

(async () => {
  Object.assign(roleList, (await axios.getRoleListApi({})).data)
  let permissionList = (await axios.getPermissionListApi({})).data
  Object.assign(formatData, formatePermissionList(permissionList))
  console.log(formatData)
})();

//------------------3.角色权限复显功能--------------------
const treeRef = ref();
//获取修改前的id列表;
const beforeUpdateIdList = reactive<number[]>([]);

interface RolePermission {
  permissionId: number,
  permissionName: string
}

//3-1 角色下拉框选中状态改变时执行的函数;
const getUserPermission = () => {

  //拿到选中角色的角色id;
  roleList.forEach(item => {
    if (item.roleName == value.value) {
      roleId.value = item.id
    }
  });

  (async () => {
    //根据id搜索出对应的数据;
    let { data } = await axios.queryRolePermissionListApi({
      roleId: roleId.value
    })
    console.log(data)
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
  })();
}

//点击查询权限按钮复显选中角色的配置权限;
const setCheckedNodes = () => {
      treeRef.value!.setCheckedNodes(
        RolePermissionList as Node[],
        false
      )
    }

//拿到修改后的数据调接口;
const publicSection = reactive<number[]>([])
const afterUpdateIdList = reactive<number[]>([])
const addList = reactive<number[]>([])
const deleteList = reactive<number[]>([])
const getCheckedNodes = () => {
  let afterUpdateList = treeRef.value!.getCheckedNodes(false, false);
  return afterUpdateList.filter((item: Tree) => item.pid == 0)
}

const submit = function () {
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
        }).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      })
    )

    Promise.all(addData).then(res => {
      console.log(res)
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
        }).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      })
    )

    Promise.all(deleteData).then(res => {
      console.log(res)
    })
  }
}



</script>

<template>
  <div>
    <div class="top-list mt-10">
      <el-select v-model="value" filterable placeholder="请输入角色名称" @change="getUserPermission" size="small">
        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.roleName" />
      </el-select>
      <el-button type="danger" size="small" @click="setCheckedNodes">查询权限</el-button>
      <el-button type="danger" size="small" @click="submit">确认修改</el-button>
    </div>
    <div class="custom-tree-node-container mt-10">
      <el-tree :data="formatData" ref="treeRef" node-key="id" default-expand-all show-checkbox
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
</style>
