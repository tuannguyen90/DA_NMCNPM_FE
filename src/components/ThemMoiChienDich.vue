<template>
  <div class="them-moi-chien-dich-container">
    <!-- Create/Edit form -->
    <form @submit.prevent="onSubmit">
      <!-- Title -->
      <div class="them-moi-chien-dich-title">Thêm mới</div>
      <button class="save-btn" type="submit">Thêm mới</button>

      <!-- Tên chiến dịch -->
      <label for="ten-chien-dich">Tên chiến dịch:</label>
      <input required type="text" id="ten-chien-dich" v-model="chienDich.ten" />

      <!-- Mô tả -->
      <label for="mo-ta">Mô tả:</label>
      <textarea
        required
        id="mo-ta"
        rows="5"
        v-model="chienDich.noiDung"
      ></textarea>

      <!-- Ngày bắt đầu -->
      <label for="ngay-bat-dau">Ngày bắt đầu:</label>
      <input required type="date" v-model="chienDich.ngayBatDau" />

      <!-- Ngày kết thúc -->
      <label for="ngay-ket-thuc">Ngày kết thúc:</label>
      <input required type="date" v-model="chienDich.ngayKetThuc" />

      <!-- Ngân sách dự kiến -->
      <label for="ngan-sach-du-kien">Ngân sách dự kiến (VND):</label>
      <input
        required
        type="number"
        id="ngan-sach-du-kien"
        v-model="chienDich.nganSachDuKien"
      />

      <!-- Tài khoản Ngân hàng -->
      <!-- Tên Ngân hàng -->
      <label for="ten-ngan-hang">Tên Ngân Hàng:</label>
      <input
        required
        type="text"
        id="ten-ngan-hang"
        v-model="taiKhoan.tenNganHang"
      />

      <!-- Tên chủ tài khoản -->
      <label for="ten-chu-tai-khoan">Tên chủ tài khoản:</label>
      <input
        required
        type="text"
        id="ten-chu-tai-khoan"
        v-model="taiKhoan.tenChuTaiKhoan"
      />

      <!-- Số tài khoản -->
      <label for="so-tai-khoan">Số tài khoản:</label>
      <input
        required
        type="text"
        id="so-tai-khoan"
        v-model="taiKhoan.soTaiKhoan"
      />

      <!-- SwiftCode -->
      <label for="swift-code">Swift Code</label>
      <input
        required
        type="text"
        id="swift-code"
        v-model="taiKhoan.swiftCode"
      />
    </form>
  </div>
</template>

<script>
import ChienDichService from "@/services/ChienDichService";
import Swal from "sweetalert2";

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
          Swal.fire({
            title: "Thông báo",
            text: "Thêm mới chiến dịch thành công!",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$emit("ThemMoiThanhCong");
            }
          });
        } else {
          Swal.fire({
            title: "Thông báo",
            text: "Đã xảy ra lỗi!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Thông báo",
          text: "Đã xảy ra lỗi, vui lòng kiểm tra lại thông tin đã nhập.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
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
