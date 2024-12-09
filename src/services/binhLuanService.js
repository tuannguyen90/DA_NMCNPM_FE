import apiClient from "./api";

const postBinhLuan = async (binhLuan) => {
  const url = `/BinhLuan`;

  try {
    const response = await apiClient.post(url, binhLuan);
    if (response.status == 200 || response.status == 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

const getDanhSachBinhLuan = async (idBanTin) => {
  const url = `/BinhLuan/ByBanTin?idBanTin=${idBanTin}`;
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

export default { postBinhLuan, getDanhSachBinhLuan };
