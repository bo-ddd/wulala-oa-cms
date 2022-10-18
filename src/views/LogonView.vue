<script setup lang="ts">
import { ref } from 'vue'
const phoneNumber = ref('')
const jobNumber = ref('')
const name = ref('')
const password = ref('')
const confirmPassword = ref('')

const shadowGroup = ref([
    {
        name: 'Basic Shadow',
        type: '',
    },
])

const getCssVarName = (type: string) => {
    return `--el-box-shadow${type ? '-' : ''}${type}`
}
const passwordReg = /^[a-zA-Z](?![a-zA-Z]+$)\w{5,19}$/
</script>

<template>
    <div class="logon">
        <div class="box" v-for="(shadow, i) in shadowGroup" :key="i" :style="{
          boxShadow: `var(${getCssVarName(shadow.type)})`,
        }">
            <h3>用户注册</h3>
            <el-input class="jobNumber" v-model="jobNumber" placeholder="请输入工号" clearable />
            <el-input class="name" v-model="name" placeholder="请输入用户名" clearable />
            <el-input class="password" v-model="password" type="password" placeholder="请输入密码" clearable show-password />
            <el-input class="confirmPassword" v-model="confirmPassword" type="password" placeholder="请再次输入密码" clearable
                show-password />
            <el-input class="phoneNumber" v-model="phoneNumber" placeholder="请输入手机号" clearable />
            <div class="btn">
                <el-button class="submit" size="large" type="danger">注册</el-button>
                <el-button class="toLogon" size="large" type="danger">去登录</el-button>
            </div>
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
}

.name,
.password,
.confirmPassword,
.jobNumber,
.phoneNumber {
    padding: 20px 30px;
}

h3 {
    text-align: center;
    padding: 10px 0;
}

.btn {
    text-align: center;
    padding: 10px;
    display: flex;
    justify-content: space-around;
}

</style>