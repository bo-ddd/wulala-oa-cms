<script lang="ts" setup>
import { Timer } from '@element-plus/icons-vue'

interface User {
  id:number
  start_time: string
  applicant: string
  end_time:string
  department:string
  duration:string
  state:string
  Audit:string
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

const tableData: User[] = [
  {
    id:1,
    applicant: '有点任性',
    department:'马超项目组',
    start_time: '2016-05-03',
    end_time:'2016-05-04',
    duration:'2日',
    state:'审核中',
    Audit:'磊哥'
  },
  {
    id:2,
    applicant: '有点格调',
    department:'呜啦啦项目组',
    start_time: '2016-05-02',
    end_time:'2016-05-05',
    duration:'3日',
    state:'未通过',
    Audit:'马格烜'
  },
  {
    id:3,
    applicant: '有点耿直',
    department:'呜啦啦oa项目组',
    start_time: '2016-05-04',
    end_time:'2016-05-06',
    duration:'2日',
    state:'已通过',
    Audit:'磊哥'
  },
  {
    id:4,
    applicant: '有点胖',
    department:'马超项目组',
    start_time: '2016-05-01',
    end_time:'2016-05-07',
    duration:'6日',
    state:'未通过',
    Audit:'马格烜'
  },
]
</script>

    <template>
  <el-table :data="tableData" style="width: 100%">

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
            <div>applicant: {{ scope.row.applicant }}</div>
            <div>address: {{ scope.row.address }}</div>
          </template>
          <template #reference>
            <el-tag>{{ scope.row.applicant }}</el-tag>
          </template>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column label="部门" width="150">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.department }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="开始时间" width="150">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="结束时间" width="150">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="时长" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.duration }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column label="状态" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.state }}</span>
        </div>
      </template>
    </el-table-column>
    
    <el-table-column label="审核者" width="100">
      <template #default="scope">
        <div style="display: flex; align-items: center;justify-content: center;">
          <span style="margin-left: 10px">{{ scope.row.Audit }}</span>
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
::v-deep .cell{
    text-align: center;
}
</style>