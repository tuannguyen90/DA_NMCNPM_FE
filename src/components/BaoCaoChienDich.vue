<template>
  <div class="bao-cao-chien-dich-container">
    <div>
      <span style="font-size: larger; font-weight: 700"
        >Báo cáo thu chi của chiến dịch "{{ chienDich.ten }}"</span
      >
    </div>

    <!-- Danh sách đóng góp -->
    <div style="margin-top: 16px">
      <span style="font-size: large; font-weight: 700">Danh sách đóng góp</span>
    </div>
    <table style="margin-top: 8px">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên chiến dịch</th>
          <th>Thời gian</th>
          <th>Tên người đóng góp</th>
          <th>Số tiền (VND)</th>
          <th>Ghi chú</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(dongGop, index) in danhSachDongGop" key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ dongGop.tenChienDich }}</td>
          <td>{{ $formatDateTime(dongGop.ngayDongGop) }}</td>
          <td>{{ dongGop.tenNguoiChuyen }}</td>
          <td>{{ $formatCurrency(dongGop.soTien) }}</td>
          <td>{{ dongGop.ghiChu }}</td>
          <td>{{ getTrangThaiByIndex(dongGop.trangThai) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Danh sách tài trợ -->
    <div style="margin-top: 16px">
      <span style="font-size: large; font-weight: 700"
        >Danh sách được nhận tài trợ</span
      >
    </div>
    <table style="margin-top: 8px">
      <thead>
        <tr>
          <th>STT</th>
          <th>Tên chiến dịch</th>
          <th>Tên người nhận</th>
          <th>Tên ngân hàng</th>
          <th>Số tài khoản</th>
          <th>Số tiền (VND)</th>
          <th>Ngày nhận</th>
          <th>Nội dung</th>
          <th>Phản hồi</th>
          <th>Trạng thái</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(taiTro, index) in danhSachTaiTro" key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ taiTro.tenChienDich }}</td>
          <td>{{ taiTro.tenNguoiNhan }}</td>
          <td>{{ taiTro.tenNganHang }}</td>
          <td>{{ taiTro.soTaiKhoan }}</td>
          <td>{{ $formatCurrency(taiTro.soTien) }}</td>
          <td>{{ $formatDateTime(taiTro.ngayTaiTro) }}</td>
          <td>{{ taiTro.noiDung }}</td>
          <td>{{ taiTro.phanHoi }}</td>
          <td>{{ getTrangThaiTaiTroByIndex(taiTro.trangThai) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import dongGopService from "@/services/dongGopService";
import xinTaiTroService from "@/services/xinTaiTroService";

export default {
  name: "BaoCaoChienDich",
  props: ["chienDich"],
  data() {
    return {
      danhSachDongGop: [],
      danhSachTaiTro: [],
    };
  },
  mounted() {
    // console.log(JSON.stringify(this.chienDich));
    this.getDanhSachDongGop();
    this.getDanhSachTaiTro();
  },
  methods: {
    async getDanhSachDongGop() {
      try {
        this.danhSachDongGop =
          await dongGopService.getDanhSachDongGopByChienDich(
            this.chienDich.idChienDich
          );
        // console.log(JSON.stringify(this.danhSachDongGop));
      } catch (error) {}
    },
    async getDanhSachTaiTro() {
      try {
        this.danhSachTaiTro =
          await xinTaiTroService.getDanhSachXinTaiTroByChienDich(
            this.chienDich.idChienDich
          );
        // console.log(JSON.stringify(this.danhSachTaiTro));
      } catch (error) {}
    },
    getTrangThaiByIndex(index) {
      if (index == 0) {
        return "Chờ duyệt";
      } else {
        return "Đã duyệt";
      }
    },
    getTrangThaiTaiTroByIndex(index) {
      if (index == 0) {
        return "Chờ duyệt";
      } else if (index == 1) {
        return "Đã duyệt";
      } else {
        return "Từ chối";
      }
    },
  },
};
</script>

<style scoped>
.bao-cao-chien-dich-container {
  height: 100%;
  width: 100%;
  padding: 16px;
}
</style>
