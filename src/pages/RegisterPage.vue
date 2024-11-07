<template>
  <div class="auth-page-container">
    <div class="auth-page-left">
      <!-- Login form -->
      <form v-if="!isVerifyingOTP" @submit.prevent="dangKy">
        <h2>Đăng ký</h2>
        <!-- Name -->
        <label for="name" style="margin-top: 16px">Tên</label>
        <input id="name" type="name" v-model="ten" />
        <!-- Email -->
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
        <!-- Password -->
        <label for="mat-khau"
          >Mật khẩu
          <a
            href="#"
            style="font-size: small"
            @click="togglePasswordVisibility"
            class="toggle-password"
            >{{ passwordFieldType === "password" ? "(Hiển thị)" : "(Ẩn)" }}</a
          ></label
        >
        <input id="mat-khau" :type="passwordFieldType" v-model="password" />
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
        <input type="text" v-model="otp" />
        <!-- Xác thực Button -->
        <div class="register-btns-container">
          <button type="submit">Xác thực</button>
        </div>
      </form>
      <!-- Error message -->
      <p v-if="errorMessage" class="errorMsg">{{ errorMessage }}</p>
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
import { useUserStore } from "@/stores/user";
import authService from "@/services/authService";

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
    },
    async xacThucOTP() {
      var isSuccess = await authService.verifyOTP(this.otp, this.soDienThoai);
      if (isSuccess) {
        router.push("/dang-nhap");
      } else {
        this.errorMessage = "Mã xác thực không chính xác";
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style scoped>
label {
  margin-top: 8px;
}

.register-btns-container {
  margin-top: 8px;
  display: flex;
  justify-content: start;
}
</style>
