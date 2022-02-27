import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./styles/index.scss";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(store);
app.mount("#app");
