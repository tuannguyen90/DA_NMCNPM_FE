<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Xác thực giấy phép" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <div class="upload-hinh-anh-container">
        <input class="input-upload" type="file" @change="handleFileUpload" />
        <button @click.prevent="uploadImage">Upload Image</button>
      </div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary> </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from "@/components/HomeLayout.vue";
import Header from "@/components/Header.vue";

import authService from "@/services/authService";

export default {
  name: "XacThucGiayPhepPage",
  components: {
    HomeLayout,
    Header,
  },
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

<style scoped>
.upload-hinh-anh-container {
  margin: 20px;
  display: flex;
  flex-direction: row;
}
.input-upload {
  margin-right: 20px;
}
</style>
