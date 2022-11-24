<script setup lang="ts">
import { ref } from 'vue';
const defaultPageSize = ref(10)

// 表格中默认一个显示的行数;
const defaultPageSizeList=[
    {
        id:1,
        label:10,
        value:10
    },
    {
        id:2,
        label:15,
        value:15
    },
    {
        id:3,
        label:20,
        value:20
    },
    {
        id:4,
        label:25,
        value:25
    },
    {
        id:5,
        label:30,
        value:30
    }
]
</script>
<template>
    <div>
        <h3>设置</h3>
        <div class="mt-20">
            <el-divider content-position="left" class="style-text">定制化配置</el-divider>
            <div>
                <span>表格中默认一页显示的条数</span>&nbsp
                <el-select v-model="defaultPageSize">
                    <el-option v-for="item in defaultPageSizeList" :label="item.label" :value="item.value" :key="item.id" class="no-selected"/>
                </el-select>
            </div>
            <el-divider content-position="left" class="style-text">外观 | 皮肤</el-divider>
        </div>
    </div>
</template>

<style scoped>
:deep(.el-divider__text){
   font-size:16px;
   font-weight:bold;
}
:deep(.el-input__inner){
    width:20px;
}

</style>