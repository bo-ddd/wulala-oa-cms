<script setup lang="ts">
import { RouterView, useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { ArrowRight } from '@element-plus/icons-vue';
import axios from '../assets/api/api';
import { ref } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import sidebarList from '../router/menu';
import type { UploadInstance, UploadProps } from 'element-plus';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/stores/userInfo';
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { userInfo: userInfos } = storeToRefs(userStore)
//动画

onMounted(async () => {
    await userStore.getUserInfo()
    // 初始化页面数据
})
//右上角个人中心列表;
const dropDownList = [
    {
        id: 1,
        name: '个人中心',
        targetPath: '/mine',
        childrenList: []
    },
    {
        id: 2,
        name: '我的消息',
        targetPath: '/message',
        childrenList: []
    },
    {
        id: 3,
        name: '我的设置',
        targetPath: '/myTools',
        childrenList: []
    },
    {
        id: 4,
        name: '退出登录',
        targetPath: '/',
        childrenList: []
    },
]

//路由跳转;
let router = useRouter();
let route = useRoute();

//动态渲染面包屑导航;
let pName = ref('');
let cName = ref('');

function getPageName(path: string) {
    sidebarList.forEach(item => {
        if (item.targetPath == path) {
            pName.value = item.name;
            cName.value = "";
        } else if (item.childrenList.length) {
            item.childrenList.forEach(childItem => {
                if (childItem.targetPath == path) {
                    pName.value = item.name;
                    cName.value = childItem.name;
                }
            })
        }
    }
    )
}
function getMinePageName(path: string) {
    dropDownList.forEach(item => {
        if (item.targetPath == path) {
            pName.value = item.name;
            cName.value = "";
        }
    })
}

//解决页面刷新后面包屑导航名称与侧边栏名称会重置的情况;
const activeItem = ref('/')
onMounted(() => {
    getPageName(route.path);
    getMinePageName(route.path);
    activeItem.value = route.path
})

//右上角个人中心路由跳转;
function to(path: string) {
    router.push(path)
    getMinePageName(path)
    activeItem.value = '/'
}

//上传头像;
const defaultAvatarImg = 'https://img.ixintu.com/download/jpg/20200815/18ae766809ff27de6b7a942d7ea4111c_512_512.jpg!bg';

const userInfo = userInfos.value;

const updateUserInfoApi = (payLoad: {}) => {
    return axios.updateUserInfoApi({
        userId: userInfo.userId,
        sex: userInfo.sex,
        birthday: new Date(userInfo.birthday).getTime(),
        hobby: userInfo.hobby,
        ...payLoad
    })
}
const dialogAvatarVisible = ref(false);
const uploadUrl = ref('');

const upload = ref<UploadInstance>()

//获取上传图像的url;
const handleSuccessUpload: UploadProps['onSuccess'] = (response) => {
    uploadUrl.value = response.data.url
}
//校验上传图片大小;
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile);

    if (rawFile.size / 1024 / 1024 > 1) {
        ElMessage.error('文件大小不能超过 1MB!')
        return false
    }
    return true
}
//上传头像;
const submitUpload = () => {
    if (!uploadUrl.value) return
    updateUserInfoApi({
        avatarImg: uploadUrl.value
    }).then(async (res) => {
        ElMessage({
            message: '修改成功',
            type: 'success',
        })
        uploadUrl.value = '';
        // await initUserInfo();
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
const showDialog = () => {
    dialogAvatarVisible.value = true;
}
//重置按钮事件;
const resetUpload = () => {
    uploadUrl.value = '';
    upload.value!.clearFiles()
}
</script>

<template>

    <div class="common-layout gradient no-selected">
        <el-container >
            <!-- 侧边栏 -->
            <el-aside width="200px" class="pt-20">
                <div class="header-sidebar">
                    <img class="icon-main" src="/src/assets/images/logo.png" alt="">
                    <h3 class="title">后台管理系统</h3>
                </div>
                <!-- 动态渲染侧边栏列表 -->
                <el-row class="tac sidebar-list">
                    <el-col :span="1">
                        <el-menu router :default-active="activeItem" unique-opened>
                            <div v-for="(item, index) in sidebarList">
                                <el-menu-item :index="item.targetPath" :key="index" v-if="!item.childrenList.length">
                                    <el-icon>
                                        <component :is="item.icon"></component>
                                    </el-icon>
                                    <span @click="getPageName(item.targetPath)">{{ item.name }}</span>
                                </el-menu-item>

                                <el-sub-menu :key="index" :index="index + ''" v-if="item.childrenList.length">
                                    <template #title>
                                        <el-icon>
                                            <component :is="item.icon"></component>
                                        </el-icon>
                                        <span>{{ item.name }}</span>
                                    </template>
                                    <el-menu-item :index="key.targetPath" :key="index + '-' + keyIndex"
                                        v-for="(key, keyIndex) in item.childrenList"
                                        @click="getPageName(key.targetPath)">
                                        {{ key.name }}
                                    </el-menu-item>
                                </el-sub-menu>
                            </div>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>

            <!-- 主体部分 -->
            <el-container class="container">
                <el-header>
                    <div class="nav">
                        <el-breadcrumb :separator-icon="ArrowRight">
                            <el-breadcrumb-item :to="{ path: null }">
                                {{ pName }}
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>
                                {{ cName }}
                            </el-breadcrumb-item>
                        </el-breadcrumb>

                        <div class="mine">

                            <el-avatar :src="userInfo.avatarImg || defaultAvatarImg" class="img-avatar"
                                @click="showDialog" />
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link flex-col">
                                    <span class="no-shrink">{{ userInfo.avatarName }}</span>
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu split-button>
                                        <el-dropdown-item divided @click="to(item.targetPath)"
                                            v-for="(item, index) in dropDownList" :key="index">
                                            {{ item.name }}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>

                        </div>
                    </div>
                </el-header>

                <el-main class="el-main mt-10">
                    <RouterView></RouterView>
                </el-main>

                <el-footer class="footer">
                    技术支持: 呜啦啦OA项目组
                </el-footer>
            </el-container>
        </el-container>
    </div>
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
.common-layout {
    min-width: 1154px;
    height: 100vh;
}

.gradient {
    background: linear-gradient(to bottom,
            #f47599,
            #f7c6cd);
    overflow-y: hidden;
}

:deep(.el-menu) {
    /* 侧边导航栏列表 */
    border-right: 0;
    background-color: transparent;
}

:deep(.el-sub-menu__title) {
    /* 侧边导航栏列表--点击效果 */
    background-color: transparent;
}

:deep(.el-menu-item) {
    /* 侧边导航栏列表 */
    background-color: transparent;
}

:deep(.el-header) {
    /* 顶部导航栏 */
    display: flex;
    height: 40px;
}

:deep(.el-page-header__breadcrumb) {
    /* 顶部导航栏--面包屑导航 */
    margin-bottom: 6px;
}

:deep(.el-col-8) {
    /* 顶部导航栏下拉效果 */
    flex: none;
}

:deep(.el-dropdown) {
    /* 顶部导航栏下拉效果 */
    vertical-align: center;
}

.block-col-2 .demonstration {
    /* 顶部导航栏下拉效果 */
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

.header-sidebar {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
}

.icon-main {
    width: 60px;
    height: 60px;
}

.title {
    color: white;
}

.container {
    height: 100vh;
    border-radius: 25px 0 0 25px;
    background-color: #f5f9fd;
    /* background-color: #e6f7f7; */
    padding: 10px 20px;
    box-sizing: border-box;
}

:deep(.el-aside) {
    overflow: hidden;
}

.sidebar-list {
    width: 120px;
    margin: 50px auto;
    height: 70%;
    overflow-x: hidden;
    overflow-y: scroll;
}

.sidebar-list::-webkit-scrollbar {
    display: none;
}

.nav {
    min-width: 998px;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
}

.mine {
    display: flex;
    gap: 12px;
    align-items: center;
}

.el-main {
    min-width: 998px;
    border-radius: 15px;
    /* background-color: #e6f7f7; */
    background-color: white;
    box-sizing: border-box;
}

.footer {
    min-width: 998px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #c6c9c9;
}

.el-main::-webkit-scrollbar {
    display: none;
}

.flex-col {
    display: flex;
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

.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-avatar:hover {
    -webkit-filter: blur(1px);
    filter: blur(1px);
}

.img-avatar:active {
    margin-top: 1px;
}
</style>