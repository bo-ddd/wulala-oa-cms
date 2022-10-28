<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import axios from "@/assets/api/api";
import { useRouter } from "vue-router";
let router = useRouter()
const value = ref('')
const centerDialogVisible = ref(false)
const pageNum = ref(1)
const pageSize = ref(8)
const small = ref(false)
let resData = reactive<User[]>([])
interface User {
    id: number
    roleName: string
}
const handleSizeChange = (val: number) => {
    console.log(`一页${val} 条`)
    pageSize.value=val
}
const handleCurrentChange = (val: number) => {
    pageNum.value=val
    console.log(` 当前 ${val}页`)
}
interface User {
    id: number
    RoleName: string
}
const to = function (name: string) {
    router.push(name)
}
let getRoleList = async function () {
    let res = await axios.getRoleListApi()
    console.log(res);
    resData.push(...res.data)
    console.log(resData);
}
getRoleList()
//点击创建角色     
const addRole = function () {
    to('createRoles')

}
//删除角色权限
const handleDelete = async (index: number, row: User) => {
    let res = await axios.deleteRoleApi({
        id: row.id
    })
    console.log(index, row, res)
}
//点击设置权限按钮
const setPermissions = (index: number, row: User) => {
    console.log(index, row.id)
    to('roleEditing')
}
//弹层确定删除角色及权限
const okDelete = function () {
    getRoleList()
}
const total = computed(() => resData.length)
console.log(total);
//当前每页列表数据
let currentList = computed(() => {
    return resData.slice(startIndex.value, endIndex.value)
})
//开始下标
let startIndex = computed(() => (pageNum.value - 1) * pageSize.value)
//结束下标
let endIndex = computed(() => pageNum.value * pageSize.value)
</script>

<template>
    <div class="select">
        <div>
            <span class="lable">查询角色：</span>
            <el-select v-model="value" placeholder="请选择" size="small">
                <el-option v-for="item in resData" :key="item.id" :label="item.roleName" :value="item.id" />
            </el-select>
            <el-button type="danger" size="small" class="ml-10" plain>查询</el-button>
        </div>
    </div>
    <div class="table">
        <el-button type="danger" class="mb-10" @click="addRole" size="small">创建角色</el-button>
        <el-table :data="currentList" style="width: 100%">
            <el-table-column label="id" width="240px" align="center">
                <template #default="scope" align="center">
                    <div align="center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角色名称" align="center">
                <template #default="scope" align="center">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                        <template #reference align="center">
                            <el-tag>{{ scope.row.roleName }}</el-tag>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope" align="center">
                    <el-button size="small" @click="setPermissions(scope.$index, scope.row)">设置角色权限</el-button>
                    <el-button size="small" type="danger"
                        @click="handleDelete(scope.$index, scope.row); centerDialogVisible = true">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
            <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
                :small="small" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </div>
    <!-- //删除角色弹层 -->
    <el-dialog v-model="centerDialogVisible" title="删除角色" width="30%" align-center>
        <span>是否删除角色及角色对应的所有权限?</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="danger" @click="okDelete(); centerDialogVisible = false">
                    确定
                </el-button>
            </span>
        </template>
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

.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>