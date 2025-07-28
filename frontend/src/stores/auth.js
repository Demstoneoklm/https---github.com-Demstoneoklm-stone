import { defineStore } from 'pinia';
import { authService } from '../services/auth.service';
import { userService } from '../services/users.service'; // Pour récupérer les infos utilisateur

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('accessToken') || null,
    isAuthenticated: false,
  }),
  getters: {
    // isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    async login(email, password) {
      try {
        const response = await authService.login(email, password);
        this.token = response.data.accessToken;
        localStorage.setItem('accessToken', this.token);
        this.isAuthenticated = true;
        await this.fetchUser(); // Récupérer les infos utilisateur après connexion
        return response.data;
      } catch (error) {
        this.logout(); // Déconnexion en cas d'échec de connexion
        throw error;
      }
    },
    async register(firstName, lastName, email, password) {
      try {
        const response = await authService.register(firstName, lastName, email, password);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async logout() {
      try {
        await authService.logout();
      } finally {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        localStorage.removeItem('accessToken');
        // Supprimer d'autres éléments du localStorage si nécessaire
      }
    },
    async fetchUser() {
      if (!this.token) {
        this.user = null;
        this.isAuthenticated = false;
        return;
      }
      try {
        const response = await userService.getCurrentUser(); // Assurez-vous que ce service existe
        this.user = response.data;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        this.logout(); // Déconnexion si le token est invalide ou expiré
      }
    },
  },
});
