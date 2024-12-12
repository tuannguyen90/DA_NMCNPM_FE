<template>
  <div class="danh-sach-dong-gop-container">
    <!-- Tên chiến dịch -->
    <span style="font-size: larger; font-weight: 700"
      >Chiến dịch {{ chienDichProp.ten }}</span
    ><br />
    <span
      >Số tiền mục tiêu:
      {{ $formatCurrency(chienDichProp.nganSachDuKien) }} VND</span
    ><br />
    <span
      >Số tiền đạt được: {{ $formatCurrency(chienDichProp.thucThu) }} VND</span
    >
    <!-- Danh sách đóng góp -->
    <table>
      <thead>
        <tr>
          <th>Tên người đóng góp</th>
          <th>Số tiền (VND)</th>
          <th>Ngày đóng góp</th>
          <th>Trạng thái</th>
          <th>Bằng chứng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dongGop in danhSachDongGop">
          <td>{{ dongGop.tenNguoiChuyen }}</td>
          <td>{{ $formatCurrency(dongGop.soTien) }} đ</td>
          <td>{{ $formatDateTime(dongGop.ngayDongGop) }}</td>
          <td>
            <div style="display: flex; flex-direction: row">
              <TrangThaiDongGop
                :TrangThaiProp="dongGop.trangThai"
                @duyetDongGop="duyetDongGop(dongGop.iddongGop)"
              />
            </div>
          </td>
          <td>
            <a href="#" @click.prevent="moHinhAnh(dongGop.iddongGop)"
              >Hình ảnh chuyển khoản</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import TrangThaiDongGop from "./TrangThaiDongGop.vue";
import dongGopService from "@/services/dongGopService";
import Swal from "sweetalert2";
import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "DanhSachDongGop",
  components: { TrangThaiDongGop },
  setup() {
    // Nhận thông tin real-time
    const signalR = useSignalR();

    // Gửi thông tin
    const notification = (user, message) => {
      signalR.invoke("SendMessage", user, message).catch((err) => {
        console.log("SignalR invocation failed:", err);
      });
    };

    return {
      signalR,
      notification,
    };
  },
  props: ["chienDichProp"],
  data() {
    return {
      danhSachDongGop: [],
    };
  },
  mounted() {
    this.getDanhSachDongGop();
    this.signalR.on("ReceiveMessage", async (user, message) => {
      if (message == "DongGopMoi") {
        await this.getDanhSachDongGop();
      }
    });
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
          // Tiến hành xác nhận
          try {
            const isSuccess = await dongGopService.verifyDongGop(iddongGop);
            if (isSuccess) {
              Swal.fire("Thành công!", "Đóng góp đã được duyệt", "success");
              // Reset danh sach
              this.getDanhSachDongGop();
              this.notification("Client", "DongGop");
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
