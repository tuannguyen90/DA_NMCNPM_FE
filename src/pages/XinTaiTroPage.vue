<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Xin tài trợ" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <!-- Danh sách chiến dịch -->
      <DanhSachChienDich
        :danhSachChienDich="danhSachChienDich"
        :canEditProp="false"
        :selectToDongGop="false"
        :selectToXinTaiTro="true"
        @xinTaiTro="xinTaiTro"
      />
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <!-- Xin tài trợ -->
      <XinTaiTro v-if="chienDich" :chienDich="chienDich" />
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachChienDich from "@/components/DanhSachChienDich.vue";
import XinTaiTro from "@/components/XinTaiTro.vue";

import chienDichService from "@/services/ChienDichService";

export default {
  name: "XinTaiTroPage",
  components: {
    HomeLayout,
    Header,
    DanhSachChienDich,
    XinTaiTro,
  },
  data() {
    return {
      danhSachChienDich: [],
      chienDich: null,
    };
  },
  mounted() {
    this.getDanhSachChienDich();
  },
  methods: {
    async getDanhSachChienDich() {
      try {
        // Chỉ lấy chiến dịch đang active hoặc đã kết thúc
        const result = await chienDichService.getDanhSachChienDich();
        this.danhSachChienDich = result.filter((cd) => cd.trangThai == 1);
      } catch (error) {
        console.log(`Lỗi tải danh sách chiến dịch (sample): ${error}`);
      }
    },
    xinTaiTro(chienDich) {
      // console.log(`hhhh => ${JSON.stringify(chienDich)}`);

      this.chienDich = chienDich;
    },
  },
};
</script>

<style scoped></style>
