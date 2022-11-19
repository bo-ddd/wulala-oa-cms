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
    getUserQuitList({
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
}
//改变页数时的回调;
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    getUserQuitList({
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
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
    enclosure: string
    status: number
}
const tableData = reactive<TableData[]>([])

enum StateCode {
    '待审核' = 0,
    '审核通过',
    '拒绝'
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
//查询参数的类型;
interface UserQuitListParam {
    avatarName?: string,
    status?: number,
    applyStartTime?: string,
    applyEndTime?: string,
    pageSize: number,
    pageNum: number

}
//获取离职列表数据;
const getUserQuitList = async (param: UserQuitListParam) => {
    let { data } = await axios.getQuitListApi(param)
    console.log(data.list)
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
//刷新页面，初始化数据列表;
getUserQuitList({
    pageSize: pageSize.value,
    pageNum: currentPage.value
})

//处理时间数据格式Api;
const handleTimeFormat = (Time: string) => {
    return Time.substring(0, 10)
}

//审核按钮的点击事件;
const handleEdit = (index: number, row: TableData) => {
    dialogFormVisible.value = true
    approvalForm.id = row.id
    applicantId.value = row.userId
}
//审核按钮弹层;
const dialogFormVisible = ref(false)
const approvalFormRef = ref<FormInstance>()

interface ApprovalForm {
    id: number;
    operation: string;
    suggestion: string;
}
const approvalForm = reactive<ApprovalForm>({
    id: 0,
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
//通知申请人审核结果功能;
const applicantId = ref(0);
//创建消息api;
const createMessage = async (text: string) => {
    let { data } = await axios.createMessageApi({
        content: text
    })
    return data.id
}
//发送消息;
const sentMessage = async (text: string) => {
    axios.sendMessageApi({
        userId: applicantId.value,
        msgId: await createMessage(text)
    })
}

//完后审核，提交表单;
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            //确认消息弹出框
            ElMessageBox.confirm(
                '您确定要提交审核吗？',
                '提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(async () => {
                //调用提交接口;
                await axios.quitUserExamineApi({
                    id: approvalForm.id,
                    status: approvalForm.operation
                }).then(res => {
                    ElMessage({
                        type: 'success',
                        message: '审批成功',
                    })
                    //发送消息给离职申请人;
                    approvalForm.operation == '1' ? sentMessage('您的申请已通过') : sentMessage('您的申请被拒绝');
                }, error => {
                    ElMessage.error('审批失败')
                })
                dialogFormVisible.value = false;
                getUserQuitList({
                    pageSize: pageSize.value,
                    pageNum: currentPage.value
                })
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
//查询选项;
const queryOption: any = reactive({
    avatarName: '',
    status: '',
    duration: '',
})

//获取-审核状态-查询列表;
const StateCodeString = ['待审核', '审核通过', '拒绝'];

//获取-用户昵称-查询列表;
const userAvatarNameList = reactive<string[]>([])
const getUserAvatarNameList = async () => {
    const { data } = await axios.getUserListApi({});
    const res = await axios.getUserListApi({
        pageSize: data.total
    })
    userAvatarNameList.length = 0;
    res.data.list.forEach((item: { avatarName: string }) => {
        userAvatarNameList.push(item.avatarName)
    })
}
getUserAvatarNameList()

//查询数据;
const queryDimissionInfo = () => {
    getUserQuitList({
        avatarName: queryOption.avatarName, //姓名
        status: Number(StateCode[queryOption.status]), //审核状态
        applyStartTime: queryOption.duration[0],  //开始时间
        applyEndTime: queryOption.duration[1], //结束时间
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
}
//附件;
const enclosureDisabledStatus = ref(false)

</script>

<template>
    <div class="flex-options">
        <el-select v-model="queryOption.avatarName" placeholder="请输入姓名" filterable size="small">
            <el-option v-for="item in userAvatarNameList" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="queryOption.status" placeholder="请输入审核状态" size="small">
            <el-option v-for="item in StateCodeString" :key="item" :label="item" :value="item" />
        </el-select>
        <el-date-picker v-model="queryOption.duration" type="daterange" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间" size="small" />
        <el-button size="small" type="danger" @click="queryDimissionInfo">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" class="mt-24">
        <el-table-column label="ID" prop="id" align="center" />
        <el-table-column label="姓名" align="center">
            <template #default="scope">
                <el-tag size="small">{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="部门" prop="department" align="center" />
        <el-table-column label="职位" prop="postName" align="center" />
        <el-table-column label="申请日期" sortable prop="applyTime" align="center" />
        <el-table-column label="离职日期" sortable prop="quitTime" align="center" />
        <el-table-column label="离职原因" prop="reason" align="center" />
        <el-table-column label="附件" prop="enclosure" align="center">
            <template #default="scope">
                <el-link :type="scope.row.enclosure ? 'primary' : 'info'" :href="scope.row.enclosure"
                    :disabled="scope.row.status != 0 || !scope.row.enclosure">
                    {{ scope.row.enclosure ? '查看' : '无' }}</el-link>
            </template>
        </el-table-column>
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
    <!-- 分页 -->
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 20, 30, 40]"
        :background="true" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" class="mt-24" />
    <!-- 弹框 -->
    <el-dialog v-model="dialogFormVisible" title="审核处理">
        <el-form ref="approvalFormRef" :model="approvalForm" hide-required-asterisk size="small" label-width="120px"
            :rule="rules">
            <el-form-item label="审核操作" prop="operation">
                <el-radio-group v-model="approvalForm.operation">
                    <el-radio :label="1">通过</el-radio>
                    <el-radio :label="2">拒绝</el-radio>
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

:deep(.el-input__inner) {
    width: 100px
}

.flex-options {
    display: flex;
    width: 50%;
    gap: 12px;
}
</style>