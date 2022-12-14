import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/index.scss";
import "element-plus/dist/index.css";
// import "default-passive-events";
import useEditorStore from "./store/editor";

const app = createApp(App);
app.use(router).use(store);
app.mount("#app");

(globalThis as any).$cpn = useEditorStore().componentMap;

// window.onbeforeunload = () => {
//   if (window.location.href.includes("editor")) {
//     return "确认要退出吗?";
//   }
//   return true;
// };
