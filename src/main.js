import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueSignalR } from "@dreamonkey/vue-signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";

// Plugin
import UtilPlugin from "./plugins/utils";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(UtilPlugin);

// SignalR
const connection = new HubConnectionBuilder()
  .withUrl(`http://192.168.100.215:5133/notificationService`, {
    withCredentials: false,
  })
  .withAutomaticReconnect()
  .build();

app.use(VueSignalR, { connection });

app.mount("#app");
