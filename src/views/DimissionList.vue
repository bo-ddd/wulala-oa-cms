<script setup lang="ts">
import { getQuitListApi, getUserDeptListApi, queryUserInfoApi, createMessageApi, sendMessageApi, quitUserExamineApi, getUserListApi } from '../assets/api/api'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { usePageSizeOptionsStore } from '@/stores/tools'
import { storeToRefs } from "pinia";
import AffixTip from '@/components/AffixTip.vue';
import type { TableData, UserQuitListParam, ApprovalForm } from '@/types/Dimission';
import ResetBtn from '@/components/ResetBtn.vue'

//pinia模块，动态改变一页显示最佳条数;
const pageSizeOptionsStore = usePageSizeOptionsStore()
const { defaultValue } = storeToRefs(pageSizeOptionsStore)  //从pinia中拿到一页显示的默认条数; 
const currentPage = ref(1) //当前是第几页;
const pageSize = ref(10)  //每页显示的条数;
const total = ref(0) //总条数;
const tableData = reactive<TableData[]>([]) //审核列表的数据对象;
const dialogFormVisible = ref(false) //审核按钮弹出框状态;
const applicantId = ref(0) //离职申请人的ID;
const approvalFormRef = ref<FormInstance>() //审核弹出框中的表单验证实例;

const StateCodeString = ['全部', '待审核', '审核通过', '拒绝']; //获取-审核状态-查询列表;
const userAvatarNameList = reactive<string[]>([]) //用户昵称列表;
const dialogFormVisibleEnclosure = ref(false); //附件弹出框的显示状态;
const enclosureUrl = ref<string>(''); //附件弹出框中显示的图片Url;
const approvalForm = reactive<ApprovalForm>({//审核弹出框的表单数据;
    id: 0,
    operation: '',
    suggestion: ''
})
const rules = reactive<FormRules>({//审核弹出框的表单验证;
    operation: [
        {
            required: true,
            message: '请您完成审核',
            trigger: 'change'
        }
    ]
})
const queryOption: any = reactive({ //离职列表查询选项的值;
    avatarName: '',
    status: '全部',
    duration: '',
})
enum StateCode { //审核状态查询列表;
    '待审核',
    '审核通过',
    '拒绝'
}
enum tagType { //审核状态的b背景颜色;
    '',
    success,
    danger,
}

pageSizeOptionsStore.getStorageStatus() //从pinia中拿到当前存储状态;
pageSize.value = defaultValue.value ? defaultValue.value : pageSize.value; // 从pinio中拿到用户设置的默认值;
getUserQuitList({ //刷新页面，初始化数据列表;
    pageSize: pageSize.value,
    pageNum: currentPage.value
})
getUserAvatarNameList() //获取用户昵称查询列表;


//每页显示条数改变时的回调;
function handleSizeChange(val: number) {
    pageSize.value = val
    queryDimissionInfo()
}

//改变页数时的回调;
function handleCurrentChange(val: number) {
    currentPage.value = val
    queryDimissionInfo()
}

//获取离职列表数据;
async function getUserQuitList(param: UserQuitListParam) {
    let { data } = await getQuitListApi(param)
    total.value = data.total;
    tableData.length = 0;
    Object.assign(tableData, data.list)
    tableData.forEach(async (item) => {
        item.applyTime = handleTimeFormat(item.applyTime) //申请时间
        item.quitTime = handleTimeFormat(item.quitTime) //离职时间
        Promise.all([getUserDeptListApi({ userId: item.userId }), queryUserInfoApi({ userId: item.userId })]).then(res => {
            let deptName = '';
            let userPost = '';
            res[0].data.forEach((item: { deptName: string }) => {
                deptName += item.deptName
            });
            res[1].data.roles.forEach((item: { roleName: string }) => {
                userPost += item.roleName;
            })
            item.department = deptName; //部门名称
            item.postName = userPost //职位名称
        })
    })
}

//处理时间数据格式Api;
function handleTimeFormat(time: string) {
    return time.substring(0, 10)
}

//审核按钮的点击事件;
async function handleEdit(index: number, row: TableData) {
    dialogFormVisible.value = true
    approvalForm.id = row.id
    applicantId.value = row.userId
}

//审核弹层中的重置按钮的点击事件;
function resetForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.resetFields()
}
//通知申请人审核结果功能;
//创建消息api;
async function createMessage(text: string) {
    let { data } = await createMessageApi({
        content: text
    })
    return data.id
}
//发送消息;
async function sentMessage(text: string) {
    sendMessageApi({
        userId: applicantId.value,
        msgId: await createMessage(text)
    })
}

