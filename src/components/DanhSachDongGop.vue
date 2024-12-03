<template>
  <div class="danh-sach-dong-gop-container">
    <!-- Tên chiến dịch -->
    <span style="font-size: larger; font-weight: 700"
      >Chiến dịch {{ chienDichProp.ten }}</span
    ><br />
    <span>Số tiền mục tiêu: {{ chienDichProp.nganSachDuKien }} VND</span><br />
    <span>Số tiền đạt được: {{ chienDichProp.thucThu }} VND</span>
    <!-- Danh sách đóng góp -->
    <table>
      <tr>
        <th>Tên người đóng góp</th>
        <th>Số tiền (VND)</th>
        <th>Ngày đóng góp</th>
        <th>Trạng thái</th>
        <th>Bằng chứng</th>
      </tr>
      <tr v-for="dongGop in danhSachDongGop">
        <td>{{ dongGop.tenDayDu }}</td>
        <td>{{ dongGop.soTien }}</td>
        <td>{{ dongGop.ngayDongGop }}</td>
        <td>
          <TrangThaiDongGop
            :TrangThaiProp="dongGop.trangThai"
            @duyetDongGop="duyetDongGop(dongGop.iddongGop)"
          />
        </td>
        <td>
          <a href="#" @click.prevent="moHinhAnh(dongGop.iddongGop)"
            >Hình ảnh chuyển khoản</a
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import TrangThaiDongGop from "./TrangThaiDongGop.vue";
import dongGopService from "@/services/dongGopService";
import Swal from "sweetalert2";

export default {
  name: "DanhSachDongGop",
  components: { TrangThaiDongGop },
  props: ["chienDichProp"],
  data() {
    return {
      danhSachDongGop: [],
    };
  },
  mounted() {
    this.getDanhSachDongGop();
  },
  methods: {
    async getDanhSachDongGop() {
      this.danhSachDongGop = await dongGopService.getDanhSachDongGopByChienDich(
        this.chienDichProp.idChienDich
      );
    },
    moHinhAnh(idDongGop) {
      this.$emit("moHinhAnhDongGop", idDongGop);
    },
    duyetDongGop(iddongGop) {
      Swal.fire({
        title: "Thông báo",
        text: "Bạn có chắc chắn muốn duyệt đóng góp này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire("Đã xác nhận!", "Bạn đã chọn 'Xác nhận'.", "info");
          // Tiến hành xác nhận
          try {
            const isSuccess = await dongGopService.verifyDongGop(iddongGop);
            if (isSuccess) {
              Swal.fire("Thành công!", "Đóng góp đã được duyệt", "success");
            } else {
              Swal.fire("Thất bại!", "Đóng góp chưa được duyệt", "error");
            }
          } catch (error) {
            Swal.fire("Thất bại!", "Đóng góp chưa được duyệt", "error");
          }
        } else {
          Swal.fire("Đã hủy!", "Bạn chọn 'Hủy'.", "info");
        }
      });
    },
  },
};
</script>

<style scoped>
.danh-sach-dong-gop-container {
  padding: 20px;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #d6eeee;
}
</style>
