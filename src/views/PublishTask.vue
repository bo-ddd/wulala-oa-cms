<script lang="ts" setup>
import axios from "@/assets/api/api";
import { reactive, ref } from "vue";
import type { Dept, DeptMember } from "../types/Dept";
import type { Task } from "../types/Task";
import { useStore } from "@/stores/nav";
let UserStore = useStore()
let dialogFormVisible = ref(false)
let userTaskList = reactive<Task[]>([])
let deptList = reactive<Dept[]>([])
let deptMembersList = reactive<DeptMember[]>([])
let taskStatus = ref(1)
let taskId = ref(0)
let deptId = ref(0)
let rowTaskId = ref(0)
const deptValue = ref([])
const deptMembersValue = ref([])
//封装用户任务列表
const getUserTaskList = async function () {
    let res = await axios.getUserTaskListApi()
    if (res.status == 1) {
        console.log(res);
        userTaskList.length = 0
        userTaskList.push(res.data.list[0])
        console.log(userTaskList);
        userTaskList.forEach(item => {
            taskId.value = item.id
        })
    }
}
//获取用户所在的组列表
const getUserDeptList = async function () {
    let res = await axios.getUserDeptListApi({
        userId: UserStore.userId
    })
    if (res.status == 1) {
        res.data.forEach((dept: any) => {
            deptId.value=dept.deptId
        })
        console.log(deptId.value);  ///当前组id
        deptList.push(...res.data)
    }
}
//封装获取组中所有用户
const queryUserMembers = async function () {
    let res = await axios.queryUserMembersApi({
        deptId: deptId.value
    })
    if (res.status == 1) {
        console.log(res);
        deptMembersList.push(...res.data)
        console.log(deptMembersList)
    }
}
//发布任务接口
const publishTask = async function () {
    let res = await axios.publishTaskApi({
        userId: 154,
        taskId: deptId.value
    })
    if (res.status == 1) {
        console.log(res);
    }
}

getUserTaskList()
getUserDeptList()

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
    rowTaskId.value=row[0].id
    console.log(rowTaskId.value); //当前行任务id
}

const clickPublishTask = function () {
    publishTask()


}
const groupChange = function (val: number) {
    deptId.value=val
    queryUserMembers()

}
</script>
<template>
    <div style="display: inline-block" class="mb-10">
        <el-select v-model="deptValue" clearable placeholder="用户所在分组" size="small" @change="groupChange">
            <el-option v-for="(group, index) in deptList" :key="index" :label="group.deptName" :value="group.deptId" />
        </el-select>
        <el-select v-model="deptMembersValue" multiple placeholder="任务接收人" style="width: 240px" size="small" class="ml-10">
            <el-option v-for="(item, index) in deptMembersList" :key="index" :label="item.avatarName"
                :value="item.userId" />
        </el-select>
        <el-button type="danger" round class="ml-10" size="small" @click="clickPublishTask">确定发布</el-button>
    </div>
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