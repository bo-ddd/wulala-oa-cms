<script setup lang="ts">
import { reactive, ref } from 'vue'

const checkAll = ref(false)
const isIndeterminate = ref(true)

//传入的数组类型;
interface ParentList {
    id: number,
    permissionName: string,
    pid: number,
    children: ParentList[]
}
const props = defineProps<{ data: ParentList[] }>()
const { data } = props;

// 样式
const number=ref(20)


//默认选中的数组;
const checkedCities = ref<ParentList[]>([]);
// 渲染的数组;
// const cities = ref<ParentList[]>([]);



const handleCheckAllChange = (val: boolean,dataList:ParentList[]) => {
    checkedCities.value = val ? dataList : []
    isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value: string[],dataList:ParentList[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === dataList.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < dataList.length
}
</script>

<template>
    
    <template v-for="item in data" :key="item.id">     

        <el-checkbox :index="item.id" v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange(true,data)">
            {{ item.permissionName }}
        </el-checkbox>

        <el-checkbox-group :class="'ml-'+(number+20)" v-model="checkedCities" @change="handleCheckedCitiesChange([],data)">
            <template v-if="item.children.length">
                <Tree :data="item.children"></Tree>
            </template>
        </el-checkbox-group>

    </template>


</template>



<style scoped>
.item {
    margin-left: 20px;
}

.ml-10{
    margin-left:10px;
}
.ml-20{
    margin-left:20px;
}
.ml-30{
    margin-left:30px;
}
.ml-40{
    margin-left:40px;
}
.ml-60{
    margin-left:60px;
}
.ml-80{
    margin-left:80px;
}
</style>