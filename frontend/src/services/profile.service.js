
import api from './api';

export const profileService = {
  getUserProfile: async () => {
    return api.get('/profile');
  },
  updateUserProfile: async (profileData) => {
    return api.put('/profile', profileData);
  },
  getUserRequests: async () => {
    return api.get('/profile/requests');
  },
  createUserRequest: async (requestData) => {
    return api.post('/profile/requests', requestData);
  },
};
