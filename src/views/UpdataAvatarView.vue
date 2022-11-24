<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import type { UploadInstance, UploadProps} from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import axios from '../assets/api/api'

const router = useRouter()
function to(name: string) {
    router.push(name)
}



const submitUpload = () => {
    if(!upload.value) return
    axios.updateUserInfoApi({

    })
}

//上传附件;
const upload = ref('');
const handleSuccessUpload: UploadProps['onSuccess'] = (response) => {
    upload.value = response.data.url
}
//校验上传文件大小;
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 1) {
        ElMessage.error('文件大小不能超过 1MB!')
        return false
    }
    return true
}

</script>

<template>

    <el-page-header :icon="ArrowLeft" title="返回" @back="to('mine')">
        <template #content>
            <span class="text-large font-600 mr-3"> 更换头像 </span>
        </template>
    </el-page-header>

    <div class="mt-20">
        <el-upload class="avatar-uploader" action="/api/upload/enclosure" :before-upload="beforeAvatarUpload"
            :on-success="handleSuccessUpload">
            <img v-if="upload" :src="upload" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
            <template #tip>
                <div class="el-upload__tip">
                    jpg/png 格式文件不能超过 1M
                </div>
            </template>
        </el-upload>
    </div>

    <div class="mt-20">
        <el-button type="danger" @click="submitUpload">上传头像</el-button>
    </div>
</template>

<style scoped>
.position-btn {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.avatar-uploader .avatar {
  width: 200px;
  height: 200px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>