import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import routes from './routes';
import signatureRoutes from './routes/signature.routes';
import { connectDB } from './config/database';

config(); // Charge les variables d'environnement

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configuration CORS
app.use(cors({
    origin: 'http://localhost:3000', // ✅ Adresse frontend
    credentials: true,
}));

// ✅ Middleware Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api', routes);
app.use('/api/signature', signatureRoutes);

// ✅ Lancement du serveur après connexion DB
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
