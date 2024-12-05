export default {
  install(app) {
    app.config.globalProperties.$formatCurrency = (value) => {
      if (!value) return "";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
  },
};
