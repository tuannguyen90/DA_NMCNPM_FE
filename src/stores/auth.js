import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    email: localStorage.getItem("email") || "",
    ten: localStorage.getItem("ten") || "",
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
  },
});
