<template>
    <div class="ipt">
        <span class="label">查询部门用户：</span>
        <el-select v-model="form.searchDepId" placeholder="请选择部门" clearable>
            <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button class="ml-10" type="danger" @click="queryDeptUser(form.searchDepId)"> 查询成员
        </el-button>
        <el-button class="ml-10" type="default" @click="getUserList()">重置</el-button>
        <span class="creat-user">
            <el-button class="ml-10" type="danger" @click="toCreateUser()">创建用户</el-button>
        </span>
    </div>


    <el-table class="mt-20" :data="userListData" style="width: 100%" fit>
        <el-table-column label="ID" align="center" width="100px">
            <template #default="scope">
                <div>{{ scope.row.userId }}</div>
            </template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
            <template #default="scope">
                <el-tag>{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column v-if="label" :label=label align="center">
            <template #default="scope">
                <div type="danger">{{ scope.row._rawValue ? showDeptName(scope.row._rawValue) :
                        showRoleName(scope.row.roles)
                }}
                </div>
            </template>
        </el-table-column>
        <el-table-column v-if="label" :label=label align="center">
            <template #default="scope">
                <div type="danger">{{ scope.row.roles ? showDeptName(scope.row.roles) :
                        showRoleName(scope.row._rawValue)
                }}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
            <template #default="scope">
                <el-tag type="success">{{ scope.row.phoneNumber }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align='center'>
            <template #default="scope">
                <el-link type="primary" @click="toUserDetail(scope.row.userId)">用户详情</el-link>
                <el-link type="danger" @click="getUserId(scope.row); dialogFormVisibleAdd = true">添加角色</el-link>
                <el-link type="info" @click="getUserId(scope.row); dialogFormVisibleDelete = true">删除角色</el-link>
                <el-link type="danger" @click="getUserId(scope.row); dialogFormisiblGeroup = true">添加部门</el-link>
                <el-link type="info" @click="getUserId(scope.row); dialogFormisiblDelete = true">删除部门</el-link>
            </template>
        </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisibleAdd" title="添加角色">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-select v-model="form.rolesId" class="m-2" placeholder="请选择角色">
                    <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取消</el-button>
                <el-button type="primary" @click="dialogFormVisibleAdd = false; addUserRole(form.userId)">
                    确认添加
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogFormVisibleDelete" title="删除用户角色">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="角色名称" :label-width="formLabelWidth">
                <el-select v-model="form.rolesId" class="m-2" placeholder="请选择要删除的角色">
                    <el-option v-for="item in userRolesList" :key="item.id" :label="item.roleName" :value="item.id" />
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

    <el-dialog v-model="dialogFormisiblGeroup" title="添加用户部门">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="项目组" :label-width="formLabelWidth">
                <el-select v-model="form.deptId" class="m-2" placeholder="请选择要添加项目组">
                    <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormisiblGeroup = false">取消</el-button>
                <el-button type="primary" @click="dialogFormisiblGeroup = false; addDepartment()">
                    确认添加
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogFormisiblDelete" title="删除用户部门">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="项目组" :label-width="formLabelWidth">
                <el-select v-model="form.deptId" class="m-2" placeholder="请选择要删除的项目组">
                    <el-option v-for="item in userDepartmentList" :key="item.deptId" :label="item.deptName"
                        :value="item.deptId" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormisiblDelete = false">取消</el-button>
                <el-button type="primary" @click="dialogFormisiblDelete = false; removeUserDepartment(form.userId)">
                    确认删除
                </el-button>
            </span>
        </template>
    </el-dialog>

    <div class="pagination mt-20">
        <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '@/assets/api/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const formLabelWidth = '140px'
const router = useRouter();

const toUserDetail = (id: number) => {
    router.push({
        name: 'userDetail',
        query: {
            id
        }
    })
}
const toCreateUser = () => {
    router.push('createUserAccount')
}
const handleSizeChange = async (val: number) => {
    await getUserList(pageSize.value, pageNum.value)
    pageSize.value = val
}
const handleCurrentChange = async (val: number) => {
    await getUserList(pageSize.value, pageNum.value)
    pageNum.value = val
}
const getUserList = (pageSize?: number, pageNum?: number) => {
    label.value = ''
    axios.getUserListApi({
        pageNum: pageNum,
        pageSize: pageSize
    }).then(res => {
        if (res.status === 1) {
            userListData.value = res.data.list;
            total.value = res.data.total
        }
    })
    rolesInput.value = '';
    departmentInput.value = '';
    form.searchDepId = null
}
const rolesInput = ref();
const departmentInput = ref();
const departmentList = ref();
const userDepartmentList = ref();
const userListData = ref();
const roleList = ref();
const userRolesList = ref();
const userInfo = ref();
const userName = ref('');
const userNameList = ref();
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref();

const label = ref('');

(async function () {
    let userList = await axios.getUserListApi({})
    userListData.value = userList.data.list;
    total.value = userList.data.total
    userNameList.value = userList.data.list
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

const dialogFormVisibleAdd = ref(false);
const dialogFormVisibleDelete = ref(false);
const dialogFormisiblGeroup = ref(false);
const dialogFormisiblDelete = ref(false);

interface Form {
    deptId: number | null,
    depName: string,
    searchDepId: number | null,
    userId: number,
    rolesId: number | null,
    userName: string
}
const form = reactive<Form>({
    deptId: 0,
    depName: '',
    searchDepId: null,
    userId: 0,
    rolesId: null,
    userName: '用户昵称'
})


const showRoleName = function (roleList: any) {
    if (!Array.isArray(roleList)) return;
    let str = '';
    roleList.forEach(item => {
        str += `${item.roleName},`
    })
    return str.substring(0, str.length - 1);
}
const showDeptName = function (deptList: any) {
    if (!Array.isArray(deptList)) return;
    let str = '';
    deptList.forEach(item => {
        str += `${item.deptName},`
    })
    return str.substring(0, str.length - 1);
}
// 添加用户角色
const addUserRole = async (addUserId: number) => {
    let res = await axios.addUserRoleApi({
        userId: addUserId,
        roleId: form.rolesId
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
const addWarning = () => {
    ElMessage({
        showClose: true,
        message: '该用户已在该部门,不能重复添加',
        type: 'warning',
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
const addRoles = (row: User) => {
    form.userId = row.userId
    form.userName = row.avatarName
}
// 删除用户角色
const getUserId = async (row: User) => {
    queryUserDepartment(row.userId)
    let res = await axios.queryUserInfoApi({
        userId: row.userId
    })
    if (res.status == 1) {
        userInfo.value = res.data
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
// 获取用户部门
const queryUserDepartment = async (id: number) => {
    await axios.getUserDeptListApi({
        userId: id
    }).then(res => {
        if (res.status == 1) {
            userDepartmentList.value = res.data
        }
    })
}
// 查询部门用户
const queryDeptUser = async (id: number | null) => {
    await axios.queryUserMembersApi({
        deptId: id
    }).then(res => {
        userListData.value.length = 0
        res.data.forEach((item: User) => {
            userListData.value.push(item)
        });
        total.value = userListData.value.length
    })
}

// 给用户添加部门
const getDepartmentId = async () => {
    await axios.getDeptList({}).then(res => {
        if (res.status == 1) {
            form.deptId = res.data.id
            form.searchDepId = res.data.id
            form.depName = res.data.name
            departmentList.value = res.data
        }
    })
}


getDepartmentId();
const addDepartment = async () => {
    getDepartmentId();
    await axios.addUserDeptApi({
        userId: form.userId,
        deptId: form.deptId
    }).then(res => {
        if (res.status == 1) {
            addSuccess();
        } else if (res.status == 8801) {
            addWarning();
        } else {
            addError();
        }
    })
}

// 删除用户部门
const removeUserDepartment = async (userId: number) => {
    await axios.deleteUserDeptApi({
        userId: userId,
        deptId: form.deptId
    }).then(res => {
        if (res.status == 1) {
            deleteSuccess();
        } else {
            deleteError();
        }
        form.deptId = null
    })
}
</script>

<style scoped>
.page,
.label {
    display: inline-block;
    font-size: 16px;
    font-weight: 600;
    color: rgb(145, 137, 137);
}

.label-size {
    margin-left: 20px;
}

a {
    cursor: pointer;
    margin: 0 5px;
    text-decoration: none;
}



.touserdetail {
    color: darkturquoise;
}

.roles-add,
.geroup-add {
    color: crimson;
}

.roles-delete,
.geroup-delete {
    color: green;
}

.creat-user {
    float: right;
}

/* :deep(.el-pagination) {
    margin-top: 20px;
} */

:deep(.el-input) {
    width: 200px;
}
</style>