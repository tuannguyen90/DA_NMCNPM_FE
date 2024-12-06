<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Trang chủ" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <div class="left">
        <!-- Danh sách chiến dịch -->
        <div class="top-left">
          <DanhSachChienDich
            :danhSachChienDich="danhSachChienDich"
            :canEditProp="false"
          />
        </div>

        <!-- Danh sách bản tin -->
        <div class="bottom-left">
          <DanhSachBanTin
            class="bottom-left"
            :isViewModeProp="true"
            :danhSachBanTin="danhSachBanTin"
          />
        </div>
      </div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <div class="right">
        <!-- Top 10 đóng góp -->
        <div class="top-right">
          <DanhSachDongGopMoiNhat />
        </div>

        <!-- Bản đồ -->
        <div class="bottom-right">
          <BanDoThienTai />
        </div>
      </div>
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachChienDich from "@/components/DanhSachChienDich.vue";
import DanhSachDongGopMoiNhat from "@/components/DanhSachDongGopMoiNhat.vue";
import DanhSachBanTin from "@/components/DanhSachBanTin.vue";
import BanDoThienTai from "@/components/BanDoThienTai.vue";

import chienDichService from "@/services/ChienDichService";
import banTinService from "@/services/banTinService";

import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "HomePage",
  components: {
    HomeLayout,
    Header,
    DanhSachChienDich,
    DanhSachDongGopMoiNhat,
    DanhSachBanTin,
    BanDoThienTai,
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
      danhSachBanTin: [],
    };
  },
  mounted() {
    this.getDanhSachChienDich();
    this.getDanhSachBanTin();
    this.signalR.on("ReceiveMessage", async (user, messsage) => {
      if (messsage == "ChienDich" || messsage == "DongGop") {
        this.getDanhSachChienDich();
      }
      if (messsage == "BanTin") {
        this.getDanhSachBanTin;
      }
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
    async getDanhSachBanTin() {
      this.danhSachBanTin = await banTinService.getDanhSachBanTin();
    },
  },
};
</script>

<style scoped>
.left {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.top-left {
  flex: 1;
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
  overflow-y: scroll;
}

.bottom-left {
  flex: 1;
  border-right: 1px solid #eee;
  overflow-y: scroll;
}
.right {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.top-right {
  flex: 1;
  border-bottom: 1px solid #eee;
  overflow-y: scroll;
}

.bottom-right {
  flex: 1;
  overflow-y: scroll;
}
</style>
