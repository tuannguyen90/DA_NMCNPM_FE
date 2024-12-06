<template>
<HomeLayout>
    <!-- Header -->
    <template v-slot:header>
      <Header title="Quản lý giấy phép" />
    </template>

    <!-- Main -->
    <template v-slot:main>
      <div class="quan-ly-giay-phep-container">
        <table>
        <thead>
            <th>STT</th>
            <th>Tên Tổ Chức</th>
            <th>Trạng thái giấy phép</th>
            <th>Hình ảnh</th>
        </thead>
        <tbody>
            <tr v-for="(nguoiDung, index) in danhSachNguoiDung" key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ nguoiDung.tenDayDu }}</td>
                <td><TrangThaiGiayPhep :TrangThai="nguoiDung.trangThai"
                @xacThucGiayPhep="duyetGiayPhep(nguoiDung.idnguoiDung)"
                    /></td>
                <td><a href="#" @click.prevent="moHinhAnhGiayPhep(nguoiDung.giayPhep)">Hình ảnh</a></td>
            </tr>
        </tbody>
      </table>

      <!-- Hình ảnh giấy phép -->
      <transition name="fade">
        <div class="modal" v-if="hinhAnhGiayPhep">
          <span class="close" @click="closeHinhAnhGiayPhep">&times;</span>
          <img
            :src="hinhAnhGiayPhep"
            alt="hinh-anh-giay-phep"
            class="modal-content"
          /></div
      ></transition>
      </div>
    </template>

    <!-- Secondary -->
    <template v-slot:secondary>
      
    </template>
  </HomeLayout>
</template>

<script>
import HomeLayout from '@/components/HomeLayout.vue';
import Header from '@/components/Header.vue';
import TrangThaiGiayPhep from '@/components/TrangThaiGiayPhep.vue';

import authService from '@/services/authService';

import Swal from 'sweetalert2';

export default {
    name: "QuanLyGiayPhepPage",
    components: {
        HomeLayout,
        Header,
        TrangThaiGiayPhep,
    },
    data() {
        return {
            danhSachNguoiDung: [],
            hinhAnhGiayPhep: null
        };
    },
    mounted() {
        this.getAllNguoiDung()
    },
    methods: {
        async getAllNguoiDung() {
            try {
                const result = await authService.getAllNguoiDung();
                this.danhSachNguoiDung = result.filter(e => (e.loai == 3));
            }catch (error) {
                alert(error);
            }
        },
        async duyetGiayPhep(idToChuc) {
            const confirm = await Swal.fire({
                title: "Thông báo",
                text: "Bạn chắc chắn muốn duyệt giấy phép này?",
                icon: "warning",
                confirmButtonText: "Đồng ý",
                showCancelButton: true,
                cancelButtonText: "Hủy",
            });
            if (confirm.isConfirmed) {
                try {
                    const isSuccess = await authService.verifyGiayPhep(idToChuc);
                    if (isSuccess) {
                        await Swal.fire("Thông báo", "Duyệt giấy phép thành công", "success");
                        this.getAllNguoiDung();
                    }else {
                        await Swal.fire("Thông báo", "Đã có lỗi xảy ra", "error");
                    }
                }catch (error) {
                    alert(error);
                }
            }            
            
        },
        moHinhAnhGiayPhep(hinhAnh) {
            this.hinhAnhGiayPhep = `data:image/jpeg;base64,${hinhAnh}`;            
        },
        closeHinhAnhGiayPhep() {
            this.hinhAnhGiayPhep = null;
        }
    }
}
</script>

<style scoped>
.quan-ly-giay-phep-container {
    padding: 16px;
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
  padding: 4px;
  font-size: 50px;
  color: white;
  cursor: pointer;
}
</style>