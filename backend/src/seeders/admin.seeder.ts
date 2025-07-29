import * as bcrypt from 'bcrypt'; // Correction ici
import { User } from '../models/User.model';
import { sequelize, initializeModels } from '../config/database';

const seedAdminUser = async () => {
    try {
        // Vérifier si l'utilisateur admin existe déjà
        const existingAdmin = await User.findOne({ where: { email: 'admin237@gmail.com' } });

        if (!existingAdmin) {
            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash('admin123AD/', 10); // 10 est le saltRounds

            // Créer l'utilisateur admin
            await User.create({
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin237@gmail.com',
                password: hashedPassword,
                role: 'admin',
                isVerified: true, // L'admin est vérifié par défaut
            });
            console.log('✅ Utilisateur admin créé avec succès.');
        } else {
            console.log('ℹ️ L\'utilisateur admin existe déjà.');
        }
    } catch (error) {
        console.error('❌ Erreur lors du seeding de l\'utilisateur admin:', error);
    }
};

// Exécuter le seeder
const runSeeder = async () => {
    try {
        await initializeModels(); // Initialiser les modèles
        await sequelize.sync(); // S'assurer que la table User existe
        await seedAdminUser();
    } catch (error) {
        console.error('❌ Erreur lors de l\'exécution du seeder:', error);
    } finally {
        await sequelize.close(); // Fermer la connexion après le seeding
        process.exit(0); // S'assurer que le processus se termine
    }
};

runSeeder();