
import api from './api';

export const adminService = {
  getDashboardStats: async () => {
    return api.get('/admin/dashboard/stats');
  },
  getUsers: async () => {
    return api.get('/admin/users');
  },
  createUser: async (userData) => {
    return api.post('/admin/users', userData);
  },
  updateUser: async (id, userData) => {
    return api.put(`/admin/users/${id}`, userData);
  },
  deleteUser: async (id) => {
    return api.delete(`/admin/users/${id}`);
  },
};
