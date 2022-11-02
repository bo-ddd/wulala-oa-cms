<script setup lang="ts">
import { ref, computed, reactive, h } from 'vue'
import axios from "@/assets/api/api";
import { ElMessage } from 'element-plus'
import { useRouter } from "vue-router";
import type{ User } from "../types/type";
let router = useRouter()
const selectValue = ref('')
const centerDialogVisible = ref(false)
const pageNum = ref(1)
const pageSize = ref(8)
const selectId = ref()
let list = reactive<User[]>([]);
let resData = reactive<User[]>([]);
let permissionList = reactive<User[]>([]);
const dialogFormVisible = ref(false)

const handleSizeChange = (val: number) => {
    pageSize.value = val
}
const handleCurrentChange = (val: number) => {
    pageNum.value = val
}

let getRoleList = async function () {
    let res = await axios.getRoleListApi()
    resData.length = 0
    resData.push(...res.data);
    list.length = 0
    // 把返回的数据深拷贝一份，把拷贝后的数据在tablie列表渲染，区分开select 和table
    list.push(...JSON.parse(JSON.stringify(resData)));
    console.log(resData);
}

getRoleList()

//删除角色权限
const handleDelete = async (index: number, row: User) => {
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
let total = computed(() => list.length)
//当前每页列表数据
let currentList = computed(() => list.slice(startIndex.value, endIndex.value))
//开始下标
let startIndex = computed(() => (pageNum.value - 1) * pageSize.value)
//结束下标
let endIndex = computed(() => pageNum.value * pageSize.value)
const handleChange = (value: string) => {
  
    if (value) {
        let user = resData.filter(item => item.id == Number(value));
        console.log(user);
        list.length = 0;   // list = []重新定义list会让他没双向绑定 所以只能list.length =0;
        list.push(...user);
    }
}
const queryPermissionDetail = async function (row: any) {
    let res = await axios.queryRolePermissionApi({
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

</script>
<template>
    <div class="select">
        <div style="display: inline-block; margin-left: 20px">
            <span style="margin-left: 10px">查询角色：</span>
            <el-select v-model="selectValue" filterable remote placeholder="请搜索" remote-show-suffix
                @change="handleChange" size="small">
                <el-option v-for="item in resData" :key="item.id" :label="item.roleName" :value="item.id" />
            </el-select>
        </div>
    </div>
    <div class="table">
        <el-button type="danger" class="mb-10" @click="router.push('createRoles')" size="small">创建角色</el-button>
        <el-table :data="currentList" style="width: 100%">
            <el-table-column label="id" width="240px" align="center">
                <template #default="scope" align="center">
                    <div align="center">
                        <span style="margin-left: 10px">{{ scope.row.id }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="角色名称" align="center">
                <template #default="scope" align="center">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                        <template #reference align="center">
                            <el-tag>{{ scope.row.roleName }}</el-tag>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="scope" align="center">
                    <el-button size="small" @click="queryPermissionDetail(scope.row)">查看权限详情</el-button>
                    <el-button size="small" @click="router.push('roleEditing')">设置角色权限</el-button>
                    <el-button size="small" type="danger"
                        @click="handleDelete(scope.$index, scope.row); centerDialogVisible = true">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block">
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
    <el-dialog v-model="dialogFormVisible" title="查看当前角色权限">
        <el-table :data="permissionList" style="width: 100%" align="center">
            <el-table-column prop="permissionId" label="权限Id" width="180" align="center" />
            <el-table-column prop="permissionName" label="权限名称" align="center" />
        </el-table>
    </el-dialog>

</template>

<style scoped>
.select {
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
}

.create {
    display: flex;
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
</style>