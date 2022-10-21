<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';


//点击按钮上传功能
const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}

const submitUpload = () => {
    upload.value!.submit()
}

//图片剪裁区域

const cropper: Ref = ref('');

const option = {
    img: null,
    size: 1,
    outputType: 'png'
}


</script>

<template>

    <div>
        <div class="cropper">
            <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType">
            </vueCropper>
        </div>
        <el-upload ref="upload" class="upload-demo"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1" :on-exceed="handleExceed"
            :auto-upload="false">
            <template #trigger>
                <el-button type="primary">选择图片</el-button>
            </template>
            <el-button class="ml-3" type="success" @click="submitUpload">
                上传头像
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    limit 1 file, new file will cover the old file
                </div>
            </template>
        </el-upload>
    </div>
</template>

<style scoped>
.cropper {
    width: 100px;
    height: 100px;
}
</style>