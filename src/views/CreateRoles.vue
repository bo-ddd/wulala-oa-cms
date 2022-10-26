<script setup lang="ts">
import axios from '@/assets/api/api';
import { ref } from 'vue'
import { reactive } from 'vue'

const formInline = reactive({
    user: '',
    region: '',
})

const onSubmit = () => {
    console.log('submit!')
}

//列表

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
const dataList = ref()
const handleCheckAllChange = (val: boolean) => {
    checkedCities.value = val ? cities : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === cities.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
interface Item {
    children?: any;
}
function formatData(data: Object[]) {
    data.forEach((item: Item) => {
        item.children = [] 
        
    })
    // [
    //     {
    //         id:1,
    //         permissionName:"",
    //         children:[
    //             {
    //                 id:6,
    //                 children:[
    //                     {
    //                         id:10
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // ]
}

const getPermissionList = async function () {
    await axios.getPermissionListApi({}).then(res => {
        console.log(res.data);
        dataList.value = formatData(res.data);
         
    })
}
getPermissionList()
</script>

<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名称">
            <el-input v-model="formInline.user" placeholder="请输入新增角色名称" />
        </el-form-item>
        <el-form-item label="所属部门">
            <el-select v-model="formInline.region" placeholder="请选择部门">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
                <!-- <el-option v-for="item in data" :key="item.id" :label="item.roleName" :value="item.id" /> -->
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
    </el-form>
    <div v-for="item in dataList" :key="item.id">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
            {{ item.permissionName }}
        </el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<style scoped>

</style>