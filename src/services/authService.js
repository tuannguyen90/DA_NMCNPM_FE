import apiClient from "./api";
import { useUserStore } from "@/stores/user";

const registerAPI = async (
  email,
  matKhau,
  tenDayDu,
  diaChi,
  dienThoai,
  loai
) => {
  try {
    const response = await apiClient.post("/NguoiDung/register", {
      Email: email,
      TenDangNhap: email,
      TenDayDu: tenDayDu,
      MatKhau: matKhau,
      DiaChi: diaChi,
      DienThoai: dienThoai,
      Loai: loai,
    });

    console.log(response.status);
    if (response.status == 201) {
      return response.data.token;
    } else {
      return null;
    }
  } catch (error) {
    throw error.response.data.msg;
  }
};

const verifyOTP = async (code, soDienThoai) => {
  try {
    const response = await apiClient.put("/NguoiDung/verifyOtp", {
      code: code,
      dienThoai: soDienThoai,
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

const loginAPI = async (email, password) => {
  try {
    const response = await apiClient.post("/NguoiDung/login", {
      email: email,
      matkhau: password,
    });

    if (response.status == 200) {
      return {
        user_id: response.data.nguoiDungId,
        user_type: response.data.loai,
        user_token: response.data.token,
        status: response.data.status,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log(`loi : ${error}`);

    throw error;
  }
};

const getPaperAPI = async () => {
  // Lấy userId
  const userStore = useUserStore();
  const userId = userStore.userId;

  // endpoint
  // const endpoint = `/NguoiDung/${userId}/downloadPaper`;
  const endpoint = `/NguoiDung/${userId}/downloadPaper`;

  // Gọi API
  try {
    const response = await apiClient.get(endpoint, {
      responseType: "arraybuffer",
    });
    if (response.status == 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

const submitPaperAPI = async (file) => {
  // Lấy userId
  const userStore = useUserStore();
  const userId = userStore.userId;

  // Tạo formData
  const formData = new FormData();
  formData.append("file", file);

  // endpoint
  // const endpoint = `/NguoiDung/${userId}/submitPaper`;
  const endpoint = `/NguoiDung/submitPaper`;

  // Gọi API
  try {
    const response = await apiClient.put(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

const getAllNguoiDung = async () => {
  const url = "/NguoiDung/";

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

const verifyGiayPhep = async (idToChuc) => {
  const url = `/NguoiDung/${idToChuc}/VerifyPaper`;
  try {
    const response = await apiClient.put(url, {
      id: idToChuc,
    });
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
  registerAPI,
  verifyOTP,
  loginAPI,
  getPaperAPI,
  submitPaperAPI,
  getAllNguoiDung,
  verifyGiayPhep,
};
