<script lang="ts" setup>
import { ref, reactive } from 'vue'
import axios from '../assets/api/api'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps } from 'element-plus'


const router = useRouter()


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    region: '',
    count: '',
    type: '',
    duration: '',
    rule:''
})

const activityType = [
    {
        id: 1,
        name: '一次性游戏'
    },
    {
        id: 2,
        name: '长期游戏'
    },
    {
        id: 3,
        name: '限时活动'
    }
]

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 1, max: 10, message: '字符长度必须在1-10位之间', trigger: 'blur' },
    ],
    region: [
        {
            required: true,
            message: '请选择活动区域',
            trigger: 'change',
        },
    ],
    count: [
        {
            required: true,
            message: '请选择活动可报名人数',
            trigger: 'change',
        },
    ],
    duration: [
        {   
            type: 'array',
            required: true,
            message: '请选择一个时间',
            trigger: 'change'   
        }
    ],
    type: [
        {
            required: true,
            message: '请选择活动的类型',
            trigger: 'change',
        },
    ],
    rule: [
        { required: true, message: '请填写活动规则', trigger: 'blur' },
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
    <div class="form">
        <h3>创建活动</h3>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            hide-required-asterisk status-icon>
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="活动区域" prop="region">
                <el-select v-model="ruleForm.region" placeholder="室内/户外">
                    <el-option label="室内" value="室内" />
                    <el-option label="户外" value="户外" />
                </el-select>
            </el-form-item>
            <el-form-item label="活动人数" prop="count">
                <el-select-v2 v-model="ruleForm.count" :options="options" />
            </el-form-item>
            <el-form-item label="活动时间" required prop="duration">
                <el-date-picker v-model="ruleForm.duration" type="daterange" range-separator="至"
                    start-placeholder="开始时间" end-placeholder="结束日期" />
            </el-form-item>
            <el-form-item label="活动类型" prop="type"> 
                <el-radio-group v-model="ruleForm.type">
                    <el-radio v-for="item in activityType" :key="item.id" :label="item.name" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="活动规则" prop="rule">
                <el-input v-model="ruleForm.rule" type="textarea" resize='none' />
            </el-form-item>
            <div class="mt-20 position-btn">
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                <el-button type="danger" @click="submitForm(ruleFormRef)">创建</el-button>
            </div>
        </el-form>
    </div>
</template>

<style scoped>
.form {
    width: 100%;
    margin: 0 auto;
    background-color: white;
    box-sizing: border-box;
    padding: 10px;
}

.demo-ruleForm {
    width: 60%;
    margin: 40px auto;
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
}

:deep(.el-input) {
    width: 200px
}

:deep(.el-input__wrapper) {
    flex-grow: 0
}

:deep(.el-textarea__inner) {
    width: 400px;
    height: 150px;
}

.position-btn {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
</style>