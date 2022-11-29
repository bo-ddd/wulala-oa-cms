<template>
    <el-affix position="bottom" :offset="10" v-if="tipStatus">
        <div class="tip">
            <p class="text-tip">
                <el-icon>
                    <WarningFilled />
                </el-icon>
                尊敬的用户，您好！系统已根据您的屏幕分辨率，自动给您推荐了每页显示的最佳数据条数。如果您不喜欢，请在右上角我的设置中关闭此功能！
            </p>
            <el-link class="btn-close" @click="closeTip">
                我知道了
            </el-link>
        </div>
    </el-affix>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { WarningFilled } from '@element-plus/icons-vue';
const tipStatus = ref(true);
const closeTip = () => {
    tipStatus.value = false
}
</script>

<style scoped>
.tip {
    height: 20px;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    background-color: rgba(245, 197, 108, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tip .btn-close {
    font-size: 14px;
    padding-bottom: 1px;
    border-bottom: solid 1px black;
}

.tip .btn-close:hover {
    border-bottom: 0
}

.tip .text-tip {
    display: flex;
    gap: 10px;
    align-items: center;
}
</style>