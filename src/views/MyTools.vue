<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from '@/assets/api/api'
import { usePageSizeOptionsStore } from "@/stores/tools";
import { storeToRefs } from "pinia";

const pageSizeOptionsStore = usePageSizeOptionsStore();
const { SwitchStatus, defaultValue } = storeToRefs(pageSizeOptionsStore);

// 修改密码页面;
const ruleFormRef = ref<FormInstance>()

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else if (value.length < 6 || value.length > 20) {
        callback(new Error('密码长度为6-20位'))
    } else if (/\W/.test(value)) {
        callback(new Error('不能包含特殊字符'))
    }
    callback();
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"))
    }
    callback();

}
const ruleForm = reactive({
    pass: '',
    checkPass: ''
})
const rules = reactive({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ElMessageBox.confirm(
                '您确定提交离职申请吗？',
                '提示',
                {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                axios.updatePasswordApi({ password: ruleForm.pass }).then(res => {
                    ruleForm.pass = '';
                    ruleForm.checkPass = '';
                })
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '已取消申请',
                })
            })
        } else {
            ElMessage.error('提交失败')
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
// 个人配置页面;
interface PageSizeOptions {
    SwitchStatus: boolean,
    defaultValue: number
}
const pageSizeOptions = reactive<PageSizeOptions>({
    SwitchStatus: SwitchStatus.value,
    defaultValue: defaultValue.value
})

// 表格中默认一个显示的行数;
const defaultPageSizeList = [
    {
        id: 1,
        label: 5,
        value: 5
    },
    {
        id: 2,
        label: 10,
        value: 10
    },
    {
        id: 3,
        label: 15,
        value: 15
    },
    {
        id: 4,
        label: 20,
        value: 20
    },
    {
        id: 5,
        label: 25,
        value: 25
    },
    {
        id: 6,
        label: 30,
        value: 30
    }
]


const handlePageSizeSwitchStatue = (status: boolean) => {
    if (status) {
        //获取推荐设置的值,并存储到本地;
        pageSizeOptionsStore.getRecommentdefaultValue();
        //从pinio中获取推荐值，并显示到输入框中;
        pageSizeOptionsStore.getStorageStatus();
        pageSizeOptions.defaultValue = defaultValue.value
    } else {
        //恢复默认设置，并开启输入框;
        pageSizeOptions.defaultValue = 10;
        //将设置保存到本地中;
        pageSizeOptionsStore.storageCurrentStatus(pageSizeOptions)
    }
}

const handlePageSizeDefaultValue = () => {
    pageSizeOptionsStore.storageCurrentStatus(pageSizeOptions)
}
// ------------------------------------------------------------------------------------------------------------------
// 外观设置页面;
const appearanceRadio = ref(1);
const appearanceList = [
    {
        id: 1,
        appearanceUrl: '',
        title: '默认值',
        color: '--el-gradient-gb-color-default'
    },
    {
        id: 2,
        appearanceUrl: '',
        title: '晨雾',
        color: '--el-gradient-gb-color-grey'
    },
    {
        id: 3,
        appearanceUrl: '',
        title: '冰凉薄荷',
        color: '--el-gradient-gb-color-mint'
    },
    {
        id: 4,
        appearanceUrl: '',
        title: '海岛度假',
        color: '--el-gradient-gb-color-island'
    },
    {
        id: 5,
        appearanceUrl: '',
        title: '凉风',
        color: '--el-gradient-gb-color-chillybreeze'
    },
    {
        id: 6,
        appearanceUrl: '',
        title: '柔和粉色',
        color: '--el-gradient-gb-color-softpink'
    },
    {
        id: 7,
        appearanceUrl: '',
        title: '泡泡糖',
        color: '--el-gradient-gb-color-bubble'
    },
    {
        id: 8,
        appearanceUrl: '',
        title: '晴天',
        color: '--el-gradient-gb-color-sunny'
    },
    {
        id: 9,
        appearanceUrl: '',
        title: '芒果天堂',
        color: '--el-gradient-gb-color-mango'
    },
    {
        id: 10,
        appearanceUrl: '',
        title: '雨夜',
        color: '--el-gradient-gb-color-rain'
    }
]
//选中色块的点击事件;
const handleRadioValue = (value: number) => {
    console.log(value)
    console.log(321);
}

</script>
<template>
    <el-tabs tab-position="left" style="height:96%" class="demo-tabs mt-20">
        <el-tab-pane label="密码">
            <div class="pd-20">
                <h4>修改登录密码</h4>
                <div class="position-form">
                    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px"
                        class="demo-ruleForm mt-20" status-icon>
                        <el-form-item label="新密码" prop="pass" autocomplete="off">
                            <el-input type="password" v-model="ruleForm.pass" />
                            <span class="text-size">密码长度为6-20位，不能包含特殊字符</span>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass" autocomplete="off">
                            <el-input type="password" v-model="ruleForm.checkPass" />
                        </el-form-item>
                        <el-form-item class="pl-30 mt-20">
                            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
                            <el-button type="danger" @click="submitForm(ruleFormRef)">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="配置">
            <div class="pd-20">
                <h4>个性化配置</h4>
                <div class="mt-20 pd-20 flex-row">
                    <div>
                        <span>表格中默认一页显示</span>&nbsp
                        <el-select v-model="pageSizeOptions.defaultValue" :disabled="pageSizeOptions.SwitchStatus"
                            @change="handlePageSizeDefaultValue">
                            <el-option v-for="item in defaultPageSizeList" :label="item.label" :value="item.value"
                                :key="item.id" class="no-selected" />
                        </el-select>&nbsp
                        <span>条。</span>
                    </div>
                    <el-switch v-model="pageSizeOptions.SwitchStatus" class="mb-2" active-text="使用推荐设置"
                        @change="handlePageSizeSwitchStatue(pageSizeOptions.SwitchStatus)" />
                </div>
            </div>
        </el-tab-pane>
        <!-- ----------------------------------------------------------------------------------- -->
        <el-tab-pane label="外观">
            <div class="pd-20">
                <h4>自定义外观</h4>
                <el-radio-group v-model="appearanceRadio" class="mt-20 pd-20 grid"
                    @change="handleRadioValue(appearanceRadio)">
                    <el-radio :label="item.id" class="appearance" v-for="item in appearanceList"
                        :class="{ 'active-appearance': item.id == appearanceRadio }">
                        <div class="color-block">
                            <img :src="item.appearanceUrl" alt="">
                        </div>
                        <div class="title">{{ item.title }}</div>
                    </el-radio>
                </el-radio-group>
            </div>

        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
/* 标签页配置 */
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}

