import api from "../apis/configs/axiosConfig";
import { LoginFormData } from "../types";

class AuthService {
  // logging in the user
  async login(formData: LoginFormData) {
    try {
      const response = await api.post("/api/v1/auth/login", formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // logging out the user
  logout() {
    localStorage.removeItem("tokens");
  }
}

export default new AuthService();
