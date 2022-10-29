<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue';
import axios from '../assets/api/api';
import { ElMessage } from 'element-plus';

const router = useRouter();
const to = (name: string) => {
    router.push(name)
}

//form表单
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

interface RuleForm {
    avatarName: string;
    birthday:  Date | number|null;
    hobby: string;
    personalSignature: string;
    phoneNumber: string;
    sex: number | string;
    userId: number;
    address: string;
}


const ruleForm = reactive<RuleForm>({})

//form表单校验规则
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
    address:[
        { required: true, message: '请输入您的家庭住址', trigger: 'blur' },
        { min: 0, max: 30, message: '长度不能超过30个字符', trigger: 'blur' },
    ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            ruleForm.sex = ruleForm.sex == "男" ? 1 : 0;
            if(!ruleForm.birthday){
                ruleForm.birthday=null
            }else{
                ruleForm.birthday = new Date(ruleForm.birthday).valueOf();
            }
            
            axios.updateUserInfoApi(ruleForm).then(res => {
                ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
                to('mine')
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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
    value: `${idx + 1}`,
    label: `${idx + 1}`,
}));

//刷新页面，调用用户信息接口，渲染个人页面数据

(async () => {
    let data = (await axios.queryUserInfoApi({})).data;
    Object.assign(ruleForm, data);
    ruleForm.sex = data.sex == 1 ? "男" : "女";
})();


</script>

<template>
    <div>
        <el-page-header :icon="ArrowLeft" title="返回" @back="to('mine')">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑资料 </span>
            </template>
        </el-page-header>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm mt-24"
            :size="formSize" status-icon>
            <el-form-item label="昵称" prop="avatarName" class="name-label">
                <el-input v-model="ruleForm.avatarName" size="small" />
            </el-form-item>
            <el-form-item label="性别" prop="sex" class="mt-20">
                <el-radio-group v-model="ruleForm.sex" size="small">
                    <el-radio label="男"/>
                    <el-radio label="女"/>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="生日" required class="birthday-label mt-20">
                <el-col :span="11">
                    <el-form-item prop="birthday">
                        <el-date-picker v-model="ruleForm.birthday" type="date" size="small" label="Pick a date" placeholder="选择日期"
                         />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="联系方式" prop="phoneNumber" class="mt-20">
                <el-input v-model="ruleForm.phoneNumber" type="text" size="small" placeholder="请输入11位手机号码" />
            </el-form-item>

            <el-form-item label="详细地址" prop="address" class="mt-20">
                <el-input v-model="ruleForm.address" type="text" size="small" placeholder="省/市/县/镇/" />
            </el-form-item>

            <el-form-item label="个人爱好" prop="hobby" class="mt-20">
                <el-input v-model="ruleForm.hobby" type="text" size="small" placeholder="如吃瓜，户外运动" />
            </el-form-item>

            <el-form-item label="个性签名" prop="personalSignatrue" class="mt-20">
                <el-input v-model="ruleForm.personalSignature" type="text" size="small" placeholder="非必填项" />
            </el-form-item>


            <!-- <el-form-item label="标签(非必选)" prop="tags" class="mt-20">
                <el-checkbox-group v-model="">
                    <el-checkbox label="夜猫子协会常任理事" name="tags" />
                    <el-checkbox label="顶级外卖鉴赏师" name="tags" />
                    <el-checkbox label="秃头选拔赛形象大使" name="tags" />
                    <el-checkbox label="互联网冲浪金牌选手" name="tags" />
                    <el-checkbox label="退役熬夜选手" name="tags" />
                    <el-checkbox label="P图竞赛金奖获得者" name="tags" />
                    <el-checkbox label="花式作死冠军" name="tags" />
                    <el-checkbox label="魔芋爽" name="tags" />
                </el-checkbox-group>
            </el-form-item> -->

            <el-form-item>
                <el-button type="danger" @click="submitForm(ruleFormRef)" size="small">确认</el-button>
                <el-button @click="resetForm(ruleFormRef)" size="small">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
:deep(.el-input){
    width:200px
}
</style>