import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const authApi = {
  async login(email, password) {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token, user } = response.data;

    // Salva o token no localStorage
    localStorage.setItem('token', token);

    return { token, user };
  },

  logout() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};
