<template>
  <div class="auth-page-container">
    <div class="auth-page-left">
      <!-- Login form -->
      <form class="login-form" @submit.prevent="dangKy">
        <h2>Đăng ký</h2>
        <!-- Name -->
        <label for="name" style="margin-top: 16px">Tên</label>
        <input type="name" v-model="ten" />
        <!-- Email -->
        <label for="email">Email</label>
        <input type="email" v-model="email" />
        <!-- Password -->
        <label
          >Mật khẩu
          <a
            href="#"
            style="font-size: small"
            @click="togglePasswordVisibility"
            class="toggle-password"
            >{{ passwordFieldType === "password" ? "(Hiển thị)" : "(Ẩn)" }}</a
          ></label
        >
        <input :type="passwordFieldType" v-model="password" />
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
        <input type="tel" v-model="soDienThoai" />
        <!-- OTP verify -->
        <label>Xác thực OTP</label>
        <input type="text" v-model="otp" />
        <!-- Gửi OTP button & Đăng ký button -->
        <div class="register-btns-container">
          <button @click.prevent="">Gửi mã OTP</button>
          <button type="submit">Đăng ký</button>
        </div>
      </form>
      <!-- Error message -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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
    };
  },
  methods: {
    async dangKy() {
      console.log(this.ten);
      console.log(this.email);
      console.log(this.password);
      console.log(this.soDienThoai);
      console.log(this.otp);
      console.log(this.loaiNguoiDung);
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
  justify-content: space-between;
}
</style>
