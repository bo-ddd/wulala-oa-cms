import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { Colors } from "@/types/ThemeColors"

export const useChangeColor = defineStore('counter', () => {
    let themeColors = reactive<Colors>({
        id: 1,
        appearanceUrl: '',
        title: '默认值',
        color: '--el-gradient-gb-color-default'
    })
    let color = computed(() => themeColors.color)

    //设置主题颜色;
    const setColor = (payLoad: Colors) => {
        Object.assign(themeColors, payLoad)
    }

    return { color, setColor }
})