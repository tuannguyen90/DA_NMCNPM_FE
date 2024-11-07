import apiClient from "./api";
import axios from "axios";
import ChienDich from "@/models/ChienDich";

import data from "@/assets/sample/danh-sach-chien-dich.json";

const getDanhSachChienDich_Sample = async () => {
  try {
    // Check if data is an array
    if (Array.isArray(data)) {
      // Map JSON
      return data.map(
        (item) =>
          new ChienDich({
            idChienDich: item.IDChienDich,
            ten: item.Ten,
            noiDung: item.NoiDung,
            ngayBatDau: item.NgayBatDau,
            ngayKetThuc: item.NgayKetThuc,
            nganSachDuKien: item.NganSachDuKien,
            thucThu: item.ThucThu,
            thucChi: item.ThucChi,
            trangThai: item.TrangThai,
            idToChuc: item.IDToChuc,
          })
      );
    } else {
      console.error("Dữ liệu không phải là một mảng:", data);
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export default {
  getDanhSachChienDich_Sample,
};
