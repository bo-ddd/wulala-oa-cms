<script setup lang="ts">
import { reactive } from 'vue';

const tableData = reactive([
    {
        class: '离职申请',
        name: '马格烜',
        type: '主动离职',
        
        time: '2022-11-14',
        status: ''
    }
])
enum StateCode {
    审核中 = 0,
    审核已通过,
    审核未通过
}
tableData[0].status = StateCode[0]
  
</script>

<template>
    <div class="process mt-24">
        <el-table :data="tableData" :border='false' style="width: 100%" >
            <el-table-column prop="class" label="类别" width="180" align="center" />
            <el-table-column prop="name" label="姓名" width="180" align="center" />
            <el-table-column prop="time" label="申请时间" width="180" align="center" />
            <el-table-column prop="status" label="审核状态" width="180" align="center" color="red"/>
            <el-table-column label="操作" align="center">
                <el-button>查看申请</el-button>
                <el-button>取消申请</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>


<style scoped>

</style>