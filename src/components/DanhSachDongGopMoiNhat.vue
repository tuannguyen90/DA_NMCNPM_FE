<template>
  <div class="danh-sach-dong-gop-moi-nhat">
    <span style="font-size: x-large; font-weight: 700"
      >Top 10 đóng góp mới nhất</span
    >
    <table>
      <tr>
        <th>STT</th>
        <th>Họ tên</th>
        <th>Chiến dịch</th>
        <th>Số tiền</th>
        <th>Thời gian</th>
      </tr>
      <tr v-for="(dongGop, index) in danhSachDongGopMoiNhat" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ dongGop.tenNguoiChuyen }}</td>
        <td>{{ dongGop.tenChienDich }}</td>
        <td>{{ dongGop.soTien }}</td>
        <td>{{ dongGop.ngayDongGop }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import dongGopService from "@/services/dongGopService";

import { useSignalR } from "@dreamonkey/vue-signalr";

export default {
  name: "DanhSachDongGopMoiNhat",
  data() {
    return {
      danhSachDongGopMoiNhat: [],
    };
  },
  setup() {
    // Nhận thông tin real-time
    const signalR = useSignalR();

    return {
      signalR,
    };
  },
  mounted() {
    this.getDanhSachDongGopMoiNhat();
    this.signalR.on("ReceiveMessage", async (user, message) => {
      if (message == "DongGop") {
        this.getDanhSachDongGopMoiNhat();
      }
    });
  },
  methods: {
    async getDanhSachDongGopMoiNhat() {
      try {
        this.danhSachDongGopMoiNhat = await dongGopService.getTop10DongGop();
        console.log(JSON.stringify(this.danhSachDongGopMoiNhat));
      } catch (error) {}
    },
  },
};
</script>

<style>
.danh-sach-dong-gop-moi-nhat {
  padding: 16px;
}
</style>
