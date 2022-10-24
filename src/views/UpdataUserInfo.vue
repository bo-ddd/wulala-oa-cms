<script setup lang="ts">
import { reactive, ref } from 'vue'
import {useRouter} from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue';

const router=useRouter();
const to=(name:string)=>{
    router.push(name)
}

//form表单
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    date: '',
    tags: [],
    resource: '',
    desc: '',
})

//form表单校验规则
const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { min: 0, max: 7, message: '长度必须在0-7位字符之间', trigger: 'blur' },
    ],
    resource: [
        {
            required: true,
            message: '请选择性别',
            trigger: 'change',
        },
    ],
    date: [
        {
            type: 'date',
            required: true,
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
    desc: [
        { required: false, message: '请', trigger: 'blur' },
    ],
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!', fields)
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
}))

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
            <el-form-item label="姓名" prop="name" class="name-label">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="性别" prop="resource" class="mt-20">
                <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="男" />
                    <el-radio label="女" />
                </el-radio-group>
            </el-form-item>

            <el-form-item label="生日" required class="birthday-label mt-20">
                <el-col :span="11">
                    <el-form-item prop="date">
                        <el-date-picker v-model="ruleForm.date" type="date" label="Pick a date" placeholder="选择日期"
                            style="width: 100%" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="标签(非必选)" prop="tags"  class="mt-20">
                <el-checkbox-group v-model="ruleForm.tags">
                    <el-checkbox label="夜猫子协会常任理事" name="tags" />
                    <el-checkbox label="顶级外卖鉴赏师" name="tags" />
                    <el-checkbox label="秃头选拔赛形象大使" name="tags" />
                    <el-checkbox label="互联网冲浪金牌选手" name="tags" />
                    <el-checkbox label="退役熬夜选手" name="tags" />
                    <el-checkbox label="P图竞赛金奖获得者" name="tags" />
                    <el-checkbox label="花式作死冠军" name="tags" />
                    <el-checkbox label="魔芋爽" name="tags" />
                </el-checkbox-group>
            </el-form-item>
            
            <el-form-item label="个性签名" prop="desc" class="desc  mt-20">
                <el-input v-model="ruleForm.desc" type="text" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.name-label {
    width: 250px;
}

.sex-label {
    width: 250px;
}

.birthday-label {
    width: 500px;
}
.desc{
    width:500px;
}
</style>