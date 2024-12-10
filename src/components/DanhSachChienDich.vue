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
            {{ $formatCurrency(chienDich.nganSachDuKien) }} đ -
            <span style="font-weight: 700">Đạt được: </span
            >{{ $formatCurrency(chienDich.thucThu) }}đ
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

    <!-- Chi tiết chiến dịch -->
    <transition name="fade">
      <div class="modal" v-if="chienDich">
        <span class="close" @click="dongChiTietChienDich">&times;</span>
        <ChiTietChienDich :chienDich="chienDich" class="modal-content" /></div
    ></transition>
  </div>
</template>

<script>
import TrangThaiChienDich from "./TrangThaiChienDich.vue";
import ChiTietChienDich from "./ChiTietChienDich.vue";

export default {
  name: "DanhSachChienDich",
  components: { TrangThaiChienDich, ChiTietChienDich },
  props: [
    "danhSachChienDich",
    "canEditProp",
    "selectToDongGop",
    "selectToXinTaiTro",
  ],
  data() {
    return {
      chienDich: null,
    };
  },
  methods: {
    chinhSua(chienDich) {
      this.$emit("chienDichDuocChonDeSua", chienDich);
    },
    xemDanhSachDongGop(chienDich) {
      this.$emit("xemDanhSachDongGop", chienDich);
    },
    selectHandle(chienDich) {
      if (!this.canEditProp) {
        if (this.selectToDongGop) {
          // Chọn để dóng góp
          this.$emit("chonChienDich", chienDich);
        } else if (this.selectToXinTaiTro) {
          // Chọn để xin tài trợ
          this.$emit("xinTaiTro", chienDich);
        } else {
          // Xem
          this.chienDich = chienDich;
        }
      }
    },
    dongChiTietChienDich() {
      this.chienDich = null;
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
  z-index: 1050;
}
.modal-content {
  max-width: 1200px;
  max-height: 80%;
  background-color: white;
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
