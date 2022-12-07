<script setup lang="ts">
import { ref, reactive } from 'vue';
import {useRouter} from 'vue-router';
import { getUserListApi } from '@/assets/api/api'
interface TableData {
    id: number,
    avatarName: string,
    activityName: string;
    status: number,
    startTime: string,
    endTime: string,
    count: number
}
const router=useRouter()
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(3)
const tableData = reactive<TableData[]>([
    {
        id: 1,
        avatarName: '熊大',
        activityName: '狼人杀',
        status: 0,
        startTime: '2022-12-06',
        endTime: '2022-12-13',
        count: 8
    },
    {
        id: 2,
        avatarName: '熊二',
        activityName: '三国杀',
        status: 1,
        startTime: '2022-12-06',
        endTime: '2022-12-13',
        count: 5
    },
    {
        id: 3,
        avatarName: '张三',
        activityName: '剧本杀',
        status: 2,
        startTime: '2022-12-06',
        endTime: '2022-12-13',
        count: 7
    }
])

interface QueryParams {
    activityName: string,
    avatarName: string,
    status: string,
    StartDuration: string[],
    endDuration: string[]
}
const queryOption = reactive({} as QueryParams)
const userAvatarNameList = reactive<string[]>([]) //用户昵称列表;
const StateCodeArr = ['全部', '未开始', '进行中', '已截止']
enum StateCode {//报名状态;
    '未开始',
    '进行中',
    '已截止'
}
enum tagType { //审核状态的b背景颜色;
    '',
    success,
    warning,
}


queryOption.status = StateCodeArr[0];//按报名状态查询时的默认显示值;
getUserAvatarNameList() //获取用户昵称查询列表;



//获取-用户昵称-查询列表;
async function getUserAvatarNameList() {
    const res = await getUserListApi({
        pageSize: 2147483647
    })
    userAvatarNameList.length = 0;
    res.data.list.forEach((item: { avatarName: string }) => {
        userAvatarNameList.push(item.avatarName)
    })
}
//调用查询接口;
function queryActivityInfo() {
}
function handleEdit(index: number, row: TableData) {
    console.log(index, row)
}
//一页显示条数改变时的回调;
function handleSizeChange(val: number) {
    pageSize.value = val
}
//当前所在页码改变时的回调;
function handleCurrentChange(val: number) {
    currentPage.value = val
}
</script>

<template>
    <div class="flex-options">
        <el-form-item label="活动名称">
            <el-select v-model="queryOption.activityName" placeholder="请输入活动名称" filterable>
                <el-option v-for="item in StateCodeArr" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="发起人">
            <el-select v-model="queryOption.avatarName" placeholder="请输入姓名" filterable>
                <el-option v-for="item in userAvatarNameList" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="报名状态">
            <el-select v-model="queryOption.status" placeholder="请输入报名状态">
                <el-option v-for="item in StateCodeArr" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="开始报名时间">
            <el-date-picker v-model="queryOption.StartDuration" type="daterange" range-separator="至"
                start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item label="结束报名时间">
            <el-date-picker v-model="queryOption.endDuration" type="daterange" range-separator="至"
                start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
        <el-form-item>
            <el-button type="danger" plain @click="router.push('createActivity')">
                <el-icon>
                    <Plus />
                </el-icon>
                <span>创建活动</span>
            </el-button>
            <el-button type="danger"  @click="queryActivityInfo">
                <el-icon>
                    <Search />
                </el-icon>
                <span>查询</span>
            </el-button>
            
        </el-form-item>
    </div>
    <el-table :data="tableData" style="width: 100%" class="mt-20">
        <el-table-column label="ID" prop="id" align="center" />
        <el-table-column label="活动名称" align="center">
            <template #default="scope">
                <el-tag>{{ scope.row.activityName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="发起人" prop="avatarName" align="center">
        </el-table-column>
        <el-table-column label="报名人数" prop="count" align="center" />
        <el-table-column label="报名状态" prop="status" align="center">
            <template #default="scope">
                <el-tag :type="tagType[scope.row.status]">{{ StateCode[scope.row.status] }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="开始报名日期" sortable prop="startTime" align="center" />
        <el-table-column label="截止报名日期" sortable prop="endTime" align="center" />

        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-link type="primary" @click="handleEdit(scope.$index, scope.row)">管理</el-link>
                <el-link type="warning" @click="handleEdit(scope.$index, scope.row)" class="ml-10">报名名单</el-link>
                <el-link type="success" @click="handleEdit(scope.$index, scope.row)" class="ml-10">二维码</el-link>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20, 25, 30]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" class="mt-20" />
</template>



<style scoped>
.flex-options {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0 20px;    
}

:deep(.el-input__wrapper) {
    flex-grow: 0;
}
</style>