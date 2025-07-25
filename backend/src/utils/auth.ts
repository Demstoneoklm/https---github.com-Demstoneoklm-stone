// backend/src/utils/auth.ts
import jwt from 'jsonwebtoken';

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export const generateTokens = (userId: number): Tokens => {
    const accessToken = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.REFRESH_SECRET!,
        { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
};

export const verifyToken = (token: string, isRefresh = false) => {
    return jwt.verify(
        token,
        isRefresh ? process.env.REFRESH_SECRET! : process.env.JWT_SECRET!
    );
};
