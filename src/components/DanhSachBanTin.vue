<template>
  <div v-if="isViewModeProp" class="danh-sach-ban-tin">
    <div
      v-for="banTin in danhSachBanTin"
      class="item"
      @click="chonBanTinDeXem(banTin)"
      style="cursor: pointer"
    >
      <!-- Leading -->
      <div class="item-leading">
        <i class="fa-solid fa-newspaper fa-2xl"></i>
      </div>

      <!-- Content -->
      <div class="item-content">
        <!-- Title -->
        <div class="item-title">{{ banTin.tieuDe }}</div>

        <!-- Description -->
        <div class="item-desc">{{ banTin.noiDungNgan }}</div>
      </div>

      <!-- Trailing -->
      <div class="item-trailing"></div>
    </div>
  </div>
  <!-- Edit Mode -->
  <div v-else class="danh-sach-ban-tin">
    <div v-for="banTin in danhSachBanTin" class="item">
      <!-- Leading -->
      <div class="item-leading">
        <i class="fa-solid fa-newspaper fa-2xl"></i>
      </div>

      <!-- Content -->
      <div class="item-content">
        <!-- Title -->
        <div class="item-title">{{ banTin.tieuDe }}</div>

        <!-- Description -->
        <div class="item-desc">{{ banTin.noiDungNgan }}</div>

        <!-- Buttons -->
        <div class="item-buttons">
          <!-- Chỉnh sửa button -->
          <button
            style="margin-right: 16px"
            @click.prevent="chonBanTinDeChinhSua(banTin)"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>

      <!-- Trailing -->
      <div class="item-trailing"></div>
    </div>
  </div>
</template>

<script>
import banTinService from "@/services/banTinService";

export default {
  name: "DanhSachBanTin",
  props: ["danhSachBanTin", "isViewModeProp"],
  methods: {
    async getDanhSachBanTin() {
      this.danhSachBanTin = await banTinService.getDanhSachBanTin();
      console.log(JSON.stringify(this.danhSachBanTin));
    },
    chonBanTinDeChinhSua(banTin) {
      this.$emit("chon-ban-tin-de-chinh-sua", banTin);
    },
    chonBanTinDeXem(banTin) {
      this.$emit("chonBanTinDeXem", banTin);
    },
  },
};
</script>

<style scoped>
.danh-sach-ban-tin {
  height: 100%;
  width: 100%;
  padding: 20px;
}

.item {
  min-height: 80px;
  margin-top: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
}

.item-leading {
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-content {
  flex-grow: 1;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
}

.item-title {
  font-weight: 700;
  font-size: x-large;
}

.item-desc {
  margin-top: 8px;
  font-size: large;
}

.item-trailing {
  min-width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-buttons {
  height: 100%;
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
</style>
