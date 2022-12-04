import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import type { Permission } from "@/types/Permission";
// import axios from "../assets/api/api";
import type { UserId, UserPermissionList } from "@/types/User";
import { queryUserInfoApi,permissionUserListApi } from "@/assets/api/api";

export const useStore = defineStore('counter', () => {
  let userInfo = reactive<UserId>({
    userId: 0
  })
  let userPremissionList = reactive<Permission[]>([]);
  let userId = computed(() => userInfo.userId)

  //获取userId;
  const getUserId = () => {
    return queryUserInfoApi().then(res => {
      setUserId(res.data)
    })
  }
  const setUserId = (payLoad: UserId) => {
    Object.assign(userInfo, payLoad)
  }

  //获取权限列表;
  const getUserPermissionList = () => {
    return permissionUserListApi({ userId: userInfo.userId }).then(res => {
      setUserPermissionList(res.data)
    })
  }

  const setUserPermissionList = (payLoad: UserPermissionList) => {
    Object.assign(userPremissionList, payLoad)
  }

  return { userId, userPremissionList, getUserId, getUserPermissionList }
})