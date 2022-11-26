<script setup lang="ts">
import { reactive, ref } from 'vue'
import axios from "@/assets/api/api";
import type { Dept, DeptMember } from "../types/Dept";

import { ElMessage, ElMessageBox } from 'element-plus'
import type { Task } from "../types/Task";
import { useStore } from "@/stores/nav";

let userStore = useStore()
let isCreated = ref(true);
let rowTaskId = ref(0)
const deptValue = ref()
const deptMembersValue = ref()
let deptList = reactive<Dept[]>([])
let deptMembersList = reactive<DeptMember[]>([])
let taskReception = ref([])
let deptId = ref(0)
//分页
const pageNum = ref(1)
const pageSize = ref(10)
const disabled = ref(false)
const total = ref()
let taskList = reactive<Task[]>([])
const searchTaskName = ref('')
let dialogFormVisible = ref(false)
let dialogTaskVisible = ref(false)
const formLabelWidth = '140px'
let title = ref<string>()

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

let form = reactive({
    taskName: '',
    description: '',
    level: 0,
    id: 0,
})
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
    taskList.length = 0;
    taskList.push(...data)

}
//封装获取组中所有用户
const queryUserMembers = async function () {
    let res = await axios.queryUserMembersApi({
        deptId: deptId.value
    })
    if (res.status == 1) {
        deptMembersList.length = 0;
        deptMembersList.push(...res.data)
    }
}
//获取用户所在的组列表
const getUserDeptList = async function () {
    let res = await axios.getUserDeptListApi({
        userId: userStore.userId
    })
    if (res.status == 1) {
        res.data.forEach((dept: any) => {
            deptId.value = dept.deptId
        })
        deptList.push(...res.data)
    }
}
//发布任务接口
const publishTask = function () {
    const userArr: any[] = []
    if (taskReception.value.length) {
        taskReception.value.forEach((item: number) => {
            userArr.push(axios.publishTaskApi({
                userId: item,
                taskId: rowTaskId.value
            })
            )
            Promise.all(userArr).then(res => {
                if (res[0].status == 1) {
                    ElMessage({
                        message: '发布成功',
                        type: 'success',
                    })
                    createMessage({
                        content: '您已收到一条任务，快去查看吧！'
                    })
                    initFormData()
                    dialogTaskVisible.value = false;
                } else {
                    ElMessage({
                        message: res[0].msg,
                        type: 'warning',
                    })
                }
            })
        })
    }

}
//领取任务接口
const receivePublishTask = async function (params: any) {
    let res = await axios.publishTaskApi(params)
    if (res.status == 1) {
        console.log(res);
        ElMessage({
            message: '领取成功',
            type: 'success',
        })
        createMessage({
            content: '您已成功领取一条任务，快去完成吧'
        })
    } else {
        ElMessage({
            message: res.msg,
            type: 'warning',
        })
    }
}
/// 生成消息接口
const createMessage = async function (content: { content: string; }) {
    let res = await axios.createMessageApi(content)
}
getTaskList()
getUserDeptList()
//确定删除
const deleteTask = (row: Task) => {
    ElMessageBox.confirm(
        '是否确定删除此任务?',
        '删除任务',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            let res = await axios.deleteTaskApi({
                id: row.id
            })
            if (res.status == 1) {
                getTaskList()
            } 
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
    deptValue.value = ''
    deptMembersValue.value = ''

}
const updateTaskDuplicate = function (row: Task) {
    form.id = row.id;
    form.description = row.description;
    form.taskName = row.taskName;
    form.level = row.level
}
//点击修改按钮
const updateTask = (index: number, row: Task) => {
    isCreated.value = false;
    dialogFormVisible.value = true;
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

//点击任务接收人获取id
const taskRecipient = function (val: any) {
    taskReception.value = val

}
//点击发布任务按钮
const clickPublishTask = function (row: Task) {
    rowTaskId.value = row.id
    console.log(rowTaskId.value);
    dialogTaskVisible.value = true;

}
//用户所在分组
const groupChange = function (val: number) {
    deptId.value = val
    queryUserMembers()
}
//点击发布消息弹层确定
const submitPublishTask = function () {
    publishTask()

}
//点击领取任务按钮
const receiveTask = function (row: Task) {
    receivePublishTask({
        userId: userStore.userId,
        taskId: row.id
    })
}

</script>
<template>
    <div class="search">
        <el-input v-model="searchTaskName" placeholder="输入名称搜索" />
        <el-button type="danger" class="ml-10" plain @click="searchTask">
            <el-icon>
                <Search />
            </el-icon>
            <span>搜索</span>
        </el-button>
        <el-button type="danger" @click="creatTask">
            <el-icon>
                <Plus />
            </el-icon>
            <span>新增</span>
        </el-button>

    </div>
    <el-table :data="taskList" style="width: 100%" class="mt-20">
        <el-table-column label="ID" align="center">
            <template #default="scope" align="center">
                <div>{{ scope.row.id }}</div>
            </template>
        </el-table-column>
        <el-table-column label="任务名称" align="center">
            <template #default="scope" align="center">
                <div>{{ scope.row.taskName }}</div>
            </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
            <template #default="scope" align="center">
                <el-popover effect="light" trigger="hover" placement="top" width="auto">
                    <template #default>
                        <div v-if="scope.row.description" >{{ scope.row.description }}</div>
                        <div v-else class="noDesc">暂无描述…</div>
                    </template>
                    <template #reference>
                        <div v-if="scope.row.description" class="nowrap">{{ scope.row.description }}</div>
                        <div v-else class="noDesc">暂无描述…</div>
                    </template>
                </el-popover>

            </template>
        </el-table-column>
        <el-table-column label="等级" align="center">
            <template #default="scope" align="center">
                <div>{{ taskLevelName(scope.row.level) }}</div>
            </template>
        </el-table-column>
        <el-table-column label="发布人" align="center">
            <template #default="scope" align="center">
                <el-tag>{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
            <template #default="scope" align="center">
                <span class="flex-row">
                    <el-link type="success" @click="receiveTask(scope.row)" v-if="scope.row.userId != userStore.userId">
                        领取任务</el-link>
                    <el-link type="primary" @click="clickPublishTask(scope.row)"
                        v-if="scope.row.userId == userStore.userId">发布任务</el-link>
                    <el-link type="warning" @click="updateTask(scope.$index, scope.row)">编辑</el-link>
                    <el-link type="info" @click="deleteTask(scope.row)" v-if="scope.row.userId == userStore.userId">删除
                    </el-link>
                </span>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block mt-20">
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <el-dialog v-model="dialogFormVisible" :title="title">
        <el-form :model="form">
            <el-form-item label="任务Id" :label-width="formLabelWidth" v-if="!isCreated">
                <el-input v-model="form.id" disabled autocomplete="off" />
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
    <!-- //发送任务弹层 -->
    <el-dialog v-model="dialogTaskVisible" title="发布消息">
        <el-form-item label="所在组">
            <el-select v-model="deptValue" placeholder="请选择组" @change="groupChange">
                <el-option v-for="(group, index) in deptList" :key="index" :label="group.deptName"
                    :value="group.deptId" />
            </el-select>
        </el-form-item>
        <el-form-item label="接收人">
            <el-select v-model="deptMembersValue" multiple placeholder="请选择接收人" @change="taskRecipient">
                <el-option v-for="(item, index) in deptMembersList" :key="index" :label="item.avatarName"
                    :value="item.userId" />
            </el-select>
        </el-form-item>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogTaskVisible = false">取消</el-button>
                <el-button type="primary" @click="submitPublishTask">
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
    width: 200px;
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

.el-pager {
    margin: 0 4px;
}

.el-link {
    margin-right: 8px;
}

.el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
}

.noDesc {
    font-size: 10px;
    color: #ccc;
}

.flex-row {
    display: flex;
    justify-content: space-between;
}

.nowrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>