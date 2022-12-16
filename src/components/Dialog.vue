<template>
    <el-dialog :v-model="dialogFormVisible" :title="titleContent">
        <el-form :model="form">
            <el-form-item :label="lableUserName" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item :label="optionsLable" :label-width="formLabelWidth">
                <el-select v-model="form.rolesId" class="m-2" :placeholder="placeholder">
                    <el-option v-for="item in data" :key="item"
                        :label="item" :value="item" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="danger" @click="dialogFormVisible = false; handelClick()">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import type { DepartmentList, Form, RoleList, UserDepartmentList } from '@/types/User';
import { reactive } from 'vue';
import { defineProps, defineEmits, toRefs } from 'vue';
const dialogFormVisible = false;
const form = reactive<Form>({
    deptId: 0,
    depName: '',
    searchDepId: null,
    userId: 0,
    rolesId: null,
    userName: ''
})
const formLabelWidth = '140px'

const props = defineProps<{
    titleContent: string,
    lableUserName: string,
    optionsLable: string,
    placeholder: string,
    data: DepartmentList[] | UserDepartmentList[] | RoleList[] 
}>()
const { titleContent, lableUserName, optionsLable, placeholder, data } = toRefs(props)
const emits = defineEmits(['confirm']);
const handelClick = () => {
    emits('confirm');
};


</script>
<style scoped>
:deep(.el-input){
    width: 200px;
}
</style>