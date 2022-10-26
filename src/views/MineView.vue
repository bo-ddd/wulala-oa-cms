
<script setup lang="ts">
import { ref, type Ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router';
import type { TabsPaneContext } from 'element-plus'
import { ElMessage } from 'element-plus';
import { StarFilled } from '@element-plus/icons-vue'
import { EditPen } from '@element-plus/icons-vue'
import axios from '../assets/api/api'
const router = useRouter();
const activeName = ref('first')
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
const disabled: Ref = ref(true);

//用户头像自适应功能;
const state = reactive({
    fit: 'fill',
    url: 'https://img.ixintu.com/download/jpg/20200815/18ae766809ff27de6b7a942d7ea4111c_512_512.jpg!bg',
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
    axios.updateUserInfoApi({
        userId:userInfo.userId,
        sex:userInfo.sex,
        birthday:userInfo.birthday, 
        hobby:userInfo.hobby,
        personalSignature:userInfo.personalSignature
    }).then(res=>{
        ElMessage({
                    message: '修改成功',
                    type: 'success',
                })
        disabled.value = true;
        
    })
}

function toBlur(){
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

//刷新页面，调用用户信息接口，渲染个人页面数据

interface UserInfo{
    avatarImg:string;
    avatarName:string;
    birthday:string|Date|number;
    hobby:string;
    personalSignature:string;
    phoneNumber:string;
    sex:number|string;
    userId:number;
}

let age=ref<number>()

let userInfo = reactive<UserInfo>({});

//打开页面自动渲染数据;
(async () => {
    let data = (await axios.queryUserInfoApi({})).data;
    Object.assign(userInfo, data);
    if(!userInfo.personalSignature){
        userInfo.personalSignature='这个人很懒，什么都没留下！';
    }
    let year=new Date(userInfo.birthday).getFullYear();
    let month=new Date(userInfo.birthday).getMonth()+1;
    let date=new Date(userInfo.birthday).getDate();
    let months=month>=10? month:'0'+month;
    userInfo.birthday=year+'-'+months+'-'+date; 
    age.value=parseInt((Date.now()-new Date(userInfo.birthday).valueOf())/1000/60/60/24/365);
})();

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
                                    <el-avatar shape="circle" :size="100" :fit="fit" :src="userInfo.avatarImg||state.url" />
                                    <div class="beforeEnter" :class="{ blur: isOver }">
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
                                    <span class="strong">{{ userInfo.avatarName }}</span>
                                </div>
                            </el-header>
                            <el-main class="bottom-main flex-box">
                                <el-input class="input" v-model="userInfo.personalSignature" maxlength="30" placeholder="个性签名" clearable
                                    show-word-limit type="text" :disabled="disabled" @blur="closeInput" size="small" 
                                    @keyup.enter="toBlur" />
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
                        <el-button type="danger" text bg @click="to('/updataUserInfo')" size="small" >
                            <el-icon>
                                <EditPen />
                            </el-icon>编辑资料  
                        </el-button>
                    </template>
                    <el-descriptions-item label="性别">{{ userInfo.sex==1?"男":"女" }}</el-descriptions-item>
                    <el-descriptions-item label="年龄">{{ age||'— —' }}</el-descriptions-item>
                    <el-descriptions-item label="生日">{{ userInfo.birthday||'— —' }}</el-descriptions-item>
                    <el-descriptions-item label="标签">
                        <el-tag size="small">萌新</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item label="个人爱好">
                        {{ userInfo.hobby||'— —' }}
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

:deep(.el-button) {
    /* 设置修改昵称按钮的背景颜色 */
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

.main .bottom-main {
    padding-left: 20px;
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

:deep(.el-input){
    width:200px;
}
</style>