import "./assets/css/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueSignalR } from "@dreamonkey/vue-signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// SignalR
const connection = new HubConnectionBuilder()
  .withUrl(`http://159.223.62.214:5133/notificationService`, {
    withCredentials: false,
  })
  .withAutomaticReconnect()
  .build();

app.use(VueSignalR, { connection });

app.mount("#app");
