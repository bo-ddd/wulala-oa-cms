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

        <!-- <el-table-column label="用户头像" align="center">
            <template #default="scope">
                <div><img src="{{scope.row.avatarImg}}" alt=""></div>
            </template>
        </el-table-column> -->

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
        <el-table-column label="操作" width="300" align='center'>
            <template #default="scope">
                <el-button size="small">修改信息</el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="pagination">
        <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from '@/assets/api/api'
const small = ref(false)
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = async (val: number) => {
    console.log(`每页${val}条信息`);
    await getUserList(pageSize.value, pageNum.value)
    pageSize.value = val
}
const handleCurrentChange = async (val: number) => {
    console.log(`这是第${val}页`)
    await getUserList(pageSize.value, pageNum.value)
    pageNum.value = val
}
const getUserList = (pageSize?: number, pageNum?: number) => {
    axios.getUserListApi({
        pageNum: pageNum,
        pageSize: pageSize
    }).then(res => {
        if (res.status === 1) {
            userListData.value = res.data.list;
        }
    })
}
const input = ref();
let pageNum = ref(1);
let pageSize = ref(10);
let total = ref();
let userListData = ref();

(async function () {
    let userList = await axios.getUserListApi({})
    userListData.value = userList.data.list;
    total.value = userList.data.total
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

const userSearch = async (id: any) => {
    axios.queryUserInfoApi({
        userId: id
    }).then(res => {
        if (res.data.status == 1) {
            userInfoData.value = res.data
            console.log('-----查询成功----------');
            console.log(res.data);
        } else {
            alert('查询失败')
        }
    })
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
    margin-top: 20px;
}

:deep(.el-input) {
    width: 200px;
}

:deep(.el-button) {
    margin-left: 20px;
}
</style>