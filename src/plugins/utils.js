export default {
  install(app) {
    app.config.globalProperties.$formatCurrency = (value) => {
      if (!value || value == 0) return "0";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
  },
};
