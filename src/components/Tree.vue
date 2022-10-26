<script lang="ts" setup>
import { ref } from 'vue'

const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkChildren = ref([]);
interface DataType{
    id:number,
    permissionName:string,
    pid:number,
    children?:Array<DataType>,
}
let props = defineProps<{
    data?:Array<DataType>,
}>()
const children = props.data?.children || [];
const handleCheckAllChange = (val: boolean) => {
    checkChildren.value = val ? children : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === children?.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < children.length
}
</script>

<template>
    <div class="tree" v-for="item in props.data" :key="item.id">
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
            {{item.permissionName}}
        </el-checkbox>
        <el-checkbox-group v-model="checkChildren" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in children" :key="city" :label="city">{{
                    city.permissionName
            }}</el-checkbox>
        </el-checkbox-group>
    </div>
</template>