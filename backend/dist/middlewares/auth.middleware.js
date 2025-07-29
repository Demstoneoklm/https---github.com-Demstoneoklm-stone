"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.authorizeAdmin = exports.authenticateToken = void 0;
const auth_1 = require("../utils/auth");
const User_model_1 = require("../models/User.model");
const authenticateToken = async (req, res, next) => {
    try {
        // Récupérer le token depuis les cookies
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({
                error: 'Token d\'accès requis'
            });
        }
        // Vérifier le token
        const payload = (0, auth_1.verifyAccessToken)(token);
        // Récupérer les informations complètes de l'utilisateur
        const user = await User_model_1.User.findByPk(payload.userId, {
            attributes: ['id', 'email', 'firstName', 'lastName', 'role', 'isVerified']
        });
        if (!user) {
            return res.status(401).json({
                error: 'Utilisateur non trouvé'
            });
        }
        if (!user.isVerified) {
            return res.status(403).json({
                error: 'Compte non vérifié'
            });
        }
        // Ajouter l'utilisateur à la requête
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role || 'user',
            firstName: user.firstName,
            lastName: user.lastName
        };
        next();
    }
    catch (error) {
        console.error('Erreur d\'authentification:', error);
        return res.status(401).json({
            error: 'Token invalide ou expiré'
        });
    }
};
exports.authenticateToken = authenticateToken;
const authorizeAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            error: 'Authentification requise'
        });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            error: 'Accès refusé - Droits administrateur requis'
        });
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
const authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Authentification requise'
            });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Accès refusé - Permissions insuffisantes'
            });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
