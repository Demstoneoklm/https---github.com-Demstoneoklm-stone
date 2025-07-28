import { Router } from 'express';
import profileController from '../controllers/profile.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', profileController.getUserProfile);
router.put('/', profileController.updateUserProfile);
router.get('/requests', profileController.getUserRequests);
router.post('/requests', profileController.createUserRequest);

export default router;