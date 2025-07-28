import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

if (!JWT_SECRET || !REFRESH_SECRET) {
    throw new Error('JWT_SECRET et REFRESH_SECRET doivent être définis dans le fichier .env');
}

export interface TokenPayload {
    userId: number;
    email?: string;
}

export const generateTokens = (userId: number, email?: string) => {
    const payload: TokenPayload = { userId };
    if (email) payload.email = email;

    const accessToken = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        payload,
        REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error('Token d\'accès invalide');
    }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error('Token de rafraîchissement invalide');
    }
};

export const generateEmailVerificationToken = (email: string, userId: number): string => {
    return jwt.sign(
        { email, userId, type: 'email_verification' },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

export const verifyEmailVerificationToken = (token: string) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        if (payload.type !== 'email_verification') {
            throw new Error('Type de token invalide');
        }
        return { email: payload.email, userId: payload.userId };
    } catch (error) {
        throw new Error('Token de vérification email invalide');
    }
};

export const generatePasswordResetToken = (userId: number, email: string): string => {
    return jwt.sign(
        { userId, email, type: 'password_reset' },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};

export const verifyPasswordResetToken = (token: string) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as any;
        if (payload.type !== 'password_reset') {
            throw new Error('Type de token invalide');
        }
        return { userId: payload.userId, email: payload.email };
    } catch (error) {
        throw new Error('Token de réinitialisation invalide');
    }
};