import { Router } from 'express';
import { register, login } from '@/controllers/auth.controller';
import { validateRequest } from '@/middlewares/validation.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

// Routes publiques
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

// Routes protégées (à ajouter plus tard)
// router.use(authenticateToken);

export default router;
