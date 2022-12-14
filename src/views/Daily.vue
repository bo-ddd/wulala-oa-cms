<script setup lang="ts">
import { getArticleListApi } from '../assets/api/api'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { usePageSizeOptionsStore } from '@/stores/tools'
import { storeToRefs } from "pinia";
import type { TableData , UserDailyListParam } from '@/types/Daily'

const pageSizeOptionsStore = usePageSizeOptionsStore()
pageSizeOptionsStore.getStorageStatus()
const { defaultValue } = storeToRefs(pageSizeOptionsStore)
const router = useRouter()
const currentPage = ref(1) //当前是第几页;
const pageSize = ref(10)  //每页显示的条数;
const total = ref(0)
const tableData = reactive<TableData[]>([])
// 从pinio中拿到用户设置的默认值;
if (defaultValue.value) {
    pageSize.value = defaultValue.value
}

//每页显示条数改变时的回调;
const handleSizeChange = (val: number) => {
    pageSize.value = val
    queryDailyDetail()
}
//改变页数时的回调;
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    queryDailyDetail()
}

//获取日报列表数据;
const getDailyList = async (param: UserDailyListParam) => {
    let { data } = await getArticleListApi(param)
    total.value = data.total;
    tableData.length = 0;
    Object.assign(tableData, data.list)
    tableData.forEach(async (item) => {
        item.createdAt = handleTimeFormat(item.createdAt) //创建时间
    })
}

//刷新页面，初始化数据列表;
getDailyList({
    pageSize: pageSize.value,
    pageNum: currentPage.value
})

//处理时间数据格式Api;
const handleTimeFormat = (Time: string) => {
    return Time.substring(0, 10)
}

//点击查看详情按钮的跳转事件;
const handleEdit = (index: number, row: TableData) => {
    router.push({
        name: 'dailyDetail',
        query: {
            id: row.id
        }
    })
}

//查询选项;
const queryOption: any = reactive({
    title: '',
    duration: '',
})

//查询日报详情;
const queryDailyDetail = () => {
    getDailyList({
        title: queryOption.title,
        startCreatedTime: queryOption.duration[0],  //开始时间
        endCreatedTime: queryOption.duration[1], //结束时间
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
}

</script>

<template>
    <div class="flex-options">
        <el-input v-model="queryOption.title" size="small" clearable placeholder="请输入标题内容" :prefix-icon="Search" />
        <el-date-picker v-model="queryOption.duration" type="daterange" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间" size="small" />
        <el-button size="small" type="danger" @click="queryDailyDetail">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" class="mt-24">
        <el-table-column label="ID" prop="id" align="center" />
        <el-table-column label="姓名" align="center">
            <template #default="scope">
                <el-tag size="small">{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="标题" align="center">
            <template #default="scope">
                <el-tag size="small">{{ scope.row.title }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="创建日期" sortable prop="createdAt" align="center" />
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-link class="detail" type="danger" @click="handleEdit(scope.$index, scope.row)">查看详情</el-link>
            </template>
        </el-table-column>

    </el-table>
    <!-- 分页 -->
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20, 25, 30]"
        layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" class="mt-20" />

        <AffixTip class="mt-20"></AffixTip>
</template>

<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}
.detail{
    color: coral;
}
a:hover{
color: red;
cursor: pointer;
}
.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
.flex-options {
    display: flex;
    width: 50%;
    gap: 12px;
}

</style>