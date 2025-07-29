import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.model';
import { sequelize } from '../config/database'; // Importer l'instance sequelize
import { sendConfirmationEmail, sendWelcomeEmail } from '../services/email.service';
import {
    generateTokens,
    generateEmailVerificationToken,
    verifyEmailVerificationToken
} from '../utils/auth';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            // Validation déjà effectuée par le middleware
            const { email, password, firstName, lastName } = req.body;

            // Vérification de l'utilisateur existant
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(409).json({
                    error: 'Cet email est déjà utilisé'
                });
            }

            // Hashage du mot de passe
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Génération du token de vérification
            const verificationToken = generateEmailVerificationToken(email, 0);

            // Création de l'utilisateur
            const user = await User.create({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                role: 'user', // Default role for new registrations
                verificationToken,
                isVerified: false
            });

            // Envoi de l'email de confirmation (ne fait pas échouer l'inscription si l'email échoue)
            try {
                await sendConfirmationEmail(user.email, verificationToken);
            } catch (emailError) {
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

        } catch (error: unknown) {
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

    login: async (req: Request, res: Response) => {
        try {
            console.log('Tentative de connexion reçue.');
            const { email, password } = req.body;
            console.log(`Email: ${email}, Mot de passe reçu: ${password ? '*****' : '[vide]'}`);

            // Recherche de l'utilisateur
            const user = await User.findOne({ where: { email } });
            if (!user) {
                console.log('Utilisateur non trouvé pour l\'email:', email);
                return res.status(401).json({
                    error: 'Email ou mot de passe incorrect'
                });
            }
            console.log('Utilisateur trouvé:', user.email);

            // Vérification du mot de passe
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.log('Mot de passe incorrect pour l\'utilisateur:', email);
                return res.status(401).json({
                    error: 'Email ou mot de passe incorrect'
                });
            }
            console.log('Mot de passe valide.');

            // Vérification si le compte est vérifié
            if (!user.isVerified) {
                console.log('Compte non vérifié pour l\'utilisateur:', email);
                return res.status(403).json({
                    error: 'Compte non vérifié',
                    message: 'Veuillez vérifier votre email avant de vous connecter'
                });
            }
            console.log('Compte vérifié.');

            // Génération des tokens
            const { accessToken, refreshToken } = generateTokens(user.id, user.email);
            console.log('Tokens générés.');

            // Configuration des cookies
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict' as const,
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
            console.log('Cookies définis.');

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
            console.log('Réponse de connexion envoyée.');

        } catch (error: unknown) {
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

    verifyEmail: async (req: Request, res: Response) => {
        try {
            const { token } = req.query;

            if (!token || typeof token !== 'string') {
                return res.status(400).json({
                    error: 'Token de vérification manquant'
                });
            }

            // Vérification du token
            const { email, userId } = verifyEmailVerificationToken(token);

            // Recherche de l'utilisateur
            const user = await User.findOne({
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
                await sendWelcomeEmail(user.email, user.firstName);
            } catch (emailError) {
                console.warn('⚠️  Impossible d\'envoyer l\'email de bienvenue:', emailError);
            }

            res.json({
                success: true,
                message: 'Email vérifié avec succès ! Votre compte est maintenant actif.'
            });

        } catch (error: unknown) {
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

    logout: async (req: Request, res: Response) => {
        try {
            // Supprimer les cookies
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');

            res.json({
                success: true,
                message: 'Déconnexion réussie'
            });

        } catch (error: unknown) {
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
    },

    getMe: async (req: Request, res: Response) => {
        try {
            // req.user.id est défini par le middleware d'authentification
            const user = await User.findByPk(req.user!.id, {
                attributes: ['id', 'email', 'firstName', 'lastName', 'role']
            });

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            res.status(200).json({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role
            });
        } catch (error: unknown) {
            console.error('Erreur lors de la récupération des données utilisateur :', error);
            if (error instanceof Error) {
                return res.status(500).json({
                    error: 'Erreur lors de la récupération des données utilisateur',
                    details: process.env.NODE_ENV === 'development' ? error.message : undefined
                });
            }
            res.status(500).json({ message: 'Erreur serveur' });
        }
    }
};

export default authController;