
<script setup lang="ts">
import { ref, type Ref, reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { StarFilled, EditPen } from '@element-plus/icons-vue';
import axios from '../assets/api/api';
import type { UploadInstance, UploadProps } from 'element-plus';
import { useUserStore } from '@/stores/userInfo';
import { storeToRefs } from "pinia";

//pinia模块，实时更新头像功能;
const userStore = useUserStore();
const { userInfo: userInfos } = storeToRefs(userStore)
const userInfo = userInfos.value;

const router = useRouter();
const activeName = ref('first')
const disabled: Ref = ref(true);
const age = ref<number | null>()
const birthday = ref<string | null>()
const state = reactive({//用户头像自适应功能;
    fit: 'fill',
    url: 'https://img.ixintu.com/download/jpg/20200815/18ae766809ff27de6b7a942d7ea4111c_512_512.jpg!bg',
})
const { fit, url } = toRefs(state);
const isOver: Ref = ref(false); //切换头像时鼠标移入的状态;

const dialogAvatarVisible = ref(false); //更换头像的弹出框;
const uploadUrl = ref(''); //头像的Url;
const upload = ref<UploadInstance>()


onMounted(async () => {
    await userStore.getUserInfo()
    handleUserBirthday()

})

//公共路由跳转方法：
function to(name: string) {
    router.push(name)
}

function updateUserInfoApi(payLoad: {}) {
    return axios.updateUserInfoApi({
        userId: userInfo.userId,
        sex: userInfo.sex,
        birthday: new Date(userInfo.birthday).getTime(),
        hobby: userInfo.hobby,
        ...payLoad
    })
}

//切换个性签名编辑状态;
function openInput() {
    disabled.value = false;
}
function closeInput() {
    updateUserInfoApi({
        personalSignature: userInfo.personalSignature
    }).then(res => {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        disabled.value = true;
    }).catch(error => {
        ElMessage({
            message: '修改失败',
            type: 'warning',
        })
    })
}
function toBlur() {
    disabled.value = true;
}

//切换头像入口状态;
function enterStatus() {
    isOver.value = true;
}
function leaveStatus() {
    isOver.value = false;
}

//处理时间戳=>YY-MM-DD;
function formatDate(time: Date | string) {
    let year = new Date(time).getFullYear();
    let month = new Date(time).getMonth() + 1;
    let date = new Date(time).getDate();
    let months = month >= 10 ? month : '0' + month;
    let dates = date >= 10 ? date : '0' + date;
    return year + '-' + months + '-' + dates;
}

//从pinia中拿到个人资料，并进行处理，显示到页面上;
function handleUserBirthday() {
    userInfo.personalSignature = !userInfo.personalSignature ? '这个人很懒，什么都没留下！' : userInfo.personalSignature;
    if (!userInfo.birthday) {
        birthday.value = null
        age.value = null
    } else {
        birthday.value = formatDate(userInfo.birthday);
        age.value = Math.floor((Date.now() - new Date(userInfo.birthday).valueOf()) / 1000 / 60 / 60 / 24 / 365);
    }

}

//上传头像;
//获取上传图像的url;
const handleSuccessUpload: UploadProps['onSuccess'] = (response) => {
    uploadUrl.value = response.data.url
}
//校验上传图片大小;
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 1) {
        ElMessage.error('文件大小不能超过 1MB!')
        return false
    }
    return true
}
//上传头像;
function submitUpload() {
    if (!uploadUrl.value) return
    updateUserInfoApi({
        avatarImg: uploadUrl.value
    }).then(async (res) => {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        uploadUrl.value = '';
        await userStore.getUserInfo();
        dialogAvatarVisible.value = false;
    }).catch(error => {
        ElMessage({
            message: '修改失败',
            type: 'warning',
        })
    })
}
//展示上传头像弹出框事件;
function showDialog() {
    dialogAvatarVisible.value = true;
}
//重置按钮事件;
function resetUpload() {
    uploadUrl.value = '';
    upload.value!.clearFiles()
}
</script>

