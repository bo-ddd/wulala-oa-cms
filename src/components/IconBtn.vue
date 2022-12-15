<template>
    <el-button :type="type" @click="toEmits">
        <el-icon>
            <component :is="icon"></component>
        </el-icon>
        <span>
            {{ text }}
        </span>
    </el-button>
</template>

<script setup lang="ts">
const props = defineProps<{
    text: string,
    icon: string,
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}>()
const { text, icon, type = '' } = props
const emits = defineEmits(['click']);
function toEmits() {
    emits('click')
}
</script>

<style scoped>

</style>