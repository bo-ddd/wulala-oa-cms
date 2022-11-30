import { defineStore } from "pinia";
import { ref } from "vue";
export const useTipStore = defineStore('tipStore', () => {
    const tipStatus = ref(true);
    const tipFrequency = ref(0);

    const countClickFrequency = () => {
        tipFrequency.value++;
    }

    const storageClickFrequency = () => {
        localStorage.setItem('tipFrequency', JSON.stringify(tipFrequency.value))
    }

    const storageCurrentStatus = (tipStatusValue: boolean) => {
        localStorage.setItem('tipStatus', JSON.stringify(tipStatusValue))
    }

    const getClickFrequency = () => {
        const tipFrequencyStorage = localStorage.getItem('tipFrequency')
        tipFrequency.value = tipFrequencyStorage ? JSON.parse(tipFrequencyStorage) : tipFrequency.value;
    }

    const getTipStatus = () => {
        const tipStatusStorage = localStorage.getItem('tipStatus')
        tipStatus.value = tipStatusStorage ? JSON.parse(tipStatusStorage) : tipStatus.value;
    }

    return { tipStatus, tipFrequency, countClickFrequency, storageClickFrequency, getClickFrequency, storageCurrentStatus, getTipStatus }

})