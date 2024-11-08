<template>
  <div class="menu-container">
    <div class="header">
      <!-- Logo -->
    </div>
    <!-- Menu chính -->
    <ul class="menu">
      <li
        v-for="item in menuItems"
        :key="item.title"
        @click="navigate(item)"
        :class="{ active: currentPath === item.path }"
      >
        <i :class="item.icon"></i>
        <span class="menu-title">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Menu",
  data() {
    return {
      menuItems: [
        {
          title: "Theo dõi báo cáo",
          icon: "fa-solid fa-house",
          path: "/theo-doi-bao-cao",
        },
        {
          title: "Đóng góp",
          icon: "fa-solid fa-hand-holding-hand",
          path: "#",
        },
        {
          title: "Quản lý chiến dịch",
          icon: "fa-solid fa-paper-plane",
          path: "/quan-ly-chien-dich",
        },
        {
          title: "Bản đồ",
          icon: "fa-solid fa-map",
          path: "#",
        },
        {
          title: "Bản tin",
          icon: "fa-solid fa-square-rss",
          path: "#",
        },
        {
          title: "Xác thực giấy phép",
          icon: "fa-solid fa-certificate",
          path: "/xac-thuc-giay-phep",
        },
        {
          title: "Đăng xuất",
          icon: "fa-solid fa-right-from-bracket",
          path: "#",
        },
      ],
      currentPath: null,
    };
  },
  methods: {
    navigate(item) {
      router.push(item.path);
    },
  },
  mounted() {
    const currentPath = this.$router.currentRoute.value.path;
    this.currentPath = currentPath;
  },
};
</script>

<style scoped>
.menu-container {
  height: 100%;
  width: 100%;
  background-color: #fff;
  border-right: 1px solid #ddd;
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
.menu {
  width: 100%;
  flex-grow: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}
.menu li {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}
.menu li:hover {
  background-color: #f9f9f9;
}
.menu li.active {
  background-color: #007bff;
  color: #fff;
}
.menu-title {
  margin-left: 10px;
  font-size: 16px;
  flex-grow: 1;
  display: inline-block;
}
</style>
