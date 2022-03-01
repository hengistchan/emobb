import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/index.scss";
import "element-plus/dist/index.css";
import "default-passive-events";
import useEditorStore from "./store/editor";
import { Icon } from "@iconify/vue";

const app = createApp(App);
app.use(router).use(store);
app.mount("#app");

(globalThis as any).$cpn = useEditorStore().componentMap;
