import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database';

import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import documentsRoutes from './routes/documents.routes';
import inventoryRoutes from './routes/inventory.routes';
import profileRoutes from './routes/profile.routes';

config(); // Charge les variables d'environnement

const app = express();
const PORT = process.env.PORT || 3001;

// Configuration CORS
app.use(cors({
    origin: [
        process.env.BASE_URL || 'http://localhost:3000',
        'http://localhost:5173' // Vite dev server
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/profile', profileRoutes);

// Lancement du serveur après connexion DB
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('❌ Erreur lors du démarrage du serveur :', err);
        process.exit(1);
    }
};

startServer();