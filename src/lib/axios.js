import axios from "axios";

const axiosInstance = axios.create({
  // Menambahkan /api sebagai awalan otomatis untuk semua request
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Wajib true agar browser mengirimkan cookie authToken ke server
  withCredentials: true,
});

export default axiosInstance;
