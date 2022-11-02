<script setup lang="ts">
import axios from '@/assets/api/api';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import type PermissionVO from "../types/PermissionVO";


let router = useRouter()
const dataList = ref()
const permissionIds = reactive<number[]>([])

const to = function (name: string) {
    router.push(name)
}
const Role = reactive({
    roleId: 0,
    permissionId: 0,
    roleName: ''
})
//创建角色
const addRole = async () => {
    let res = await axios.createRoleApi({
        roleName: Role.roleName,
        permissionIds: permissionIds,
    })
    console.log(res.data.id);
    Role.roleId = res.data.id
    to('roles')
}
///吧服务端返回的数据处理成我们要的JSON格式的数据
function formatData(data: PermissionVO[]) {
    // 深拷贝,改变引用栈
    let res: PermissionVO[] = JSON.parse(JSON.stringify(data));
    res.forEach(item => {  //10
        // 让每一个对象的item中都有一个children属性； 原因是，数据结构字段保证一致；
        if (!item.children) item.children = [];
        // 浅拷贝  如果当前元素是子级
        if (item.pid != 0) {
            // 1. 找到父级，因为父级有且只有一个，所以应该用find;
            let pItem = res.find(pItem => pItem.id == item.pid);
            // 2. 兼容性， 如果父级没有children，则创建children字段；
            if (pItem && !pItem.children) pItem.children = []
            // 把当前子级的数据存放在父级children当中，因为是引用型数据类型，所以是有浅拷贝存在的；
            pItem?.children.push(item)
        }
    })
    // 浅拷贝  过滤出所有的父级  //return一个什么值  那么这个方法就是什么值
    return res.filter(item => item.pid == 0);
}
//封装权限列表接口
const getPermissionList = async function () {
    await axios.getPermissionListApi({}).then(res => {
        dataList.value = formatData(res.data)
        console.log('----------data---------')
        console.log(res.data)
        console.log(dataList.value);   //处理之后的
    })
}
getPermissionList()  //进入页面调接口
//点击当前权限获取 权限id
const checkPermission = function (data: any) {
    console.log(data);
    
    // Role.permissionId = data.id
    // console.log(Role.permissionId)
    // permissionIds.push(Role.permissionId)
    // console.log(permissionIds);
}

</script>
<template>
    <el-form :inline="true" :model="Role" class="demo-form-inline">
        <el-form-item label="角色名称">
            <el-input v-model="Role.roleName" placeholder="请输入新增角色名称" size="small" />
        </el-form-item>
        <el-form-item label="所属部门">
            <el-select v-model="Role" placeholder="请选择部门" size="small">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
                <!-- <el-option v-for="item in data" :key="item.id" :label="item.roleName" :value="item.id" /> -->
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="addRole" size="small" plain>创建角色</el-button>
        </el-form-item>
    </el-form>

    <div class="custom-tree-container mb-10">
        <el-tree :data="dataList" show-checkbox @check='checkPermission' node-key="id" :expand-on-click-node="true">
            <template #default="{ data }">
                <span class="custom-tree-node">
                    <span>{{ data.permissionName }}</span>
                </span>
            </template>
        </el-tree>
    </div>
    <!-- <el-button type="danger" @click="addRolePermission" size="small">创建角色权限</el-button> -->
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

:deep(.el-input) {
    width: 200px;
}
</style>