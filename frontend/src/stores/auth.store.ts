import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user') || 'null'),
        error: null, // Pour stocker les messages d'erreur
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        isAdmin: (state) => state.user?.role === 'admin',
        isCitizen: (state) => state.user?.role === 'user',
    },
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUser(user: any) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        clearAuthData() {
            this.token = null;
            this.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        async register(email, password, firstName, lastName, acceptedTerms) {
            this.error = null; // Réinitialiser l'erreur
            try {
                const response = await axios.post('http://localhost:3001/api/citizen/register', {
                    email,
                    password,
                    firstName,
                    lastName,
                    acceptedTerms,
                });
                this.setToken(response.data.token);
                this.setUser(response.data.user);
                return response.data; // Retourner les données de la réponse
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Erreur lors de l\'inscription.';
                throw error; // Propager l'erreur pour que le composant puisse la gérer
            }
        },
        async login(email, password) {
            this.error = null; // Réinitialiser l'erreur
            try {
                const response = await axios.post('http://localhost:3001/api/citizen/login', {
                    email,
                    password,
                });
                this.setToken(response.data.token);
                this.setUser(response.data.user);
                return response.data; // Retourner les données de la réponse
            } catch (error: any) {
                this.error = error.response?.data?.message || 'Erreur lors de la connexion.';
                throw error; // Propager l'erreur pour que le composant puisse la gérer
            }
        },
    },
});