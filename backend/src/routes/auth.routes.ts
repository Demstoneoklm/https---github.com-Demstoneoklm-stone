import { Router } from 'express';
import { register, login, verifyEmail, logout } from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

// Routes publiques
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.get('/verify-email', verifyEmail);

// Routes de déconnexion
router.post('/logout', logout);

// Routes protégées (à ajouter plus tard avec middleware d'authentification)
// router.use(authenticateToken);
// router.get('/me', getCurrentUser);
// router.put('/profile', updateProfile);

export default router;