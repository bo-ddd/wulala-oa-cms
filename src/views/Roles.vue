<script setup lang="ts">
import { ref, computed, reactive, h } from 'vue'
import axios from "@/assets/api/api";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
import type { Role } from "../types/Role";
import RoleEditing from './RoleEditing.vue';
let router = useRouter()
const selectValue = ref('')
const centerDialogVisible = ref(false)
const pageNum = ref(1)
const pageSize = ref(8)
const selectId = ref()
let resData = reactive<Role[]>([]);
let list = reactive<Role[]>([]);
let permissionList = reactive<Role[]>([]);
const dialogFormVisible = ref(false)
let RoleId=ref()

//封装 角色列表接口
let getRoleList = async function () {
    let res = await axios.getRoleListApi()
    resData.length = 0      //resData.length = [] 失去数据双向绑定   清空resData
    resData.push(...res.data);

    list.length = 0
    // 把返回的数据深拷贝一份，把拷贝后的数据在tablie列表渲染，区分开select 和table
    list.push(...JSON.parse(JSON.stringify(resData)));
    console.log(resData);
}

getRoleList()
//搜索框改变
const handleChange = (value: string) => {
    if (value) {
        RoleId.value=value;
    }
}
//点击搜索按钮
const searchRole=function(){
    let user = resData.filter(item => item.id == Number( RoleId.value));
        console.log(user);
        list.length = 0;   // list = []重新定义list会让他没双向绑定 所以只能list.length =0;
        list.push(...user);
}
const queryPermissionList = async function (row: any) {
    let res = await axios.queryRolePermissionListApi({
        roleId: row.id
    })
    console.log(res);
    if (res.data.length) {
        Object.assign(permissionList, res.data)  //吧res.data 合并到permissionList中
        dialogFormVisible.value = true;
    } else {
        dialogFormVisible.value = false;
        ElMessage({
            message: h('p', null, [
                h('span', null, '此角色'),
                h('i', { style: 'color: teal' }, '无权限'),
            ]),
        })
    }
}
//删除角色权限
const handleDelete = async (index: number, row: Role) => {
    selectId.value = row.id
    // console.log(index, row)
    console.log(selectId.value);

}
//弹层确定删除角色及权限
const handleDelectRole = async function () {
    await axios.deleteRoleApi({
        id: selectId.value
    })
    getRoleList()
}
//分页
let total = computed(() => list.length)
//当前每页列表数据
let currentList = computed(() => list.slice(startIndex.value, endIndex.value))
//开始下标
let startIndex = computed(() => (pageNum.value - 1) * pageSize.value)
//结束下标
let endIndex = computed(() => pageNum.value * pageSize.value)
const handleSizeChange = (val: number) => {
    pageSize.value = val
}
const handleCurrentChange = (val: number) => {
    pageNum.value = val
}
const to = function (id: number) {
    router.push({
        name: 'roleEditing',
        query: {
            id
        }
    }
    )
}
</script>
<template>
    <div class="select">
        <div style="display: inline-block;">
            <el-select v-model="selectValue" filterable placeholder="请输入角色名称"  @change="handleChange">
                <el-option v-for="item in resData" :key="item.id" :label="item.roleName" :value="item.id" />
            </el-select>
        <el-button type="danger" class="float ml-10" @click="searchRole" plain>搜索</el-button>

        </div>
        <el-button type="danger" class="float" @click="router.push('createRoles')" >创建角色</el-button>

    </div>
    <div class="table mt-20">
        <el-table :data="currentList" style="width: 100%">
            <el-table-column label="ID" width="240px" align="center">
                <template #default="scope" align="center">
                    <div align="center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角色名称" align="center">
                <template #default="scope" align="center">

                    <el-tag>{{ scope.row.roleName }}</el-tag>

                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="300">
                <template #default="scope" align="center">
                    <div class="flex">
                        <el-link type="success"  @click="queryPermissionList(scope.row)">查看权限详情</el-link>
                        <el-link @click="to(scope.row.id)" type="warning">设置角色权限</el-link>
                        <el-link  @click="handleDelete(scope.$index, scope.row); centerDialogVisible = true" >删除</el-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block mt-20">
            <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
                layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
    <!-- //删除角色弹层 -->
    <el-dialog v-model="centerDialogVisible" title="删除角色" width="30%" align-center>
        <span>是否删除角色及角色对应的所有权限?</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="danger" @click="handleDelectRole(); centerDialogVisible = false">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- //查看角色权限 -->
    <el-dialog v-model="dialogFormVisible" title="查看当前角色权限" width="30%" align-center>
        <el-table :data="permissionList" style="width: 100%" align="center">
            <el-table-column prop="permissionId" label="权限Id" align="center" />
            <el-table-column prop="permissionName" label="权限名称" align="center" />
        </el-table>
    </el-dialog>
</template>

<style scoped>
.select {
    align-items: center;
    padding: 5px 0;
    margin-bottom: 10px;
}

:deep(.el-input) {
    width: 200px;
}

.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}

:deep(.el-dialog) {
    width: 600px;
}

.lable {
    display: inline-block;
    font-size: 15px;
    font-weight: 600;
    color: rgb(145, 137, 137);
}
.float{
    float: right;
}
.flex{
    display: flex;
    justify-content: space-around;
}
</style>