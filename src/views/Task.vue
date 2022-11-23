<script lang="ts" setup>
import axios from "@/assets/api/api";
import { reactive, ref } from "vue";
import type { Task, QueryTask } from "../types/Task";
import { useStore } from "../stores/nav";
let userStore = useStore()
const labelPosition = ref('right')

let dialogFormVisible = ref(false)
let dialogDetailsVisible = ref(false)
let userTaskList = reactive<Task[]>([])
let taskStatus = ref(0)
let taskId = ref(0)
let myself = ref()
let allUsers = ref()
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref()
const disabled = ref(false)
const percentage = ref()  //百分比
const progressBarStatus = ref()  //百分比

const searchForm: any = reactive({
    userId: '',
    level: '',
    status: ''
})
//封装用户任务列表
const getUserTaskList = async function (params: QueryTask) {
    let res = await axios.getUserTaskListApi(params)
    if (res.status == 1) {
        console.log(res);
        total.value = res.data.total;
        pageSize.value = res.data.pageSize;
        pageNum.value = res.data.pageNum;
        userTaskList.length = 0
        userTaskList.push(...res.data.list)
        console.log(userTaskList);
        userTaskList.forEach(item => {
            taskId.value = item.id
        })
    }
}
//获取用户列表
const getUserList = async function () {
    let res = await axios.getUserListApi({
        pageSize: 2147483647   //int类型最大值
    })
    if (res.status == 1) {
        let arr = res.data.list
        myself.value = arr.filter((item: any) => item.userId == userStore.userId);
        allUsers.value = arr.filter((item: any) => item.userId != userStore.userId);
        allUsers.value.unshift(myself.value[0])

    }
}
//刚进页面调用户任务列表接口
getUserTaskList({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
})
getUserList()
//点击任务状态按钮
const updateTask = (row: Task) => {
    taskStatus.value = row.status;
    taskId.value = row.taskId;
    dialogFormVisible.value = true;
}
//状态弹层确定
const submitTaskStatus = async function () {
    let res = await axios.setUserTaskStatusApi({
        taskId: taskId.value,
        status: taskStatus.value
    })
    if (res.status == 1) {
        dialogFormVisible.value = false;
        getUserTaskList({
            pageNum: pageNum.value,
            pageSize: pageSize.value,
        })
    }
}
//处理等级
const taskLevelName = function (level: number | string) {
    return level == 0 ? '普通' : "紧急";
}
//分页
const handleSizeChange = (val: number) => {
    console.log(`一页有${val} `)
    pageSize.value = val
    getUserTaskList({
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        status: searchForm.status,
        level: searchForm.level == 1 ? 0 : searchForm.level == 2 ? 1 : null,
        userId: searchForm.userId
    })
}
const handleCurrentChange = (val: number) => {
    console.log(`当前几页 :${val}`)
    pageNum.value = val
    getUserTaskList({
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        status: searchForm.status,
        level: searchForm.level == 1 ? 0 : searchForm.level == 2 ? 1 : null,
        userId: searchForm.userId
    })
}
enum StateCode {
    未开始 = 0,
    进行中,
    已完成,
    已过期,
    
}

enum tagType {
    '' = 0,
    warning = 1,
    success,
    danger,
}

const queryTask = () => {
    getUserTaskList({
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        status: searchForm.status,
        level: searchForm.level == 1 ? 0 : searchForm.level == 2 ? 1 : null,
        userId: searchForm.userId
    })
}
const viewDetails = (row: Task) => {
    console.log(row);
    Details.taskName = row.taskName;
    Details.taskDesc = row.description;
    if (row.status == 0) {
        percentage.value = "0"
        progressBarStatus.value=''
    } else if (row.status == 1) {
        percentage.value = 50;
        progressBarStatus.value='warning'
    } else if (row.status == 2) {
        percentage.value = "100";
        progressBarStatus.value='success'
    } else if (row.status == 3) {
        percentage.value = "100"
        progressBarStatus.value='exception'
    }
    dialogDetailsVisible.value = true;

}
//查看详情 
const Details: any = reactive({
    taskName: '',
    taskDesc: '',
})



