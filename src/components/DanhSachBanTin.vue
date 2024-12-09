<template>
  <div v-if="isViewModeProp" class="danh-sach-ban-tin">
    <span style="font-size: x-large; font-weight: 700">Bản tin</span>
    <div
      v-for="banTin in danhSachBanTin"
      class="item"
      @click="chonBanTinDeXem(banTin)"
      style="cursor: pointer"
    >
      <!-- Leading -->
      <div class="item-leading">
        <i class="fa-solid fa-newspaper fa-2xl"></i>
      </div>

      <!-- Content -->
      <div class="item-content">
        <!-- Title -->
        <div class="item-title">{{ banTin.tieuDe }}</div>

        <!-- Description -->
        <div class="item-desc">{{ banTin.noiDungNgan }}</div>
      </div>

      <!-- Trailing -->
      <div class="item-trailing"></div>
    </div>
    <!-- Chi tiết bản tin -->
    <transition name="fade">
      <div class="modal" v-if="banTin">
        <span class="close" @click="dongBanTin">&times;</span>
        <!-- Nội dung -->
        <div class="chi-tiet-ban-tin">
          <p style="font-size: larger; font-weight: 700">
            {{ banTin.tieuDe }} 2
          </p>
          <p style="font-size: medium">
            <span>Nguồn: </span
            ><a :href="`${banTin.nguon}`" target="_blank">{{ banTin.nguon }}</a>
          </p>
          <p style="font-size: medium">{{ banTin.noiDung }}</p>

          <!-- Nhập bình luận -->
          <div v-if="choPhepBinhLuan">
            <label for="binh-luan">Bình luận</label>
            <textarea
              name="binh-luan"
              id="binh-luan"
              v-model="noiDungBinhLuan"
            ></textarea>
            <button @click.prevent="guiBinhLuan">Gửi</button>
          </div>

          <!-- Danh sách bình luận -->
          <ul>
            <li v-for="binhLuan in danhSachBinhLuan">
              <table>
                <tbody>
                  <tr>
                    <th>{{ binhLuan.tenNguoiDung }}:</th>
                    <td>
                      <div class="noi-dung-binh-luan-viewer">
                        {{ binhLuan.noiDung }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th></th>
                    <td>
                      <span style="font-size: x-small; margin-left: 16px">
                        {{ $formatDateTime(binhLuan.ngayBinhLuan) }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <!-- Edit Mode -->
  <div v-else class="danh-sach-ban-tin">
    <div v-for="banTin in danhSachBanTin" class="item">
      <!-- Leading -->
      <div class="item-leading">
        <i class="fa-solid fa-newspaper fa-2xl"></i>
      </div>

      <!-- Content -->
      <div class="item-content">
        <!-- Title -->
        <div class="item-title">{{ banTin.tieuDe }}</div>

        <!-- Description -->
        <div class="item-desc">{{ banTin.noiDungNgan }}</div>

        <!-- Buttons -->
        <div class="item-buttons">
          <!-- Chỉnh sửa button -->
          <button
            style="margin-right: 16px"
            @click.prevent="chonBanTinDeChinhSua(banTin)"
          >
            Chỉnh sửa
          </button>
        </div>
      </div>

      <!-- Trailing -->
      <div class="item-trailing"></div>
    </div>
  </div>
</template>

<script>
import binhLuanService from "@/services/binhLuanService";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";

export default {
  name: "DanhSachBanTin",
  props: ["danhSachBanTin", "isViewModeProp"],
  data() {
    return {
      banTin: null,
      choPhepBinhLuan: false,
      noiDungBinhLuan: "",
      userId: "",
      danhSachBinhLuan: [],
    };
  },
  mounted() {
    const userStore = useUserStore();
    if (userStore.userId != "") {
      this.choPhepBinhLuan = true;
      this.userId = userStore.userId;
    }
  },
  methods: {
    chonBanTinDeChinhSua(banTin) {
      this.$emit("chon-ban-tin-de-chinh-sua", banTin);
    },
    chonBanTinDeXem(banTin) {
      this.banTin = banTin;
      this.getDanhSachBinhLuan();
    },
    dongBanTin() {
      this.banTin = null;
      this.danhSachBinhLuan = [];
      this.noiDungBinhLuan = "";
    },
    async getDanhSachBinhLuan() {
      try {
        const ds = await binhLuanService.getDanhSachBinhLuan(
          this.banTin.idbanTin
        );
        this.danhSachBinhLuan = ds.reverse();
        console.log(JSON.stringify(this.danhSachBinhLuan));
      } catch (error) {
        console.log(error);
      }
    },
    async guiBinhLuan() {
      if (this.noiDungBinhLuan == "") {
        await Swal.fire(
          "Thông báo",
          "Vui lòng nhập nội dung bình luận!",
          "warning"
        );
      } else {
        const now = new Date();
        const binhLuan = {
          idBanTin: this.banTin.idbanTin,
          idNguoiBinhLuan: this.userId,
          noiDung: this.noiDungBinhLuan,
          ngayBinhLuan: now,
        };
        const isSuccess = await binhLuanService.postBinhLuan(binhLuan);
        if (isSuccess) {
          await Swal.fire("Thông báo", "Gửi bình luận thành công", "success");
          this.noiDungBinhLuan = "";
          this.getDanhSachBinhLuan();
        } else {
          await Swal.fire("Thông báo", "Đã có lỗi xảy ra.", "error");
        }
      }
    },
  },
};
</script>

<style scoped>
.danh-sach-ban-tin {
  height: 100%;
  width: 100%;
  padding: 20px;
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
.item-buttons {
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

.chi-tiet-ban-tin {
  max-width: 1200px;
  min-width: 800px;
  height: 80%;
  background-color: white;
  padding: 20px;
  overflow-y: auto;
}

th {
  padding: 0px;
  white-space: nowrap;
  text-align: left;
  width: 1%;
  background-color: transparent;
  border: none;
}

td {
  padding: 0px;
  padding-left: 16px;
  width: 100%;
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

.noi-dung-binh-luan-viewer {
  padding: 8px 16px;
  border-radius: 16px;
  background-color: #f3f3f3;
}
</style>
