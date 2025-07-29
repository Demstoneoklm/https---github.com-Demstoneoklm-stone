import { z } from 'zod';

export const registerSchema = z.object({
    email: z
        .string()
        .email('Format d\'email invalide')
        .min(1, 'L\'email est requis'),
    password: z
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .max(100, 'Le mot de passe ne peut pas dépasser 100 caractères'),
    firstName: z
        .string()
        .min(1, 'Le prénom est requis')
        .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
        .trim(),
    lastName: z
        .string()
        .min(1, 'Le nom est requis')
        .max(50, 'Le nom ne peut pas dépasser 50 caractères')
        .trim(),
    department: z
        .enum(['hr', 'finance', 'it', 'operations', 'other'])
        .optional(), // Rendre optionnel si non toujours requis
    role: z
        .enum(['admin', 'manager', 'employee', 'guest'])
        .default('employee'), // Définir un rôle par défaut
    acceptedTerms: z
        .boolean()
        .refine(val => val === true, 'Vous devez accepter les conditions d\'utilisation'),
});

export const loginSchema = z.object({
    email: z
        .string()
        .email('Format d\'email invalide')
        .min(1, 'L\'email est requis'),
    password: z
        .string()
        .min(1, 'Le mot de passe est requis')
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email('Format d\'email invalide')
        .min(1, 'L\'email est requis')
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Le token est requis'),
    password: z
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .max(100, 'Le mot de passe ne peut pas dépasser 100 caractères')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;