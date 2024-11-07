<template>
  <div class="chinh-sua-chien-dich-container">
    <!-- Create/Edit form -->
    <form @submit.prevent="updateChienDich">
      <!-- Title -->
      <div class="chinh-sua-title">{{ title }}</div>

      <!-- Save button -->
      <button class="save-btn" type="submit">Lưu chỉnh sửa</button>

      <!-- Tên chiến dịch -->
      <label for="ten-chien-dich">Tên chiến dịch:</label>
      <input type="text" id="ten-chien-dich" v-model="chienDich.ten" />

      <!-- Tổ chức từ thiện -->
      <label for="to-chuc-tu-thien">Tổ chức từ thiện:</label>
      <input type="text" id="to-chuc-tu-thien" v-model="chienDich.idToChuc" />

      <!-- Mô tả -->
      <label for="mo-ta">Mô tả:</label>
      <textarea id="mo-ta" rows="5" v-model="chienDich.noiDung"></textarea>

      <!-- Ngày bắt đầu -->
      <label for="ngay-bat-dau">Ngày bắt đầu:</label>
      <input type="datetime-local" v-model="chienDich.ngayBatDau" />

      <!-- Ngày kết thúc -->
      <label for="ngay-ket-thuc">Ngày kết thúc:</label>
      <input type="datetime-local" v-model="chienDich.ngayKetThuc" />

      <!-- Ngân sách dự kiến -->
      <label for="ngan-sach-du-kien">Ngân sách dự kiến (VND):</label>
      <input
        type="number"
        id="ngan-sach-du-kien"
        v-model="chienDich.nganSachDuKien"
      />

      <!-- Thực thu -->
      <label for="thuc-thu">Thực thu (VND):</label>
      <input type="number" id="thuc-thu" v-model="chienDich.thucThu" />

      <!-- Trạng thái -->
      <label for="trang-thai">Trạng thái:</label>
      <input type="text" id="trang-thai" v-model="chienDich.trangThai" />
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
    };
  },
  mounted() {
    this.chienDich = JSON.parse(JSON.stringify(this.chienDichProp));
    this.title = `${this.titleProp}`;
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
    async updateChienDich() {
      // gọi api
      // thông báo kết quả
      alert("Lưu chiến dịch thành công!");
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
