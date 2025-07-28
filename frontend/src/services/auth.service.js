
import api from './api';

export const authService = {
  login: async (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  register: async (firstName, lastName, email, password) => {
    return api.post('/auth/register', { firstName, lastName, email, password });
  },
  logout: async () => {
    return api.post('/auth/logout');
  },
};
