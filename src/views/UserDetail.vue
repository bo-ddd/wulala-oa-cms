


<template>
    <div>
        <el-page-header @click="backUserList()" title="返回" :icon="ArrowLeft">
            <template #content>
                <span class="page-header text-large font-700 mr-3"> 用户详情 </span>
            </template>
        </el-page-header>
    </div>
    <el-descriptions direction="horizontal" :column="2" size="large" border>
        <el-descriptions-item label="用户ID" align="center" width="150px">
            <div>{{ userInfoData.userId }}</div>
        </el-descriptions-item>
        <el-descriptions-item label="用户昵称" align="center" width="150px">
            <el-tag size="small"> {{ userInfoData.avatarName }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="用户职位" align="center">
            {{ showRoleName(userInfoData.roles) }}
        </el-descriptions-item>
        <el-descriptions-item label="任务进度" align="center">{{ }}</el-descriptions-item>
        <el-descriptions-item label="所在部门" align="center">{{ showDeptName(userInfoData.values) }}</el-descriptions-item>
        <el-descriptions-item label="联系方式" align="center">
            <el-tag size="small" type="success">{{ userInfoData.phoneNumber }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="详细地址" align="center">{{ userInfoData.address ? userInfoData.address : '该用户暂未填写地址'
        }}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
import { getUserDeptListApi, queryUserInfoApi } from '@/assets/api/api'
import { reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from '@element-plus/icons-vue'
import type { UserDetailData } from '@/types/UserDetail'
const route = useRoute();
const router = useRouter();
const backUserList = () => {
    router.push('userList')
}
const userInfoData = reactive({} as UserDetailData);
let id = route.query.id
const showRoleName = function (roleList: any) {
    if (!Array.isArray(roleList)) return;
    let str = '';
    roleList.forEach(item => {
        str += `${item.roleName},`
    })
    return str.substring(0, str.length - 1);
};
const showDeptName = function (deptList: any) {
    if (!Array.isArray(deptList)) return;
    let str = '';
    deptList.forEach(item => {
        str += `${item.deptName},`
    })
    return str.substring(0, str.length - 1);
};

let deptNameList = reactive([]);

(async () => {
    await getUserDeptListApi({
        userId: id
    }).then(async res => {
        if (res.status == 1) {
            let userData = (await queryUserInfoApi({ userId: id })).data
            deptNameList.values = res.data
            Object.assign(userData, deptNameList)
            Object.assign(userInfoData, userData)
        }
    })
})()
</script>

<style scoped>
:deep(.el-page-header) {
    padding: 20px 0;
}
</style>