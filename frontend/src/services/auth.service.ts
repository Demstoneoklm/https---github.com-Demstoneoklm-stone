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
    const response = await fetch(`${API_URL}/citizen/login`, {
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

export const registerUser = async (userData: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    department?: string; // Ajouté
    role?: string; // Ajouté
    acceptedTerms: boolean; // Ajouté
}) => {
    const response = await fetch(`${API_URL}/citizen/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json(); // Tente de lire la réponse comme du JSON
        throw new Error(errorData.message || JSON.stringify(errorData) || 'Registration failed');
    }

    return await response.json();
};
