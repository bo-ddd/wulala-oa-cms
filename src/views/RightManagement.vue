<script setup lang="ts">
import { ref, reactive, watch, type Ref } from 'vue'
import axios from '@/assets/api/api'
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'
import AffixTip from '@/components/AffixTip.vue';

let treeRef = ref<InstanceType<typeof ElTree>>()
let newPermissionName = ref();
let permissionNameAdd = ref();
let permissionListPid = ref();
let permissionList = reactive<Permission1[]>([]);
interface Permission1 {
    id: number,
    permissionName: string,
    pid: number,
    children: Permission1[]
}
interface Permission2 {
    id: number,
    permissionName: string,
    pid: number,
}
let permissionId = ref();
let permissionList2: Ref<Permission2[]> = ref([]);

const formatData = (data: Permission1[]) => {
    let res: Permission1[] = JSON.parse(JSON.stringify(data));
    res.forEach(item => {
        if (!item.children) item.children = [];
        if (item.pid != 0) {
            let pItem = res.find(pItem => pItem.id == item.pid)
            if (pItem && !pItem.children) pItem.children = [];
            pItem?.children.push(item)
        }
    })
    return res.filter(item => item.pid == 0)
}

const formDataPid = (data: Permission1[]) => {
    return data.filter(item => item.pid == 0)
}
const getPermissionList = async () => {
    await axios.getPermissionListApi({}).then(res => {
        if (res.status === 1) {
            permissionList2.value = res.data;
            Object.assign(permissionList, formatData(res.data))
            permissionListPid.value = formDataPid(res.data)
        }
    })
}

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

getPermissionList();

// 删除权限
const open = (id: number) => {
    ElMessageBox.confirm(
        '确定要删除该权限吗？',
        '警告',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消删除',
            type: 'warning',
        }
    ).then(() => {
        axios.deletePermissionApi({ id }).then(res => {
            if (res.status == 1) {
                ElMessage({
                    showClose: true,
                    type: 'success',
                    message: '删除成功',
                })
                getPermissionList();
            } else if (res.status == 8901) {
                ElMessage({
                    showClose: true,
                    type: 'error',
                    message: '有子权限不能被删除',
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


// 添加权限
const addPermission = async (permissionNameAdd: string) => {
    await axios.addPermissionApi({
        permissionName: permissionNameAdd,
        pid: permissionId.value | 0
    }).then(res => {
        if (res.status == 1) {
            addSuccess();
            getPermissionList();
        } else {
            addError();
        }
    })
}
// 修改权限
const upPermission = async (permissionNameId: number, newPermissionName: string) => {
    axios.updatePermissionApi({
        id: permissionNameId,
        permissionName: newPermissionName,
        pid: permissionId.value | 0
    }).then(res => {
        if (res.status == 1) {
            upSuccess();
            getPermissionList();
        } else {
            upError();
        }
    })
}

const form = reactive({
    permissionNameId: 0,
    valueUp: 0,
    permissionName: '权限名称'
})

const dialogFormVisible = ref(false)
// 修改权限
const edit = (data: Tree) => {
    form.permissionNameId = data.id
    form.permissionName = data.permissionName
}

// 删除权限
const remove = (node: Node, id: number) => {
    open(id)
}

interface Tree {
    id: number,
    permissionName: string,
    pid: number,
    children: Tree[]
}

const defaultProps = {
    children: 'children',
    label: 'permissionName',
    expandTrigger: 'hover'
}

const searchValue = ref();

watch(searchValue, (val) => {
    treeRef.value!.filter(val)
})


const filterNode = (value: string, data: any) => {
    if (!value) return true
    return data.permissionName.includes(value)
}
// --------------------------------------------------------------------------------------------------
const formLabelWidth = '140px'
</script>
<template>

    <div class="ipt-add">
        <div class="left">
            <el-form-item label="添加权限">
                <el-input v-model="permissionNameAdd" placeholder="请输入添加的权限名称" clearable />
                <el-select v-model="permissionId" class="parentId m-2" placeholder="请选择挂载到？" clearable>
                    <el-option v-for="item in permissionList2" :key="item.id" :label="item.permissionName"
                        :value="item.id" />
                </el-select>
                <el-button class="ml-20" type="danger" @click="addPermission(permissionNameAdd)">添加
                </el-button>
            </el-form-item>
        </div>
        <div class="search">
            <el-input v-model="searchValue" placeholder="请输入要查询的权限名称" clearable>
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <search />
                    </el-icon>
                </template>
            </el-input>
        </div>
    </div>
    <div class="tree mt-20">
        <el-tree :data="permissionList" node-key="id" :expand-on-click-node="true" :props="defaultProps" ref="treeRef"
            :default-expand-all="false" :filter-node-method="filterNode" accordion>
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span class="btn">
                        <el-link class="ml-10" type="danger" @click="edit(data); dialogFormVisible = true">修改</el-link>
                        <el-link class="ml-10" type="info" @click="remove(node, data.id)">删除</el-link>
                    </span>
                </span>
            </template>
        </el-tree>
    </div>


    <el-dialog v-model="dialogFormVisible" title="修改权限">
        <el-form :model="form">
            <el-form-item label="当前权限名称" :label-width="formLabelWidth">
                <el-input v-model="form.permissionName" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="新的权限名称" :label-width="formLabelWidth">
                <el-input v-model="newPermissionName" placeholder="请输入新的权限名称" clearable />
            </el-form-item>
            <el-form-item label="挂载" :label-width="formLabelWidth">
                <el-select v-model="permissionId" class="m-2" placeholder="请选择需要挂载到？" clearable>
                    <el-option v-for="item in permissionList2" :key="item.id" :label="item.permissionName"
                        :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="danger"
                    @click="dialogFormVisible = false; upPermission(form.permissionNameId, newPermissionName)">
                    确认修改
                </el-button>
            </span>
        </template>
    </el-dialog>
    <AffixTip class="mt-20"></AffixTip>
</template>
<style scoped>
.ipt,
.ipt-add {
    /* padding: 10px 0; */
    display: flex;
    justify-content: space-between;
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

.tree {
    padding: 15px;
    background-color: white;
    border-radius: 10px;
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