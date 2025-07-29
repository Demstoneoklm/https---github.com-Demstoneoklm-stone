import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { User, initializeUser } from '../models/User.model';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'stone_admin',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  dialect: 'mysql',
  logging: false,
});

initializeUser(sequelize);

(async () => {
  try {
    await sequelize.authenticate();
    
    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    await sequelize.sync({ force: true });
    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    const existingAdmin = await User.findOne({ where: { email: 'admin237@gmail.com' } });

    if (existingAdmin) {
      console.log('L\'administrateur existe déjà');
      return;
    }

    await User.create({
      firstName: 'Admin',
      lastName: 'System',
      email: 'admin237@gmail.com',
      password: 'admin123AD/',
      role: 'admin',
      isActive: true,
      isVerified: true, // Admin user is verified by default
    });
    console.log('Administrateur créé avec succès');
  } catch (error) {
    console.error('Erreur lors de la création de l\'administrateur:', error);
  } finally {
    await sequelize.close();
  }
})();