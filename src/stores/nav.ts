import { defineStore } from "pinia";

export const useStore = defineStore('counter', () => {
  let routerFlag: boolean = true
  return { routerFlag }
})