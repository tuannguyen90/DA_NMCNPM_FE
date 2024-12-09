export default {
  install(app) {
    app.config.globalProperties.$formatCurrency = (value) => {
      if (!value || value == 0) return "0";
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    app.config.globalProperties.$formatDateTime = (dateTimeString) => {
      if (!dateTimeString) return "";
      const date = new Date(dateTimeString);

      const pad = (num) => (num < 10 ? `0${num}` : num);

      const day = pad(date.getDate());
      const month = pad(date.getMonth() + 1);
      const year = date.getFullYear();

      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
  },
};
