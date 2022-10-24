<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/assets/api/api'
import { Check, Close } from '@element-plus/icons-vue'

const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const input = ref();
const inputAdd = ref();
let pageNum = ref(1);
let pageSize = ref(10);
let total = ref();
let permissionList = ref();

const handleSizeChange = async (val: number) => {
    console.log(`每页${val}条信息`);
    await getPermissionList(pageSize.value, pageNum.value)
    pageSize.value = val
}
const handleCurrentChange = async (val: number) => {
    console.log(`这是第${val}页`)
    await getPermissionList(pageSize.value, pageNum.value)
    pageNum.value = val
}
const getPermissionList = (pageSize?: number, pageNum?: number) => {
    axios.getPermissionListApi({
        pageNum: pageNum,
        pageSize: pageSize
    }).then(res => {
        if (res.status === 1) {
            permissionList.value = res.data.list;
        }
    })
}
const userSearch = async (id: any) => {
    axios.queryUserInfoApi({
        userId: id
    }).then(res => {
        if (res.data.status == 1) {
            permissionList.value = res.data
            console.log('-----查询成功----------');
            console.log(res.data);
        } else {
            alert('查询失败')
        }
    })
}
const addPermission = async (inputAdd: string) => {
    axios.addPermissionApi({
        permissionName: inputAdd
    }).then(res => {
        console.log(inputAdd);
        console.log(res);
        if (res.status == 1) {
            alert('添加成功')
            axios.getPermissionListApi({}).then(res => {
                permissionList.value = res.data;
                total.value = res.data.length
            })
        } else {
            alert('添加失败')
        }
    })
}
const userDelete = (id: number) => {
    console.log(id)
    axios.deletePermissionApi({ id }).then(res => {
        if (res.status == 1) {
            alert('删除成功')
            axios.getPermissionListApi({}).then(res => {
                permissionList.value = res.data;
                total.value = res.data.length
            })
        } else {
            alert('删除失败')
        }
    })
}
(async function () {
    let userList = await axios.getPermissionListApi({})
    permissionList.value = userList.data;
    // console.log(userList);
    total.value = userList.data.length
})()
</script>
<template>
    <div class="ipt">
        <span class="label label-search">查询：</span>
        <el-input v-model="input" size="small" placeholder="请输入用户ID" clearable />
        <el-button type="danger" size="small" @click="userSearch(input)">搜索</el-button>
        <span class="label label-add">添加权限：</span>
        <el-input v-model="inputAdd" size="small" placeholder="请输入权限名称" clearable />
        <el-button type="danger" size="small" @click="addPermission(inputAdd)">添加</el-button>
    </div>

    <el-table :data="permissionList" border style="width: 100%" fit>
        <el-table-column label="用户ID" align="center">
            <template #default="scope">
                <div>{{ scope.row.id }}</div>
            </template>
        </el-table-column>

        <el-table-column label="模块" align="center">
            <template #default="scope">
                <div>{{ scope.row.permissionName }}</div>
            </template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="300">
            <template #default="scope">
                <!-- <el-button size="small">修改信息</el-button> -->
                <el-switch v-model="scope.row.value" class="mt-2" style="margin-left: 24px" inline-prompt
                    :active-icon="Check" :inactive-icon="Close" />
                <el-button size="small" type="danger" @click="userDelete( scope.row.id)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
        <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
<style scoped>
.ipt {
    padding: 20px 0;
}

.label {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: rgb(145, 137, 137);
}

.label-add {
    margin-left: 20px;
}

:deep(.el-pagination) {
    justify-content: center;
    margin-top: 20px;
}

:deep(.el-input) {
    width: 200px;
}

:deep(.el-button) {
    margin-left: 20px;
}
</style>