<script lang="ts" setup>
import { Timer } from '@element-plus/icons-vue'
import { ref } from 'vue'
import axios from '@/assets/api/api'

interface User {
  date: string
  name: string
  address: string
}

const handleEdit = (index: number, row: User) => {
}
const handleDelete = (index: number, row: User) => {
}
let getUserMessageList = ref()
const getUserMessage = async () => {
   let asd = await axios.queryMessageListApi({})
}
getUserMessage()
</script>

<template>
   <el-table :data="getUserMessageList" style="width: 100%">

    <el-table-column label="编号" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="用户ID" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.senderId }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="内容" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.content }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="用户昵称" width="180">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">

          <template #default>
            <div>name: {{ scope.row.senderAvatarName }}</div>
            <div>address: {{ scope.row.senderAvatarName }}</div>
          </template>

          <template #reference>
            <el-tag>{{ scope.row.senderAvatarName }}</el-tag>
          </template>

        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="创建时间" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>