//查看详情弹层确定按钮
const DetailsSubmit = function () {

}
const levelList = [
    {
        value: 0,
        label: '全部',
    },
    {
        value: 1,
        label: '普通',
    },
    {
        value: 2,
        label: '紧急',
    },
]
const statusList = [
    {
        value: '',
        label: '全部',
    },
    {
        value: 0,
        label: '未开始',
    },
    {
        value: 1,
        label: '进行中',
    },
    {
        value: 2,
        label: '已完成',
    },
    {
        value: 3,
        label: '已过期',
    },
]

</script>
<template>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item >
            <el-select v-model="searchForm.userId" placeholder="请选择接收人">
                <el-option v-for="item in allUsers" :key="item.userId" :label="item.avatarName" :value="item.userId" />
            </el-select>
        </el-form-item>
        <el-form-item >
            <el-select v-model="searchForm.level" placeholder="按紧急程度查询">
                <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item >
            <el-select v-model="searchForm.status" placeholder="按任务状态查询">
                <el-option v-for="status in statusList" :key="status.value" :label="status.label"
                    :value="status.value" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="queryTask" type="danger">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="userTaskList" style="width: 100%" >
        <el-table-column label="任务Id" align="center">
            <template #default="scope" align="center">
                <div>{{ scope.row.id }}</div>
            </template>
        </el-table-column>

        <el-table-column label="领取人" align="center">
            <template #default="scope" align="center">
                <el-tag>{{ scope.row.receiveAvatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="任务名称" align="center">
            <template #default="scope" align="center">
                <div>{{ scope.row.taskName }}</div>
            </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
            <template #default="scope" align="center">
                <div v-if="scope.row.description">{{ scope.row.description }}</div>
                <div v-else class="noDesc">暂无描述…</div>
            </template>
        </el-table-column>
        <el-table-column label="发布人" align="center">
            <template #default="scope" align="center">
                <el-tag>{{ scope.row.senderAvatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="等级" align="center">
            <template #default="scope" align="center">
                <div>{{ taskLevelName(scope.row.level) }}</div>
            </template>
        </el-table-column>

        <el-table-column label="任务状态" align="center">
            <template #default="scope" align="center">
                <el-tag :type="tagType[scope.row.status]">{{ StateCode[scope.row.status] }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
            <template #default="scope" align="center">
                <span class="flex-row">
                    <el-link type="warning" @click="updateTask(scope.row)"
                        v-if="scope.row.receiveUserId == userStore.userId">任务状态</el-link>
                    <el-link type="danger" @click="viewDetails(scope.row)">查看详情</el-link>
                </span>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block mt-20 ">
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <!-- 状态弹层 -->
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
    <!-- //查看详情弹层 -->
    <el-dialog v-model="dialogDetailsVisible" title="查看当前详情">
        <el-form :label-position="labelPosition" label-width="100px" :model="Details" style="max-width: 460px">
            <el-form-item label="任务名称">
                <el-input v-model="Details.taskName" disabled />
            </el-form-item>
            <el-form-item label="任务描述">
                <el-input v-model="Details.taskDesc" disabled />
            </el-form-item>
            <el-form-item label="任务进度">
                <div class="demo-progress">
                    <el-progress :text-inside="true" :stroke-width="22" :percentage="percentage" :status="progressBarStatus" />
                    <span v-if="progressBarStatus=='exception'" style="color:red">已过期</span>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDetailsVisible = false">取消</el-button>
                <el-button type="danger" @click="DetailsSubmit">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>

</template>
<style scoped>
.el-dialog__body {
    align-items: center;
}

.el-input__wrapper {
    width: 200px;
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
    justify-content: space-around;
}

.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
}
.demo-progress .el-progress--line[data-v-371f9cea]{
    height: 30px;
    width: 363px;
}
</style>