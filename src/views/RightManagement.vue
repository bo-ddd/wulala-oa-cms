<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '@/assets/api/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Ref } from "vue";

const newPermissionName = ref();
const input = ref();
const permissionNameAdd = ref();
const pidAdd = ref();
let permissionListPid = ref();
let permissionList = reactive<Permission1[]>([]);
let pageNum = ref(1);
let pageSize = ref(10);
interface Permission1 {
    id: number,
    permissionName: string,
    pid: number,
    // label: string,
    children: Permission1[]
}
interface Permission2 {
    id: number,
    permissionName: string,
    pid: number,
    // label: string,
}
let permissionId = ref();
let permissionList2: Ref<Permission2[]> = ref([]);

// interface Permission {
//     id: number,
//     permissionName: string,
//     pid: number,
//     // label: string
// }



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
            console.log('权限列表');
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
        ElMessage({
            type: 'success',
            message: '删除成功',
        }),
            axios.deletePermissionApi({ id }).then(res => {
                if (res.status == 1) {
                    getPermissionList();
                }
            })
    })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '删除已取消'
                // userDelete(scope.row.id)
            })
        })
}

const handleSizeChange = async (val: number) => {
    pageSize.value = val
}

const handleCurrentChange = async (val: number) => {
    pageNum.value = val
}
// 查询权限
const userSearch = async (input: number) => {
    axios.permissionUserListApi({
        userId: input
    }).then(res => {
        if (res.status == 1) {
            permissionList = res.data
            console.log('-----查询成功----------');
            console.log(res.data);
        } else {
            alert('查询失败')
        }
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
    permissionName:'权限名称'
})

const dialogFormVisible = ref(false)
// 修改权限
const edit = (data: Tree) => {
    console.log(data);
    form.permissionNameId = data.id
    form.permissionName = data.permissionName
    console.log(form.permissionNameId);


}

// 删除权限
const remove = (node: Node, id: number) => {
    console.log(id);
    open(id)

}
const queryDataId = (data: Permission1[]) => {
    console.log(data);
}

interface Tree {
    id: number,
    permissionName: string,
    pid: number,
    children?: Tree[]
}

const defaultProps = {
    children: 'children',
    label: 'permissionName',
    expandTrigger: 'hover'
}

const props = {
    label: 'permissionName',
    expandTrigger: 'hover',
}

const valueSearch = ref();
const valueAdd = ref();
const handleNodeClick = (data: Tree) => {
    console.log(data)
}

// --------------------------------------------------------------------------------------------------
const formLabelWidth = '140px'
</script>
<template>

    <div class="ipt-add">
        <span class="label label-add">添加权限：</span>
        <el-input v-model="permissionNameAdd" size="small" placeholder="请输入权限名称" clearable />
        <el-select v-model="permissionId" class="parentId m-2" placeholder="请选择挂载到？" size="small" clearable>
            <el-option v-for="item in permissionList2" :key="item.id" :label="item.permissionName" :value="item.id" />
        </el-select>
        <el-button class="ml-10" type="danger" size="small" @click="addPermission(permissionNameAdd)">添加
        </el-button>
    </div>
    <div class="ipt">
        <div class="example-block">
            <span class="example-demonstration">查询权限：</span>
            <el-cascader class="searchIpt" size="small"  v-model="valueSearch"
                :options="permissionList" :props="defaultProps" clearable />
        </div>
    </div>

    <el-tree :data="permissionList" node-key="id" :expand-on-click-node="true" @click="handleNodeClick"
        :props="defaultProps" >
        <template #default="{ node, data }">
            <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span class="btn">
                    <el-button class="ml-10" type="danger" size="small" @click="edit(data); dialogFormVisible = true">修改
                    </el-button>
                    <el-button class="ml-10" type="danger" size="small" @click="remove(node, data.id)">删除
                    </el-button>
                </span>
            </span>
        </template>
    </el-tree>

    <el-dialog v-model="dialogFormVisible" title="修改权限">
        <el-form :model="form">
            <el-form-item label="当前权限名称" :label-width="formLabelWidth">
                <el-input v-model="form.permissionName" size="small" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="新的权限名称" :label-width="formLabelWidth">
                <el-input v-model="newPermissionName" size="small" placeholder="请输入新的权限名称" clearable />
            </el-form-item>
            <el-form-item label="挂载" :label-width="formLabelWidth">
                <el-select v-model="permissionId" class="m-2" placeholder="请选择需要挂载到？" size="small" clearable >
                    <el-option v-for="item in permissionList2" :key="item.id" :label="item.permissionName"
                        :value="item.id" size="small" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary"
                    @click="dialogFormVisible = false; upPermission(form.permissionNameId, newPermissionName)">
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