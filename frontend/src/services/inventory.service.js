
import api from './api';

export const inventoryService = {
  getInventoryItems: async () => {
    return api.get('/inventory');
  },
  createInventoryItem: async (itemData) => {
    return api.post('/inventory', itemData);
  },
  updateInventoryItem: async (id, itemData) => {
    return api.put(`/inventory/${id}`, itemData);
  },
  deleteInventoryItem: async (id) => {
    return api.delete(`/inventory/${id}`);
  },
};
