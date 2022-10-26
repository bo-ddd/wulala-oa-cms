<script setup lang="ts">
import axios from '@/assets/api/api';
import { ref,reactive } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
const formInline = reactive({
    user: '',
    region: '',
})

const onSubmit = () => {
    console.log('submit!')
}

//列表
const dataList = ref()

// 全线接口的定义
interface Permission {
    id: number;
    permissionName: string;
    pid: number;
}
//格式化后的接口定义
interface FormatPermission extends Permission {
    children: Permission[]
}
function formatData(data: FormatPermission[]) {
    // 深拷贝
    let res: FormatPermission[] = JSON.parse(JSON.stringify(data));
    res.forEach(item => {  //10
        // 让每一个对象的item中都有一个children属性；  原因是，数据结构字段保证一致；
        if (!item.children) item.children = [];
        // 浅拷贝  如果当前元素是子级
        if (item.pid != 0) {
            // 1. 找到父级，因为父级有且只有一个，所以应该用find;
            let pItem = res.find(pItem => pItem.id == item.pid);
            // 2. 兼容性， 如果父级没有children，则创建children字段；
            if(pItem && !pItem.children) pItem.children = []
            // 把当前子级的数据存放在父级当中，因为是引用型数据类型，所以是有浅拷贝存在的；
            pItem?.children.push(item)
        }
    }) 
    // 浅拷贝  过滤出所有的父级
    return res.filter(item => item.pid == 0);
}

const getPermissionList = async function () {
    await axios.getPermissionListApi({}).then(res => {
        dataList.value = formatData(res.data)
        console.log('----------data---------')
        console.log(res.data)
        console.log( dataList.value);   //处理之后的
    })
}
getPermissionList()



const append = (data: FormatPermission) => {
    const newChild = { id: data.id, permissionName: data.permissionName, pid:data.pid }
    if (!data.children) {
        data.children = []
    }
    data.children.push(newChild)
    dataList.value = [...dataList.value]
}

const remove = (node: Node, data: FormatPermission) => {
    const parent = node.parent
    const children: Tree[] = parent.data.children || parent.data
    const index = children.findIndex((d) => d.id === data.id)
    children.splice(index, 1)
    dataList.value = [...dataList.value]
}

const renderContent = (
    h: any,
    {
        node,
        data,
    store,
  }: {
    node: Node
    data: FormatPermission
    store: Node['store']
  }
) => {
  return h(
    'span',
    {
      class: 'custom-tree-node',
    },
    h('span', data.permissionName),
    h(
      'span',
    //   null,
    //   h(
    //     'a',
    //     {
    //       onClick: () => append(data),
    //     },
    //     'Append '
    //   ),
    //   h(
    //     'a',
    //     {
    //       style: 'margin-left: 8px',
    //       onClick: () => remove(node, data),
    //     },
    //     'Delete'
    //   )
    )
  )
}

// const dataSource = ref<Tree[]>([
//   {
//     id: 1,
//     label: 'Level one 1',
//     children: [
//       {
//         id: 4,
//         label: 'Level two 1-1',
//         children: [
//           {
//             id: 9,
//             label: 'Level three 1-1-1',
//           },
//           {
//             id: 10,
//             label: 'Level three 1-1-2',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     label: 'Level one 2',
//     children: [
//       {
//         id: 5,
//         label: 'Level two 2-1',
//       },
//       {
//         id: 6,
//         label: 'Level two 2-2',
//       },
//     ],
//   },
//   {
//     id: 3,
//     label: 'Level one 3',
//     children: [
//       {
//         id: 7,
//         label: 'Level two 3-1',
//       },
//       {
//         id: 8,
//         label: 'Level two 3-2',
//       },
//     ],
//   },
// ])
</script>

<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名称">
            <el-input v-model="formInline.user" placeholder="请输入新增角色名称" />
        </el-form-item>
        <el-form-item label="所属部门">
            <el-select v-model="formInline.region" placeholder="请选择部门">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
                <!-- <el-option v-for="item in data" :key="item.id" :label="item.roleName" :value="item.id" /> -->
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
    </el-form>

    <div class="custom-tree-container">
        <el-tree
      :data="dataList"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ data.permissionName }}</span>
          <span class="add">
            <a @click="append(data)"> 添加 </a>
            <a style="margin-left: 8px" @click="remove(node, data)"> 取消 </a>
          </span>
        </span>
      </template>
    </el-tree>
    </div>
</template>

<style scoped>
.custom-tree-node {
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  color: rgb(16, 18, 18);
}
</style>