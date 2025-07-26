import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'stone_admin',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Test de la connexion
export const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Connexion à la base de données réussie.');
        connection.release();
    } catch (error) {
        console.error('❌ Impossible de se connecter à la base de données :', error);
        throw error;
    }
};

export const query = async (sql: string, params?: any[]) => {
    const [results] = await pool.execute(sql, params);
    return results;
};

export { pool };
