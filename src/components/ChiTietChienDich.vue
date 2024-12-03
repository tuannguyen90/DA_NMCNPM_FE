<template>
  <div class="container">
    <!-- Tiêu đề -->
    <div class="tieu-de">Chi tiết chiến dịch</div>

    <!-- Tên -->
    <div class="item">
      <div class="title">Tên chiến dịch:</div>
      <div class="content">{{ chienDich.ten }}</div>
    </div>

    <!-- Tổ chức từ thiện -->
    <div class="item">
      <div class="title">Tổ chức từ thiện:</div>
      <div class="content">{{ chienDich.idToChuc }}</div>
    </div>

    <!-- Mô tả -->
    <div class="item">
      <div class="title">Mô tả:</div>
      <div class="content">{{ chienDich.noiDung }}</div>
    </div>

    <!-- Ngày bắt đầu -->
    <div class="item">
      <div class="title">Ngày bắt đầu:</div>
      <div class="content">{{ chienDich.ngayBatDau }}</div>
    </div>

    <!-- Ngày kết thúc -->
    <div class="item">
      <div class="title">Ngày kết thúc:</div>
      <div class="content">{{ chienDich.ngayKetThuc }}</div>
    </div>

    <!-- Ngân sách dự kiến -->
    <div class="item">
      <div class="title">Ngân sách dự kiến:</div>
      <div class="content">{{ chienDich.nganSachDuKien }}</div>
    </div>

    <!-- Thực thu -->
    <div class="item">
      <div class="title">Thực thu:</div>
      <div class="content">{{ chienDich.thucThu }}</div>
    </div>

    <!-- Trạng thái -->
    <div class="item">
      <div class="title">Trạng thái:</div>
      <div>
        <TrangThaiChienDich :TrangThai="chienDich.trangThai" />
      </div>
    </div>
  </div>
</template>

<script>
import TrangThaiChienDich from "./TrangThaiChienDich.vue";

export default {
  name: "ChiTietChienDich",
  components: {
    TrangThaiChienDich,
  },
  props: ["chienDich"],
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  margin: 16px;
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
</style>
