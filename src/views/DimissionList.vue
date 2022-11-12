<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

//分页参数;
const currentPage = ref(1) //当前是第几页;
const pageSize = ref(10)  //每页显示的条数;
let total = computed(() => tableData.length)
let startPage = computed(() => pageSize.value * (currentPage.value - 1))
let endPage = computed(() => pageSize.value * currentPage.value)

//每页显示条数改变时的回调;
const handleSizeChange = (val: number) => {
    pageSize.value = val
    formatList()
}
//改变页数时的回调;
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    formatList()
}
//离职列表总数据;
let tableData = reactive<User[]>([
    {
        department: "市场部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '熊大',
        reason: '待遇不理想',
        phone: '18226588562',
        address: '3650 21st St, San Francisco',
        family: [
            {
                name: 'Jerry',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Spike',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Tyke',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
        ],
    },
    {
        department: "技术部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '熊二',
        reason: '夫妻两地分居',
        phone: '18226588562',
        address: '3650 21st St, San Francisco',
        family: [
            {
                name: 'Jerry',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Spike',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Tyke',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
        ],
    },
    {
        department: "客服部",
        entryDate: '2016-05-04',
        leaveDate: '2018-06-15',
        name: '张三',
        reason: '离家太远',
        phone: '18226588562',
        address: '3650 21st St, San Francisco',
        family: [
            {
                name: 'Jerry',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Spike',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Tyke',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
        ],
    },
    {
        department: "财务部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '李四',
        reason: '工作压力太大',
        phone: '18226588562',
        address: '3650 21st St, San Francisco',
        family: [
            {
                name: 'Jerry',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Spike',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Tyke',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
        ],
    },
    {
        department: "人事部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '王五',
        reason: '职业前景不理想',
        phone: '18226588562',
        address: '3650 21st St, San Francisco',
        family: [
            {
                name: 'Jerry',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Spike',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Tyke',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
        ],
    },
    {
        department: "后勤部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '赵六',
        reason: '工作压力大',
        phone: '18226588562',
        address: '3650 21st St, San Francisco',
        family: [
            {
                name: 'Jerry',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Spike',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Tyke',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
        ],
    },
    {
        department: "师资部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '小七',
        reason: '待遇不理想',
        phone: '18226588562',
        address: '3650 21st St, San Francisco',
        family: [
            {
                name: 'Jerry',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Spike',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
            {
                name: 'Tyke',
                familyRelations: 'California',
                work: 'San Francisco',
                phone: '18234065168',
            },
        ],
    },
])


const newData = reactive<User[]>([]) //页面上渲染的数据;
Object.assign(newData, tableData) //初始化默认显示;
const formatList = () => {
    newData.length = 0
    Object.assign(newData, tableData.slice(startPage.value, endPage.value))
}

interface Family {
    name: string,
    familyRelations: string,
    work: string,
    phone: string,
}

interface User {
    department: string,
    entryDate: string,
    leaveDate: string,
    name: string,
    reason: string,
    phone: string,
    address: string,
    family: Family[]
}

//编辑按钮的点击事件;
const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}

//删除按钮的点击事件;
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}
</script>

<template>
    <el-table :data="newData" style="width: 100%">
        <el-table-column type="expand">
            <template #default="props">
                <div m="4">

                    <p m="t-0 b-2" align="center">联系方式: {{ props.row.phone }}</p>
                    <p m="t-0 b-2" align="center">家庭住址: {{ props.row.address }}</p>

                    <h3 align="center" class="mt-20">家庭信息</h3>
                    <el-table :data="props.row.family">
                        <el-table-column label="姓名" prop="name" align="center" />
                        <el-table-column label="家庭关系" prop="familyRelations" align="center" />
                        <el-table-column label="工作" prop="work" align="center" />
                        <el-table-column label="联系方式" prop="phone" align="center" />
                    </el-table>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="部门" prop="department" align="center" />
        <el-table-column label="姓名" align="center">
            <template #default="scope">
                <el-tag size="small">{{ scope.row.name }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="入职日期" sortable prop="entryDate" align="center" />
        <el-table-column label="离职日期" sortable prop="leaveDate" align="center" />
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