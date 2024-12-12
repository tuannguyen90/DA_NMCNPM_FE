<template>
  <div class="auth-page-container">
    <div class="auth-page-left">
      <!-- Login form -->
      <form class="login-form" @submit.prevent="login">
        <h1 style="text-align: left; width: 100%">Đăng nhập</h1>
        <!-- Email -->
        <label style="margin-top: 24px; margin-bottom: 4px" for="email"
          >Email</label
        >
        <input id="email" type="email" v-model="email" required />
        <!-- Password -->
        <label for="mat-khau" style="margin-top: 8px; margin-bottom: 4px"
          >Mật khẩu
        </label>
        <div class="password-wrapper">
          <input
            id="mat-khau"
            :type="passwordFieldType"
            v-model="password"
            required
          />
          <span class="toggle-password" @click="togglePasswordVisibility">
            <span v-if="passwordFieldType === 'password'"
              ><i class="fa-solid fa-eye"></i
            ></span>
            <span v-else><i class="fa-solid fa-eye-slash"></i></span
          ></span>
        </div>

        <!-- Error message -->
        <div v-if="errorMsg" class="errorMsg">{{ errorMsg }}</div>
        <!-- Quên mật khẩu & Đăng nhập button -->
        <div
          style="
            margin-top: 24px;
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
        <!-- Truy cập không cần đăng nhập -->
        <span style="margin-top: 16px">
          <a href="#" @click.prevent="truyCapTrangChu"
            >Truy cập không cần đăng nhập</a
          >
        </span>
      </form>
    </div>
    <div class="auth-page-right">
      <img src="/images/login-background.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import router from "@/router";
import authService from "@/services/authService";
import { useUserStore } from "@/stores/user";
import { AnomynouseMenu } from "@/models/Constants";

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
  mounted() {
    const userStore = useUserStore();
    userStore.setEmail("");
    userStore.setTen("");
    userStore.setToken("");
    userStore.setUserId("");
    userStore.setUserType("");
    userStore.setStatus(-1);
    userStore.setMenu(AnomynouseMenu);
  },
  methods: {
    async login() {
      try {
        const result = await authService.loginAPI(this.email, this.password);
        if (result != null) {
          console.log(JSON.stringify(result));

          const userStore = useUserStore();
          userStore.setEmail(this.email);
          userStore.setToken(result.user_token);
          userStore.setUserId(result.user_id);
          userStore.setUserType(result.user_type);
          userStore.setStatus(result.status);
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
    truyCapTrangChu() {
      router.push("/trang-chu");
    },
  },
};
</script>

<style scoped>
.auth-page-container {
  flex: 1;
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.auth-page-left {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
}

.auth-page-right {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.auth-page-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.login-form {
  width: 300px;
  display: flex;
  flex-direction: column;
}

.errorMsg {
  color: red;
}

.password-wrapper {
  position: relative;
}

.password-wrapper input {
  width: 100%;
  padding-right: 2rem;
}

.password-wrapper .toggle-password {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
}

@media (max-width: 768px) {
  .auth-page-left {
    flex: 1 1 100%;
  }

  .auth-page-right {
    display: none;
  }
}
</style>
