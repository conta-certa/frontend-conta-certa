import axios from 'axios';
import { authApi } from './authApi';

const API_URL = import.meta.env.VITE_API_URL;

// Cria uma instância do axios com o token
const api = axios.create({
  baseURL: `${API_URL}/users`,
});

// Intercepta e insere o token automaticamente nas requisições protegidas
api.interceptors.request.use((config) => {
  const token = authApi.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userApi = {
  getAll() {
    return api.get('/');
  },

  getById(id) {
    return api.get(`/${id}`);
  },

  create({ name, email, password, phone }) {
    return api.post('/', { name, email, password, phone });
  },

  update(id, { name, phone }) {
    return api.put(`/${id}`, { name, phone });
  },

  delete(id) {
    return api.delete(`/${id}`);
  },

  uploadAvatar(file) {
    const formData = new FormData();
    formData.append('avatar', file);

    return api.post('/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
