<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from '@/assets/api/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed } from '@vue/reactivity';



const small = ref(false)
const background = ref(true)
const disabled = ref(false)
const input = ref();
const inputAdd = ref();
let pageNum = ref(1);
let pageSize = ref(10);
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
interface Permission {
    id: number,
    permissionName: string
}
let permissionList = reactive<Permission[]>([]);
//数据总条数
let total = computed(() => permissionList.length)
// 当前页面数据条数
let currentList = computed(() => {
    return permissionList.slice(startIndex.value, endIndex.value)
})
// 
let startIndex = computed(() => (pageNum.value - 1) * pageSize.value)
let endIndex = computed(() => pageNum.value * pageSize.value)
const getPermissionList = async (pageSize?: number, pageNum?: number) => {
    await axios.getPermissionListApi({}).then(res => {
        if (res.status === 1) {
            permissionList.length = 0;
            permissionList.push(...res.data);
        }
    })
}
// 进页面先调用接口获取列表
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
    console.log(`每页${val}条信息`);
    pageSize.value = val
}

const handleCurrentChange = async (val: number) => {
    console.log(`这是第${val}页`)
    pageNum.value = val
}

const userSearch = async (input: number) => {
    axios.permissionUserListApi({
        userId: input
    }).then(res => {
        if (res.data.status == 1) {
            permissionList = res.data
            console.log('-----查询成功----------');
            console.log(res.data);
        } else {
            alert('查询失败')
        }
    })
}
// 添加权限
const addPermission = async (inputAdd: string) => {
    await axios.addPermissionApi({
        permissionName: inputAdd
    }).then(res => {
        if (res.status == 1) {
            addSuccess();
            getPermissionList();
        } else {
            addError();
        }
    })
}



</script>
<template>

    <div class="ipt-add">
        <span class="label label-add">添加权限：</span>
        <el-input v-model="inputAdd" size="small" placeholder="请输入权限名称" clearable />
        <el-button type="danger" size="small" @click="addPermission(inputAdd)">添加</el-button>
    </div>
    <div class="ipt">
        <span class="label label-search">查询权限：</span>
        <el-input v-model="input" size="small" placeholder="请输入权限ID" clearable />
        <el-button type="danger" size="small" @click="userSearch(input)">搜索</el-button>
    </div>
    <el-table :data="currentList" border style="width: 100%" fit>
        <el-table-column label="权限ID" align="center">
            <template #default="scope">
                <div>{{ scope.row.id }}</div>
            </template>
        </el-table-column>

        <el-table-column label="模块" align="center">
            <template #default="scope">
                <el-tag size="small" >{{ scope.row.permissionName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="300">
            <template #default="scope">
                <el-button size="small" type="danger" @click="open(scope.row.id)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
        <el-pagination v-model:currentPage="pageNum" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]"
            :small="small" :disabled="disabled" :background="background"
            layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>
<style scoped>
.ipt,
.ipt-add {
    padding: 20px 0;
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

:deep(.el-button) {
    margin-left: 20px;
}
</style>