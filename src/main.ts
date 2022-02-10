import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/index.scss";
import "virtual:windi.css";
import "virtual:windi-devtools";

const app = createApp(App);
app.use(router).use(store);
app.mount("#app");
