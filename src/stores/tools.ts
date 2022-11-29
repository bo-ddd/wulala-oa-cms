import { defineStore } from "pinia";
import { ref } from "vue";
interface PageSizeOptions {
    SwitchStatus: boolean,
    defaultValue: number
}

export const usePageSizeOptionsStore = defineStore('PageSizeSwitchStore', () => {
    const SwitchStatus = ref(true)
    const defaultValue = ref(10)

    const getStorageStatus = () => {
        const pageSizeOptions = sessionStorage.getItem('pageSizeOptions');
        SwitchStatus.value = pageSizeOptions ? JSON.parse(pageSizeOptions).SwitchStatus : true;
        defaultValue.value = pageSizeOptions ? JSON.parse(pageSizeOptions).defaultValue : 10;
    }

    const storageCurrentStatus = (pageSizeOptions: PageSizeOptions) => {
        sessionStorage.setItem('pageSizeOptions', JSON.stringify(pageSizeOptions))
    }

    return { SwitchStatus, defaultValue, getStorageStatus, storageCurrentStatus }
})