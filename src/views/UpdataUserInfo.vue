<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue';
import axios from '../assets/api/api';
import { ElMessage } from 'element-plus';
import type { UserInfoForm } from '@/types/User';

const router = useRouter();
const ruleFormRef = ref<FormInstance>()
const userInfoForm = reactive({} as UserInfoForm)
const rules = reactive<FormRules>({
    avatarName: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 1, max: 7, message: '长度必须在1-7位字符之间', trigger: 'blur' },
    ],
    sex: [
        {
            required: true,
            message: '请选择性别',
            trigger: 'change',
        },
    ],
    birthday: [
        {
            type: 'date',
            required: false,
            message: '请选择您的生日',
            trigger: 'blur',
        },
    ],
    tags: [
        {
            type: 'array',
            required: false,
            message: '挑选你喜欢的个性标签',
            trigger: 'change',
        },
    ],
    personalSignature: [
        { required: false, message: '请填写您的个性签名', trigger: 'blur' },
        { min: 1, max: 30, message: '长度必须在1-30位字符之间', trigger: 'blur' },
    ],
    hobby: [
        { required: true, message: '请填写您的个人爱好', trigger: 'blur' },
        { min: 1, max: 30, message: '长度必须在1-30位字符之间', trigger: 'blur' },
    ],
    phoneNumber: [
        { required: true, message: '请输入您的手机号', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur' },
    ],
    address: [
        { required: true, message: '请输入您的家庭住址', trigger: 'blur' },
        { min: 0, max: 30, message: '长度不能超过30个字符', trigger: 'blur' },
    ]
});

//刷新页面，调用用户信息接口，渲染个人页面数据;
(async () => {
    let data = (await axios.queryUserInfoApi({})).data;
    Object.assign(userInfoForm, data);
    userInfoForm.sex = data.sex == 1 ? "男" : "女";
})();

async function submitForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            userInfoForm.sex = userInfoForm.sex == "男" ? 1 : 0;
            if (!userInfoForm.birthday) {
                userInfoForm.birthday = null
            } else {
                userInfoForm.birthday = new Date(userInfoForm.birthday).valueOf();
            }

            axios.updateUserInfoApi(userInfoForm).then(res => {
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
                router.push('mine')
            })
        } else {
            ElMessage.error('修改失败')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<template>
    <div class="main">
        <el-page-header :icon="ArrowLeft" title="返回" @back="router.push('mine')">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑资料 </span>
            </template>
        </el-page-header>
        <el-form ref="ruleFormRef" :model="userInfoForm" :rules="rules" label-width="120px"
            class="demo-ruleForm mt-24 flex-col" status-icon hide-required-asterisk>
            <el-form-item label="昵称" prop="avatarName" class="name-label">
                <el-input v-model="userInfoForm.avatarName" />
            </el-form-item>
            <el-form-item label="性别" prop="sex" class="mt-20">
                <el-radio-group v-model="userInfoForm.sex">
                    <el-radio label="男" />
                    <el-radio label="女" />
                </el-radio-group>
            </el-form-item>

            <el-form-item label="生日" required class="birthday-label mt-20">
                <el-col :span="11">
                    <el-form-item prop="birthday">
                        <el-date-picker v-model="userInfoForm.birthday" type="date" label="Pick a date"
                            placeholder="选择日期" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="联系方式" prop="phoneNumber" class="mt-20">
                <el-input v-model="userInfoForm.phoneNumber" type="text" placeholder="请输入11位手机号码" />
            </el-form-item>

            <el-form-item label="详细地址" prop="address" class="mt-20">
                <el-input v-model="userInfoForm.address" type="text" placeholder="省/市/县/镇/" />
            </el-form-item>

            <el-form-item label="个人爱好" prop="hobby" class="mt-20">
                <el-input v-model="userInfoForm.hobby" type="text" placeholder="如吃瓜，户外运动" />
            </el-form-item>

            <el-form-item label="个性签名" prop="personalSignatrue" class="mt-20">
                <el-input v-model="userInfoForm.personalSignature" type="text" placeholder="非必填项" />
            </el-form-item>

            <div class="btn mt-20">
                <el-button type="danger" @click="submitForm(ruleFormRef)">确认</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </div>
        </el-form>
    </div>
</template>

<style scoped>
:deep(.el-input) {
    width: 200px
}

.main {
    background-color: white;
    height: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
}

.flex-col {
    display: flex;
    flex-direction: column;
    width: 60%;
    justify-content: center;
    margin: 40px auto;
    background-color: white;
}

.btn {
    display: flex;
    gap: 10px;
    justify-content: center;
}
</style>