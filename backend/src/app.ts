import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'; // ✅ Import de CORS
import routes from './routes';
import { sequelize } from './config/database';
import User from './models/User.model'; // ✅ Ajout de l'import du modèle
import signatureRoutes from './routes/signature.routes'; // Ajout de l'import de signatureRoutes

config(); // Charge les variables d'environnement

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Configuration CORS AVANT les routes
app.use(cors({
    origin: 'http://localhost:3000', // ✅ Adresse de ton frontend
    credentials: true
}));

// Middleware de base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);
app.use('/api/signature', signatureRoutes); // Ajout de la route pour signature

// 🔁 Synchronisation DB + Démarrage serveur
sequelize.sync({ force: true }) // ⚠️ ATTENTION : supprime et recrée toutes les tables
    .then(() => {
        console.log('✅ Toutes les tables ont été créées');

        // 🔁 Deuxième synchronisation safe
        return sequelize.sync({ alter: true });
    })
    .then(() => {
        console.log('✅ Modèles synchronisés (mode safe)');
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Échec de la synchronisation des modèles :', err);
    });
