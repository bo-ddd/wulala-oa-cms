<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from "@/assets/api/api";
import {useRouter } from "vue-router";
let router=useRouter()
const input = ref('')
const value = ref('')
let data = ref()
let dialogTableVisible = ref(false)
interface User {
    id: string
    RoleName: string
}
const to=function(name:string){
    router.push(name)
}
let getRoleList = async function () {
    await axios.getRoleListApi({}).then(res => {
        console.log(res);
        data.value = res.data
        console.log(data.value);
    })
}
getRoleList()
//点击创建角色     
const addRole =  function () {
   to('createRoles')
   
}
//创建角色
const createRole = async function () {
    await axios.createRoleApi({
        roleName: input.value
    }).then(res => {
        getRoleList()
        input.value = ''
    })
}
//删除角色权限
const handleDelete = async (index: number, row: User) => {
    await axios.deletePermissionRoleApi({
        id: row.id
    })
    console.log(index, row)
    // getRoleList()
}
const handleEdit = (index: number, row: User) => {
    console.log(index, row.id)
    to('roleediting')
}
</script>

<template>
    <div class="select">
        <div>
            <span class="lable">查询角色：</span>
            <el-select v-model="value" placeholder="请选择" size="small">
                <el-option v-for="item in data" :key="item.id" :label="item.roleName" :value="item.id" />
            </el-select>
            <el-button type="danger"  size="small" class="ml-10" plain>查询</el-button>
        </div>

        <div>
        </div>
    </div>
    <div class="table">

        <el-button type="danger" class="mb-10" @click="addRole" size="small" >创建角色</el-button>
        <el-table :data="data" style="width: 100%">
            <el-table-column label="id" width="240px"  align="center">
                <template #default="scope" align="center">
                    <div align="center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角色名称"  align="center">
                <template #default="scope" align="center">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                        <template #reference  align="center">
                            <el-tag>{{ scope.row.roleName }}</el-tag>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope" align="center">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">设置角色权限</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog v-model="dialogTableVisible" title="角色权限管理">

    </el-dialog>
</template>

<style scoped>
.select {
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
}

.create {
    display: flex;
}

:deep(.el-input) {
    width: 200px;
}

</style>