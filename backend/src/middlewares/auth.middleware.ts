import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/auth';
import { User } from '../models/User.model';

// Extension de l'interface Request pour inclure l'utilisateur
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                role: string;
                firstName: string;
                lastName: string;
            };
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Récupérer le token depuis les cookies
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({
                error: 'Token d\'accès requis'
            });
        }

        // Vérifier le token
        const payload: TokenPayload = verifyAccessToken(token);

        // Récupérer les informations complètes de l'utilisateur
        const user = await User.findByPk(payload.userId, {
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
    } catch (error) {
        console.error('Erreur d\'authentification:', error);
        return res.status(401).json({
            error: 'Token invalide ou expiré'
        });
    }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
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

export const authorizeRoles = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
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