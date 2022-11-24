<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, shallowRef,toRefs  } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

let props = defineProps<{
  modelValue : string
}>();
let prop = toRefs(props);
let emit = defineEmits(['update:modelValue'])
const emits = function(){
  emit('update:modelValue',prop.modelValue)
}

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    
    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //     setTimeout(() => {
    //         valueHtml.value = `<p>日报内容</p>`
    //     }, 1500)
    // });

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor : any) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    
    let mode = 'default'
    const handleChange = (editor:any) => { 
      emit('update:modelValue',editor.children[0].children[0].text)
    }
</script>  

<template>
    <div id="editor-wrapper" style="border: 1px solid #ccc">

     <div id="toolbar-container">

      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />

     </div>

      <div id="editor-container">

        <Editor
        style="height: 500px; overflow-y: hidden;"
        :value="prop.modelValue"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onChange="handleChange"
        @onCreated="handleCreated"
        @change="handleChange(prop.modelValue)"
      />

      </div>

    </div>

</template>

