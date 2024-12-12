<template>
  <div class="xin-tai-tro-container">
    <!-- Thông tin chiến dịch -->
    <div class="thong-tin-chien-dich">
      <table>
        <tbody>
          <tr>
            <th>Tên chiến dịch:</th>
            <td>{{ chienDich.ten }}</td>
          </tr>
          <tr>
            <th>Nội dung:</th>
            <td>{{ chienDich.noiDung }}</td>
          </tr>
          <tr>
            <th>Ngày bắt đầu:</th>
            <td>{{ $formatDateTime(chienDich.ngayBatDau) }}</td>
          </tr>
          <tr>
            <th>Ngày kết thúc:</th>
            <td>{{ $formatDateTime(chienDich.ngayKetThuc) }}</td>
          </tr>
          <tr>
            <th>Thực thu:</th>
            <td>{{ $formatCurrency(chienDich.thucThu) }} đ</td>
          </tr>
          <tr>
            <th>Thực chi:</th>
            <td>{{ $formatCurrency(chienDich.thucChi) }} đ</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button mở Form xin tài trợ -->
    <button @click.prevent="openForm">Xin tài trợ</button>

    <!-- Form xin tài trợ -->
    <transition name="fade">
      <div class="xin-tai-tro-form modal" v-if="isFormOpen">
        <span class="close" @click="closeForm">&times;</span>
        <div class="modal-content">
          <form @submit.prevent="xinTaiTro">
            <!-- Title -->
            <div>
              <span style="font-size: larger; font-weight: 700"
                >Xin Tài Trợ</span
              >
            </div>

            <!-- Nội dung -->
            <label for="noi-dung" style="margin-top: 16px">Nội dung</label>
            <textarea
              required
              name="noi-dung"
              id="noi-dung"
              rows="5"
              v-model="noiDung"
            ></textarea>

            <!-- Tên ngân hàng -->
            <label for="ten-ngan-hang">Tên ngân hàng</label>
            <input
              required
              type="text"
              name="ten-ngan-hang"
              id="ten-ngan-hang"
              v-model="tenNganHang"
            />

            <!-- Tên chủ tài khoản -->
            <label for="ten-chu-tai-khoan">Tên chủ tài khoản</label>
            <input
              required
              type="text"
              name="ten-chu-tai-khoan"
              id="ten-chu-tai-khoan"
              v-model="tenChuTaiKhoan"
            />

            <!-- Số tài khoản -->
            <label for="so-tai-khoan">Số tài khoản</label>
            <input
              required
              type="text"
              name="so-tai-khoan"
              id="so-tai-khoan"
              v-model="soTaiKhoan"
            />

            <!-- Swiftcode -->
            <label for="swift-code">SwiftCode</label>
            <input
              required
              type="text"
              name="swift-code"
              id="swift-code"
              v-model="swiftCode"
            />

            <!-- Submit butt -->
            <button type="submit">Gửi</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";
import xinTaiTroService from "@/services/xinTaiTroService";

export default {
  name: "XinTaiTro",
  props: ["chienDich"],
  data() {
    return {
      isFormOpen: false,
      noiDung: "",
      tenNganHang: "",
      tenChuTaiKhoan: "",
      soTaiKhoan: "",
      swiftCode: "",
    };
  },
  methods: {
    openForm() {
      this.isFormOpen = true;
    },
    closeForm() {
      this.isFormOpen = false;
    },
    async xinTaiTro() {
      const userStore = useUserStore();

      var body = {
        idnguoiNhan: userStore.userId,
        idChienDich: this.chienDich.idChienDich,
        noiDung: this.noiDung,
        phanHoi: "",
        tenNganHang: this.tenNganHang,
        tenChuTaiKhoan: this.tenChuTaiKhoan,
        soTaiKhoan: this.soTaiKhoan,
        swiftCode: this.swiftCode,
      };

      // console.log(JSON.stringify(body));
      try {
        const status = await xinTaiTroService.xinTaiTro(body);
        if (status) {
          await Swal.fire("Thông báo", "Đã gửi thành công", "success");
          this.isFormOpen = false;
          this.noiDung = "";
          this.tenNganHang = "";
          this.tenChuTaiKhoan = "";
          this.soTaiKhoan = "";
          this.swiftCode = "";
          this.$emit("daGuiXinTaiTroThanhCong");
        } else {
          Swal.fire("Thông báo", "Đã có lỗi xảy ra", "error");
        }
      } catch (error) {
        Swal.fire("Thông báo", "Đã có lỗi xảy ra", "error");
      }
    },
  },
};
</script>

<style scoped>
.xin-tai-tro-container {
  padding: 16px;
}
th {
  white-space: nowrap;
  text-align: left;
  width: 1%;
  background-color: transparent;
  border: none;
}

td {
  word-wrap: break-word;
  border: none;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: none;
}

tr:nth-child(odd) {
  background-color: transparent; /* Màu nền hàng lẻ */
}

tr:nth-child(even) {
  background-color: transparent; /* Màu nền hàng chẵn */
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
</style>
