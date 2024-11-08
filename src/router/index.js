import { createRouter, createWebHistory } from "vue-router";

import HomeLayout from "@/components/HomeLayout.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import TheoDoiBaoCaoPage from "@/pages/TheoDoiBaoCaoPage.vue";
import QuanLyChienDichPage from "@/pages/QuanLyChienDichPage.vue";
import XacThucGiayPhepPage from "@/pages/XacThucGiayPhepPage.vue";

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
    {
      path: "/trang-chu",
      name: "HomeLayout",
      component: HomeLayout,
    },
    {
      path: "/theo-doi-bao-cao",
      name: "TheoDoiBaoCaoPage",
      component: TheoDoiBaoCaoPage,
    },
    {
      path: "/quan-ly-chien-dich",
      name: "QuanLyChienDichPage",
      component: QuanLyChienDichPage,
    },
    {
      path: "/xac-thuc-giay-phep",
      name: "XacThucGiayPhepPage",
      component: XacThucGiayPhepPage,
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
