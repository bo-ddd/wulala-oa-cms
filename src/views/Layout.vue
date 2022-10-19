<script setup lang="ts">
import { RouterView, useRouter, useRoute } from "vue-router";
import { ArrowRight, HomeFilled, UserFilled, Checked, Stamp, TrendCharts, Key, Tools } from '@element-plus/icons-vue';

import {//顶部导航栏下拉效果;
    ArrowDown,
    Check,
    CircleCheck,
    CirclePlus,
    CirclePlusFilled,
    Plus,
} from '@element-plus/icons-vue';

//路由跳转;
let router = useRouter();
function to(name: string) {
    router.push(name)
}

let route = useRoute();
console.log('----------------route----------------------')
console.log(route.name)

//侧边栏路由列表;
const sidebarList = [
    {
        id: '1',
        icon: 'HomeFilled',
        name: '首页',
        targetPath: '/home'
    },
    {
        id: '2',
        icon: 'UserFilled',
        name: '员工管理',
        childrenList: [
            {
                id: 1,
                name: '员工列表',
                targetPath: '/userlist'
            }
        ]
    },
    {
        id: '3',
        icon: 'Checked',
        name: '流程审批',
        childrenList: [
            {
                id: 1,
                name: '请假',
                targetPath: '/leave'
            }
        ]
    },
    {
        id: '4',
        icon: 'Stamp',
        name: '审核管理',
        targetPath: '/home'
    },
    {
        id: '5',
        icon: 'TrendCharts',
        name: '绩效管理',
        targetPath: '/home'
    },
    {
        id: '6',
        icon: 'Key',
        name: '权限管理',
        targetPath: '/home'
    },
    {
        id: '7',
        icon: 'Tools',
        name: '设置',
        targetPath: '/home'
    },
]



//侧边栏下拉功能;
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}


</script>

<template>

    <div class="common-layout gradient">
        <el-container>
            <!-- 侧边栏 -->
            <el-aside width="200px" class="pt-20">
                <div class="header-sidebar">
                    <img class="icon-main" src="/src/assets/images/logo.png" alt="">
                    <h3 class="title">后台管理系统</h3>
                </div>
                <el-row class="tac sidebar-list">
                    <el-col :span="1">
                        <el-menu default-active="1" @open="handleOpen" @close="handleClose">
                            <div v-for="item in sidebarList">
                                <el-menu-item :index='item.id' v-if="!item.childrenList">
                                    <el-icon>
                                        <component :is="item.icon"></component>
                                    </el-icon>
                                    <span @click="to(item.targetPath)">{{item.name}}</span>
                                </el-menu-item>
                                <el-sub-menu :index="item.id" v-if="item.childrenList">
                                    <template #title>
                                        <el-icon>
                                            <component :is="item.icon"></component>
                                        </el-icon>
                                        <span>{{item.name}}</span>
                                    </template>
                                    <el-menu-item v-for="key in item.childrenList" @click="to(key.targetPath)">
                                        {{key.name}}
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
                        <el-breadcrumb :separator-icon="ArrowRight" v-show="item.id==3" v-for="item in sidebarList">
                            <el-breadcrumb-item :to="{ path: null }">{{item.name}}</el-breadcrumb-item>
                            <el-breadcrumb-item v-if="item.childrenList" v-for="key in item.childrenList">
                                {{key.name}}
                            </el-breadcrumb-item>
                        </el-breadcrumb>

                        <div class="mine">

                            <el-avatar src="/src/assets/images/icon-avatar.png" />

                            <div class="no-shrink">马格烜</div>
                            <el-col :span="8">
                                <el-dropdown trigger="click">
                                    <span class="el-dropdown-link">
                                        <el-icon class="el-icon--right">
                                            <arrow-down />
                                        </el-icon>
                                    </span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <el-dropdown-item>个人中心</el-dropdown-item>
                                            <el-dropdown-item>
                                                退出登录
                                            </el-dropdown-item>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </el-col>
                        </div>
                    </div>
                </el-header>

                <el-main class="el-main">
                    <RouterView></RouterView>
                </el-main>

                <el-footer class="footer">
                    技术支持: 呜啦啦有点儿项目组
                </el-footer>
            </el-container>
        </el-container>
    </div>

</template>

<style scoped>
.common-layout {
    height: 100vh;
}

.gradient {
    background: linear-gradient(to bottom,
            #f47599,
            #f7c6cd);
}

::v-deep .el-menu {
    /* 侧边导航栏列表 */
    border-right: 0;
    background-color: transparent;
}

::v-deep .el-sub-menu__title {
    /* 侧边导航栏列表--点击效果 */
    background-color: transparent;
}

::v-deep .el-menu-item {
    /* 侧边导航栏列表 */
    background-color: transparent;
}

::v-deep .el-header {
    /* 顶部导航栏 */
    display: flex;
    height: 40px;
}

::v-deep .el-page-header__breadcrumb {
    /* 顶部导航栏--面包屑导航 */
    margin-bottom: 6px;

}

::v-deep .el-col-8 {
    /* 顶部导航栏下拉效果 */
    flex: none;
}

::v-deep .el-dropdown {
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
    overflow: hidden;
}

.nav {
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
    border-radius: 15px;
    background-color: #e6f7f7;

}

.footer {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #c6c9c9;
}
</style>