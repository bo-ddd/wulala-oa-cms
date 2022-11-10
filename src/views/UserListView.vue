<template>

    <div class="ipt">
        <span class="label">查询用户角色：</span>
        <el-input v-model="input" size="small" placeholder="请输入用户ID" clearable />
        <el-button class="ml-10" type="danger" size="small" @click="userSearch(input)">搜索</el-button>
        <el-button class="ml-10" type="danger" size="small" @click="getUserList()">重置</el-button>
    </div>

    <el-table v-if="userListData" :data="userListData" border style="width: 100%" fit>
        <el-table-column label="用户ID" align="center" width="100px">
            <template #default="scope">
                <el-tag size="small" type="warning">{{ scope.row.userId }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="用户昵称" width="200" align="center">
            <template #default="scope">
                <el-tag size="small">{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column :label=label align="center">
            <template #default="scope">
                <div size="small" type="danger">{{ scope.row.roles ? showRoleName(scope.row.roles) : scope.row.hobby }}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="联系方式" width="180" align="center">
            <template #default="scope">
                <el-tag type="success">{{ scope.row.phoneNumber }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="340" align='center'>
            <template #default="scope">
                <el-button type="danger" size="small" @click="addRoles(scope.row); dialogFormVisibleAdd = true">添加角色
                </el-button>
                <el-button type="danger" size="small" @click="getUserId(scope.row); dialogFormVisibleDelete = true">删除角色
                </el-button>
                <el-button type="danger" size="small" @click="getUserId(scope.row); dialogFormisiblGeroup = true">添加项目组
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisibleAdd" title="添加角色">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" size="small" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-select v-model="form.rolesId" class="m-2" placeholder="请选择角色" size="small">
                    <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id"
                        size="small" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisibleAdd = false; addUserRole(form.userId, form.rolesId)">
                    确认添加
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisibleDelete" title="删除用户角色">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" size="small" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-select v-model="form.rolesId" class="m-2" placeholder="请选择要删除的角色" size="small">
                    <el-option v-for="item in userRolesList" :key="item.id" :label="item.roleName" :value="item.id"
                        size="small" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleDelete = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisibleDelete = false; deleteUserRole()">
                    确认删除
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogFormisiblGeroup" title="删除用户角色">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" size="small" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="项目组" :label-width="formLabelWidth">
                <el-select v-model="form.rolesId" class="m-2" placeholder="请选择要项目组" size="small">
                    <el-option v-for="item in userRolesList" :key="item.id" :label="item.roleName" :value="item.id"
                        size="small" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormisiblGeroup = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisibleDelete = false; deleteUserRole()">
                    确认添加
                </el-button>
            </span>
        </template>
    </el-dialog>
    <div class="pagination">
        <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue'
import axios from '@/assets/api/api'
import { ElMessage } from 'element-plus'

const small = ref(false)
const background = ref(true)
const disabled = ref(false)

const handleSizeChange = async (val: number) => {
    console.log(`每页${val}条信息`);
    await getUserList(pageSize.value, pageNum.value)
    pageSize.value = val
}
const handleCurrentChange = async (val: number) => {
    console.log(`这是第${val}页`)
    await getUserList(pageSize.value, pageNum.value)
    pageNum.value = val
}
const getUserList = (pageSize?: number, pageNum?: number) => {
    label.value = '用户爱好'
    axios.getUserListApi({
        pageNum: pageNum,
        pageSize: pageSize
    }).then(res => {
        if (res.status === 1) {
            userListData.value = res.data.list;
        }
    })
    input.value = '';
}
const input = ref();
let pageNum = ref(1);
let pageSize = ref(10);
let total = ref();
let userListData = ref();
let roleList = ref();
let userRolesList = ref();
let addUserId = ref();
let addRoleId = ref();
let label = ref('');
(async function () {
    let userList = await axios.getUserListApi({})
    userListData.value = userList.data.list;
    total.value = userList.data.total
    label.value = '用户爱好'
})();
// 获取用户角色ID
(async function () {
    let rolesList = await axios.getRoleListApi({})
    roleList.value = rolesList.data
})()



interface User {
    address: string
    avatarImg: string | null
    avatarName: string
    birthday: string
    hobby: string
    personalSignature: string
    phoneNumber: string
    roles: []
    sex: number
    userId: number
}
const dialogFormVisibleAdd = ref(false)
const dialogFormVisibleDelete = ref(false)
const dialogFormisiblGeroup = ref(false)
const form = reactive({
    userId: 0,
    rolesId: null,
    userName: '用户昵称'
})
const addRoles = (row: User) => {
    form.userId = row.userId
    form.userName = row.avatarName
}

const showRoleName = function (roleList: any) {
    if (!Array.isArray(roleList)) return;
    let str = '';
    roleList.forEach(item => {
        str += `${item.roleName},`
    })
    return str.substring(0, str.length - 1);
}
// 添加用户角色
const addUserRole = async (addUserId: number, addRoleId: number) => {
    let res = await axios.addUserRoleApi({
        userId: addUserId,
        roleId: addRoleId
    })
    if (res.status == 1) {
        // userSearch(addUserId)
        addSuccess();
        form.rolesId = null
    } else {
        addError();
    }
}

const upError = () => {
    ElMessage({
        showClose: true,
        message: '查询失败',
        type: 'error',
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
const deleteSuccess = () => {
    ElMessage({
        showClose: true,
        message: '删除成功',
        type: 'success',
    })
}
const deleteError = () => {
    ElMessage({
        showClose: true,
        message: '删除失败',
        type: 'error',
    })
}
interface User {
    userId: number
    avatarName: string
    phoneNumber: string
}
// 删除用户角色
const getUserId = async (row: User) => {
    let res = await axios.queryUserInfoApi({
        userId: row.userId
    })
    if (res.status == 1) {
        userRolesList.value = res.data.roles
    }
    form.userId = row.userId
    form.userName = row.avatarName
}
const deleteUserRole = async () => {
    let res = await axios.deleteUserRoleApi({
        id: form.rolesId
    })
    if (res.status == 1) {
        // userSearch(form.userId)
        deleteSuccess();
        form.rolesId = null
    } else {
        deleteError();
    }
}
// 查询用户权限
const userSearch = async (id: any) => {
    label.value = '用户角色'
    let res = await axios.queryUserInfoApi({
        userId: id
    })
    if (res.status == 1) {
        console.log('-----查询成功----------');
        console.log(res.data);
        userListData.value.length = 0
        userListData.value.push(res.data)
    } else {
        upError();
    }
}


const formLabelWidth = '140px'

</script>

<style scoped>
.page,
.ipt {
    padding: 20px 0;
}

.label {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: rgb(145, 137, 137);
}

.label-size {
    margin-left: 20px;
}



:deep(.el-pagination) {
    margin-top: 20px;
}

:deep(.el-input) {
    width: 200px;
}
</style>