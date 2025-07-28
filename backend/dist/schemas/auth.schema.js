"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Format d\'email invalide')
        .min(1, 'L\'email est requis'),
    password: zod_1.z
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .max(100, 'Le mot de passe ne peut pas dépasser 100 caractères'),
    firstName: zod_1.z
        .string()
        .min(1, 'Le prénom est requis')
        .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
        .trim(),
    lastName: zod_1.z
        .string()
        .min(1, 'Le nom est requis')
        .max(50, 'Le nom ne peut pas dépasser 50 caractères')
        .trim()
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Format d\'email invalide')
        .min(1, 'L\'email est requis'),
    password: zod_1.z
        .string()
        .min(1, 'Le mot de passe est requis')
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string()
        .email('Format d\'email invalide')
        .min(1, 'L\'email est requis')
});
exports.resetPasswordSchema = zod_1.z.object({
    token: zod_1.z.string().min(1, 'Le token est requis'),
    password: zod_1.z
        .string()
        .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
        .max(100, 'Le mot de passe ne peut pas dépasser 100 caractères')
});
