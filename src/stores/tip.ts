import { defineStore } from "pinia";
import { reactive } from "vue";
export const useTipStore = defineStore('tipStore', () => {
    const tipStatusArr = reactive([true, true, true, true, true, true, true])
    const storageTipStatus = () => {
        sessionStorage.setItem('tipStatusArr', JSON.stringify(tipStatusArr))
    }
})