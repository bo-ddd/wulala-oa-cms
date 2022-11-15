<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useDimissionFormStore } from '@/stores/DimissionForm';
import { storeToRefs } from 'pinia';
const dimissionFormStore = useDimissionFormStore()
dimissionFormStore.setdimissionFormInfo()
const { dimissionFormInfo } = storeToRefs(dimissionFormStore)

const tableData = reactive([
    {
        class: '离职申请',
        name: '',
        applicationTime: '',
        status: ''
    }
])
tableData[0].name = dimissionFormInfo.value[0].name;
tableData[0].applicationTime = dimissionFormInfo.value[0].applicationTime;

enum StateCode {
    审核中 = 0,
    审核已通过,
    审核未通过
}
enum tagType {
    '' = 0,
    success,
    danger,

}
tableData[0].status = StateCode[0]
//查看申请的点击事件;
const getApplicationInfo = () => {
    dialogFormVisible.value = true
};
//取消申请的点击事件;
const cancelApplication = () => { };
//查看审核结果的点击事件;
const getApplicationResult = () => { };

//弹出框;
const dialogFormVisible = ref(false)
const formLabelWidth = '140px';

</script>

<template>
    <div class="process mt-24">
        <el-table :data="tableData" :border='false' style="width: 100%">
            <el-table-column prop="class" label="类别" width="180" align="center" />
            <el-table-column prop="name" label="姓名" width="180" align="center" />
            <el-table-column prop="applicationTime" label="申请时间" width="180" align="center" />
            <el-table-column prop="status" label="审核状态" width="180" align="center">
                <template #default="scope">
                    <el-tag :type="tagType[0]" size="small">{{ tableData[0].status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <div v-show="tableData[0].status == '审核中'">
                    <el-button size="small" @click="getApplicationInfo" text>查看申请</el-button>
                    <el-button size="small" type="danger" @click="cancelApplication">取消申请</el-button>
                </div>
                <div v-show="tableData[0].status !== '审核中'">
                    <el-button size="small" type="danger" @click="getApplicationResult">查看审核结果</el-button>
                </div>

            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" title="离职申请表">
        <el-form :model="dimissionFormInfo[0]" hide-required-asterisk disabled size="small" label-width="120px">
            <el-form-item label="申请人">
                <el-input v-model="dimissionFormInfo[0].name" />
            </el-form-item>
            <el-form-item label="申请时间">
                <el-date-picker v-model="dimissionFormInfo[0].applicationTime" type="date" />
            </el-form-item>
            <el-form-item label="所在部门">
                <el-input v-model="dimissionFormInfo[0].department" />
            </el-form-item>
            <el-form-item label="所在职位">
                <el-input v-model="dimissionFormInfo[0].post" />
            </el-form-item>
            <el-form-item label="任职时间">
                <el-date-picker v-model="dimissionFormInfo[0].duration" type="daterange" range-separator="至"
                    start-placeholder="入职日期" end-placeholder="离职日期" />
            </el-form-item>
            <el-form-item label="离职类型">
                <el-select v-model="dimissionFormInfo[0].quitType" class="m-2" />
            </el-form-item>
            <el-form-item label="离职原因">
                <el-input v-model="dimissionFormInfo[0].desc" type="textarea" resize='none'/>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">修改</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                    取消
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>


<style scoped>
/* 查看申请弹出框; */
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

:deep(.el-input) {
    width: 120px
}

:deep(.el-input__wrapper) {
    flex-grow: 0
}

:deep(.el-textarea__inner) {
    width: 400px
}
</style>