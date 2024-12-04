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
import { useUserStore } from "@/stores/user";

export default {
  name: "Menu",
  data() {
    return {
      menuItems: useUserStore().menu,
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
  padding: 16px;
  margin: 0;
}
.menu li {
  width: 100%;
  border-radius: 16px;
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

@media (max-width: 768px) {
  .menu-title {
    display: none;
  }
}
</style>
