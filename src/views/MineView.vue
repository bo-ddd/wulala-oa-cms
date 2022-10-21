
<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus'
import { reactive, toRefs } from 'vue'
import { StarFilled } from '@element-plus/icons-vue'
import { EditPen } from '@element-plus/icons-vue'
const router = useRouter();
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
const text: Ref = ref('');
const disabled: Ref = ref(true);

//用户头像自适应功能;
const state = reactive({
    fit: 'fill',
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
})

const { fit, url } = toRefs(state);

//公共路由跳转方法：
function to(name: string) {
    router.push(name)
}

//切换个性签名编辑状态;
function openInput() {
    disabled.value = false;
}
function closeInput() {
    disabled.value = true;
}

//切换头像入口状态;
const isOver: Ref = ref(false);
function enterStatus() {
    isOver.value = true;
}
function leaveStatus() {
    isOver.value = false;
}


</script>

<template>
    <div>
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="个人资料" name="first">
                <el-container>
                    <el-aside width="10%">
                        <div class="demo-fit">
                            <div class="block">
                                <span class="title">{{ fit }}</span>
                                <div class="box" @mouseover="enterStatus" @mouseout="leaveStatus">
                                    <el-avatar shape="circle" :size="100" :fit="fit" :src="url" />
                                    <div class="beforeEnter" :class="{blur:isOver}">
                                        <el-button size="small" text bg link round @click="to('updataAvatar')">修改头像
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-aside>
                    <el-main class="main">
                        <el-container class="username">
                            <el-header>
                                <div class="flex-box">
                                    <span class="strong">马格烜</span>
                                    <el-button type="plain" :icon="EditPen" circle size="large" link />
                                </div>
                            </el-header>
                            <el-main class="bottom-main flex-box">
                                <el-input class="input" v-model="text" maxlength="30" placeholder="个性签名" clearable
                                    show-word-limit type="text" :disabled="disabled" @blur="closeInput"
                                    @keyup.enter="closeInput" />
                                <el-button @click="openInput" type="plain" :icon="EditPen" circle size="large" link />
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
                        <el-button type="primary" text bg>
                            <el-icon>
                                <EditPen />
                            </el-icon>编辑资料
                        </el-button>
                    </template>

                    <el-descriptions-item label="年龄">24岁</el-descriptions-item>
                    <el-descriptions-item label="性别">男</el-descriptions-item>
                    <el-descriptions-item label="户籍地">山西临汾</el-descriptions-item>
                    <el-descriptions-item label="标签">
                        <el-tag size="small">有点格调</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="个人爱好">
                        吃瓜
                    </el-descriptions-item>
                </el-descriptions>
            </el-tab-pane>


            <el-tab-pane label="我的消息" name="second">我的消息</el-tab-pane>
            <el-tab-pane label="我的钱包" name="third">我的钱包</el-tab-pane>
            <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
        </el-tabs>


    </div>
</template>



<style scoped>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

/* -------------------------------------- */

.demo-fit {
    /* 用户头像自适应 */
    display: flex;
    text-align: center;
    justify-content: space-between;
}

.demo-fit .block {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
}

.demo-fit .title {
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
}

/* -------------------------------------- */

::v-deep .demo-fit .title[data-v-7429c297] {
    /* 隐藏头像框组件中的默认文本 */
    font-size: 0;
}

::v-deep .el-aside {
    /* 修改头像框组件中的属性 */
    overflow: visible;
}

::v-deep .el-divider__text {
    /* 修改五角星分隔线的背景颜色 */
    background-color: transparent;
}

::v-deep .el-button {
    /* 设置修改昵称按钮的背景颜色 */
    background-color: transparent;
}

.flex-box {
    display: flex;
    gap: 10px;
    align-items: center;
}

::v-deep .el-descriptions__body {
    /* 设置基础信息的背景颜色 */
    background-color: transparent;
}

::v-deep .el-main {
    padding: 0;
}

.main {
    display: flex;
    text-align: left;
    align-items: center;

}

.main .bottom-main {
    padding-left: 20px;
}

::v-deep .el-input {
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
</style>