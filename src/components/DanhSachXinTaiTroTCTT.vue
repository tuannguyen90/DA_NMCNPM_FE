<template>
  <div class="danh-sach-xin-tai-tro-tctt-container">
    <!-- Title -->
    <div>
      <span style="font-size: larger; font-weight: 700"
        >Danh sách xin tài trợ</span
      >
    </div>

    <!-- Danh sách tài trợ-->
    <table>
      <thead>
        <tr>
          <th>Tên chiến dịch</th>
          <th>Nội dung</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="xinTaiTro in danhSachXinTaiTro">
          <td>{{ xinTaiTro.tenChienDich }}</td>
          <td>{{ xinTaiTro.noiDung }}</td>
          <td><TrangThaiXinTaiTro :trangThai="xinTaiTro.trangThai" /></td>
          <td>
            <div style="display: flex">
              <button
                v-if="xinTaiTro.trangThai == 0"
                @click.prevent="openForm(xinTaiTro)"
              >
                Xem xét
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Duyệt tài trợ -->
    <transition name="fade">
      <div class="duyet-tai-tro-form modal" v-if="isFormOpen">
        <span class="close" @click="closeForm">&times;</span>
        <div class="modal-content">
          <!-- Title -->
          <div>
            <span style="font-size: larger; font-weight: 700"
              >Duyệt Tài Trợ</span
            >
          </div>

          <!-- Thông tin chung -->
          <table>
            <tbody>
              <tr>
                <th>Nội dung</th>
                <td>{{ xinTaiTro.noiDung }}</td>
              </tr>
              <tr>
                <th>Tên ngân hàng</th>
                <td>{{ xinTaiTro.tenNganHang }}</td>
              </tr>
              <tr>
                <th>Tên chủ tài khoản</th>
                <td>{{ xinTaiTro.tenChuTaiKhoan }}</td>
              </tr>
              <tr>
                <th>Số tài khoản</th>
                <td>{{ xinTaiTro.soTaiKhoan }}</td>
              </tr>
              <tr>
                <th>Swift code</th>
                <td>{{ xinTaiTro.swiftCode }}</td>
              </tr>
            </tbody>
          </table>

          <form @submit.prevent="duyetTaiTro">
            <!-- Phản hồi -->
            <label for="phan-hoi">Phản hồi</label>
            <textarea
              name="phan-hoi"
              id="phan-hoi"
              required
              v-model="phanHoi"
              rows="5"
            ></textarea>

            <!-- Số tiền -->
            <label for="so-tien">Số tiền</label>
            <input type="number" id="so-tien" required v-model="soTien" />

            <!-- Hình ảnh chuyển khoản -->
            <label>Hình ảnh chuyển khoản</label>
            <input
              class="input-upload"
              type="file"
              @change="handleFileUpload"
            />

            <!-- Buttons -->
            <div style="display: flex; flex-direction: row">
              <button type="submit">Duyệt</button>
              <button style="margin-left: 16px" @click.prevent="tuChoiTaiTro">
                Từ chối
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import TrangThaiXinTaiTro from "./TrangThaiXinTaiTro.vue";
import xinTaiTroService from "@/services/xinTaiTroService";

import Swal from "sweetalert2";

