<script setup lang="ts">
import Table from '@/components/Table.vue';
import { ref, reactive } from 'vue';
import type { TableData, UserQuitListParam, } from '@/types/Dimission';
import { getQuitListApi, getUserDeptListApi, queryUserInfoApi } from '../assets/api/api'
const currentPage = ref(1) //当前是第几页;
const pageSize = ref(10)  //每页显示的条数;
const total = ref(0) //总条数;
const tableData = reactive<TableData[]>([]) //审核列表的数据对象;
//获取离职列表数据;
getUserQuitList({ //刷新页面，初始化数据列表;
    pageSize: pageSize.value,
    pageNum: currentPage.value
})
//每页显示条数改变时的回调;
function handleSizeChange(val: number) {
    pageSize.value = val
    getUserQuitList({
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
}

//改变页数时的回调;
function handleCurrentChange(val: number) {
    currentPage.value = val
    getUserQuitList({
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
}
async function getUserQuitList(param: UserQuitListParam) {
    let { data } = await getQuitListApi(param)
    total.value = data.total;
    tableData.length = 0;
    Object.assign(tableData, data.list)
    tableData.forEach(async (item) => {
        item.applyTime = handleTimeFormat(item.applyTime) //申请时间
        item.quitTime = handleTimeFormat(item.quitTime) //离职时间
        Promise.all([getUserDeptListApi({ userId: item.userId }), queryUserInfoApi({ userId: item.userId })]).then(res => {
            let deptName = '';
            let userPost = '';
            res[0].data.forEach((item: { deptName: string }) => {
                deptName += item.deptName
            });
            res[1].data.roles.forEach((item: { roleName: string }) => {
                userPost += item.roleName;
            })
            item.department = deptName; //部门名称
            item.postName = userPost //职位名称
        })
    })
}
//处理时间数据格式Api;
function handleTimeFormat(time: string) {
    return time.substring(0, 10)
}
        import ('@/views/ActivityList.vue').then(module=>{
           console.log(module.default)
        })

const options = {
    text: [
        {
            id: 1,
            label: '姓名',
            prop: 'avatarName'
        },
        {
            id: 2,
            label: '部门',
            prop: 'department'
        },
        {
            id: 3,
            label: '职位',
            prop: 'postName'
        },
    ],
    link: [
        {
            id: 1,
            type:'danger',
            text:'审核'
        }
    ],
}
</script>


<template>
    <Table :data="tableData" :total="total" :options="options" @getTableList="getUserQuitList" :pageSize="pageSize"
        :currentPage="currentPage" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
    </Table>
</template>



<style scoped>

</style>