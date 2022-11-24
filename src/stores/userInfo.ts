import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "../assets/api/api";
import type { UserInfo } from "@/types/User";


export const useUserStore=defineStore('userInfo',()=>{
      const userInfo=reactive({} as UserInfo) 
      const getUserInfo=function(){
          return axios.queryUserInfoApi().then(res=>{
               Object.assign(userInfo,res.data)
          })
      }
      return {getUserInfo,userInfo}
})
