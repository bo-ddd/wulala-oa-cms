<script setup lang="ts">
import axios from '../assets/api/api'
import { ref, computed, reactive } from 'vue'

//分页参数;
const currentPage = ref(1) //当前是第几页;
const pageSize = ref(10)  //每页显示的条数;
let total = ref(0)

//每页显示条数改变时的回调;
const handleSizeChange = (val: number) => {
    pageSize.value = val
}
//改变页数时的回调;
const handleCurrentChange = (val: number) => {
    currentPage.value = val
}

interface TableData {
    id: number
    userId: number
    avatarName: string | null
    applyTime: string
    quitTime: string
    reason: string
    status: number
}
let tableData = reactive<TableData[]>([])

//获取离职列表总数据;
const getUserQuitList = async () => {
    let { data } = await axios.getQuitListApi({
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
    total.value = data.total;
    tableData.length = 0;
    Object.assign(tableData, data.list)
    tableData.forEach(item => {
        item.applyTime = handleTimeFormat(item.applyTime)
        item.quitTime = handleTimeFormat(item.quitTime)
    })
}
getUserQuitList()

//处理时间数据;
const handleTimeFormat = (Time: string) => {
    return Time.substring(0, 10)
}


//编辑按钮的点击事件;
const handleEdit = (index: number, row: TableData) => {
    console.log(index, row)
}

//删除按钮的点击事件;   
const handleDelete = (index: number, row: TableData) => {
    //调用删除接口; 
}
</script>

<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" prop="id" align="center" />
        <el-table-column label="姓名" align="center">
            <template #default="scope">
                <el-tag size="small">{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="申请日期" sortable prop="applyTime" align="center" />
        <el-table-column label="离职日期" sortable prop="quitTime" align="center" />
        <el-table-column label="离职原因" prop="reason" align="center" />
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]"
        :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>


<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>