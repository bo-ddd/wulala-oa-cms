<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { registerApi } from '@/assets/api/api'

const ruleFormRef = ref<FormInstance>()

let router = useRouter();
const toLogin = function () {
    router.push('/')
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
})

const rules = reactive({
    password: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    phoneNumber: [{ validator: checkPhoneNumber, trigger: 'blur' }],
    username: [{ validator: checkUserName, trigger: 'blur' }],
    avatarName: [{ validator: checkAvatarName, trigger: 'blur' }],

})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            (async function () {
                await registerApi({
                    password: ruleForm.password,
                    phoneNumber: ruleForm.phoneNumber,
                    username: ruleForm.username,
                    avatarName: ruleForm.avatarName
                }).then(res => {
                    if (res.status == 1) {
                        alert('注册成功')
                    } else if (res.status == 10107) {
                        alert('用户名已存在')
                    }
                })
            })()
        }
    })
}
</script>

<template>
    <div class="logon">
        <div class="box" :style="{ boxShadow:'--el-box-shadow-dark',}">
            <h3>用户注册</h3>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item class="username" prop="username">
                    <el-input v-model="ruleForm.username" type="text" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item class="avatarName" prop="avatarName">
                    <el-input v-model="ruleForm.avatarName" type="text" placeholder="请输入昵称(非必填)" clearable />
                </el-form-item>
                <el-form-item class="password" prop="password">
                    <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" clearable show-password />
                </el-form-item>
                <el-form-item class="confirmPassword" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" placeholder="请再次输入密码" clearable
                        show-password />
                </el-form-item>
                <el-form-item class="phoneNumber" prop="phoneNumber">
                    <el-input v-model.number="ruleForm.phoneNumber" placeholder="请输入手机号" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="submitForm(ruleFormRef)">注册</el-button>
                    <el-button type="danger" @click="toLogin">去登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.logon {
    display: flex;
    align-items: center;
    height: 100vh;
    background-image: url('@/assets/images/bg-logon.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.box {
    background-color: rgba(251, 203, 203, .4);
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
.btn {
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

  