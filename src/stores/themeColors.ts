import { defineStore } from "pinia";
import { reactive, computed } from 'vue';
import type { Colors } from "@/types/ThemeColors"

export const useThemeStore = defineStore('themeStore', () => {
  const themeColors = reactive<Colors>({
    id: 1,
    appearanceUrl: '',
    title: '',
    color: localStorage.getItem('color') as string
  })

  let color = computed(() => themeColors.color)

  const setThemeColor = (payLoad: Colors) => {
    Object.assign(themeColors, payLoad)
    localStorage.setItem('color', themeColors.color)
    localStorage.setItem('id', themeColors.id + '')
  }
  const getThemeColor = () => {
    return localStorage.getItem('color') as string
  }
  const getThemeId = () => {
    return localStorage.getItem('id') as string
  }
  return { themeColors, color, setThemeColor, getThemeColor, getThemeId }
})