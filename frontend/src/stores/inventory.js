import { defineStore } from 'pinia';
import { inventoryService } from '../services/inventory.service';

export const useInventoryStore = defineStore('inventory', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchInventoryItems() {
      this.loading = true;
      try {
        const response = await inventoryService.getInventoryItems();
        this.items = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createInventoryItem(itemData) {
      this.loading = true;
      try {
        const response = await inventoryService.createInventoryItem(itemData);
        this.items.push(response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateInventoryItem(id, itemData) {
      this.loading = true;
      try {
        const response = await inventoryService.updateInventoryItem(id, itemData);
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
          this.items[index] = response.data;
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deleteInventoryItem(id) {
      this.loading = true;
      try {
        await inventoryService.deleteInventoryItem(id);
        this.items = this.items.filter(item => item.id !== id);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});