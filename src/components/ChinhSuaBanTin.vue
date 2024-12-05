<template>
  <div class="chinh-sua-ban-tin-container">
    <form @submit.prevent="onSubmit">
      <!-- Title -->
      <h1>Chỉnh sửa bản tin</h1>

      <!-- Submit -->
      <button type="submit">Cập nhật</button>

      <!-- Tiêu đề bản tin -->
      <label for="tieu-de-ban-tin">Tiêu đề:</label>
      <input
        required
        type="text"
        id="tieu-de-ban-tin"
        v-model="banTin.tieuDe"
      />

      <!-- Nguồn -->
      <label for="nguon-ban-tin">Nguồn:</label>
      <input required type="text" id="nguon-ban-tin" v-model="banTin.nguon" />

      <!-- Nội dung ngắn -->
      <label for="noi-dung-ngan">Tóm tắt:</label>
      <textarea
        required
        name="noi-dung-ngan"
        id="noi-dung-ngan"
        rows="5"
        v-model="banTin.noiDungNgan"
      ></textarea>

      <!-- Nội dung đầy đủ -->
      <label for="noi-dung-day-du">Nội dung đầy đủ:</label>
      <textarea
        required
        name="noi-dung-day-du"
        id="noi-dung-day-du"
        rows="5"
        v-model="banTin.noiDung"
      ></textarea>

      <!-- Ngày cập nhật -->
      <label for="ngay-cap-nhat">Ngày cập nhật:</label>
      <input required type="date" v-model="banTin.ngayCapNhat" />
    </form>
  </div>
</template>

<script>
import banTinService from "@/services/banTinService";
import { formatDate } from "@/services/util_service";
import Swal from "sweetalert2";

export default {
  name: "ChinhSuaBanTin",
  props: ["banTinProp"],
  data() {
    return {
      banTin: {},
    };
  },
  mounted() {
    this.banTin = this.banTinProp;
    this.banTin.ngayCapNhat = formatDate(this.banTinProp.ngayCapNhat);
  },
  watch: {
    banTinProp(newValue) {
      this.banTin = newValue;
      this.banTin.ngayCapNhat = formatDate(newValue.ngayCapNhat);
    },
  },
  methods: {
    async onSubmit() {
      try {
        const isSuccess = await banTinService.capNhatBanTin(this.banTin);
        if (isSuccess) {
          await Swal.fire(
            "Thông báo",
            "Cập nhật bản tin thành công.",
            "success"
          );
          this.$emit("capNhatThanhCong");
        } else {
          await Swal.fire("Thông báo", "Đã có lỗi xảy ra.", "error");
        }
      } catch (error) {
        alert("Cập nhật thất bại. Vui lòng xem lại các thông tin.");
      }
    },
  },
};
</script>

<style scoped>
.chinh-sua-ban-tin-container {
  height: 80%;
  max-width: 1200px;
  min-width: 800px;
  background-color: white;
  padding: 20px;
}
input {
  width: 100%;
}
</style>
