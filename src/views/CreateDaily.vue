<template>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        status-icon hide-required-asterisk>
        <template class="flex-row">
            <el-form-item label="标题:" prop="title">
                <el-input v-model="ruleForm.title" class="input-width" placeholder="xxxx-xx-xx日报" />
            </el-form-item>
        </template>
        <el-form-item label="内容:" prop="content" class="box">
            <MyEditor v-model="ruleForm.content" class="size-editor"></MyEditor>
        </el-form-item>
        <el-button class="submitBtn" type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { createArticleApi } from '@/assets/api/api'
import MyEditor from '@/components/MyEditor.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from "vue-router"
import type { CreateDaily } from '@/types/Daily'
const router = useRouter()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<CreateDaily>({
    title : '',
    content : ''
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
                        await createArticleApi({
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
:deep(.el-form-item__label){
    font-size: 20px;
    font-weight: 700;
}
.submitBtn{
    float: right;
    margin-right: 100px;
}
.flex-row {
    display: flex;
}
.input-width {
    width: 300px;
}
:deep(.el-form-item__label){
  width: 60px !important;
}
</style>