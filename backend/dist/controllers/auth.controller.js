"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_model_1 = __importDefault(require("../models/User.model"));
const email_service_1 = require("../services/email.service");
const auth_1 = require("../utils/auth");
const authController = {
    register: async (req, res) => {
        try {
            // Validation déjà effectuée par le middleware
            const { email, password, firstName, lastName } = req.body;
            // Vérification de l'utilisateur existant
            const existingUser = await User_model_1.default.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({
                    error: 'Cet email est déjà utilisé'
                });
            }
            // Hashage du mot de passe
            const saltRounds = 12;
            const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            // Génération du token de vérification
            const verificationToken = (0, auth_1.generateEmailVerificationToken)(email, 0);
            // Création de l'utilisateur
            const user = await User_model_1.default.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                verificationToken,
                isVerified: false
            });
            // Envoi de l'email de confirmation (ne fait pas échouer l'inscription si l'email échoue)
            try {
                await (0, email_service_1.sendConfirmationEmail)(email, verificationToken);
            }
            catch (emailError) {
                console.warn('⚠️  Impossible d\'envoyer l\'email de confirmation:', emailError);
            }
            res.status(201).json({
                success: true,
                message: 'Compte créé avec succès. Veuillez vérifier votre email.',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isVerified: user.isVerified
                }
            });
        }
        catch (error) {
            console.error('Erreur lors de l\'inscription:', error);
            if (error instanceof Error) {
                return res.status(500).json({
                    error: 'Erreur lors de la création du compte',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
            }
            res.status(500).json({
                error: 'Une erreur inconnue est survenue lors de l\'inscription'
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Recherche de l'utilisateur
            const user = await User_model_1.default.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({
                    error: 'Email ou mot de passe incorrect'
                });
            }
            // Vérification du mot de passe
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    error: 'Email ou mot de passe incorrect'
                });
            }
            // Vérification si le compte est vérifié
            if (!user.isVerified) {
                return res.status(403).json({
                    error: 'Compte non vérifié',
                    message: 'Veuillez vérifier votre email avant de vous connecter'
                });
            }
            // Génération des tokens
            const { accessToken, refreshToken } = (0, auth_1.generateTokens)(user.id, user.email);
            // Configuration des cookies
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined
            };
            res.cookie('accessToken', accessToken, {
                ...cookieOptions,
                maxAge: 15 * 60 * 1000 // 15 minutes
            });
            res.cookie('refreshToken', refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
            });
            res.json({
                success: true,
                message: 'Connexion réussie',
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isVerified: user.isVerified
                }
            });
        }
        catch (error) {
            console.error('Erreur lors de la connexion:', error);
            if (error instanceof Error) {
                return res.status(500).json({
                    error: 'Erreur lors de la connexion',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
            }
            res.status(500).json({
                error: 'Une erreur inconnue est survenue lors de la connexion'
            });
        }
    },
    verifyEmail: async (req, res) => {
        try {
            const { token } = req.query;
            if (!token || typeof token !== 'string') {
                return res.status(400).json({
                    error: 'Token de vérification manquant'
                });
            }
            // Vérification du token
            const { email, userId } = (0, auth_1.verifyEmailVerificationToken)(token);
            // Recherche de l'utilisateur
            const user = await User_model_1.default.findOne({
                where: { email, verificationToken: token }
            });
            if (!user) {
                return res.status(404).json({
                    error: 'Token invalide ou utilisateur non trouvé'
                });
            }
            if (user.isVerified) {
                return res.status(400).json({
                    error: 'Ce compte est déjà vérifié'
                });
            }
            // Mise à jour de l'utilisateur
            await user.update({
                isVerified: true,
                verificationToken: null
            });
            // Envoi de l'email de bienvenue
            try {
                await (0, email_service_1.sendWelcomeEmail)(user.email, user.firstName);
            }
            catch (emailError) {
                console.warn('⚠️  Impossible d\'envoyer l\'email de bienvenue:', emailError);
            }
            res.json({
                success: true,
                message: 'Email vérifié avec succès ! Votre compte est maintenant actif.'
            });
        }
        catch (error) {
            console.error('Erreur lors de la vérification email:', error);
            if (error instanceof Error) {
                return res.status(400).json({
                    error: 'Token de vérification invalide ou expiré'
                });
            }
            res.status(500).json({
                error: 'Une erreur est survenue lors de la vérification'
            });
        }
    },
    logout: async (req, res) => {
        try {
            // Supprimer les cookies
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.json({
                success: true,
                message: 'Déconnexion réussie'
            });
        }
        catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            if (error instanceof Error) {
                return res.status(500).json({
                    error: 'Erreur lors de la déconnexion',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
            }
            res.status(500).json({
                error: 'Une erreur inconnue est survenue lors de la déconnexion'
            });
        }
    }
};
exports.default = authController;
