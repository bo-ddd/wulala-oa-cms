import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { Permission } from "@/types/Permission";
import axios from "../assets/api/api";
import type { UserInfo, UserPermissionList } from "@/types/User";

export const useStore = defineStore('counter', () => {
  let userInfo = reactive<UserInfo>({
    userId: 0
  })
  let userPremissionList = reactive<Permission[]>([]);
  let userId = computed(() => userInfo.userId)

  //获取userId;
  const getUserId = () => {
    return axios.queryUserInfoApi().then(res => {
      setUserId(res.data)
    })
  }
  const setUserId = (payLoad: UserInfo) => {
    Object.assign(userInfo, payLoad)
  }

  //获取权限列表;
  const getUserPermissionList = () => {
    return axios.permissionUserListApi({ userId: userInfo.userId }).then(res => {
      setUserPermissionList(res.data)
    })
  }

  const setUserPermissionList = (payLoad: UserPermissionList) => {
    Object.assign(userPremissionList, payLoad)
  }

  return { userId, userPremissionList, getUserId, getUserPermissionList }
})