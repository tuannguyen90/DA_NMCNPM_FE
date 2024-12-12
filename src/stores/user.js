import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    email: localStorage.getItem("email") || "",
    ten: localStorage.getItem("ten") || "",
    token: localStorage.getItem("token") || "",
    userId: localStorage.getItem("user_id") || "",
    userType: localStorage.getItem("user_type") || "",
    status: localStorage.getItem("status") || -1,
    menu: JSON.parse(localStorage.getItem("menu")) || [],
  }),
  actions: {
    setEmail(email) {
      this.email = email;
      localStorage.setItem("email", email);
    },
    setTen(ten) {
      this.ten = ten;
      localStorage.setItem("ten", ten);
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUserId(userId) {
      this.userId = userId;
      localStorage.setItem("user_id", userId);
    },
    setUserType(userType) {
      this.userType = userType;
      localStorage.setItem("user_type", userType);
    },
    setMenu(menu) {
      this.menu = menu;
      localStorage.setItem("menu", JSON.stringify(menu));
    },
    setStatus(status) {
      this.status = status;
      localStorage.setItem("status", status);
    },
  },
});
