
import api from './api';

export const authService = {
  login: async (email, password) => {
    return api.post('/citizen/login', { email, password });
  },
  register: async (firstName, lastName, email, password) => {
    return api.post('/citizen/register', { firstName, lastName, email, password });
  },
  logout: async () => {
    return api.post('/auth/logout');
  },
};
