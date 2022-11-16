<script lang="ts" setup>
import axios from "@/assets/api/api";
import { reactive, ref } from "vue";
import type { Task } from "../types/Task";
let dialogFormVisible = ref(false)
let userTaskList = reactive<Task[]>([])
let taskStatus = ref(1)
let taskId = ref(0)
let rowTaskId = ref(0)
let taskReception = ref([])

//封装用户任务列表
const getUserTaskList = async function () {
    let res = await axios.getUserTaskListApi()
    if (res.status == 1) {
        console.log(res);
        userTaskList.length = 0
        userTaskList.push(...res.data.list)
        console.log(userTaskList);
        userTaskList.forEach(item => {
            taskId.value = item.id
        })
    }
}
getUserTaskList()

const deleteTask = (index: number, row: Task) => {
    console.log(index, row)
}
const updateTask = (row: Task) => {
    console.log(row)
    dialogFormVisible.value = true;

}
const submitTaskStatus = async function () {
    let res = await axios.setUserTaskStatusApi({
        taskId: taskId.value,
        status: taskStatus.value
    })
    if (res.status == 1) {
        dialogFormVisible.value = false;
        getUserTaskList()
    }
}

const taskLevelName = function (level: number | string) {
    return level == 0 ? '普通' : "紧急"
}
const taskStatusName = function (status: number | string) {
    switch (status) {
        case 0:
            return "未开始";
        case 1:
            return "进行中";
        case 2:
            return "已完成";
        case 3:
            return "已过期";
    }
}
const clickSelection = function (row: any) {
    rowTaskId.value = row[0].id
    console.log(rowTaskId.value); //当前行任务id
}

const taskRecipient = function (val: any) {
    taskReception.value = val
    console.log('-----任务接收人----');
    console.log(taskReception.value);

}
</script>
<template>
  
    <el-table :data="userTaskList" style="width: 100%" class="mb-10" @select='clickSelection'>
        <el-table-column type="selection" width="55" />
        <el-table-column label="任务Id" align="center">
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
                <div>{{ scope.row.description }}</div>
            </template>
        </el-table-column>
        <el-table-column label="等级" align="center">
            <template #default="scope" align="center">
                <div>{{ taskLevelName(scope.row.level) }}</div>
            </template>
        </el-table-column>
        <el-table-column label="发布人" align="center">
            <template #default="scope" align="center">
                <el-tag>{{ scope.row.senderAvatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="任务状态" align="center">
            <template #default="scope" align="center">
                <el-tag>{{ taskStatusName(scope.row.status) }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
            <template #default="scope">
                <el-button size="small" @click="updateTask(scope.row)" type="danger">任务状态</el-button>
                <el-button size="small" type="danger" plain @click="deleteTask(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="任务状态">
        <el-radio-group v-model="taskStatus" align="center">
            <el-radio :label="0">未开始</el-radio>
            <el-radio :label="1">进行中</el-radio>
            <el-radio :label="2">已完成</el-radio>
            <el-radio :label="3">已过期</el-radio>
        </el-radio-group>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="submitTaskStatus">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

</template>
<style>
.el-dialog__body {
    align-items: center;
}

.el-input__wrapper {
    width: 200px;
}
</style>