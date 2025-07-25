// frontend/src/services/auth.service.ts

interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        firstName?: string;
        lastName?: string;
        role?: string;
    };
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const loginUser = async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
    }

    return await response.json() as AuthResponse;
};
