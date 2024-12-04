<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Bản tin" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <!-- Thêm mới button -->
      <div class="button-container">
        <button @click.prevent="onThemMoiBtnClicked">Thêm mới bản tin</button>
      </div>

      <!-- Danh sách bản tin -->
      <DanhSachBanTin
        :isViewModeProp="false"
        :danhSachBanTin="danhSachBanTin"
        @chon-ban-tin-de-chinh-sua="chonBanTinDeChinhSua"
      />

      <!-- Thêm mới bản tin Modal -->
      <div class="modal" v-if="isThemMoiBanTinModalOpen">
        <span class="close" @click="closeThemMoiBanTinModal">&times;</span>
        <ThemMoiBanTin v-if="showChild" @ThemMoiThanhCong="ThemMoiThanhCong" />
      </div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      <!-- Chỉnh sửa bản tin -->
      <ChinhSuaBanTin
        :banTinProp="banTinSelected"
        v-if="banTinSelected"
        @capNhatThanhCong="capNhatThanhCong"
      />
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";
import DanhSachBanTin from "@/components/DanhSachBanTin.vue";
import ThemMoiBanTin from "@/components/ThemMoiBanTin.vue";
import ChinhSuaBanTin from "@/components/ChinhSuaBanTin.vue";

import banTinService from "@/services/banTinService";

import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "QuanLyBanTinPage",
  components: {
    HomeLayout,
    Header,
    ThemMoiBanTin,
    DanhSachBanTin,
    ChinhSuaBanTin,
  },
  setup() {
    const signalR = useSignalR();

    const notification = (user, message) => {
      signalR.invoke("SendMessage", user, message);
    };

    return { notification };
  },
  data() {
    return {
      danhSachBanTin: [],
      isThemMoiBanTinModalOpen: false,
      showChild: false, // Để clear component
      banTinSelected: null,
    };
  },
  mounted() {
    this.getDanhSachBanTin();
  },
  watch: {
    isThemMoiBanTinModalOpen(val) {
      if (val) {
        this.showChild = true;
      }
    },
  },
  methods: {
    async getDanhSachBanTin() {
      this.danhSachBanTin = await banTinService.getDanhSachBanTin();
    },
    onThemMoiBtnClicked() {
      this.isThemMoiBanTinModalOpen = true;
    },
    ThemMoiThanhCong() {
      this.isThemMoiBanTinModalOpen = false;
      this.getDanhSachBanTin();
      this.notification("Client", "BanTin");
    },
    closeThemMoiBanTinModal() {
      this.showChild = false;
      setTimeout(() => {
        this.isThemMoiBanTinModalOpen = false;
      }, 300);
    },
    chonBanTinDeChinhSua(banTin) {
      console.log(`chon: ${JSON.stringify(banTin)}`);
      this.banTinSelected = banTin;
    },
    capNhatThanhCong() {
      this.banTinSelected = null;
      this.getDanhSachBanTin;
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
