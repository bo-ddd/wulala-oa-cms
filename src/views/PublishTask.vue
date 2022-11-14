<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from "@/assets/api/api";
import { ElMessage, ElMessageBox } from 'element-plus'
let isCreated = ref(true);
//分页
const pageNum = ref(1)
const pageSize = ref(10)
const disabled = ref(false)
const total = ref()

const handleSizeChange = (val: number) => {
    console.log(`一页有${val} `)
    pageSize.value = val
    getTaskList()
}
const handleCurrentChange = (val: number) => {
    console.log(`当前几页 :${val}`)
    pageNum.value = val
    getTaskList()
}
let taskList = reactive<Task[]>([])
const searchTaskName = ref('')
let dialogFormVisible = ref(false)
const formLabelWidth = '140px'
let title = ref<string>()

//1. 声明一个变量，这个变量一开始没有值的时候
// 2. 声明方法的时候；
// 3. provide  inject

let form = reactive({
    taskName: '',
    description: '',
    level: 0,
    id: 0,
})
interface Task {
    avatarName: string
    createdAt?: string
    id: number,
    taskName: string,
    description: string,
    level: number,
    sort?: number,
    userId: number
}
//搜索
const searchTask = async function () {
    let res = await axios.getTaskListApi({
        taskName: searchTaskName.value
    })
    let data = res.data.list;
    console.log(data);
    taskList.length = 0;
    taskList.push(...data)
}
//封装列表接口
let getTaskList = async function () {
    let res = await axios.getTaskListApi({
        pageNum: pageNum.value,
        pageSize: pageSize.value,
    })
    let data = res.data.list;
    total.value = res.data.total;
    pageSize.value = res.data.pageSize;
    pageNum.value = res.data.pageNum;
    console.log(data);
    taskList.length = 0;
    taskList.push(...data)

}
getTaskList()

//确定删除
const deleteTask = (index: number, row: Task) => {
    console.log(index, row)
    ElMessageBox.confirm(
        '是否确定删除此任务?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(async () => {
            await axios.deleteTaskApi({
                id: row.id
            })
            getTaskList()
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除已取消',
            })
        })
}
//新增任务按钮
const creatTask = function () {
    isCreated.value = true;
    dialogFormVisible.value = true;
    title.value = '新建任务'
    initFormData();
}
//初始化
const initFormData = function () {
    form.taskName = '';
    form.description = '';
    form.level = 0;  
}
const updateTaskDuplicate=function(row:Task){

}
//点击修改按钮
const updateTask = (index: number, row: Task) => {
    isCreated.value = false;
    dialogFormVisible.value = true;
    console.log(index, row)
    title.value = '修改任务'
    updateTaskDuplicate(row)
   
}
//是新增
const submitTaskWithCreate = async function () {
    let res = await axios.createTaskApi({
        taskName: form.taskName,
        level: form.level,
        description: form.description,
    })
    if (res.status == 1) {
        initFormData();
        getTaskList()
        dialogFormVisible.value = false;
    }
}
//是修改
const submitTaskWithEdit = async function () {
    await axios.updateTaskApi({
        id: form.id,
        taskName: form.taskName,
        description: form.description,
        level: form.level,
    })
    getTaskList()
    dialogFormVisible.value = false;
}
//判断是新增还是修改
const submitTask = function () {
    isCreated.value ? submitTaskWithCreate() : submitTaskWithEdit();
}

// 任务等级
const taskLevelName = function (level: number | string) {
    return level == 0 ? '普通' : "紧急"
}

</script>
<template>
    <div class="search mb-10">
        <el-input v-model="searchTaskName" placeholder="输入名称搜索" size="small" />
        <el-button type="danger" class="ml-10" plain size="small" @click="searchTask">
            <el-icon>
                <Search />
            </el-icon>
            <span>搜索</span>
        </el-button>
        <el-button type="danger" size="small" @click="creatTask">
            <el-icon>
                <Plus />
            </el-icon>
            <span>新增</span>
        </el-button>
    </div>
    <el-table :data="taskList" style="width: 100%" class="mb-10">
        <el-table-column label="任务Id" align="center">
            <template #default="scope" align="center">
                <el-popover effect="light" width="auto">
                    <template #reference align="center">
                        <div>{{ scope.row.id }}</div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="任务序号" align="center">
            <template #default="scope" align="center">
                <span style="margin-left: 10px">{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="任务名称" align="center">
            <template #default="scope" align="center">
                <el-popover effect="light" placement="top" width="auto">
                    <template #reference align="center">
                        <div>{{ scope.row.taskName }}</div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
            <template #default="scope" align="center">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #reference align="center">
                        <div>{{ scope.row.description }}</div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="等级" align="center">
            <template #default="scope" align="center">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #reference align="center">
                        <div>{{ taskLevelName(scope.row.level) }}</div>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="发布人" align="center">
            <template #default="scope" align="center">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #reference align="center">
                        <el-tag>{{ scope.row.avatarName }}</el-tag>
                    </template>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button size="small" @click="updateTask(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteTask(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <el-dialog v-model="dialogFormVisible" :title="title">
        <el-form :model="form">
            <el-form-item label="任务Id" :label-width="formLabelWidth" v-if="!isCreated">
                <el-input v-model="form.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="任务名称" :label-width="formLabelWidth">
                <el-input v-model="form.taskName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="任务描述" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="任务等级" :label-width="formLabelWidth">
                <el-radio-group v-model="form.level">
                    <el-radio :label="0">普通</el-radio>
                    <el-radio :label="1">紧急</el-radio>
                </el-radio-group>
                <!-- <el-input v-model="form.level" autocomplete="off" /> -->
            </el-form-item>

        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitTask">
                    确定
                </el-button>

            </span>
        </template>
    </el-dialog>
   
</template>

<style scoped>
.search {
    display: flex;
}

.el-input {
    width: 200px;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>