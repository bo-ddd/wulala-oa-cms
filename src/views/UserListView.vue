<template>

    <!-- <div class="ipt">
        <span class="label">查询用户：</span>
        <el-select v-model="form.userId" size="small" filterable placeholder="请输入用户ID" clearable>
            <el-option v-for="item in userNameList" :key="item.userId" :label="item.avatarName" :value="item.userId" />
        </el-select>
        <el-button class="ml-10" type="danger" size="small" @click="searchUserRoles(form.userId)">搜索</el-button>
        <el-button class="ml-10" type="danger" size="small" @click="getUserList()">重置</el-button>
    </div> -->

    <div class="ipt">
        <span class="label">查询部门用户：</span>
        <!-- <el-input v-model="departmentInput" size="small" placeholder="请输入用户ID" clearable /> -->

        <el-select v-model="form.deptId" size="small" filterable placeholder="请输入部门名称" clearable>
            <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>

        <!-- <el-button class="ml-10" type="danger" size="small" @click="searchUserDepartment(form.userId)">查询 
        </el-button> -->
        <el-button class="ml-10" type="danger" size="small" @click="queryDeptUser(form.deptId)">查询成员
        </el-button>

        <el-button class="ml-10" type="danger" size="small" @click="getUserList()">重置</el-button>
    </div>

    <el-table :data="userListData" border style="width: 100%" fit>
        <el-table-column label="用户ID" align="center" width="100px">
            <template #default="scope">
                <el-tag size="small" type="warning">{{ scope.row.userId }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
            <template #default="scope">
                <el-tag size="small">{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <!-- <el-table-column :label=label align="center">
            <template #default="scope">
                <div size="small" type="danger">{{ scope.row.roles ? showRoleName(scope.row.roles) : scope.row.hobby }}
                </div>
            </template>
        </el-table-column> -->
        <el-table-column v-if="label" :label=label align="center">
            <template #default="scope">
                <div size="small" type="danger">{{ scope.row._rawValue ? showDeptName(scope.row._rawValue) :
                        showRoleName(scope.row.roles)
                }}
                </div>
            </template>
        </el-table-column>
        <el-table-column v-if="label" :label=label align="center">
            <template #default="scope">
                <div size="small" type="danger">{{ scope.row.roles ? showDeptName(scope.row.roles) :
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
                <!-- <el-select v-model="form.userOperationId" class="m-2" placeholder="请选操作" size="small">
                    <el-option v-for="item in operation" :key="item.id" :label="item.name" :value="item.id"
                        @onclick="item.function(scope.row)" />
                </el-select> -->
                <a class="touserdetail" @click="toUserDetail(scope.row.userId)">用户详情</a>
                <a class="roles-add" @click="getUserId(scope.row); dialogFormVisibleAdd = true">添加角色</a>
                <a class="roles-delete" @click="getUserId(scope.row); dialogFormVisibleDelete = true">删除角色</a>
                <a class="geroup-add" @click="getUserId(scope.row); dialogFormisiblGeroup = true">添加部门</a>
                <a class="geroup-delete" @click="getUserId(scope.row); dialogFormisiblDelete = true">删除部门</a>
                <!-- <el-button type="primary" size="small" @click="toUserDetail();">用户详情
                </el-button>
                 <el-button type="primary" size="small" @click="addRoles(scope.row); dialogFormVisibleAdd = true">添加角色
                </el-button> 
                <el-button type="danger" size="small" @click="getUserId(scope.row); dialogFormVisibleDelete = true">删除角色
                </el-button>
                <el-button type="primary" size="small" @click="getUserId(scope.row); dialogFormisiblGeroup = true">添加部门
                </el-button>
                <el-button type="danger" size="small" @click="getUserId(scope.row); dialogFormisiblDelete = true">删除部门
                </el-button> -->
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

    <el-dialog v-model="dialogFormisiblGeroup" title="添加用户部门">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" size="small" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="项目组" :label-width="formLabelWidth">
                <el-select v-model="form.deptId" class="m-2" placeholder="请选择要添加项目组" size="small">
                    <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id"
                        size="small" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormisiblGeroup = false">取消</el-button>
                <el-button type="primary" @click="dialogFormisiblGeroup = false; addDepartment(form.userId)">
                    确认添加
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="dialogFormisiblDelete" title="删除用户部门">
        <el-form :model="form">
            <el-form-item label="用户昵称" :label-width="formLabelWidth">
                <el-input v-model="form.userName" size="small" autocomplete="off" readonly='readonly' />
            </el-form-item>
            <el-form-item label="项目组" :label-width="formLabelWidth">
                <el-select v-model="form.deptId" class="m-2" placeholder="请选择要删除的项目组" size="small">
                    <el-option v-for="item in userDepartmentList" :key="item.deptId" :label="item.deptName"
                        :value="item.deptId" size="small" />
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

    <div class="pagination">
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
const selectIndex = ref(0)
const operation = [
    {
        id: 1,
        name: '用户详情',
        function: (row: User) => {
            toUserDetail(row.userId)
        }
    }, {
        id: 2,
        name: '添加角色',
        function: (row: User) => {
            getUserId(row)
        },
    }, {
        id: 3,
        name: '删除角色',
        function: (row: User) => {
            getUserId(row)
        }
    }, {
        id: 4,
        name: '添加部门',
        function: (row: User) => {
            getUserId(row)
        }
    }, {
        id: 5,
        name: '删除部门',
        function: (row: User) => {
            getUserId(row)
        }
    },
]
const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const formLabelWidth = '140px'
const router = useRouter();

const toUserDetail = (id: number) => {
    console.log(id);
    
    router.push({
        name: 'userDetail',
        query: {
            id
        }
    })
}
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
    label.value = ''
    axios.getUserListApi({
        pageNum: pageNum,
        pageSize: pageSize
    }).then(res => {
        if (res.status === 1) {
            userListData.value = res.data.list;
        }
    })
    rolesInput.value = '';
    departmentInput.value = '';
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

const form = reactive({
    deptId: 0,
    depName: null,
    userId: 0,
    rolesId: null,
    userOperationId: null,
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
    // form.userOperationId = row.userId
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
// 查询用户角色
const searchUserRoles = async (id: number) => {
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
const queryDeptUser = async (id: number) => {
    await axios.queryUserMembersApi({
        deptId: id
    }).then(res => {
        console.log(res.data);
        userListData.value.length = 0
        res.data.forEach((item: any) => {
            userListData.value.push(item)
        });
    })
}
// 查询用户部门
let deptNameList = ref([]);
const searchUserDepartment = async (id: number) => {
    label.value = '用户部门'
    await axios.getUserDeptListApi({
        userId: id
    }).then(async res => {
        if (res.status == 1) {
            let userData = (await axios.queryUserInfoApi({ userId: id })).data
            userListData.value.length = 0
            deptNameList.value = res.data
            Object.assign(userData, deptNameList)
            userListData.value.push(userData)
        }
    })
}


// 给用户添加部门
const getDepartmentId = async () => {
    await axios.getDeptList({}).then(res => {
        if (res.status == 1) {
            form.deptId = res.data.id
            form.depName = res.data.name
            departmentList.value = res.data
        }
    })
}


getDepartmentId();
const addDepartment = async (userId: number) => {
    getDepartmentId();
    await axios.addUserDeptApi({
        userId: form.userId,
        deptId: form.deptId || 0
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
    })
    form.deptId = null
}
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

a {
    margin: 0 5px;
    text-decoration: none;
}

a:hover {
    color: black;
    text-decoration: underline;
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

:deep(.el-pagination) {
    margin-top: 20px;
}

:deep(.el-input) {
    width: 200px;
}
</style>