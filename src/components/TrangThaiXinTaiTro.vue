<template>
  <div class="trang-thai-xin-tai-tro" :class="getClassByTrangThai()">
    <span v-if="trangThai == 0">Chờ duyệt</span>
    <span v-if="trangThai == 1">Đã được duyệt</span>
    <span v-if="trangThai == 2">Đã từ chối</span>
  </div>
</template>

<script>
export default {
  name: "TrangThaiXinTaiTro",
  props: ["trangThai"],
  methods: {
    getClassByTrangThai() {
      switch (this.trangThai) {
        case 0:
          return "cho-duyet";
        case 1:
          return "duoc-duyet";
        case 2:
          return "tu-choi";
        default:
          return "";
      }
    },
  },
};
</script>

<style scoped>
.trang-thai-xin-tai-tro {
  padding: 4px 16px;
  border-radius: 16px;
  color: white;
}
.cho-duyet {
  background-color: #d3d3d3;
}
.duoc-duyet {
  background-color: #28a745;
}
.tu-choi {
  background-color: #dc3545;
}
</style>
