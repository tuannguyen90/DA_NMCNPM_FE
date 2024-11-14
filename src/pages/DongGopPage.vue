<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Đóng góp" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <!-- Tiêu đề -->
      <div style="margin-top: 16px; margin-right: 16px; margin-left: 16px">
        <span style="font-weight: 700; font-size: large"
          >Chọn 1 chiến dịch để đóng góp:</span
        >
      </div>
      <!-- Danh sách chiến dịch -->
      <DanhSachChienDich
        :danhSachChienDich="danhSachChienDich"
        @on-select="onSelectChienDich"
      />
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <DongGop v-if="showSecondary" :chienDichProp="chienDichDuocChon" />
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachChienDich from "@/components/DanhSachChienDich.vue";
import DongGop from "@/components/DongGop.vue";

import chienDichService from "@/services/ChienDichService";

export default {
  name: "DongGopPage",
  components: {
    HomeLayout,
    Header,
    DanhSachChienDich,
    DongGop,
  },
  data() {
    return {
      danhSachChienDich: [],
      chienDichDuocChon: {},
      showSecondary: false,
    };
  },
  mounted() {
    this.getDanhSachChienDich();
  },
  methods: {
    async getDanhSachChienDich() {
      try {
        this.danhSachChienDich = await chienDichService.getDanhSachChienDich();
      } catch (error) {
        console.log(`Lỗi tải danh sách chiến dịch (sample): ${error}`);
      }
    },
    onSelectChienDich(chienDich) {
      this.chienDichDuocChon = chienDich;
      this.showSecondary = true;
    },
  },
};
</script>

<style scoped></style>
