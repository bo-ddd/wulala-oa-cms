<script setup lang="ts">
import { ref } from 'vue'

//离职列表数据;
const tableData = [
    {
        department: "市场部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '熊大',
        reason: '待遇不理想',
        phone: '18226588562',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        department: "技术部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '熊二',
        reason: '夫妻两地分居',
        phone: '18226588562',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        department: "客服部",
        entryDate: '2016-05-04',
        leaveDate: '2018-06-15',
        name: '张三',
        reason: '离家太远',
        phone: '18226588562',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        department: "财务部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '李四',
        reason: '工作压力太大',
        phone: '18226588562',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        department: "人事部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '王五',
        reason: '职业前景不理想',
        phone: '18226588562',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        department: "后勤部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '赵六',
        reason: '工作压力大',
        phone: '18226588562',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        department: "师资部",
        entryDate: '2016-05-03',
        leaveDate: '2019-05-03',
        name: '小七',
        reason: '待遇不理想',
        phone: '18226588562',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
]


interface User {
  date: string
  name: string
  address: string
}

//编辑按钮的点击事件;
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}

//删除按钮的点击事件;
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
</script>

<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
            <template #default="props">
                <div m="4">
                    <p m="t-0 b-2">State: {{ props.row.state }}</p>
                    <p m="t-0 b-2">City: {{ props.row.city }}</p>
                    <p m="t-0 b-2">Address: {{ props.row.address }}</p>
                    <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
                    <h3>家庭信息</h3>
                    <el-table :data="props.row.family">
                        <el-table-column label="Name" prop="name" />
                        <el-table-column label="State" prop="state" />
                        <el-table-column label="City" prop="city" />
                        <el-table-column label="Address" prop="address" />
                        <el-table-column label="Zip" prop="zip" />
                    </el-table>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="部门" prop="department" />
        <el-table-column label="姓名">
            <el-tag size="small">姓名</el-tag>
        </el-table-column>
        <el-table-column label="入职日期" sortable prop="entryDate" />
        <el-table-column label="离职日期" sortable prop="leaveDate" />
        <el-table-column label="离职原因" prop="reason" />
        <el-table-column label="操作">
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