import { Router } from 'express';
import { registerCitizen, loginCitizen } from '../controllers/citizen.controller';

const router = Router();

router.post('/register', registerCitizen);
router.post('/login', loginCitizen);

export default router;
