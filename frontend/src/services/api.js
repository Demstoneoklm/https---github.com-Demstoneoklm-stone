
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important pour les cookies (JWT)
});

// Intercepteur pour gérer les erreurs de token expiré ou invalide
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Si l'erreur est 401 (Unauthorized) et que ce n'est pas la requête de login
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Tenter de rafraîchir le token ou rediriger vers la page de connexion
      // Pour l'instant, on redirige simplement
      console.error('Token expiré ou invalide. Redirection vers la page de connexion.');
      // Rediriger vers la page de connexion
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;
