import * as bcrypt from 'bcrypt';
import { sequelize, connectDB } from '../config/database';
import User from '../models/User.model';

const ADMIN_EMAIL = 'admin237@gmail.com';
const ADMIN_PASSWORD = 'admin123AD/'; // Utilisez un mot de passe fort en production !

const createAdminAccount = async () => {
  try {
    // Assurez-vous que la connexion à la base de données est établie et les modèles initialisés
    await connectDB();

    // Vérifier si l'administrateur existe déjà
    const existingAdmin = await User.findOne({ where: { email: ADMIN_EMAIL } });

    if (existingAdmin) {
      console.log('ℹ️ Le compte administrateur existe déjà.');
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10); // 10 est le saltRounds

    // Créer l'utilisateur administrateur
    await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin', // Assurez-vous que votre modèle User a un champ 'role'
      isVerified: true, // L'admin est vérifié par défaut
    });

    console.log('✅ Compte administrateur créé avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de la création du compte administrateur:', error);
  } finally {
    // Fermer la connexion à la base de données
    await sequelize.close();
    console.log('Déconnexion de la base de données.');
    process.exit(0); // S'assurer que le processus se termine
  }
};

// Exécuter la fonction
createAdminAccount();
