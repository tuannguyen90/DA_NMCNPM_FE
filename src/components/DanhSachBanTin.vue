<template>
  <div v-if="isViewModeProp" class="danh-sach-ban-tin">
    <span style="font-size: x-large; font-weight: 700">Bản tin</span>
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
    <!-- Chi tiết bản tin -->
    <div class="modal" v-if="banTin">
      <span class="close" @click="dongBanTin">&times;</span>
      <div class="chi-tiet-ban-tin">
        <p style="font-size: larger; font-weight: 700">{{ banTin.tieuDe }}</p>
        <p style="font-size: medium">
          <span>Nguồn: </span
          ><a :href="`${banTin.nguon}`" target="_blank">{{ banTin.nguon }}</a>
        </p>
        <p style="font-size: medium">{{ banTin.noiDung }}</p>
      </div>
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
export default {
  name: "DanhSachBanTin",
  props: ["danhSachBanTin", "isViewModeProp"],
  data() {
    return {
      banTin: null,
    };
  },
  methods: {
    chonBanTinDeChinhSua(banTin) {
      this.$emit("chon-ban-tin-de-chinh-sua", banTin);
    },
    chonBanTinDeXem(banTin) {
      this.banTin = banTin;
    },
    dongBanTin() {
      this.banTin = null;
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
  font-size: medium;
}

.item-desc {
  margin-top: 8px;
  font-size: medium;
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
