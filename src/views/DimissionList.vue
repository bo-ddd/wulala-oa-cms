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
    department: string,
    postName: string,
    avatarName: string | null
    applyTime: string
    quitTime: string
    reason: string
    status: string
}
const tableData = reactive<TableData[]>([])

enum StateCode {
    审核中 = 0,
    审核已通过,
    审核未通过
}

enum tagType {
    '' = 0,
    success,
    danger,
}

//获取用户的所在部门名称;
const getUserDeptName = async (userId: number) => {
    let userDeptList = await axios.getUserDeptListApi({ userId });
    let deptName = '';
    userDeptList.data.forEach((item: { deptName: string }) => {
        deptName += item.deptName
    })
    return deptName;
}

// //获取用户的职位名称;
const getUserPost = async (userId: number) => {
    let userInfo = await axios.queryUserInfoApi({ userId });
    let userPost = ''
    userInfo.data.roles.forEach((item: { roleName: string }) => {
        userPost += item.roleName;
    })
    return userPost;
}

//获取离职列表数据;
const getUserQuitList = async () => {
    let { data } = await axios.getQuitListApi({
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
    total.value = data.total;
    tableData.length = 0;
    Object.assign(tableData, data.list)
    tableData.forEach(async (item) => {
        item.applyTime = handleTimeFormat(item.applyTime) //申请时间
        item.quitTime = handleTimeFormat(item.quitTime) //离职时间
        item.status = StateCode[Number(item.status)]  //审核状态
        item.department = await getUserDeptName(item.userId) //部门名称
        item.postName = await getUserPost(item.userId) //职位名称
    })
}
getUserQuitList()

//处理时间数据格式Api;
const handleTimeFormat = (Time: string) => {
    return Time.substring(0, 10)
}


//审核按钮的点击事件;
const handleEdit = (index: number, row: TableData) => {
    console.log(index, row)
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
        <el-table-column label="部门" sortable prop="department" align="center" />
        <el-table-column label="职位" sortable prop="postName" align="center" />
        <el-table-column label="申请日期" sortable prop="applyTime" align="center" />
        <el-table-column label="离职日期" sortable prop="quitTime" align="center" />
        <el-table-column label="离职原因" prop="reason" align="center" />
        <el-table-column label="审核状态" prop="status" align="center">
            <template #default="scope">
                <el-tag :type="tagType[Number(StateCode[scope.row.status])]" size="small">{{ scope.row.status }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
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