<script lang="ts" setup>
import { reactive } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import axios from '@/assets/api/api'
// do not use same name with ref
const form = reactive({
  name: '',
  date1: '',
  date2: '',
  type: [],
  desc: '',
})

const onSubmit = () => {
  let submitData = axios
}
</script>

    <template>

  <el-tabs type="border-card" class="demo-tabs">

    <el-tab-pane>

      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>请假申请</span>
        </span>
      </template>

      <el-form :model="form" label-width="120px">
    <el-form-item label="昵称">
      <el-input v-model="form.name" />
    </el-form-item>
    
    <el-form-item label="请假时间">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="开始时间"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-date-picker
          v-model="form.date2"
          type="date"
          placeholder="结束时间"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
   
    <el-form-item label="请假原因">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交申请</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
    </el-tab-pane>
    <el-tab-pane label="Config">Config</el-tab-pane>
    <el-tab-pane label="Role">Role</el-tab-pane>
    <el-tab-pane label="Task">Task</el-tab-pane>
  </el-tabs>




</template>



<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.text-center{
  text-align: center;
}
</style>