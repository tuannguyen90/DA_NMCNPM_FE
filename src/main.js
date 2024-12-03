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
  .withUrl(`${import.meta.env.VITE_SIGNALR_DOMAIN}/notificationService`, {
    withCredentials: false,
  })
  .withAutomaticReconnect()
  .build();

app.use(VueSignalR, { connection });

app.mount("#app");
