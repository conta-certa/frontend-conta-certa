import axios from "axios";
import { authApi } from "./authApi";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/categories`,
});

api.interceptors.request.use((config) => {
  const token = authApi.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const categoryApi = {
  getAll() {
    return api.get("/");
  },

  getById(id) {
    return api.get(`/${id}`);
  },

  create({ name }) {
    return api.post("/", { name });
  },

  update(id, { name }) {
    return api.put(`/${id}`, { name });
  },

  delete(id) {
    return api.delete(`/${id}`);
  },
};
