<script lang="ts" setup>
import axios from "@/assets/api/api";
import { reactive, ref } from "vue";
import type { Task,QueryTask  } from "../types/Task";

let dialogFormVisible = ref(false)
let dialogDetailsVisible = ref(false)
let userTaskList = reactive<Task[]>([])
let taskStatus = ref(0)
let taskId = ref(0) 
let userId = ref(0) 
const pageNum = ref(1)
const pageSize = ref(5)
const total = ref()
const disabled = ref(false)

const searchForm: any = reactive({
    userId:'',
    level: '',
    status:''
})
const queryUserInfo=async function(){
   let res= await axios.queryUserInfoApi()
   if(res.status==1){
      console.log(res);
      userId.value=res.data.userId
   }
}

//封装用户任务列表
const getUserTaskList = async function (params:QueryTask) {
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
//刚进页面调接口
getUserTaskList({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
})
queryUserInfo()


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
    return level == 0 ? '普通' : "紧急"
}
///处理任务状态
// const taskStatusName = function (status: number | string) {
//     switch (status) {
//         case 0:
//             return "未开始";
//         case 1:
//             return "进行中";
//         case 2:
//             return "已完成";
//         case 3:
//             return "已过期";
//     }
// }
const handleSizeChange = (val: number) => {
    console.log(`一页有${val} `)
    pageSize.value = val
    getUserTaskList({ 
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        status: Number(StateCode[searchForm.status]),
        level:searchForm.level == '普通' ? 0 : searchForm.level == '紧急' ? 1:null,
        userId:searchForm.userId 
    })
}
const handleCurrentChange = (val: number) => {
    console.log(`当前几页 :${val}`)
    pageNum.value = val
    getUserTaskList({ 
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        status: Number(StateCode[searchForm.status]),
        level:searchForm.level == '普通' ? 0 : searchForm.level == '紧急' ? 1:null,
        userId:searchForm.userId 
    })
}
enum StateCode {
    未开始 = 0,
    进行中,
    已完成,
    已过期
}

enum tagType {
    '' = 0,
    warning=1,
    success,
    danger,
}


const queryTask = () => {
    getUserTaskList({ 
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        status: Number(StateCode[searchForm.status]),
        level:searchForm.level == '普通' ? 0 : searchForm.level == '紧急' ? 1:null,
        userId:searchForm.userId 
    })
}
const viewDetails = (index: number, row: Task) => {
    console.log(index, row)
    dialogDetailsVisible.value=true;
}
</script>
<template>
 <el-form :inline="true" :model="searchForm" class="demo-form-inline">
    <el-form-item label="用户">
      <el-input v-model="searchForm.userId" placeholder="请选择要查询的用户" size="small"/>
    </el-form-item>
    <el-form-item label="任务状态">
      <el-input v-model="searchForm.status" placeholder="按任务状态查询" size="small"/>
    </el-form-item>
    <el-form-item label="紧急程度">
      <el-input v-model="searchForm.level" placeholder="按紧急程度查询" size="small"/>
    </el-form-item>
    <el-form-item>
      <el-button @click="queryTask" type="danger" size="small">查询</el-button>
    </el-form-item>
  </el-form>
    <el-table :data="userTaskList" style="width: 100%" class="mb-10">
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
                <div>{{ scope.row.description }}</div>
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
            <template #default="scope">
                <el-button size="small" @click="updateTask(scope.row)" type="danger" v-if="scope.row.receiveUserId==userId">任务状态</el-button>
                <el-button size="small" type="danger"  @click="viewDetails(scope.$index, scope.row)">查看详情</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            :disabled="disabled" layout="total, sizes, prev, pager, next, jumper" :total="total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
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
       <div> 这是查看详情</div>
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
<style scoped>
.el-dialog__body {
    align-items: center;
}

.el-input__wrapper {
    width: 200px;
}
</style>