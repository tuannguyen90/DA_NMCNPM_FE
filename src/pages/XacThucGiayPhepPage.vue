<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <button @click.prevent="uploadImage">Upload Image</button>
  </div>
</template>

<script>
import authService from "@/services/authService";

export default {
  name: "XacThucGiayPhepPage",
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadImage() {
      // Kiểm tra điều kiện
      if (!this.selectedFile) {
        alert("Vui lòng chọn 1 hình ảnh");
        return;
      }

      // Gọi API
      try {
        const isSuccess = await authService.submitPaperAPI(this.selectedFile);
        if (isSuccess) {
          alert("Upload thành công!");
        } else {
          alert("Upload thất bại");
        }
      } catch (error) {
        console.log(`upload lỗi: ${error}`);
      }
    },
  },
};
</script>

<style scoped></style>
