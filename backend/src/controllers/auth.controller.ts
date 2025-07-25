// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { sendConfirmationEmail } from '../services/email.service';
import { generateTokens } from '../utils/auth';
import { registerSchema } from '../schemas/auth.schema';

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

export const register = async (req: Request, res: Response) => {
    try {
        // ✅ Validation Zod complète avec tous les champs
        const { email, password, firstName, lastName } = registerSchema.parse(req.body);

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'Cet email est déjà utilisé' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hashedPassword, firstName, lastName });

        const confirmationToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        await sendConfirmationEmail(email, confirmationToken);

        res.status(201).json({
            id: user.id,
            email: user.email,
            message: 'Confirmation email envoyée'
        });
    } catch (error: unknown) {
        if (error instanceof Error && 'issues' in error) {
            return res.status(400).json({ error: (error as any).issues });
        }

        if (error instanceof Error) {
            console.error(error.message);
            return res.status(500).json({ error: error.message });
        }

        res.status(500).json({ error: 'Une erreur inconnue est survenue' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }

        const { accessToken, refreshToken } = generateTokens(user.id);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Une erreur inconnue est survenue' });
        }
    }
};
