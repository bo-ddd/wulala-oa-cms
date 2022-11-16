import { defineStore } from "pinia";
import { reactive, computed } from "vue";
interface DimissionFormInfo {
    name: string,
    department: string,
    post: string,
    applicationTime: string,
    duration: string,
    quitType: string,
    desc: string
}
export const useDimissionFormStore = defineStore('dimissionForm', () => {
    let dimissionFormInfo = reactive<DimissionFormInfo[]>([]);
    const setdimissionFormInfo = () => {
        dimissionFormInfo.length = 0;
        if (localStorage.getItem('dimissionForm')) {
            let ruleForm = localStorage.getItem('dimissionForm') as string;
            dimissionFormInfo.push(JSON.parse(ruleForm))
        }
    }
    return { dimissionFormInfo, setdimissionFormInfo }
})