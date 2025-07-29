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

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  department?: string;
  role?: string;
  acceptedTerms: boolean;
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

    const register = async (formData: RegisterForm) => {
        try {
            // On ne passe que les champs nécessaires à registerUser
            const { confirmPassword, ...userDataToSend } = formData;
            const response = await registerUser(userDataToSend);
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