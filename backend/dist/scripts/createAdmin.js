"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcrypt"));
const database_1 = require("../config/database");
const User_model_1 = __importDefault(require("../models/User.model"));
const ADMIN_EMAIL = 'admin237@gmail.com';
const ADMIN_PASSWORD = 'admin123AD/'; // Utilisez un mot de passe fort en production !
const createAdminAccount = async () => {
    try {
        // Assurez-vous que la connexion à la base de données est établie et les modèles initialisés
        await (0, database_1.connectDB)();
        // Vérifier si l'administrateur existe déjà
        const existingAdmin = await User_model_1.default.findOne({ where: { email: ADMIN_EMAIL } });
        if (existingAdmin) {
            console.log('ℹ️ Le compte administrateur existe déjà.');
            return;
        }
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10); // 10 est le saltRounds
        // Créer l'utilisateur administrateur
        await User_model_1.default.create({
            firstName: 'Admin',
            lastName: 'User',
            email: ADMIN_EMAIL,
            password: hashedPassword,
            role: 'admin', // Assurez-vous que votre modèle User a un champ 'role'
            isVerified: true, // L'admin est vérifié par défaut
        });
        console.log('✅ Compte administrateur créé avec succès !');
    }
    catch (error) {
        console.error('❌ Erreur lors de la création du compte administrateur:', error);
    }
    finally {
        // Fermer la connexion à la base de données
        await database_1.sequelize.close();
        console.log('Déconnexion de la base de données.');
        process.exit(0); // S'assurer que le processus se termine
    }
};
// Exécuter la fonction
createAdminAccount();
