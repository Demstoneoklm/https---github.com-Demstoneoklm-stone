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
const bcrypt = __importStar(require("bcrypt")); // Correction ici
const User_model_1 = __importDefault(require("../models/User.model"));
const database_1 = require("../config/database");
const seedAdminUser = async () => {
    try {
        // Vérifier si l'utilisateur admin existe déjà
        const existingAdmin = await User_model_1.default.findOne({ where: { email: 'admin237@gmail.com' } });
        if (!existingAdmin) {
            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash('admin123AD/', 10); // 10 est le saltRounds
            // Créer l'utilisateur admin
            await User_model_1.default.create({
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin237@gmail.com',
                password: hashedPassword,
                role: 'admin',
                isVerified: true, // L'admin est vérifié par défaut
            });
            console.log('✅ Utilisateur admin créé avec succès.');
        }
        else {
            console.log('ℹ️ L\'utilisateur admin existe déjà.');
        }
    }
    catch (error) {
        console.error('❌ Erreur lors du seeding de l\'utilisateur admin:', error);
    }
};
// Exécuter le seeder
const runSeeder = async () => {
    try {
        await (0, database_1.initializeModels)(); // Initialiser les modèles
        await database_1.sequelize.sync(); // S'assurer que la table User existe
        await seedAdminUser();
    }
    catch (error) {
        console.error('❌ Erreur lors de l\'exécution du seeder:', error);
    }
    finally {
        await database_1.sequelize.close(); // Fermer la connexion après le seeding
        process.exit(0); // S'assurer que le processus se termine
    }
};
runSeeder();
