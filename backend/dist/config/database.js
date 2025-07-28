"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME || 'stone_admin',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: true, // Utilise snake_case pour les noms de colonnes
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie');
        // Synchronisation des modèles (en développement)
        if (process.env.NODE_ENV !== 'production') {
            await exports.sequelize.sync({ alter: true });
            console.log('📊 Modèles synchronisés avec la base de données');
        }
    }
    catch (error) {
        console.error('❌ Erreur lors de la connexion à la base de données:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
