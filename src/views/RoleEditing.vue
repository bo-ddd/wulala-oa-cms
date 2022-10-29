<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import axios from "../assets/api/api"


const value = ref('')


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
  console.log(roleList)
  let permissionList = (await axios.getPermissionListApi({})).data
  Object.assign(formatData, formatePermissionList(permissionList))
})();

//树形数据结构的类型接口;
interface Tree {
  id: number,
  permissionName: string,
  pid: number,
  children: Tree[]
}

// const getCheckedId = (id: number) => {
//   console.log(id)

// }



</script>

<template>
  <div>
    <div class="top-list mt-10">
      <el-select v-model="value" filterable placeholder="请输入角色名称" @change="">
        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.roleName" />
      </el-select>
      <el-button type="danger" size="small">确定</el-button>
    </div>
    <div class="custom-tree-node-container mt-10">
      <el-tree :data="formatData" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
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
