import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { loginUser, registerUser } from '@/services/auth.service';

interface User {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref(localStorage.getItem('token') || '');

    const login = async (credentials: { email: string; password: string }) => {
        try {
            const response = await loginUser(credentials);
            token.value = response.token;
            user.value = response.user;
            localStorage.setItem('token', token.value);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (credentials: { email: string; password: string }) => {
        try {
            const response = await registerUser(credentials);
            token.value = response.token;
            user.value = response.user;
            localStorage.setItem('token', token.value);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
            return response;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        user.value = null;
        token.value = '';
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return { user, token, login, register, logout };
});
