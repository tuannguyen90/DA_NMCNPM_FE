<template>
  <div class="chinh-sua-chien-dich-container">
    <!-- Create/Edit form -->
    <form @submit.prevent="onSubmit">
      <!-- Title -->
      <div class="chinh-sua-title">{{ titleProp }}</div>

      <!-- Save button -->
      <button v-if="titleProp !== 'Thêm mới'" class="save-btn" type="submit">
        Lưu chỉnh sửa
      </button>

      <!-- Tên chiến dịch -->
      <label for="ten-chien-dich">Tên chiến dịch:</label>
      <input type="text" id="ten-chien-dich" v-model="chienDich.ten" />

      <!-- Mô tả -->
      <label for="mo-ta">Mô tả:</label>
      <textarea id="mo-ta" rows="5" v-model="chienDich.noiDung"></textarea>

      <!-- Ngày bắt đầu -->
      <label for="ngay-bat-dau">Ngày bắt đầu:</label>
      <input type="date" v-model="chienDich.ngayBatDau" />

      <!-- Ngày kết thúc -->
      <label for="ngay-ket-thuc">Ngày kết thúc:</label>
      <input type="date" v-model="chienDich.ngayKetThuc" />

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

      <!-- Trạng thái -->
      <div v-if="titleProp !== 'Thêm mới'">
        <label for="trang-thai">Trạng thái:</label>
        <select id="trang-thai" v-model="chienDich.trangThai">
          <option value="0">Tạm dừng</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hủy</option>
          <option value="3">Đã hoàn tất</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
import ChienDichService from "@/services/ChienDichService";
import { formatDate } from "@/services/util_service";
import Swal from "sweetalert2";
export default {
  name: "ChinhSuaChienDich",
  props: ["chienDichProp", "titleProp"],
  data() {
    return {
      chienDich: {},
      title: "",
      taiKhoan: {},
    };
  },
  mounted() {
    this.title = `${this.titleProp}`;
    this.chienDich = JSON.parse(JSON.stringify(this.chienDichProp));
    this.chienDich.ngayBatDau = formatDate(this.chienDich.ngayBatDau);
    this.chienDich.ngayKetThuc = formatDate(this.chienDich.ngayKetThuc);
    this.taiKhoan = this.chienDich.taiKhoan;
  },
  watch: {
    chienDichProp(newValue) {
      this.chienDich = JSON.parse(JSON.stringify(newValue));
    },
    titleProp(newValue) {
      this.title = `${newValue}`;
    },
  },
  methods: {
    async onSubmit() {
      this.chienDich.taiKhoan = this.taiKhoan;
      this.chienDich.ngayBatDau = formatDate(this.chienDich.ngayBatDau);
      this.chienDich.ngayKetThuc = formatDate(this.chienDich.ngayKetThuc);
      try {
        const isSuccess = await ChienDichService.chinhSuaChienDich(
          this.chienDich
        );
        if (isSuccess) {
          Swal.fire({
            title: "Thông báo",
            text: "Chỉnh sửa chiến dịch thành công!",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$emit("ChinhSuaChienDichThanhCong");
            }
          });
        } else {
          Swal.fire({
            title: "Thông báo",
            text: "Đã có lỗi xảy ra!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        alert("Không thể chỉnh sửa khi chiến dịch đã hủy hoặc kết thúc.");
      }
    },
  },
};
</script>

<style scoped>
.chinh-sua-title {
  font-size: xx-large;
  font-weight: 700;
}
.chinh-sua-chien-dich-container {
  width: 100%;
  height: 100%;
  padding: 20px;
}
label {
  margin-top: 8px;
}
input {
  width: 100%;
}
.save-btn {
  margin-top: 16px;
}
</style>
