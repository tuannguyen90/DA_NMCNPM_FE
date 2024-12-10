import apiClient from "./api";

const postDanhGia = async (body) => {
  const url = `/PhanHoi`;
  try {
    const response = await apiClient.post(url, body);
    if (response.status == 200 || response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const capNhatDanhGia = async (body) => {
  const url = `/PhanHoi/${body.idPhanHoi}`;
  try {
    const response = await apiClient.put(url, body);
    if (response.status == 200 || response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const getPhanHoiByChienDich = async (idChienDich) => {
  const url = `/PhanHoi/ByChienDich?idChienDich=${idChienDich}`;
  try {
    const response = await apiClient.get(url);
    if (response.status == 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

const getThongKePhanHoiByChienDich = async (idChienDich) => {
  const url = `/PhanHoi/ByChienDich?idChienDich=${idChienDich}`;
  try {
    const response = await apiClient.get(url);
    if (response.status == 200) {
      // Tính trung bình rating
      if (response.data.length == 0) return null;
      var s = 0;
      for (var i = 0; i < response.data.length; i++) {
        s += response.data[i].danhGia;
      }
      const tb = (s / response.data.length).toFixed(1);
      // Trả kết quả
      return {
        danhGia: tb,
        soLuong: response.data.length,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  postDanhGia,
  getPhanHoiByChienDich,
  capNhatDanhGia,
  getThongKePhanHoiByChienDich,
};
