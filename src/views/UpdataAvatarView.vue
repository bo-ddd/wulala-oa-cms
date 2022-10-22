<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
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

interface Option {
    img: string,
    size: number,
    outputType: string,
    fixedNumber: number[]
}

const option: Option = {
    img: '/src/assets/images/OIP-C.png',
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
const previewHtml:Ref=ref('')
const previewRadius:Ref=ref('')
function realTime(obj) {
    previewRadius.value=obj.w;
    previewHtml.value=obj.html
}




const active:Ref = ref(0)

</script>

<template>
    

    <div>
        <el-steps :active="active" finish-status="success"  align-center>
          <el-step title="" />    
          <el-step title="Step 2" />
          <el-step title="Step 3" />
        </el-steps>
        
        <div class="flex-center">

        <!-- 裁剪框 -->
        <div class="cropper">
            <vueCropper ref="cropper" 
            @img-moving="imgMoving" 
            @crop-moving="cropMoving"
            @change-crop-size="changeCropSize" 
            @img-load="imgLoad" 
            @real-time="realTime"
            info
            canScale 
            autoCrop
            canMoveBox 
            fixed
            fixedBox
            centerBox
            :fixedNumber="option.fixedNumber" 
            :img="option.img" 
            :outputSize="option.size"
            :outputType="option.outputType">
            </vueCropper>
        </div>
        <!-- 预览图 -->
            <div v-html="previewHtml" class="preview"></div>
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
    width: 400px;
    height: 400px;

}
.flex-center{
    display: flex;
    align-items: center;
    gap:20px;
}
.preview{
    border-radius:50%;
    overflow: hidden;
    border:1px solid  bisque
}
</style>