<template>
  <div class="container">
    <div class="title">
      <div>{{ title }}</div>
    </div>
    <div class="profile" @click="toggleDropdown">
      <span id="user-email">{{ userEmail }}&nbsp;&nbsp;</span>
      <i class="fa-solid fa-user"></i>
      <!-- Dropdown Menu -->
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <a v-if="!userEmail" href="#" @click.prevent="dangNhap">Đăng nhập</a>
        <a v-else href="#" @click.prevent="DangXuat">Đăng xuất</a>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
import router from "@/router";

export default {
  name: "Header",
  props: ["title"],
  data() {
    return {
      userEmail: "",
      isDropdownOpen: false, // Trạng thái mở/đóng dropdown
    };
  },
  mounted() {
    this.userEmail = useUserStore().email;
    document.addEventListener("click", this.closeDropdownOnOutsideClick); // Đóng menu khi click bên ngoài
  },
  beforeUnmount() {
    document.removeEventListener("click", this.closeDropdownOnOutsideClick);
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen; // Chuyển đổi trạng thái dropdown
    },
    closeDropdownOnOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    dangNhap() {
      router.push("/dang-nhap");
    },
    async DangXuat() {
      router.push("/dang-nhap");
    },
  },
};</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.title {
  font-size: xx-large;
  font-weight: 700;
}

.profile {
  position: relative; /* Đặt vị trí để định vị dropdown */
  cursor: pointer;
}

#user-email {
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* Xuất hiện ngay bên dưới icon */
  right: 0;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #eee;
  overflow: hidden;
  z-index: 1000;
  min-width: 150px;
}

.dropdown-menu a {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.3s;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
}

@media (max-width: 768px) {
  .title {
    font-size: x-large;
    font-weight: 700;
  }
  #user-email {
    display: none;
  }
}

</style>