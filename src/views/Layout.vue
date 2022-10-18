<script setup lang="ts">
import { RouterView } from "vue-router";

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
                            <el-sub-menu index="1">
                                <template #title>
                                    <el-icon>
                                        <HomeFilled />
                                    </el-icon>
                                    <span>首页</span>
                                </template>
                                <el-menu-item-group title="Group one">
                                    <el-menu-item index="1-1">item one</el-menu-item>
                                    <el-menu-item index="1-2">item two</el-menu-item>
                                </el-menu-item-group>
                                <el-menu-item-group title="Group Two">
                                    <el-menu-item index="1-3">item three</el-menu-item>
                                </el-menu-item-group>
                                <el-sub-menu index="1-4">
                                    <template #title>item four</template>
                                    <el-menu-item index="1-4-1">item one</el-menu-item>
                                </el-sub-menu>
                            </el-sub-menu>

                            <el-menu-item index="2">
                                <el-icon>
                                    <Avatar />
                                </el-icon>
                                <span>员工管理</span>
                            </el-menu-item>

                            <el-menu-item index="3">
                                <el-icon>
                                    <Stamp />
                                </el-icon>
                                <span>审核管理</span>
                            </el-menu-item>

                            <el-menu-item index="4">
                                <el-icon>
                                    <TrendCharts />
                                </el-icon>
                                <span>绩效管理</span>
                            </el-menu-item>

                            <el-menu-item index="5">
                                <el-icon>
                                    <UserFilled />
                                </el-icon>
                                <span>个人中心</span>
                            </el-menu-item>

                            <el-menu-item index="6">
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
                        <!-- <div class="address">
                            首页/员工列表
                        </div> -->
                        <el-page-header>
                            <template #breadcrumb>
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item :to="{ path: './page-header.html' }">
                                        首页
                                    </el-breadcrumb-item>
                                    <el-breadcrumb-item><a href="./page-header.html">我的审批</a></el-breadcrumb-item>
                                    <el-breadcrumb-item>巴拉巴拉</el-breadcrumb-item>
                                </el-breadcrumb>
                            </template>
                            <template #content>
                                <span class="text-large font-600"> Title </span>
                            </template>
                        </el-page-header>

                        <div class="mine">
                            <div class="avatar">
                                <img class="icon-avatar" src="@/assets/images/icon-avatar.png" alt="">
                            </div>
                            <div class="username">马格烜</div>
                            <img class="icon-arrow" src="@/assets/images/icon-arrow_nav.png" alt="">
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
    background-color: #b3e1e9;

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