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

const getTop10DongGop = async () => {
  const url = `/DongGops/Top10DongGops`;
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

const getDongGopById = async (idDongGop) => {
  const url = `/DongGops/${idDongGop}`;
  try {
    const response = await apiClient.get(url);
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const verifyDongGop = async (idDongGop) => {
  const url = `/DongGops/verifyDongGop`;
  try {
    const response = await apiClient.put(url, {
      idDongGop: idDongGop,
    });
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
  taoDongGop,
  getDanhSachDongGopByChienDich,
  getDongGopById,
  verifyDongGop,
  getTop10DongGop,
};
