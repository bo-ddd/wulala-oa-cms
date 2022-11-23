<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router';
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue';

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
    active.value=3
}

//图片剪裁区域
const cropper: Ref = ref('');

interface Option {
    img: string,
    size: number,
    outputType: string,
    fixedNumber: number[]
}

const option: Option = reactive({
    // 默认在裁剪框中呈现的图片
    img: "https://img0.baidu.com/it/u=3396602011,1979079210&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
    size: 1,
    outputType: 'png',
    fixedNumber: [1, 1]
})


//控制进度条
const active: Ref = ref(0)

//选择图片按钮与裁剪框建立链接;
const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {

    imgToBase64(uploadFile.url as string).then(res => {
        option.img = res as string;
    })
    active.value=1
}


//img转base64方法：
function imgToBase64(url: string, outputFormat?: string | null) {
    return new Promise((resolve, reject) => {
        let canvas: HTMLCanvasElement | null = document.createElement('canvas');
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        const img = new Image;
        img.src = url;
        img.crossOrigin = 'Anonymous'; //解决Canvas.toDataURL 图片跨域问题
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // 压缩比例 -- 可以自己修改参数。500px宽度以下原尺寸，大于500px比例处理
            let bili = Math.round(width / 500) || 1;
            let rate = 1 / bili;
            canvas!.width = width * rate;
            canvas!.height = height * rate;
            ctx!.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
            let dataURL: string = canvas!.toDataURL(outputFormat || 'image/jpeg');
            // 去除标头 -- 传递给后台时一般去除头部
            // let reg = new RegExp('^data:image/[^;]+;base64,');
            // dataURL = dataURL.replace(reg, '');
            canvas = null;
            resolve(dataURL);
        }
        img.src = url;
    })
};


//realTime实时预览事件
const previewHtml: Ref = ref('')
const previewRadius: Ref = ref('')
function realTime(obj:any) {
    previewRadius.value = obj.w;
    previewHtml.value = obj.html
}
</script>

<template>

    <el-page-header :icon="ArrowLeft" title="返回" @back="to('mine')">
        <template #content>
            <span class="text-large font-600 mr-3"> 更换头像 </span>
        </template>
    </el-page-header>

    <!-- 进度条 -->
    <div class="mt-20">
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="选择图片" />
            <el-step title="裁剪图片" />
            <el-step title="上传图片" />
        </el-steps>

        <div class="flex-center mt-20">

            <!-- 裁剪框 -->
            <div class="cropper " v-if="option.img">
                <vueCropper ref="cropper" @real-time="realTime" info canScale autoCrop
                    canMoveBox fixed fixedBox centerBox :fixedNumber="option.fixedNumber" :img="option.img"
                    :outputSize="option.size" :outputType="option.outputType">
                </vueCropper>
            </div>
            <!-- 预览图 -->
            <div class="flex-column ml-30">
                <h4>头像预览</h4>
                <div v-html="previewHtml" class="preview"></div>
            </div>
            
        </div>

        <el-upload ref="upload" class="upload-demo mt-20"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type='picture'
            :show-file-list="false" :limit="1" :on-exceed="handleExceed" :auto-upload="false" :on-change="handleChange">
            <template #trigger>
                <el-button type="primary">选择图片</el-button>
            </template> 
            <el-button class="ml-10" type="success" @click="submitUpload">
                上传头像
            </el-button>   
            <template #tip>
                <div class="el-upload__tip text-red">
                    温馨提示：仅支持jpg、jpeg、png格式，大小不超过2M
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

.flex-center {
    display: flex;
    align-items: center;
    gap: 20px;
}

.flex-column{
    display: flex;
    align-items:center;
    flex-direction:column;
    gap:20px;
}

.preview {
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid black
}
</style>