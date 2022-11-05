import { defineStore } from "pinia";

export const useNav=defineStore('nav',{
   state:()=>{
    return{
        targetData:[]
    }
   }

})