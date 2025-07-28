import { defineStore } from 'pinia';
import { authService } from '../services/auth.service';
import { userService } from '../services/users.service'; // Pour récupérer les infos utilisateur

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null, // Le token est géré par les cookies HTTP-only, pas besoin de le stocker ici
    isAuthenticated: false,
  }),
  getters: {
    // isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    async login(email, password) {
      try {
        const response = await authService.login(email, password);
        // Le token est dans un cookie HTTP-only, pas besoin de le récupérer de la réponse
        this.isAuthenticated = true;
        await this.fetchUser(); // Récupérer les infos utilisateur après connexion (utilisera le cookie)
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
        this.token = null; // Réinitialiser le token (même si non utilisé directement)
        this.isAuthenticated = false;
        localStorage.removeItem('accessToken'); // Supprimer si jamais il y en avait un
        // Supprimer d'autres éléments du localStorage si nécessaire
      }
    },
    async fetchUser() {
      // Pas besoin de vérifier this.token ici, car il est géré par les cookies
      // La requête à /profile échouera si le cookie n'est pas présent ou est invalide
      try {
        console.log('fetchUser: Attempting to get current user...');
        const response = await userService.getCurrentUser(); // Cette requête enverra le cookie
        console.log('fetchUser: Response from getCurrentUser:', response.data);
        this.user = response.data;
        this.isAuthenticated = true;
        console.log('fetchUser: User and isAuthenticated updated.');
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur dans fetchUser:', error);
        this.logout(); // Déconnexion si le cookie est invalide ou expiré
        console.log('fetchUser: Logout called due to error.');
      }
    },

  },
});