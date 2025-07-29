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
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
const User_model_1 = require("../models/User.model");
dotenv.config();
const sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME || 'stone_admin',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: false,
});
(0, User_model_1.initializeUser)(sequelize);
(async () => {
    try {
        await sequelize.authenticate();
        // Disable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
        await sequelize.sync({ force: true });
        // Re-enable foreign key checks
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
        const existingAdmin = await User_model_1.User.findOne({ where: { email: 'admin237@gmail.com' } });
        if (existingAdmin) {
            console.log('L\'administrateur existe déjà');
            return;
        }
        await User_model_1.User.create({
            firstName: 'Admin',
            lastName: 'System',
            email: 'admin237@gmail.com',
            password: 'admin123AD/',
            role: 'admin',
            isActive: true,
            isVerified: true, // Admin user is verified by default
        });
        console.log('Administrateur créé avec succès');
    }
    catch (error) {
        console.error('Erreur lors de la création de l\'administrateur:', error);
    }
    finally {
        await sequelize.close();
    }
})();
