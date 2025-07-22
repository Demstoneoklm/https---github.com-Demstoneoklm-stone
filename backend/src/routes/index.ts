import { Router } from 'express';
import authRoutes from './auth.routes'; // ✅ Import des routes d'auth

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: "API Stone Admin" });
});

router.use('/auth', authRoutes); // ✅ Ajout du sous-routeur /auth

export default router;