:deep(.el-input__inner) {
    width: 20px;
}

:deep(.el-tabs__item.is-active) {
    color: #F56C6C
}

:deep(.el-tabs__item):hover {
    color: #F56C6C
}

:deep(.el-tabs__active-bar) {
    background-color: #F56C6C
}

:deep(.el-input) {
    width: 60%;
}

.position-form {
    width: 500px;
    margin: 0 auto;
}

.demo-ruleForm {
    display: flex;
    flex-direction: column;
    padding-top: 20px;
}

.text-size {
    font-size: 10px;
    color: #9B9797;
}

/* 设置pageSize按钮颜色 */
:deep(.el-switch__label.is-active) {
    color: #F56C6C;
}

:deep(.el-switch.is-checked .el-switch__core) {
    background-color: #F56C6C;
}

:deep(.el-switch.is-checked .el-switch__core) {
    border-color: #F56C6C;
}

.flex-row {
    display: flex;
    gap: 50px;
}

/* 外观页面 */
.grid {
    width: 500px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
}

.appearance {
    width: 100px;
    height: 90px;
    background-color: rgb(112, 109, 109);
    border: solid 1px black;
    padding: 6px;
    box-sizing: border-box;
    border-radius: 5px;
}

.active-appearance {
    border-color: red;
    border-width: 2px;
}

.color-block {
    width: 100%;
    height: 60px;
    background-color: cyan;
}

.title {
    display: inline-block;
    font-size: 10px;
    color: white;
}

/* 设置单选框组件样式 */
:deep(.el-radio__inner) {
    display: none;
}

:deep(.el-radio) {
    margin-right: 0;
    align-items: initial;
}

:deep(.el-radio__label) {
    padding-left: 0;
    width: 100%;
}
</style>