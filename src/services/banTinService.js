import apiClient from "./api";

const getDanhSachBanTin = async () => {
  const url = "/BanTin";
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

const taoBanTin = async (banTin) => {
  const url = "/BanTin";
  try {
    const response = await apiClient.post(url, banTin);
    if (response.status == 200 || response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const capNhatBanTin = async (banTin) => {
  const url = `/BanTin/${banTin.idbanTin}`;
  try {
    const response = await apiClient.put(url, banTin);
    if (response.status == 200 || response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  taoBanTin,
  capNhatBanTin,
  getDanhSachBanTin,
};
