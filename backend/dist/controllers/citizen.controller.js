"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCitizen = exports.registerCitizen = void 0;
const User_model_1 = require("../models/User.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerCitizen = async (req, res) => {
    console.log('Requête d\'inscription citoyen reçue.', req.body);
    try {
        const { firstName, lastName, email, password } = req.body;
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User_model_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Cet email est déjà enregistré.' });
        }
        // Créer un nouvel utilisateur avec le rôle 'user'
        const newUser = await User_model_1.User.create({
            firstName,
            lastName,
            email,
            password,
            role: 'user', // Assigner le rôle 'user' par défaut
            isActive: true,
            isVerified: true, // Pour simplifier, on considère l'utilisateur vérifié à l'inscription
        });
        // Générer un token JWT
        const token = jsonwebtoken_1.default.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.status(201).json({ message: 'Inscription réussie', token, user: newUser.toSafeObject() });
    }
    catch (error) {
        console.error('Erreur lors de l\'inscription du citoyen:', error);
        res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
    }
};
exports.registerCitizen = registerCitizen;
const loginCitizen = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Vérifier si l'utilisateur existe
        const user = await User_model_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }
        // Générer un token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Connexion réussie', token, user: user.toSafeObject() });
    }
    catch (error) {
        console.error('Erreur lors de la connexion du citoyen:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
    }
};
exports.loginCitizen = loginCitizen;
