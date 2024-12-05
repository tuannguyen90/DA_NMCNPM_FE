<template>
  <div class="them-moi-ban-tin-container">
    <form @submit.prevent="onSubmit">
      <!-- Title -->
      <h1>Thêm mới bản tin</h1>

      <!-- Submit -->
      <button type="submit">Thêm mới</button>

      <!-- Tiêu đề bản tin -->
      <label for="tieu-de-ban-tin">Tiêu đề:</label>
      <input type="text" id="tieu-de-ban-tin" v-model="banTin.tieuDe" />

      <!-- Nguồn -->
      <label for="nguon-ban-tin">Nguồn:</label>
      <input type="text" id="nguon-ban-tin" v-model="banTin.nguon" />

      <!-- Nội dung ngắn -->
      <label for="noi-dung-ngan">Tóm tắt:</label>
      <textarea
        name="noi-dung-ngan"
        id="noi-dung-ngan"
        rows="5"
        v-model="banTin.noiDungNgan"
      ></textarea>

      <!-- Nội dung đầy đủ -->
      <label for="noi-dung-day-du">Nội dung đầy đủ:</label>
      <textarea
        name="noi-dung-day-du"
        id="noi-dung-day-du"
        rows="5"
        v-model="banTin.noiDung"
      ></textarea>

      <!-- Ngày cập nhật -->
      <label for="ngay-cap-nhat">Ngày cập nhật:</label>
      <input id="ngay-cap-nhat" type="date" v-model="banTin.ngayCapNhat" />
    </form>
  </div>
</template>

<script>
import { formatDate } from "@/services/util_service";
import banTinService from "@/services/banTinService";
import Swal from "sweetalert2";

export default {
  name: "ThemMoiBanTin",
  data() {
    return {
      banTin: {},
    };
  },
  mounted() {
    const now = new Date();
    const ngayHienTai = now.toISOString();
    this.banTin.ngayCapNhat = formatDate(ngayHienTai);
  },
  methods: {
    async onSubmit() {
      const isSuccess = await banTinService.taoBanTin(this.banTin);
      if (isSuccess) {
        Swal.fire({
          title: "Thông báo",
          text: "Thêm mới bản tin thành công",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$emit("ThemMoiThanhCong");
          }
        });
      } else {
        alert("Tạo bản tin thất bại!");
      }
    },
  },
};
</script>

<style scoped>
.them-moi-ban-tin-container {
  height: 80%;
  max-width: 1200px;
  min-width: 800px;
  background-color: white;
  padding: 20px;
}
</style>
