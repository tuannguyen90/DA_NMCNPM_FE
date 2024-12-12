<template>
  <div class="trang-thai-chien-dich-container" :class="getClassByTrangThai()">
    <span v-if="TrangThai == 0">Tạm dừng</span>
    <span v-if="TrangThai == 1">Đang hoạt động</span>
    <span v-if="TrangThai == 2">Đã hủy</span>
    <span v-if="TrangThai == 3">Đã hoàn thành</span>
  </div>
</template>

<script>
export default {
  name: "TrangThaiChienDich",
  props: ["TrangThai"],
  methods: {
    getClassByTrangThai() {
      switch (this.TrangThai) {
        case 0:
          return "chua-bat-dau";
        case 1:
          return "dang-hoat-dong";
        case 2:
          return "da-huy";
        case 3:
          return "da-hoan-thanh";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.trang-thai-chien-dich-container {
  height: 100%;
  padding: 4px 16px;
  border-radius: 16px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chua-bat-dau {
  background-color: #d3d3d3;
}

.dang-hoat-dong {
  background-color: #28a745;
}

.da-huy {
  background-color: #dc3545;
}

.da-hoan-thanh {
  background-color: #007bff;
}
</style>
