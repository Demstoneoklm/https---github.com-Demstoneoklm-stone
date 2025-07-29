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
exports.connectDB = exports.initializeModels = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv = __importStar(require("dotenv"));
// Import all models directly
const User_model_1 = require("../models/User.model");
const Document_model_1 = require("../models/Document.model");
const InventoryItem_model_1 = require("../models/InventoryItem.model");
const UserRequest_model_1 = require("../models/UserRequest.model");
const associations_1 = __importDefault(require("../models/associations")); // Also import associations directly
dotenv.config();
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
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
const initializeModels = async () => {
    try {
        // Initialize all models
        (0, User_model_1.initializeUser)(exports.sequelize);
        Document_model_1.Document.initialize(exports.sequelize);
        InventoryItem_model_1.InventoryItem.initialize(exports.sequelize);
        UserRequest_model_1.UserRequest.initialize(exports.sequelize);
        // Configure associations after initialization
        (0, associations_1.default)(); // Call directly
        console.log(' Modèles initialisés avec succès');
    }
    catch (error) {
        console.error('❌ Erreur lors de l\'initialisation des modèles:', error);
        throw error;
    }
};
exports.initializeModels = initializeModels;
const connectDB = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie');
        // Initialiser les modèles
        await (0, exports.initializeModels)();
        // Synchronisation des modèles (en développement)
        if (process.env.NODE_ENV !== 'production') {
            await exports.sequelize.sync({ alter: true });
            console.log(' Modèles synchronisés avec la base de données');
        }
    }
    catch (error) {
        console.error('❌ Erreur lors de la connexion à la base de données:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
