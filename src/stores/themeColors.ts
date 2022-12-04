import { defineStore } from "pinia";
import { ref, reactive, computed } from 'vue';
import type { Colors } from "@/types/ThemeColors"

export const useThemeStore = defineStore('themeStore', () => {
  const themeColors = reactive<Colors>({
    id: 0,
    appearanceUrl: '',
    title: '',
    color: ''
  })

  let color = computed(() => themeColors.color)

  const setThemeColor = (payLoad: Colors) => {
    Object.assign(themeColors, payLoad)
    console.log(themeColors.color)
    localStorage.setItem('color', themeColors.color)
  }

  return { themeColors, color, setThemeColor }
})