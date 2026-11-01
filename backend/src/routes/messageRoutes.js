import express from 'express';
import { getMessagesWithUser, sendMessage } from '../controllers/messageController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/:partnerId', getMessagesWithUser);
router.post('/', sendMessage);

export default router;
