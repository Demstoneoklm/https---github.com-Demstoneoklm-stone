
import api from './api';

export const userService = {
  getCurrentUser: async () => {
    return api.get('/profile'); // Assurez-vous que cette route existe dans votre backend
  },
  // Méthodes pour la gestion des utilisateurs par l'admin
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
