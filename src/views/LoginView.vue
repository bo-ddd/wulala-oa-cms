<script lang="ts" setup>
import { reactive, ref, onMounted ,onUnmounted} from 'vue'
import { useRouter } from "vue-router";
import { ElMessage, type FormInstance } from 'element-plus'
import { useUserStore } from "../stores/userInfo";
import { loginApi } from "@/assets/api/api";
let userStore = useUserStore()
const ruleFormRef = ref<FormInstance>();
let router = useRouter()

const ruleForm = reactive({
    username: '',
    password: '',
})

/// 一般情况  封装一个方法 要使用const
const to = function (name: string) {
    router.push(name)
}

const validate = function () {
    const { username, password } = ruleForm
    if (username == '') {
        ElMessage.warning('账号不能为空')
        return;
    } else if (username.length < 6 || username.length > 20) {
        ElMessage.warning('用户名必须为6-20位之间')
        return;
    } else if (/\W/.test(username)) {
        ElMessage.warning('用户名和密码不符合规范')
        return;
    } else if (password.length < 6 || password.length > 20) {
        ElMessage.warning('密码必须为6-20位之间')
        return;
    }

}
const submit = async (value: any) => {
    validate()
    await loginApi({
        username: ruleForm.username,
        password: ruleForm.password,
    }).then(res => {
        sessionStorage.setItem("token", res.data.token);// 吧后端返回的token 存到了本地
        to('home')
        userStore.getUserInfo() //调用户信息接口
    })
}
//回车自动登录
const keyDown = (e:any) => {
  //如果是回车则执行登录方法
  if (e.keyCode == 13) {
    console.log(e);
    submit(ruleForm)
  }
}
onMounted(() => {
    window.addEventListener('keydown', keyDown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', keyDown, false)
})
</script>

<template>
     
    <div class="login">
        <div class="login-bar">
            <div class="login-content">
                <h1 class="title-login">Login</h1>
                <el-form ref="ruleFormRef" :model="ruleForm" class="demo-ruleForm">
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
                        <el-button type="danger" @click="submit">GO</el-button>
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
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
