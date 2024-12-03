<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Theo dõi báo cáo" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <!-- Danh sách chiến dịch -->
      <DanhSachChienDich
        :danhSachChienDich="danhSachChienDich"
        :can-edit-props="false"
        @chonChienDich="chonChienDich"
      />
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <div v-if="Object.keys(chienDich).length > 0">
        <ChiTietChienDich :chienDich="chienDich" />
      </div>
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "../components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachChienDich from "@/components/DanhSachChienDich.vue";
import ChiTietChienDich from "@/components/ChiTietChienDich.vue";
import chienDichService from "@/services/ChienDichService";

import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "TheoDoiBaoCaoPage",
  components: {
    HomeLayout,
    Header,
    DanhSachChienDich,
    ChiTietChienDich,
  },
  setup() {
    // Nhận thông tin real-time
    const signalR = useSignalR();

    return {
      signalR,
    };
  },
  data() {
    return {
      danhSachChienDich: [],
      chienDich: {},
    };
  },
  mounted() {
    this.getDanhSachChienDich();
    this.signalR.on("ReceiveMessage", async (user, message) => {
      await this.getDanhSachChienDich();
      this.chienDich = this.danhSachChienDich.filter(
        (cd) => cd.idChienDich == this.chienDich.idChienDich
      )[0];
    });
  },
  methods: {
    async getDanhSachChienDich() {
      try {
        // Chỉ lấy chiến dịch đang active hoặc đã kết thúc
        const result = await chienDichService.getDanhSachChienDich();
        this.danhSachChienDich = result.filter(
          (cd) => cd.trangThai == 1 || cd.trangThai == 3
        );
      } catch (error) {
        console.log(`Lỗi tải danh sách chiến dịch (sample): ${error}`);
      }
    },
    chonChienDich(chienDich) {
      console.log(chienDich);
      this.chienDich = chienDich;
    },
  },
};
</script>

<style scoped>
.btns {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
