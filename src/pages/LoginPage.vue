<template>
  <div class="auth-page-container">
    <div class="auth-page-left">
      <!-- Login form -->
      <form class="login-form" @submit.prevent="login">
        <h2>Đăng nhập</h2>
        <!-- Email -->
        <label for="email">Email</label>
        <input type="email" v-model="email" />
        <!-- Password -->
        <label style="margin-top: 8px"
          >Mật khẩu
          <a
            href="#"
            style="font-size: small"
            @click="togglePasswordVisibility"
            class="toggle-password"
            >{{ passwordFieldType === "password" ? "(Hiển thị)" : "(Ẩn)" }}</a
          >
        </label>
        <input :type="passwordFieldType" v-model="password" />
        <!-- Error message -->
        <div v-if="errorMsg" class="errorMsg">{{ errorMsg }}</div>
        <!-- Quên mật khẩu & Đăng nhập button -->
        <div
          style="
            margin-top: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <a href="#" @click.prevent="">Quên mật khẩu</a>
          <button type="submit">Đăng nhập</button>
        </div>
        <!-- Đăng ký -->
        <hr />
        <span
          >Chưa có tài khoản?
          <a href="#" @click.prevent="openRegisterPage">Đăng ký</a></span
        >
      </form>
    </div>
    <div
      class="auth-page-right"
      style="
        background-image: url('/src/assets/imgs/login-background.jpg');
        background-repeat: no-repeat;
        background-size: 100% 100%;
      "
    ></div>
  </div>
</template>

<script>
import router from "@/router";
import authService from "@/services/authService";
import { useUserStore } from "@/stores/user";

import {
  NguoiDongGopMenu,
  NguoiNhanHoTroMenu,
  ToChucTuThienMenu,
  QuanTriHeThongMenu,
} from "@/models/Constants";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
      passwordFieldType: "password",
    };
  },
  methods: {
    async login() {
      try {
        const result = await authService.loginAPI(this.email, this.password);
        if (result != null) {
          const userStore = useUserStore();
          userStore.setToken(result.user_token);
          userStore.setUserId(result.user_id);
          userStore.setUserType(result.user_type);
          switch (result.user_type) {
            case 0:
              userStore.setMenu(QuanTriHeThongMenu);
              break;
            case 1:
              userStore.setMenu(NguoiDongGopMenu);
              break;
            case 2:
              userStore.setMenu(NguoiNhanHoTroMenu);
              break;
            case 3:
              userStore.setMenu(ToChucTuThienMenu);
              break;
          }
          router.push("/theo-doi-bao-cao");
        } else {
          this.errorMsg = "Vui lòng kiểm tra lại email, mật khẩu 1.";
        }
      } catch (err) {
        this.errorMsg = "Vui lòng kiểm tra lại email, mật khẩu 2.";
        console.log(`error 2: ${err}`);
      }
    },
    openRegisterPage() {
      router.push("/dang-ky");
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 300px;
  display: flex;
  flex-direction: column;
}
</style>
