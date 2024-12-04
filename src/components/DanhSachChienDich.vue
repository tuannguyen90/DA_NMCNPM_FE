<template>
  <div v-if="danhSachChienDich.length">
    <ul class="danh-sach-chien-dich-container">
      <span style="font-size: x-large; font-weight: 700"
        >Danh sách chiến dịch</span
      >
      <li
        v-for="chienDich in danhSachChienDich"
        class="item"
        :class="canEditProp ? 'can-edit' : 'not-edit'"
        @click.prevent="selectHandle(chienDich)"
      >
        <!-- Leading -->
        <div class="item-leading">
          <i class="fa-solid fa-paper-plane fa-xl"></i>
        </div>
        <div class="item-content">
          <!-- Title -->
          <div v-if="canEditProp == true" class="item-title">
            {{ chienDich.ten }}
          </div>
          <div v-else class="item-title">
            {{ chienDich.ten }}
          </div>
          <!-- Content -->
          <div class="item-desc">
            <span style="font-weight: 700">Mục tiêu :</span>
            {{ chienDich.nganSachDuKien }} -
            <span style="font-weight: 700">Đạt được: </span
            >{{ chienDich.thucThu }}
          </div>

          <!-- Buttons -->
          <div v-if="canEditProp == true" class="buttons">
            <!-- Chỉnh sửa -->
            <div
              style="margin-right: 16px"
              @click.prevent="chinhSua(chienDich)"
            >
              <button>Chỉnh sửa</button>
            </div>

            <!-- Xem danh sách đóng góp -->
            <div
              style="margin-right: 16px"
              @click.prevent="xemDanhSachDongGop(chienDich)"
            >
              <button>Danh sách đóng góp</button>
            </div>

            <!-- Xóa -->
            <!-- <div @click.prevent="">
              <button>Xóa</button>
            </div> -->
          </div>
        </div>
        <!-- Trailing -->
        <div class="item-trailing">
          <TrangThaiChienDich :TrangThai="chienDich.trangThai" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TrangThaiChienDich from "./TrangThaiChienDich.vue";
export default {
  name: "DanhSachChienDich",
  components: { TrangThaiChienDich },
  props: ["danhSachChienDich", "canEditProp"],
  methods: {
    chinhSua(chienDich) {
      this.$emit("chienDichDuocChonDeSua", chienDich);
    },
    xemDanhSachDongGop(chienDich) {
      this.$emit("xemDanhSachDongGop", chienDich);
    },
    selectHandle(chienDich) {
      if (!this.canEditProp) {
        this.$emit("chonChienDich", chienDich);
      }
    },
  },
};
</script>

<style scoped>
.danh-sach-chien-dich-container {
  width: 100%;
  height: 100%;
  padding: 16px;
  overflow: auto;
}

.not-edit {
  cursor: pointer;
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
.buttons {
  height: 100%;
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
</style>
