import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import TheoDoiBaoCaoPage from "@/pages/TheoDoiBaoCaoPage.vue";
import QuanLyChienDichPage from "@/pages/QuanLyChienDichPage.vue";
import XacThucGiayPhepPage from "@/pages/XacThucGiayPhepPage.vue";
import DongGopPage from "@/pages/DongGopPage.vue";
import MapsPage from "@/pages/MapsPage.vue";
import QuanLyBanTinPage from "@/pages/QuanLyBanTinPage.vue";
import BanTinPage from "@/pages/BanTinPage.vue";
import QuanLyGiayPhepPage from "@/pages/QuanLyGiayPhepPage.vue";
import XinTaiTroPage from "@/pages/XinTaiTroPage.vue";

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
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/theo-doi-bao-cao",
      name: "TheoDoiBaoCaoPage",
      component: TheoDoiBaoCaoPage,
    },
    {
      path: "/dong-gop",
      name: "DongGopPage",
      component: DongGopPage,
    },
    {
      path: "/quan-ly-chien-dich",
      name: "QuanLyChienDichPage",
      component: QuanLyChienDichPage,
    },
    {
      path: "/ban-do",
      name: "MapsPage",
      component: MapsPage,
    },
    {
      path: "/xac-thuc-giay-phep",
      name: "XacThucGiayPhepPage",
      component: XacThucGiayPhepPage,
    },
    {
      path: "/quan-ly-ban-tin",
      name: "QuanLyBanTinPage",
      component: QuanLyBanTinPage,
    },
    {
      path: "/ban-tin",
      name: "BanTinPage",
      component: BanTinPage,
    },
    {
      path: "/quan-ly-giay-phep",
      name: "QuanLyGiayPhepPage",
      component: QuanLyGiayPhepPage,
    },
    {
      path: "/xin-tai-tro",
      name: "XinTaiTroPage",
      component: XinTaiTroPage,
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
