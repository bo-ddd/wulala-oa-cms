<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { Task, QueryTask } from "../types/Task";
import { useStore } from "../stores/nav";
import { usePageSizeOptionsStore } from '@/stores/tools'
import { storeToRefs } from "pinia";
import {  getUserTaskListApi,getUserListApi,setUserTaskStatusApi} from "@/assets/api/api";
let userStore = useStore()
const labelPosition = ref('right')

const pageSizeOptionsStore = usePageSizeOptionsStore()
pageSizeOptionsStore.getStorageStatus()
const { defaultValue } = storeToRefs(pageSizeOptionsStore)

let dialogFormVisible = ref(false)
let dialogDetailsVisible = ref(false)
let drawer = ref(false)
let userTaskList = reactive<Task[]>([])
let taskStatus = ref(0)
let taskId = ref(0)
let myself = ref()
let allUsers = ref()
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref()
const disabled = ref(false)
//查看详情 
const Details: any = reactive({
    taskName: '',
    taskDesc: '',
    level:0
})
const searchForm: any = reactive({
    userId: '',
    level: '',
    status: ''
})
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

const levelList = [
    {
        value: '',
        label: '全部',
    },
    {
        value: 0,
        label: '普通',
    },
    {
        value: 1,
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
// 从pinio中拿到用户设置的默认值;
if (defaultValue.value) {
    pageSize.value = defaultValue.value
}
getUserList()

//刚进页面调用户任务列表接口
getUserTaskList({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    userId:userStore.userId
})


//封装用户任务列表
 async function getUserTaskList(params: QueryTask) {
    let res = await getUserTaskListApi(params)
    if (res.status == 1) {
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
async function getUserList() {
    let res = await getUserListApi({
        pageSize: 2147483647   //int类型最大值
    })
    if (res.status == 1) {
        let arr = res.data.list
        myself.value = arr.filter((item: any) => item.userId == userStore.userId);
        allUsers.value = arr.filter((item: any) => item.userId != userStore.userId);
        allUsers.value.unshift(myself.value[0])

    }
}
//点击任务状态按钮
const updateTask = (row: Task) => {
    taskStatus.value = row.status;
    taskId.value = row.taskId;
    dialogFormVisible.value = true;
}
//状态弹层确定
const submitTaskStatus = async function () {
    let res = await setUserTaskStatusApi({
        taskId: taskId.value,
        status: taskStatus.value
    })
    if (res.status == 1) {
        dialogFormVisible.value = false;
        getUserTaskList({
            pageNum: pageNum.value,
            pageSize: pageSize.value,
    userId:userStore.userId

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
        userId:userStore.userId

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
        userId:userStore.userId

    })
}
//搜索
const queryTask = () => {
    getUserTaskList({
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        status: searchForm.status,
        level: searchForm.level ,
        userId: searchForm.userId
    })
}
const viewDetails = (row: Task) => {
    console.log(row);
    Details.taskName = row.taskName;
    Details.taskDesc = row.description;
    Details.level = taskLevelName(row.level)
    drawer.value = true

}
</script>
<template>
    <el-form :inline="true">
        <el-form-item label="接收人">
            <el-select v-model="searchForm.userId" placeholder="请选择接收人">
                <el-option v-for="item in allUsers" :key="item.userId" :label="item.avatarName" :value="item.userId" />
            </el-select>
        </el-form-item>
        <el-form-item label="紧急程度">
            <el-select v-model="searchForm.level" placeholder="按紧急程度查询">
                <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
            <el-select v-model="searchForm.status" placeholder="按任务状态查询">
                <el-option v-for="status in statusList" :key="status.value" :label="status.label"
                    :value="status.value" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="queryTask" type="danger">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="userTaskList" style="width: 100%">
        <el-table-column label="ID" align="center">
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
                <div v-if="scope.row.description" class="nowrap">{{ scope.row.description }}</div>
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
                <div v-if="scope.row.level == 1" class="red">{{ taskLevelName(scope.row.level) }}</div>
                <div v-else>{{ taskLevelName(scope.row.level) }}</div>
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
                    <el-link type="primary" @click="viewDetails(scope.row)">查看详情</el-link>
                </span>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block mt-20 ">
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 底部提示框 -->
    <AffixTip class="mt-20"></AffixTip>

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

    <el-drawer
    v-model="drawer"
    title="查看详情"
  >
  <el-form :label-position="labelPosition" label-width="100px" :model="Details" style="max-width: 460px">
            <el-form-item label="任务名称:">
                <span>{{ Details.taskName }}</span>
            </el-form-item>
            <el-form-item label="紧急程度:">
                <span>{{ Details.level }}</span>
            </el-form-item>
            <el-form-item label="任务描述:">
                <span v-if="Details.taskDesc">{{ Details.taskDesc }}</span>
                <span v-else class="noDesc">暂无描述…</span>
            </el-form-item>
           
        </el-form>
  </el-drawer>


    <!-- <el-dialog v-model="dialogDetailsVisible" title="查看当前详情">
        <el-form :label-position="labelPosition" label-width="100px" :model="Details" style="max-width: 460px">
            <el-form-item label="任务名称:">
                <span>{{ Details.taskName }}</span>
            </el-form-item>
            <el-form-item label="任务描述:">
                <span v-if="Details.taskDesc">{{ Details.taskDesc }}</span>
                <span v-else class="noDesc">暂无描述…</span>
            </el-form-item>
           
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogDetailsVisible = false">取消</el-button>
             </span>
        </template>
    </el-dialog> -->

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

.demo-progress .el-progress--line[data-v-371f9cea] {
    height: 30px;
    width: 363px;
}

.nowrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.red {
    color: red;
}
</style>