import apiClient from "./api";

const login = async (email, password) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    const authStore = useAuthStore();
    authStore.setToken(response.data.token);
    authStore.setUser(email);
    authStore.setUserId(response.data.user_id);
    return true;
  } catch (error) {
    throw error;
  }
};
