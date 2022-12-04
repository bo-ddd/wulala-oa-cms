<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    count: '',
    type: '',
    duration: '',
    desc: '',
    posterUrl: ''
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

const rules = ({
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 1, max: 10, message: '字符长度必须在1-10位之间', trigger: 'blur' },
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
    desc: [
        { required: true, message: '活动描述不能为空', trigger: 'blur' },
    ],
})



const handlePosterSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    ruleForm.posterUrl = URL.createObjectURL(uploadFile.raw!)
}

const beforePosterUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('海报格式必须是JPG格式')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('海报大小不能超过2MB')
        return false
    }
    return true
}

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
            <el-form-item label="活动海报">
                <el-upload class="avatar-uploader" action="/api/upload/enclosure" :show-file-list="false"
                    :on-success="handlePosterSuccess" :before-upload="beforePosterUpload">
                    <img v-if="ruleForm.posterUrl" :src="ruleForm.posterUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="活动描述" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea" resize='none' placeholder="暂无描述..." />
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
    width: 500px;
    height: 200px;
}

.position-btn {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

/* 上传海报框的样式 */
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    display: flex;
    width: 200px;
    height: 200px;
}
</style>