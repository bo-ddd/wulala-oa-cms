<template>
     <div class="demo-pagination-block mt-20">
            <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
                layout="total, sizes, prev, pager, next, jumper" :total="total" 
                @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div> 
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
const emit=defineEmits(['sizeChange','currentChange'])
const props=defineProps<{
    pageSize:number,
    pageNum:number,
    total:number,
}>()
const {pageSize,pageNum,total}=toRefs(props);

const handleSizeChange=(size: any)=>{
    emit('sizeChange',size)
}
const handleCurrentChange=(num: any)=>{
    console.log(num)
    emit('currentChange',num)
}
//分页

</script>

<style scoped>

</style>