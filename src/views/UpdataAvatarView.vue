<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router';
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus'
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
import { ArrowLeft } from '@element-plus/icons-vue';

console.log(VueCropper)

const router = useRouter()
function to(name: string) {
    router.push(name)
}

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

interface Option {
    img: string,
    size: number,
    outputType: string,
    fixedNumber: number[]
}

//控制文件列表
const fileList = ref<UploadUserFile[]>([
    {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    }
])



// img: '/src/assets/images/OIP-C.png',
//  const changeImg:Ref=ref('')
let selectedImg:Ref = ref(fileList)
console.log(fileList)
const option: Option = {
    img: selectedImg.value[0].url,
    size: 1,
    outputType: 'png',
    fixedNumber: [1, 1]
}


//图片移动事件
function imgMoving(data) {
    //获取图片距离外边框的尺寸
    console.log(data)

}

//裁剪框移动事件
function cropMoving(data) {
    //获取裁剪框的距离外边框的距离
    console.log(data)
}
//裁剪框尺寸改变事件
function changeCropSize(data) {
    //获取裁剪框的尺寸
    console.log(data)
}


//返回图片加载的状态，success/error
function imgLoad(data) {
    console.log(data)
}


//realTime实时预览事件
const previewHtml: Ref = ref('')
const previewRadius: Ref = ref('')
function realTime(obj) {
    previewRadius.value = obj.w;
    previewHtml.value = obj.html
}


//控制进度条
const active: Ref = ref(0)

</script>

<template>

    <el-page-header :icon="ArrowLeft" title="返回" @back="to('mine')">
        <template #content>
            <span class="text-large font-600 mr-3"> 更换头像 </span>
        </template>
    </el-page-header>

    <div class="mt-20">
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="选择图片" />
            <el-step title="裁剪图片" />
            <el-step title="上传图片" />
        </el-steps>

        <div class="flex-center mt-20">

            <!-- 裁剪框 -->
            <div class="cropper ">
                <vueCropper ref="cropper" @img-moving="imgMoving" @crop-moving="cropMoving"
                    @change-crop-size="changeCropSize" @img-load="imgLoad" @real-time="realTime" info canScale autoCrop
                    canMoveBox fixed fixedBox centerBox :fixedNumber="option.fixedNumber" :img="option.img"
                    :outputSize="option.size" :outputType="option.outputType">
                </vueCropper>
            </div>
            <!-- 预览图 -->
            <div v-html="previewHtml" class="preview"></div>
        </div>


        <el-upload ref="upload" v-model:file-list="fileList" class="upload-demo mt-20"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type='picture' :limit="1"
            :on-exceed="handleExceed" :auto-upload="false">
            <template #trigger>
                <el-button type="primary">选择图片</el-button>
            </template>
            <el-button class="ml-10" type="success" @click="submitUpload">
                上传头像
            </el-button>
            <template #tip>
                <div class="el-upload__tip text-red">
                    limit 1 file, new file will cover the old file
                </div>
            </template>
            <template #file>
                <img :src="fileList[0].url">
            </template>

        </el-upload>
    </div>
</template>

<style scoped>
.cropper {
    width: 400px;
    height: 400px;

}

.flex-center {
    display: flex;
    align-items: center;
    gap: 20px;
}

.preview {
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid black
}
</style>