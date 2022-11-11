<script setup lang="ts">
import { ref, reactive, watch, type Ref } from 'vue'
import axios from '@/assets/api/api'
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'

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

interface DepartmentData {
    id: number,
    name: string
}

const getDepartmentList = async () => {
    await axios.getDeptList({}).then(res => {
        if (res.status == 1) {
            departmentList.value = res.data
        }
    })
}

getDepartmentList();

// 添加部门
const addDepartment = async (departmentAdd: string) => {
    await axios.createDeptApi({
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
    console.log(data);
    form.id = data.id
    form.name = data.name
}
const updateDepartment = async (departmentId: number) => {
    console.log(departmentId);

    await axios.updateDeptApi({
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
    console.log(id);
    ElMessageBox.confirm(
        '确定要删除该部门吗？',
        '警告',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消删除',
            type: 'warning',
        }
    ).then(() => {
        axios.deleteDeptApi({ id }).then(res => {
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
            type: 'error',
            message: '已取消删除'
        })
    })
}
const removeDepartment = async (departmentId: number) => {
    open(departmentId)
    console.log(departmentId);
    
}
const dialogFormVisibleDelete = ref(false)










</script>
<template>
    <div class="ipt-add">
        <span class="label label-add">添加部门：</span>
        <el-input v-model="departmentAdd" size="small" placeholder="请输入部门名称" clearable />
        <el-button class="ml-10" type="danger" size="small" @click="addDepartment(departmentAdd)">添加
        </el-button>
    </div>

    <el-table :data="departmentList" border style="width: 100%" fit>
        <el-table-column label="部门名称" align="center">
            <template #default="scope">
                <el-tag size="small" type="warning">{{ scope.row.name }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="320" align='center'>
            <template #default="scope">
                <el-button type="danger" size="small" @click="edit(scope.row); dialogFormVisibleUpdate = true">修改部门名称
                </el-button>
                <el-button type="danger" size="small"
                    @click="removeDepartment(scope.row.id); dialogFormVisibleDelete = true">删除部门
                </el-button>
            </template>
        </el-table-column>
    </el-table>


    <el-dialog v-model="dialogFormVisibleUpdate" title="修改部门名称">
        <el-form :model="form">
            <el-form-item label="当前部门名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" size="small" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="新的权限名称" :label-width="formLabelWidth">
                <el-input v-model="newDepartmentName" size="small" placeholder="请输入新的权限名称" clearable />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleUpdate = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisibleUpdate = false; updateDepartment(form.id)">
                    确认修改
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style scoped>
.ipt,
.ipt-add {
    padding: 10px 0;
    display: flex;
    align-items: center;
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