export interface User {
    id: number;
    email: string;
    createdAt?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}