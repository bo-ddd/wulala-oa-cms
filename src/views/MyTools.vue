<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from '@/assets/api/api'
const defaultPageSize = ref(10)
const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度为6-20位'))
    } else if (/\W/.test(value)) {
        callback(new Error('不能包含特殊字符'))
    }
    callback();
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"))
    }
    callback();

}
const ruleForm = reactive({
    pass: '',
    checkPass: ''
})
const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ElMessageBox.confirm(
                '您确定提交离职申请吗？',
                '提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                axios.updatePasswordApi({ password: ruleForm.pass })
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消申请',
                })
            })
        } else {
            ElMessage.error('提交失败')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

// 表格中默认一个显示的行数;
const defaultPageSizeList = [
    {
        id: 1,
        label: 5,
        value: 5
    },
    {
        id: 2,
        label: 10,
        value: 10
    },
    {
        id: 3,
        label: 15,
        value: 15
    },
    {
        id: 4,
        label: 20,
        value: 20
    },
    {
        id: 5,
        label: 25,
        value: 25
    },
    {
        id: 6,
        label: 30,
        value: 30
    }
]
</script>
<template>
    <el-tabs tab-position="left" style="height:96%" class="demo-tabs mt-20">
        <el-tab-pane label="密码">
            <div class="pd-20">
                <h4>修改登录密码</h4>
                <div class="position-form">
                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
                        class="demo-ruleForm mt-20" status-icon>
                        <el-form-item label="新密码" prop="pass" autocomplete="off">
                            <el-input type="password" v-model="ruleForm.pass" />
                            <span class="text-size">密码长度为6-20位，不能包含特殊字符</span>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass" autocomplete="off">
                            <el-input type="password" v-model="ruleForm.checkPass" />
                        </el-form-item>
                        <el-form-item class="pl-30 mt-20">
                            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                            <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="配置">

            <div class="pd-20">
                <h4>个性化配置</h4>
                <div class="mt-20 pd-20">
                    <span>表格中默认一页显示</span>&nbsp
                    <el-select v-model="defaultPageSize">
                        <el-option v-for="item in defaultPageSizeList" :label="item.label" :value="item.value"
                            :key="item.id" class="no-selected" />
                    </el-select>&nbsp
                    <span>条数。</span>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="外观"></el-tab-pane>
    </el-tabs>
</template>

<style scoped>
/* 标签页配置 */
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}

:deep(.el-input__inner) {
    width: 20px;
}

:deep(.el-tabs__item.is-active) {
    color: #F56C6C
}

:deep(.el-tabs__item):hover {
    color: #F56C6C
}

:deep(.el-tabs__active-bar) {
    background-color: #F56C6C
}

:deep(.el-input) {
    width: 60%;
}

.position-form {
    width: 500px;
    margin: 0 auto;
}

.demo-ruleForm {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
}

.text-size {
    font-size: 10px;
    color: #9B9797;
}
</style>