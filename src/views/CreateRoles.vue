<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue'
import type PermissionVO from "../types/PermissionVO";
import {createRoleApi,getPermissionListApi } from "@/assets/api/api";


const router = useRouter()
const dataList = ref()
const permissionIds = reactive<number[]>([])
const Role = reactive({
    roleId: 0,
    permissionId: 0,
    roleName: ''
})

getPermissionList()  //进入页面调接口

const to = function (name: string) {
    router.push(name)
}
//创建角色
const addRole = async () => {
    let res = await createRoleApi({
        roleName: Role.roleName,
        permissionIds: permissionIds,
    })
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
async function getPermissionList() {
    await getPermissionListApi().then(res => {
        dataList.value = formatData(res.data)
        console.log('----------data---------')
        console.log(res.data)
        console.log(dataList.value);   //处理之后的
    })
}
const checkChange = function (data: PermissionVO, isChecked: boolean) {
    if (isChecked) {
        permissionIds.push(data.id)
    } else {
        permissionIds.forEach(item => {
            if (data.id == item) {
                console.log(item);
                permissionIds.splice(permissionIds.indexOf(item), 1)  //找到item返回他的下标，从下标开始，删除一个
            }
        })
    }
    return [...new Set(permissionIds)]   ///

}
</script>
<template>
    <el-form :inline="true" :model="Role" class="demo-form-inline">
        <el-form-item class="lable">
            <el-input v-model="Role.roleName" placeholder="请输入新增角色名称" />
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="addRole" plain>创建角色</el-button>
        </el-form-item>
    </el-form>

    <div class="custom-tree-container mtb-10">
        <el-tree :data="dataList" show-checkbox default-expand-all @check-change='checkChange' node-key="id"
            :expand-on-click-node="true">
            <template #default="{ data }">
                <span class="custom-tree-node ">
                    <span>{{ data.permissionName }}</span>
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

:deep(.el-input) {
    width: 200px;
}

.lable {
    font-size: 16px;
    font-weight: 600;
    color: rgb(145, 137, 137);
}

.el-tree {
    height: 500px;
    overflow-y: scroll;
}

.el-tree::-webkit-scrollbar {
    display: none;
}

.mtb-10 {
    margin: 10px 0;
}

.ptb-10 {
    padding: 10px 0;
}

.el-tree {
    padding: 10px 0;
}
</style>