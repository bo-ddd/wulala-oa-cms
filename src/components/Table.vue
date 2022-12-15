<template>
    <el-table :data="data" style="width: 100%" @getTableList="onGetTableList">
        <el-table-column v-for="item in text" :label="item.label" :prop="item.prop" :key="item.id" align="center" />
    </el-table>
    <el-table-column label="操作" align="center" v-if="link.length">
        <template #default="scope">
            <el-link v-for="item in link" :type="item.type" :key="item.id">
                {{ item.text }}
            </el-link>
        </template>
    </el-table-column>
    <!-- 分页 -->
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20, 25, 30]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" class="mt-20" />
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from 'vue';
interface Text {
    id: number,
    label: string,
    prop: string
}
interface Link {
    id: number,
    type: string,
    text: string
}
interface Options {
    text: Text[],
    link: Link[],
}
const props = defineProps<{
    data: object[],
    options: Options,
    pageSize: number,
    currentPage: number,
    total: number
}>()
const emits = defineEmits(['getTableList', 'handleSizeChange', 'handleCurrentChange'])
const { pageSize, currentPage, total } = toRefs(props);
const { options } = props;
const { text, link } = options

//每页显示条数改变时的回调;
function handleSizeChange(val: number) {
    emits('handleSizeChange', val)
}

//改变页数时的回调;
function handleCurrentChange(val: number) {
    emits('handleCurrentChange', val)
}

</script>

<style scoped>

</style>