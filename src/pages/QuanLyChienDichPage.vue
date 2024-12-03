<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Quản lý chiến dịch" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <!-- Thêm mới button -->
      <div class="button-container">
        <button @click.prevent="onThemMoiBtnClicked">
          Thêm mới chiến dịch
        </button>
      </div>
      <!-- Danh sách chiến dịch -->
      <DanhSachChienDich
        :danhSachChienDich="danhSachChienDich"
        :can-edit-prop="true"
        @chienDichDuocChonDeSua="chienDichDuocChonDeSua"
        @xemDanhSachDongGop="xemDanhSachDongGop"
      />

      <!-- Thêm mới chiến dịch -->
      <div class="modal" v-if="isThemChienDichModalOpen">
        <span class="close" @click="closeThemChienDichModal">&times;</span>
        <ThemMoiChienDich @ThemMoiThanhCong="onThemMoiThanhCong" />
      </div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <!-- Chỉnh sửa chiến dịch -->
      <ChinhSuaChienDich
        v-if="secondaryTitle == 'Chỉnh sửa'"
        :titleProp="secondaryTitle"
        :chienDichProp="chienDich"
        @ChinhSuaChienDichThanhCong="onChinhSuaThanhCong"
      />

      <!-- Danh sách đóng góp -->
      <DanhSachDongGop
        v-if="secondaryTitle == 'Danh sách đóng góp'"
        :chienDichProp="chienDich"
        @moHinhAnhDongGop="moHinhAnhDongGop"
      />

      <!-- Hình ảnh đóng góp -->
      <div class="modal" v-if="hinhAnhDongGop">
        <span class="close" @click="closeHinhAnhDongGopModal">&times;</span>
        <img :src="hinhAnhDongGop" alt="hinh-anh-dong-gop" />
      </div>
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachChienDich from "@/components/DanhSachChienDich.vue";
import ChinhSuaChienDich from "@/components/ChinhSuaChienDich.vue";
import ThemMoiChienDich from "@/components/ThemMoiChienDich.vue";
import DanhSachDongGop from "@/components/DanhSachDongGop.vue";

import chienDichService from "@/services/ChienDichService";
import dongGopService from "@/services/dongGopService";

import { useSignalR } from "@dreamonkey/vue-signalr";

import { useUserStore } from "@/stores/user";

export default {
  name: "QuanLyChienDichPage",
  components: {
    HomeLayout,
    Header,
    DanhSachChienDich,
    ThemMoiChienDich,
    ChinhSuaChienDich,
    DanhSachDongGop,
  },
  setup() {
    const signalR = useSignalR();

    const notification = (user, message) => {
      signalR.invoke("SendMessage", user, message).catch((err) => {
        console.log("SignalR invocation failed:", err);
      });
    };

    return {
      notification,
    };
  },
  data() {
    return {
      danhSachChienDich: [],
      chienDich: {},
      secondaryTitle: "",
      isThemChienDichModalOpen: false,
      hinhAnhDongGop: null,
    };
  },
  mounted() {
    this.getDanhSachChienDich();
  },
  methods: {
    async getDanhSachChienDich() {
      try {
        // Chỉ được lấy các chiến dịch do tổ chức quản lý
        const userId = useUserStore().userId;
        const result = await chienDichService.getDanhSachChienDich();
        this.danhSachChienDich = result.filter((cd) => cd.idToChuc == userId);
      } catch (error) {
        console.log(`Lỗi tải danh sách chiến dịch (sample): ${error}`);
      }
    },
    onThemMoiBtnClicked() {
      this.isThemChienDichModalOpen = true;
    },
    closeThemChienDichModal() {
      this.isThemChienDichModalOpen = false;
    },
    onThemMoiThanhCong() {
      this.isThemChienDichModalOpen = false;
      this.getDanhSachChienDich();
      // Gửi notification
      this.notification("Client", "Có 1 chiến dịch được tạo mới");
    },
    chienDichDuocChonDeSua(chienDich) {
      // console.log(chienDich);
      this.secondaryTitle = "Chỉnh sửa";
      this.chienDich = chienDich;
    },
    async onChinhSuaThanhCong() {
      this.getDanhSachChienDich();
      // Gửi notification
      this.notification("Client", "CapNhatChienDich");
    },
    xemDanhSachDongGop(chienDich) {
      this.chienDich = chienDich;
      this.secondaryTitle = "Danh sách đóng góp";
    },
    async moHinhAnhDongGop(idDongGop) {
      try {
        const dongGop = await dongGopService.getDongGopById(idDongGop);
        if (dongGop != null) {
          this.hinhAnhDongGop = `data:image/jpeg;base64,${dongGop.hinhAnh}`;
        }
      } catch (error) {
        console.log(error);
      }
    },
    closeHinhAnhDongGopModal() {
      this.hinhAnhDongGop = null;
    },
  },
};
</script>

<style scoped>
.button-container {
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}
.modal-content {
  max-width: 80%;
  max-height: 80%;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 4px;
  font-size: 50px;
  color: white;
  cursor: pointer;
}
</style>
