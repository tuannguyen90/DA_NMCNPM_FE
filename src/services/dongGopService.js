import apiClient from "./api";

const taoDongGop = async (dongGop) => {
  const url = "/DongGops";
  try {
    const response = await apiClient.post(url, dongGop);
    if (response.status == 200 || response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const getDanhSachDongGopByChienDich = async (idChienDich) => {
  const url = `/DongGops/ByChienDich?idChienDich=${idChienDich}`;
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

export default {
  taoDongGop,
  getDanhSachDongGopByChienDich,
};