<template>
    <div>
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="个人资料" name="first">
                <el-container class="flex-row">
                    <el-aside width="10%">
                        <div class="demo-fit">
                            <div class="block">
                                <div class="box" @mouseover="enterStatus" @mouseout="leaveStatus">
                                    <el-avatar shape="circle" :size="100" :fit="fit" :src="userInfo.avatarImg || url" />
                                    <div class="beforeEnter" :class="{ blur: isOver }">
                                        <el-button size="small" text bg link round @click="showDialog">修改头像
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-aside>
                    <el-main class="main">
                        <el-container class="username">
                            <el-header>
                                <div>
                                    <span class="strong">{{ userInfo.avatarName }}</span>
                                </div>
                            </el-header>
                            <el-main class="bottom-main flex-box">
                                <el-input class="input" v-model="userInfo.personalSignature" maxlength="30"
                                    placeholder="个性签名" clearable show-word-limit type="text" :disabled="disabled"
                                    @blur="closeInput" @keyup.enter="toBlur" />
                                <el-button @click="openInput" type="danger" :icon="EditPen" circle size="large" link />
                            </el-main>
                        </el-container>
                    </el-main>
                </el-container>
                <!-- 个人资料/基础信息 -->
                <el-divider>
                    <el-icon>
                        <star-filled />
                    </el-icon>
                </el-divider>
                <el-descriptions title="基础信息" class="mt-20">
                    <template #extra>
                        <el-button type="danger" text bg @click="to('/updataUserInfo')">
                            <el-icon>
                                <EditPen />
                            </el-icon>编辑资料
                        </el-button>
                    </template>
                    <el-descriptions-item label="性别">{{ userInfo.sex == 1 ? "男" : "女" }}</el-descriptions-item>
                    <el-descriptions-item label="年龄">{{ age || '— —' }}</el-descriptions-item>
                    <el-descriptions-item label="生日">{{ birthday || '— —' }}</el-descriptions-item>
                    <el-descriptions-item label="标签">
                        <el-tag>萌新</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="个人爱好">
                        {{ userInfo.hobby || '— —' }}
                    </el-descriptions-item>
                    <el-descriptions-item label="详细地址">
                        {{ userInfo.address || '— —' }}
                    </el-descriptions-item>
                </el-descriptions>
            </el-tab-pane>
            <el-tab-pane label="我的消息" name="second">我的消息</el-tab-pane>
            <el-tab-pane label="我的钱包" name="third">我的钱包</el-tab-pane>
        </el-tabs>
    </div>
    <!-- 上传图像弹出框 -->
    <el-dialog v-model="dialogAvatarVisible" title="更换头像">
        <div class="flex-center">
            <el-upload ref="upload" class="avatar-uploader" action="/api/upload/enclosure"
                :before-upload="beforeAvatarUpload" :on-success="handleSuccessUpload" :show-file-list="false">
                <img v-if="uploadUrl" :src="uploadUrl" class="avatar" />
                <el-icon v-else class="avataruploader-icon">
                    <Plus />
                </el-icon>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png 格式文件不能超过 1M
                    </div>
                </template>
            </el-upload>
        </div>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="resetUpload">重置</el-button>
                <el-button type="danger" @click="submitUpload">上传头像</el-button>
            </span>
        </template>
    </el-dialog>
</template>



<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

:deep(.demo-fit .title[data-v-7429c297]) {
    /* 隐藏头像框组件中的默认文本 */
    font-size: 0;
}

:deep(.el-aside) {
    /* 修改头像框组件中的属性 */
    overflow: visible;
}

:deep(.el-divider__text) {
    /* 修改五角星分隔线的背景颜色 */
    background-color: transparent;
}

.flex-box {
    display: flex;
    gap: 10px;
    align-items: center;
}

:deep(.el-descriptions__body) {
    /* 设置基础信息的背景颜色 */
    background-color: transparent;
}

:deep(.el-main) {
    padding: 0;
}

.main {
    display: flex;
    text-align: left;
    align-items: center;
}

:deep(.el-input) {
    /* 修改个性签名输入框的宽度 */
    width: 30%;
}

.beforeEnter {
    display: none;
    padding: 40px 0;
    box-sizing: border-box;
    text-align: center;
}

.blur {
    display: block;
    width: 100px;
    height: 100px;
    position: absolute;
    top: 0;
    backdrop-filter: blur(7px);
    background-color: rgba(125, 123, 123, 0.2);
    border-radius: 100px;
}

.box {
    position: relative;
}

:deep(.el-input) {
    width: 200px;
}

/* 上传头像 */
:deep(.el-upload) {
    display: flex;
    width: 200px;
    height: 200px;
    align-items: center;
}

.avatar {
    display: flex;
    width: 200px;
    height: 200px;
}

.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 头像与昵称的盒子 */
.flex-row {
    min-width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
}

:deep(.el-header) {
    padding: 0;
}
</style>
<style>
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
    width: 200px;
    height: 200px;
    text-align: center;
}
</style>