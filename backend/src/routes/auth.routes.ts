import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

// Routes publiques
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login); // validateRequest(loginSchema) est réactivé
router.get('/verify-email', authController.verifyEmail);

// Routes de déconnexion
router.post('/logout', authController.logout);

// Routes protégées (à ajouter plus tard avec middleware d'authentification)
import { authenticateToken } from '../middlewares/auth.middleware';
router.use(authenticateToken);
router.get('/me', authController.getMe);
// router.put('/profile', updateProfile);

export default router;