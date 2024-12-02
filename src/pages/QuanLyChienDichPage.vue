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
        @on-select="onSelectChienDich"
      />

      <!-- Thêm mới chiến dịch -->
      <div class="modal" v-if="isThemChienDichModalOpen">
        <span class="close" @click="closeThemChienDichModal">&times;</span>
        <ThemMoiChienDich @ThemMoiThanhCong="onThemMoiThanhCong" />
      </div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <ChinhSuaChienDich
        v-if="secondaryTitle"
        :titleProp="secondaryTitle"
        :chienDichProp="chienDich"
        @ChinhSuaChienDichThanhCong="onChinhSuaThanhCong"
      />
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachChienDich from "@/components/DanhSachChienDich.vue";
import ChinhSuaChienDich from "@/components/ChinhSuaChienDich.vue";
import ThemMoiChienDich from "@/components/ThemMoiChienDich.vue";

import chienDichService from "@/services/ChienDichService";

export default {
  name: "QuanLyChienDichPage",
  components: {
    HomeLayout,
    Header,
    DanhSachChienDich,
    ThemMoiChienDich,
    ChinhSuaChienDich,
  },
  data() {
    return {
      danhSachChienDich: [],
      chienDich: {},
      secondaryTitle: "",
      isThemChienDichModalOpen: false,
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
      // console.log(chienDich);
      this.secondaryTitle = "Chỉnh sửa";
      this.chienDich = chienDich;
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
    },
    async onChinhSuaThanhCong() {
      this.getDanhSachChienDich();
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
