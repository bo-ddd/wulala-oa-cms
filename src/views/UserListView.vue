<template>

    <div class="ipt">
        <span class="label">查询：</span>
        <el-input v-model="input" size="small" placeholder="请输入用户ID" clearable />
        <el-button type="danger" size="small" @click="userSearch(input)">搜索</el-button>
    </div>

    <el-table :data="userListData" border style="width: 100%" fit>
        <el-table-column label="用户ID" align="center">
            <template #default="scope">
                <div>{{ scope.row.userId }}</div>
            </template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
            <template #default="scope">
                <div>{{ scope.row.avatarName }}</div>
            </template>
        </el-table-column>

        <el-table-column label="联系方式" align="center">
            <template #default="scope">
                <div>{{ scope.row.phoneNumber }}</div>
            </template>
        </el-table-column>
        <!-- <el-table-column prop="userId" label="用户名" align='center' />
            <el-table-column prop="address" label="用户身份" align='center' />
            <el-table-column prop="phoneNumber" label="手机号" align='center' />
            <el-table-column prop="sex" label="性别" align='center' />
            <el-table-column prop="aaa" label="状态" align='center' /> 
            <el-table-column prop="date" label="入职时间" align='center' /> -->
        <el-table-column label="操作" width="300" align='center'>
            <template #default="scope">
                <el-button size="small">修改信息</el-button>
                <el-button size="small" type="danger" @click="userDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column> -->
    </el-table>
    <div class="pagination">
        <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[ 5,10, 20, 30, 40]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/assets/api/api'
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
const input = ref();
const pageNum = ref() as unknown as number
const pageSize = ref() as unknown as number
let total = ref()

let userListData = ref();

(async function () {
    let userList = await axios.getUserListApi({})
    userListData.value = userList.data.list;
    total.value = userList.data.list.length
})()


interface User {
    userId: number
    avatarName: string
    phoneNumber: number
}

const userDelete = (index: number, row: User) => {
    console.log(index, row)
}
let userInfoData = ref();

const userSearch = function (userId: any) {
    console.log('------------userId------------');
    console.log(userId)
    console.log('------------ipt--------');
    console.log(input.value);
    (async function () {
        await axios.queryUserInfoApi(userId).then(res => {
            if (res.data.userId === userId) {
                userInfoData = res.data
                console.log('---------ssss------------');
                console.log(res.data);
            }

        })
    })()
}
</script>

<style scoped>
.page,
.ipt {
    padding: 20px 0;
}

.label {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: rgb(145, 137, 137);
}

.label-size {
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