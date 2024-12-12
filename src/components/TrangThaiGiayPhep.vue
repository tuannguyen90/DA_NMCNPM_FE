<template>
  <div :class="getClassByTrangThai()">
    <span
      v-if="TrangThai == 0 || TrangThai == 1"
      style="cursor: pointer"
      @click.prevent="xacThucGiayPhep"
      >Chưa xác thực</span
    >
    <span v-if="TrangThai == 2">Đã xác thực</span>
  </div>
</template>

<script>
export default {
  name: "TrangThaiGiayPhep",
  props: ["TrangThai"],
  methods: {
    getClassByTrangThai() {
      switch (this.TrangThai) {
        case 0:
          return "chua-xac-thuc";
        case 1:
          return "chua-xac-thuc";
        case 2:
          return "da-xac-thuc";
        default:
          console.log(`====> ${this.TrangThai}`);
          return "";
      }
    },
    xacThucGiayPhep() {
      this.$emit("xacThucGiayPhep");
    },
  },
};
</script>

<style scoped>
.chua-xac-thuc {
  padding: 4px 16px;
  border-radius: 16px;
  color: white;
  background-color: #dc3545;
}

.da-xac-thuc {
  padding: 4px 16px;
  border-radius: 16px;
  color: white;
  background-color: #28a745;
}
</style>
