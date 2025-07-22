import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'stone_admin',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'root',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false // Désactive les logs SQL en prod
    }
);

// Test de connexion
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
})();

export { sequelize };