import { defineStore } from "pinia";
import {ref,reactive,computed} from 'vue';
import type { Colors } from "@/types/ThemeColors"

export const useThemeStore=defineStore('themeStore',()=>{
   const themeColors = reactive<Colors>({
     id:1,
     appearanceUrl:'',
     title:'默认值',
     color:'linear-gradient(to bottom, #f47599, #f7c6cd)'
   })

   let color=computed(()=>themeColors.color)

   const setThemeColor=(payLoad:Colors)=>{
    Object.assign(themeColors, payLoad)
    console.log(color.value)
   }

  return {themeColors,color,setThemeColor}
})