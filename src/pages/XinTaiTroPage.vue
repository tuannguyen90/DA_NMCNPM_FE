<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Xin tài trợ" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <div class="left">
        <div class="top-left">
          <!-- Danh sách chiến dịch -->
          <DanhSachChienDich
            :danhSachChienDich="danhSachChienDich"
            :canEditProp="false"
            :selectToDongGop="false"
            :selectToXinTaiTro="true"
            @xinTaiTro="xinTaiTro"
          />
        </div>
        <!-- Danh sách xin tài trợ -->
        <div class="bottom-left">
          <DanhSachXinTaiTro :danhSachXinTaiTro="danhSachXinTaiTro" />
        </div>
      </div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <!-- Xin tài trợ -->
      <XinTaiTro
        v-if="chienDich"
        :chienDich="chienDich"
        @daGuiXinTaiTroThanhCong="daGuiXinTaiTroThanhCong"
      />
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachChienDich from "@/components/DanhSachChienDich.vue";
import XinTaiTro from "@/components/XinTaiTro.vue";
import DanhSachXinTaiTro from "@/components/DanhSachXinTaiTro.vue";

import { useUserStore } from "@/stores/user";

import chienDichService from "@/services/ChienDichService";
import xinTaiTroService from "@/services/xinTaiTroService";

import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "XinTaiTroPage",
  components: {
    HomeLayout,
    Header,
    DanhSachChienDich,
    XinTaiTro,
    DanhSachXinTaiTro,
  },
  setup() {
    // Nhận thông tin real-time
    const signalR = useSignalR();

    // Gửi thông tin
    const notification = (user, message) => {
      signalR.invoke("SendMessage", user, message).catch((err) => {
        console.log("SignalR invocation failed:", err);
      });
    };

    return {
      signalR,
      notification,
    };
  },
  data() {
    return {
      danhSachChienDich: [],
      chienDich: null,
      danhSachXinTaiTro: [],
    };
  },
  mounted() {
    this.getDanhSachChienDich();
    this.getDanhSachXinTaiTro();
    this.signalR.on("ReceiveMessage", async (user, message) => {
      if (message == "XinTaiTro") {
        this.getDanhSachChienDich();
        this.getDanhSachXinTaiTro();
      }
    });
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
      this.chienDich = chienDich;
    },
    async getDanhSachXinTaiTro() {
      const userStore = useUserStore();
      try {
        this.danhSachXinTaiTro =
          await xinTaiTroService.getDanhSachXinTaiTroByNguoiXin(
            userStore.userId
          );
      } catch (error) {}
    },
    daGuiXinTaiTroThanhCong() {
      this.getDanhSachChienDich();
      this.getDanhSachXinTaiTro();
      this.notification("Client", "XinTaiTro");
    },
  },
};
</script>

<style scoped>
.left {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.top-left {
  flex: 1;
  width: 100%;
  height: 100%;
}

.bottom-left {
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>
