<template>
  <div class="bao-cao-chien-dich-container" id="bao-cao-full">
    <div>
      <span style="font-size: larger; font-weight: 700"
        >Báo cáo thu chi của chiến dịch "{{ chienDich.ten }} "</span
      >
      <button @click.prevent="exportToPDF" style="margin-left: 16px">
        Xuất pdf
      </button>
    </div>

    <!-- Danh sách đóng góp -->
    <div style="margin-top: 16px">
      <span style="font-size: large; font-weight: 700">Danh sách đóng góp</span>
    </div>
    <table style="margin-top: 8px" id="danh-sach-dong-gop">
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
    <table style="margin-top: 8px" id="danh-sach-tai-tro">
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
import jsPDF from "jspdf";
import "jspdf-autotable";
import "@/assets/font/OpenSans-Medium-normal.js";

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
    exportToPDF() {
      const doc = new jsPDF();

      doc.setFont("OpenSans-Medium", "normal");

      doc.text("Báo cáo thu chi", 10, 10);

      const dongGopHeader = [
        [
          "STT",
          "Tên chiến dịch",
          "Thời gian",
          "Tên người đóng góp",
          "Số tiền (VND)",
          "Ghi Chú",
          "Trạng thái",
        ],
      ];

      const dongGopData = this.danhSachDongGop.map((item, index) => [
        index + 1,
        item.tenChienDich,
        this.$formatDateTime(item.ngayDongGop),
        item.tenNguoiChuyen,
        this.$formatCurrency(item.soTien),
        item.ghiChu,
        this.getTrangThaiByIndex(item.trangThai),
      ]);

      doc.autoTable({
        head: dongGopHeader,
        body: dongGopData,
        startY: 15,
        theme: "grid",
        styles: {
          font: "OpenSans-Medium",
        },
        headStyles: {
          fillColor: [13, 71, 161],
          textColor: 255,
        },
        bodyStyles: {},
        margin: {
          top: 10,
          left: 10,
          right: 10,
        },
      });

      // tài trợ
      const nextY = doc.autoTable.previous.finalY + 10;

      doc.text("Danh sách tài trợ", 10, nextY);

      const taiTroHeader = [
        [
          "STT",
          "Tên chiến dịch",
          "Tên người nhận",
          "Tên ngân hàng",
          "Số tài khoản",
          "Số tiền (VND)",
          "Ngày nhận",
          "Nội dung",
          "Phản hồi",
          "Trạng thái",
        ],
      ];

      const taiTroData = this.danhSachTaiTro.map((taiTro, index) => [
        index + 1,
        taiTro.tenChienDich,
        taiTro.tenNguoiNhan,
        taiTro.tenNganHang,
        taiTro.soTaiKhoan,
        this.$formatCurrency(taiTro.soTien),
        this.$formatDateTime(taiTro.ngayTaiTro),
        taiTro.noiDung,
        taiTro.phanHoi,
        this.getTrangThaiTaiTroByIndex(taiTro.trangThai),
      ]);

      const nextY2 = doc.autoTable.previous.finalY + 15;

      doc.autoTable({
        head: taiTroHeader,
        body: taiTroData,
        startY: nextY2,
        theme: "grid",
        styles: {
          font: "OpenSans-Medium",
        },
        headStyles: {
          fillColor: [13, 71, 161],
          textColor: 255,
        },
        bodyStyles: {},
        margin: {
          top: 10,
          left: 10,
          right: 10,
        },
      });

      doc.save("bao-cao.pdf");
    },
  },
};
</script>

<style scoped>
.bao-cao-chien-dich-container {
  height: 100%;
  width: 100%;
  padding: 16px;
  overflow-y: scroll;
}
</style>
