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
        const token = await authService.loginAPI(this.email, this.password);
        if (token != null) {
          const userStore = useUserStore();
          userStore.setToken(token);
          router.push("/trang-chu");
        } else {
          this.errorMsg = "Vui lòng kiểm tra lại email, mật khẩu.";
        }
      } catch (err) {
        this.errorMsg = "Vui lòng kiểm tra lại email, mật khẩu.";
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
