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
            taiKhoan: item.taiKhoan,
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

const getDanhSachChienDich = async () => {
  const url = "/ChienDich";
  try {
    const response = await apiClient.get(url);
    if (response.status == 200) {
      return response.data.map(
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
      return [];
    }
  } catch (error) {
    throw error;
  }
};

const themMoiChienDich = async (chienDich) => {
  const url = "/ChienDich";
  try {
    const response = await apiClient.post(url, chienDich);
    if (response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  getDanhSachChienDich_Sample,
  getDanhSachChienDich,
  themMoiChienDich,
};
