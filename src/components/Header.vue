<template>
  <div class="container">
    <div class="title">
      <div>{{ title }}</div>
    </div>
    <div class="profile">
      <span>{{ userEmail }}&nbsp&nbsp</span>
      <i class="fa-solid fa-user"></i>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user";
export default {
  name: "Header",
  props: ["title"],
  data() {
    return {
      userEmail: "",
    };
  },
  mounted() {
    this.userEmail = useUserStore().email;
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.title {
  font-size: xx-large;
  font-weight: 700;
}
</style>
