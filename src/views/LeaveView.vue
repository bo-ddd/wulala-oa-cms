<script lang="ts" setup>
import axios from '@/assets/api/api'
import { ref } from 'vue'
interface User {
  id:number
  userId: number
  reason: string
  startTime:string
  endTime:string
  leaveStatus:number
  auditStatus:number
}

const handleEdit = (index: number, row: User) => {
  console.log(index+1, row)
  
}
const handleDelete = (index: number, row: User) => {
  console.log(index+1, row)
}

let leave = ref();
(async function () {
  let leaveData = await axios.leaveListApi({})
  leave.value = leaveData.data.list
})()

</script>

    <template>
  <el-table  :data="leave" style="width: 100%">

    <el-table-column label="编号" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="申请人" width="100">
      <template #default="scope">
        <el-popover effect="light" trigger="hover" placement="top" width="auto">
          <template #default>
            <div>申请人: {{ scope.row.userInfo.avatarName }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.userInfo.avatarName }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="开始时间">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="结束时间" >
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.endTime }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="休假状态">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.leaveStatus }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="请假原因">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.reason }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="状态">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.auditStatus }}</span>
        </div>
      </template>
    </el-table-column>
    
    <el-table-column label="联系方式">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.userInfo.phoneNumber }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >通过</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >不通过</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>


<style scoped>
/* 标题与操作的居中样式 */
::v-deep .cell{
    text-align: center;
}
</style>