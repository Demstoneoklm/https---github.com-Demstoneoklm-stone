"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPasswordResetToken = exports.generatePasswordResetToken = exports.verifyEmailVerificationToken = exports.generateEmailVerificationToken = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;
if (!JWT_SECRET || !REFRESH_SECRET) {
    throw new Error('JWT_SECRET et REFRESH_SECRET doivent être définis dans le fichier .env');
}
const generateTokens = (userId, email) => {
    const payload = { userId };
    if (email)
        payload.email = email;
    const accessToken = jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch (error) {
        throw new Error('Token d\'accès invalide');
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, REFRESH_SECRET);
    }
    catch (error) {
        throw new Error('Token de rafraîchissement invalide');
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const generateEmailVerificationToken = (email, userId) => {
    return jsonwebtoken_1.default.sign({ email, userId, type: 'email_verification' }, JWT_SECRET, { expiresIn: '24h' });
};
exports.generateEmailVerificationToken = generateEmailVerificationToken;
const verifyEmailVerificationToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (payload.type !== 'email_verification') {
            throw new Error('Type de token invalide');
        }
        return { email: payload.email, userId: payload.userId };
    }
    catch (error) {
        throw new Error('Token de vérification email invalide');
    }
};
exports.verifyEmailVerificationToken = verifyEmailVerificationToken;
const generatePasswordResetToken = (userId, email) => {
    return jsonwebtoken_1.default.sign({ userId, email, type: 'password_reset' }, JWT_SECRET, { expiresIn: '1h' });
};
exports.generatePasswordResetToken = generatePasswordResetToken;
const verifyPasswordResetToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (payload.type !== 'password_reset') {
            throw new Error('Type de token invalide');
        }
        return { userId: payload.userId, email: payload.email };
    }
    catch (error) {
        throw new Error('Token de réinitialisation invalide');
    }
};
exports.verifyPasswordResetToken = verifyPasswordResetToken;
