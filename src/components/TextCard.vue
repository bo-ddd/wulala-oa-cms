<template>
    <div class="box-card">
        <el-space wrap>
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span class="strong">{{ title }}</span>
                        <el-button class="button" text>{{ subTitle }}</el-button>
                    </div>
                </template>
                <el-scrollbar height="246px">
                    <p v-for="item in data" :key="item.id" class="scrollbar-demo-item">{{ item.text }}</p>
                </el-scrollbar>
            </el-card>
        </el-space>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    data: { id: number, text: string }[],
    title: string,
    subTitle: string
}>()
const { data, title, subTitle } = props
</script>

<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
}

.box-card {
    min-width: 398px;
    transition: all 0.1s ease-in;
}

:deep(.el-card) {
    border-radius: 10px;
    min-width: 400px;
}

:deep(.el-card__header) {
    padding: 5px;
}

:deep(.el-card__body) {
    padding: 5px;
}

::deep(.el-space__item) {
    margin-right: 0;
    padding-bottom: 0;
}

.card-header .button {
    font-size: 8px;
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin: 10px 15px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    text-overflow: ellipsis;
    white-space: noWrap;
    overflow: hidden;
    font-size: 13px;
}

:deep(.scrollbar-demo-item[data-v-b4e148ca]) {
    background-color: rgba(239, 166, 178, 0.2);
    color: rgb(228, 15, 122);
}

.clear-padding {
    padding: 0 !important;
}
</style>