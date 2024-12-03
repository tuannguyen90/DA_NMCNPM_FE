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
        @chonChienDich="chonChienDich"
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
        // Chỉ lấy các chiến dịch đang hoạt động
        const result = await chienDichService.getDanhSachChienDich();
        this.danhSachChienDich = result.filter((cd) => cd.trangThai == 1);
      } catch (error) {
        console.log(`Lỗi tải danh sách chiến dịch (sample): ${error}`);
      }
    },
    chonChienDich(chienDich) {
      this.chienDichDuocChon = chienDich;
      console.log(`chon   ddd ${chienDich.ten}`);
      this.showSecondary = true;
    },
  },
};
</script>

<style scoped></style>
