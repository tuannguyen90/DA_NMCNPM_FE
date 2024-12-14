<template>
  <div class="auth-page-container">
    <div class="auth-page-left">
      <!-- Login form -->
      <form v-if="!isVerifyingOTP" @submit.prevent="dangKy">
        <h1 style="text-align: left; width: 100%">Đăng ký</h1>
        <!-- Name -->
        <label for="name" style="margin-top: 16px">Tên</label>
        <input id="name" type="name" v-model="ten" />
        <!-- Email -->
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
        <!-- Password -->
        <label for="mat-khau">Mật khẩu </label>
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
        <!-- Role -->
        <label>Vai trò</label>
        <select
          name="LoaiNguoiDung"
          id=""
          style="width: 100%"
          v-model="loaiNguoiDung"
        >
          <option value="ToChucTuThien">Tổ chức từ thiện</option>
          <option value="NguoiNhanHoTro">Người nhận hỗ trợ</option>
          <option value="NguoiDongGop">Người đóng góp</option>
        </select>
        <!-- Phone number -->
        <label for="tel">Số điện thoại</label>
        <input id="tel" type="tel" v-model="soDienThoai" />
        <!-- Error message -->
        <span class="errorMessage" v-if="errorMessage">{{ errorMessage }}</span>
        <!-- Đăng ký Button -->
        <div class="register-btns-container">
          <button type="submit">Đăng ký</button>
        </div>
      </form>

      <!-- Verifying OTP form -->
      <form v-if="isVerifyingOTP" @submit.prevent="xacThucOTP">
        <h2>Đăng ký</h2>
        <p>Mã xác nhận đã được gửi đến số điện thoại {{ soDienThoai }}.</p>
        <!-- OTP verify -->
        <label>Xác thực OTP</label>
        <input type="text" v-model="otp" style="margin-top: 8px" />
        <!-- Error message -->
        <span class="errorMessage" v-if="errorMessage">{{ errorMessage }}</span>
        <!-- Xác thực Button -->
        <div class="register-btns-container">
          <button type="submit">Xác thực</button>
        </div>
      </form>
    </div>
    <div class="auth-page-right">
      <img src="/images/login-background.jpg" alt="" />
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { useUserStore } from "@/stores/user";
import authService from "@/services/authService";

import Swal from "sweetalert2";

export default {
  name: "RegisterPage",
  data() {
    return {
      ten: "",
      email: "",
      password: "",
      loaiNguoiDung: "ToChucTuThien",
      soDienThoai: "",
      otp: "",
      passwordFieldType: "password",
      errorMessage: "",
      isVerifyingOTP: false,
    };
  },
  methods: {
    async dangKy() {
      // reset
      this.errorMessage = "";
      // loại người dùng
      var loaiNguoiDung = 0;
      switch (this.loaiNguoiDung) {
        case "ToChucTuThien":
          loaiNguoiDung = 3;
          break;
        case "NguoiNhanHoTro":
          loaiNguoiDung = 2;
          break;
        case "NguoiDongGop":
          loaiNguoiDung = 1;
          break;
      }

      this.soDienThoai = this.formatPhoneNumber(this.soDienThoai);

      try {
        var token = await authService.registerAPI(
          this.email,
          this.password,
          this.ten,
          "",
          this.soDienThoai,
          loaiNguoiDung
        );

        if (token != null) {
          // Lưu token vao store
          const userStore = useUserStore();
          userStore.setToken(token);

          // Chuyển sang verify OTP
          this.isVerifyingOTP = true;
        }
      } catch (error) {
        console.log(`${error}`);

        if (String(error).includes("Invalid parameter")) {
          this.errorMessage = "Số điện thoại không hợp lệ";
        } else {
          this.errorMessage = `Vui lòng kiểm tra lại các thông tin đã nhập. ${error}`;
        }
      }
    },
    async xacThucOTP() {
      try {
        var isSuccess = await authService.verifyOTP(this.otp, this.soDienThoai);
        if (isSuccess) {
          Swal.fire({
            title: "Thông báo",
            text: "Bạn đã đăng ký tài khoản thành công!",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/dang-nhap");
            }
          });
        } else {
          this.errorMessage = "Mã xác thực không chính xác";
        }
      } catch (error) {
        this.errorMessage = "Mã xác thực không chính xác";
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    formatPhoneNumber(phoneNumber) {
      if (phoneNumber.startsWith("0")) {
        return "+84" + phoneNumber.slice(1);
      } else {
        return phoneNumber;
      }
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

label {
  margin-top: 8px;
}

input {
  width: 100%;
}

.register-btns-container {
  margin-top: 8px;
  display: flex;
  justify-content: start;
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

.errorMessage {
  font-size: medium;
  color: red;
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
