import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    department: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref(localStorage.getItem('token') || '');

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const response = await axios.post('/api/auth/login', credentials);
            token.value = response.data.token;
            localStorage.setItem('token', token.value);
            user.value = response.data.user;
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    // ... (le reste du code reste identique)
});