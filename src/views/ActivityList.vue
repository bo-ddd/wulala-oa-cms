<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getUserListApi, activityListApi, queryUserInfoApi } from '@/assets/api/api'
interface TableData {
    id: number,
    userId: number,
    avatarName: string,
    activityName: string;
    activityDesc: string,
    status: number,
    type: number,
    startTime: string,
    endTime: string,
    beginAt: string,
    endAt: string,
    count: number
}

const router = useRouter()
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(0)
const tableData = reactive<TableData[]>([])

interface QueryParams {
    avatarName?: string,
    activityName?: string,
    status?: number | string,
    type?: number,
    StartDuration?: string[],
    endDuration?: string[],
    pageSize: number,
    pageNum: number,
}
const queryOption = reactive({} as QueryParams)
queryOption.status = '全部'
const userAvatarNameList = reactive<string[]>([]) //用户昵称列表;
const activityNamelist = reactive<string[]>([]) //活动名称列表;
const stateCodeArr = [
    {
        id: 1,
        status: '全部',
        value: null
    },
    {
        id: 2,
        status: '未开始',
        value: 0
    },
    {
        id: 3,
        status: '进行中',
        value: 1
    },
    {
        id: 4,
        status: '已截止',
        value: 2
    }
]
enum activityType {
    '一次性活动',
    '长期活动',
    '显示活动'

}
enum stateCode {//报名状态;
    '未开始',
    '进行中',
    '已截止'
}
enum tagType { //审核状态的b背景颜色;
    '',
    success,
    warning,
}

getUserAvatarNameList() //获取用户昵称查询列表;
getActivityNameList()
//初始化活动列表;
getActivityList({
    pageSize: pageSize.value,
    pageNum: currentPage.value,
})

//初始化活动列表;
async function getActivityList(queryParams: QueryParams) {
    const { data } = await activityListApi(queryParams)
     console.log(data)
    tableData.length = 0;
    Object.assign(tableData, data.list)
    total.value = data.total;
    tableData.forEach(async (item) => {
        item.avatarName = await getUserAvatarName(item.userId)
        item.startTime = formatDate(item.startTime)
        item.endTime = formatDate(item.endTime)
        item.beginAt = formatDate(item.beginAt)
        item.endAt = formatDate(item.endAt)
        item.count = 0
    })
}

async function getUserAvatarName(id: number) {
    const { data } = await queryUserInfoApi({ id })
    return data.avatarName
}
//处理时间戳=>YY-MM-DD;
function formatDate(time: Date | string) {
    let year = new Date(time).getFullYear();
    let month = new Date(time).getMonth() + 1;
    let date = new Date(time).getDate();
    let months = month >= 10 ? month : '0' + month;
    let dates = date >= 10 ? date : '0' + date;
    return year + '-' + months + '-' + dates;
}
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
    getActivityList({
        avatarName: queryOption.avatarName,
        status: queryOption.status,
        type: queryOption.type,
        pageSize: pageSize.value,
        pageNum: currentPage.value,
    })
}
function handleEdit(index: number, row: TableData) {
    console.log(index, row)
}
//一页显示条数改变时的回调;
function handleSizeChange(val: number) {
    pageSize.value = val
    queryActivityInfo()

}
//当前所在页码改变时的回调;
function handleCurrentChange(val: number) {
    currentPage.value = val
    queryActivityInfo()
}
async function getActivityNameList() {
    const { data } = await activityListApi({
        pageSize: 2147483647
    })
    activityNamelist.length = 0;
    data.list.forEach((item: { activityName: string }) => {
        activityNamelist.push(item.activityName)
    })
}


</script>

<template>
    <div class="flex-options">
        <el-form-item label="活动名称">
            <el-select v-model="queryOption.activityName" placeholder="请输入活动名称" filterable>
                <el-option v-for="item in activityNamelist" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="发起人">
            <el-select v-model="queryOption.avatarName" placeholder="请输入姓名" filterable>
                <el-option v-for="item in userAvatarNameList" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="报名状态">
            <el-select v-model="queryOption.status" placeholder="请输入报名状态">
                <el-option v-for="item in stateCodeArr" :key="item.id" :label="item.status" :value="item.value" />
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
            <el-button type="danger" @click="router.push('createActivity')">
                <el-icon>
                    <Plus />
                </el-icon>
                <span>创建活动</span>
            </el-button>
            <el-button type="danger" @click="queryActivityInfo">
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
        <el-table-column label="活动类型" align="center">
            <template #default="scope">
                {{ activityType[scope.row.type] }}
            </template>
        </el-table-column>
        <el-table-column label="发起人" prop="avatarName" align="center">
        </el-table-column>
        <el-table-column label="报名人数" prop="count" align="center" />
        <el-table-column label="报名状态" align="center">
            <template #default="scope">
                <el-tag :type="tagType[scope.row.registrationStatus]">{{ stateCode[scope.row.registrationStatus] }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="活动状态" align="center">
            <template #default="scope">
                <el-tag :type="tagType[scope.row.activityStatus]">{{ stateCode[scope.row.activityStatus] }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="报名起止日期"  align="center">
            <template #default="scope">
                <div>{{ scope.row.beginAt }}</div>至 <div>{{ scope.row.endAt }}</div>
            </template>
        </el-table-column>

        <el-table-column label="活动起止日期"  align="center">
            <template #default="scope">
                <div>{{ scope.row.startTime }}</div>至 <div>{{ scope.row.endTime }}</div>
            </template>
        </el-table-column>
        <el-table-column label="活动描述" prop="activityDesc" align="center" />
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <div class="flex-col">
                    <el-link type="primary" @click="handleEdit(scope.$index, scope.row)">管理</el-link>
                    <el-link type="success" @click="handleEdit(scope.$index, scope.row)" class="ml-10">二维码</el-link>
                    <el-link type="warning" @click="handleEdit(scope.$index, scope.row)" class="ml-10">报名名单</el-link>
                </div>
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

.flex-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
</style>