//完后审核，提交表单;
async function submitForm(formEl: FormInstance | undefined) {
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
                await quitUserExamineApi({
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

//获取-用户昵称-查询列表;
async function getUserAvatarNameList() {
    const res = await getUserListApi({
        pageSize: 2147483647
    })
    userAvatarNameList.length = 0;
    res.data.list.forEach((item: { avatarName: string }) => {
        userAvatarNameList.push(item.avatarName)
    })
}

//查询数据;
function queryDimissionInfo() {
    getUserQuitList({
        avatarName: queryOption.avatarName, //姓名
        status: Number(StateCode[queryOption.status]), //审核状态
        applyStartTime: queryOption.duration[0],  //开始时间
        applyEndTime: queryOption.duration[1], //结束时间
        pageSize: pageSize.value,
        pageNum: currentPage.value
    })
}

// 判断是否有权限审核;
async function isApprover(applicationUserId: number) {
    // 对比申请人与当前用户的上下级关系
    //获取申请人的资料;
    const { data } = await queryUserInfoApi({})
    const userId = data.userId

    // 如果申请人与登录人是同一用户, 没有权限;
    //获取所在的部门ID;
    const { data: UserDeptInfo } = await getUserDeptListApi({ userId });
    const { data: applicationUserDeptInfo } = await getUserDeptListApi({ userId: applicationUserId })
    //如果申请人与登录人的部门不相同，没有权限;

    if (UserDeptInfo[0].deptId != applicationUserDeptInfo[0].deptId) {
        return false
    } else if (userId == applicationUserId) {
        return false
    } else {
        return true
    }
}

//查看附件弹框;
function getEnclosureUrl(imgUrl: string) {
    dialogFormVisibleEnclosure.value = true;
    enclosureUrl.value = imgUrl
}

</script>

<template>
    <div class="flex-options">
        <el-form-item label="姓名">
            <el-select v-model="queryOption.avatarName" placeholder="请输入姓名" filterable>
                <el-option v-for="item in userAvatarNameList" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
            <el-select v-model="queryOption.status" placeholder="请输入审核状态">
                <el-option v-for="item in StateCodeString" :key="item" :label="item" :value="item" />
            </el-select>
        </el-form-item>
        <el-form-item label="时间范围">
            <el-date-picker v-model="queryOption.duration" type="daterange" range-separator="至" start-placeholder="开始时间"
                end-placeholder="结束时间" />
        </el-form-item>
        <el-button type="danger" @click="queryDimissionInfo">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" class="mt-20">
        <el-table-column label="ID" prop="id" align="center" />
        <el-table-column label="姓名" align="center">
            <template #default="scope">
                <el-tag>{{ scope.row.avatarName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="部门" prop="department" align="center" />
        <el-table-column label="职位" prop="postName" align="center" />
        <el-table-column label="申请日期" sortable prop="applyTime" align="center" />
        <el-table-column label="离职日期" sortable prop="quitTime" align="center" />
        <el-table-column label="离职原因" prop="reason" align="center" />
        <el-table-column label="附件" prop="enclosure" align="center">
            <template #default="scope">
                <el-link :type="scope.row.enclosure ? 'primary' : 'info'" :disabled="!scope.row.enclosure"
                    @click="getEnclosureUrl(scope.row.enclosure)">
                    {{ scope.row.enclosure ? '查看' : '无' }}
                </el-link>
            </template>
        </el-table-column>
        <el-table-column label="审核状态" prop="status" align="center">
            <template #default="scope">
                <el-tag :type="tagType[scope.row.status]">{{ StateCode[scope.row.status] }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template #default="scope">
                <el-link type="danger" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.status != 0">
                    {{ scope.row.status != 0 ? '已审核' : '审核' }}
                </el-link>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20, 25, 30]"
        layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" class="mt-20" />
    <!-- 审核弹框 -->   
    <el-dialog v-model="dialogFormVisible" title="审核处理">
        <el-form ref="approvalFormRef" :model="approvalForm" hide-required-asterisk label-width="120px" :rule="rules">
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
                <!-- <el-button @click="resetForm(approvalFormRef)">重置</el-button> -->
                <ResetBtn :form-el="approvalFormRef"></ResetBtn>
                <el-button type="danger" @click="submitForm(approvalFormRef)">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>

    <!-- 查看附件弹框 -->
    <el-dialog v-model="dialogFormVisibleEnclosure" title="附件详情">
        <div class="flex-center">
            <img :src="enclosureUrl" class="size-enclosure" alt="附件图片">
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-link type="danger" :href="enclosureUrl" class="size-btn_download">
                    下载附件
                </el-link>
            </span>
        </template>
    </el-dialog>
    <!-- 底部提示框 -->
    <AffixTip class="mt-20"></AffixTip>

    

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

.flex-options {
    display: flex;
    width: 80%;
    gap: 20px;
}

.size-enclosure {
    width: 200px;
}

.flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
}

.size-btn_download {
    padding: 6px 8px;
    color: white;
    background-color: #F56C6C;
    border-radius: 3px;
}

.size-btn_download:hover {
    background-color: rgba(245, 108, 108, 0.8);
}
</style>