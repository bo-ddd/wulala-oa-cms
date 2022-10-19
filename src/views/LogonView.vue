<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'

const ruleFormRef = ref<FormInstance>()
let router = useRouter();
const toLogin = function () {
    router.push('/')
}
const shadowGroup = ref([
    {
        name: 'Basic Shadow',
        type: '',
    }
])
const getCssVarName = (type: string) => {
    return `--el-box-shadow${type ? '-' : ''}${type}`
}

const checkPhoneNumber = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入手机号'))
    } else if (value.length < 11) {
        return callback(new Error('请输入正确的手机号'))
    }
    callback();
}

const checkUserName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        return callback(new Error('请输入用户名'))
    } else if (/[!0-9]/.test(value)) {
        return callback(new Error('输入的用户名不符合规范'))
    } else if (value.length < 4 || value.length > 20) {
        return callback(new Error('用户名长度为4-20位'))
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
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次密码输入不一致"))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    pass: '',
    checkPass: '',
    phoneNumber: '',
    userName: '',
})

const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
    phoneNumber: [{ validator: checkPhoneNumber, trigger: 'blur' }],
    userName: [{ validator: checkUserName, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}


</script>

<template>
    <div class="logon">
        <div class="box" v-for="(shadow, i) in shadowGroup" :key="i" :style="{
          boxShadow: `var(${getCssVarName(shadow.type)})`,
        }">
            <h3>用户注册</h3>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
                <el-form-item class="username" prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item class="password" prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" placeholder="请输入密码" clearable show-password />
                </el-form-item>
                <el-form-item class="confirmPassword" prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" placeholder="请再次输入密码" clearable
                        show-password />
                </el-form-item>
                <el-form-item class="phoneNumber" prop="phoneNumber">
                    <el-input v-model.number="ruleForm.phoneNumber" type="text" placeholder="请输入手机号" clearable />
                </el-form-item>
                <el-form-item class="btn">
                    <el-button class="submit" size="large" type="danger" @click="submitForm(ruleFormRef)">注册
                    </el-button>
                    <el-button class="toLogin" size="large" type="danger" @click="toLogin()">去登录</el-button>
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
    background-color: rgba(251, 203, 203, .2);
    margin: 0 auto;
    border-radius: 12px;
    width: 360px;
    padding: 20px 0;
}

.username,
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

  