import { defineStore } from "pinia";
import { reactive } from "vue";
import type { UserInfo } from "@/types/User";
import { queryUserInfoApi,updateUserInfoApi } from "@/assets/api/api";

export const useUserStore = defineStore('userInfo', () => {
    const userInfo = reactive({})as UserInfo
    //获取用户信息
    async function getUserInfo() {
        let res = await queryUserInfoApi()
        Object.assign(userInfo, res.data);
    }
    //修改用户信息
    async function updateUserInfo(params:UserInfo) {
        let res=await updateUserInfoApi(params)
        getUserInfo()
    }
    return { getUserInfo, userInfo,updateUserInfo }
})
