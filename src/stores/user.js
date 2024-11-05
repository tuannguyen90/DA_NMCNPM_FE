import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    email: localStorage.getItem("email") || "",
    ten: localStorage.getItem("ten") || "",
    token: localStorage.getItem("token") || "",
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
  },
});
