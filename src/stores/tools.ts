import { defineStore } from "pinia";
import { ref } from "vue";

export const usePageSizeSwitchStore = defineStore('PageSizeSwitchStore', () => {
    const pageSizeSwitchStatus = ref(false)
    const pageSizeValue = ref(10)

    const getStorageStatus = () => {
        const statusValue = sessionStorage.getItem('pageSizeSwitchStatus');
        const SizeValue = sessionStorage.getItem('pageSizeValue');
        pageSizeSwitchStatus.value = statusValue ? JSON.parse(statusValue) : false;
        pageSizeValue.value = SizeValue ? JSON.parse(SizeValue) : 10;
    }
    
    const storageCurrentStatus = (status: boolean, value: number) => {
        sessionStorage.setItem('pageSizeSwitchStatus', JSON.stringify(status))
        sessionStorage.setItem('pageSizeValue', JSON.stringify(value))
    }

    return { pageSizeSwitchStatus, pageSizeValue, getStorageStatus, storageCurrentStatus }
})