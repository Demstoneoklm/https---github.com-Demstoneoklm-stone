import jwt from 'jsonwebtoken';

interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export const generateTokens = (userId: number): Tokens => {
    return {
        accessToken: jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '15m' }),
        refreshToken: jwt.sign({ id: userId }, process.env.REFRESH_SECRET!, { expiresIn: '7d' })
    };
};