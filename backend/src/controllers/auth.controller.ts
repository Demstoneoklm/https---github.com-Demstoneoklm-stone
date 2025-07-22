import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_clé_secrète_provisoire';

// ✅ Inscription
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validation basique
        if (!email || !password) {
            return res.status(400).json({ error: "Email et mot de passe requis" });
        }

        // Vérifie si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: "Cet email est déjà utilisé" });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const user = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};

// ✅ Connexion
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Vérifie l'existence de l'utilisateur
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Email ou mot de passe invalide" });
        }

        // Vérifie le mot de passe
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ error: "Email ou mot de passe invalide" });
        }

        // Génère un token JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};
