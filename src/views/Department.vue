<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getDeptList, createDeptApi, updateDeptApi, deleteDeptApi } from '@/assets/api/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { DepartmentData } from '@/types/Dept'
let departmentList = ref();
let departmentAdd = ref();
let newDepartmentName = ref();
const formLabelWidth = '140px'


const form = reactive({
    id: 0,
    name: '部门名称'
})
const addSuccess = () => {
    ElMessage({
        showClose: true,
        message: '添加成功',
        type: 'success',
    })
}
const addError = () => {
    ElMessage({
        showClose: true,
        message: '添加失败',
        type: 'error',
    })
}

const upSuccess = () => {
    ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success',
    })
}
const upError = () => {
    ElMessage({
        showClose: true,
        message: '修改失败',
        type: 'error',
    })
}



const getDepartmentList = async () => {
    await getDeptList({}).then(res => {
        if (res.status == 1) {
            departmentList.value = res.data
        }
    })
}

getDepartmentList();

// 添加部门
const addDepartment = async (departmentAdd: string) => {
    await createDeptApi({
        name: departmentAdd
    }).then(res => {
        if (res.status == 1) {
            getDepartmentList();
            addSuccess();
        } else {
            addError();
        }
    })
}

// 修改部门名称
const edit = (data: DepartmentData) => {
    form.id = data.id
    form.name = data.name
}
const updateDepartment = async (departmentId: number) => {

    await updateDeptApi({
        id: departmentId,
        name: newDepartmentName.value
    }).then(res => {
        if (res.status == 1) {
            getDepartmentList()
            upSuccess();
        } else {
            upError();
        }
    })
}
const dialogFormVisibleUpdate = ref(false)

// 删除部门
const open = (id: number) => {
    ElMessageBox.confirm(
        '确定要删除该部门吗？',
        '警告',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消删除',
            type: 'warning',
        }
    ).then(() => {
        deleteDeptApi({ id }).then(res => {
            if (res.status == 1) {
                ElMessage({
                    showClose: true,
                    type: 'success',
                    message: '删除成功',
                })
                getDepartmentList();
            } else if (res.status == 8901) {
                ElMessage({
                    showClose: true,
                    type: 'error',
                    message: '删除失败',
                })
            }
        })
    }).catch(() => {
        ElMessage({
            showClose: true,
            type: 'info',
            message: '已取消删除'
        })
    })
}
const removeDepartment = async (departmentId: number) => {
    open(departmentId)

}
const dialogFormVisibleDelete = ref(false)










</script>
<template>
    <div class="ipt-add">
        <el-form-item label="添加部门">
            <el-input v-model="departmentAdd" placeholder="请输入部门名称" clearable />
            <el-button class="ml-20" type="danger" @click="addDepartment(departmentAdd)">添加
            </el-button>
        </el-form-item>

    </div>

    <el-table :data="departmentList" style="width: 100%" fit>
        <el-table-column label="ID" width="200px" align="center">
            <template #default="scope">
                <div>{{ scope.row.id }}</div>
            </template>
        </el-table-column>
        <el-table-column label="部门名称" align="center">
            <template #default="scope">
                <el-tag>{{ scope.row.name }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="320" align='center'>
            <template #default="scope">
                <el-link type="danger" @click="edit(scope.row); dialogFormVisibleUpdate = true">修改部门名称</el-link>
                <el-link type="info" @click="removeDepartment(scope.row.id); dialogFormVisibleDelete = true">删除部门
                </el-link>
            </template>
        </el-table-column>
    </el-table>


    <el-dialog v-model="dialogFormVisibleUpdate" title="修改部门名称">
        <el-form :model="form">
            <el-form-item label="当前部门名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="新的部门名称" :label-width="formLabelWidth">
                <el-input v-model="newDepartmentName" placeholder="请输入新的部门名称" clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleUpdate = false">取消</el-button>
                <el-button type="danger" @click="dialogFormVisibleUpdate = false; updateDepartment(form.id)">
                    确认修改
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- <AffixTip class="mt-20"></AffixTip> -->
</template>
<style scoped>
.ipt,
.ipt-add {
    display: flex;
}

.label {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: rgb(145, 137, 137);

}

.btn {
    position: absolute;
    right: 15px;
    color: pink;
}

.parentId {
    margin-left: 20px;
}

.example-demonstration {
    color: rgb(145, 137, 137);
    font-weight: 600;
}

a {
    cursor: pointer;
    margin: 0 5px;
    text-decoration: none;
}

:deep(.el-pagination) {
    margin-top: 20px;
}

:deep(.el-input) {
    width: 200px;
}

:deep(.el-tree-node) {
    padding: 5px 0;
}
</style>