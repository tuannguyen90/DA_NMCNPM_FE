<template>
  <div class="chi-tiet-chien-dich-container">
    <!-- Tiêu đề -->
    <div class="tieu-de">Chi tiết chiến dịch</div>

    <!-- Nội dung chiến dịch -->
    <table>
      <tbody>
        <tr>
          <th>Tên chiến dịch</th>
          <td>{{ chienDich.ten }}</td>
        </tr>
        <tr>
          <th>Tổ chức từ thiện</th>
          <td>{{ chienDich.tenToChuc }}</td>
        </tr>
        <tr>
          <th>Mô tả</th>
          <td>{{ chienDich.noiDung }}</td>
        </tr>
        <tr>
          <th>Ngày bắt đầu</th>
          <td>{{ $formatDateTime(chienDich.ngayBatDau) }}</td>
        </tr>
        <tr>
          <th>Ngày kết thúc</th>
          <td>{{ $formatDateTime(chienDich.ngayKetThuc) }}</td>
        </tr>
        <tr>
          <th>Ngân sách dự kiến</th>
          <td>{{ $formatCurrency(chienDich.nganSachDuKien) }} đ</td>
        </tr>
        <tr>
          <th>Thực thu</th>
          <td>{{ $formatCurrency(chienDich.thucThu) }} đ</td>
        </tr>
        <tr>
          <th>Trạng thái</th>
          <td>
            <div style="display: flex">
              <TrangThaiChienDich :TrangThai="chienDich.trangThai" />
            </div>
          </td>
        </tr>
        <tr>
          <th>Đánh giá</th>
          <td>
            <div style="display: flex; flex-direction: row">
              <Rating :ratingProp="this.thongKe.danhGia" :can-rating="false" />
              <span> ({{ this.thongKe.soLuong }})</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Actions -->
    <div class="actions">
      <!-- Đóng góp -->

      <!-- Xin tài trợ -->
    </div>

    <!-- Phản hồi đánh giá -->
    <label for="noi-dung-danh-gia">Phản hồi đánh giá</label>
    <Rating
      style="margin-top: 8px"
      :ratingProp="lelvelRating"
      :canRating="this.coTheDanhGia"
      @doRating="doRating"
    />
    <textarea
      name="noi-dung-danh-gia"
      id="noi-dung-danh-gia"
      style="margin-top: 8px"
      v-model="noiDungRating"
      :disabled="!coTheDanhGia"
    ></textarea>
    <button v-if="coTheDanhGia" @click.prevent="guiPhanHoiDanhGia">Gửi</button>
    <button v-if="!coTheDanhGia" @click.prevent="chinhSuaDanhGia">
      Chỉnh sửa đánh giá
    </button>
  </div>
</template>

<script>
import TrangThaiChienDich from "./TrangThaiChienDich.vue";
import Rating from "./Rating.vue";
import Swal from "sweetalert2";

import phanHoiDanhGiaService from "@/services/phanHoiDanhGiaService";

import { useUserStore } from "@/stores/user";

export default {
  name: "ChiTietChienDich",
  components: {
    TrangThaiChienDich,
    Rating,
  },
  props: ["chienDich"],
  data() {
    return {
      idPhanHoi: 0,
      lelvelRating: 0,
      noiDungRating: "",
      daTungDanhGia: false,
      coTheDanhGia: true,
      thongKe: {
        danhGia: 0,
        soLuong: 0,
      },
    };
  },
  mounted() {
    this.getPhanHoiDanhGia();
    this.getThongKe();
  },
  methods: {
    doRating(level) {
      if (this.coTheDanhGia) {
        this.lelvelRating = level;
      }
    },
    async guiPhanHoiDanhGia() {
      if (this.lelvelRating == 0 || this.noiDungRating === "") {
        Swal.fire("Thông báo", "Vui lòng điền đầy đủ thông tin", "warning");
        return;
      }

      try {
        const userStore = useUserStore();
        const now = new Date();
        var body = {
          idChienDich: this.chienDich.idChienDich,
          idnguoiPhanHoi: userStore.userId,
          noiDung: this.noiDungRating,
          danhGia: this.lelvelRating,
          ngayPhanHoi: now,
        };
        var isSuccess = false;
        if (this.daTungDanhGia) {
          body.idPhanHoi = this.idPhanHoi;
          isSuccess = await phanHoiDanhGiaService.capNhatDanhGia(body);
        } else {
          isSuccess = await phanHoiDanhGiaService.postDanhGia(body);
        }

        if (isSuccess) {
          await Swal.fire("Thông báo", "Đã gửi đánh giá thành công", "success");
          this.getPhanHoiDanhGia();
          this.getThongKe();
        } else {
          Swal.fire("Thông báo", "Đã có lỗi xảy ra!", "error");
        }
      } catch (error) {
        console.log(error);

        Swal.fire("Thông báo", "Đã có lỗi xảy ra!", "error");
      }
    },
    async chinhSuaDanhGia() {
      this.coTheDanhGia = true;
    },
    async getPhanHoiDanhGia() {
      const userStore = useUserStore();
      try {
        const danhSachPhanHoi =
          await phanHoiDanhGiaService.getPhanHoiByChienDich(
            this.chienDich.idChienDich
          );
        for (var i = 0; i < danhSachPhanHoi.length; i++) {
          if (danhSachPhanHoi[i].idNguoiDung == userStore.userId) {
            this.daTungDanhGia = true;
            this.coTheDanhGia = false;
            this.idPhanHoi = danhSachPhanHoi[i].idPhanHoi;
            this.lelvelRating = danhSachPhanHoi[i].danhGia;
            this.noiDungRating = danhSachPhanHoi[i].noiDung;
          }
        }
      } catch (error) {}
    },
    async getThongKe() {
      const kq = await phanHoiDanhGiaService.getThongKePhanHoiByChienDich(
        this.chienDich.idChienDich
      );
      if (kq != null) {
        this.thongKe = kq;
      }
    },
  },
};
</script>

<style scoped>
.chi-tiet-chien-dich-container {
  height: 100%;
  width: 100%;
  margin: 16px;
  padding: 16px;
  overflow-y: auto;
}
.tieu-de {
  font-size: xx-large;
  font-weight: 700;
  margin-bottom: 16px;
}
.item {
  min-height: 50px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
}
.title {
  width: 200px;
  font-weight: 700;
}
.content {
  flex-grow: 1;
}

th {
  padding: 8px;
  white-space: nowrap;
  text-align: left;
  width: 1%;
  background-color: transparent;
  /* border: none; */
}

td {
  padding: 0px;
  padding-left: 16px;
  width: 100%;
  word-wrap: break-word;
  /* border: none; */
}

table {
  width: 100%;
  border-collapse: collapse;
  /* border: none; */
}

tr:nth-child(odd) {
  background-color: transparent; /* Màu nền hàng lẻ */
}

tr:nth-child(even) {
  background-color: transparent; /* Màu nền hàng chẵn */
}

.actions {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
}
</style>
