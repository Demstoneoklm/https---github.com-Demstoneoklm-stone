import { defineStore } from 'pinia';
import { leaveService } from '../services/leave.service';

export const useLeaveStore = defineStore('leave', {
  state: () => ({
    requests: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchLeaveRequests() {
      this.loading = true;
      try {
        const response = await leaveService.getLeaveRequests();
        this.requests = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createLeaveRequest(requestData) {
      this.loading = true;
      try {
        const response = await leaveService.createLeaveRequest(requestData);
        this.requests.push(response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async approveLeaveRequest(id) {
      this.loading = true;
      try {
        await leaveService.approveLeaveRequest(id);
        const index = this.requests.findIndex(req => req.id === id);
        if (index !== -1) {
          this.requests[index].status = 'approved';
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async rejectLeaveRequest(id) {
      this.loading = true;
      try {
        await leaveService.rejectLeaveRequest(id);
        const index = this.requests.findIndex(req => req.id === id);
        if (index !== -1) {
          this.requests[index].status = 'rejected';
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deleteLeaveRequest(id) {
      this.loading = true;
      try {
        await leaveService.deleteLeaveRequest(id);
        this.requests = this.requests.filter(req => req.id !== id);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});