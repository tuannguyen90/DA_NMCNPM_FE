<template>
  <HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Xác thực giấy phép" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <div class="xac-thuc-giay-phep-container">
        <!-- Trạng thái giấy phép -->

        <!-- Hình ảnh giấy phép -->
        <div>
          <div>
            <span style="font-size: large; font-weight: 700"
              >Hình ảnh giấy phép:</span
            >
          </div>
          <img
            :src="imageData"
            alt="Giấy phép"
            style="max-width: 300px; margin-top: 8px"
            @click="openModal"
          />
        </div>

        <!-- Modal hiển thị hình ảnh -->
        <div v-if="isModalOpen" class="modal" @click.self="closeModal">
          <span class="close" @click="closeModal">&times;</span>
          <img :src="imageData" alt="Full Image" />
        </div>

        <!-- Cập nhật hình ảnh -->
        <div style="margin-top: 16px">
          <span style="font-size: large; font-weight: 700"
            >Cập nhật giấy phép:</span
          >
        </div>
        <div class="upload-hinh-anh-container">
          <input class="input-upload" type="file" @change="handleFileUpload" />
          <button @click.prevent="uploadImage">Upload Image</button>
        </div>
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
      imageData: null,
      isModalOpen: false,
    };
  },
  mounted() {
    this.getImage();
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async getImage() {
      try {
        const imageData = await authService.getPaperAPI();

        let byteData = new Uint8Array(imageData);
        let base64String = this.byteArrayToBase64(byteData);
        this.imageData = `data:image/jpeg;base64,${base64String}`;

        console.log(this.imageData);
      } catch (err) {
        console.log(`tải ảnh lỗi: ${err}`);
      }
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
    byteArrayToBase64(byteArray) {
      let binaryString = "";
      for (let i = 0; i < byteArray.length; i++) {
        binaryString += String.fromCharCode(byteArray[i]);
      }
      return btoa(binaryString);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
  },
};
</script>

<style scoped>
.xac-thuc-giay-phep-container {
  margin: 20px;
}
.upload-hinh-anh-container {
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}
.input-upload {
  margin-right: 20px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-content {
  max-width: 80%;
  max-height: 80%;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  color: white;
  cursor: pointer;
}
</style>
