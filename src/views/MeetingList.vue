<!-- <script setup lang="ts">

</script>

<template>
    <div>
      我是会议列表页面
    </div>
    <script setup lang="ts">
import { reactive, ref } from "vue";
const pageNum = ref(1)
const pageSize = ref(10)
const total = ref()
const disabled = ref(false)
const searchForm: any = reactive({
    userId: '',
    level: '',
    status: ''
})

//分页
const handleSizeChange = (val: number) => {
    console.log(`一页有${val} `)
    pageSize.value = val

}
const handleCurrentChange = (val: number) => {
    console.log(`当前几页 :${val}`)
    pageNum.value = val
   
}
</script>

<template>
     <el-form :inline="true">
        <el-form-item label="接收人">
            <el-select v-model="searchForm.userId" placeholder="请选择接收人">
                <el-option v-for="item in " :key="item.userId" :label="item.avatarName" :value="item.userId" />
            </el-select>
        </el-form-item>
        <el-form-item label="紧急程度">
            <el-select v-model="searchForm.level" placeholder="按紧急程度查询">
                <el-option v-for="item in " :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="任务状态">
            <el-select v-model="searchForm.status" placeholder="按任务状态查询">
                <el-option v-for="status in " :key="status.value" :label="status.label"
                    :value="status.value" />
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="" type="danger">查询</el-button>
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
</template>



<style scoped>

</style>
</template>



<style scoped>

</style> -->