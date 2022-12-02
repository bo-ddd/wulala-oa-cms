<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';

import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import customTranslate from './customTranslate/customTranslate'  // 汉化包引入
import { xmlStr } from './xmlStr'; // 流程图初始配置，编辑的话只需要相同格式的文件替换即可

const canvas = ref();
const bpmnModeler = ref();


const createNewDiagram = () => { // 将字符串转换成图显示出来
    bpmnModeler.value.importXML(xmlStr).then((info) => {
        if (info.error) {
            console.log(info.error);
        } else {
            success();
        }
    });
}

const init = () => {
    // 将汉化包包装成一个模块
    const customTranslateMolude = {
        translate: ['value', customTranslate]
    };
    bpmnModeler.value = new BpmnModeler({ // 建模
        container: canvas.value,
        propertiesPanel: { // 添加控制板
            parent: '#properties-panel'
        },
        additionalModules: [ // 右边的属性栏
            propertiesProviderModule,
            propertiesPanelModule,
            customTranslateMolude // 汉化模块
        ],
        moddleExtensions: {
            camunda: camundaModdleDescriptor
        }
    });
    createNewDiagram();
}
// 初始化流程图
onMounted(() => {
    init()
})

const success = () => {
    console.log('创建成功!');
    bpmnModeler.value.on('commandStack.changed', () => {
        getXML().then(xml => {
            console.log(xml);
        });
    });
}
const getXML = () => {
    return new Promise((resolve, reject) => {
        bpmnModeler.value.saveXML({ format: true }, (err, xml) => {
            err ? reject(err) : resolve(xml);
        });
    });
}
</script>

<template>
    <div class="containers">
        <div class="canvas" :ref="canvas"></div>
        <div id="properties-panel"></div>
    </div>
</template>

<style scoped>
.containers {
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
}

.canvas {
    width: 100%;
    height: 100%;
}

#properties-panel {
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
}
</style> -->