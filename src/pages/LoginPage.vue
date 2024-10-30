<template>
  <div class="auth-page-container">
    <div class="auth-page-left">
      <!-- Login form -->
      <form class="login-form" @submit.prevent="login">
        <h2>Đăng nhập</h2>
        <!-- Email -->
        <label>Email</label>
        <input type="Email" v-model="email" />
        <!-- Password -->
        <label style="margin-top: 8px">Password</label>
        <input type="Password" v-model="password" />
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

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      console.log(this.email);
      console.log(this.password);
    },
    openRegisterPage() {
      router.push("/dang-ky");
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
