<template>
  <div class="them-moi-chien-dich-container">
    <!-- Create/Edit form -->
    <form @submit.prevent="onSubmit">
      <!-- Title -->
      <div class="them-moi-chien-dich-title">Thêm mới</div>
      <button class="save-btn" type="submit">Thêm mới</button>

      <!-- Tên chiến dịch -->
      <label for="ten-chien-dich">Tên chiến dịch:</label>
      <input type="text" id="ten-chien-dich" v-model="chienDich.ten" />

      <!-- Mô tả -->
      <label for="mo-ta">Mô tả:</label>
      <textarea id="mo-ta" rows="5" v-model="chienDich.noiDung"></textarea>

      <!-- Ngày bắt đầu -->
      <label for="ngay-bat-dau">Ngày bắt đầu:</label>
      <input type="text" v-model="chienDich.ngayBatDau" />

      <!-- Ngày kết thúc -->
      <label for="ngay-ket-thuc">Ngày kết thúc:</label>
      <input type="text" v-model="chienDich.ngayKetThuc" />

      <!-- Ngân sách dự kiến -->
      <label for="ngan-sach-du-kien">Ngân sách dự kiến (VND):</label>
      <input
        type="number"
        id="ngan-sach-du-kien"
        v-model="chienDich.nganSachDuKien"
      />

      <!-- Tài khoản Ngân hàng -->
      <!-- Tên Ngân hàng -->
      <label for="ten-ngan-hang">Tên Ngân Hàng:</label>
      <input type="text" id="ten-ngan-hang" v-model="taiKhoan.tenNganHang" />

      <!-- Tên chủ tài khoản -->
      <label for="ten-chu-tai-khoan">Tên chủ tài khoản:</label>
      <input
        type="text"
        id="ten-chu-tai-khoan"
        v-model="taiKhoan.tenChuTaiKhoan"
      />

      <!-- Số tài khoản -->
      <label for="so-tai-khoan">Số tài khoản:</label>
      <input type="text" id="so-tai-khoan" v-model="taiKhoan.soTaiKhoan" />

      <!-- SwiftCode -->
      <label for="swift-code">Swift Code</label>
      <input type="text" id="swift-code" v-model="taiKhoan.swiftCode" />
    </form>
  </div>
</template>

<script>
import ChienDichService from "@/services/ChienDichService";

export default {
  name: "ThemMoiChienDich",
  data() {
    return {
      chienDich: {},
      taiKhoan: {},
    };
  },
  methods: {
    async onSubmit() {
      this.chienDich.taiKhoan = this.taiKhoan;

      try {
        const isSuccess = await ChienDichService.themMoiChienDich(
          this.chienDich
        );
        if (isSuccess) {
          alert("Thêm mới thành công!");
          this.$emit("ThemMoiThanhCong");
        } else {
          alert("Thêm mới thất bại.");
        }
      } catch (error) {}
    },
  },
};
</script>

<style scoped>
.them-moi-chien-dich-title {
  font-size: xx-large;
  font-weight: 700;
}
.them-moi-chien-dich-container {
  height: 80%;
  width: 80%;
  background-color: white;
  padding: 20px;
  overflow-y: scroll;
}
</style>
