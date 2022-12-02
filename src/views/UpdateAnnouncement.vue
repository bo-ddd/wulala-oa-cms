<script setup lang="ts">
import { ref } from "vue";
const tabPosition = ref('left')

const versionList = [
    {
        id: 1,
        label: '最新版本',
        title: 'V1.2.2',
        time: '2022年12月1日',
        contentList: [
            {
                id: 1 - 1,
                first: '1、更新了页面未加载出来之前的进度条功能',
            },
            {
                id: 1 - 2,
                first: '2、增加了我的消息页面功能',
            }

        ]
    },
    {
        id: 2,
        label: 'V1.1.2',
        title: 'V1.1.2',
        time: '2022年11月23日',
        contentList: [
            {
                id: 2 - 1,
                first: '修改了所有页面的分页效果，用户可以自定义每页的总条数',
            },
        ]
    },
    {
        id: 3,
        label: 'V1.1.1',
        title: 'V1.1.1',
        time: '2022年11月15日',
        contentList: [
            {
                id: 3 - 1,
                first: '1、修改了日报功能的相关样式',
            },
            {
                id: 3 - 1,
                first: '2、修改了所有按钮和input框的大小',
            },
            {
                id: 3 - 1,
                first: '3、同意了所有按钮的颜色',
            },
        ]
    },
    {
        id: 4,
        label: 'V1.1.0',
        title: 'V1.1.0',
        time: '2022年11月1日',
        contentList: [
            {
                id: 4 - 1,
                first: '增加了提交日报的功能',
            },
        ]
    },
]
</script>
<template>
        <el-tabs :tab-position="tabPosition" class="demo-tabs">
            <el-tab-pane v-for="item in versionList" :key="item.id" :label="item.label">
                <div class="notice">
                    <h3 class="mb-10">{{ item.title }}</h3>
                    <div class="mb-10 grid">
                        <div>【更新时间】</div>
                        <div> {{ item.time }}</div>
                    </div>
                    <div class="grid">
                        <div>【更新内容】</div>
                        <div v-for="el in item.contentList" :key="el.id">
                            <div>{{ el.first }}</div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
</template>

<style scoped>
.demo-tabs>.el-tabs__content {
    height: 100vh;
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
    height: 100%;
}
.notice {
    width: 500px;
    height: 100%;
    padding: 10px 15px;
    background: rgb(244 235 236 / 50%);
    border: 1px dashed rgb(209, 182, 182);
}

.grid {
    display: flex;
    flex-direction: column;
    gap: 5px 0;
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
</style>