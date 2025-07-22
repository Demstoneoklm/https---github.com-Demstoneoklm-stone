import type { AuthResponse } from '@/interfaces/User.interface';

console.log('Variables env:', import.meta.env); // Vérifiez dans la console
const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:3000/api';

export const loginUser = async (
    credentials: { email: string; password: string }
): Promise<AuthResponse> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return await response.json();
};
