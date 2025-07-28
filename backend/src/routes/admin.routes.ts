import { Router } from 'express';
import adminController from '../controllers/admin.controller';
import { authenticateToken, authorizeAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken, authorizeAdmin);

router.get('/users', adminController.getUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.get('/dashboard/stats', adminController.getDashboardStats);

export default router;