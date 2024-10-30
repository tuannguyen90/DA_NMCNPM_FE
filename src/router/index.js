import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/dang-nhap",
      name: "LoginPage",
      component: LoginPage,
    },
    {
      path: "/dang-ky",
      name: "RegisterPage",
      component: RegisterPage,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.path == "/") {
    next({ name: "LoginPage" });
  }
  next();
});

export default router;
