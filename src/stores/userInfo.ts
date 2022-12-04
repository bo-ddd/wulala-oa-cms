import { defineStore } from "pinia";
import { reactive } from "vue";
import type { UserInfo } from "@/types/User"; 
import { queryUserInfoApi } from "@/assets/api/api";

export const useUserStore=defineStore('userInfo',()=>{
      const userInfo=reactive({} as UserInfo) 

      const getUserInfo=function(){
          return queryUserInfoApi().then(res=>{
               Object.assign(userInfo,res.data);
          })
      }
      return {getUserInfo,userInfo}
})
