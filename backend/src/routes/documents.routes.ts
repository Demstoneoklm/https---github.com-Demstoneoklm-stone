import { Router } from 'express';
import documentsController from '../controllers/documents.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();

router.use(authenticateToken);

router.get('/', documentsController.getDocuments);
router.post('/', upload.single('file'), documentsController.createDocument);
router.put('/:id', documentsController.updateDocument);
router.delete('/:id', documentsController.deleteDocument);
router.get('/:id/download', documentsController.downloadDocument);

export default router;