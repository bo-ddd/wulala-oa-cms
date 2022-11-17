<script setup lang="ts">
import axios from '../assets/api/api'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

//分页参数;
const currentPage = ref(1) //当前是第几页;
const pageSize = ref(10)  //每页显示的条数;
const total = ref(0)



//每页显示条数改变时的回调;
const handleSizeChange = (val: number) => {
    pageSize.value = val
    getUserQuitList()
}
//改变页数时的回调;
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    getUserQuitList()
}

interface TableData {
    id: number
    userId: number
    department: string,
    postName: string,
    avatarName: string | null
    applyTime: string
    quitTime: string
    reason: string
    status: number
}
const tableData = reactive<TableData[]>([])

enum StateCode {
    待审核 = 0,
    审核通过,
    拒绝
}

enum tagType {
    '' = 0,
    success,
    danger,
}

//获取用户的所在部门名称;
const getUserDeptName = async (userId: number) => {
    let userDeptList = await axios.getUserDeptListApi({ userId });
    let deptName = '';
    userDeptList.data.forEach((item: { deptName: string }) => {
        deptName += item.deptName
    })
    return deptName;
}

// //获取用户的职位名称;
const getUserPost = async (userId: number) => {
    let userInfo = await axios.queryUserInfoApi({ userId });
    let userPost = ''
    userInfo.data.roles.forEach((item: { roleName: string }) => {
        userPost += item.roleName;
    })
    return userPost;
}

//获取离职列表数据;
const getUserQuitList = async () => {
    let { data } = await axios.getQuitListApi({
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
    total.value = data.total;
    tableData.length = 0;
    Object.assign(tableData, data.list)
    tableData.forEach(async (item) => {
        item.applyTime = handleTimeFormat(item.applyTime) //申请时间
        item.quitTime = handleTimeFormat(item.quitTime) //离职时间
        item.department = await getUserDeptName(item.userId) //部门名称
        item.postName = await getUserPost(item.userId) //职位名称
    })
}
getUserQuitList()

//处理时间数据格式Api;
const handleTimeFormat = (Time: string) => {
    return Time.substring(0, 10)
}


//审核按钮的点击事件;
const handleEdit = (index: number, row: TableData) => {
    dialogFormVisible.value = true
}
//审核按钮的状态;
const buttonStatus = ref(false)
//审核按钮弹层;
const dialogFormVisible = ref(false)
const formLabelWidth = '140px';
const approvalFormRef = ref<FormInstance>()

interface ApprovalForm {
    operation: string;
    suggestion: string;
}
const approvalForm = reactive<ApprovalForm>({
    operation: '',
    suggestion: ''
})

const rules = reactive<FormRules>({
    operation: [
        {
            required: true,
            message: '请您完成审核',
            trigger: 'change'
        }
    ]
})

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //确认消息弹出框
            ElMessageBox.confirm(
                '您确定提交离职申请吗？',
                '提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(async () => {
                //调用提交接口;
                await axios.userQuitApplyApi({

                }).then(res => {
                    ElMessage({
                        type: 'success',
                        message: '审批成功',
                    })
                }, error => {
                    ElMessage.error('审批失败')
                })
                dialogFormVisible.value = false;
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消审批',
                })
            })
        } else {
            ElMessage.error('审批失败')
        }
    })
}

</script>

<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column label="ID" prop="id" align="center" />
        <el-table-column label="姓名" align="center">
            <template #default="scope">
                <el-tag size="small">{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="部门" sortable prop="department" align="center" />
        <el-table-column label="职位" sortable prop="postName" align="center" />
        <el-table-column label="申请日期" sortable prop="applyTime" align="center" />
        <el-table-column label="离职日期" sortable prop="quitTime" align="center" />
        <el-table-column label="离职原因" prop="reason" align="center" />
        <el-table-column label="审核状态" prop="status" align="center">
            <template #default="scope">
                <el-tag :type="tagType[scope.row.status]" size="small">{{ StateCode[scope.row.status] }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)"
                    :disabled="scope.row.status != 0">{{ scope.row.status != 0 ? '已审核' : '审核' }}</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]"
        :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />

    <el-dialog v-model="dialogFormVisible" title="审核处理">
        <el-form ref="approvalFormRef" :model="approvalForm" hide-required-asterisk size="small" label-width="120px"
            :rule="rules">
            <el-form-item label="审核操作" prop="operation">
                <el-radio-group v-model="approvalForm.operation">
                    <el-radio label="1">通过</el-radio>
                    <el-radio label="2">拒绝</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="审核意见" prop="suggestion">
                <el-input v-model="approvalForm.suggestion" type="textarea" resize='none' />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button size="small" @click="resetForm(approvalFormRef)">重置</el-button>
                <el-button size="small" type="danger" @click="submitForm(approvalFormRef)">
                    确认
                </el-button>
            </span>
        </template>

    </el-dialog>
</template>


<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}

/* 弹出框中的文本域 */
:deep(.el-textarea__inner) {
    width: 80%
}
</style>