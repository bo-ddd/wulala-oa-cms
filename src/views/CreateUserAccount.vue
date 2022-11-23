<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import axios from '@/assets/api/api'

const ruleFormRef = ref<FormInstance>()

let router = useRouter();

const createSuccess = () => {
    ElMessage({
        showClose: true,
        message: '添加成功',
        type: 'success',
    })
}
const createError = () => {
    ElMessage({
        showClose: true,
        message: '用户名已存在',
        type: 'error',
    })
}
const toLogin = function () {
    router.push('userList')
}
const checkAvatarName = (rule: any, value: any, callback: any) => {
    if (/[!0-9]/.test(value)) {
        callback(new Error('您输入昵称不符合规范'))
    }
    callback();
}
const checkUserName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入用户名'))
    } else if (/[!0-9]/.test(value)) {
        callback(new Error('您输入的用户名不符合规范'))
    } else if (value.length < 5 || value.length > 20) {
        callback(new Error('用户名长度为4-20位'))
    }
    callback();
}
const checkPhoneNumber = (rule: any, value: any, callback: any) => {
    if (value === '') {
        return callback(new Error('请输入手机号'))
    }
    callback();
}

const checkMailBox = (rule: any, value: any, callback: any) => {
    if (value === '') {
        return callback(new Error('请输入邮箱号'))
    }
    callback();
}

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
    } else if (value !== ruleForm.password) {
        callback(new Error("两次输入密码不一致!"))
    }
    callback();
}

const ruleForm = reactive({
    password: '',
    checkPass: '',
    phoneNumber: '',
    username: '',
    avatarName: '',
    mailbox: ''
})

const rules = reactive({
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    phoneNumber: [{ validator: checkPhoneNumber, trigger: 'blur' }],
    username: [{ validator: checkUserName, trigger: 'blur' }],
    avatarName: [{ validator: checkAvatarName, trigger: 'blur' }],
    mailbox: [{ validator: checkMailBox, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            (async function () {
                await axios.registerApi({
                    password: ruleForm.password,
                    phoneNumber: ruleForm.phoneNumber,
                    username: ruleForm.username,
                    avatarName: ruleForm.avatarName || '呜啦啦议员'
                }).then(res => {
                    if (res.status == 1) {
                        createSuccess();
                        router.push('userList')
                    } else if (res.status == 10107) {
                        createError()
                    }
                })
            })()
        }
    })
}
</script>

<template>
    <div class="logon">
        <div class="box" :style="{ boxShadow: '--el-box-shadow-dark' }">
            <h3>创建用户</h3>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item class="username" prop="username">
                    <el-input v-model="ruleForm.username" type="text" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item class="password" prop="password">
                    <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" clearable show-password />
                </el-form-item>
                <el-form-item class="confirmPassword" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" placeholder="请再次输入密码" clearable
                        show-password />
                </el-form-item>
                <el-form-item class="avatarName" prop="avatarName">
                    <el-input v-model="ruleForm.avatarName" type="text" placeholder="请输入昵称(非必填)" clearable />
                </el-form-item>
                <el-form-item class="phoneNumber" prop="phoneNumber">
                    <el-input v-model.number="ruleForm.phoneNumber" placeholder="请输入手机号" clearable />
                </el-form-item>

                <el-form-item class="mailbox" prop="mailbox" :rules="[
                    {
                        required: true,
                        message: '请输入邮箱',
                        trigger: 'blur',
                    },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱',
                        trigger: ['blur', 'change'],
                    },
                ]">
                    <el-input v-model="ruleForm.mailbox" placeholder="请输入邮箱" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="toLogin()">取消创建</el-button>
                    <el-button type="danger" @click="submitForm(ruleFormRef)">创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.logon {
    display: flex;
    align-items: center;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
}

.box {
    /* background-color: rgba(251, 203, 203, .4); */
    margin: 0 auto;
    border-radius: 12px;
    width: 360px;
    padding: 20px 0;
}

.username,
.avatarName,
.password,
.confirmPassword,
.phoneNumber,
.btn,
.mailbox {
    padding: 20px 30px;
}

h3 {
    text-align: center;
    padding: 10px 0;
}



:deep(.el-form-item) {
    margin: 0;
}


:deep(.el-form-item__content) {
    text-align: center;
    display: flex;
    justify-content: space-around;
}
</style>

  
