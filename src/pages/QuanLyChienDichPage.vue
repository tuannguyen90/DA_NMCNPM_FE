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
        <button @click.prevent="themChienDich">Thêm mới chiến dịch</button>
      </div>
      <!-- Danh sách chiến dịch -->
      <DanhSachChienDich
        :danhSachChienDich="danhSachChienDich"
        @on-select="onSelectChienDich"
    /></template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <ChinhSuaChienDich
        v-if="secondaryTitle"
        :titleProp="secondaryTitle"
        :chienDichProp="chienDich"
      />
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachChienDich from "@/components/DanhSachChienDich.vue";
import ChinhSuaChienDich from "@/components/ChinhSuaChienDich.vue";

import chienDichService from "@/services/ChienDichService";

export default {
  name: "QuanLyChienDichPage",
  components: {
    HomeLayout,
    Header,
    DanhSachChienDich,
    ChinhSuaChienDich,
  },
  data() {
    return {
      danhSachChienDich: [],
      chienDich: {},
      secondaryTitle: "",
    };
  },
  mounted() {
    this.getDanhSachChienDich();
  },
  methods: {
    async getDanhSachChienDich() {
      try {
        this.danhSachChienDich =
          await chienDichService.getDanhSachChienDich_Sample();
      } catch (error) {
        console.log(`Lỗi tải danh sách chiến dịch (sample): ${error}`);
      }
    },
    onSelectChienDich(chienDich) {
      // console.log(chienDich);
      this.secondaryTitle = "Chỉnh sửa";
      this.chienDich = chienDich;
    },
    themChienDich() {
      this.chienDich = {};
      this.secondaryTitle = "Thêm mới";
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
</style>
