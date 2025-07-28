import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

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
        underscored: true, // Utilise snake_case pour les noms de colonnes
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données réussie');
        // Synchronisation des modèles (en développement)
        if (process.env.NODE_ENV !== 'production') {
            await sequelize.sync({ alter: true });
            console.log('📊 Modèles synchronisés avec la base de données');
        }
    } catch (error) {
        console.error('❌ Erreur lors de la connexion à la base de données:', error);
        process.exit(1);
    }
};