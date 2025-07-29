import { Request, Response } from 'express';
import { User } from '../models/User.model';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerCitizen = async (req: Request, res: Response) => {
    console.log('Requête d\'inscription citoyen reçue.', req.body);
    try {
        const { firstName, lastName, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Cet email est déjà enregistré.' });
        }

        // Créer un nouvel utilisateur avec le rôle 'user'
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            role: 'user', // Assigner le rôle 'user' par défaut
            isActive: true,
            isVerified: true, // Pour simplifier, on considère l'utilisateur vérifié à l'inscription
        });

        // Générer un token JWT
        const token = jwt.sign(
            { id: newUser.id, role: newUser.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'Inscription réussie', token, user: newUser.toSafeObject() });
    } catch (error) {
        console.error('Erreur lors de l\'inscription du citoyen:', error);
        res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
    }
};

export const loginCitizen = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer un token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Connexion réussie', token, user: user.toSafeObject() });
    } catch (error) {
        console.error('Erreur lors de la connexion du citoyen:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
    }
};