import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

// Import all models directly
import { User, initializeUser } from '../models/User.model';
import { Document } from '../models/Document.model';
import { InventoryItem } from '../models/InventoryItem.model';
import { UserRequest } from '../models/UserRequest.model';
import setupAssociations from '../models/associations'; // Also import associations directly

dotenv.config();

export const sequelize = new Sequelize({
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

export const initializeModels = async () => {
    try {
        // Initialize all models
        initializeUser(sequelize);
        Document.initialize(sequelize);
        InventoryItem.initialize(sequelize);
        UserRequest.initialize(sequelize);

        // Configure associations after initialization
        setupAssociations(); // Call directly

        console.log(' Modèles initialisés avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation des modèles:', error);
        throw error;
    }
};

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie');
        
        // Initialiser les modèles
        await initializeModels();
        
        // Synchronisation des modèles (en développement)
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ force: true });
            console.log(' Modèles synchronisés avec la base de données');
        }
    } catch (error) {
        console.error('❌ Erreur lors de la connexion à la base de données:', error);
        process.exit(1);
    }
};

