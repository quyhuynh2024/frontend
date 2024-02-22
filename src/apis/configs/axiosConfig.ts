import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

const conf: AxiosRequestConfig = {
  // withCredentials: true, // cookie based
  baseURL: "http://localhost:5000",
};

const api: AxiosInstance = axios.create(conf);

/* token based */
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = JSON.parse(localStorage.getItem("tokens"));
  config.headers.Authorization = `Bearer ${token?.accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 401 ||
      error.response.data.msg === "jwt expired"
    ) {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const payload = {
        refreshToken: tokens.refreshToken,
      };

      const apiResponse = await api.post("/api/v1/auth/refresh-token", payload);
      localStorage.setItem("tokens", JSON.stringify(apiResponse.data));

      error.config.headers.Authorization = `Bearer ${apiResponse.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
