<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '@/assets/api/api'
import { ElMessage, ElMessageBox } from 'element-plus'



const input = ref();
const permissionNameAdd = ref();
const pidAdd = ref();
let permissionListPid = ref();
let permissionList = ref();
let pageNum = ref(1);
let pageSize = ref(10);

interface Permission {
    id: number,
    permissionName: string,
    pid: number,
    label: string
}

interface FormatPermission extends Permission {
    children: Permission[]
}

const formatData = (data: FormatPermission[]) => {
    let res: FormatPermission[] = JSON.parse(JSON.stringify(data));
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

const formDataPid = (data: FormatPermission[]) => {
    return data.filter(item => item.pid == 0)
}
const getPermissionList = async () => {
    await axios.getPermissionListApi({}).then(res => {
        if (res.status === 1) {
            permissionList.value = formatData(res.data)
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
const addPermission = async (permissionNameAdd: string, pidAdd: number) => {
    await axios.addPermissionApi({
        permissionName: permissionNameAdd,
        pid: pidAdd
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
const upPermission = async (permissionNameId: number, newPermissionName: string, parentId: number) => {
    axios.updatePermissionApi({
        id: permissionNameId,
        permissionName: newPermissionName,
        pid: parentId
    }).then(res => {
        if (res.status == 1) {
            upSuccess();
            getPermissionList();
        } else {
            upError();
        }
    })
}


const renderContent = function (h: any, { node, data, store }: any) {
    // return h('span', null, h('span', null, node.label)), h('span', null, h('a', { onClick: () => append(data) }, 'Append'))
    return h(
        'span',
        {
            class: 'custom-tree-node',
        },
        h('span', null, node.label),
        h(
            'span',
            {
                class: 'btn',
                style: 'position: absolute; right:10px; color:pink',
            },
            h(
                'a',
                {
                    class: 'edit',
                    onclick: () => edit(data),
                },
                '修改'
            ),
            h(
                'a',
                {
                    class: 'delete',
                    style: 'margin-left: 8px',
                    onClick: () => remove(node, data),
                },
                '删除'
            )
        )
    )
}
let dialogFormVisible = ref(false)

const edit = (data: Tree) => {
    console.log(data);
    let dialogFormVisible = ref(false)
}

const remove = (node: Node, data: Tree) => {
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

</script>
<template>

    <div class="ipt-add">
        <span class="label label-add">添加权限：</span>
        <el-input v-model="permissionNameAdd" size="small" placeholder="请输入权限名称" clearable />
        <!-- <el-input class="ml-10" v-model="pidAdd" size="small" placeholder="请输入Pid" clearable /> -->
        <el-cascader size="small" v-model="valueAdd" :options="permissionListPid" :props="props" clearable />

        <el-button class="ml-10" type="danger" size="small" @click="addPermission(permissionNameAdd, pidAdd)">添加
        </el-button>
    </div>
    <div class="ipt">
        <!-- <span class="label label-search"></span> -->
        <!-- <el-input v-model="input" size="small" placeholder="请输入权限ID" clearable /> -->
        <div class="example-block">
            <span class="example-demonstration">查询权限：</span>
            <el-cascader size="small" v-model="valueSearch" :options="permissionList" :props="defaultProps" clearable />
        </div>
    </div>

    <el-tree :data="permissionList" node-key="id" :expand-on-click-node="false" @click="handleNodeClick"
        :render-content="renderContent" :props="defaultProps" />

    <el-dialog v-model="dialogFormVisible" title="Shipping address">
        <el-form :model="form">
            <el-form-item label="Promotion name" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Zones" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select a zone">
                    <el-option label="Zone No.1" value="shanghai" />
                    <el-option label="Zone No.2" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<style scoped>
.ipt,
.ipt-add {
    padding: 20px 0;
    display: flex;
    align-items: center;
}

.label {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: rgb(145, 137, 137);

}

:deep(.el-pagination) {
    /* justify-content: center; */
    margin-top: 20px;
}

:deep(.el-input) {
    width: 200px;
}

:deep(.el-tree-node) {
    padding: 5px 0;
}

:deep(.el-input__wrapper) {
    margin-left: 20px;
}
</style>