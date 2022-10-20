<template>
    <div>
        <div class="ipt">
            <span class="label">查询：</span>
            <el-input v-model="input" size="small" placeholder="请输入用户ID" />
            <el-button type="danger" size="small">搜索</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" fit>
            <el-table-column prop="name" label="用户名" align='center' />
            <el-table-column prop="address" label="用户身份" align='center' />
            <el-table-column prop="phoneNumber" label="手机号" align='center' />
            <el-table-column prop="sex" label="性别" align='center' />
            <el-table-column prop="aaa" label="状态" align='center' />
            <el-table-column prop="date" label="入职时间" align='center' />
            <el-table-column label="操作" width="300" align='center'>
                <template #default="scope">
                    <el-button size="small">修改信息</el-button>
                    <el-button size="small" type="danger">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const input = ref('')

const tableData = [
    {
        date: '2020-2-2',
        name: 'Tom',
        address: '组员',
        phoneNumber: '13333333333',
        sex: '1',
        aaa: '在岗'
    },
    {
        date: '2022-10-1',
        name: 'Bob',
        address: '组长',
        phoneNumber: '11111111111',
        sex: '0',
        aaa: '请假'
    },
    {
        date: '',
        name: 'Tom',
        address: '',
    },
    {
        date: '',
        name: 'Tom',
        address: '',
    },
]
</script>

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

:deep(.el-input) {
    width: 200px;
}
:deep(.el-button) {
    margin-left: 20px;
}
</style>