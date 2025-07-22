import { defineStore } from 'pinia';
import type { User, AuthResponse } from '@/interfaces/User.interface';
import { loginUser } from '@/services/auth.service'; // ✅ Retirer registerUser
import { ref } from 'vue'; // Ajout de l'import ref
import { useRouter } from 'vue-router'; // Ajout de l'import useRouter
import axios from 'axios'; // Ajout de l'import axios

// Définition du store d'authentification
export const useAuthStore = defineStore('auth', () => {
    const user = ref<any>(null); // ou utilisez une interface spécifique
    const token = ref<string | null>(localStorage.getItem('token') || null); // Utilisation de ref pour gérer le token
    const router = useRouter() as Router; // Initialisation du routeur

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const response = await axios.post('/api/auth/login', credentials); // Appel API pour le login
            token.value = response.data.token; // Récupération du token
            localStorage.setItem('token', token.value); // Stockage du token
            user.value = response.data.user; // Récupération de l'utilisateur
            router.push('/dashboard'); // Redirection vers le tableau de bord
        } catch (error) {
            console.error('Login failed:', error);
            throw error; // Gestion des erreurs
        }
    };

    const register = async (userData: any) => {
        try {
            const response = await axios.post('/api/auth/register', userData); // Appel API pour l'enregistrement
            return response.data; // Retourne les données de la réponse
        } catch (error) {
            console.error('Registration failed:', error);
            throw error; // Gestion des erreurs
        }
    };

    const logout = () => {
        token.value = null; // Réinitialisation du token
        user.value = null; // Réinitialisation de l'utilisateur
        localStorage.removeItem('token'); // Suppression du token local
        router.push('/login'); // Redirection vers la page de login
    };

    return { user, token, login, register, logout }; // Retourne l'état et les actions
});