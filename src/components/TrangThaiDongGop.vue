<template>
  <div class="trang-thai-dong-gop-container" :class="getClassByTrangThai()">
    <span
      v-if="TrangThaiProp == 0"
      style="cursor: pointer"
      @click.prevent="duyetDongGop"
      >Chưa duyệt</span
    >
    <span v-if="TrangThaiProp == 1">Đã duyệt</span>
  </div>
</template>

<script>
export default {
  name: "TrangThaiDongGop",
  props: ["TrangThaiProp"],
  methods: {
    getClassByTrangThai() {
      switch (this.TrangThaiProp) {
        case 0:
          return "chua-duyet";
        case 1:
          return "da-duyet";
        default:
          return "";
      }
    },
    duyetDongGop() {
      this.$emit("duyetDongGop");
    },
  },
};
</script>

<style scoped>
.trang-thai-dong-gop-container {
  padding: 4px 16px;
  border-radius: 16px;
  color: white;
}
.chua-duyet {
  background-color: #dc3545;
}

.da-duyet {
  background-color: #28a745;
}
</style>
