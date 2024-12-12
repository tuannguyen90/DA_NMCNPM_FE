import apiClient from "./api";

const xinTaiTro = async (body) => {
  const url = `/XinTaiTro`;
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

const getXinTaiTroById = async (idTaiTro) => {
  const url = `/XinTaiTro/${idTaiTro}`;
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

const tuChoiTaiTro = async (body) => {
  const url = `/XinTaiTro/verifyXinTaiTro`;
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

const duyetTaiTro = async (body) => {
  const url = `/XinTaiTro/verifyXinTaiTro`;
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

const getDanhSachXinTaiTroByNguoiXin = async (userId) => {
  const url = `/XinTaiTro/ByNguoiXin?idNguoiXin=${userId}`;
  try {
    const response = await apiClient.get(url);
    if (response.status == 200 || response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

const getDanhSachXinTaiTroByChienDich = async (idChienDich) => {
  const url = `/XinTaiTro/ByChienDich?idChienDich=${idChienDich}`;
  try {
    const response = await apiClient.get(url);
    if (response.status == 200 || response.status == 201) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

export default {
  xinTaiTro,
  getDanhSachXinTaiTroByNguoiXin,
  getDanhSachXinTaiTroByChienDich,
  tuChoiTaiTro,
  duyetTaiTro,
  getXinTaiTroById,
};
