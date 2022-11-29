import { createApp } from "vue";
import { createPinia } from "pinia";
import App from './App.vue';
import router from "./router";
import 'element-plus/dist/index.css';
import "./assets/main.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import elementPlus from 'element-plus';
// import { ElMessage, ElMessageBox, ElTree } from 'element-plus';


const app = createApp(App);
app.use(createPinia());
app.use(elementPlus);
app.use(router);
// app.use(ElMessage);
// app.use(ElMessageBox);
// app.use(ElTree);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
};

app.mount("#app");
