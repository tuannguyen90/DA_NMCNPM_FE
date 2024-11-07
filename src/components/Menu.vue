<template>
  <div class="menu-container">
    <div class="header">Logo</div>
    <div class="menu-list">
      <div class="menu-item">
        <div class="menu-item-leading">Icon</div>
        <div class="menu-item-content">
          <a href="/theo-doi-bao-cao">Theo dõi & Báo cáo</a>
        </div>
        <div class="menu-item-trailing">Icon</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-leading">Icon</div>
        <div class="menu-item-content">
          <a href="#">Đóng góp</a>
        </div>
        <div class="menu-item-trailing">Icon</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-leading">Icon</div>
        <div class="menu-item-content">
          <a href="/quan-ly-chien-dich">Quản lý chiến dịch</a>
        </div>
        <div class="menu-item-trailing">Icon</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-leading">Icon</div>
        <div class="menu-item-content">
          <a href="#">Bản đồ</a>
        </div>
        <div class="menu-item-trailing">Icon</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-leading">Icon</div>
        <div class="menu-item-content">
          <a href="#">Bản tin</a>
        </div>
        <div class="menu-item-trailing">Icon</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-leading">Icon</div>
        <div class="menu-item-content">
          <a href="#">Xác thực giấy phép</a>
        </div>
        <div class="menu-item-trailing">Icon</div>
      </div>
      <div class="menu-item">
        <div class="menu-item-leading">Icon</div>
        <div class="menu-item-content">
          <a href="/dang-nhap">Đăng xuất</a>
        </div>
        <div class="menu-item-trailing">Icon</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<style scoped>
.menu-container {
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.header {
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
.menu-item {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.menu-item-leading {
  display: none;
}
.menu-item-trailing {
  display: none;
}
.menu-item-content {
  margin: 0 8px;
}
</style>
