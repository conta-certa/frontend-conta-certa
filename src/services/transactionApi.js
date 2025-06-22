import axios from "axios";
import { authApi } from "./authApi";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/transactions`,
});

api.interceptors.request.use((config) => {
  const token = authApi.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const transactionApi = {
  getAll() {
    return api.get("/");
  },

  getById(id) {
    return api.get(`/${id}`);
  },

  getByDateRange(startDate, endDate) {
    return api.get(`/by-date`, { params: { startDate, endDate } });
  },

  create({ amount, type, description, categoryId, date }) {
    return api.post("/", {
      amount,
      type,
      description,
      categoryId,
      date,
    });
  },

  update(id, { amount, type, description, categoryId, date }) {
    return api.put(`/${id}`, {
      amount,
      type,
      description,
      categoryId,
      date,
    });
  },

  delete(id) {
    return api.delete(`/${id}`);
  },
};
