import apiClient from "./api";
import ChienDich from "@/models/ChienDich";

const getDanhSachChienDich = async () => {
  const url = "/ChienDich";
  try {
    const response = await apiClient.get(url);
    if (response.status == 200) {
      const data = response.data.map(
        (item) =>
          new ChienDich({
            idChienDich: item.idChienDich,
            ten: item.ten,
            noiDung: item.noiDung,
            ngayBatDau: item.ngayBatDau,
            ngayKetThuc: item.ngayKetThuc,
            nganSachDuKien: item.nganSachDuKien,
            thucThu: item.thucThu,
            thucChi: item.thucChi,
            trangThai: item.trangThai,
            idToChuc: item.idToChuc,
            tenToChuc: item.tenToChuc,
            taiKhoan: item.taiKhoan,
          })
      );
      return data;
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

const chinhSuaChienDich = async (chienDich) => {
  const url = `/ChienDich/${chienDich.idChienDich}`;
  try {
    const response = await apiClient.put(url, chienDich);
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  getDanhSachChienDich,
  themMoiChienDich,
  chinhSuaChienDich,
};
