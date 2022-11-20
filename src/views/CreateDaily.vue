<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" size='small'
        status-icon hide-required-asterisk>
        <template class="flex-row">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title" class="input-width" size="small" placeholder="日报标题" />
            </el-form-item>
            <el-form-item>
                <el-button type="danger" size="small" @click="submitForm(ruleFormRef)">提交</el-button>
            </el-form-item>
        </template>
        <el-form-item label="内容" prop="content" class="box">
            <MyEditor v-model="ruleForm.content" class="size-editor"></MyEditor>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import axios from '@/assets/api/api'
import MyEditor from '@/components/MyEditor.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from "vue-router"
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    title: '',
    content: '',
})

const rules = reactive<FormRules>({
    title: [
        { required: true, message: '标题内容不能为空', trigger: 'blur' },
    ],
    content: [
        { required: true, message: '', trigger: 'blur' },
    ],
});

// 检验标题格式Api;
const checkTitle = (title: string) => {
    return /^\d{4}-\d{2}-\d{2}/.test(title)
}
console.log(checkTitle('2022-12-12'))

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid, fields) => {
        if (valid) {
            //确认消息弹出框
            ElMessageBox.confirm(
                '您确定提交日报吗？',
                '提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            )
                .then(async () => {
                    //调用提交接口;
                    if (!checkTitle(ruleForm.title)) {
                        ElMessage({
                            type: 'warning',
                            message: '标题格式不正确',
                        })
                    } else {
                        await axios.createArticleApi({
                            title: ruleForm.title,
                            content: ruleForm.content
                        }).then(res => {
                            ElMessage({
                                type: 'success',
                                message: '提交成功',
                            })
                        }, error => {
                            ElMessage.error('提交失败')
                        })
                        //跳转到日报列表页面;
                        router.push('daily')
                    }
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '已取消提交',
                    })
                })
        } else {
            if (!ruleForm.content) {
                ElMessage.error('日报内容不能为空')
            } else if (!ruleForm.title) {
                ElMessage.error('标题不能为空')
            } else {
                ElMessage.error('提交失败')
            }
        }
    })
}


</script>
<style scoped>
.text-center {
    text-align: center;
}

.el-input {
    width: 60%;
}

.el-textarea {
    width: 60%;
}

.demo-datetime-picker .block {
    padding: 30px 0;
    width: 900px;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

.demo-datetime-picker .block:last-child {
    border-right: none;
}

.demo-datetime-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}



.size-editor {
    width: 100%;
    height: 300px;

}

.size-editor::-webkit-scrollbar {
    display: none;
}

:deep(.w-e-text-container) {
    background-color: blanchedalmond;
}

:deep(.w-e-bar) {
    background-color: #ece9e5;
}

.flex-row {
    display: flex;
}

.input-width {
    width: 300px;
}
</style>