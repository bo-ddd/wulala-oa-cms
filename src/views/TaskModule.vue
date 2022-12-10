<script setup lang="ts">
import { getDeptListApi } from "@/assets/api/api";
import { reactive, ref } from "vue";
import type { DepartmentData } from "@/types/Dept";
import { useRouter } from "vue-router";
let router=useRouter()

let deptList = reactive<DepartmentData[]>([])
let flag = ref(true)
getDeptList()

async function getDeptList() {
  const res = await getDeptListApi()
  const prevList = res.data
  Object.assign(deptList, formateDeptList(prevList))
  console.log(deptList.length)
  if (deptList.length == 4) {
    flag.value = false
  } else {
    flag.value = true
  }
}
const formateDeptList = function (deptList: DepartmentData[]) {
  let List = JSON.parse(JSON.stringify(deptList))
  const iconArr = ['Position', 'Food', 'Memo']
  let index = 0;
  List.forEach((el: any) => {
    el.icon = iconArr[index]
    index++
  })
  return List
}
</script>
<template>
  <div class="max-box">
    <div class="mt-20" :class="flag == true ? 'task' : 'task-4'">
      <div class="module" v-for="item in deptList" key="item.id" @click="router.push('/taskList')">
        <div class="oa">
          <el-icon>
            <component :is="item.icon" ></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.task {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.task-4 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap:20px;
}

.task-4 .module{
  justify-self: center;
}

.module {
  width: 310px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  box-sizing: border-box;
  background: url('@/assets/images/微信图片_20221207165631.png') no-repeat center;
  background-size: cover;
}

.oa {
  display: flex;
  gap: 0 5px;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
}
</style>