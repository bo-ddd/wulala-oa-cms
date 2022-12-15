<template>
        <el-button @click="resetForm(formEl)">重置</el-button>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { toRef } from 'vue';
const props = defineProps<{
    formEl: FormInstance | undefined
}>()
const formEl = toRef(props, 'formEl');
function resetForm(formEl: FormInstance | undefined) {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped>

</style>