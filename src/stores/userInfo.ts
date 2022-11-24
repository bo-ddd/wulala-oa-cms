import { defineStore } from "pinia";
import { reactive } from "vue";
import axios from "../assets/api/api";

export const useUserStore=defineStore('userInfo',()=>{
      const userInfo=reactive({})
      const getUserInfo=function(){
          return axios.queryUserInfoApi().then(res=>{
               Object.assign(userInfo,res.data)
          })
      }
      return {getUserInfo,userInfo}
})
