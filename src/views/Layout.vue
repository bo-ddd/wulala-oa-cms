<script setup lang="ts">
import { RouterView, useRouter, useRoute } from "vue-router";
import { ArrowRight } from '@element-plus/icons-vue';
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
const sidebarRouterList = [
    {
        id: 1,
        path: '首页',

    },
    {
        id: 2,
        path: '员工管理',
        childPath: [
            {
                id: 1,
                path: '员工列表'
            }
        ]
    },
    {
        id: 3,
        path: '流程审批',
        childPath: [
            {
                id: 1,
                path: '请假'
            }
        ]
    },
    {
        id: 4,
        path: '审核管理'
    },
    {
        id: 5,
        path: '绩效管理'
    },
    {
        id: 6,
        path: '权限管理'
    },
    {
        id: 7,
        path: '设置'
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
                            <el-menu-item index="1">
                                <el-icon>
                                    <HomeFilled />
                                </el-icon>
                                <span @click="to('home')">首页</span>
                            </el-menu-item>
                            <!-- <el-menu-item index="2">
                                <el-icon>
                                    <Avatar />
                                </el-icon>
                                <span>员工管理</span>
                            </el-menu-item> -->
                            <el-sub-menu index="2">
                                <template #title>
                                    <el-icon>
                                        <HomeFilled />
                                    </el-icon>
                                    <span>员工管理</span>
                                </template>
                                <el-menu-item index="1-4-1" @click="to('userlist')">员工列表</el-menu-item>
                            </el-sub-menu>

                            <el-sub-menu index="3">
                                <template #title>
                                    <el-icon>
                                        <HomeFilled />
                                    </el-icon>
                                    <span>流程审批</span>
                                </template>
                                <el-menu-item index="1-4-1" @click="to('leave')">请假</el-menu-item>
                            </el-sub-menu>
                            <el-menu-item index="4">
                                <el-icon>
                                    <Stamp />
                                </el-icon>
                                <span>审核管理</span>
                            </el-menu-item>

                            <el-menu-item index="5">
                                <el-icon>
                                    <TrendCharts />
                                </el-icon>
                                <span>绩效管理</span>
                            </el-menu-item>

                            <el-menu-item index="6">
                                <el-icon>
                                    <Key />
                                </el-icon>
                                <span>权限管理</span>
                            </el-menu-item>

                            <el-menu-item index="7">
                                <el-icon>
                                    <Tools />
                                </el-icon>
                                <span>设置</span>
                            </el-menu-item>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>

            <!-- 主体部分 -->
            <el-container class="container">
                <el-header>
                    <div class="nav">
                        <el-breadcrumb :separator-icon="ArrowRight" v-for="item in sidebarRouterList">
                            <el-breadcrumb-item :to="{ path: null }">{{item.path}}</el-breadcrumb-item>
                            <el-breadcrumb-item v-if="item.childPath" v-for="key in item.childPath">
                                {{key.path}}
                            </el-breadcrumb-item>
                        </el-breadcrumb>

                        <div class="mine">
                            <div class="avatar">
                                <img class="icon-avatar" src="@/assets/images/icon-avatar.png" alt="">
                            </div>
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

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 32px;
}

.icon-avatar {
    width: 100%;
}

.icon-arrow {
    width: 16px;
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