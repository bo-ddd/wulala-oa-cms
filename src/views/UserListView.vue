<template>
    <div class="ipt">
        <el-form-item label="查询部门用户">
            <el-select label="查询部门用户" v-model="form.searchDepId" placeholder="请选择部门" clearable>
                <el-option v-for="item in departmentList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <el-button class="ml-20" type="danger" @click="queryDeptUser(form.searchDepId)"> 查询成员
            </el-button>
            <el-button class="ml-20" type="default" @click="getUserList(pageSize)">重置</el-button>
        </el-form-item>
        <el-button class="creat-user" type="danger" @click="toCreateUser()">创建用户</el-button>
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
        <el-table-column label="性别" align="center" width="100px">
            <template #default="scope">
                <el-tag type="success">{{ showSex(scope.row.sex) }}</el-tag>
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
                <el-button type="danger" @click="dialogFormVisibleAdd = false; addUserRole(form.userId)">
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
                <el-button type="danger" @click="dialogFormVisibleDelete = false; deleteUserRole()">
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
                <el-button type="danger" @click="dialogFormisiblGeroup = false; addDepartment()">
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
                <el-button type="danger" @click="dialogFormisiblDelete = false; removeUserDepartment(form.userId)">
                    确认删除
                </el-button>
            </span>
        </template>
    </el-dialog>

    <div class="pagination mt-20">
        <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20, 25, 30]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
    <AffixTip class="mt-20"></AffixTip>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
    getUserListApi, getRoleListApi, addUserRoleApi, queryUserInfoApi, deleteUserRoleApi, getUserDeptListApi,
    queryUserMembersApi, getDeptListApi, addUserDeptApi, deleteUserDeptApi
} from '@/assets/api/api'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
import { usePageSizeOptionsStore } from '@/stores/tools'
import { storeToRefs } from "pinia";
import type { Form, UserRolesInfo, DepartmentList, UserDepartmentList, UserInfo, RoleList } from '@/types/User'
import AffixTip from '@/components/AffixTip.vue';

const pageSizeOptionsStore = usePageSizeOptionsStore()
pageSizeOptionsStore.getStorageStatus()
const { defaultValue } = storeToRefs(pageSizeOptionsStore)

const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const dialogFormVisibleAdd = ref(false);
const dialogFormVisibleDelete = ref(false);
const dialogFormisiblGeroup = ref(false);
const dialogFormisiblDelete = ref(false);
const formLabelWidth = '140px'
const router = useRouter();
const rolesInput = ref<number | null>();
const departmentInput = ref<number | null>();
let departmentList = reactive<DepartmentList[]>([]);
let userDepartmentList = reactive<UserDepartmentList[]>([]);
let userListData = reactive<UserInfo[]>([]);
let roleList = reactive<RoleList[]>([]);
let userRolesList = reactive<RoleList[]>([]);
const userInfo = reactive<UserRolesInfo[]>([]);
const pageNum = ref(1);
const pageSize = ref(10);
const total = ref<number>();
const label = ref('');
const form = reactive<Form>({
    deptId: 0,
    depName: '',
    searchDepId: null,
    userId: 0,
    rolesId: null,
    userName: '用户昵称'
})
getDepartmentId();
if (defaultValue.value) {
    pageSize.value = defaultValue.value
    getUserList(pageSize.value);
};
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
const handleSizeChange = (val: number) => {
    getUserList(pageSize.value, pageNum.value)
    pageSize.value = val
}
const handleCurrentChange = (val: number) => {
    getUserList(pageSize.value, pageNum.value)
    pageNum.value = val
}
async function getUserList(pageSize?: number, pageNum?: number) {
    label.value = ''
    await getUserListApi({
        pageNum: pageNum,
        pageSize: pageSize
    }).then(res => {
        if (res.status === 1) {
            Object.assign(userListData, res.data.list)
            total.value = res.data.total
        }
    })
    rolesInput.value = null;
    departmentInput.value = null;
    form.searchDepId = null
}
(async function () {
    let rolesList = await getRoleListApi({})
    Object.assign(roleList, rolesList.data)
})()
const showSex = function (sex: any) {
    return sex ? '男' : '女'
}
// 添加用户角色
const addUserRole = async (addUserId: number) => {
    let res = await addUserRoleApi({
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
// 删除用户角色
const getUserId = async (row: UserRolesInfo) => {
    queryUserDepartment(row.userId)
    let res = await queryUserInfoApi({
        userId: row.userId
    })
    if (res.status == 1) {
        Object.assign(userInfo, res.data)
        Object.assign(userRolesList, res.data.roles)
    }
    form.userId = row.userId
    form.userName = row.avatarName
}
const deleteUserRole = async () => {
    let res = await deleteUserRoleApi({
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
    await getUserDeptListApi({
        userId: id
    }).then(res => {
        if (res.status == 1) {
            Object.assign(userDepartmentList, res.data)
        }
    })
}
// 查询部门用户
const queryDeptUser = async (id: number | null) => {
    await queryUserMembersApi({
        deptId: id
    }).then(res => {
        userListData.length = 0
        res.data.forEach((item: UserInfo) => {
            userListData.push(item)
        });
        total.value = userListData.length
    })
}
// 给用户添加部门
async function getDepartmentId() {
    await getDeptListApi({}).then(res => {
        if (res.status == 1) {
            form.deptId = res.data.id
            form.searchDepId = res.data.id
            form.depName = res.data.name
            Object.assign(departmentList, res.data)
        }
    })
}
const addDepartment = async () => {
    getDepartmentId();
    await addUserDeptApi({
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
    await deleteUserDeptApi({
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
.ipt {
    display: flex;
    justify-content: space-between;
}

a {
    cursor: pointer;
    margin: 0 5px;
    text-decoration: none;
}

.creat-user {
    float: right;
}


 
:deep(.el-form-item__content > .el-input) {
    width: 215px;
}

</style>