import { Router } from 'express';
import inventoryController from '../controllers/inventory.controller';
import { authenticateToken, authorizeAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', inventoryController.getInventoryItems);
router.post('/', authorizeAdmin, inventoryController.createInventoryItem);
router.put('/:id', authorizeAdmin, inventoryController.updateInventoryItem);
router.delete('/:id', authorizeAdmin, inventoryController.deleteInventoryItem);
router.get('/stats', inventoryController.getInventoryStats);

export default router;