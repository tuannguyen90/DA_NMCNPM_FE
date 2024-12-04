<template>
  <div class="dong-gop-container">
    <form @submit.prevent="onSubmit">
      <!-- Tên chiến dịch -->
      <div>
        <span>{{ chienDich.ten }}</span>
      </div>

      <!-- Thông tin chuyển khoản -->
      <div>
        <span>Tên ngân hàng: {{ taiKhoan.tenNganHang }}</span> <br />
        <span>Tên chủ tài khoản: {{ taiKhoan.tenChuTaiKhoan }}</span> <br />
        <span>Số tài khoản: {{ taiKhoan.soTaiKhoan }}</span> <br />
        <span>Swift code: {{ taiKhoan.swiftCode }}</span>
      </div>

      <!-- Số tiền đóng góp -->
      <label for="so-tien-dong-gop">Số tiền đóng góp (VND):</label>
      <input type="number" id="so-tien-dong-gop" v-model="soTien" />

      <!-- Hình ảnh chuyển khoản -->
      <label>Hình ảnh chuyển khoản</label>
      <input class="input-upload" type="file" @change="handleFileUpload" />

      <label for="ghi-chu">Ghi chú:</label>
      <textarea id="ghi-chu" rows="5" v-model="ghiChu"></textarea>

      <!-- Gửi button -->
      <button type="submit">Gửi</button>
    </form>
  </div>
</template>

<script>
import DongGop from "@/models/DongGop";
import dongGopService from "@/services/dongGopService";

import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "DongGop",
  props: ["chienDichProp"],
  setup() {
    const signalR = useSignalR();

    const notification = (user, message) => {
      signalR.invoke("SendMessage", user, message);
    };

    return { notification };
  },
  data() {
    return {
      chienDich: {},
      taiKhoan: {},
      soTien: null,
      hinhAnhData: null,
      ghiChu: "",
    };
  },
  mounted() {
    this.chienDich = JSON.parse(JSON.stringify(this.chienDichProp));
    this.taiKhoan = JSON.parse(JSON.stringify(this.chienDich.taiKhoan));
  },
  watch: {
    chienDichProp(newValue) {
      this.chienDich = JSON.parse(JSON.stringify(newValue));
      this.taiKhoan = JSON.parse(JSON.stringify(newValue.taiKhoan));
    },
  },
  methods: {
    handleFileUpload(event) {
      // Mã hóa hình ảnh thành base64
      const reader = new FileReader();
      reader.onload = (e) => {
        this.hinhAnhData = e.target.result.split(",")[1];
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(`hinhanh = ${this.hinhAnhData}`);
    },
    async onSubmit() {
      // Ngày đóng góp
      const now = new Date();
      const ngayHienTai = now.toISOString();

      // gọi API
      const dongGop = new DongGop({
        idChienDich: this.chienDich.idChienDich,
        ngayDongGop: ngayHienTai,
        soTien: this.soTien,
        hinhAnh: this.hinhAnhData,
        ghiChu: this.ghiChu,
      });

      const isSuccess = await dongGopService.taoDongGop(dongGop);
      if (isSuccess) {
        alert("Gửi đóng góp thành công");
        this.notification("Client", "DongGop");
      } else {
        alert("Gửi đóng góp thất bại");
      }
      console.log(`dongGop = ${JSON.stringify(dongGop)}`);
    },
  },
};
</script>

<style scoped>
.dong-gop-container {
  width: 100%;
  height: 100%;
  padding: 20px;
}
label {
  margin-top: 8px;
}
input {
  width: 100%;
}
.upload-hinh-anh-container {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.input-upload {
  margin-right: 20px;
}
</style>
