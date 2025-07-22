import { Router } from 'express';
import { SignatureController } from '../controllers/signature.controller';

const router = Router();
const signatureController = new SignatureController();

router.post('/sign', signatureController.addSignatureToPdf.bind(signatureController));

export default router;