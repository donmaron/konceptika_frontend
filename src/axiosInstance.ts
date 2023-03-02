import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://km-rekrutacja.atwebpages.com/api/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
