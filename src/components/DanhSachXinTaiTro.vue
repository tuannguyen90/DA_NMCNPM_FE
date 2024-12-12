<template>
  <div class="danh-sach-xin-tai-tro-container">
    <!-- Title -->
    <div>
      <span style="font-size: larger; font-weight: 700"
        >Danh sách xin tài trợ</span
      >
    </div>

    <!-- Danh sách -->
    <table>
      <thead>
        <tr>
          <th>Tên chiến dịch</th>
          <th>Phản hồi</th>
          <th>Trạng thái</th>
          <th>Hình ảnh chuyển khoản</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="xinTaiTro in danhSachXinTaiTro">
          <td>{{ xinTaiTro.tenChienDich }}</td>
          <td>{{ xinTaiTro.phanHoi }}</td>
          <td><TrangThaiXinTaiTro :trangThai="xinTaiTro.trangThai" /></td>
          <td>
            <a
              v-if="xinTaiTro.trangThai == 1"
              href="#"
              @click.prevent="openHinhAnh(xinTaiTro)"
              >Hình ảnh</a
            >
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Hình ảnh chuyển khoản -->
    <transition name="fade">
      <div class="modal" v-if="hinhAnhChuyenKhoan">
        <span class="close" @click="closeHinhAnh">&times;</span>
        <img
          :src="hinhAnhChuyenKhoan"
          alt="hinh-anh-chuyen-khoan"
          class="modal-content"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import TrangThaiXinTaiTro from "./TrangThaiXinTaiTro.vue";
import xinTaiTroService from "@/services/xinTaiTroService";

export default {
  name: "DanhSachXinTaiTro",
  components: { TrangThaiXinTaiTro },
  props: ["danhSachXinTaiTro"],
  data() {
    return {
      hinhAnhChuyenKhoan: null,
    };
  },
  methods: {
    async openHinhAnh(taiTro) {
      try {
        const xinTaiTro = await xinTaiTroService.getXinTaiTroById(
          taiTro.idXinTaiTro
        );
        console.log(xinTaiTro);

        if (xinTaiTro != null) {
          this.hinhAnhChuyenKhoan = `data:image/jpeg;base64,${xinTaiTro.hinhAnh}`;
          console.log(`hìnhanh ==> ${this.hinhAnhChuyenKhoan}`);
        }
      } catch (error) {}
    },
    closeHinhAnh() {
      this.hinhAnhChuyenKhoan = null;
    },
  },
};
</script>

<style scoped>
.danh-sach-xin-tai-tro-container {
  width: 100%;
  height: 100%;
  padding: 16px;
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
