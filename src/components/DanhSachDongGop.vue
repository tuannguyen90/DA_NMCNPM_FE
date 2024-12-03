<template>
  <h1>Chiến dịch {{ chienDichProp.ten }}</h1>
</template>

<script>
import dongGopService from "@/services/dongGopService";
export default {
  name: "DanhSachDongGop",
  props: ["chienDichProp"],
  data() {
    return {
      danhSachDongGop: [],
    };
  },
  mounted() {
    this.getDanhSachDongGop();
  },
  methods: {
    async getDanhSachDongGop() {
      this.danhSachDongGop = await dongGopService.getDanhSachDongGopByChienDich(
        this.chienDichProp.idChienDich
      );
      //   console.log(JSON.stringify(this.danhSachDongGop));
    },
  },
};
</script>

<style scoped></style>
