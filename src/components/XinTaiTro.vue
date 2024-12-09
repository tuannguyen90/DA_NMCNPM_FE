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
            <td>{{ chienDich.ngayBatDau }}</td>
          </tr>
          <tr>
            <th>Ngày kết thúc:</th>
            <td>{{ chienDich.ngayKetThuc }}</td>
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
    <div class="xin-tai-tro-form modal" v-if="isFormOpen">
      <span class="close" @click="closeForm">&times;</span>
      <div class="modal-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "XinTaiTro",
  props: ["chienDich"],
  data() {
    return {
      isFormOpen: false,
    };
  },
  methods: {
    openForm() {
      this.isFormOpen = true;
    },
    closeForm() {
      this.isFormOpen = false;
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
</style>
