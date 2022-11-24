<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import type{  FormInstance } from 'element-plus'
import axios from '@/assets/api/api';
import { useUserStore } from "../stores/userInfo";
let userStore=useUserStore()
const ruleFormRef = ref<FormInstance>();
let router = useRouter()


const ruleForm = reactive({
    username: '',
    password: '',
})

const validateUsername = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入您的用户名'))
    } else if (value.length < 6 || value.length > 20) {
        callback(new Error("用户名的长度应该在6-20位之间!"))
    } else if (/\W/.test(value)) {
        callback(new Error("用户名和密码不符合规范"))
    } else {
        callback();
    }
}
const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}
const rules = reactive({
    username: [{ validator: validateUsername, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
})
/// 一般情况  封装一个方法 要使用const
const to = function (name: string) {
    router.push(name)
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            await axios.loginApi({
                username: ruleForm.username,
                password: ruleForm.password,
            }).then(res => {
                if (res.status == 1) {
                    sessionStorage.setItem("token", res.data.token);// 吧后端返回的token 存到了本地
                    userStore.getUserInfo() //调用户信息接口
                    to('home')
                } else {
                    alert('用户名或密码错误')
                }
            })

        } else {
            alert('失败，请重新再试')
            return false
        }
    })
}
//回车自动登录
onMounted(() => {
    document.onkeydown = function (e) {
        let key = e.key;
        if (key == "Enter") {
            submitForm(ruleFormRef.value); //ref对象在js中需要value才能获取到
        }
    };
})
</script>

<template>
    <div class="login">
        <div class="login-bar">
            <div class="login-content">
                <h1 class="title-login">Login</h1>
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="ruleForm.username" type="text" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" />
                    </el-form-item>
                    <div class="text">
                        <span class="left">忘记密码</span>
                        <span class="right" @click="to('logon')">注册</span>
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
