<script setup lang="ts">
import { RouterView, useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";
import { ArrowRight } from '@element-plus/icons-vue';
import axios from '../assets/api/api';
import { reactive, ref } from 'vue';
import {//顶部导航栏下拉效果;
    ArrowDown
} from '@element-plus/icons-vue';

//侧边栏导航列表;
const sidebarList = [
    {
        id: '1',
        icon: 'HomeFilled',
        name: '首页',
        targetPath: '/home',
        childrenList: []
    },
    {
        id: '2',
        icon: 'UserFilled',
        name: '员工管理',
        targetPath:'',
        childrenList: [
            {
                id: '201',
                name: '员工列表',
                targetPath: '/userList'
            }
        ]
    },
    {
        id: '3',
        icon: 'Checked',
        name: '流程审批',
        targetPath:'',
        childrenList: [
            {
                id: '301',
                name: '请假审批',
                targetPath: '/leave'
            },
            {
                id: '302',
                name: '提交申请',
                targetPath: '/submitApplication'
            }
        ]
    },
    {
        id: '4',
        icon: 'Stamp',
        name: '审核管理',
        targetPath: '',
        childrenList: []
    },
    {
        id: '5',
        icon: 'TrendCharts',
        name: '绩效管理',
        targetPath: '',
        childrenList: []
    },
    {
        id: '6',
        icon: 'Key',
        name: '权限管理',
        targetPath:'',
        childrenList: [
            {
                id: '601',
                name: '权限列表',
                targetPath: '/rightManagement'
            },
            {
                id: '602',
                name: '角色管理',
                targetPath: '/roles'
            },
            {
                id: '603',
                name: '新增角色',
                targetPath: '/createRoles'
            },
            {
                id: '604',
                name: '角色编辑',
                targetPath: '/roleEditing'
            }
        ]
    },
    {
        id: '7',
        icon: 'Tools',
        name: '设置',
        targetPath: '',
        childrenList: []
    },
]

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
        name: '退出登录',
        targetPath: '/',
        childrenList: []
    },
]

//路由跳转;
let router = useRouter();
let route = useRoute();


//动态渲染面包屑导航;
let pName=ref('');
let cName=ref('');

function getPageName(path: string) {
    sidebarList.forEach(item=>{
        if(item.targetPath==path){
            pName.value=item.name;
            cName.value="";
        }else if(item.childrenList.length){
                item.childrenList.forEach(childItem=>{
                if(childItem.targetPath==path){
                    pName.value=item.name;
                    cName.value=childItem.name;
                }
            })
            }
        }
    )
}
function getMinePageName(path:string){
    dropDownList.forEach(item=>{
       if(item.targetPath==path){
        pName.value=item.name;
        cName.value="";
       }
    })
}

//解决页面刷新后面包屑导航名称与侧边栏名称会重置的情况;
const activeItem=ref('/')
onMounted(()=>{
    getPageName(route.path);
    getMinePageName(route.path);
    activeItem.value=route.path
})

//右上角个人中心路由跳转;
function to(path: string) {
    router.push(path)
    getMinePageName(path)
    activeItem.value='/'
}

//侧边栏下拉功能;
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


let userInfo = reactive({
    avatarName: '',
    avatarImg: ''
});

const defaultAvatarImg = 'https://img.ixintu.com/download/jpg/20200815/18ae766809ff27de6b7a942d7ea4111c_512_512.jpg!bg';

(async () => {
    let data = (await axios.queryUserInfoApi({})).data;
    userInfo.avatarName = data.avatarName;
    userInfo.avatarImg = data.avatarImg;
})()

</script>

<template>

    <div class="common-layout gradient no-selected">
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px" class="pt-20">
                <div class="header-sidebar">
                    <img class="icon-main" src="/src/assets/images/logo.png" alt="">
                    <h3 class="title">后台管理系统</h3>
                </div>
                <!-- 动态渲染侧边栏列表 -->
                <el-row class="tac sidebar-list">
                    <el-col :span="1">
                        <el-menu router :default-active="activeItem" unique-opened @open="handleOpen" @close="handleClose">
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
                              {{pName}}
                            </el-breadcrumb-item>
                            <el-breadcrumb-item>
                                {{cName}}
                            </el-breadcrumb-item>
                        </el-breadcrumb>

                        <div class="mine">

                            <el-avatar :src="userInfo.avatarImg || defaultAvatarImg" />

                            <div class="no-shrink">{{ userInfo.avatarName }}</div>
                            <el-col :span="8">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link">
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
                            </el-col>
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
    padding: 10px 20px;
    box-sizing: border-box;
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
    background-color: #e6f7f7;

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
</style>