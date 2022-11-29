import { defineStore } from "pinia";
import { ref, computed } from "vue";
interface PageSizeOptions {
    SwitchStatus: boolean,
    defaultValue: number
}

export const usePageSizeOptionsStore = defineStore('PageSizeSwitchStore', () => {
    const SwitchStatus = ref(true)
    const defaultValue = ref(10)

    const getStorageStatus = () => {
        const pageSizeOptions = sessionStorage.getItem('pageSizeOptions');
        SwitchStatus.value = pageSizeOptions ? JSON.parse(pageSizeOptions).SwitchStatus : SwitchStatus.value;
        defaultValue.value = pageSizeOptions ? JSON.parse(pageSizeOptions).defaultValue : defaultValue.value;
        
    }

    const storageCurrentStatus = (pageSizeOptions: PageSizeOptions) => {
        sessionStorage.setItem('pageSizeOptions', JSON.stringify(pageSizeOptions))
    }
    const getRecommentdefaultValue = () => {
        //获取表格推荐显示条数;
        const WindowHeight = document.documentElement.clientHeight;
        const redundantHeight = 302;
        const unitHeight = 41.53;
        let maxPageSize = computed(() => Math.floor((WindowHeight - redundantHeight) / unitHeight));

        //获取推荐的条数;
        const pageSizeArr = [5, 10, 15, 20, 25, 30];
        pageSizeArr.forEach(item => {
            let result = Math.abs(item - maxPageSize.value);
            if (result <= 2) {
                storageCurrentStatus({ SwitchStatus: true, defaultValue: item })
            }
        })
    }

    return { SwitchStatus, defaultValue, getStorageStatus, getRecommentdefaultValue, storageCurrentStatus }
})