import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "DanhSachXinTaiTroTCTT",
  components: { TrangThaiXinTaiTro },
  props: ["chienDich"],
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
  data() {
    return {
      danhSachXinTaiTro: [],
      isFormOpen: false,
      xinTaiTro: {},
      phanHoi: "",
      soTien: 0,
      hinhAnhChuyenKhoan: null,
    };
  },
  mounted() {
    this.getDanhSachXinTaiTro();
    this.signalR.on("ReceiveMessage", async (user, message) => {
      if (message == "XinTaiTro") {
        this.getDanhSachXinTaiTro();
      }
    });
  },
  methods: {
    async getDanhSachXinTaiTro() {
      try {
        this.danhSachXinTaiTro =
          await xinTaiTroService.getDanhSachXinTaiTroByChienDich(
            this.chienDich.idChienDich
          );
      } catch (error) {}
    },
    openForm(xinTaiTro) {
      this.xinTaiTro = xinTaiTro;
      this.isFormOpen = true;
    },
    closeForm() {
      this.isFormOpen = false;
    },
    handleFileUpload(event) {
      // Mã hóa hình ảnh thành base64
      const reader = new FileReader();
      reader.onload = (e) => {
        this.hinhAnhChuyenKhoan = e.target.result.split(",")[1];
      };
      reader.readAsDataURL(event.target.files[0]);
      //   console.log(`hinhanh = ${this.hinhAnhData}`);
    },
    async duyetTaiTro() {
      const confirm = await Swal.fire({
        title: "Thông báo",
        text: "Bạn muốn duyệt đơn xin tài trợ này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      });
      if (confirm.isConfirmed) {
        const body = {
          idxinTaiTro: this.xinTaiTro.idXinTaiTro,
          PhanHoi: this.phanHoi,
          chapThuan: true,
          soTien: this.soTien,
          hinhAnh: this.hinhAnhChuyenKhoan,
        };
        try {
          const status = await xinTaiTroService.tuChoiTaiTro(body);
          if (status) {
            await Swal.fire("Thông báo", "Đã duyệt thành công", "success");
            this.xinTaiTro = {};
            this.phanHoi = "";
            this.soTien = 0;
            this.hinhAnhChuyenKhoan = null;
            this.isFormOpen = false;
            this.getDanhSachXinTaiTro();
            this.$emit("daDuyetTaiTro");
            this.notification("Client", "XinTaiTro");
          } else {
            Swal.fire("Thông báo", "Đã có lỗi xảy ra.", "error");
          }
        } catch (error) {
          Swal.fire("Thông báo", "Đã có lỗi xảy ra.", "error");
        }
      } else {
      }
    },
    async tuChoiTaiTro() {
      if (this.phanHoi == "") {
        await Swal.fire(
          "Thông báo",
          "Cần ghi rõ lý do từ chối trong mục 'Phản hồi'",
          "warning"
        );
        return;
      }
      const confirm = await Swal.fire({
        title: "Thông báo",
        text: "Bạn muốn từ chối đơn xin tài trợ này?",
        showCancelButton: true,
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy",
      });
      if (confirm.isConfirmed) {
        const body = {
          idxinTaiTro: this.xinTaiTro.idXinTaiTro,
          PhanHoi: this.phanHoi,
          chapThuan: false,
          soTien: 0,
          hinhAnh: "",
        };
        try {
          const status = await xinTaiTroService.tuChoiTaiTro(body);
          if (status) {
            await Swal.fire("Thông báo", "Đã từ chối thành công", "success");
            this.xinTaiTro = {};
            this.phanHoi = "";
            this.soTien = 0;
            this.hinhAnhChuyenKhoan = null;
            this.isFormOpen = false;
            this.getDanhSachXinTaiTro();
          } else {
            Swal.fire("Thông báo", "Đã có lỗi xảy ra.", "error");
          }
        } catch (error) {
          Swal.fire("Thông báo", "Đã có lỗi xảy ra.", "error");
        }
      } else {
      }
    },
  },
};
</script>

<style scoped>
.danh-sach-xin-tai-tro-tctt-container {
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
  width: 80%;
  height: 80%;
  background-color: white;
  padding: 16px;
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

input {
  width: 100%;
}

th {
  white-space: nowrap;
  text-align: left;
  width: 1%;
  background-color: transparent;
}

td {
  word-wrap: break-word;
  background-color: transparent;
}

table {
  width: 100%;
  border-collapse: collapse;
}

tr:nth-child(odd) {
  background-color: transparent; /* Màu nền hàng lẻ */
}

tr:nth-child(even) {
  background-color: transparent; /* Màu nền hàng chẵn */
}
</style>
