// src/types/auth.d.ts
export interface RegisterForm {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    department: string;
    role: string;
    acceptedTerms: boolean;
}
