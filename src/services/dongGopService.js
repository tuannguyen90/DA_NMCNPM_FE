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

export default {
  taoDongGop,
};
