<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Bản tin" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <!-- Danh sách bản tin -->
      <DanhSachBanTin
        :isViewModeProp="true"
        :danhSachBanTin="danhSachBanTin"
        @chonBanTinDeXem="chonBanTinDeXem"
      />

      <!-- Chi tiết bản tin -->
      <div class="modal" v-if="banTin">
        <span class="close" @click="closeChiTietBanTin">&times;</span>
        <div class="chi-tiet-ban-tin">
          <span style="font-size: larger; font-weight: 700">{{
            banTin.tieuDe
          }}</span>
          <br />
          <span style="font-size: medium">{{ banTin.nguon }}</span> <br />
          <span style="font-size: medium">{{ banTin.noiDung }}</span>
        </div>
      </div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary> </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachBanTin from "@/components/DanhSachBanTin.vue";

import banTinService from "@/services/banTinService";

export default {
  name: "BanTinPage",
  components: {
    HomeLayout,
    Header,
    DanhSachBanTin,
  },
  data() {
    return {
      danhSachBanTin: [],
      banTin: null,
    };
  },
  mounted() {
    this.getDanhSachBanTin();
  },
  methods: {
    async getDanhSachBanTin() {
      this.danhSachBanTin = await banTinService.getDanhSachBanTin();
    },
    chonBanTinDeXem(banTin) {
      this.banTin = banTin;
    },
    closeChiTietBanTin() {
      this.banTin = null;
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

.chi-tiet-ban-tin {
  max-width: 1200px;
  min-width: 800px;
  height: 80%;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
}
</style>
