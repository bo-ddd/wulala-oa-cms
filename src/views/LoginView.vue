<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter} from "vue-router";
import type { FormInstance } from 'element-plus'
import axios from '@/assets/api/api';
const ruleFormRef = ref<FormInstance>();
let router=useRouter()


const ruleForm = reactive({
    accountNumber: 'xiaoming',
    checkPass: '999999',
})
const validateNumber = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入您的用户名'))
    } else if (value.length < 6 || value.lenght > 20) {
        callback(new Error("用户名的长度应该在6-20位之间!"))
    } else if (/\W/.test(value)) {
        callback(new Error("用户名和密码不符合规范"))
    }else if(value!== ruleForm.accountNumber) {
        callback(new Error("用户名或密码不正确"))
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (value !== ruleForm.checkPass) {
        callback(new Error("密码错误，请重试"))
    }
    //  else {
    //     callback()
    // }
}
const rules = reactive({
    accountNumber: [{ validator: validateNumber, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            (async function () {
                let login = await axios.loginApi({
                    username: ruleForm.accountNumber,
                    password: ruleForm.checkPass
                }).then(res=>{
                console.log('提交成功!')
                console.log(res);
                sessionStorage.setItem("token", res.data.token);
                router.push('leave')
            }).catch(res=>{

            })
            })()
        } else {
            alert('失败，请重新再试')
            return false
        }
    })
}

</script>

<template>
    <div class="login">
        <div class="login-bar">
            <div class="login-content">
                <h1 class="title-login">Login</h1>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                    <el-form-item label="账号" prop="accountNumber">
                        <el-input v-model="ruleForm.accountNumber" type="text" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="密码" prop="checkPass">
                        <el-input v-model="ruleForm.checkPass" type="password" placeholder="请输入密码" />
                    </el-form-item>
                    <div class="text">
                        <span class="left">忘记密码</span>
                        <span class="right">注册</span>
                    </div>
                    <el-form-item>
                        <el-button type="danger" @click="submitForm(ruleFormRef)">GO</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('@/assets/images/bg-login.png');
    background-size: cover;
}

.login-bar {
    width: 450px;
    height: 300px;
    border-radius: 10px;
    padding: 34px 40px;
    box-sizing: border-box;
    background: linear-gradient(to right bottom,
            rgba(255, 255, 255, .7),
            rgba(255, 255, 255, .5),
            rgba(255, 255, 255, .3));
    backdrop-filter: blur(10px);
    box-shadow: 0 0 20px rgb(248, 247, 247);
}

.login-content {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.title-login {
    font-size: 26px;
    font-weight: 700;
    user-select: none;
    padding: 10px 0;
}

.text {
    padding: 5px 0;
    font-size: 12px;
    color: rgb(99, 99, 100);
    display: flex;
    justify-content: space-between;
}

.text .left:hover {
    color: rgb(101, 101, 236);
    cursor: pointer;
}

.text .right:hover {
    color: rgb(101, 101, 236);
    cursor: pointer;
}

:deep(.el-button) {
    width: 100%;
    margin: 10px 0;
}
</style>
