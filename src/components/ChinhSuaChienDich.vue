<template>
  <div class="chinh-sua-chien-dich-container">
    <!-- Create/Edit form -->
    <form @submit.prevent="onSubmit">
      <!-- Title -->
      <div class="chinh-sua-title">{{ title }}</div>

      <!-- Save button -->
      <button v-if="titleProp !== 'Thêm mới'" class="save-btn" type="submit">
        Lưu chỉnh sửa
      </button>

      <button v-if="titleProp === 'Thêm mới'" class="save-btn" type="submit">
        Thêm mới
      </button>

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

      <!-- Trạng thái -->
      <div v-if="titleProp !== 'Thêm mới'">
        <label for="trang-thai">Trạng thái:</label>
        <select id="trang-thai">
          <option value="0">Tạo mới</option>
          <option value="1">Đang hoạt động</option>
          <option value="2">Đã hủy</option>
          <option value="3">Đã hoàn tất</option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
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
    this.chienDich = JSON.parse(JSON.stringify(this.chienDichProp));
    this.title = `${this.titleProp}`;
    if (this.titleProp !== "Thêm mới") {
      this.taiKhoan = this.chienDich.taiKhoan;
    }
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
      if (this.title === "Thêm mới") {
        this.themMoiChienDich();
      } else {
        this.chinhSuaChienDich();
      }
    },
    async themMoiChienDich() {
      this.chienDich.taiKhoan = this.taiKhoan;
      console.log(JSON.stringify(this.chienDich));
      this.$emit("themMoiChienDich", this.chienDich);
    },
    async chinhSuaChienDich() {},
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
